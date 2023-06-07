import { SubstanceTagIds } from "../../Data/Constants/Tags/SubstanceTagIds.js";
import { SubstancePaletteReader } from "../../Data/Substance/SubstancePalette.js";
import { SubstanceTags } from "../../Data/Substance/SubstanceTags.js";
import { MappedDataRegister } from "../../Data/Register/MappedDataRegister.js";
class SubstanceDataTool {
    static tags = SubstanceTags;
    static getTagValue(index, tag) {
        this.tags.setTagIndex(index);
        return this.tags.getTag(tag);
    }
    substance = "";
    substanceTagIndex = 0;
    setSubstance(substance) {
        this.substance = substance;
        this.substanceTagIndex =
            SubstancePaletteReader.id.numberFromString(substance);
    }
    isSolid() {
        return (SubstanceDataTool.getTagValue(this.substanceTagIndex, SubstanceTagIds.isSolid) == 1);
    }
    isLiquid() {
        return (SubstanceDataTool.getTagValue(this.substanceTagIndex, SubstanceTagIds.isLiquid) == 1);
    }
    getParent() {
        return MappedDataRegister.stringMaps.get("substance", SubstanceTagIds.parent, SubstanceDataTool.getTagValue(this.substanceTagIndex, SubstanceTagIds.parent));
    }
    getRendered() {
        return MappedDataRegister.stringMaps.get("substance", SubstanceTagIds.rendered, SubstanceDataTool.getTagValue(this.substanceTagIndex, SubstanceTagIds.rendered));
    }
    getCulled() {
        return MappedDataRegister.objectMaps.get("substance", SubstanceTagIds.culledSubstnaces, SubstanceDataTool.getTagValue(this.substanceTagIndex, SubstanceTagIds.culledSubstnaces));
    }
    getFlowRate() {
        return SubstanceDataTool.getTagValue(this.substanceTagIndex, SubstanceTagIds.flowRate);
    }
}
export { SubstanceDataTool };
