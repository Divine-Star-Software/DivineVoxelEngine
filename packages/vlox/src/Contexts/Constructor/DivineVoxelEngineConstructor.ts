//threadcomm
import { Threads } from "@amodx/threads/";
import { ConstructorThreadManager } from "./ConstrcutorTheads.js";
import { DVEMesher } from "../../Mesher/Mesher.js";

export type DivineVoxelEngineConstructorInitData = {};

export class DivineVoxelEngineConstructor {
  static environment: "node" | "browser" = "browser";
  static instance: DivineVoxelEngineConstructor;

  TC = Threads;

  threads = new ConstructorThreadManager();
  mesher = new DVEMesher();
  constructor() {
    if (DivineVoxelEngineConstructor.instance)
      return DivineVoxelEngineConstructor.instance;
    DivineVoxelEngineConstructor.instance = this;
  }
}
