import { SubstanceStructBuilder } from "../../../../../Data/Structs/Builder/SubstanceStructBuilder"
import { SubstanceStruct } from "../../../../../Data/Structs/SubstanceStruct"
import { SubstancePalette } from "../../../../../Data/Palettes/SubstancePalette"
import { StringPalette } from "../../../../../Util/StringPalette"
import { VoxelSubstanceData } from "../../../../../Voxels/VoxelSubstances.types"

export const SubstanceDataGenerator = {
  generate(data: VoxelSubstanceData[]) {
    //build palette
    for (const substance of data) {
      this.palette.register(substance.id);
    }
    SubstancePalette.setPalette(this.palette._palette);

    //create data buffer
    const tags = SubstanceStructBuilder.build(this.palette.size);
    const buffer = new SharedArrayBuffer(tags.structData.bufferSize);
    tags.structData.buffer = buffer;
    tags.setBuffer(buffer);

    //build data
    for (const substance of data) {
      const substanceID = SubstancePalette.id.numberFromString(
        substance.id
      );
      if (typeof substanceID == undefined) continue;
      tags.setStructArrayIndex(substanceID);

      SubstanceStructBuilder.setDefaults(tags);
      for (const id in substance.properties) {
        const value = substance.properties[id];
        if (!SubstanceStructBuilder.hasNode(id)) continue;

        SubstanceStructBuilder.setNode(id, value, tags);
      }
    }
    SubstanceStruct.init(tags.structData);
    SubstanceStruct.instance.setBuffer(buffer);
  },
  palette: new StringPalette(),
};
