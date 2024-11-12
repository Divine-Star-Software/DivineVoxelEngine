import { AnaylzerTask } from "../../Types/Tasks.types";

export abstract class DVEAnaylzer {
  abstract runPropagation(data: AnaylzerTask): Promise<void>;
  abstract runUpdate(data: AnaylzerTask): Promise<void>;
}
