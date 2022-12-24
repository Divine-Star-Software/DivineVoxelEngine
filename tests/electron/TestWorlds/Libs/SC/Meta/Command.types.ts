import type { IO } from "../IO/IO";
export type CommandData = {
 id: string;
 note ?: string,
 arguments: CommandArguments[];
 run: (onDone : Function,io: typeof IO, args: Record<string, any>) => void;
};
export type CommandDataNoArgs = {
 id: string;
 note ?: string,
 arguments: false;
 run: (onDone : Function,io: typeof IO, args: Record<string, any>) => void;
};
export type CommandTypes = CommandData | CommandDataNoArgs;

export type CommandArgumentsBase = {
 shortId: string;
 fullId: string;
 required: boolean;
 note ?: string
};
export type CommandDataArg = {
 type: "data";
} & CommandArgumentsBase;
export type CommandStringArg = {
 type: "string";
} & CommandArgumentsBase;
export type CommandNumberArg = {
 type: "number";
} & CommandArgumentsBase;
export type CommandNumberArrayArg = {
 type: "number-array";
 length: number;
} & CommandArgumentsBase;
export type CommandBooleanArg = {
 type: "boolean";
} & CommandArgumentsBase;
 export type CommandArguments =
 | CommandStringArg
 | CommandNumberArg
 | CommandBooleanArg
 | CommandNumberArrayArg
 | CommandDataArg;

export type CommandArgTypes =
 | "data"
 | "string"
 | "number"
 | "number-array"
 | "boolean";
