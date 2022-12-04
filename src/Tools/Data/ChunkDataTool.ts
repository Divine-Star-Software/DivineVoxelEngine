//types
import type { ChunkData } from "Meta/Data/WorldData.types.js";
//objects
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { DimensionsRegister } from "../../Data/Dimensions/DimensionsRegister.js";
import { ChunkTags } from "../../Data/Chunk/ChunkTags.js";

export class ChunkDataTool {


 data = {
  dimension: "main",
 };
 position = {
  x: 0,
  y: 0,
  z: 0,
 };

 _c = <ChunkData>{};

 setDimension(dimensionId: string | number) {
  this.data.dimension = DimensionsRegister.getDimensionStringId(dimensionId);
  return this;
 }

 loadIn(x: number, y: number, z: number) {
  this.position.x = x;
  this.position.y = y;
  this.position.z = z;
  const chunk = WorldRegister.chunk.get(this.data.dimension, x, y, z);
  if (!chunk) return false;
  ChunkTags.setBuffer(chunk.data);
  this._c = chunk;
  return true;
 }

 setChunk(chunk: ChunkData) {
    ChunkTags.setBuffer(chunk.data);
  this._c = chunk;
  return this;
 }

 getPosition() {
  this.position.x = this.getTagValue("#dve:p_x");
  this.position.y = this.getTagValue("#dve:p_y");
  this.position.z = this.getTagValue("#dve:p_z");
  return this.position;
 }

 setPosition(x: number, y: number, z: number) {
  this.setTagValue("#dve:p_x", x);
  this.setTagValue("#dve:p_y", y);
  this.setTagValue("#dve:p_z", z);
  return this.position;
 }

 getTagValue(id: string) {
  ChunkTags.setBuffer(this._c.data);
  return ChunkTags.getTag(id);
 }
 setTagValue(id: string, value: number) {
  ChunkTags.setBuffer(this._c.data);
  return ChunkTags.setTag(id, value);
 }

 getArrayTagValue(id: string, index: number) {
  ChunkTags.setBuffer(this._c.data);
  return ChunkTags.getArrayTagValue(id, index);
 }
 setArrayTagValue(id: string, index: number, value: number) {
  ChunkTags.setBuffer(this._c.data);
  return ChunkTags.setArrayTagValue(id, index, value);
 }
}
