import type * as FileSystem from "fs";
import { RegionTool } from "./Tools/RegionTool.js";
import { RegionData, RegionTagIds, SecotrData } from "./Util/DVED.util.js";
import { VoxelSpaces } from "./Libs/voxelSpaces/VoxelSpaces.js";
import { TagManager } from "./Libs/divineBinaryTags/TagManager.js";
import { System } from "./System/System.js";
import { SystemPath } from "./System/SystemPath.js";

type Vector3 = { x: number; y: number; z: number };

const voxelSpaces = VoxelSpaces.getVoxelSpaces();
const regionTagManager = new TagManager("region-tagsx");

export const DVED = {
  spaces: voxelSpaces,
  regionTags: regionTagManager,
  system: System,
  path: SystemPath,

  $INIT(data: {
    fs: typeof FileSystem;
    dataDirecotry: string;
    sectorSize: number;
    spaceBounds: {
      regions: Vector3;
      columns: Vector3;
      chunks: Vector3;
    };
  }) {
    SystemPath.setFolder(data.dataDirecotry);
    console.log(SystemPath.getDataPath());
    this.spaces = voxelSpaces;
    SecotrData.byteSize = data.sectorSize;
    SystemPath._dataFolder = data.dataDirecotry;
    System.$INIT(data.fs);
    this.spaces.setDimensions(data.spaceBounds);
    const numberColumns = this.spaces.region.getColumnVolume();
    regionTagManager.registerTag({
      id: RegionTagIds.sectorIndex,
      type: "typed-number-array",
      numberType: "16ui",
      length: numberColumns,
    });
    regionTagManager.registerTag({
      id: RegionTagIds.columnLength,
      type: "typed-number-array",
      numberType: "16ui",
      length: numberColumns,
    });
    regionTagManager.registerTag({
      id: RegionTagIds.timeStamp,
      type: "typed-number-array",
      numberType: "32ui",
      length: numberColumns,
    });
    regionTagManager.$INIT();
    RegionData.headByteSize = regionTagManager.tagSize;
    RegionData.numColumns = numberColumns;
  },

  getRegionTool() {
    return new RegionTool();
  },
};
