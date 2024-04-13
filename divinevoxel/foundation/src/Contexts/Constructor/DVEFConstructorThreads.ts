import { ConstructorThreadManager } from "@divinevoxel/core/Interfaces/Constructor/Threads/ConstrcutorTheads";
import { DVEFConstructorThreadState } from "./DVEFConstructorThreadState";

export class DVEFConstructorThreads extends ConstructorThreadManager {
  state: DVEFConstructorThreadState;

  constructor() {
    super();
    this.state = new DVEFConstructorThreadState(this);
  }
}
