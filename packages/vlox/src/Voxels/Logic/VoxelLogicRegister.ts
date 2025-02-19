import { VoxelPalettesRegister } from "../../Voxels/Data/VoxelPalettesRegister";
import { VoxelLogic } from "./Classes/VoxelLogic";
import { VoxelLogicData } from "./VoxelLogic.types";
import { VoxelLogicTypeConstructor } from "./Classes/VoxelLogicType";

import { VoxelLogicPoweredType } from "./Classes/Types/VoxelLogicPoweredType";
import { VoxelLogicStateType } from "./Classes/Types/VoxelLogicStateType";

export class VoxelLogicRegister {
  static voxels: VoxelLogic[] = [];

  static types = new Map<string, VoxelLogicTypeConstructor<any>>();

  static get(id: string) {
    const typeClass = VoxelLogicRegister.types.get(id)!;
    if (!typeClass) throw new Error(`Logic type ${id} does not exist`);
    return typeClass;
  }

  static register(id: string, logicData: VoxelLogicData[]) {
    const voxelId = VoxelPalettesRegister.voxelIds.getNumberId(id);
    this.voxels[voxelId] = new VoxelLogic(id, logicData);
  }

  static registerType(id: string, logic: VoxelLogicTypeConstructor<any>) {
    this.types.set(id, logic);
  }
}
VoxelLogicRegister.registerType("powered", VoxelLogicPoweredType);
VoxelLogicRegister.registerType("state", VoxelLogicStateType);
