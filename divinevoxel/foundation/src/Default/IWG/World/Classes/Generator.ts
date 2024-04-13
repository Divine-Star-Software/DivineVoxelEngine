import type {
  IWGGeneratorData,
  IWGSettignsData,
  IWGTasksTypes,
} from "../Types/IWG.types";

import type { Vec3Array } from "@divinevoxel/core/Math";
import { ColumnDataTool } from "../../../Tools/Data/WorldData/ColumnDataTool.js";
import { $2dMooreNeighborhood } from "@divinevoxel/core/Math/Constants/CardinalNeighbors.js";
import { BuilderTool } from "../../../Tools/Build/BuilderTool.js";
import { TaskTool } from "../../../Tools/Tasks/TasksTool.js";
import { Distance3D } from "@divinevoxel/core/Math/Functions/Distance3d.js";
import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces.js";
import { DataLoaderTool } from "../../../Tools/Loader/DataLoaderTool.js";
import { AnaylzerTool } from "../../../Tools/Anaylzer/AnaylzerTool.js";
import { WorldLock } from "../../../../Contexts/World/Lock/WorldLock.js";
import { IWGTasks } from "./IWGTasks.js";
import { IWG } from "../IWG.js";
import { RichDataTool } from "../../../Tools/Data/RichDataTool.js";
import { LocationBoundTool } from "../../../Tools/Classes/LocationBoundTool.js";

/**# Infinite World Generator
 *
 */
export class Generator extends LocationBoundTool {
  _anaylzerDone = true;
  anaylzer = new AnaylzerTool();
  columnTool = new ColumnDataTool();
  nColumnTool = new ColumnDataTool();
  builder = new BuilderTool();
  dataLoader: DataLoaderTool | null = null;
  richData = new RichDataTool();
  dveTasks = new TaskTool();

  _cachedPosition: Vec3Array = [-Infinity, -Infinity, -Infinity];
  __build = true;
  _searchQueue: number[][] = [];

  _visitedMap: Map<string, boolean> = new Map();
  _activeColumns: Map<string, number[]> = new Map();

  tasks: Record<IWGTasksTypes, Map<string, IWGTasks>> = {
    saving: new Map(),
    updating: new Map(),
    "world-gen": new Map(),
  };

  constructor(public data: IWGGeneratorData) {
    super();
    if (!data.maxDistance) data.maxDistance = data.generateDistance + 16;
    if (!data.anaylzerDistance) data.anaylzerDistance = data.renderDistance;
    if (this.data.saveWorldData !== false) {
      const dataLoader = new DataLoaderTool();
      if (dataLoader.dataComm.isPortSet()) {
        this.dataLoader = dataLoader;
      } else {
        dataLoader.dataComm.onSetPort(() => {
          this.dataLoader = dataLoader;
        });
      }
    }

    for (const type in IWG.tasks) {
      const tasksData = IWG.tasks[type as IWGTasksTypes];
      for (const [key, data] of tasksData) {
        this.tasks[type as IWGTasksTypes].set(key, new IWGTasks(this, data));
      }
    }
  }

  setDimension(dimensionId: string) {
    this.updateDimension(dimensionId);
    return this;
  }
  updateDimension(dimension: string) {
    this.dimension = dimension;
    this.location[0] = dimension;
    this.richData.setDimension(dimension);
    this.columnTool.setDimension(dimension);
    this.nColumnTool.setDimension(dimension);
    this.dveTasks.setFocalPoint([dimension, 0, 0, 0]);
    this.anaylzer.setDimension(dimension);
    this.builder.setDimension(dimension);
    if (this.dataLoader) this.dataLoader.setDimension(dimension);
    return this;
  }

  clearAll() {
    this.builder.clearAll();
    this._activeColumns.clear();
  }

  saveUpdate(max = 5) {
    for (const [key, tasks] of this.tasks["saving"]) {
      tasks.runTasks(max);
    }
  }

  saveAllColumns() {
    if (!this.dataLoader) return;
    this.dataLoader.getAllUnStoredColumns((dim, x, y, z) => {
      this.tasks["saving"].get("#dve_iwg_save")!.add(x, y, z);
    });
  }

  unLoadAllColumns() {
    if (!this.dataLoader) return;
    this.dataLoader.allColumns((tool) => {
      const [dim, x, y, z] = tool.getLocationData();
      this.tasks["saving"].get("#dve_iwg_save_and_unload")!.add(x, y, z);
    });
  }

  _logTasks() {
    let log = "";
    for (const type in this.tasks) {
      log += `[[${type}]]\n`;
      for (const [key, task] of this.tasks[type as IWGTasksTypes]) {
        log += `${task.data.name}: queue: ${task.queue.length} waiting: ${task.waitingFor}\n`;
      }
    }
    return log;
  }

  anaylzerUpdate() {
    if (!this._anaylzerDone) return;
    this._anaylzerDone = false;
    this.anaylzer.runUpdate(this.data.anaylzerDistance!, () => {
      this._anaylzerDone = true;
    });
  }

  worldGenUpdate(max = 5) {
    for (const [key, tasks] of this.tasks["world-gen"]) {
      tasks.runTasks(max);
    }
  }

  cancelWorldGenTasks() {
    for (const [key, tasks] of this.tasks["world-gen"]) {
      tasks.cancelAll();
    }
  }

  updateSettings(settings: IWGSettignsData) {
    if (!settings.maxDistance)
      settings.maxDistance = settings.generateDistance + 16;
    if (!settings.anaylzerDistance)
      settings.anaylzerDistance = settings.renderDistance;
    this.data = { ...this.data, ...settings };
  }

