import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { CCM } from "../../Common/Threads/Constructor/ConstructorComm.js";
import { ChunkDataTool } from "../Data/WorldData/ChunkDataTool.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { LocationData } from "Meta/Data/CommonTypes.js";
import { WorldSpaces } from "../../Data/World/WorldSpaces.js";
import { LocationBoundTool } from "../../Tools/Classes/LocationBoundTool.js";
import { TasksTool } from "../../Tools/Tasks/TasksTool.js";

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
  const columnPOS = WorldSpaces.column.getPositionLocation(this.location);
  parentComm.runTasks<LocationData>("remove-column", [
   this.location[0],
   columnPOS.x,
   columnPOS.y,
   columnPOS.z,
  ]);
  return this;
 }
 fillColumn() {
  WorldRegister.column.fill(this.location);
  return this;
 }
 removeColumnsOutsideRadius(radius: number) {
  const columnPOS = WorldSpaces.column.getPositionLocation(this.location);
  parentComm.runTasks("remove-column-outside-radius", [
   this.location[0],
   columnPOS.x,
   columnPOS.y,
   columnPOS.z,
   radius,
  ]);
 }
}
