import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import Meta from 'gi://Meta';

export default class QuickSettingsFocusOnHoverExtension extends Extension {
    constructor(metadata) {
        super(metadata);
        this._signalConnections = [];
    }

    enable() {
        console.log('QuickSettings Focus on Hover: Extension enabled');

        // Search all panel buttons and connect to their menus
        for (let [name, button] of Object.entries(Main.panel.statusArea)) {
            if (button && button.menu) {
                const signalId = button.menu.connect(
                    'open-state-changed',
                    this._onMenuStateChanged.bind(this, name)
                );

                this._signalConnections.push({
                    name: name,
                    button: button,
                    signalId: signalId
                });

                console.log(`QuickSettings Focus on Hover: Connected to ${name}`);
            }
        }
    }

    _onMenuStateChanged(name, menu, isOpen) {
        if (!isOpen) {
            // Menu was closed - focus window under mouse
            console.log(`QuickSettings Focus on Hover: ${name} closed, searching for window under mouse`);
            this._focusWindowUnderMouse();
        }
    }

    _focusWindowUnderMouse() {
        try {
            // Get mouse position
            const [x, y, mods] = global.get_pointer();

            console.log(`QuickSettings Focus on Hover: Mouse position: (${x}, ${y})`);

            // Search all windows (from top to bottom in stacking order)
            const workspace = global.workspace_manager.get_active_workspace();
            const windows = global.display.sort_windows_by_stacking(
                workspace.list_windows()
            ).reverse(); // Reverse to start from top

            // Find the topmost window under the mouse
            for (let window of windows) {
                // Skip special windows
                if (window.is_skip_taskbar() || window.minimized) {
                    continue;
                }

                // Get window geometry
                const rect = window.get_frame_rect();

                // Check if mouse is over this window
                if (x >= rect.x && x < rect.x + rect.width &&
                    y >= rect.y && y < rect.y + rect.height) {

                    console.log(`QuickSettings Focus on Hover: Window found: ${window.get_title()}`);

                    // Focus window
                    const timestamp = global.display.get_current_time_roundtrip();
                    window.activate(timestamp);

                    return;
                }
            }

            console.log('QuickSettings Focus on Hover: No window under mouse found');

        } catch (error) {
            console.error('QuickSettings Focus on Hover: Error while focusing:', error);
        }
    }

    disable() {
        console.log('QuickSettings Focus on Hover: Extension disabled');

        // Disconnect all signal connections
        for (let connection of this._signalConnections) {
            if (connection.button && connection.button.menu) {
                connection.button.menu.disconnect(connection.signalId);
                console.log(`QuickSettings Focus on Hover: Disconnected from ${connection.name}`);
            }
        }

        this._signalConnections = [];
    }
}
