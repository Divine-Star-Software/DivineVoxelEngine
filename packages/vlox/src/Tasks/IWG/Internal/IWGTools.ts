import { Thread } from "@amodx/threads";
import { TaskTool } from "../../../Tools/Tasks/TasksTool";
import { WorldStorageInterface } from "../../../World/Storage/WorldStorage.interface";

export class IWGTools {
  static taskTool: TaskTool;
  static worldStorage: WorldStorageInterface | null = null;
  static parent: Thread;
}
