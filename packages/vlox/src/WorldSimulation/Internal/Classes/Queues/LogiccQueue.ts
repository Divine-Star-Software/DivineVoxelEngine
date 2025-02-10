import { LocationData } from "Math";
import { TickQueue } from "../TickQueue";

export class LogicQueue extends TickQueue {
  runTask(section: LocationData): void {
   this.tasks.voxel.logic.run(section)
  }
}
