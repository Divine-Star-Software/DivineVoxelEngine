import {
  IWGGeneratorData,
  IWGSettignsData,
  IWGTasksTypes,
} from "../Types/IWG.types";

import { Vector3Like, Vec3Array, Vector2Like } from "@amodx/math";
import { ColumnDataTool } from "../../../../Tools/Data/WorldData/ColumnDataTool.js";
import { $2dMooreNeighborhood } from "../../../../Math/Constants/CardinalNeighbors.js";
import { MesherTool } from "../../../../Tools/Mesher/MesherTool.js";
import { TaskTool } from "../../../../Tools/Tasks/TasksTool.js";
import { WorldSpaces } from "../../../../Data/World/WorldSpaces.js";
import { DataLoaderTool } from "../../../DataLoader/World/Tools/DataLoaderTool.js";
import { AnaylzerTool } from "../../../../Tools/Anaylzer/AnaylzerTool.js";
import { WorldLock } from "../../../../Contexts/World/Lock/WorldLock.js";
import { IWGTaskBase } from "./Tasks/IWGTaskBase.js";
import { IWG } from "../IWG.js";

import { LocationBoundTool } from "../../../../Tools/Classes/LocationBoundTool.js";
import { ColumnState } from "../../Constants/ColumnState";
import { WorldRegister } from "../../../../Data/World/WorldRegister";
import { IWGTaskRegister } from "./Tasks/IWGTaskRegister";

import { Square, Circle } from "@amodx/math/Shapes";
import { LocationData } from "../../../../Math";

/**# Infinite World Generator
 *
 */
export class Generator extends LocationBoundTool {
  _anaylzerDone = true;
  anaylzer = new AnaylzerTool();
  columnTool = new ColumnDataTool();
  nColumnTool = new ColumnDataTool();
  builder = new MesherTool();
  dataLoader: DataLoaderTool | null = null;

  dveTasks = new TaskTool();

