"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionDataTags = void 0;
var TagManager_1 = require("divine-binary-tags/out/TagManager");
exports.RegionDataTags = new TagManager_1.TagManager("column-tags");
exports.RegionDataTags.registerTag({
    id: "#dve_header",
    type: "header",
    numberType: "16ui",
});
exports.RegionDataTags.registerTag({
    id: "#dve_data_type",
    type: "header",
    numberType: "16ui",
});
exports.RegionDataTags.registerTag({
    id: "#dve_total_players",
    type: "typed-number",
    numberType: "16ui",
});
exports.RegionDataTags.registerTag({
    id: "#dve_dimension_id",
    type: "typed-number",
    numberType: "16ui",
});
exports.RegionDataTags.registerTag({
    id: "#dve_p_x",
    type: "typed-number",
    numberType: "32i",
});
exports.RegionDataTags.registerTag({
    id: "#dve_p_y",
    type: "typed-number",
    numberType: "32i",
});
exports.RegionDataTags.registerTag({
    id: "#dve_p_z",
    type: "typed-number",
    numberType: "32i",
});
var initData = exports.RegionDataTags.$INIT({
    indexBufferMode: "shared",
});
