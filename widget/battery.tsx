import { createState, createBinding, createComputed } from "ags"
import Battery from "gi://AstalBattery"
import { Astal, Gtk, Gdk} from "ags/gtk4"



// TODO: attempt adding an on hover functionality for time to empty and time to full depending on the state
// UPDATE: instead of hover I'll just make a box and put information in it(inspired by kde)

const battery = Battery.get_default()
const status = createBinding(battery, "state");


function formatTime(seconds: number) {
    if (seconds <= 0) return "Fetching.."
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}hrs ${minutes}mins`
}

function TimeRem() {
    const [timeToEmpty, timeToFull] = [createBinding(battery, "time_to_empty"), 
    createBinding(battery, "time_to_full")];
    // const [tte, ttf] = [createComputed(() => `Time to empty: ${(timeToEmpty() / 60) / 60} hours`), createComputed(() => `Time to full: ${(timeToFull() / 60) / 60} hours`)];
    // let labalForTimeRem;
    

    // TODO: make this switch statement somehow dynamic so it changes whenever you click on it.
    // DONE
    
    const text = createComputed(() => {
    // Context because the numbers seem arbitrary: 
    // UPower has 7 battery states
    // 0: UNKNOWN, 1: CHARGING, 2: DISCHARGING, 3: EMPTY, 4: FULLY_CHARGED, 5: PENDING_CHARGE, 6: PENDING_DISCHARGE.

        switch (status()) {
            case 0: 
                return "Unknown";
            case 1:
                return `Time to full: ${formatTime(timeToFull())}`
            case 2:
                 return `Time to empty: ${formatTime(timeToEmpty())}`;
            case 3:
                return "Battery empty";
            case 4:
                return "Fully charged";
            case 5:
                return "Not charging";
            case 6:
                return "Not discharging yet";
            default:
                return "Invalid state"
        }
    })
    return (
        <label label={text}/>
    )

}   
export default function BatteryFetch() {
    const percentage = createBinding(battery, "percentage");
    // TODO check battery percentage and adjust the charge level based on that 
    const icons = ["?", "\ueb2d", "\uf241", "\uf244", "\uf240", "\uf1e6 \uf240", "\uf241"]
    const [perc, icon, tte, ttf] = [createComputed(() => `${Math.round(percentage() * 100)}%`), createComputed(() => `${icons[status()] ?? "?"}`)];
    const BATlabel = createComputed(() => icon() + "   " + perc());

    return (
        <box halign={Gtk.Align.End} $type="end">
        <menubutton>
            <label label={BATlabel}/>
            <popover>
            <box>
                <TimeRem />
            </box>
            </popover>
        </menubutton>

        </box>
    );
}

