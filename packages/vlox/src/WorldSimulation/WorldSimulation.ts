import { Thread, ThreadPool } from "@amodx/threads";
import { WorldStorageInterface } from "../World/Types/WorldStorage.interface";
import { TaskTool } from "../Tools/Tasks/TasksTool";
import { Generator, GeneratorData } from "./Dimensions/Generator";
import { WorldSimulationTasks } from "./Internal/WorldSimulationTasks";
import { WorldSimulationTools } from "./Internal/WorldSimulationTools";
import { WorldSimulationDimensions } from "./Internal/WorldSimulationDimensions";
import { Vector3Like } from "@amodx/math";
import { InitalLoad } from "./Procedures/InitalLoad";
import SaveAllSectors from "./Procedures/SaveAllSectors";
import { runActiveSectorUpdate } from "./Internal/runActiveSectorUpdate";

interface WorldSimulationInitData {
  parent: Thread;
  generators: Thread | ThreadPool;
  meshers: Thread | ThreadPool;
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
    WorldSimulationTools.taskTool = new TaskTool(data.meshers, data.generators);
    if (data.worldStorage)
      WorldSimulationTools.worldStorage = data.worldStorage;
  }

  static createGenerator(data: Partial<GeneratorData>) {
    if (!initalized)
      throw new Error(`IWG must be initalized first before creating generator`);
    return new Generator({
      dimension: data.dimension ? data.dimension : 0,
      position: data.position ? data.position : Vector3Like.Create(),
      renderRadius: data.renderRadius ? data.renderRadius : 150,
      tickRadius: data.tickRadius ? data.tickRadius : 150,
      generationRadius: data.generationRadius ? data.generationRadius : 250,
      maxRadius: data.maxRadius ? data.maxRadius : 300,
      building: data.building ? data.building : undefined,
    });
  }

  static addGenerator(generator: Generator) {
    this._generators.push(generator);
    WorldSimulationDimensions.getDimension(generator._dimension)!.addGenerator(
      generator
    );
  }

  static getDimension(id: number) {
    return WorldSimulationDimensions.getDimension(id);
  }

  static removeGenerator(generator: Generator) {
    WorldSimulationDimensions.getDimension(
      generator._dimension
    )!.removeGenerator(generator);
    for (let i = 0; i < this._generators.length; i++) {
      if (this._generators[i] == generator) {
        this._generators.splice(i, 1);

        return true;
      }
    }
    return false;
  }

  static tick(generationOnly = false) {
    for (const [, dimension] of WorldSimulationDimensions._dimensions) {
      dimension.incrementTick();
      for (let i = 0; i < dimension.activeSectors._sectors.length; i++) {
        dimension.activeSectors._sectors[i].tickUpdate();
        dimension.activeSectors._sectors[i].generateUpdate();
      }
    }
    let needActiveSectorUpdate = false;
    for (const gen of this._generators) {
      gen.update();
      if (gen._dirty || gen._isNew) {
        gen._isNew = false;
        gen._dirty = false;
        needActiveSectorUpdate = true;
      }
    }

    if (needActiveSectorUpdate) {
      runActiveSectorUpdate();
    }

    WorldSimulationTasks.worldLoadTasks.runTask();
    WorldSimulationTasks.worldGenTasks.runTask();
    WorldSimulationTasks.worldDecorateTasks.runTask();
    WorldSimulationTasks.worldSunTasks.runTask();
    WorldSimulationTasks.worldPropagationTasks.runTask();

    if (generationOnly) return;
    WorldSimulationTasks.buildTasks.runTask(125);
    WorldSimulationTasks.saveTasks.runTask(50);
    WorldSimulationTasks.unloadTasks.runTask(50);
    WorldSimulationTasks.unbuildTasks.runTask();
  }
}

WorldSimulation.addDimension(0);
