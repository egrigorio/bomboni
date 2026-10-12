import AppKit
import Foundation

enum MCPClient: String, CaseIterable, Identifiable {
    case codex
    case antigravity
    case claude

    var id: String { rawValue }

    var name: String {
        switch self {
        case .codex: return "Codex"
        case .antigravity: return "Antigravity"
        case .claude: return "Claude Desktop"
        }
    }

    var symbol: String {
        switch self {
        case .codex: return "sparkles"
        case .antigravity: return "paperplane"
        case .claude: return "sun.max"
        }
    }

    var configurationURL: URL {
        let home = FileManager.default.homeDirectoryForCurrentUser
        switch self {
        case .codex:
            let codexHome = ProcessInfo.processInfo.environment["CODEX_HOME"]
            let directory = codexHome.map { URL(fileURLWithPath: $0, isDirectory: true) }
                ?? home.appendingPathComponent(".codex", isDirectory: true)
            return directory.appendingPathComponent("config.toml")
        case .antigravity:
            return home.appendingPathComponent(".gemini/config/mcp_config.json")
        case .claude:
            return home.appendingPathComponent("Library/Application Support/Claude/claude_desktop_config.json")
        }
    }

    var applicationURL: URL {
        let appName: String
        switch self {
        case .codex: appName = "Codex.app"
        case .antigravity: appName = "Antigravity.app"
        case .claude: appName = "Claude.app"
        }
        return URL(fileURLWithPath: "/Applications").appendingPathComponent(appName)
    }

    var bundleIdentifier: String {
        switch self {
        case .codex: return "com.openai.codex"
        case .antigravity: return "com.google.antigravity"
        case .claude: return "com.anthropic.claudefordesktop"
        }
    }
}

@MainActor
final class MenuBarModel: ObservableObject {
    @Published var projectPath = FileManager.default.homeDirectoryForCurrentUser
        .appendingPathComponent("Documents/bomboni", isDirectory: true).path
    @Published var selectedClients: Set<MCPClient> = Set(MCPClient.allCases)
    @Published var isConfiguring = false
    @Published var statusTitle = "Pronto para configurar"
    @Published var statusDetail = "Escolha os clientes e configure o MCP local."
    @Published var completedClients: Set<MCPClient> = []
    @Published var errorMessage: String?

    func isInstalled(_ client: MCPClient) -> Bool {
        FileManager.default.fileExists(atPath: client.applicationURL.path)
            || NSWorkspace.shared.urlForApplication(withBundleIdentifier: client.bundleIdentifier) != nil
            || NSWorkspace.shared.runningApplications.contains { $0.bundleIdentifier == client.bundleIdentifier }
    }

    func isConfigured(_ client: MCPClient) -> Bool {
        guard let data = try? Data(contentsOf: client.configurationURL) else { return false }
        switch client {
        case .codex:
            return String(decoding: data, as: UTF8.self).contains("[mcp_servers.bomboni]")
        case .antigravity, .claude:
            guard
                let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                let servers = json["mcpServers"] as? [String: Any]
            else { return false }
            return servers["bomboni"] != nil
        }
    }

    func configure() {
        guard !selectedClients.isEmpty else {
            errorMessage = "Selecione pelo menos um aplicativo."
            return
        }
        isConfiguring = true
        errorMessage = nil
        completedClients = []
        statusTitle = "Preparando o MCP"
        statusDetail = "Criando o ambiente Python e instalando o projeto."

        let root = URL(fileURLWithPath: projectPath, isDirectory: true)
        let clients = MCPClient.allCases.filter { selectedClients.contains($0) }
        let model = self
        Task.detached(priority: .userInitiated) {
            do {
                let python = try MCPConfigurator.prepareEnvironment(projectRoot: root)
                for client in clients {
                    try MCPConfigurator.configure(client: client, python: python, projectRoot: root)
                    await model.markConfigured(client)
                }
                await model.finishConfiguration()
            } catch {
                await model.failConfiguration(error.localizedDescription)
            }
        }
    }

    private func markConfigured(_ client: MCPClient) {
        completedClients.insert(client)
        statusDetail = "Configurado para \(client.name)."
    }

