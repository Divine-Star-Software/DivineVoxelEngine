//types
import type { Region } from "Meta/Data/WorldData.types.js";
//objects
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { EncodedPositionDataTool } from "../../Classes/DataToolBase.js";
import { RegionTags } from "../../../Data/World/Region/RegionTags.js";

export class RegionDataTool extends EncodedPositionDataTool {
 tags = RegionTags;
 _region = <Region>{};

 loadIn() {
  const reigon = WorldRegister.region.get(this.location);
  if (!reigon) return false;
  this.tags.setBuffer(reigon.data);
  this._region = reigon;
  this._c = reigon.data;
  return true;
 }

 setRegion(region: Region) {
  this.tags.setBuffer(region.data);
  this._region = region;
  this._c = region.data;
  return this;
 }

 getRegion() {
  return this._region;
 }

 getRegionDataCount() {
  const region = this._region;
  let totalChunks = 0;
  region.columns.forEach((column) => {
   totalChunks += column.chunks.size;
  });
  return {
   chunks: totalChunks,
   columns: region.columns.size,
  };
 }
}
