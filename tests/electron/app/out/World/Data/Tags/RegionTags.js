import { WorldSpaces } from "../../../Data/World/WorldSpaces.js";
import { RegionHeaderTags, RegionTags } from "../../../Data/World/Region/RegionTags.js";
import { TagManager } from "../../../Libs/DivineBinaryTags/TagManager.js";
export const RegionDataTags = new TagManager("region-tags");
RegionDataTags.registerTag({
    id: "#dve_header",
    type: "header",
    numberType: "16ui",
});
RegionDataTags.registerTag({
    id: "#dve_data_type",
    type: "header",
    numberType: "16ui",
});
RegionDataTags.registerTag({
    id: "#dve_total_players",
    type: "typed-number",
    numberType: "16ui",
});
RegionDataTags.registerTag({
    id: "#dve_dimension_id",
    type: "typed-number",
    numberType: "16ui",
});
RegionDataTags.registerTag({
    id: "#dve_p_x",
    type: "typed-number",
    numberType: "32i",
});
RegionDataTags.registerTag({
    id: "#dve_p_y",
    type: "typed-number",
    numberType: "32i",
});
RegionDataTags.registerTag({
    id: "#dve_p_z",
    type: "typed-number",
    numberType: "32i",
});
export const RegionHeaderTagManager = new TagManager("region-header-tags");
export function InitalizeRegionTags() {
    const initData = RegionDataTags.$INIT({
        indexBufferMode: "shared",
    });
    RegionTags.$INIT(initData);
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
