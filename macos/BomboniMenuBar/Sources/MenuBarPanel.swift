import SwiftUI

struct MenuBarPanel: View {
    @ObservedObject var model: MenuBarModel

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            header
            projectCard
            clientsCard
            statusCard
            configureButton
            footer
        }
        .padding(18)
        .frame(width: 390)
        .background {
            Rectangle()
                .fill(.ultraThinMaterial)
                .overlay(alignment: .topLeading) {
                    Circle().fill(Color.accentColor.opacity(0.12)).frame(width: 220, height: 220).blur(radius: 70).offset(x: -85, y: -110)
                }
                .ignoresSafeArea()
        }
        .alert("Não foi possível configurar", isPresented: Binding(
            get: { model.errorMessage != nil },
            set: { if !$0 { model.errorMessage = nil } }
        )) {
            Button("OK", role: .cancel) { model.errorMessage = nil }
        } message: {
            Text(model.errorMessage ?? "")
        }
    }

    private var header: some View {
        HStack(spacing: 12) {
            Image(systemName: "fork.knife.circle.fill")
                .font(.system(size: 34))
                .symbolRenderingMode(.palette)
                .foregroundStyle(.white, Color.accentColor)
            VStack(alignment: .leading, spacing: 3) {
                Text("Bomboni MCP")
                    .font(.system(size: 17, weight: .semibold))
                Text("Configuração local dos clientes de IA")
                    .font(.system(size: 11))
                    .foregroundStyle(.secondary)
            }
            Spacer()
        }
    }

    private var projectCard: some View {
        VStack(alignment: .leading, spacing: 8) {
            Label("Projeto", systemImage: "folder")
                .font(.system(size: 12, weight: .semibold))
            HStack(spacing: 8) {
                TextField("Caminho do projeto", text: $model.projectPath)
                    .textFieldStyle(.roundedBorder)
                    .font(.system(size: 11, design: .monospaced))
                Button {
                    model.openProject()
                } label: {
                    Image(systemName: "arrow.up.right.square")
                }
                .buttonStyle(.plain)
                .help("Abrir a pasta do projeto")
            }
        }
        .padding(12)
        .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 15, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: 15, style: .continuous).strokeBorder(.white.opacity(0.18), lineWidth: 1))
        .shadow(color: .black.opacity(0.07), radius: 12, y: 5)
    }

    private var clientsCard: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Label("Clientes MCP", systemImage: "app.connected.to.app.below.fill")
                    .font(.system(size: 12, weight: .semibold))
                Spacer()
                Text("stdio local")
                    .font(.system(size: 10, weight: .medium))
                    .foregroundStyle(.secondary)
            }
            ForEach(MCPClient.allCases) { client in
                clientRow(client)
            }
            Text("A configuração existente é preservada e copiada para backup antes da alteração.")
                .font(.system(size: 10))
                .foregroundStyle(.secondary)
                .fixedSize(horizontal: false, vertical: true)
                .padding(.top, 2)
        }
        .padding(12)
        .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 15, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: 15, style: .continuous).strokeBorder(.white.opacity(0.18), lineWidth: 1))
        .shadow(color: .black.opacity(0.07), radius: 12, y: 5)
    }

    private func clientRow(_ client: MCPClient) -> some View {
        let isSelected = Binding(
            get: { model.selectedClients.contains(client) },
            set: { value in
                if value { model.selectedClients.insert(client) }
                else { model.selectedClients.remove(client) }
            }
        )
        return HStack(spacing: 9) {
            Toggle(isOn: isSelected) {
                HStack(spacing: 8) {
                    Image(systemName: client.symbol)
                        .foregroundStyle(Color.accentColor)
                        .frame(width: 18)
                    VStack(alignment: .leading, spacing: 2) {
                        Text(client.name)
                            .font(.system(size: 12, weight: .medium))
                        Text(client.configurationURL.path.replacingOccurrences(of: NSHomeDirectory(), with: "~"))
                            .font(.system(size: 9, design: .monospaced))
                            .foregroundStyle(.tertiary)
                            .lineLimit(1)
                            .truncationMode(.middle)
                    }
                }
            }
            .toggleStyle(.checkbox)
            Spacer(minLength: 0)
            if model.completedClients.contains(client) || model.isConfigured(client) {
                Image(systemName: "checkmark.circle.fill")
                    .foregroundStyle(.green)
                    .help("Bomboni configurado")
            } else if model.isInstalled(client) {
                Circle().fill(.green).frame(width: 6, height: 6)
                    .help("Aplicativo detectado")
            } else {
                Circle().fill(.gray.opacity(0.45)).frame(width: 6, height: 6)
                    .help("Aplicativo não detectado")
            }
        }
        .padding(.vertical, 3)
    }

    private var statusCard: some View {
        HStack(alignment: .top, spacing: 9) {
            if model.isConfiguring {
                ProgressView().controlSize(.small).padding(.top, 1)
            } else {
                Image(systemName: model.statusTitle == "Configuração concluída" ? "checkmark.circle.fill" : "info.circle.fill")
                    .foregroundStyle(model.statusTitle == "Configuração concluída" ? .green : .secondary)
            }
            VStack(alignment: .leading, spacing: 3) {
                Text(model.statusTitle).font(.system(size: 11, weight: .semibold))
                Text(model.statusDetail)
                    .font(.system(size: 10))
                    .foregroundStyle(.secondary)
                    .fixedSize(horizontal: false, vertical: true)
            }
            Spacer(minLength: 0)
        }
        .padding(10)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: 12, style: .continuous).strokeBorder(Color.accentColor.opacity(0.13), lineWidth: 1))
    }

    private var configureButton: some View {
        Button(action: model.configure) {
            HStack(spacing: 8) {
                if model.isConfiguring { ProgressView().controlSize(.small) }
                else { Image(systemName: "wand.and.stars") }
                Text(model.isConfiguring ? "Configurando…" : "Configurar MCP")
                    .fontWeight(.semibold)
                Spacer()
                if !model.isConfiguring { Text("⌘↵").font(.caption2).opacity(0.7) }
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 9)
            .frame(maxWidth: .infinity)
        }
        .buttonStyle(.borderedProminent)
        .tint(Color.accentColor)
        .disabled(model.isConfiguring || model.selectedClients.isEmpty)
        .keyboardShortcut(.return, modifiers: [.command])
    }

    private var footer: some View {
        HStack {
            Text("Após configurar, reinicie os clientes selecionados.")
                .font(.system(size: 9))
                .foregroundStyle(.tertiary)
            Spacer()
            Button("Sair") { NSApplication.shared.terminate(nil) }
                .buttonStyle(.plain)
                .font(.system(size: 10))
                .foregroundStyle(.secondary)
        }
    }
}
