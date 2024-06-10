import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces.js";

import { BinaryNumberTypes, BinaryStruct } from "@divinestar/binary/";
import { WorldDataStructProperties } from "../../../../Data/Constants/Structs/WorldDataStructProperties.js";
import { Region } from "../../../../Data/World/Classes/Region.js";
import { RegionHeaderTags } from "../../../../Data/RegionHeaderRegister.js";
export const RegionStateStruct = new BinaryStruct("region-tags");
RegionStateStruct.registerProperty(
  {
    id: WorldDataStructProperties.header,
    type: "header",
    numberType: BinaryNumberTypes.Uint16,
  },
  {
    id: WorldDataStructProperties.dataType,
    type: "header",
    numberType: BinaryNumberTypes.Uint16,
  },
  {
    id: "#dve_total_players",
    type: "typed-number",
    numberType: BinaryNumberTypes.Uint16,
  },
  {
    id: WorldDataStructProperties.dimensionId,
    type: "typed-number",
    numberType: BinaryNumberTypes.Uint16,
  },
  {
    id: WorldDataStructProperties.positionX,
    type: "typed-number",
    numberType: BinaryNumberTypes.Int32,
  },
  {
    id: WorldDataStructProperties.positionY,
    type: "typed-number",
    numberType: BinaryNumberTypes.Int32,
  },
  {
    id: WorldDataStructProperties.positionZ,
    type: "typed-number",
    numberType: BinaryNumberTypes.Int32,
  }
);

export const RegionHeaderTagManager = new BinaryStruct("region-header-tags");

export function InitalizeRegionTags() {
  const initData = RegionStateStruct.init({
    indexBufferMode: "shared",
  });
  Region.StateStruct.init(initData);
  RegionHeaderTagManager.registerProperty(
    {
      id: "#dved-column-sector-index",
      type: "typed-number-array",
      numberType: BinaryNumberTypes.Uint16,
      length: WorldSpaces.region.getColumnVolume(),
    },
    {
      id: "#dved-column-legnth-index",
      type: "typed-number-array",
      numberType: BinaryNumberTypes.Uint16,
      length: WorldSpaces.region.getColumnVolume(),
    },
    {
      id: "#dved-column-save-timestamp",
      type: "typed-number-array",
      numberType: BinaryNumberTypes.Uint32,
      length: WorldSpaces.region.getColumnVolume(),
    }
  );

  const headerInitData = RegionHeaderTagManager.init({
    indexBufferMode: "shared",
  });

  RegionHeaderTags.init(headerInitData);
}
