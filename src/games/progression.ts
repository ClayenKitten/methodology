import Game, { type GameResult } from ".";
import Program from "../program";
import { getRandomInt } from "../rand";

export default class ProgressionGame extends Game {
    public async start(): Promise<GameResult> {
        this.ui.say("What number is missing in the progression?");
        for (let i = 0; i < Program.TASKS_PER_GAME; i++) {
            const length = getRandomInt(3) + 5;
            const offset = getRandomInt(2);
            const r = getRandomInt(10) + 2;
            const missingIdx = getRandomInt(length);
            let output: string[] = [];
            for (let i = offset; i < length + offset; i++) {
                output.push(Math.pow(r, i).toFixed());
            }
            const correct = output[missingIdx];
            output[missingIdx] = "..";
            this.ui.say("Question: " + output.join(" "));
            const answer = await this.ui.askInt(`Answer: `);
            if (answer.toFixed(0) != correct) {
                this.ui.say(
                    `'${answer}' is wrong answer ;(. Correct answer was '${correct}'.`
                );
                return { won: false };
            }
            this.ui.say("Correct!");
        }
        return { won: true };
    }

    public get name(): string {
        return "Progression";
    }
}
