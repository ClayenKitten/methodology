import UserInterface from "../ui";
import User from "../user";

export default abstract class Game<
    P extends {} = {},
    R extends GameResult = GameResult
> {
    public constructor(
        protected ui: UserInterface,
        public user: User,
        protected properties: P
    ) {}

    public abstract start(): R | Promise<R>;

    public abstract get name(): string;
}

export type GameResult = {
    won: boolean;
};
