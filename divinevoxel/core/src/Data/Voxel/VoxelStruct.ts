import {
  RemoteBinaryStruct,
  RemoteBinaryStructData,
  InstantiatedStruct,
} from "@divinestar/binary/";
import { VoxelTagIDs } from "../../Data/Constants/VoxelTagIds";

export interface VoxelStruct {
  [VoxelTagIDs.substance]: number;
  [VoxelTagIDs.shapeID]: number;
  [VoxelTagIDs.material]: number;
  [VoxelTagIDs.hardness]: number;
  [VoxelTagIDs.colliderID]: number;
  [VoxelTagIDs.checkCollisions]: number;
  [VoxelTagIDs.isLightSource]: number;
  [VoxelTagIDs.lightValue]: number;
  [VoxelTagIDs.isRich]: number;
}

const remote = new RemoteBinaryStruct("voxel-data");

export class VoxelStruct extends InstantiatedStruct {
  static instance: VoxelStruct;
  static init(data: RemoteBinaryStructData) {
    remote.init(data);
    const instance = remote.instantiate<VoxelStruct>();
    this.initData = data;
    VoxelStruct.instance = instance;
  }
  static sync(voxelMap: Uint16Array) {
    this.voxelIndex = voxelMap;
  }
  static setVoxel(id: number) {
    const index = this.voxelIndex[id];
    this.instance.setIndex(index);
  }
  static voxelIndex = new Uint16Array();
  static initData: RemoteBinaryStructData;
}
