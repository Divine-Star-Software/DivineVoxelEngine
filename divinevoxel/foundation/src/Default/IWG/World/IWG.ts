import type {
  IWGGeneratorData,
  IWGSettignsData,
  IWGTasksData,
  IWGTasksTypes,
} from "./Types/IWG.types";
import type { Vec3Array } from "@divinevoxel/core/Math";
import { Generator } from "./Classes/Generator.js";
import { RegisterDefaultTasks } from "./Tasks/RegisterDefaultTasks.js";
import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces.js";
import { IWGInitalLoad } from "./Load/InitLoad.js";
import { IWGSafeExit } from "./Load/SafeExit.js";
import { IWGTeleport } from "./Load/Teleport.js";
import { LocationData } from "@divinevoxel/core/Math";

export const IWG = {
  tasks: <Record<IWGTasksTypes, Map<string, IWGTasksData>>>{
    saving: new Map(),
    updating: new Map(),
    "world-gen": new Map(),
  },
  inProgressMap: {
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
  },

  getKey(x: number, y: number, z: number) {
    return WorldSpaces.column.getKeyXYZ(x, y, z);
  },

  generators: <Map<string, Generator>>new Map(),

  addGenerator(data: IWGGeneratorData) {
    const gen = new Generator(data);
    this.generators.set(gen.data.id, gen);
    return gen;
  },

  getGenerator(id: string) {
    const gen = this.generators.get(id);
    if (!gen) return false;
    return gen;
  },

  removeGenerator(id: string) {
    return this.generators.delete(id);
  },

  worldGenUpdate(max = 5) {
    for (const [key, gen] of this.generators) {
      gen.worldGenUpdate(max);
    }
  },

  searchUpdate() {
    for (const [key, gen] of this.generators) {
      gen.searchUpdate();
    }
  },

  saveUpdate(max = 5) {
    for (const [key, gen] of this.generators) {
      gen.saveUpdate(max);
    }
  },

  registerTasks(type: IWGTasksTypes, tasksData: IWGTasksData) {
    this.tasks[type].set(tasksData.id, tasksData);
  },

  async initalLoad(
    dimension: string,
    position: Vec3Array,
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
  },

  async safeExit(genId: string, onCheck = (gen: Generator) => {}) {
    const gen = this.getGenerator(genId);
    if (!gen) return false;
    const loader = new IWGSafeExit(gen);
    await loader.run(onCheck);
    this.removeGenerator(gen.data.id);
  },
  async teleport(
    genId: string,
    location: LocationData,
    onCheck = (gen: Generator) => {}
  ) {
    const gen = this.getGenerator(genId);
    if (!gen) return false;
    const loader = new IWGTeleport(gen, location);
    await loader.run(onCheck);
  },
};

RegisterDefaultTasks();
