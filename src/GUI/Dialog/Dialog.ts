import joplin from 'api';
import { DialogResult } from 'api/types';
import { Recurrence } from '../../Logic/recurrence';

export async function createDialog(){
    const Dialog = await joplin.views.dialogs.create('Dialog');
    const DialogHTML = await require('./Dialog.html').default;
    await joplin.views.dialogs.setHtml(Dialog, DialogHTML);
    await joplin.views.dialogs.addScript(Dialog, './GUI/Dialog/Dialog.js')
    await joplin.views.dialogs.addScript(Dialog, './GUI/Dialog/Dialog.css')
    return Dialog;
}

async function loadRecurrence(dialogHandle, recurrenceData:Recurrence){
    
}


async function getRecurrence(recurrenceFormData){
    var newRecurrenceData = recurrenceFormData.formData.recurrence;    
    var recurrence = new Recurrence();
    recurrence.enabled = ('Enabled' in newRecurrenceData ? true : false);    
    recurrence.intervalNumber = Number(newRecurrenceData.IntervalNumber);
    recurrence.interval = newRecurrenceData.Interval;
    recurrence.weekdays.sunday = ('weekdaySunday' in newRecurrenceData ? true : false);
    recurrence.weekdays.monday = ('weekdayMonday' in newRecurrenceData ? true : false);
    recurrence.weekdays.tuesday = ('weekdayTuesday' in newRecurrenceData ? true : false);
    recurrence.weekdays.wednesday = ('weekdayWednesday' in newRecurrenceData ? true : false);
    recurrence.weekdays.thursday = ('weekdayThursday' in newRecurrenceData ? true : false);
    recurrence.weekdays.friday = ('weekdayFriday' in newRecurrenceData ? true : false);
    recurrence.weekdays.saturday = ('weekdaySaturday' in newRecurrenceData ? true : false);
    recurrence.weekdayOfMonth.ordinal = newRecurrenceData.dayOfMonthOrdinal;
    recurrence.weekdayOfMonth.weekday = newRecurrenceData.dayOfMonthWeekday;
    recurrence.stopInfo.type = newRecurrenceData.StopType;
    recurrence.stopInfo.date = (newRecurrenceData.StopDate ? new Date(newRecurrenceData.StopDate) : null);
    recurrence.stopInfo.number = Number(newRecurrenceData.StopNumber);
    return recurrence;
}

export async function openDialog(dialogHandle, RecurrenceData) {
    await loadRecurrence(dialogHandle, RecurrenceData);

    const result = await joplin.views.dialogs.open(dialogHandle);

    // Get a note ID, title and body
    const noteId = 'some_note_id';
    const note = await joplin.data.get(['notes', "fe78a506b15d46b9b142e1def34ee7f6"], { fields: ['id', 'title', 'body'] });
    console.log(note)



    return (result.id == 'ok'? await getRecurrence(result) : null);
}

