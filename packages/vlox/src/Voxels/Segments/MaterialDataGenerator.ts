import { MaterialPalette } from "../Palettes/MaterialPalette";
import { StringPalette } from "../../Util/StringPalette";
import { VoxelMaterialData } from "..";

export const MaterialDataGenerator = {
  generate(data: VoxelMaterialData[]) {
    //build palette
    for (const substance of data) {
      this.palette.register(substance.id);
    }
    MaterialPalette.setPalette(this.palette._palette);
  },
  palette: new StringPalette(),
};
