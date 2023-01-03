"use strict";
//import { TagManager } from "../libs/divineBinaryTags/TagManager.js";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DVED = void 0;
var DVEDSystem_js_1 = require("./DVEDSystem.js");
var RegionTool_js_1 = require("./Tools/RegionTool.js");
var DVED_constants_js_1 = require("./Constants/DVED.constants.js");
var VoxelSpaces_js_1 = require("./Libs/voxelSpaces/VoxelSpaces.js");
var TagManager_js_1 = require("./Libs/divineBinaryTags/TagManager.js");
var System_js_1 = require("./System/System.js");
var voxelSpaces = VoxelSpaces_js_1.VoxelSpaces.getVoxelSpaces();
var regionTagManager = new TagManager_js_1.TagManager("region-tagsx");
exports.DVED = {
    spaces: voxelSpaces,
    regionTags: regionTagManager,
    $INIT: function (data) {
        this.spaces = voxelSpaces;
        DVED_constants_js_1.SecotrData.byteSize = data.sectorSize;
        DVEDSystem_js_1.DVEDSystem.setFS(data.fs);
        System_js_1.System.$INIT(data.fs);
        this.spaces.setDimensions(data.spaceBounds);
        regionTagManager.registerTag({
            id: "#dved-column-sector-index",
            type: "typed-number-array",
            numberType: "16ui",
            length: this.spaces.region.getColumnVolume(),
        });
        regionTagManager.registerTag({
            id: "#dved-column-legnth-index",
            type: "typed-number-array",
            numberType: "16ui",
            length: this.spaces.region.getColumnVolume(),
        });
        regionTagManager.registerTag({
            id: "#dved-column-save-timestamp",
            type: "typed-number-array",
            numberType: "32ui",
            length: this.spaces.region.getColumnVolume(),
        });
        regionTagManager.$INIT();
        DVED_constants_js_1.RegionHeaderData.byteSize = regionTagManager.tagSize;
    },
    getRegionTool: function () {
        return new RegionTool_js_1.RegionTool();
    },
};
