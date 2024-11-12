import { IWGGeneratorData, IWGSettignsData } from "./Types/IWG.types";
import { Generator } from "./Classes/Generator.js";
import { RegisterDefaultTasks } from "./Tasks/RegisterDefaultTasks.js";
import { WorldSpaces } from "../../Data/World/WorldSpaces.js";
import { IWGInitalLoad } from "./Load/InitLoad.js";
import { IWGSafeExit } from "./Load/SafeExit.js";
import { IWGTeleport } from "./Load/Teleport.js";
import { LocationData } from ".../../Math";

export class IWG {
  static inProgressMap = {
    map: <Map<string, string>>new Map(),

    add(x: number, y: number, z: number, tasks: string) {
      this.map.set(IWG.getKey(x, y, z), tasks);
    },
    has(x: number, y: number, z: number) {
      return this.map.has(IWG.getKey(x, y, z));
    },
    remove(x: number, y: number, z: number) {
      return this.map.delete(IWG.getKey(x, y, z));
    },
  };

  static getKey(x: number, y: number, z: number) {
    return WorldSpaces.column.getKeyXYZ(x, y, z);
  }

  static generators = new Map<string, Generator>();

  static addGenerator(data: IWGGeneratorData) {
    const gen = new Generator(data);
    this.generators.set(gen.data.id, gen);
    return gen;
  }

  static getGenerator(id: string) {
    const gen = this.generators.get(id);
    if (!gen) return false;
    return gen;
  }

  static removeGenerator(id: string) {
    return this.generators.delete(id);
  }

  static worldGenUpdate(max = 5) {
    for (const [key, gen] of this.generators) {
      gen.worldGenUpdate(max);
    }
  }

  static searchUpdate() {
    for (const [key, gen] of this.generators) {
      gen.generateUpdate();
    }
  }

  static saveUpdate(max = 5) {
    for (const [key, gen] of this.generators) {
      gen.saveUpdate(max);
    }
  }

  static async initalLoad(
    dimension: string,
    position: number[] | Float32Array | Float64Array | Int32Array | Int16Array,
    settings: IWGSettignsData = {
      renderDistance: 100,
      generateDistance: 150,
    },
    onCheck = (gen: Generator) => {}
  ) {
    const tempGen = this.addGenerator({
      id: "init-gen",
      positionWatch: position,
      ...settings,
    });
    tempGen.updateDimension(dimension);
    const loader = new IWGInitalLoad(tempGen);
    await loader.run(onCheck);
    this.removeGenerator(tempGen.data.id);
  }

  static async safeExit(genId: string, onCheck = (gen: Generator) => {}) {
    const gen = this.getGenerator(genId);
    if (!gen) return false;
    const loader = new IWGSafeExit(gen);
    await loader.run(onCheck);
    this.removeGenerator(gen.data.id);
  }

  static async teleport(
    genId: string,
    location: LocationData,
    onCheck = (gen: Generator) => {}
  ) {
    const gen = this.getGenerator(genId);
    if (!gen) return false;
    const loader = new IWGTeleport(gen, location);
    await loader.run(onCheck);
  }
}

RegisterDefaultTasks();