    private func finishConfiguration() {
        statusTitle = "Configuração concluída"
        statusDetail = "Feche e reabra os aplicativos selecionados para carregar o Bomboni."
        isConfiguring = false
    }

    private func failConfiguration(_ message: String) {
        statusTitle = "Não foi possível concluir"
        statusDetail = "Revise a mensagem e tente novamente."
        errorMessage = message
        isConfiguring = false
    }

    func openProject() {
        NSWorkspace.shared.open(URL(fileURLWithPath: projectPath, isDirectory: true))
    }
}

enum MCPConfigurator {
    enum SetupError: LocalizedError {
        case missingProject(String)
        case pythonNotFound
        case commandFailed(String)
        case invalidConfiguration(String)

        var errorDescription: String? {
            switch self {
            case .missingProject(let path): return "Não encontrei um projeto bomboni válido em \(path)."
            case .pythonNotFound: return "Precisa de Python 3.11 ou superior. Instale Python 3.12 e tente novamente."
            case .commandFailed(let detail): return detail
            case .invalidConfiguration(let detail): return detail
            }
        }
    }

    static func prepareEnvironment(projectRoot: URL) throws -> URL {
        let marker = projectRoot.appendingPathComponent("pyproject.toml")
        guard FileManager.default.fileExists(atPath: marker.path) else {
            throw SetupError.missingProject(projectRoot.path)
        }

        let venvPython = projectRoot.appendingPathComponent(".venv/bin/python")
        if !FileManager.default.fileExists(atPath: venvPython.path) {
            let systemPython = try findPython()
            try run(systemPython, arguments: ["-m", "venv", ".venv"], currentDirectory: projectRoot)
        }
        try run(venvPython, arguments: ["-m", "pip", "install", "-e", "."], currentDirectory: projectRoot)
        return venvPython
    }

    static func configure(client: MCPClient, python: URL, projectRoot: URL) throws {
        let configURL = client.configurationURL
        let manager = FileManager.default
        try manager.createDirectory(at: configURL.deletingLastPathComponent(), withIntermediateDirectories: true)
        if manager.fileExists(atPath: configURL.path) {
            let formatter = DateFormatter()
            formatter.locale = Locale(identifier: "en_US_POSIX")
            formatter.dateFormat = "yyyyMMdd-HHmmss-SSS"
            let stamp = formatter.string(from: Date())
            let backup = configURL.appendingPathExtension("bomboni-backup-\(stamp)")
            try manager.copyItem(at: configURL, to: backup)
        }

        let args = ["-m", "bomboni.adapters.mcp.server"]
        switch client {
        case .codex:
            let old = (try? String(contentsOf: configURL, encoding: .utf8)) ?? ""
            let updated = mergeCodexTOML(
                old,
                command: python.path,
                args: args,
                cwd: projectRoot.path
            )
            try Data(updated.utf8).write(to: configURL, options: .atomic)
        case .antigravity, .claude:
            var root: [String: Any] = [:]
            if manager.fileExists(atPath: configURL.path) {
                let data = try Data(contentsOf: configURL)
                guard let parsed = try JSONSerialization.jsonObject(with: data) as? [String: Any] else {
                    throw SetupError.invalidConfiguration("O arquivo \(configURL.path) não contém um objeto JSON.")
                }
                root = parsed
            }
            if root["mcpServers"] != nil && !(root["mcpServers"] is [String: Any]) {
                throw SetupError.invalidConfiguration("A chave mcpServers não é um objeto JSON em \(configURL.path).")
            }
            var servers = root["mcpServers"] as? [String: Any] ?? [:]
            var definition: [String: Any] = ["command": python.path, "args": args]
            if client == .antigravity { definition["cwd"] = projectRoot.path }
            servers["bomboni"] = definition
            root["mcpServers"] = servers
            let data = try JSONSerialization.data(
                withJSONObject: root,
                options: [.prettyPrinted, .sortedKeys, .withoutEscapingSlashes]
            )
            try data.write(to: configURL, options: .atomic)
        }
    }

