import AppKit
import SwiftUI

@main
struct BomboniMenuBarApp: App {
    @NSApplicationDelegateAdaptor(BomboniMenuBarDelegate.self) private var delegate

    var body: some Scene {
        Settings { EmptyView() }
    }
}

@MainActor
final class BomboniMenuBarDelegate: NSObject, NSApplicationDelegate {
    private let model = MenuBarModel()
    private let popover = NSPopover()
    private var statusItem: NSStatusItem?

    func applicationDidFinishLaunching(_ notification: Notification) {
        let item = NSStatusBar.system.statusItem(withLength: NSStatusItem.squareLength)
        statusItem = item
        if let button = item.button {
            button.image = NSImage(systemSymbolName: "fork.knife.circle.fill", accessibilityDescription: "Bomboni MCP")
            button.toolTip = "Bomboni MCP · clique para abrir, clique direito ou duplo clique para tarefas"
            button.target = self
            button.action = #selector(statusItemClicked(_:))
            button.sendAction(on: [.leftMouseUp, .rightMouseUp])
        }

        popover.behavior = .transient
        popover.contentViewController = NSHostingController(rootView: MenuBarPanel(model: model))
        popover.contentSize = NSSize(width: 390, height: 630)
    }

    @objc private func statusItemClicked(_ sender: NSStatusBarButton) {
        let event = NSApp.currentEvent
        if event?.type == .rightMouseUp || (event?.clickCount ?? 1) >= 2 {
            if popover.isShown { popover.performClose(nil) }
            showTaskMenu(from: sender)
            return
        }

        if popover.isShown {
            popover.performClose(nil)
        } else {
            popover.show(relativeTo: sender.bounds, of: sender, preferredEdge: .minY)
        }
    }

    private func showTaskMenu(from button: NSStatusBarButton) {
        let menu = NSMenu()
        let heading = NSMenuItem(title: "Tarefas do Bomboni", action: nil, keyEquivalent: "")
        heading.isEnabled = false
        menu.addItem(heading)
        menu.addItem(.separator())

        for client in MCPClient.allCases where model.isConfigured(client) {
            let isRunning = NSWorkspace.shared.runningApplications.contains { $0.bundleIdentifier == client.bundleIdentifier }
            let title = isRunning ? "Reiniciar Bomboni no \(client.name)" : "Abrir \(client.name)"
            let item = NSMenuItem(title: title, action: #selector(restartClient(_:)), keyEquivalent: "")
            item.target = self
            item.representedObject = client.rawValue
            menu.addItem(item)
        }

        if menu.items.count == 2 {
            let item = NSMenuItem(title: "Configure o MCP em um cliente primeiro", action: nil, keyEquivalent: "")
            item.isEnabled = false
            menu.addItem(item)
        }
        menu.addItem(.separator())

        let projectItem = NSMenuItem(title: "Abrir pasta do projeto", action: #selector(openProject), keyEquivalent: "")
        projectItem.target = self
        menu.addItem(projectItem)

        let settingsItem = NSMenuItem(title: "Configurar clientes…", action: #selector(openSettings), keyEquivalent: "")
        settingsItem.target = self
        menu.addItem(settingsItem)

        menu.addItem(.separator())
        let quitItem = NSMenuItem(title: "Sair do Bomboni", action: #selector(quit), keyEquivalent: "")
        quitItem.target = self
        menu.addItem(quitItem)

        menu.popUp(positioning: nil, at: NSPoint(x: 0, y: button.bounds.maxY), in: button)
    }

    @objc private func restartClient(_ item: NSMenuItem) {
        guard
            let rawValue = item.representedObject as? String,
            let client = MCPClient(rawValue: rawValue),
            let appURL = NSWorkspace.shared.urlForApplication(withBundleIdentifier: client.bundleIdentifier)
                ?? (FileManager.default.fileExists(atPath: client.applicationURL.path) ? client.applicationURL : nil)
        else {
            showAlert(title: "Aplicativo não encontrado", message: "Não encontrei o aplicativo configurado para o Bomboni.")
            return
        }

        guard let runningApp = NSWorkspace.shared.runningApplications.first(where: { $0.bundleIdentifier == client.bundleIdentifier }) else {
            open(client: client, at: appURL)
            return
        }

        let confirmation = NSAlert()
        confirmation.messageText = "Reiniciar Bomboni no \(client.name)?"
        confirmation.informativeText = "O \(client.name) será fechado e aberto novamente. Conversas em andamento podem ser interrompidas. O Bomboni será iniciado quando o cliente se conectar ao MCP."
        confirmation.addButton(withTitle: "Reiniciar")
        confirmation.addButton(withTitle: "Cancelar")
        guard confirmation.runModal() == .alertFirstButtonReturn else { return }

        guard runningApp.terminate() else {
            showAlert(title: "Não foi possível fechar o aplicativo", message: "Feche o \(client.name) manualmente e tente novamente.")
            return
        }

        Task { @MainActor in
            let deadline = Date().addingTimeInterval(15)
            while !runningApp.isTerminated && Date() < deadline {
                try? await Task.sleep(nanoseconds: 150_000_000)
            }
            guard runningApp.isTerminated else {
                showAlert(title: "O aplicativo continua aberto", message: "O \(client.name) não encerrou dentro do tempo esperado. O Bomboni não foi reiniciado.")
                return
            }
            open(client: client, at: appURL)
        }
    }

    private func open(client: MCPClient, at appURL: URL) {
        NSWorkspace.shared.openApplication(at: appURL, configuration: NSWorkspace.OpenConfiguration()) { _, error in
            DispatchQueue.main.async {
                if let error {
                    self.showAlert(title: "Não foi possível abrir o aplicativo", message: error.localizedDescription)
                } else {
                    self.showAlert(title: "\(client.name) iniciado", message: "O Bomboni MCP será iniciado quando o cliente se conectar a ele.")
                }
            }
        }
    }

    @objc private func openProject() {
        model.openProject()
    }

    @objc private func openSettings() {
        if popover.isShown {
            popover.performClose(nil)
        } else if let button = statusItem?.button {
            popover.show(relativeTo: button.bounds, of: button, preferredEdge: .minY)
        }
    }

    @objc private func quit() {
        NSApplication.shared.terminate(nil)
    }

    private func showAlert(title: String, message: String) {
        let alert = NSAlert()
        alert.messageText = title
        alert.informativeText = message
        alert.addButton(withTitle: "OK")
        alert.runModal()
    }
}
