//types
import type { Column } from "Meta/Data/WorldData.types.js";
//objects
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { PositionBoundDataTool } from "./DataToolBase.js";
import { ColumnTags } from "../../Data/World/Column/ColumnTags.js";

export class ColumnDataTool extends PositionBoundDataTool {
 tags = ColumnTags;

 loadIn(x: number, y: number, z: number) {
  this.position.x = x;
  this.position.y = y;
  this.position.z = z;
  const column = WorldRegister.column.get(this.dimension, x, z, y);
  if (!column) return false;
  this.tags.setBuffer(column.data);
  this._c = column.data;
  return true;
 }

 setColumn(chunk: Column) {
  this.tags.setBuffer(chunk.data);
  this._c = chunk.data;
  return this;
 }
}
