
import type { CommandData, CommandTypes } from "Meta/Command.types";

import { IO } from "../IO/IO.js";
import { CommandParser } from "./CommandParser.js";
import { RegisterDefaultCommands } from "./default/RegisterDefaultCommands.js";

export const Commands = {
 commands: <Map<string, CommandTypes>>new Map(),

 registerCommand(data: CommandTypes) {
  this.commands.set(data.id, data);
 },

 getCommand(id: string) {
  return this.commands.get(id);
 },

 run(input: string) {
  IO.console.commit();
  const onDone = () => {
   IO.console.clearActiveText();
   IO.scene.fullReRender();
  };
  const commandData = CommandParser.getCommandId(input);
  const command = Commands.commands.get(commandData.id);

  if (!command) {
   Commands.error(`Command with ID "${commandData.id}" does not exist.`);
   return onDone();
  }


  if (command.arguments) {
   const argsData = CommandParser.parseArgs(
    input,
    command.arguments,
    commandData.index
   );
   if (!argsData) return onDone();
   return command.run(onDone, IO, argsData);
  }

  let string = input.substring(commandData.index, input.length);
  command.run(onDone, IO, { input: string });
 },

 error(error: string) {
  IO.displayText(`ERROR: ${error}`);
 },
};

RegisterDefaultCommands();
