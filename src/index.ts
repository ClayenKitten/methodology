import Program from "./program";
import UserInterface from "./ui";

const ui = new UserInterface();
const program = new Program(ui);

program
    .start()
    .then(() => process.exit())
    .catch(() => {
        ui.say("Oups! Error!");
        process.exit();
    });
