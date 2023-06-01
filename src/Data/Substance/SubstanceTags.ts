import { RemoteTagManager } from "divine-binary-tags";
import { SubstancePaletteReader } from "./SubstancePalette.js";

class SDTags extends RemoteTagManager {
 constructor(public id: string) {
  super(id);
 }

 setSubstance(id: string | number) {
  this.setTagIndex(
   typeof id == "string" ? SubstancePaletteReader.id.numberFromString(id) : id
  );
 }
}

export const SubstanceTags = new SDTags("substance-data");
