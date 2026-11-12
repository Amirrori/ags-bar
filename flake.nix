{
  description = "Hyprland status bar built with AGS";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    ags = {
      url = "github:aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { nixpkgs, ags, ... }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
      astal = ags.packages.${system};
      lib = nixpkgs.lib;

      # names from libraries.txt, skipping blank lines and # comments
      libraries = builtins.filter (line: line != "" && !(lib.hasPrefix "#" line))
        (map lib.strings.trim (lib.splitString "\n" (builtins.readFile ./libraries.txt)));

      agsWithLibs = astal.ags.override {
        extraPackages = map (name: astal.${name}) libraries;
      };
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        packages = [ agsWithLibs ];
      };
    };
}
