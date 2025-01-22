import { WorldSpaces } from "../World/WorldSpaces.js";

import { BinaryNumberTypes, BinaryStruct } from "@amodx/binary/";
import { WorldDataStructProperties } from "../Structs/Constants/WorldDataStructProperties.js";
import { Region } from "../World/Classes/Region.js";
import { RegionHeaderTags } from "../World/RegionHeaderRegister.js";
export const RegionStateStruct = new BinaryStruct("region-tags");
RegionStateStruct.registerProperty(
  {
    id: "dve_total_players",
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
      id: "dved-column-sector-index",
      type: "typed-number-array",
      numberType: BinaryNumberTypes.Uint16,
      length: WorldSpaces.region.getColumnVolume(),
    },
    {
      id: "dved-column-legnth-index",
      type: "typed-number-array",
      numberType: BinaryNumberTypes.Uint16,
      length: WorldSpaces.region.getColumnVolume(),
    },
    {
      id: "dved-column-save-timestamp",
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
