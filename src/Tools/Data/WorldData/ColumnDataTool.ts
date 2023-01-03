//types
import type { Column } from "Meta/Data/WorldData.types.js";
//objects
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { PositionBoundDataTool } from "../Classes/DataToolBase.js";
import { ColumnTags } from "../../../Data/World/Column/ColumnTags.js";
import { ChunkTags } from "../../../Data/World/Chunk/ChunkTags.js";
import { LocationData } from "Meta/Data/CommonTypes.js";

export class ColumnDataTool extends PositionBoundDataTool {
 tags = ColumnTags;
 _column = <Column>{};

 loadIn(x: number, y: number, z: number) {
  this.position.x = x;
  this.position.y = y;
  this.position.z = z;
  const column = WorldRegister.column.get(this.dimension, x, z, y);
  if (!column) return false;
  this.tags.setBuffer(column.data);
  this._c = column.data;
  this._column = column;
  return true;
 }

 loadInAt(location: LocationData) {
  this.setLocation(location);
  const column = WorldRegister.column.get(
   this.dimension,
   this.position.x,
   this.position.z,
   this.position.y
  );
  if (!column) return false;
  this.tags.setBuffer(column.data);
  this._c = column.data;
  this._column = column;
  return true;
 }

 setColumn(column: Column) {
  this.tags.setBuffer(column.data);
  this._c = column.data;
  this._column = column;
  return this;
 }

 getColumn() {
  return this._column;
 }

 getNumChunks() {
  return this._column.chunks.size;
 }

 getBufferSizeForWholeColumn() {
  return ColumnTags.tagSize + ChunkTags.tagSize * this.getNumChunks();
 }

 isStored() {
  return this.getTagValue("#dve_is_stored") == 1;
 }

 markAsNotStored() {
  return this.setTagValue("#dve_is_stored", 0);
 }

 markAsStored() {
  return this.setTagValue("#dve_is_stored", 1);
 }
}
