import { DVEBuilder } from "../../Interfaces/Builder/DVEBuilder";
import { DVEConstructorCore } from "@divinevoxel/core/Interfaces/Constructor/DVEConstructorCore";
import { DVEFDataCore } from "../../Data/DVEFDataCore.js";
import { DVEFConstructorThreads } from "./DVEFConstructorThreads";
import { DVEPropagation } from "Interfaces/Propagation/DVEPropagation";
import { DVEAnaylzer } from "Interfaces/Anaylzer/DVEAnaylzer";
import { WorldGeneration } from "./WorldGeneration/WorldGeneration";
import { ConstructorTasks } from "./Tasks/ConstructorTasks";

export type DVEFConstrucotrCoreInitData = {
  builder: DVEBuilder;
  propagation: DVEPropagation;
  analyzer: DVEAnaylzer;
};

export class DVEFConstrucotrCore extends DVEConstructorCore {
  static instance: DVEFConstrucotrCore;
  tasks: ConstructorTasks;
  threads = new DVEFConstructorThreads();
  data = new DVEFDataCore();
  worldGen = WorldGeneration;
  builder: DVEBuilder;
  propagation: DVEPropagation;
  analyzer: DVEAnaylzer;
  constructor(data: DVEFConstrucotrCoreInitData) {
    super();
    if (DVEFConstrucotrCore.instance) return DVEFConstrucotrCore.instance;
    DVEFConstrucotrCore.instance = this;
    this.builder = data.builder;
    this.propagation = data.propagation;
    this.analyzer = data.analyzer;
    this.tasks = new ConstructorTasks();
  }
  async init(): Promise<void> {
    await this.builder.init();
  }
}