  _cachedPosition: Vec3Array = [-Infinity, -Infinity, -Infinity];
  _cachedVelocity: Vec3Array = [-Infinity, -Infinity, -Infinity];
  __build = true;
  _visitedMap: Map<string, boolean> = new Map();
  _builtColumns: Map<string, number[]> = new Map();
  private columnSquare = new Square(Vector2Like.Create(0, 0), 0);
  private genCircle = new Circle(Vector2Like.Create(0, 0), 0);
  private renderCircle = new Circle(Vector2Like.Create(0, 0), 0);
  private maxCircle = new Circle(Vector2Like.Create(0.1, 1), 10);
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
    this.columnSquare.sideLength = WorldSpaces.column._bounds.x;
    this.genCircle.radius = this.data.generateDistance;
    this.renderCircle.radius = this.data.renderDistance;
    this.maxCircle.radius = this.data.maxDistance!;
  }

  setDimension(dimensionId: string) {
    this.updateDimension(dimensionId);
    return this;
  }

  updateDimension(dimension: string) {
    this.dimension = dimension;
    this.location[0] = dimension;

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
    const dimesnionId = this.dimension;
    const dimension = WorldRegister.instance.dimensions.get(dimesnionId);
    if (!dimension) return;
    dimension.regions.forEach((region) => {
      region.columns.forEach((column, index) => {
        WorldRegister.instance.columnTool.setColumn(column);
        const [x, y, z] = region.getColumnPosition(index);

        if (WorldLock.isLocked([dimesnionId, x, y, z])) return;
        if (IWG.inProgressMap.has(x, 0, z)) return;
        if (
          !WorldRegister.instance.columnTool.isStored() ||
          WorldRegister.instance.columnTool.isDirty()
        ) {
          this.tasks.saving.get("dve_iwg_save")!.add(x, y, z);
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
    this.dataLoader.allColumns((tool, [dim, x, y, z]) => {
      this.tasks["saving"].get("dve_iwg_save_and_unload")!.add(x, y, z);
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
      tasks.runTasks(max, this._cachedPosition);
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
  /*   private debounedUnload = new DebouncedTasks({
    run: (location) => {
      if (!this.dataLoader) return;
      this.dataLoader.unLoadColumn(location);
    },
    timeOut: 5_000,
  }); */
  private cullColumns(position: Vec3Array) {
    const [x, y, z] = position;
    this.renderCircle.center.x = position[0];
    this.renderCircle.center.y = position[2];
    this.genCircle.center.x = position[0];
    this.genCircle.center.y = position[2];
    this.maxCircle.center.x = position[0];
    this.maxCircle.center.y = position[2];
    this.builder
      .setXYZ(x, y, z)
      .removeColumnsOutsideRadius(this.data.renderDistance);
    const dimension = WorldRegister.instance.dimensions.get(this.dimension);
    if (!dimension) return;
    dimension.regions.forEach((region) => {
      region.columns.forEach((column, index) => {
        WorldRegister.instance.columnTool.setColumn(column);
        const [x, y, z] = region.getColumnPosition(index);
        const location: LocationData = [this.dimension, x, y, z];
        this.columnSquare.center.x = x;
        this.columnSquare.center.y = z;
        const columnKey = WorldSpaces.column.getKeyXYZ(x, 0, z);
        if (this._builtColumns.has(columnKey)) {
          if (
            !Circle.IsSquareInsideOrTouchingCircle(
              this.columnSquare,
              this.renderCircle
            )
          ) {
            this._builtColumns.delete(columnKey);
          }
        }

        if (WorldLock.isLocked(location)) return;
        if (IWG.inProgressMap.has(location[1], 0, location[3])) return;
        if (this.dataLoader) {
          if (
            !Circle.IsSquareInsideOrTouchingCircle(
              this.columnSquare,
              this.maxCircle
            )
          ) {
            this.dataLoader.unLoadColumn(location);
            return;
          }
        }
      });
    });
  }

  private getColumnState([cx, cy, cz]: Vec3Array, queue: Vec3Array[]) {
    let genAlldone = true;
    let allLoaded = true;
    let nWorldGenAllDone = true;
    let nDecorAllDone = true;
    let nSunAllDone = true;
    let nPropagtionAllDone = true;

    if (!this.nColumnTool.loadInAt(cx, cy, cz)) {
      allLoaded = false;
      this.tasks["world-gen"].get("dve_iwg_load")!.add(cx, cy, cz);
      return {
        nWorldGenAllDone: false,
        nDecorAllDone: false,
        nSunAllDone: false,
        nPropagtionAllDone: false,
        genAlldone,
        allLoaded,
      };
    }
    if (!this.nColumnTool.getStructValue(ColumnState.GenDone)) {
      genAlldone = false;
    }
    if (!this.nColumnTool.getStructValue(ColumnState.SunDone)) {
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
      genAlldone,
      allLoaded,
    };
  }
  /* 
  private getColumnGenState([cx, cy, cz]: Vec3Array, queue: Vec3Array[]) {
    let genAlldone = true;
    let allLoaded = true;

    const columnPOS = WorldSpaces.column.getPositionXYZ(cx, cy, cz);

    if (!this.nColumnTool.loadInAt(columnPOS.x, cy, columnPOS.z)) {
      allLoaded = false;
      this.tasks["world-gen"]
        .get("dve_iwg_load")!
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
      if (!this._visitedMap.has(key)) {
        queue.push([columnPOS.x, cy, columnPOS.z]);
      }
    }
    return {
      genAlldone,
      allLoaded,
    };
  } */

  /*   generateUpdate() {
    const queue: Vec3Array[] = [];

    const position = this.data.positionWatch;

    const columnPosition = Vector3Like.Clone(
      WorldSpaces.column.getPositionXYZ(position[0], 0, position[2])
    );

    this._cachedPosition = Vector3Like.ToArray(columnPosition);
    queue.push([columnPosition.x, columnPosition.y, columnPosition.z]);

    this.genCircle.center.x = columnPosition.x;
    this.genCircle.center.y = columnPosition.z;
    while (queue.length) {
      const node = queue.shift();

      if (!node) break;
      const cx = node[0];
      const cy = 0;
      const cz = node[2];
      const sectionKey = `${cx}-0-${cz}`;
      //   if (WorldLock.isLocked(this.location)) continue;
      if (this._visitedMap.has(sectionKey)) continue;
      this._visitedMap.set(sectionKey, true);

      this.columnSquare.center.x = cx;
      this.columnSquare.center.y = cz;

      if (
        !Circle.IsSquareInsideOrTouchingCircle(
          this.columnSquare,
          this.genCircle
        )
      )
        continue;

      const { genAlldone, allLoaded } = this.getColumnGenState(
        [cx, cy, cz],
        queue
      );

      if (!genAlldone && allLoaded) {
        this.tasks["world-gen"].get("dve_iwg_generate")!.add(cx, cy, cz);
      }
    }
    this._visitedMap.clear();
  }
 */
  generateUpdate() {
    const queue: Vec3Array[] = [];

    const position = this.data.positionWatch;

    const columnPosition = Vector3Like.Clone(
      WorldSpaces.column.getPositionXYZ(position[0], 0, position[2])
    );
    queue.push([columnPosition.x, columnPosition.y, columnPosition.z]);

    this.genCircle.center.x = columnPosition.x;
    this.genCircle.center.y = columnPosition.z;

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

      this.columnSquare.center.x = cx;
      this.columnSquare.center.y = cz;

      if (
        !Circle.IsSquareInsideOrTouchingCircle(
          this.columnSquare,
          this.genCircle
        )
      )
        continue;

      const {
        nWorldGenAllDone,
        nSunAllDone,
        nPropagtionAllDone,
        nDecorAllDone,
        genAlldone,
        allLoaded,
      } = this.getColumnState([cx, 0, cz], queue);

      if (!genAlldone && allLoaded) {
        this.tasks["world-gen"].get("dve_iwg_generate")!.add(cx, cy, cz);
        continue;
      }

      if (!this.columnTool.loadInAt(cx, 0, cz)) {
        continue;
      }

      if (
        nWorldGenAllDone &&
        !this.columnTool.getStructValue(ColumnState.DecorDone)
      ) {
        this.tasks["world-gen"].get("dve_iwg_decorate")!.add(cx, cy, cz);
        continue;
      }

      if (
        nDecorAllDone &&
        !this.columnTool.getStructValue(ColumnState.SunDone)
      ) {
        this.tasks["world-gen"].get("dve_iwg_world_sun")!.add(cx, cy, cz);

        continue;
      }

      if (
        nSunAllDone &&
        !this.columnTool.getStructValue(ColumnState.PropagationDone)
      ) {
        this.tasks["world-gen"].get("dve_iwg_propagation")!.add(cx, cy, cz);
        continue;
      }
    }

    this._visitedMap.clear();
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

    this.renderCircle.center.x = columnPosition.x;
    this.renderCircle.center.y = columnPosition.z;

    while (queue.length) {
      const node = queue.shift();

      if (!node) break;
      const cx = node[0];
      const cy = 0;
      const cz = node[2];
      const columnKey = WorldSpaces.column.getKeyXYZ(cx, 0, cz);
      if (this._visitedMap.has(columnKey)) continue;
      this._visitedMap.set(columnKey, true);

      this.columnSquare.center.x = cx;
      this.columnSquare.center.y = cz;

      if (
        !Circle.IsSquareInsideOrTouchingCircle(
          this.columnSquare,
          this.renderCircle
        )
      )
        continue;

      if (!this.columnTool.loadInAt(cx, cy, cz)) continue;

      const { nWorldGenAllDone, nSunAllDone, nPropagtionAllDone } =
        this.getColumnState([cx, 0, cz], queue);

      if (nWorldGenAllDone && nSunAllDone && nPropagtionAllDone) {
        /*     if (this.debounedRemoveMesh.hasTasks(columnKey)) {
          this.debounedRemoveMesh.clearTasks(columnKey);
        } */
        if (this._builtColumns.has(columnKey)) continue;
        this.tasks[IWGTasksTypes.Rendering]
          .get("dve_iwg_build")!
          .add(cx, cy, cz);
      }
    }

    this._visitedMap.clear();
  }
}
