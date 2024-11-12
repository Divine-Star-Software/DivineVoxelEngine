import { MappedRegisterBase } from "./MappedRegisterBase.js";

export class MappedDataRegister {
  static stringMaps = new MappedRegisterBase<string>();
  static objectMaps = new MappedRegisterBase<any>();
}

MappedDataRegister.stringMaps.addSegment("voxel");
MappedDataRegister.stringMaps.addSegment("substance");
MappedDataRegister.objectMaps.addSegment("substance");
