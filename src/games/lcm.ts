import Game, { type GameResult } from ".";
import Program from "../program";
import { getRandomInt } from "../rand";

export default class LcmGame extends Game {
    public async start(): Promise<GameResult> {
        this.ui.say("Find the smallest common multiple of given numbers.");
        for (let i = 0; i < Program.TASKS_PER_GAME; i++) {
            const a = getRandomInt(20) + 2;
            const b = getRandomInt(20) + 2;
            const c = getRandomInt(20) + 2;
            const answer = await this.ui.askInt(
                `Question: ${a} ${b} ${c}\nAnswer: `
            );
            const correct = lcm([a, b, c]);
            if (answer == correct) {
                this.ui.say("Correct!");
            } else {
                this.ui.say(
                    `'${answer}' is wrong answer ;(. Correct answer was '${correct}'.`
                );
                return { won: false };
            }
        }
        return { won: true };
    }

    public get name(): string {
        return "Least Common Multiple";
    }
}

function lcm(A: number[]) {
    let n = A.length,
        a = Math.abs(A[0]);
    for (let i = 1; i < n; i++) {
        let b = Math.abs(A[i]),
            c = a;
        while (a && b) {
            a > b ? (a %= b) : (b %= a);
        }
        a = Math.abs(c * A[i]) / (a + b);
    }
    return a;
}
