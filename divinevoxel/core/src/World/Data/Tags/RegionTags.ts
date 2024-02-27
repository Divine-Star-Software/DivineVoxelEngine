import { WorldSpaces } from "../../../Data/World/WorldSpaces.js";

import { TagManager } from "@divinestar/binary/"
import { WorldDataTagIDs } from "../../../Data/Constants/Tags/WorldDataTagIds.js";
import { Region } from "../../../Data/World/Classes/Region.js";
import { RegionHeaderTags } from "../../../Data/Register/RegionHeaderRegister.js";
export const RegionDataTags = new TagManager("region-tags");
RegionDataTags.registerTag({
 id: WorldDataTagIDs.header,
 type: "header",
 numberType: "16ui",
});
RegionDataTags.registerTag({
 id: WorldDataTagIDs.dataType,
 type: "header",
 numberType: "16ui",
});
RegionDataTags.registerTag({
 id: "#dve_total_players",
 type: "typed-number",
 numberType: "16ui",
});
RegionDataTags.registerTag({
 id: WorldDataTagIDs.dimensionId,
 type: "typed-number",
 numberType: "16ui",
});
RegionDataTags.registerTag({
 id: WorldDataTagIDs.positionX,
 type: "typed-number",
 numberType: "32i",
});
RegionDataTags.registerTag({
 id: WorldDataTagIDs.positionY,
 type: "typed-number",
 numberType: "32i",
});
RegionDataTags.registerTag({
 id: WorldDataTagIDs.positionZ,
 type: "typed-number",
 numberType: "32i",
});
export const RegionHeaderTagManager = new TagManager("region-header-tags");

export function InitalizeRegionTags() {
 const initData = RegionDataTags.$INIT({
  indexBufferMode: "shared",
 });
 Region.Tags.$INIT(initData);
 RegionHeaderTagManager.registerTag({
  id: "#dved-column-sector-index",
  type: "typed-number-array",
  numberType: "16ui",
  length: WorldSpaces.region.getColumnVolume(),
 });
 RegionHeaderTagManager.registerTag({
  id: "#dved-column-legnth-index",
  type: "typed-number-array",
  numberType: "16ui",
  length: WorldSpaces.region.getColumnVolume(),
 });
 RegionHeaderTagManager.registerTag({
  id: "#dved-column-save-timestamp",
  type: "typed-number-array",
  numberType: "32ui",
  length: WorldSpaces.region.getColumnVolume(),
 });
 const headerInitData = RegionHeaderTagManager.$INIT({
  indexBufferMode: "shared",
 });

 RegionHeaderTags.$INIT(headerInitData);
}
