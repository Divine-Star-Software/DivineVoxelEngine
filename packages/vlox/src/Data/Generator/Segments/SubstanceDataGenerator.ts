import { SubstanceStructBuilder } from "../../Structs/Builder/SubstanceStructBuilder";
import { SubstanceStruct } from "../../Structs/SubstanceStruct.js";
import { SubstancePaletteReader } from "../../Palettes/SubstancePalette.js";
import { StringPalette } from "../../../Interfaces/Data/StringPalette.js";
import { SubstanceData } from "Data/Types/Substances.types.js";

export const SubstanceDataGenerator = {
  generate(data: SubstanceData[]) {
    //build palette
    for (const substance of data) {
      this.palette.register(substance.id);
    }
    SubstancePaletteReader.setPalette(this.palette._palette, this.palette._map);

    //create data buffer
    const tags = SubstanceStructBuilder.build(this.palette.size);
    const buffer = new SharedArrayBuffer(tags.structData.bufferSize);
    tags.structData.buffer = buffer;
    tags.setBuffer(buffer);

    //build data
    for (const substance of data) {
      const substanceID = SubstancePaletteReader.id.numberFromString(
        substance.id
      );
      if (typeof substanceID == undefined) continue;
      tags.setStructArrayIndex(substanceID);

      SubstanceStructBuilder.setDefaults(tags);
      for (const tag of substance.tags) {
        const [id, value] = tag;
        if (!SubstanceStructBuilder.hasNode(id)) continue;

        SubstanceStructBuilder.setNode(id, value, tags);
      }
    }
    SubstanceStruct.init(tags.structData);
    SubstanceStruct.instance.setBuffer(buffer);
  },
  palette: new StringPalette(),
};
