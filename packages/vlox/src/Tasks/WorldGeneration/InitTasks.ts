import { Threads } from "@amodx/threads";
import { WorldGeneration } from "./WorldGeneration";
import { TasksIds } from "../../Tasks/TasksIds";
import { GenerateTasks } from "../Tasks.types";

export default function () {
  Threads.registerTasks<GenerateTasks>(
    TasksIds.Generate,
    (data, onDone) => {
      if (!onDone) return;
      WorldGeneration.generate(data, "generate", onDone);
    },
    "deferred"
  );
  Threads.registerTasks<GenerateTasks>(
    TasksIds.Decorate,
    (data, onDone) => {
      if (!onDone) return;
      WorldGeneration.generate(data, "decorate", onDone);
    },
    "deferred"
  );
}
