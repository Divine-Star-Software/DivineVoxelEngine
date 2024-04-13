import { DVECore } from "../../Interfaces/DVECore";
import { ConstructorThreadManager } from "./Threads/ConstrcutorTheads";
import { DVEDataCore } from "../../Interfaces/Data/DVEDataCore";

export abstract class DVEConstructorCore extends DVECore {
  abstract threads: ConstructorThreadManager;
  abstract data: DVEDataCore;
  abstract init(): Promise<void>;
}
