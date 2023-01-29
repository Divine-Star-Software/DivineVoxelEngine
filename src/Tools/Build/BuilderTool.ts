import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { ChunkDataTool } from "../Data/WorldData/ChunkDataTool.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { LocationData } from "Meta/Data/CommonTypes.js";
import { LocationBoundTool } from "../../Tools/Classes/LocationBoundTool.js";
import { TasksTool } from "../../Tools/Tasks/TasksTool.js";
import { RemoveChunksOutsideDistance } from "Meta/Tasks/RenderTasks.types.js";

const parentComm = ThreadComm.parent;
export class BuilderTool extends LocationBoundTool {
 static _chunkTool = new ChunkDataTool();
 tasks = TasksTool();
 data = {
  LOD: 1,
 };

 setLOD(lod: number) {
  this.data.LOD = lod;
  return this;
 }
 buildChunk() {
  const [dimension, x, y, z] = this.location;
  this.tasks.build.chunk.add(x, y, z);
  this.tasks.build.chunk.run(() => {});
  return this;
 }
 buildColumn(onDone?: (data: any) => void) {
  const [dimension, x, y, z] = this.location;
  this.tasks.setFocalPoint(this.location);
  this.tasks.build.column.deferred.run(x, y, z, onDone ? onDone : (data) => {});
  return this;
 }
 removeColumn() {
  const column = WorldRegister.column.get(this.location);
  if (!column) return false;
  if (column.chunks.size == 0) return false;

  parentComm.runTasks<LocationData>("remove-column", this.location);
  return this;
 }
 fillColumn() {
  WorldRegister.column.fill(this.location);
  return this;
 }
 removeColumnsOutsideRadius(radius: number) {
  parentComm.runTasks<RemoveChunksOutsideDistance>(
   "remove-column-outside-radius",
   [this.location, radius]
  );
 }
}
