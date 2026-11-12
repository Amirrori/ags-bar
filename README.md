# AGS Bar

A status bar built for hyprland, ported from my nixconfigs because it turned into its own development.

This is a project which runs on [AGS](https://aylur.github.io/ags). Read further on why to use AGS on their page.
## Features

- Workspaces: displays your hyprland workspaces. Highlights whichever one is focused. 
- Clock: date and time, click it for a calendar.
- Battery: displays battery percentage & status icon. Clicking it opens a widget which tells you time until full or time until empty depending on if you're charging or discharging.

## Requirements

- AGS v3 with the Astal libraries in `libraries.txt`.
- UPower
- Hyprland
- A [Nerd Font](https://www.nerdfonts.com) for the icons.

## Usage

With nix, the flake gives you a dev shell with AGS and the required libraries:

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

- `app.ts`: entry point, makes a bar for each monitor.
- `style.scss`: the theme.
- `widget/Bar.tsx`: the bar window.
- any other files under `widget/*` are the widgets that the bar window will show.
## License

[MIT](LICENSE)
