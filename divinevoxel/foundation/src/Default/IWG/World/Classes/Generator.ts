import {
  IWGGeneratorData,
  IWGSettignsData,
  IWGTasksTypes,
} from "../Types/IWG.types";

import { Vector3Like, Vec3Array } from "@divinevoxel/core/Math";
import { ColumnDataTool } from "../../../Tools/Data/WorldData/ColumnDataTool.js";
import { $2dMooreNeighborhood } from "@divinevoxel/core/Math/Constants/CardinalNeighbors.js";
import { BuilderTool } from "../../../Tools/Build/BuilderTool.js";
import { TaskTool } from "../../../Tools/Tasks/TasksTool.js";
import { Distance3D } from "@divinevoxel/core/Math/Functions/Distance3d.js";
import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces.js";
import { DataLoaderTool } from "../../../DataLoader/World/Tools/DataLoaderTool.js";
import { AnaylzerTool } from "../../../Tools/Anaylzer/AnaylzerTool.js";
import { WorldLock } from "../../../../Contexts/World/Lock/WorldLock.js";
import { IWGTaskBase } from "./Tasks/IWGTaskBase.js";
import { IWG } from "../IWG.js";
import { RichDataTool } from "../../../Tools/Data/RichDataTool.js";
import { LocationBoundTool } from "../../../Tools/Classes/LocationBoundTool.js";
import { ColumnState } from "../../Constants/ColumnState";
import { DebouncedTasks } from "./DebouncedTasks";
import { WorldRegister } from "../../../../Data/World/WorldRegister";
import { IWGTaskRegister } from "./Tasks/IWGTaskRegister";

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
  _cachedLeadPosition: Vec3Array = [-Infinity, -Infinity, -Infinity];
  _cachedVelocity: Vec3Array = [-Infinity, -Infinity, -Infinity];
  __build = true;
  _sectionVisitedMap: Map<string, boolean> = new Map();
  _visitedMap: Map<string, boolean> = new Map();
  _builtColumns: Map<string, number[]> = new Map();

  tasks: Record<IWGTasksTypes, Map<string, IWGTaskBase>> = {
    [IWGTasksTypes.WorldGen]: new Map(),
    [IWGTasksTypes.Rendering]: new Map(),
    [IWGTasksTypes.Saving]: new Map(),
    [IWGTasksTypes.Updating]: new Map(),
  };

  constructor(public data: IWGGeneratorData) {
    super();
    if (!data.maxDistance) data.maxDistance = data.generateDistance + 16;
    if (!data.anaylzerDistance) data.anaylzerDistance = data.renderDistance;
    this._cachedPosition = [
      data.positionWatch[0],
      data.positionWatch[1],
      data.positionWatch[2],
    ];
    this._cachedVelocity = data.velocityWatch
      ? [data.velocityWatch[0], data.velocityWatch[1], data.velocityWatch[2]]
      : [0, 0, 0];

    if (this.data.saveWorldData !== false) {
      this.dataLoader = new DataLoaderTool();
    }

    for (const [id, taskClass] of IWGTaskRegister.tasks) {
      this.tasks[taskClass.Data.type].set(id, new taskClass(this));
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
    this._builtColumns.clear();
  }

  saveUpdate(max = 5) {
    const dimension = WorldRegister.instance.dimensions.get(this.dimension);
    if (!dimension) return;
    dimension.regions.forEach((region) => {
      region.columns.forEach((column) => {
        WorldRegister.instance.columnTool.setColumn(column);
        const [dim, x, y, z] =
          WorldRegister.instance.columnTool.getLocationData();

        if (WorldLock.isLocked([dim, x, y, z])) return;
        if (IWG.inProgressMap.has(x, 0, z)) return;
        if (
          !WorldRegister.instance.columnTool.isStored() ||
          WorldRegister.instance.columnTool.isDirty()
        ) {
          this.tasks.saving.get("#dve_iwg_save")!.add(x, y, z);
        }
      });
    });
    for (const [key, tasks] of this.tasks["saving"]) {
      tasks.runTasks(max, this._cachedPosition);
    }
  }

  saveAllColumns() {
    if (!this.dataLoader) return;

    this.saveUpdate(Infinity);
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
        log += `${task.getMeta().name}: queue: ${task.queue.length} waiting: ${
          task.waitingFor
        }\n`;
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
    for (const [key, tasks] of this.tasks[IWGTasksTypes.WorldGen]) {
      tasks.runTasks(max, this._cachedPosition);
    }
  }

  renderTaskUpdate(max = Infinity) {
    for (const [key, tasks] of this.tasks[IWGTasksTypes.Rendering]) {
      tasks.runTasks(max, this._cachedLeadPosition);
    }
  }

  cancelWorldGenTasks() {
    for (const [key, tasks] of this.tasks[IWGTasksTypes.WorldGen]) {
      tasks.cancelAll();
    }
  }
  cancelAllRenderTask() {
    for (const [key, tasks] of this.tasks[IWGTasksTypes.Rendering]) {
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

  /*   private debounedRemoveMesh = new DebouncedTasks({
    run: (location) => {
      const columnKey = WorldSpaces.column.getKeyXYZ(
        location[1],
        0,
        location[3]
      );
      this.builder.setLocation(location).removeColumn();
      this._builtColumns.delete(columnKey);
    },
    timeOut: 100,
  });
 */
  private debounedUnload = new DebouncedTasks({
    run: (location) => {
      if (!this.dataLoader) return;
      this.dataLoader.unLoadColumn(location);
    },
    timeOut: 5_000,
  });
  private cullColumns(position: Vec3Array) {
    const [x, y, z] = position;

    this.builder
      .setXYZ(x, y, z)
      .removeColumnsOutsideRadius(this.data.renderDistance);
    const dimension = WorldRegister.instance.dimensions.get(this.dimension);
    if (!dimension) return;
    dimension.regions.forEach((region) => {
      region.columns.forEach((column) => {
        WorldRegister.instance.columnTool.setColumn(column);
        const location = WorldRegister.instance.columnTool.getLocationData();

        const distance = Distance3D(x, 0, z, location[1], 0, location[3]);
        const columnKey = WorldSpaces.column.getKeyXYZ(
          location[1],
          0,
          location[3]
        );
        if (this._builtColumns.has(columnKey)) {
          if (distance > this.data.renderDistance) {
            this._builtColumns.delete(columnKey);
          }
        }

        if (WorldLock.isLocked(location)) return;
        if (IWG.inProgressMap.has(location[1], 0, location[3])) return;
        if (
          distance >
          (this.data.maxDistance! + (this.data.velocityScale || 0)) * 2
        ) {
          this.debounedUnload.runTasksNow(location);
          return;
        }
        if (distance > this.data.maxDistance! * 1.3) {
          this.debounedUnload.runTasks(location);
          return;
        } else {
          this.debounedUnload.clearTasks(location);
          return;
        }
      });
    });
  }

  private getColumnState([cx, cy, cz]: Vec3Array, queue: Vec3Array[]) {
    let nWorldGenAllDone = true;
    let nDecorAllDone = true;
    let nSunAllDone = true;
    let nPropagtionAllDone = true;
    if (!this.columnTool.getStructValue(ColumnState.SunDone)) {
      nSunAllDone = false;
    }

    for (const n of $2dMooreNeighborhood) {
      const nx = cx + n[0] * WorldSpaces.column._bounds.x;
      const nz = cz + n[1] * WorldSpaces.column._bounds.z;
      const columnPOS = WorldSpaces.column.getPositionXYZ(nx, cy, nz),
        key = WorldSpaces.column.getKey();
      if (!this._visitedMap.has(key)) {
        queue.push([columnPOS.x, cy, columnPOS.z]);
      }
      if (!this.nColumnTool.loadInAt(columnPOS.x, cy, columnPOS.z)) {
        nWorldGenAllDone = false;
        nSunAllDone = false;
        nDecorAllDone = false;
        break;
      }
      if (!this.nColumnTool.getStructValue(ColumnState.GenDone)) {
        nWorldGenAllDone = false;
      }
      if (!this.nColumnTool.getStructValue(ColumnState.DecorDone)) {
        nDecorAllDone = false;
      }
      if (!this.nColumnTool.getStructValue(ColumnState.SunDone)) {
        nSunAllDone = false;
      }
      if (!this.nColumnTool.getStructValue(ColumnState.PropagationDone)) {
        nPropagtionAllDone = false;
      }
    }
    return {
      nWorldGenAllDone,
      nDecorAllDone,
      nSunAllDone,
      nPropagtionAllDone,
    };
  }
  private getColumnSectionState([cx, cy, cz]: Vec3Array, queue: Vec3Array[]) {
    let genAlldone = true;
    let allLoaded = true;
    for (let x = cx; x < cx + 32; x += 16) {
      for (let z = cz; z < cz + 32; z += 16) {
        const columnPOS = WorldSpaces.column.getPositionXYZ(x, cy, z);

        if (!this.nColumnTool.loadInAt(columnPOS.x, cy, columnPOS.z)) {
          allLoaded = false;
          this.tasks["world-gen"]
            .get("#dve_iwg_load")!
            .add(columnPOS.x, cy, columnPOS.z);
          continue;
        }
        if (!this.nColumnTool.getStructValue(ColumnState.GenDone)) {
          genAlldone = false;
        }
      }
    }
    for (const n of $2dMooreNeighborhood) {
      const nx = Math.floor((cx + n[0] * 32) / 32) * 32;
      const nz = Math.floor((cz + n[1] * 32) / 32) * 32;
      const columnPOS = {
          x: nx,
          y: 0,
          z: nz,
        },
        key = `${nx}-0-${nz}`;
      if (!this._sectionVisitedMap.has(key)) {
        queue.push([columnPOS.x, cy, columnPOS.z]);
      }
    }
    return {
      genAlldone,
      allLoaded,
    };
  }
  private getColumnGenState([cx, cy, cz]: Vec3Array, queue: Vec3Array[]) {
    let genAlldone = true;
    let allLoaded = true;

    const columnPOS = WorldSpaces.column.getPositionXYZ(cx, cy, cz);

    if (!this.nColumnTool.loadInAt(columnPOS.x, cy, columnPOS.z)) {
      allLoaded = false;
      this.tasks["world-gen"]
        .get("#dve_iwg_load")!
        .add(columnPOS.x, cy, columnPOS.z);
      return {
        genAlldone,
        allLoaded,
      };
    }
    if (!this.nColumnTool.getStructValue(ColumnState.GenDone)) {
      genAlldone = false;
    }

    for (const n of $2dMooreNeighborhood) {
      const nx = cx + n[0] * WorldSpaces.column._bounds.x;
      const nz = cz + n[1] * WorldSpaces.column._bounds.z;
      const columnPOS = {
          x: nx,
          y: 0,
          z: nz,
        },
        key = `${nx}-0-${nz}`;
      if (!this._sectionVisitedMap.has(key)) {
        queue.push([columnPOS.x, cy, columnPOS.z]);
      }
    }
    return {
      genAlldone,
      allLoaded,
    };
  }
  generateUpdate() {
    const queue: Vec3Array[] = [];

    const position = this.data.positionWatch;
    const velocityWatch = this.data.velocityWatch
      ? this.data.velocityWatch
      : [0, 0, 0];

    const columnPosition = Vector3Like.Clone(
      WorldSpaces.column.getPositionXYZ(position[0], 0, position[2])
    );

    this._cachedLeadPosition = Vector3Like.ToArray(columnPosition);
    queue.push([columnPosition.x, columnPosition.y, columnPosition.z]);

    let velocityChanged = false;

    if (
      (velocityWatch[0] != this._cachedVelocity[0] ||
        velocityWatch[2] != this._cachedVelocity[2]) &&
      this.__build
    )
      velocityChanged = true;
    if (velocityChanged) {
      this.cancelWorldGenTasks();
      this._cachedVelocity[0] = velocityWatch[0];
      this._cachedVelocity[1] = velocityWatch[1];
      this._cachedVelocity[2] = velocityWatch[2];
      this.cullColumns(this._cachedPosition);
    }

    while (queue.length) {
      const node = queue.shift();

      if (!node) break;
      const cx = node[0];
      const cy = 0;
      const cz = node[2];
      const sectionKey = `${cx}-0-${cz}`;
      //   if (WorldLock.isLocked(this.location)) continue;
      if (this._sectionVisitedMap.has(sectionKey)) continue;
      this._sectionVisitedMap.set(sectionKey, true);

      const genDistance = Distance3D(
        columnPosition.x,
        0,
        columnPosition.z,
        cx,
        0,
        cz
      );
      if (genDistance > this.data.generateDistance!) continue;


      const { genAlldone, allLoaded } = this.getColumnGenState(
        [cx, cy, cz],
        queue
      );

      if (!genAlldone && allLoaded) {
        this.tasks["world-gen"].get("#dve_iwg_generate")!.add(cx, cy, cz);
      }
    }
    this._sectionVisitedMap.clear();
  }

/*   generateUpdateO() {
    const queue: Vec3Array[] = [];

    const position = this.data.positionWatch;
    const velocityWatch = this.data.velocityWatch
      ? this.data.velocityWatch
      : [0, 0, 0];

    const generationColumnPos = {
      x: Math.floor(position[0] / 32) * 32,
      y: 0,
      z: Math.floor(position[2] / 32) * 32,
    };
    const columnPosition = Vector3Like.Clone(
      WorldSpaces.column.getPositionXYZ(position[0], 0, position[2])
    );

    this._cachedLeadPosition = Vector3Like.ToArray(generationColumnPos);
    queue.push([
      generationColumnPos.x,
      generationColumnPos.y,
      generationColumnPos.z,
    ]);

    let velocityChanged = false;

    if (
      (velocityWatch[0] != this._cachedVelocity[0] ||
        velocityWatch[2] != this._cachedVelocity[2]) &&
      this.__build
    )
      velocityChanged = true;
    if (velocityChanged) {
      this.cancelWorldGenTasks();
      this._cachedVelocity[0] = velocityWatch[0];
      this._cachedVelocity[1] = velocityWatch[1];
      this._cachedVelocity[2] = velocityWatch[2];
      this.cullColumns(this._cachedPosition);
    }

    while (queue.length) {
      const node = queue.shift();

      if (!node) break;
      const cx = node[0];
      const cy = 0;
      const cz = node[2];
      const sectionKey = `${cx}-0-${cz}`;
      //   if (WorldLock.isLocked(this.location)) continue;
      if (this._sectionVisitedMap.has(sectionKey)) continue;
      this._sectionVisitedMap.set(sectionKey, true);

      const genDistance = Distance3D(
        generationColumnPos.x,
        0,
        columnPosition.z,
        cx,
        0,
        cz
      );
      if (genDistance > this.data.generateDistance!) continue;

      const { genAlldone, allLoaded } = this.getColumnSectionState(
        [cx, cy, cz],
        queue
      );

      if (!genAlldone && allLoaded) {
        this.tasks["world-gen"]
          .get("#dve_iwg_generate_section")!
          .add(cx, cy, cz);
      }
    }
    this._sectionVisitedMap.clear();
  }
  generateUpdate() {
    for (let velocityFactor = 0; velocityFactor < 2; velocityFactor++) {
      const queue: Vec3Array[] = [];
      const velocityScale =
        (this.data.velocityScale ? this.data.velocityScale : 6400) *
        velocityFactor;
      const position = this.data.positionWatch;
      const velocityWatch = this.data.velocityWatch
        ? this.data.velocityWatch
        : [0, 0, 0];

      const generationColumnPos = {
        x: Math.floor(position[0] / 32) * 32 + velocityWatch[0] * velocityScale,
        y: 0,
        z: Math.floor(position[2] / 32) * 32 + velocityWatch[2] * velocityScale,
      };

      this._cachedLeadPosition = Vector3Like.ToArray(generationColumnPos);
      queue.push([
        generationColumnPos.x,
        generationColumnPos.y,
        generationColumnPos.z,
      ]);

      let velocityChanged = false;

      if (
        (velocityWatch[0] != this._cachedVelocity[0] ||
          velocityWatch[2] != this._cachedVelocity[2]) &&
        this.__build
      )
        velocityChanged = true;
      if (velocityChanged) {
        this.cancelWorldGenTasks();
        this._cachedVelocity[0] = velocityWatch[0];
        this._cachedVelocity[1] = velocityWatch[1];
        this._cachedVelocity[2] = velocityWatch[2];
        this.cullColumns(this._cachedPosition);
      }

      while (queue.length) {
        const node = queue.shift();

        if (!node) break;
        const cx = node[0];
        const cy = 0;
        const cz = node[2];
        const sectionKey = `${cx}-0-${cz}`;
        //   if (WorldLock.isLocked(this.location)) continue;
        if (this._sectionVisitedMap.has(sectionKey)) continue;
        this._sectionVisitedMap.set(sectionKey, true);

        const genDistance = Distance3D(
          generationColumnPos.x,
          0,
          generationColumnPos.z,
          cx,
          0,
          cz
        );
        if (
          genDistance >
          (velocityFactor == 0
            ? this.data.generateDistance!
            : this.data.generateLeadDistance || this.data.generateDistance)
        )
          continue;

        const { genAlldone, allLoaded } = this.getColumnSectionState(
          [cx, cy, cz],
          queue
        );

        if (!genAlldone && allLoaded) {
          this.tasks["world-gen"]
            .get("#dve_iwg_generate_section")!
            .add(cx, cy, cz);
        }
      }
      this._sectionVisitedMap.clear();
    }
  } */

  propagationUpdateO() {
    const queue: Vec3Array[] = [];

    const position = this.data.positionWatch;

    const columnPosition = Vector3Like.Clone(
      WorldSpaces.column.getPositionXYZ(position[0], 0, position[2])
    );

    const generationColumnPos = {
      x: columnPosition.x,
      y: columnPosition.y,
      z: columnPosition.z,
    };

    queue.push([
      generationColumnPos.x,
      generationColumnPos.y,
      generationColumnPos.z,
    ]);

    while (queue.length) {
      const node = queue.shift();

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

      const genDistance = Distance3D(
        generationColumnPos.x,
        0,
        generationColumnPos.z,
        cx,
        0,
        cz
      );
      if (genDistance > this.data.generateDistance!) continue;
      if (!this.columnTool.loadInAt(cx, cy, cz)) {
        continue;
      }

      const {
        nWorldGenAllDone,
        nSunAllDone,
        nPropagtionAllDone,
        nDecorAllDone,
      } = this.getColumnState([cx, 0, cz], queue);

      if (
        nWorldGenAllDone &&
        !this.columnTool.getStructValue(ColumnState.DecorDone)
      ) {
        this.tasks["world-gen"].get("#dve_iwg_decorate")!.add(cx, cy, cz);
        continue;
      }

      if (
        nDecorAllDone &&
        !this.columnTool.getStructValue(ColumnState.SunDone)
      ) {
        this.tasks["world-gen"].get("#dve_iwg_world_sun")!.add(cx, cy, cz);

        continue;
      }

      if (
        nSunAllDone &&
        !this.columnTool.getStructValue(ColumnState.PropagationDone)
      ) {
        this.tasks["world-gen"].get("#dve_iwg_propagation")!.add(cx, cy, cz);
        continue;
      }
    }

    this._visitedMap.clear();
  }
  propagationUpdate() {
    for (let velocityFactor = 0; velocityFactor < 2; velocityFactor++) {
      const queue: Vec3Array[] = [];
      const velocityScale =
        (this.data.velocityScale ? this.data.velocityScale : 6400) *
        velocityFactor;
      const position = this.data.positionWatch;
      const velocityWatch = this.data.velocityWatch
        ? this.data.velocityWatch
        : [0, 0, 0];
      const columnPosition = Vector3Like.Clone(
        WorldSpaces.column.getPositionXYZ(position[0], 0, position[2])
      );

      const generationColumnPos = {
        x: columnPosition.x + velocityWatch[0] * velocityScale,
        y: columnPosition.y,
        z: columnPosition.z + velocityWatch[2] * velocityScale,
      };

      queue.push([
        generationColumnPos.x,
        generationColumnPos.y,
        generationColumnPos.z,
      ]);

      while (queue.length) {
        const node = queue.shift();

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

        const genDistance = Distance3D(
          generationColumnPos.x,
          0,
          generationColumnPos.z,
          cx,
          0,
          cz
        );
        if (
          genDistance >
          (velocityFactor == 0
            ? this.data.generateDistance!
            : this.data.generateLeadDistance || this.data.generateDistance)
        )
          continue;
        if (!this.columnTool.loadInAt(cx, cy, cz)) {
          continue;
        }

        const {
          nWorldGenAllDone,
          nSunAllDone,
          nPropagtionAllDone,
          nDecorAllDone,
        } = this.getColumnState([cx, 0, cz], queue);

        if (
          nWorldGenAllDone &&
          !this.columnTool.getStructValue(ColumnState.DecorDone)
        ) {
          this.tasks["world-gen"].get("#dve_iwg_decorate")!.add(cx, cy, cz);
          continue;
        }

        if (
          nDecorAllDone &&
          !this.columnTool.getStructValue(ColumnState.SunDone)
        ) {
          this.tasks["world-gen"].get("#dve_iwg_world_sun")!.add(cx, cy, cz);

          continue;
        }

        if (
          nSunAllDone &&
          !this.columnTool.getStructValue(ColumnState.PropagationDone)
        ) {
          this.tasks["world-gen"].get("#dve_iwg_propagation")!.add(cx, cy, cz);
          continue;
        }
      }

      this._visitedMap.clear();
    }
  }
  renderUpdate() {
    const position = this.data.positionWatch;
    const queue: Vec3Array[] = [];
    let positionChanged = false;

    if (!this.__build) return;
    const columnPosition = Vector3Like.Clone(
      WorldSpaces.column.getPositionXYZ(position[0], 0, position[2])
    );

    if (
      (columnPosition.x != this._cachedPosition[0] ||
        columnPosition.z != this._cachedPosition[2]) &&
      this.__build
    )
      positionChanged = true;
    if (positionChanged) {
      this.cancelWorldGenTasks();
      this.cancelAllRenderTask();

      this._cachedPosition[0] = columnPosition.x;
      this._cachedPosition[1] = columnPosition.y;
      this._cachedPosition[2] = columnPosition.z;

      this.cullColumns([columnPosition.x, columnPosition.y, columnPosition.z]);
    }
    queue.push([columnPosition.x, columnPosition.y, columnPosition.z]);

    while (queue.length) {
      const node = queue.shift();

      if (!node) break;
      const cx = node[0];
      const cy = 0;
      const cz = node[2];
      const columnKey = WorldSpaces.column.getKeyXYZ(cx, 0, cz);
      if (this._visitedMap.has(columnKey)) continue;
      this._visitedMap.set(columnKey, true);

      const renderDistance = Distance3D(
        columnPosition.x,
        0,
        columnPosition.z,
        cx,
        0,
        cz
      );
      if (renderDistance > this.data.renderDistance!) continue;

      if (!this.columnTool.loadInAt(cx, cy, cz)) continue;

      const { nWorldGenAllDone, nSunAllDone, nPropagtionAllDone } =
        this.getColumnState([cx, 0, cz], queue);

      if (nWorldGenAllDone && nSunAllDone && nPropagtionAllDone) {
        /*     if (this.debounedRemoveMesh.hasTasks(columnKey)) {
          this.debounedRemoveMesh.clearTasks(columnKey);
        } */
        if (this._builtColumns.has(columnKey)) continue;
        this.tasks[IWGTasksTypes.Rendering]
          .get("#dve_iwg_build")!
          .add(cx, cy, cz);
      }
    }

    this._visitedMap.clear();
  }
}
