import {
  RemoteBinaryStruct,
  BinaryStructData,
  InstantiatedStruct,
} from "@amodx/binary/";
import { VoxelStructIds } from "../../Voxels/Voxel.types";
import { VoxelPalette } from "../Palettes/VoxelPalette";

export interface VoxelStruct {
  [VoxelStructIds.substance]: number;
  [VoxelStructIds.shapeID]: number;
  [VoxelStructIds.renderedMaterial]: number;
  [VoxelStructIds.voxelMaterial]: number;
  [VoxelStructIds.hardness]: number;
  [VoxelStructIds.colliderID]: number;
  [VoxelStructIds.checkCollisions]: number;
  [VoxelStructIds.isLightSource]: number;
  [VoxelStructIds.noAO]: number;
  [VoxelStructIds.lightValue]: number;
  [VoxelStructIds.isRich]: number;
  [VoxelStructIds.canHaveSecondary]: number;
  [VoxelStructIds.isTransparent]: number;
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
