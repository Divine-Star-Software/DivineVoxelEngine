//types
//objects
import { Region } from "../../../../Data/World/Classes/Region.js";
import { WorldRegister } from "../../../../Data/World/WorldRegister.js";
import { EncodedPositionDataTool } from "../../Classes/DataToolBase.js";

export class RegionDataTool extends EncodedPositionDataTool {
 struct = Region.StateStruct;
 _region = <Region>{};

 loadIn() {
  const reigon = WorldRegister.instance.region.get(this.location);
  if (!reigon) return false;
  this.struct.setBuffer(reigon.stateBuffer);
  this._region = reigon;
  this._c = reigon.stateBuffer;
  return true;
 }

 setRegion(region: Region) {
  this.struct.setBuffer(region.stateBuffer);
  this._region = region;
  this._c = region.stateBuffer;
  return this;
 }

 getRegion() {
  return this._region;
 }

 getRegionDataCount() {
  const region = this._region;
  let totalChunks = 0;
  region.columns.forEach((column) => {
   totalChunks += column.chunks.length;
  });
  return {
   chunks: totalChunks,
   columns: region.columns.size,
  };
 }
}
