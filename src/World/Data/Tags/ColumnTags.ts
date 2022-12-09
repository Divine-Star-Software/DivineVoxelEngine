import { TagManager } from "../../../Libs/DivineBinaryTags/TagManager.js";
import { ColumnTags } from "../../../Data/World/Column/ColumnTags.js";
export const ColumnDataTags = new TagManager("column-tags");
ColumnDataTags.registerTag({
 id: "#dve:message_header",
 type: "typed-number",
 numberType: "16ui",
});
ColumnDataTags.registerTag({
 id: "#dve:dimension_id",
 type: "typed-number",
 numberType: "16ui",
});
ColumnDataTags.registerTag({
 id: "#dve:p_x",
 type: "typed-number",
 numberType: "32i",
});
ColumnDataTags.registerTag({
 id: "#dve:p_y",
 type: "typed-number",
 numberType: "32i",
});
ColumnDataTags.registerTag({
 id: "#dve:p_z",
 type: "typed-number",
 numberType: "32i",
});

ColumnDataTags.registerTag({
 id: "#dve:is_world_gen_done",
 type: "boolean",
});
ColumnDataTags.registerTag({
 id: "#dve:is_world_sun_done",
 type: "boolean",
});
ColumnDataTags.registerTag({
 id: "#dve:is_rgb_done",
 type: "boolean",
});
ColumnDataTags.registerTag({
 id: "#dve:is_liquid_flow_donw",
 type: "boolean",
});
ColumnDataTags.registerTag({
 id: "#dve:is_magma_flow_donw",
 type: "boolean",
});
export function InitalizeColumnTags() {
 const initData = ColumnDataTags.$INIT({
  indexBufferMode: "shared",
 });


 ColumnTags.$INIT(initData);
}