  cullColumns() {
    const [x, y, z] = this._cachedPosition;
    this.builder
      .setXYZ(x, y, z)
      .removeColumnsOutsideRadius(this.data.renderDistance);
    for (const [key, pos] of this._activeColumns) {
      const distance = Distance3D(x, 0, z, pos[0], 0, pos[2]);
      if (distance <= this.data.renderDistance) continue;
      this._activeColumns.delete(key);
    }
    if (this.dataLoader) {
      this.dataLoader
        .setDimension(this.dimension)
        .setXYZ(x, y, z)
        .unLoadAllOutsideRadius(this.data.maxDistance!, (column) => {
          const { x, y, z } = WorldSpaces.column.getPositionLocation(
            column.getLocationData()
          );
          if (WorldLock.isLocked(column.getLocationData())) return false;
          if (IWG.inProgressMap.has(x, y, z)) return false;
          return true;
        });
    }
  }

  searchUpdate() {
    const position = this.data.positionWatch;
    let positionChanged = false;

    const worldColumnPOS = WorldSpaces.column
      .getPositionXYZ(position[0], 0, position[2])
      .copy();

    if (
      worldColumnPOS.x != this._cachedPosition[0] ||
      worldColumnPOS.y != this._cachedPosition[1] ||
      (worldColumnPOS.z != this._cachedPosition[2] && this.__build)
    )
      positionChanged = true;
    if (positionChanged) {
      this.cancelWorldGenTasks();

      this._cachedPosition[0] = worldColumnPOS.x;
      this._cachedPosition[1] = worldColumnPOS.y;
      this._cachedPosition[2] = worldColumnPOS.z;
      this._searchQueue = [];
      this.cullColumns();
    }

    this._searchQueue.push([
      worldColumnPOS.x,
      worldColumnPOS.y,
      worldColumnPOS.z,
    ]);

    while (this._searchQueue.length) {
      const node = this._searchQueue.shift();

      if (!node) break;
      const cx = node[0];
      const cy = 0;
      const cz = node[2];
      const columnKey = WorldSpaces.column.getKeyXYZ(cx, 0, cz);
      this.setXYZ(
        WorldSpaces.column._position.x,
        WorldSpaces.column._position.y,
        WorldSpaces.column._position.z
      );
      if (WorldLock.isLocked(this.location)) continue;
      if (this._visitedMap.has(columnKey) || IWG.inProgressMap.has(cx, 0, cz))
        continue;
      this._visitedMap.set(columnKey, true);

      const distance = Distance3D(
        worldColumnPOS.x,
        0,
        worldColumnPOS.z,
        cx,
        0,
        cz
      );
      if (distance > this.data.maxDistance!) continue;

      if (!this.columnTool.loadInAt(cx, cy, cz)) {
        this.tasks["world-gen"].get("#dve_iwg_load")!.add(cx, cy, cz);
        continue;
      }

      if (!this.columnTool.getTagValue("#dve_is_world_gen_done")) {
        this.tasks["world-gen"].get("#dve_iwg_generate")!.add(cx, cy, cz);
        continue;
      }

      let nWorldGenAllDone = true;
      let nDecorAllDone = true;
      let nSunAllDone = true;
      let nPropagtionAllDone = true;
      if (!this.columnTool.getTagValue("#dve_is_world_sun_done")) {
        nSunAllDone = false;
      }

      for (const n of $2dMooreNeighborhood) {
        const nx = cx + n[0] * WorldSpaces.column._bounds.x;
        const nz = cz + n[1] * WorldSpaces.column._bounds.z;
        const columnPOS = WorldSpaces.column.getPositionXYZ(nx, cy, nz),
          key = WorldSpaces.column.getKey();
        if (!this._visitedMap.has(key)) {
          this._searchQueue.push([columnPOS.x, cy, columnPOS.z]);
        }
        if (!this.nColumnTool.loadInAt(columnPOS.x, cy, columnPOS.z)) {
          nWorldGenAllDone = false;
          nSunAllDone = false;
          nDecorAllDone = false;
          break;
        }
        if (!this.nColumnTool.getTagValue("#dve_is_world_gen_done")) {
          nWorldGenAllDone = false;
        }
        if (!this.nColumnTool.getTagValue("#dve_is_world_decor_done")) {
          nDecorAllDone = false;
        }
        if (!this.nColumnTool.getTagValue("#dve_is_world_sun_done")) {
          nSunAllDone = false;
        }
        if (!this.nColumnTool.getTagValue("#dve_is_world_propagation_done")) {
          nPropagtionAllDone = false;
        }
      }

      if (
        nWorldGenAllDone &&
        !this.columnTool.getTagValue("#dve_is_world_decor_done")
      ) {
        this.tasks["world-gen"].get("#dve_iwg_decorate")!.add(cx, cy, cz);
        continue;
      }

      if (
        nDecorAllDone &&
        !this.columnTool.getTagValue("#dve_is_world_sun_done")
      ) {
        this.tasks["world-gen"].get("#dve_iwg_world_sun")!.add(cx, cy, cz);

        continue;
      }

      if (
        nSunAllDone &&
        !this.columnTool.getTagValue("#dve_is_world_propagation_done")
      ) {
        this.tasks["world-gen"].get("#dve_iwg_propagation")!.add(cx, cy, cz);
        continue;
      }

      if (nWorldGenAllDone && nSunAllDone && nPropagtionAllDone) {
        if (!this.columnTool.isStored()) {
          this.tasks["saving"].get("#dve_iwg_save")!.add(cx, cy, cz);
        }

        if (
          distance > this.data.renderDistance ||
          this._activeColumns.has(columnKey) ||
          !this.__build
        )
          continue;
        this.tasks["world-gen"].get("#dve_iwg_build")!.add(cx, cy, cz);
      }
    }

    this._visitedMap.clear();
  }
}
