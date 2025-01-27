import { Threads } from "@amodx/threads";
import { WorldGeneration } from "./WorldGeneration";
import { TasksIds } from "../../Tasks/TasksIds";
import { GenerateTasks } from "../Tasks.types";

export default function () {
  Threads.registerTask<GenerateTasks>(
    TasksIds.Generate,
    (data) =>
      new Promise<void>((resolve) =>
        WorldGeneration.generate(data, "generate", resolve)
      )
  );
  Threads.registerTask<GenerateTasks>(
    TasksIds.Decorate,
    (data) =>
      new Promise<void>((resolve) =>
        WorldGeneration.generate(data, "decorate", resolve)
      )
  );
}
