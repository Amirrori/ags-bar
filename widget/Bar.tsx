// imports
import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk} from "ags/gtk4"
import Time from "./time.tsx"
import HyprWorkspaces from "./workspaces.tsx"
import BatteryFetch from "./battery.tsx"

import Wp from "gi://AstalWp"


import Tray from "gi://AstalTray"

import { createState, createBinding, createComputed } from "ags"


// TODO perhaps put each function and clean tem up a bit DONE

// function getTray() {
//     const tray = Tray.get_default()
//     const items = tray.get_items();
//
//
//     print(Object.getOwnPropertyNames(Object.getPrototypeOf(tray)));
//
// };
//
// getTray()

const wp = Wp.get_default()

const speaker = wp.audio.default_speaker

const volume = createBinding(speaker, "volume")
volume.subscribe(v => {

print(Math.trunc(volume() * 100))
})


export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor
  return (
    <window
      visible
      name="bar"
      class="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}>
      <centerbox cssName="centerbox">
        <Time/>
        <HyprWorkspaces />
        <BatteryFetch />
      </centerbox>
    </window>
  )
}
