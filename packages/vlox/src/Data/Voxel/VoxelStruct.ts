import {
  RemoteBinaryStruct,
  BinaryStructData,
  InstantiatedStruct,
} from "@amodx/binary/";
import { VoxelTagIDs } from "../../Data/Constants/VoxelTagIds";
import { VoxelPalette } from "./VoxelPalette";

export interface VoxelStruct {
  [VoxelTagIDs.substance]: number;
  [VoxelTagIDs.shapeID]: number;
  [VoxelTagIDs.material]: number;
  [VoxelTagIDs.hardness]: number;
  [VoxelTagIDs.colliderID]: number;
  [VoxelTagIDs.checkCollisions]: number;
  [VoxelTagIDs.isLightSource]: number;
  [VoxelTagIDs.noAO]: number;
  [VoxelTagIDs.lightValue]: number;
  [VoxelTagIDs.isRich]: number;
  [VoxelTagIDs.canHaveSecondary]: number;
  [VoxelTagIDs.isTransparent]: number;
}

const remote = new RemoteBinaryStruct("voxel-data");

export class VoxelStruct extends InstantiatedStruct<VoxelStruct> {
  static instance: VoxelStruct;
  static init(data: BinaryStructData) {
    remote.init(data);
    const instance = remote.instantiate<VoxelStruct>();
    this.initData = data;
    VoxelStruct.instance = instance;
  }
  static clone() {
    return this.instance.createClone();
  }
  static sync(voxelMap: Uint16Array) {
    this.voxelIndex = voxelMap;
  }
  static setVoxel(id: number) {
    const index = this.voxelIndex[id];
    this.instance.setIndex(index);
  }
  static setStringVoxel(id: string) {
    const index = this.voxelIndex[VoxelPalette.ids.getNumberId(id)!];
    this.instance.setIndex(index);
  }
  static voxelIndex = new Uint16Array();
  static initData: BinaryStructData;
}
