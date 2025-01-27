import { Threads } from "@amodx/threads";
import { Analyzer } from "./Analyzer";
import { TasksIds } from "../TasksIds";
import { LocationData } from "../../Math";
import { WorldSpaces } from "World/WorldSpaces";
import { UpdateTask } from "Tasks/Update/UpdateTask";
export default function () {
  const analyzer = new Analyzer();

  Threads.registerTask<LocationData>(TasksIds.AnalyzerUpdate, async (data) => {
    await analyzer.runUpdate(data);
  });
}
