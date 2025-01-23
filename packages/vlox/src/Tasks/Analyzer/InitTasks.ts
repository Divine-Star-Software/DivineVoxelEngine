import { Threads } from "@amodx/threads";
import { Analyzer } from "./Analyzer";
import { TasksIds } from "../TasksIds";
import { AnaylzerTask } from "../Tasks.types";
export default function () {
  const analyzer = new Analyzer();

  Threads.registerTasks<AnaylzerTask>(
    TasksIds.AnalyzerPropagation,
    async (data, onDone) => {
      await analyzer.runPropagation(data);
      if (onDone) onDone();
    },
    "deferred"
  );

  Threads.registerTasks<AnaylzerTask>(
    TasksIds.AnalyzerUpdate,
    async (data, onDone) => {
      await analyzer.runUpdate(data);
      if (onDone) onDone();
    },
    "deferred"
  );
}
