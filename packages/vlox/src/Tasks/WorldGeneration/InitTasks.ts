import { Thread, Threads } from "@amodx/threads";
import { WorldGeneration } from "./WorldGeneration";
import { TasksIds } from "../../Tasks/TasksIds";
import { LocationData } from "../../Math";
import { getLocationData } from "../../Util/LocationData";
import { WorldGenRegister } from "./WorldGenRegister";

export default function (props: { worldThread: Thread }) {
  WorldGenRegister._worldThread = props.worldThread;

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
