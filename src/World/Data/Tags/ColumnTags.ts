import { TagManager } from "../../../Libs/DivineBinaryTags/TagManager.js";
import { ColumnTags } from "../../../Data/World/Column/ColumnTags.js";
export const ColumnDataTags = new TagManager("column-tags");
ColumnDataTags.registerTag({
 id: "#dve_header",
 type: "header",
 numberType: "16ui",
});
ColumnDataTags.registerTag({
 id: "#dve_data_type",
 type: "header",
 numberType: "16ui",
});
ColumnDataTags.registerTag({
 id: "#dve_dimension_id",
 type: "typed-number",
 numberType: "16ui",
});
ColumnDataTags.registerTag({
 id: "#dve_p_x",
 type: "typed-number",
 numberType: "32i",
});
ColumnDataTags.registerTag({
 id: "#dve_p_y",
 type: "typed-number",
 numberType: "32i",
});
ColumnDataTags.registerTag({
 id: "#dve_p_z",
 type: "typed-number",
 numberType: "32i",
});
ColumnDataTags.registerTag({
 id: "#dve_is_stored",
 type: "boolean",
});
ColumnDataTags.registerTag({
 id: "#dve_is_world_gen_done",
 type: "boolean",
});
ColumnDataTags.registerTag({
 id: "#dve_is_world_sun_done",
 type: "boolean",
});
ColumnDataTags.registerTag({
 id: "#dve_is_rgb_done",
 type: "boolean",
});
ColumnDataTags.registerTag({
 id: "#dve_is_liquid_flow_donw",
 type: "boolean",
});
ColumnDataTags.registerTag({
 id: "#dve_is_magma_flow_donw",
 type: "boolean",
});
export function InitalizeColumnTags() {
 const initData = ColumnDataTags.$INIT({
  indexBufferMode: "shared",
 });

 ColumnTags.$INIT(initData);
}
