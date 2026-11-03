# AGS Bar

A status bar built for hyprland, ported from my nixconfigs because it turned into its own development.

Still a work in progress.

## Features

- Workspaces: a button for each of your workspaces, click one to switch to it, the focused one is highlighted
- Clock: date and time, click it for a calendar
- Battery: state icon and charge level, click it for the time remaining

## Requirements

- AGS v3 with the Astal libraries `hyprland`, `battery`, `wireplumber` and `tray`
- Hyprland
- UPower for the battery and WirePlumber for audio
- A [Nerd Font](https://www.nerdfonts.com) for the icons

## Usage

With nix, the flake gives you a dev shell with AGS and the libraries above:

```sh
nix develop
ags run .
```

Without nix, install AGS and the Astal libraries from your distro's packages (see the [AGS docs](https://aylur.github.io/ags/)) and run:

```sh
ags run .
```

To use it as your actual bar, copy or link this folder to `~/.config/ags` and add this to your hyprland config:

```ini
exec-once = ags run
```

## Development

Run `ags types` to generate the type definitions for your editor. They go into `@girs/`, which is gitignored.

## Files

- `app.ts`: entry point, makes a bar for each monitor
- `style.scss`: the theme
- `widget/Bar.tsx`: the bar window
- `widget/workspaces.tsx`, `widget/time.tsx`, `widget/battery.tsx`: the widgets
## License

[MIT](LICENSE)
