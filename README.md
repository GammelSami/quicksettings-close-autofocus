# QuickSettings Focus on Hover

A GNOME Shell Extension that automatically focuses the window under the mouse when panel menus are closed.

## What does this extension do?

Normally, after closing panel menus (QuickSettings, tiling extension menus, etc.), the focus stays on the previous window or gets lost. This extension changes that behavior:

**When closing any panel menu, the window under the mouse cursor is automatically focused.**

This makes the behavior more intuitive and follows the "Focus-Follows-Mouse" principle.

## Features

- Automatically focuses the window under the mouse when closing panel menus
- Works with QuickSettings and other panel button menus (e.g., tiling extension menus)
- Lightweight and non-intrusive
- No configuration needed

## Requirements

- GNOME Shell 43 or newer
- Linux with GNOME Desktop

## Installation

### Method 1: Manual

1. Copy the extension to the correct folder:
```bash
mkdir -p ~/.local/share/gnome-shell/extensions
cp -r quicksettings-focus-on-hover@sam.local ~/.local/share/gnome-shell/extensions/
```

2. Reload GNOME Shell:
   - **X11:** `Alt+F2` → `r` → Enter
   - **Wayland:** Log out and log back in

3. Enable the extension:
```bash
gnome-extensions enable quicksettings-focus-on-hover@sam.local
```

### Method 2: Symlink (for development)

```bash
ln -s $(pwd) ~/.local/share/gnome-shell/extensions/quicksettings-focus-on-hover@sam.local
gnome-extensions enable quicksettings-focus-on-hover@sam.local
```

## Usage

After installation, the extension works automatically:

1. Open any panel menu (e.g., QuickSettings in the top right)
2. Move the mouse over a window
3. Close the menu
4. The window under the mouse is automatically focused

## Debugging

View logs:
```bash
journalctl -f -o cat /usr/bin/gnome-shell | grep "QuickSettings Focus on Hover"
```

Check extension status:
```bash
gnome-extensions info quicksettings-focus-on-hover@sam.local
```

## Uninstallation

```bash
gnome-extensions disable quicksettings-focus-on-hover@sam.local
rm -rf ~/.local/share/gnome-shell/extensions/quicksettings-focus-on-hover@sam.local
```

## How it works

1. The extension connects to the `open-state-changed` signal of all panel menus
2. When a menu is closed, the current mouse position is determined
3. All windows are searched (by stacking order)
4. The topmost visible window under the mouse is focused

## Compatibility

Tested with:
- GNOME 43+
- GNOME 44+
- GNOME 45+
- GNOME 46+
- GNOME 47+
- GNOME 48+
- GNOME 49+

## License

MIT License

## Contributing

Feedback and pull requests are welcome!
