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

      agsWithLibs = astal.ags.override {
        extraPackages = [
          astal.hyprland
          astal.battery
          astal.wireplumber
          astal.tray
        ];
      };
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        packages = [ agsWithLibs ];
      };
    };
}
