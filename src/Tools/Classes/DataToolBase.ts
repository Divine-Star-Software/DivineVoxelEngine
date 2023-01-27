import { Util } from "../../Global/Util.helper.js";
import type { RemoteTagManager } from "Libs/DivineBinaryTags/RemoteTagManager";
import type { LocationData } from "Meta/Data/CommonTypes";
import { DimensionsRegister } from "../../Data/World/Dimensions/DimensionsRegister.js";
import { LocationBoundTool } from "./LocationBoundTool.js";
import { WorldDataTagIDs } from "../../Data/Constants/Tags/WorldDataTagIds.js";

export abstract class DataToolBase extends LocationBoundTool {
 tags: RemoteTagManager;
 _c: ArrayBuffer | SharedArrayBuffer | DataView;

 constructor() {
  super();
 }

 getTagValue(id: string) {
  this.tags.setBuffer(this._c);
  return this.tags.getTag(id);
 }
 setTagValue(id: string, value: number) {
  this.tags.setBuffer(this._c);
  return this.tags.setTag(id, value);
 }

 getArrayTagValue(id: string, index: number) {
  this.tags.setBuffer(this._c);
  return this.tags.getArrayTagValue(id, index);
 }
 setArrayTagValue(id: string, index: number, value: number) {
  this.tags.setBuffer(this._c);
  return this.tags.setArrayTagValue(id, index, value);
 }

 setBuffer(buffer: ArrayBuffer | DataView | SharedArrayBuffer) {
  this._c = buffer;
  this.tags.setBuffer(this._c);
 }

 getBuffer() {
  if (this._c instanceof DataView) return this._c.buffer;
  return this._c;
 }

 getAsArrayBuffer() {
  return Util.converSABToBuffer(<SharedArrayBuffer>this.getBuffer());
 }

 getBufferSize() {
  return this.tags.tagSize;
 }

 abstract loadIn(): boolean;

 loadInAt(x: number, y: number, z: number) {
  this.setXYZ(x, y, z);
  return this.loadIn();
 }

 loadInAtLocation(location: LocationData) {
  this.setLocation(location);
  return this.loadIn();
 }
}

export abstract class EncodedPositionDataTool extends DataToolBase {
 position = { x: 0, y: 0, z: 0 };

 constructor() {
  super();
 }

 getPositionData() {
  this.position.x = this.getTagValue(WorldDataTagIDs.positionX);
  this.position.y = this.getTagValue(WorldDataTagIDs.positionY);
  this.position.z = this.getTagValue(WorldDataTagIDs.positionZ);
  return this.position;
 }

 setPositionData(x: number, y: number, z: number) {
  this.setTagValue(WorldDataTagIDs.positionX, x);
  this.setTagValue(WorldDataTagIDs.positionY, y);
  this.setTagValue(WorldDataTagIDs.positionZ, z);
  return this.position;
 }

 setDimensionId(dimensionId: string) {
  this.setTagValue(
    WorldDataTagIDs.dimensionId,
   DimensionsRegister.getDimensionNumericId(dimensionId)
  );
 }

 getDimensionId() {
  return DimensionsRegister.getDimensionStringId(
   this.getTagValue(WorldDataTagIDs.dimensionId)
  );
 }

 getLocationData(): LocationData {
  const pos = this.getPositionData();
  return [this.getDimensionId(), pos.x, pos.y, pos.z];
 }
}
