import { SubstanceStructProperties } from "../../../Data/Constants/Structs/SubstanceStructProperties.js";
import { SubstancePaletteReader } from "@divinevoxel/core/Data/Substance/SubstancePalette.js";
import { SubstanceStruct } from "@divinevoxel/core/Data/Substance/SubstanceStruct.js";
import { MappedDataRegister } from "@divinevoxel/core/Data/Register/MappedDataRegister.js";
import { SubstanceTagIds } from "@divinevoxel/core/Data/Constants/SubstanceTagIds.js";

export class SubstanceDataTool {
  static tags = SubstanceStruct;

  //substance = "";
  substanceTagIndex = 0;

  setSubstanceFromString(substance: string) {
    //   this.substance = substance;
    this.substanceTagIndex =
      SubstancePaletteReader.id.numberFromString(substance);
    SubstanceStruct.setSubstance(this.substanceTagIndex);
  }
  setSubstance(substance: number) {
    //  this.substance = substance;
    this.substanceTagIndex = substance;
    SubstanceStruct.setSubstance(this.substanceTagIndex);
  }

  getSubstanceStringId() {
    return SubstancePaletteReader.id.stringFromNumber(this.substanceTagIndex);
  }

  isTransparent() {
    return SubstanceStruct.instance[SubstanceTagIds.isTransparent] == 1;
  }

  isSolid() {
    return SubstanceStruct.instance[SubstanceTagIds.isSolid] == 1;
  }
  isLiquid() {
    return SubstanceStruct.instance[SubstanceTagIds.isLiquid] == 1;
  }
  cullDense() {
    return SubstanceStruct.instance[SubstanceTagIds.cullDense] == 1;
  }
  isOpaque() {
    return this.isSolid() && !this.isTransparent();
  }

  allowLight() {
    return this.isTransparent();
  }

  getParent() {
    return MappedDataRegister.stringMaps.get(
      "substance",
      SubstanceStructProperties.parent,
      SubstanceStruct.instance[SubstanceTagIds.parent]
    )!;
  }
  getRendered() {
    return MappedDataRegister.stringMaps.get(
      "substance",
      SubstanceStructProperties.rendered,
      SubstanceStruct.instance[SubstanceTagIds.rendered]
    )!;
  }
  getCulled(): string[] {
    return MappedDataRegister.objectMaps.get(
      "substance",
      SubstanceStructProperties.culledSubstnaces,
      SubstanceStruct.instance[SubstanceTagIds.culledSubstnaces]
    )!;
  }
  getFlowRate() {
    return SubstanceStruct.instance[SubstanceTagIds.flowRate];
  }
}
