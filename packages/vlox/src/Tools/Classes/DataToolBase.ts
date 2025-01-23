import type { RemoteBinaryStruct } from "@amodx/binary/";
import type { LocationData } from "../../Math";;
import { DimensionsRegister } from "../../Data/World/DimensionsRegister.js";
import { LocationBoundTool } from "./LocationBoundTool.js";
import { WorldDataStructProperties } from "../../Data/Structs/Constants/WorldDataStructProperties.js";
import { Vector3Like, Vec3Array } from "@amodx/math";
import { arrayBufferToSharedArrayBuffer } from "@amodx/core/Buffers/arrayBufferToSharedArrayBuffer.js";
export abstract class DataToolBase extends LocationBoundTool {
  struct: RemoteBinaryStruct;
  _c: ArrayBuffer | SharedArrayBuffer | DataView;
  _dimensionRegister = new DimensionsRegister();

  constructor() {
    super();
  }

  getStructValue(id: string) {
    this.struct.setBuffer(this._c);
    return this.struct.getProperty(id);
  }
  setTagValue(id: string, value: number) {
    this.struct.setBuffer(this._c);
    return this.struct.setProperty(id, value);
  }

  getArrayTagValue(id: string, index: number) {
    this.struct.setBuffer(this._c);
    return this.struct.getArrayPropertyValue(id, index);
  }
  setArrayTagValue(id: string, index: number, value: number) {
    this.struct.setBuffer(this._c);
    return this.struct.setArrayPropertyValue(id, index, value);
  }

  setBuffer(buffer: ArrayBuffer | DataView | SharedArrayBuffer) {
    this._c = buffer;
    this.struct.setBuffer(this._c);
  }

  getBuffer() {
    if (this._c instanceof DataView) return this._c.buffer;
    return this._c;
  }

  getAsArrayBuffer() {
    const buffer = this.getBuffer();
    if (buffer instanceof ArrayBuffer) return buffer;

    return arrayBufferToSharedArrayBuffer(<SharedArrayBuffer>this.getBuffer());
  }

  getBufferSize() {
    return this.struct.getBuffer().byteLength;
  }

  abstract loadIn(): boolean;

  loadInAt(x: number, y: number, z: number) {
    this.setXYZ(x, y, z);
    return this.loadIn();
  }
  loadInVec3Array(vec3: Vec3Array) {
    this.setXYZ(vec3[0], vec3[1], vec3[2]);
    return this.loadIn();
  }
  loadInVec3(vec3: Vector3Like) {
    this.setXYZ(vec3.x, vec3.y, vec3.z);
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
    this.position.x = this.getStructValue(WorldDataStructProperties.positionX);
    this.position.y = this.getStructValue(WorldDataStructProperties.positionY);
    this.position.z = this.getStructValue(WorldDataStructProperties.positionZ);
    return this.position;
  }

  setPositionData(x: number, y: number, z: number) {
    this.setTagValue(WorldDataStructProperties.positionX, x);
    this.setTagValue(WorldDataStructProperties.positionY, y);
    this.setTagValue(WorldDataStructProperties.positionZ, z);
    return this.position;
  }




  getLocationData(): LocationData {
    const pos = this.getPositionData();
    return [this.dimension, pos.x, pos.y, pos.z];
  }
}