    private static func findPython() throws -> URL {
        var candidates = [
            "/opt/homebrew/bin/python3.12", "/opt/anaconda3/bin/python3.12",
            "/usr/local/bin/python3.12", "/opt/homebrew/bin/python3.11",
            "/opt/anaconda3/bin/python3.11", "/usr/local/bin/python3.11"
        ]
        let path = ProcessInfo.processInfo.environment["PATH"] ?? "/usr/bin:/bin"
        candidates += path.split(separator: ":").flatMap { directory in
            ["python3.12", "python3.11"].map { "\(directory)/\($0)" }
        }
        for candidate in candidates where FileManager.default.isExecutableFile(atPath: candidate) {
            let executable = URL(fileURLWithPath: candidate)
            if (try? run(executable, arguments: ["-c", "import sys; sys.exit(0 if sys.version_info >= (3, 11) else 1)"])) != nil {
                return executable
            }
        }
        throw SetupError.pythonNotFound
    }

    @discardableResult
    private static func run(_ executable: URL, arguments: [String], currentDirectory: URL? = nil) throws -> String {
        let process = Process()
        process.executableURL = executable
        process.arguments = arguments
        process.currentDirectoryURL = currentDirectory
        var environment = ProcessInfo.processInfo.environment
        environment["PATH"] = "/opt/homebrew/bin:/opt/anaconda3/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
        process.environment = environment

        let logDirectory = FileManager.default.homeDirectoryForCurrentUser
            .appendingPathComponent("Library/Logs/BomboniMenuBar", isDirectory: true)
        try FileManager.default.createDirectory(at: logDirectory, withIntermediateDirectories: true)
        let logURL = logDirectory.appendingPathComponent("setup.log")
        try Data().write(to: logURL, options: .atomic)
        let logHandle = try FileHandle(forWritingTo: logURL)
        process.standardOutput = logHandle
        process.standardError = logHandle
        do {
            try process.run()
        } catch {
            try? logHandle.close()
            throw SetupError.commandFailed("Não consegui iniciar \(executable.lastPathComponent): \(error.localizedDescription)")
        }
        process.waitUntilExit()
        try? logHandle.close()
        let output = (try? String(contentsOf: logURL, encoding: .utf8)) ?? ""
        guard process.terminationStatus == 0 else {
            let tail = String(output.suffix(1800))
            throw SetupError.commandFailed("O comando \(executable.lastPathComponent) falhou.\n\(tail)")
        }
        return output
    }

    private static func mergeCodexTOML(_ original: String, command: String, args: [String], cwd: String) -> String {
        let lines = original.components(separatedBy: .newlines)
        let table = "[mcp_servers.bomboni]"
        let tableIndexes = lines.indices.filter { lines[$0].trimmingCharacters(in: .whitespaces) == table }
        let config = [
            table,
            "command = \(tomlString(command))",
            "args = [\(args.map(tomlString).joined(separator: ", "))]",
            "cwd = \(tomlString(cwd))"
        ]
        guard let start = tableIndexes.first else {
            let prefix = original.isEmpty || original.hasSuffix("\n") ? original : original + "\n"
            return prefix + (prefix.isEmpty ? "" : "\n") + config.joined(separator: "\n") + "\n"
        }

        var end = lines.count
        if start + 1 < lines.count {
            for index in (start + 1)..<lines.count where lines[index].trimmingCharacters(in: .whitespaces).hasPrefix("[") {
                end = index
                break
            }
        }
        let retained = lines[(start + 1)..<end].filter { line in
            let trimmed = line.trimmingCharacters(in: .whitespaces)
            return !(trimmed.hasPrefix("command =") || trimmed.hasPrefix("args =") || trimmed.hasPrefix("cwd ="))
        }
        var output = Array(lines[..<start]) + config + retained
        if end < lines.count { output += lines[end...] }
        return output.joined(separator: "\n")
    }

    private static func tomlString(_ value: String) -> String {
        let data = try! JSONSerialization.data(withJSONObject: [value], options: [.withoutEscapingSlashes])
        let array = String(decoding: data, as: UTF8.self)
        return String(array.dropFirst().dropLast())
    }
}
