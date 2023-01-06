//types
import type { ChunkData } from "Meta/Data/WorldData.types.js";
//objects
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { ChunkTags } from "../../../Data/World/Chunk/ChunkTags.js";
import { PositionBoundDataTool } from "../../Classes/DataToolBase.js";

export class ChunkDataTool extends PositionBoundDataTool {
 tags = ChunkTags;

 loadIn() {
  const chunk = WorldRegister.chunk.get(this.location);
  if (!chunk) return false;
  this.tags.setBuffer(chunk.data);
  this._c = chunk.data;
  return true;
 }

 loadInAt(x: number, y: number, z: number) {
  this.location[1] = x;
  this.location[2] = y;
  this.location[3] = z;
  return this.loadIn();
 }

 setChunk(chunk: ChunkData) {
  this.tags.setBuffer(chunk.data);
  this._c = chunk.data;
  return this;
 }
}
