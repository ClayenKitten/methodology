import * as readline from "node:readline";

export default class UserInterface {
    public say(text: string) {
        console.log("\x1b[36m%s\x1b[0m", text);
    }

    public async ask(query: string | null): Promise<string> {
        if (query) this.say(query);
        return new Promise((resolve, reject) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
                terminal: false
            });
            rl.on("SIGINT", () => reject());
            rl.question("> ", answer => {
                rl.close();
                resolve(answer);
            });
        });
    }

    public async askInt(
        query: string | null,
        onfail: string = "Введите целое число"
    ): Promise<number> {
        const answer = await this.ask(query);
        const num = Number.parseInt(answer, 10);
        if (Number.isNaN(num)) {
            this.say(onfail);
            return this.askInt(null, onfail);
        }
        return num;
    }

    public async askOptions(
        query: string,
        options: string[],
        onfail?: string
    ): Promise<number> {
        this.say(query);
        for (let i = 0; i < options.length; i++) {
            this.say(`[${i + 1}] ${options[i]}`);
        }
        while (true) {
            let answer = await this.askInt(null);
            if (answer < 1 || answer > options.length) {
                this.say(onfail ?? `Выберите число от 1 до ${options.length}`);
                continue;
            }
            return answer - 1;
        }
    }

    public clear() {
        process.stdout.write("\x1Bc");
    }
}
