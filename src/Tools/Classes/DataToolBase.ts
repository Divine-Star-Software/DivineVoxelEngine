import { Util } from "../../Global/Util.helper.js";
import type { RemoteTagManager } from "Libs/DivineBinaryTags/RemoteTagManager";
import type { LocationData } from "Meta/Data/CommonTypes";
import { DimensionsRegister } from "../../Data/World/Dimensions/DimensionsRegister.js";
import { LocationBoundTool } from "./LocationBoundTool.js";

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
  this.position.x = this.getTagValue("#dve_p_x");
  this.position.y = this.getTagValue("#dve_p_y");
  this.position.z = this.getTagValue("#dve_p_z");
  return this.position;
 }

 setPositionData(x: number, y: number, z: number) {
  this.setTagValue("#dve_p_x", x);
  this.setTagValue("#dve_p_y", y);
  this.setTagValue("#dve_p_z", z);
  return this.position;
 }

 setDimensionId(dimensionId: string) {
  this.setTagValue(
   "#dve_dimension_id",
   DimensionsRegister.getDimensionNumericId(dimensionId)
  );
 }

 getDimensionId() {
  return DimensionsRegister.getDimensionStringId(
   this.getTagValue("#dve_dimension_id")
  );
 }

 getLocationData(): LocationData {
  const pos = this.getPositionData();
  return [this.getDimensionId(), pos.x, pos.y, pos.z];
 }

}
