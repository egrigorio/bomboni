import SwiftUI

@main
struct BomboniMenuBarApp: App {
    @StateObject private var model = MenuBarModel()

    var body: some Scene {
        MenuBarExtra("Bomboni", systemImage: "fork.knife.circle.fill") {
            MenuBarPanel(model: model)
        }
        .menuBarExtraStyle(.window)
    }
}
