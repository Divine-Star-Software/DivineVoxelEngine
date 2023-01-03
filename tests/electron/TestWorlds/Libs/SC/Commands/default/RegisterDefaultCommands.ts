import { Commands } from "../Commands.js";

export function RegisterDefaultCommands() {
 Commands.registerCommand({
  id: "clear",
  note: "Will clear the console.",
  arguments: false,
  run: (done, io) => {
   io.clear();
   done();
  },
 });
 Commands.registerCommand({
  id: "clearHistory",
  note: "Will clear the command history.",
  arguments: false,
  run: (done, io) => {
   io.console.clearHistory();
   io.displayText("History has been cleared.");
   done();
  },
 });
 Commands.registerCommand({
  id: "exit",
  note: "Will close the console.",
  arguments: false,
  run: (done, io) => {
   io.exit();
   done();
  },
 });
 Commands.registerCommand({
  id: "eval",
  note: "Will run js code",
  arguments: false,
  run: (done, io, args) => {
   if (args.input && typeof args.input == "string") {
    const returnData = eval(args.input);
    io.displayText(String(returnData));
   }
   done();
  },
 });
 Commands.registerCommand({
  id: "help",
  note: "",
  arguments: false,
  run: (done, io, args) => {
   Commands.commands.forEach((c) => {
    const text = `${c.id}: ${c.note ? c.note : ""}`;
    io.displayText(text);
   });
   done();
  },
 });
 Commands.registerCommand({
  id: "describe",
  note: "Will show info about any command.",
  arguments: false,
  run: (onDone, io, args) => {
   let commandId = "";
   if (args.input && typeof args.input == "string") {
    commandId = String(args.input).trim();
   }
   const command = Commands.getCommand(commandId);
   if (!command) {
    Commands.error(`command with ID "${commandId}" does not exist`);
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
     text += `| ${flag.fullId} | ${flag.shortId} | ${flag.type} | ${
      flag.required ? "yes" : "no"
     } | ${flag.note ? flag.note : ""} |\n`;
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
   if (!args.key) {
    io.error("Key must be defined.");
    return onDone();
   }
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
    io.displayText(`Found data for "${args.key}":`);
    io.displayText(data);
   } else {
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
