import { Threads } from "@amodx/threads";
import { WorldGeneration } from "./WorldGeneration";
import { TasksIds } from "../../Tasks/TasksIds";
import { LocationData } from "../../Math";
import { getLocationData } from "../../Util/LocationData";

export default function () {
  Threads.registerBinaryTask(
    TasksIds.Generate,
    (data) =>
      new Promise<void>((resolve) =>
        WorldGeneration.generate(getLocationData(data), "generate", resolve)
      )
  );
  Threads.registerBinaryTask(
    TasksIds.Decorate,
    (data) =>
      new Promise<void>((resolve) =>
        WorldGeneration.generate(getLocationData(data), "decorate", resolve)
      )
  );
}
