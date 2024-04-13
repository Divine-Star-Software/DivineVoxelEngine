import { DataTagBuilders } from "@divinevoxel/core/Interfaces/World/Data/DataTagBuilders";
import { ChunkDataTags } from "./Tags/ChunkTags";
import { ColumnDataTags } from "./Tags/ColumnTags";
import { RegionDataTags } from "./Tags/RegionTags";
import { LightData } from "../../../Data/LightData";

export class DVEFDataTags extends DataTagBuilders {
  chunkTags = ChunkDataTags;
  columnTags = ColumnDataTags;
  regionTags = RegionDataTags;

  constructor() {
    super();
    this.voxels.pipelines.onSet.regiser("#dve_light_value", (data) => {
      const v = <number[]>data.value;
      let sl = 0;
      sl = LightData.setR(v[0], sl);
      sl = LightData.setG(v[1], sl);
      sl = LightData.setB(v[2], sl);
      data.tags.setTag("#dve_light_value", sl);
      return data;
    });
  }
}
