import type { IWGData } from "../Meta/IWG.types";
import { ColumnDataTool } from "../../../Tools/Data/ColumnDataTool.js";
import { WorldBounds } from "../../../Data/World/WorldBounds.js";
import { $2dMooreNeighborhood } from "../../../Data/Constants/Util/CardinalNeighbors.js";
import { VoxelMath } from "../../../Libs/Math/VoxelMath.js";
import { BuilderTool } from "../../../Tools/Build/Builder.js";
import { TasksTool } from "../../../Tools/Tasks/TasksTool.js";

/**# Infinite World Generator
 *
 */
export class IWG {
 columnTool = new ColumnDataTool();
 nColumnTool = new ColumnDataTool();
 builder = new BuilderTool();
 tasks = TasksTool();
 dimension: string = "main";
 _cachedPosition = [0, 0, 0];
 _columnQueue: number[][] = [];

 _generateQueue: number[][] = [];

 _visitedMap: Map<string, boolean> = new Map();

 _activeColumns: Map<string, number[]> = new Map();

 _generateMap: Map<string, boolean> = new Map();
 _sunMap: Map<string, boolean> = new Map();

 constructor(public data: IWGData) {}

 setDimension(id: string) {
  this.dimension = id;
 }
 update() {
  const position = this.data.positionWatch;
  let positionChanged = false;
  const wx = position[0];
  const wy = position[1];
  const wz = position[2];
  if (
   wx != this._cachedPosition[0] ||
   wy != this._cachedPosition[1] ||
   wz != this._cachedPosition[2]
  )
   positionChanged = true;
  if (positionChanged) {
  }

  const columnPOS = WorldBounds.getColumnPosition(wx, wz, wy);
  this._generateQueue.push([columnPOS.x, columnPOS.y, columnPOS.z]);

  const activeColumns: Map<string, boolean> = new Map();
  while (this._generateQueue.length) {
   const node = this._generateQueue.shift();

   if (!node) break;

   const cx = node[0];
   const cy = node[1];
   const cz = node[2];
   const columnKey = WorldBounds.getColumnKey(cx, cz, cy);
   if (this._visitedMap.has(columnKey)) continue;
   this._visitedMap.set(columnKey, true);
   const distance = VoxelMath.distance3D(wx, 0, wz, cx, 0, cz);

   if (distance > this.data.generateDistance) continue;
   if (this._generateMap.has(columnKey)) continue;

   if (distance > this.data.renderDistance) {
    const value = this._activeColumns.get(columnKey);
    if (value) {
     this.builder
      .setDimension(this.dimension)
      .setXYZ(value[0], value[1], value[2])
      .removeColumn();
     this._activeColumns.delete(columnKey);
    }
    continue;
   }

   let needToGenerate = false;
   if (!this.columnTool.loadIn(cx, cy, cz)) {
    needToGenerate = true;
   } else {
    if (!this.columnTool.getTagValue("#dve:is_world_gen_done")) {
     needToGenerate = true;
    }
   }

   if (needToGenerate) {
    this.builder.setDimension(this.dimension).setXYZ(cx, cy, cz).fillColumn();
    this._generateMap.set(columnKey, true);
    this.tasks.generate.deferred.run(cx, cy, cz, [], () => {
     if (this.columnTool.loadIn(cx, cy, cz)) {
      this._generateMap.delete(columnKey);

      this.columnTool.setTagValue("#dve:is_world_gen_done", 1);
     }
    });
    continue;
   }

   let nWorldGenAllDone = true;
   let nSunAllDone = true;
   if (!this.columnTool.getTagValue("#dve:is_world_sun_done")) {
    nSunAllDone = false;
   }
   for (const n of $2dMooreNeighborhood) {
    if (!nWorldGenAllDone && !nSunAllDone) break;
    const nx = cx + n[0] * WorldBounds.chunkXSize;
    const nz = cz + n[1] * WorldBounds.chunkZSize;
    const columnPOS = WorldBounds.getColumnPosition(nx, nz, cy);
    this._generateQueue.push([columnPOS.x, cy, columnPOS.z]);
    if (!this.nColumnTool.loadIn(columnPOS.x, cy, columnPOS.z)) {
     nWorldGenAllDone = false;
     nSunAllDone = false;
     break;
    }
    if (!this.nColumnTool.getTagValue("#dve:is_world_gen_done")) {
     nWorldGenAllDone = false;
    }
    if (!this.nColumnTool.getTagValue("#dve:is_world_sun_done")) {
     nSunAllDone = false;
    }
   }

   if (nWorldGenAllDone && !nSunAllDone && !this._sunMap.has(columnKey)) {
    this._sunMap.set(columnKey, true);
    this.tasks.light.worldSun.deferred.run(cx, cy, cz, () => {
     if (this.columnTool.loadIn(cx, cy, cz)) {
      this.columnTool.setTagValue("#dve:is_world_sun_done", 1);
     }
    });
   }

   if (nWorldGenAllDone && nSunAllDone) {
    activeColumns.set(columnKey, true);
    if (!this._activeColumns.has(columnKey)) {
     this.builder.setDimension(this.dimension).setXYZ(cx, cy, cz).buildColumn();
     this._activeColumns.set(columnKey, [cx, cy, cz]);
    }
   }
  }

  for (const [key, value] of this._activeColumns) {
   if (!activeColumns.has(key)) {
    this.builder
     .setDimension(this.dimension)
     .setXYZ(value[0], value[1], value[2])
     .removeColumn();
    this._activeColumns.delete(key);
   }
  }

  this._visitedMap.clear();
 }
}
