import joplin from "api";
import { updateAllRecurrences } from "./recurrence";

var updating = null
var timer = null

export async function setupTimer(){
    clearInterval(timer)
    timer = setInterval(async () => {
        if (updating) return;
        updating = true;
        await updateAllRecurrences();
        updating = false;
    }, await joplin.settings.value("updateFrequency") * 1000);
}