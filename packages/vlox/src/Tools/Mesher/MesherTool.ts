import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { ChunkDataTool } from "../Data/WorldData/ChunkDataTool.js";
import { Threads } from "@amodx/threads/";
import type { LocationData } from "../../Math";
import { LocationBoundTool } from "../Classes/LocationBoundTool.js";
import { TaskTool } from "../Tasks/TasksTool.js";
import type { RemoveChunksOutsideDistance } from "../../Contexts/Render/Tasks/RenderTasks.types.js";

const parentComm = Threads.parent;
export class MesherTool extends LocationBoundTool {
  static _chunkTool = new ChunkDataTool();
  tasks = new TaskTool();
  data = {
    LOD: 1,
  };
  setLOD(lod: number) {
    this.data.LOD = lod;
    return this;
  }
  clearAll() {
    parentComm.runTasks("clear-all", []);
  }
  addChukBuildToQuee() {
    this.tasks.build.chunk.queued.add(this.location);
  }
  runChunkBuildQueue() {
    this.tasks.build.chunk.queued.run(() => {});
  }
  buildChunk() {
    this.tasks.build.chunk.deferred.run([this.location, 1], () => {});
    return this;
  }
  buildColumn(onDone?: (data: any) => void) {
    this.tasks.build.column.deferred.run(
      this.location,
      onDone ? onDone : (data) => {}
    );
    return this;
  }
  removeColumn() {
    WorldRegister.instance.setDimension(this.dimension);
    const column = WorldRegister.instance.column.get(this.x, this.y, this.z);
    if (!column) return false;
    if (column.chunks.length == 0) return false;

    parentComm.runTasks<LocationData>("remove-column", this.location);
    return this;
  }
  fillColumn() {
    WorldRegister.instance.setDimension(this.dimension);
    WorldRegister.instance.column.fill(this.x, this.y, this.z);
    return this;
  }
  removeColumnsOutsideRadius(radius: number) {
    parentComm.runTasks<RemoveChunksOutsideDistance>(
      "remove-column-outside-radius",
      [this.location, radius]
    );
  }
}
