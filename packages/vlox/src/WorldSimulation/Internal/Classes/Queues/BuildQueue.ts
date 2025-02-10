import { LocationData } from "Math";
import { TickQueue } from "../TickQueue";

export class BuildQueue extends TickQueue {
  runTask(section: LocationData): void {
    this.tasks.build.section.run(section);
  }
}
