import { TagManager } from "../../../Libs/DivineBinaryTags/TagManager.js";
import { ColumnTags } from "../../../Data/World/Column/ColumnTags.js";
import { WorldDataTagIDs } from "../../../Data/Constants/Tags/WorldDataTagIds.js";
export const ColumnDataTags = new TagManager("column-tags");
ColumnDataTags.registerTag({
    id: WorldDataTagIDs.header,
    type: "header",
    numberType: "16ui",
});
ColumnDataTags.registerTag({
    id: WorldDataTagIDs.dataType,
    type: "header",
    numberType: "16ui",
});
ColumnDataTags.registerTag({
    id: WorldDataTagIDs.dimensionId,
    type: "typed-number",
    numberType: "16ui",
});
ColumnDataTags.registerTag({
    id: WorldDataTagIDs.positionX,
    type: "typed-number",
    numberType: "32i",
});
ColumnDataTags.registerTag({
    id: WorldDataTagIDs.positionY,
    type: "typed-number",
    numberType: "32i",
});
ColumnDataTags.registerTag({
    id: WorldDataTagIDs.positionZ,
    type: "typed-number",
    numberType: "32i",
});
ColumnDataTags.registerTag({
    id: "#dve_last_save_timestamp",
    type: "typed-number",
    numberType: "32ui",
});
ColumnDataTags.registerTag({
    id: "#dve_last_analyzer_update_timestamp",
    type: "typed-number",
    numberType: "32ui",
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
    id: "#dve_is_world_propagation_done",
    type: "boolean",
});
ColumnDataTags.registerTag({
    id: "#dve_is_dirty",
    type: "boolean",
});
ColumnDataTags.registerTag({
    id: "#dve_persistent",
    type: "boolean",
});
export function InitalizeColumnTags() {
    const initData = ColumnDataTags.$INIT({
        indexBufferMode: "shared",
    });
    ColumnTags.$INIT(initData);
}
