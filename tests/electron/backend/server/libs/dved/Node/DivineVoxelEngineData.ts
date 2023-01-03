//import { TagManager } from "../libs/divineBinaryTags/TagManager.js";

import type * as FileSystem from "fs";
import { DVEDSystem } from "./DVEDSystem.js";
import { RegionTool } from "./Tools/RegionTool.js";
import { RegionHeaderData, SecotrData } from "./Constants/DVED.constants.js";
import { VoxelSpaces } from "./Libs/voxelSpaces/VoxelSpaces.js";
import { TagManager } from "./Libs/divineBinaryTags/TagManager.js";
import { System } from "./System/System.js";

type Vector3 = { x: number; y: number; z: number };

const voxelSpaces = VoxelSpaces.getVoxelSpaces();
const regionTagManager = new TagManager("region-tagsx");

export const DVED = {
  spaces: voxelSpaces,
  regionTags: regionTagManager,

  $INIT(data: {
    fs: typeof FileSystem;
    sectorSize: number;
    spaceBounds: {
      regions: Vector3;
      columns: Vector3;
      chunks: Vector3;
    };
  }) {
    this.spaces = voxelSpaces;
    SecotrData.byteSize = data.sectorSize;
    DVEDSystem.setFS(data.fs);
    System.$INIT(data.fs);
    this.spaces.setDimensions(data.spaceBounds);

    regionTagManager.registerTag({
      id: "#dved-column-sector-index",
      type: "typed-number-array",
      numberType: "16ui",
      length: this.spaces.region.getColumnVolume(),
    });
    regionTagManager.registerTag({
      id: "#dved-column-legnth-index",
      type: "typed-number-array",
      numberType: "16ui",
      length: this.spaces.region.getColumnVolume(),
    });
    regionTagManager.registerTag({
      id: "#dved-column-save-timestamp",
      type: "typed-number-array",
      numberType: "32ui",
      length: this.spaces.region.getColumnVolume(),
    });
    regionTagManager.$INIT();
    RegionHeaderData.byteSize = regionTagManager.tagSize;
  },

  getRegionTool() {
    return new RegionTool();
  },
};
