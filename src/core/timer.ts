import joplin from "api";
import { updateAllRecurrences } from "./recurrence";
import { updateOverdueTodos } from "./recurrence";

var updating = false;
var timer = null

export async function setupTimer(){
    clearInterval(timer)
    timer = setInterval(async () => {
        if (updating) return;
        updating = true;
        await updateAllRecurrences();
        await updateOverdueTodos()
        updating = false;
    }, await joplin.settings.value("updateFrequency") * 1000);
}