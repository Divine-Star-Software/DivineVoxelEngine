//types
import type { Region } from "Meta/Data/WorldData.types.js";
//objects
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { PositionBoundDataTool } from "./DataToolBase.js";
import { RegionTags } from "../../Data/World/Region/RegionTags.js";

export class RegionDataTool extends PositionBoundDataTool {
 tags = RegionTags;

 loadIn(x: number, y: number, z: number) {
  this.position.x = x;
  this.position.y = y;
  this.position.z = z;
  const reigon = WorldRegister.region.get(this.dimension, x, y, z);
  if (!reigon) return false;
  this.tags.setBuffer(reigon.data);
  this._c = reigon.data;
  return true;
 }

 setRegion(region: Region) {
  this.tags.setBuffer(region.data);
  this._c = region.data;
  return this;
 }
}
