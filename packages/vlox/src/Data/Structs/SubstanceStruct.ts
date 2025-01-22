import {
  RemoteBinaryStruct,
  BinaryStructData,
  InstantiatedStruct,
} from "@amodx/binary/";
import { SubstanceStructIds } from "../Constants/Structs/SubstanceStructIds";
import { SubstancePaletteReader } from "../Palettes/SubstancePalette.js";

export interface SubstanceStruct {
  [SubstanceStructIds.parent]: number;
  [SubstanceStructIds.rendered]: number;
  [SubstanceStructIds.isSolid]: number;
  [SubstanceStructIds.isTransparent]: number;
  [SubstanceStructIds.isLiquid]: number;
  [SubstanceStructIds.flowRate]: number;
  [SubstanceStructIds.culledSubstnaces]: number;
  [SubstanceStructIds.cullDense]: number;
  [SubstanceStructIds.isWindAffected]: number;
  [SubstanceStructIds.isBackFaceCulled]: number;
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
      typeof id == "string"
        ? SubstancePaletteReader.id.numberFromString(id)
        : id
    );
  }
  static initData: BinaryStructData;
}
