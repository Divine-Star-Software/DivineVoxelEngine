import { VoxelPalettesRegister } from "../../Voxels/Data/VoxelPalettesRegister";
import { VoxelLogic } from "./Classes/VoxelLogic";
import { VoxelLogicData } from "./VoxelLogic.types";
import { VoxelLogicType } from "./Classes/VoxelLogicType";

import { VoxelPoweredLogicType } from "./Classes/Default/Types/VoxelPoweredLogicType";

export class VoxelLogicRegister {
  static voxels: VoxelLogic[] = [];

  static types = new Map<string, VoxelLogicType>();


  static register(id: string, logicData: VoxelLogicData[]) {
    const voxelId = VoxelPalettesRegister.voxelIds.getNumberId(id);
    this.voxels[voxelId] = new VoxelLogic(logicData);
  }

  static registerType(id: string, logic: VoxelLogicType) {
    this.types.set(id, logic);
  }

}
VoxelLogicRegister.registerType("powered",new VoxelPoweredLogicType());
