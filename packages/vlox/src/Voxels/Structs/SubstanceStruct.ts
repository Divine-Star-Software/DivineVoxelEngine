import {
  RemoteBinaryStruct,
  BinaryStructData,
  InstantiatedStruct,
} from "@amodx/binary/";
import { SubstanceStructIds } from "../Types/VoxelSubstances.types.js";
import { SubstancePalette } from "../Palettes/SubstancePalette.js";

export interface SubstanceStruct {
  [key: string]: any;
  [SubstanceStructIds.parent]: number;
  [SubstanceStructIds.isSolid]: number;
  [SubstanceStructIds.isTransparent]: number;
  [SubstanceStructIds.isLiquid]: number;
  [SubstanceStructIds.flowRate]: number;
  [SubstanceStructIds.isWindAffected]: number;
}

const remote = new RemoteBinaryStruct("voxel-data");

export class SubstanceStruct extends InstantiatedStruct<SubstanceStruct> {
  static instance: SubstanceStruct;
  static init(data: BinaryStructData) {
    remote.init(data);
    const instance = remote.instantiate<SubstanceStruct>();
    this.initData = data;
    SubstanceStruct.instance = instance;
  }

  static setSubstance(id: string | number) {
    this.instance.setIndex(
      typeof id == "string" ? SubstancePalette.id.numberFromString(id) : id
    );
  }
  static initData: BinaryStructData;
}
