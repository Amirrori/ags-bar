// BUG (kind of) figure out why the icons are big before switches workspaces 
// else this is pretty decent code
// if anyone else but me is reading this, you are free to suggest replacement code

import { Astal, Gtk, Gdk} from "ags/gtk4"
import { createState, createBinding, createComputed, For } from "ags"
import Hyprland from "gi://AstalHyprland"




export default function HyprWorkspaces() {
// add an event listener to check if a monitor is added or not
// add function to the buttons created, maybe change them into actual buttons instead of menubuttons idk
    const hyprland = Hyprland.get_default()
    
    // const monitorsList = [];
    // const monitors = app.get_monitors(); 
    // console.log(monitors); 
    //
    // const monitor = hyprland.get_monitor(0)
    // print(monitor.get_id())
    
    const workspaces = createBinding(hyprland, "workspaces").as(wss => [...wss].sort((a, b) => a.id - b.id))
    // const workspacesIDs = []
    const focused = createBinding(hyprland, "focused-workspace");
    // workspaces.forEach((workspace) => {
    //     workspacesIDs.push(String(workspace.name));
    //     
    // });


    // const sorted = Array.from(workspaces).sort((a, b) => a.id - b.id);
    //workspacesIDs.sort((a, b) => a - b);
    // print("sorted workspaces", workspaces)
    // WHAT
    // TODO FIGURE OUT HOW THIS IS SORTED
        return (

        <box $type="start">
            <For each={workspaces}>
                {(ws) => (

                    <button onClicked={() => ws.focus()} class={focused.as(active => ws.id === active.id ? "active" : "")}>
                        <label label={String(ws.id)} />
                    </button>
                )}
            </For>
        </box>
        )

}





