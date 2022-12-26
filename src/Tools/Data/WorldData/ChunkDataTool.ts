//types
import type { ChunkData } from "Meta/Data/WorldData.types.js";
//objects
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { ChunkTags } from "../../../Data/World/Chunk/ChunkTags.js";
import { PositionBoundDataTool } from "../Classes/DataToolBase.js";

export class ChunkDataTool extends PositionBoundDataTool {
 tags = ChunkTags;

 loadIn(x: number, y: number, z: number) {
  this.position.x = x;
  this.position.y = y;
  this.position.z = z;
  const chunk = WorldRegister.chunk.get(this.dimension, x, y, z);
  if (!chunk) return false;
  this.tags.setBuffer(chunk.data);
  this._c = chunk.data;
  return true;
 }

 setChunk(chunk: ChunkData) {
  this.tags.setBuffer(chunk.data);
  this._c = chunk.data;
  return this;
 }
}
