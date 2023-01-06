"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DVED = void 0;
const RegionTool_js_1 = require("./Tools/RegionTool.js");
const DVED_util_js_1 = require("./Util/DVED.util.js");
const VoxelSpaces_js_1 = require("./Libs/voxelSpaces/VoxelSpaces.js");
const TagManager_js_1 = require("./Libs/divineBinaryTags/TagManager.js");
const System_js_1 = require("./System/System.js");
const SystemPath_js_1 = require("./System/SystemPath.js");
const voxelSpaces = VoxelSpaces_js_1.VoxelSpaces.getVoxelSpaces();
const regionTagManager = new TagManager_js_1.TagManager("region-tagsx");
exports.DVED = {
    spaces: voxelSpaces,
    regionTags: regionTagManager,
    system: System_js_1.System,
    path: SystemPath_js_1.SystemPath,
    $INIT(data) {
        SystemPath_js_1.SystemPath.setFolder(data.dataDirecotry);
        console.log(SystemPath_js_1.SystemPath.getDataPath());
        this.spaces = voxelSpaces;
        DVED_util_js_1.SecotrData.byteSize = data.sectorSize;
        SystemPath_js_1.SystemPath._dataFolder = data.dataDirecotry;
        System_js_1.System.$INIT(data.fs);
        this.spaces.setDimensions(data.spaceBounds);
        const numberColumns = this.spaces.region.getColumnVolume();
        regionTagManager.registerTag({
            id: DVED_util_js_1.RegionTagIds.sectorIndex,
            type: "typed-number-array",
            numberType: "16ui",
            length: numberColumns,
        });
        regionTagManager.registerTag({
            id: DVED_util_js_1.RegionTagIds.columnLength,
            type: "typed-number-array",
            numberType: "16ui",
            length: numberColumns,
        });
        regionTagManager.registerTag({
            id: DVED_util_js_1.RegionTagIds.timeStamp,
            type: "typed-number-array",
            numberType: "32ui",
            length: numberColumns,
        });
        regionTagManager.$INIT();
        DVED_util_js_1.RegionData.headByteSize = regionTagManager.tagSize;
        DVED_util_js_1.RegionData.numColumns = numberColumns;
    },
    getRegionTool() {
        return new RegionTool_js_1.RegionTool();
    },
};
