import { RegionTags } from "../../../Data/World/Region/RegionTags.js";
import { TagManager } from "../../../Libs/DivineBinaryTags/TagManager.js";
export const RegionDataTags = new TagManager("column-tags");
RegionDataTags.registerTag({
    id: "#dve_header",
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
export function InitalizeRegionTags() {
    const initData = RegionDataTags.$INIT({
        indexBufferMode: "shared",
    });
    RegionTags.$INIT(initData);
}
