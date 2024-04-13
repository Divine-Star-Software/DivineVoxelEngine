import { DVEDataCore } from "Interfaces/Data/DVEDataCore";
import { HeadlessThreadManager } from "./HeadlessThreads";
import { DVECore } from "Interfaces/DVECore";


export abstract class DVEHeadlessCore extends DVECore {
  abstract threads: HeadlessThreadManager;
  abstract data: DVEDataCore;

}
