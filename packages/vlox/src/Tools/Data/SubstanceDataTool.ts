import { SubstancePalette } from "../../Data/Palettes/SubstancePalette.js";
import { SubstanceStruct } from "../../Data/Structs/SubstanceStruct.js";
import { MappedDataRegister } from "../../Data/Register/MappedDataRegister.js";
import { SubstanceStructIds } from "../../Voxels/VoxelSubstances.types.js"

export class SubstanceDataTool {
  static tags = SubstanceStruct;

  //substance = "";
  substanceTagIndex = 0;

  setSubstanceFromString(substance: string) {
    //   this.substance = substance;
    this.substanceTagIndex = SubstancePalette.id.numberFromString(substance);
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
    return SubstancePalette.id.stringFromNumber(this.substanceTagIndex);
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

  getFlowRate() {
    return SubstanceStruct.instance[SubstanceStructIds.flowRate];
  }
}
