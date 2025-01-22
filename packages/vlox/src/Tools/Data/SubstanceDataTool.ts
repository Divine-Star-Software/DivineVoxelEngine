import { SubstancePaletteReader } from "../../Data/Palettes/SubstancePalette.js";
import { SubstanceStruct } from "../../Data/Structs/SubstanceStruct.js";
import { MappedDataRegister } from "../../Data/Register/MappedDataRegister.js";
import { SubstanceStructIds } from "../../Data/Constants/Structs/SubstanceStructIds.js";

export class SubstanceDataTool {
  static tags = SubstanceStruct;

  //substance = "";
  substanceTagIndex = 0;

  setSubstanceFromString(substance: string) {
    //   this.substance = substance;
    this.substanceTagIndex =
      SubstancePaletteReader.id.numberFromString(substance);
    SubstanceStruct.setSubstance(this.substanceTagIndex);
    return this;
  }
  setSubstance(substance: number) {
    //  this.substance = substance;
    this.substanceTagIndex = substance;
    SubstanceStruct.setSubstance(this.substanceTagIndex);
    return this;
  }

  getSubstanceStringId() {
    return SubstancePaletteReader.id.stringFromNumber(this.substanceTagIndex);
  }

  /*   isTransparent() {
    return SubstanceStruct.instance[SubstanceStructIds.isTransparent] == 1;
  }

  isSolid() {
    return SubstanceStruct.instance[SubstanceStructIds.isSolid] == 1;
  } */
  isLiquid() {
    return SubstanceStruct.instance[SubstanceStructIds.isLiquid] == 1;
  }

  isWindAffected() {
    return SubstanceStruct.instance[SubstanceStructIds.isWindAffected] == 1;
  }

  isBackFaceCulled() {
    return SubstanceStruct.instance[SubstanceStructIds.isBackFaceCulled] == 1;
  }

  cullDense() {
    return SubstanceStruct.instance[SubstanceStructIds.cullDense] == 1;
  }
  /*   isOpaque() {
    return this.isSolid() && !this.isTransparent();
  }
 */
  /*   allowLight() {
    return this.isTransparent();
  } */

  getParent() {
    return MappedDataRegister.stringMaps.get(
      "substance",
      SubstanceStructIds.parent,
      SubstanceStruct.instance[SubstanceStructIds.parent]
    )!;
  }
  getRendered() {
    return MappedDataRegister.stringMaps.get(
      "substance",
      SubstanceStructIds.rendered,
      SubstanceStruct.instance[SubstanceStructIds.rendered]
    )!;
  }
  getCulled(): string[] {
    return MappedDataRegister.objectMaps.get(
      "substance",
      SubstanceStructIds.culledSubstnaces,
      SubstanceStruct.instance[SubstanceStructIds.culledSubstnaces]
    )!;
  }
  getFlowRate() {
    return SubstanceStruct.instance[SubstanceStructIds.flowRate];
  }
}
