import { Thread } from "@amodx/threads";
import { TaskTool } from "../../Tools/Tasks/TasksTool";
import { WorldStorageInterface } from "../../World/Types/WorldStorage.interface";

export class WorldSimulationTools {
  static taskTool: TaskTool;
  static worldStorage: WorldStorageInterface | null = null;
  static parent: Thread;

}
