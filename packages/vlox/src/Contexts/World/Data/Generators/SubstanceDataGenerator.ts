import { SubstanceTagBuilder } from "../StructBuilders/SubstanceStructBuilder.js";
import { SubstanceStruct } from "../../../../Data/Substance/SubstanceStruct.js";
import { SubstancePaletteReader } from "../../../../Data/Substance/SubstancePalette.js";
import { SubstanceManager } from "../Managers/DataManagers.js";
import { StringPalette } from "../../../../Interfaces/Data/StringPalette.js";

export const SubstanceDataGenerator = {
  $generate() {
    //build palette
    for (const [key, substance] of SubstanceManager.data) {
      this.palette.register(substance.id);
    }
    SubstancePaletteReader.setPalette(this.palette._palette, this.palette._map);

    //create data buffer
    const tags = SubstanceTagBuilder.build(this.palette.size);
    const buffer = new SharedArrayBuffer(tags.structData.bufferSize);
    tags.structData.buffer = buffer;
    tags.setBuffer(buffer);

    //build data
    for (const [key, substance] of SubstanceManager.data) {
      const substanceID = SubstancePaletteReader.id.numberFromString(key);
      if (typeof substanceID == undefined) continue;
      tags.setStructArrayIndex(substanceID);

      SubstanceTagBuilder.setDefaults(tags);
      for (const tag of substance.tags) {
        const [id, value] = tag;
        if (!SubstanceTagBuilder.hasNode(id)) continue;

        SubstanceTagBuilder.setNode(id, value, tags);
      }
    }
    SubstanceStruct.init(tags.structData);
    SubstanceStruct.instance.setBuffer(buffer);
  },
  palette: new StringPalette(),
};
