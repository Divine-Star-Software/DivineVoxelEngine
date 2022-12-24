import { Commands } from "../Commands.js";
export function RegisterDefaultCommands() {
    Commands.registerCommand({
        id: "clear",
        note: "Will clear the console.",
        arguments: false,
        run: (on, io) => {
            io.clear();
            on();
        },
    });
    Commands.registerCommand({
        id: "clearHistory",
        note: "Will clear the command history.",
        arguments: false,
        run: (on, io) => {
            io.console.clearHistory();
            io.displayText("History has been cleared.");
            on();
        },
    });
    Commands.registerCommand({
        id: "exit",
        note: "Will close the console.",
        arguments: false,
        run: (on, io) => {
            io.exit();
            on();
        },
    });
    Commands.registerCommand({
        id: "eval",
        note: "Will run js code",
        arguments: false,
        run: (on, io, args) => {
            if (args.input && typeof args.input == "string") {
                const returnData = eval(args.input);
                io.displayText(String(returnData));
            }
            on();
        },
    });
    Commands.registerCommand({
        id: "describe",
        note: "Will show info about any command.",
        arguments: [
            {
                fullId: "id",
                shortId: "i",
                type: "string",
                required: true,
            },
        ],
        run: (onDone, io, args) => {
            const command = Commands.getCommand(args.id);
            if (!command) {
                Commands.error(`command with ID "${args.id}" does not exist`);
                return onDone();
            }
            let text = "";
            if (command.note) {
                text += command.note + "\n";
            }
            if (command.arguments) {
                text += `[ ARGUMENTS ]\n`;
                text += `[===============================================]\n`;
                text += `[ full id | short id | type | required | note ]\n`;
                for (const flag of command.arguments) {
                    text += `| ${flag.fullId} | ${flag.shortId} | ${flag.type} | ${flag.required ? "yes" : "no"} | ${flag.note ? flag.note : ""} |\n`;
                }
                text += `[===============================================]\n`;
            }
            io.displayText(text);
            return onDone();
        },
    });
    Commands.registerCommand({
        id: "ls",
        note: "Local Storage API Access Tool",
        arguments: [
            {
                fullId: "key",
                shortId: "k",
                type: "string",
                required: true,
                note: "The key in local storage.",
            },
            {
                fullId: "delete",
                shortId: "d",
                type: "boolean",
                required: false,
                note: "Delete the provided key.",
            },
            {
                fullId: "objectValue",
                shortId: "ov",
                type: "data",
                required: false,
                note: "Set the provided key as a json object.",
            },
            {
                fullId: "value",
                shortId: "v",
                type: "string",
                required: false,
                note: "Set the provided key as a string.",
            },
        ],
        run: (onDone, io, args) => {
            args.key = String(args.key).trim();
            if (args.delete) {
                localStorage.removeItem(args.key);
                io.displayText(`Deleted data with key "${args.key}" to local storage.`);
                onDone();
                return;
            }
            if (args.objectValue) {
                const json = JSON.stringify(args.objectValue);
                localStorage.setItem(args.key, json);
                io.displayText(`Saved data with key "${args.key}" to local storage.`);
                onDone();
                return;
            }
            if (args.value) {
                localStorage.setItem(args.key, args.value);
                io.displayText(`Saved data with key "${args.key}" to local storage.`);
                onDone();
                return;
            }
            const data = localStorage.getItem(args.key);
            if (data) {
                io.displayText(`Found data for "${args.key}".`);
                io.displayText(data);
            }
            else {
                io.displayText(`No data for ${args.key}`);
            }
            onDone();
        },
    });
    Commands.registerCommand({
        id: "console",
        note: "Console Options",
        arguments: [
            {
                fullId: "opacity",
                shortId: "o",
                type: "number",
                required: true,
                note: "Set the opacity of the console.",
            },
        ],
        run: (onDone, io, args) => {
            if (args.opacity) {
                io.scene.setOpacity(args.opacity);
                Commands.run(`ls -k console_opacity -v ${args.opacity}`);
            }
            onDone();
        },
    });
}
