import { Thread, ThreadPool } from "@amodx/threads";
import { WorldStorageInterface } from "../World/Types/WorldStorage.interface";
import { TaskTool } from "../Tools/Tasks/TasksTool";
import { Generator, GeneratorData } from "./Internal/Classes/Generator";
import { runWorldUpdate } from "./Internal/Functions/runWorldUpdate";
import { WorldSimulationTasks } from "./Internal/WorldSimulationTasks";
import { runTickUpdate } from "./Internal/Functions/runTickUpdate";
import { WorldSimulationTools } from "./Internal/WorldSimulationTools";
import { WorldSimulationDimensions } from "./Internal/WorldSimulationDimensions";
import { cullSectors } from "./Internal/Functions/cullSectors";
import { Vector3Like } from "@amodx/math";
import { InitalLoad } from "./Procedures/InitalLoad";
import SaveAllSectors from "./Procedures/SaveAllSectors";

interface WorldSimulationInitData {
  parent: Thread;
  threads: Thread | ThreadPool;
  worldStorage?: WorldStorageInterface;
}
let initalized = false;
/**# Infinite World Generation IWG
 * Object to handle the loading and generating the world around a created generator.
 */
export class WorldSimulation {
  private static _cullGenerators: Generator[] = [];
  static readonly _generators: Generator[] = [];

  static addDimension(id: number) {
    WorldSimulationDimensions.addDimension(id);
  }

  static Procedures = {
    InitalLoad,
    SaveAllSectors,
  };

  static init(data: WorldSimulationInitData) {
    initalized = true;
    WorldSimulationTools.parent = data.parent;
    WorldSimulationTools.taskTool = new TaskTool(data.threads);
    if (data.worldStorage)
      WorldSimulationTools.worldStorage = data.worldStorage;
  }

  static createGenerator(data: Partial<GeneratorData>) {
    if (!initalized)
      throw new Error(`IWG must be initalized first before creating generator`);
    return new Generator(WorldSimulationTools.taskTool, {
      dimension: data.dimension ? data.dimension : 0,
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

  static tick() {
    for (const gen of this._generators) {
      gen.tick();
    }
  }

  static update() {
    if (!initalized) {
      throw new Error(`IWG must be initalized.`);
    }
    if (this._cullGenerators.length) this._cullGenerators.length = 0;
    for (const gen of this._generators) {
      gen.update();
      if (!gen._culling) continue;
      if (gen._positonChanged) {
        if (!gen._waitingForCull) {
          gen._waitingForCull = true;
          gen._cullTime = performance.now();
        } else {
          if (performance.now() - gen._cullTime > 4000) {
            gen._waitingForCull = false;
            this._cullGenerators.push(gen);
          }
        }
      }
    }
    runTickUpdate(this._generators);
    //  IWGTasks.buildTasks.runTask();

    runWorldUpdate(this._generators);
    WorldSimulationTasks.worldLoadTasks.runTask();
    WorldSimulationTasks.worldGenTasks.runTask();
    WorldSimulationTasks.worldDecorateTasks.runTask();
    WorldSimulationTasks.worldSunTasks.runTask();
    WorldSimulationTasks.worldPropagationTasks.runTask();
    WorldSimulationTasks.saveTasks.runTask();
    WorldSimulationTasks.saveAndUnloadTasks.runTask();

    cullSectors(this._generators, this._cullGenerators);
  }
}

WorldSimulation.addDimension(0);
