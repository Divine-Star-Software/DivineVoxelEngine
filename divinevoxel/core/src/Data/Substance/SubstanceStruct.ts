import {
  RemoteBinaryStruct,
  RemoteBinaryStructData,
  InstantiatedStruct,
} from "@divinestar/binary/";
import { SubstanceTagIds } from "../../Data/Constants/SubstanceTagIds.js";
import { SubstancePaletteReader } from "./SubstancePalette.js";

export interface SubstanceStruct {
  [SubstanceTagIds.parent]: number;
  [SubstanceTagIds.rendered]: number;
  [SubstanceTagIds.isSolid]: number;
  [SubstanceTagIds.isTransparent]: number;
  [SubstanceTagIds.isLiquid]: number;
  [SubstanceTagIds.flowRate]: number;
  [SubstanceTagIds.culledSubstnaces]: number;
}

const remote = new RemoteBinaryStruct("voxel-data");

export class SubstanceStruct extends InstantiatedStruct<SubstanceStruct> {
  static instance: SubstanceStruct;
  static init(data: RemoteBinaryStructData) {
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
  static initData: RemoteBinaryStructData;
}
