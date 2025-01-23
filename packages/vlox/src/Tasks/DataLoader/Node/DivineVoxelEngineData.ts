import type * as FileSystem from "fs";
import { NodeRegionTool } from "./Tools/NodeRegionTool.js";
import { RegionData, RegionTagIds, SecotrData } from "./Util/DVED.util.js";
import { VoxelSpaces } from "../../../Math/Spaces/VoxelSpaces.js";
import { BinaryNumberTypes, BinaryStruct } from "@amodx/binary/";
import { System } from "./System/System.js";
import { SystemPath } from "./System/SystemPath.js";

type Vector3 = { x: number; y: number; z: number };

const voxelSpaces = new VoxelSpaces();
const regionTagManager = new BinaryStruct("region-tagsx");

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
    this.spaces = voxelSpaces;
    SecotrData.byteSize = data.sectorSize;
    SystemPath._dataFolder = data.dataDirecotry;
    System.$INIT(data.fs);
    this.spaces.setDimensions(data.spaceBounds);
    const numberColumns = this.spaces.region.getColumnVolume();
    regionTagManager.registerProperty({
      id: RegionTagIds.sectorIndex,
      type: "typed-number-array",
      numberType: BinaryNumberTypes.Uint16,
      length: numberColumns,
    });
    regionTagManager.registerProperty({
      id: RegionTagIds.columnLength,
      type: "typed-number-array",
      numberType: BinaryNumberTypes.Uint16,
      length: numberColumns,
    });
    regionTagManager.registerProperty({
      id: RegionTagIds.timeStamp,
      type: "typed-number-array",
      numberType: BinaryNumberTypes.Uint32,
      length: numberColumns,
    });
    regionTagManager.init();
    RegionData.headByteSize = regionTagManager.structSize;
    RegionData.numColumns = numberColumns;
  },

  getRegionTool() {
    return new NodeRegionTool();
  },
};
