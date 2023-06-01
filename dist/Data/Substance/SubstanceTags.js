import { RemoteTagManager } from "divine-binary-tags";
import { SubstancePaletteReader } from "./SubstancePalette.js";
class SDTags extends RemoteTagManager {
    id;
    constructor(id) {
        super(id);
        this.id = id;
    }
    setSubstance(id) {
        this.setTagIndex(typeof id == "string" ? SubstancePaletteReader.id.numberFromString(id) : id);
    }
}
export const SubstanceTags = new SDTags("substance-data");
