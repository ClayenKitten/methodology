import Game from "./games";
import LcmGame from "./games/lcm";
import ProgressionGame from "./games/progression";
import UserInterface from "./ui";
import User from "./user";

export default class Program {
    public constructor(protected ui: UserInterface) {}

    public async start() {
        this.ui.say("Welcome to the Brain Games!");

        let username = await this.ui.ask("May I have your name?");
        const user = new User(username);

        const chosen = await this.ui.askOptions(
            `Hello, ${user.name}! Choose your game:`,
            ["Least Common Multiple", "Progression"]
        );

        let game: Game;
        if (chosen == 0) game = new LcmGame(this.ui, user, {});
        else game = new ProgressionGame(this.ui, user, {});

        this.ui.clear();
        this.ui.say(`${"=".repeat(25)} ${game.name} ${"=".repeat(25)}`);
        const result = await game.start();
        if (result.won) {
            this.ui.say(`Congratulations, ${user.name}!`);
        } else {
            this.ui.say(`Let's try again, ${user.name}!`);
        }
    }

    public static TASKS_PER_GAME = 3;
}
