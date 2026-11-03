import { createPoll } from "ags/time"
import {createComputed} from "ags"
import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk} from "ags/gtk4"



export default function  Time() {
    // create our external function calls, one every 60000ms
    // and one every 1000ms
      const date = createPoll("", 60000, "date '+%d-%m-%Y'")
      const time = createPoll("", 1000, "date '+%H:%M:%S'")

      let mainlabel = createComputed(() => date() + "  " + time())
      return (
        // box object
        <box halign={Gtk.Align.Center} $type="center">
        <menubutton>
          <label label={mainlabel} />
          <popover>
            <Gtk.Calendar />
          </popover>
        </menubutton>
        </box>
      )
}


