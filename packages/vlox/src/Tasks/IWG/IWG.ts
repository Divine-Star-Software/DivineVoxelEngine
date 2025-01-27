import { Thread, ThreadPool } from "@amodx/threads";
import { WorldStorageInterface } from "../../World/Storage/WorldStorage.interface";
import { TaskTool } from "../../Tools/Tasks/TasksTool";
import { Generator, GeneratorData } from "./Internal/Classes/Generator";
import { runWorldUpdate } from "./Internal/Functions/runWorldUpdate";
import { IWGTasks } from "./Internal/IWGTasks";
import { runBuildUpdate } from "./Internal/Functions/runBuildUpdate";
import { IWGTools } from "./Internal/IWGTools";
import { IWGDimensions } from "./Internal/IWGDimensions";
import { cullColumns } from "./Internal/Functions/cullColumns";
import { Vector3Like } from "@amodx/math";
import { InitalLoad } from "./Procedures/InitalLoad";
import SaveAllColumns from "./Procedures/SaveAllColumns";

interface IWGInitData {
  parent: Thread;
  threads: Thread | ThreadPool;
  worldStorage?: WorldStorageInterface;
}
let initalized = false;
export class IWG {

  static readonly _generators: Generator[] = [];

  static addDimension(id: string) {
    IWGDimensions.addDimension(id);
  }

  static Procedures = {
    InitalLoad,
    SaveAllColumns
  }

  static init(data: IWGInitData) {
    initalized = true;
    IWGTools.parent = data.parent;
    IWGTools.taskTool = new TaskTool(data.threads);

    if (data.worldStorage) IWGTools.worldStorage = data.worldStorage;
    console.warn("load the thing",IWGTools.worldStorage,data.worldStorage);
  }

  static createGenerator(data: Partial<GeneratorData>) {
    return new Generator({
      dimension: data.dimension ? data.dimension : "main",
      position: data.position ? data.position : Vector3Like.Create(),
      renderRadius: data.renderRadius ? data.renderRadius : 150,
      generationRadius: data.generationRadius ? data.generationRadius : 250,
      maxRadius: data.maxRadius ? data.maxRadius : 300,
      building: data.building ? data.building : undefined,
    });
  }

  static addGenerator(generator: Generator) {
    this._generators.push(generator);
  }

  static removeGenerator(generator: Generator) {
    for (let i = 0; i < this._generators.length; i++) {
      if (this._generators[i] == generator) {
        this._generators.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  static update() {
    if (!initalized) {
      throw new Error(`IWG must be initalized.`);
    }
    let needCull = false;
    for (const gen of this._generators) {
      gen.update();
      if (gen._positonChanged) needCull = true;
    }

    IWGTasks.worldLoadTasks.runTask();
    IWGTasks.worldGenTasks.runTask();
    IWGTasks.worldDecorateTasks.runTask();
    IWGTasks.worldSunTasks.runTask();
    IWGTasks.worldPropagationTasks.runTask();
    IWGTasks.saveTasks.runTask();
    IWGTasks.saveAndUnloadTasks.runTask();
    IWGTasks.buildTasks.runTask();

    runWorldUpdate(this._generators);
    runBuildUpdate(this._generators);

    if (needCull) cullColumns(this._generators);
  }
}

IWG.addDimension("main");

