import joplin from 'api';
import { setupGUI }  from './GUI/setupUI';
import { setupDatabase } from './Database/database';



async function mainPlugin(){
    //Log startup to console
    await console.info('Repeating To-Dos Plugin started!');

    //Setup UI
    await setupGUI();
}

joplin.plugins.register({
    onStart: async function() {
        await mainPlugin();
    },
});
