/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./compiled/client/Nexus/nexus.js":
/*!****************************************!*\
  !*** ./compiled/client/Nexus/nexus.js ***!
  \****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var divine_voxel_engine_Nexus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-voxel-engine/Nexus */ "../../DSLIBS/divineVoxelEngine/dist/Nexus/index.js");
/* harmony import */ var dve_plugins_player_Nexus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dve-plugins-player/Nexus */ "../../DSLIBS/dvePlugIns/Player/dist/Nexus/index.js");

//import { GetNexusPlayer } from "./Player/InitNexusPlayer.js";

await divine_voxel_engine_Nexus__WEBPACK_IMPORTED_MODULE_0__.DVEN.$INIT();
const player = await (0,dve_plugins_player_Nexus__WEBPACK_IMPORTED_MODULE_1__.INIT_NEXUS_PLAYER)(divine_voxel_engine_Nexus__WEBPACK_IMPORTED_MODULE_0__.DVEN);
player.node.setPosition(0, 200, 0);
divine_voxel_engine_Nexus__WEBPACK_IMPORTED_MODULE_0__.DVEN.TC.registerTasks("set-player-position", (data) => {
    player.node.setPosition(...data);
});
let updating = false;
divine_voxel_engine_Nexus__WEBPACK_IMPORTED_MODULE_0__.DVEN.TC.registerTasks("start-world", (data) => {
    console.log("Sstart world", data);
    updating = true;
    player.node.setPosition(...data);
});
let lastMaterial = "stone";
setInterval(() => {
    if (!updating)
        return;
    player.update();
    divine_voxel_engine_Nexus__WEBPACK_IMPORTED_MODULE_0__.DVEN.parentComm.runTasks("set-material", player.materialStandingOn);
}, 17);
setInterval(() => {
    console.log(player.position.x, player.position.y, player.position.z);
}, 2_000);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/DataSyncNode.js":
/*!****************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/DataSyncNode.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataSyncNode": () => (/* binding */ DataSyncNode)
/* harmony export */ });
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");
/* harmony import */ var _World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./World/WorldRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldRegister.js");
/* harmony import */ var _Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Common/Threads/Contracts/DataSyncIds.js */ "../../DSLIBS/divineVoxelEngine/dist/Common/Threads/Contracts/DataSyncIds.js");
/* harmony import */ var _Voxel_VoxelPalette_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Voxel/VoxelPalette.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Voxel/VoxelPalette.js");
/* harmony import */ var _World_Dimensions_DimensionsRegister_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./World/Dimensions/DimensionsRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Dimensions/DimensionsRegister.js");
/* harmony import */ var _World_Chunk_ChunkTags_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./World/Chunk/ChunkTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Chunk/ChunkTags.js");
/* harmony import */ var _World_Region_RegionTags_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./World/Region/RegionTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Region/RegionTags.js");
/* harmony import */ var _World_Column_ColumnTags_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./World/Column/ColumnTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Column/ColumnTags.js");
/* harmony import */ var _Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Voxel/VoxelTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Voxel/VoxelTags.js");
/* harmony import */ var _Register_MappedDataRegister_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Register/MappedDataRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Register/MappedDataRegister.js");
/* harmony import */ var _World_Region_RegionHeaderRegister_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./World/Region/RegionHeaderRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Region/RegionHeaderRegister.js");
/* harmony import */ var _Substance_SubstancePalette_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Substance/SubstancePalette.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Substance/SubstancePalette.js");
/* harmony import */ var _Substance_SubstanceTags_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Substance/SubstanceTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Substance/SubstanceTags.js");
//objects













const DataSyncNode = {
    maps: {
        strings: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.registerStringMap, (data) => {
            _Register_MappedDataRegister_js__WEBPACK_IMPORTED_MODULE_9__.MappedDataRegister.stringMaps.sync(data);
        }),
        objects: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.registerObjectMap, (data) => {
            _Register_MappedDataRegister_js__WEBPACK_IMPORTED_MODULE_9__.MappedDataRegister.objectMaps.sync(data);
        }),
    },
    palettes: {
        voxel: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.voxelPalette, ([palette, map]) => {
            _Voxel_VoxelPalette_js__WEBPACK_IMPORTED_MODULE_3__.VoxelPaletteReader.setVoxelPalette(palette, map);
        }),
        substance: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.substancePalette, ([palette, map]) => {
            _Substance_SubstancePalette_js__WEBPACK_IMPORTED_MODULE_11__.SubstancePaletteReader.setPalette(palette, map);
        }),
    },
    worldData: {
        dimension: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.dimesnion, (data) => {
            _World_Dimensions_DimensionsRegister_js__WEBPACK_IMPORTED_MODULE_4__.DimensionsRegister.registerDimension(data.id, data.options);
        }),
        chunk: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.chunk, (data) => {
            _World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldRegister.chunk.add(data[0], data[1]);
        }, (data) => {
            _World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldRegister.chunk.remove(data);
        }),
        column: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.column, (data) => {
            _World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldRegister.column.add(data[0], data[1]);
        }, (data) => {
            _World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldRegister.column.remove(data);
        }),
        region: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.region, (data) => {
            _World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldRegister.region.add(data[0], data[1]);
        }, (data) => {
            _World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldRegister.region.remove(data);
        }),
        regionHeader: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.regionHeader, (data) => {
            _World_Region_RegionHeaderRegister_js__WEBPACK_IMPORTED_MODULE_10__.RegionHeaderRegister.add(data[0], data[1]);
        }, (data) => {
            _World_Region_RegionHeaderRegister_js__WEBPACK_IMPORTED_MODULE_10__.RegionHeaderRegister.remove(data);
        }),
    },
    tags: {
        voxel: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.voxelTags, (data) => {
            _Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_8__.VoxelTags.$INIT(data[0]);
            _Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_8__.VoxelTags.sync(new Uint16Array(data[1]));
        }),
        substance: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.substanceTags, (data) => {
            _Substance_SubstanceTags_js__WEBPACK_IMPORTED_MODULE_12__.SubstanceTags.$INIT(data);
        }),
        chunk: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.chunkTags, (data) => {
            _World_Chunk_ChunkTags_js__WEBPACK_IMPORTED_MODULE_5__.ChunkTags.$INIT(data);
        }),
        column: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.columnTags, (data) => {
            _World_Column_ColumnTags_js__WEBPACK_IMPORTED_MODULE_7__.ColumnTags.$INIT(data);
        }),
        region: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.regionTags, (data) => {
            _World_Region_RegionTags_js__WEBPACK_IMPORTED_MODULE_6__.RegionTags.$INIT(data[0]);
            _World_Region_RegionTags_js__WEBPACK_IMPORTED_MODULE_6__.RegionHeaderTags.$INIT(data[1]);
        }),
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Scalar.js":
/*!******************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Scalar.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scalar": () => (/* binding */ Scalar)
/* harmony export */ });
class Scalar {
    value;
    static Between(value, min, max) {
        return value >= min && value <= max;
    }
    constructor(value = 0) {
        this.value = value;
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Nexus/DivineVoxelEngineNexus.js":
/*!***************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Nexus/DivineVoxelEngineNexus.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DVEN": () => (/* binding */ DVEN)
/* harmony export */ });
/* harmony import */ var _Threads_NexusTheads_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Threads/NexusTheads.js */ "../../DSLIBS/divineVoxelEngine/dist/Nexus/Threads/NexusTheads.js");
/* harmony import */ var _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Global/Util.helper.js */ "../../DSLIBS/divineVoxelEngine/dist/Global/Util.helper.js");
/* harmony import */ var _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Data/Settings/EngineSettings.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Settings/EngineSettings.js");
/* harmony import */ var _Init_InitNexusWorker_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Init/InitNexusWorker.js */ "../../DSLIBS/divineVoxelEngine/dist/Nexus/Init/InitNexusWorker.js");
/* harmony import */ var _Data_DataSyncNode_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Data/DataSyncNode.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/DataSyncNode.js");
/* harmony import */ var _Data_DataManager_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Data/DataManager.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/DataManager.js");
/* harmony import */ var _Data_World_WorldPainter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Data/World/WorldPainter.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldPainter.js");
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");
/* harmony import */ var _Tools_Data_RichDataTool_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Tools/Data/RichDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/RichDataTool.js");
/* harmony import */ var _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Tools/Data/DataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/DataTool.js");
//comms

//objects


//functions







const DVEN = {
    environment: "browser",
    TC: threadcomm__WEBPACK_IMPORTED_MODULE_7__.ThreadComm,
    UTIL: _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_1__.Util,
    settings: _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_2__.EngineSettings,
    dataSyncNode: _Data_DataSyncNode_js__WEBPACK_IMPORTED_MODULE_4__.DataSyncNode,
    data: _Data_DataManager_js__WEBPACK_IMPORTED_MODULE_5__.DataManager,
    worldData: _Data_World_WorldPainter_js__WEBPACK_IMPORTED_MODULE_6__.WorldPainter,
    worldComm: _Threads_NexusTheads_js__WEBPACK_IMPORTED_MODULE_0__.WorldComm,
    parentComm: _Threads_NexusTheads_js__WEBPACK_IMPORTED_MODULE_0__.ParentComm,
    async $INIT() {
        await (0,_Init_InitNexusWorker_js__WEBPACK_IMPORTED_MODULE_3__.InitNexusWorker)(this);
    },
    getRichDataTool() {
        return new _Tools_Data_RichDataTool_js__WEBPACK_IMPORTED_MODULE_8__.RichDataTool();
    },
    getDataTool() {
        return new _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_9__.DataTool();
    }
};
DVEN.environment = _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_1__.Util.getEnviorment();


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Nexus/Init/InitNexusWorker.js":
/*!*************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Nexus/Init/InitNexusWorker.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InitNexusWorker": () => (/* binding */ InitNexusWorker)
/* harmony export */ });
/* harmony import */ var _Threads_NexusThreadState_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Threads/NexusThreadState.js */ "../../DSLIBS/divineVoxelEngine/dist/Nexus/Threads/NexusThreadState.js");
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");


async function InitNexusWorker(DVEN) {
    let parent = "render";
    if (DVEN.environment == "node") {
        parent = "server";
    }
    await threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.$INIT("nexus", parent);
    await DVEN.UTIL.createPromiseCheck({ check: () => {
            return _Threads_NexusThreadState_js__WEBPACK_IMPORTED_MODULE_0__.NexusThreadState.isReady();
        }, checkInterval: 1 });
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Nexus/Threads/NexusTheads.js":
/*!************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Nexus/Threads/NexusTheads.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParentComm": () => (/* binding */ ParentComm),
/* harmony export */   "RichWorldComm": () => (/* binding */ RichWorldComm),
/* harmony export */   "WorldComm": () => (/* binding */ WorldComm)
/* harmony export */ });
/* harmony import */ var _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Data/Settings/EngineSettings.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Settings/EngineSettings.js");
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");
/* harmony import */ var _NexusThreadState_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NexusThreadState.js */ "../../DSLIBS/divineVoxelEngine/dist/Nexus/Threads/NexusThreadState.js");
/* harmony import */ var _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Data/DataHooks.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/DataHooks.js");




const ParentComm = threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.parent;
const RichWorldComm = threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.createComm("rich-world");
const WorldComm = threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.createComm("world");
threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.registerTasks("sync-settings", (settings) => {
    _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_0__.EngineSettings.syncSettings(settings);
    _NexusThreadState_js__WEBPACK_IMPORTED_MODULE_2__.NexusThreadState._settingsSynced = true;
    _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_3__.DataHooks.settingsSynced.run(settings);
});


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Nexus/Threads/NexusThreadState.js":
/*!*****************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Nexus/Threads/NexusThreadState.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NexusThreadState": () => (/* binding */ NexusThreadState)
/* harmony export */ });
/* harmony import */ var _NexusTheads_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NexusTheads.js */ "../../DSLIBS/divineVoxelEngine/dist/Nexus/Threads/NexusTheads.js");

const NexusThreadState = {
    _settingsSynced: false,
    isReady() {
        return _NexusTheads_js__WEBPACK_IMPORTED_MODULE_0__.WorldComm.isReady() && this._settingsSynced;
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Nexus/index.js":
/*!**********************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Nexus/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DVEN": () => (/* reexport safe */ _DivineVoxelEngineNexus_js__WEBPACK_IMPORTED_MODULE_0__.DVEN)
/* harmony export */ });
/* harmony import */ var _DivineVoxelEngineNexus_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DivineVoxelEngineNexus.js */ "../../DSLIBS/divineVoxelEngine/dist/Nexus/DivineVoxelEngineNexus.js");



/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Physics/dist/Classes/BoundingBox.js":
/*!*******************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Physics/dist/Classes/BoundingBox.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BoundingBox": () => (/* binding */ BoundingBox)
/* harmony export */ });
/* harmony import */ var divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-voxel-engine/Math/Classes/Vector3.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Vector3.js");

class BoundingBox {
    bounds = {
        minX: Infinity,
        maxX: -Infinity,
        minZ: Infinity,
        maxZ: -Infinity,
        minY: Infinity,
        maxY: -Infinity,
    };
    _full = { w: 0.8, h: 1.8, d: 0.8 };
    _half = { w: 0.8 / 2, h: 1.8 / 2, d: 0.8 / 2 };
    position = new divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 0);
    constructor(width = 1, height = width, depth = width) {
        this._full.w = width;
        this._full.h = height;
        this._full.d = depth;
        this._half.w = width / 2;
        this._half.h = height / 2;
        this._half.d = depth / 2;
    }
    update(width, height, depth) {
        this.width = width;
        this.height = height;
        this.depth = depth;
    }
    setPosition(position) {
        this.position.updateFromVec3(position);
        const o = this.position;
        this.bounds.minX = o.x;
        this.bounds.maxX = o.x + this.width;
        this.bounds.minZ = o.z;
        this.bounds.maxZ = o.z + this.depth;
        this.bounds.minY = o.y;
        this.bounds.maxY = o.y + this.height;
    }
    get width() {
        return this._full.w;
    }
    get height() {
        return this._full.h;
    }
    get depth() {
        return this._full.d;
    }
    set width(width) {
        this._full.w = width;
        this._half.w = width / 2;
    }
    set height(height) {
        this._full.h = height;
        this._half.h = height / 2;
    }
    set depth(depth) {
        this._full.d = depth;
        this._half.d = depth / 2;
    }
    get halfWidth() {
        return this._half.w;
    }
    get halfHeight() {
        return this._half.h;
    }
    get halfDepth() {
        return this._half.d;
    }
    pointIsInside(point) {
        return (point.x >= this.bounds.minX &&
            point.x <= this.bounds.maxX &&
            point.y >= this.bounds.minY &&
            point.y <= this.bounds.maxY &&
            point.z >= this.bounds.minZ &&
            point.z <= this.bounds.maxZ);
    }
    doesIntersect(boundingBox) {
        return (this.bounds.minX <= boundingBox.bounds.maxX &&
            this.bounds.maxX >= boundingBox.bounds.minX &&
            this.bounds.minY <= boundingBox.bounds.maxY &&
            this.bounds.maxY >= boundingBox.bounds.minY &&
            this.bounds.minZ <= boundingBox.bounds.maxZ &&
            this.bounds.maxZ >= boundingBox.bounds.minZ);
    }
    *query() {
        const sx = Math.floor(this.bounds.minX);
        const sy = Math.floor(this.bounds.minY);
        const sz = Math.floor(this.bounds.minZ);
        const mx = Math.ceil(this.bounds.maxX);
        const my = Math.ceil(this.bounds.maxY);
        const mz = Math.ceil(this.bounds.maxZ);
        for (let y = sy; y <= my; y++) {
            for (let x = sx; x <= mx; x++) {
                for (let z = sz; z <= mz; z++) {
                    yield [x, y, z];
                }
            }
        }
    }
}


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Physics/dist/Classes/Collider.js":
/*!****************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Physics/dist/Classes/Collider.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Collider": () => (/* binding */ Collider)
/* harmony export */ });
/* harmony import */ var divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-voxel-engine/Math/Classes/Vector3.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Vector3.js");
/* harmony import */ var _BoundingBox_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BoundingBox.js */ "../../DSLIBS/dvePlugIns/Physics/dist/Classes/BoundingBox.js");
/* harmony import */ var _CollisionNode_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CollisionNode.js */ "../../DSLIBS/dvePlugIns/Physics/dist/Classes/CollisionNode.js");



class Collider {
    static createBBox(width = 1, height = width, depth = width) {
        const bbox = new _BoundingBox_js__WEBPACK_IMPORTED_MODULE_1__.BoundingBox(width, height, depth);
        bbox.setPosition(new divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 0));
        return bbox;
    }
    nodes = [];
    addNode(name, boundingBox) {
        this.nodes.push(new _CollisionNode_js__WEBPACK_IMPORTED_MODULE_2__.CollisionNode(name, boundingBox));
    }
    hasFlag(id) {
        return this.flags[id] !== undefined;
    }
}


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Physics/dist/Classes/CollisionNode.js":
/*!*********************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Physics/dist/Classes/CollisionNode.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollisionNode": () => (/* binding */ CollisionNode)
/* harmony export */ });
/* harmony import */ var divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-voxel-engine/Math/Classes/Vector3.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Vector3.js");
/* harmony import */ var _CollisionResult_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CollisionResult.js */ "../../DSLIBS/dvePlugIns/Physics/dist/Classes/CollisionResult.js");


class CollisionNode {
    name;
    boundingBox;
    results = new _CollisionResult_js__WEBPACK_IMPORTED_MODULE_1__.CollisionResult();
    position = new divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 0);
    constructor(name, boundingBox) {
        this.name = name;
        this.boundingBox = boundingBox;
    }
}


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Physics/dist/Classes/CollisionResult.js":
/*!***********************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Physics/dist/Classes/CollisionResult.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollisionResult": () => (/* binding */ CollisionResult)
/* harmony export */ });
class CollisionResult {
    raw = {
        hitDepth: 1,
        nx: 0,
        ny: 0,
        nz: 0,
    };
    update(h, nx, ny, nz) {
        this.raw.hitDepth = h;
        this.raw.nx = nx;
        this.raw.ny = ny;
        this.raw.nz = nz;
        return this;
    }
    loadIn(results) {
        this.raw.hitDepth = results.raw.hitDepth;
        this.raw.nx = results.raw.nx;
        this.raw.ny = results.raw.ny;
        this.raw.nz = results.raw.nz;
    }
    reset() {
        this.raw.hitDepth = 1;
        this.raw.nx = 0;
        this.raw.ny = 0;
        this.raw.nz = 0;
    }
    collided() {
        return this.raw.hitDepth < 1;
    }
    faceHit = {
        top: () => this.raw.ny == 1 && this.collided(),
        bottom: () => this.raw.ny == -1 && this.collided(),
        east: () => this.raw.nx == 1 && this.collided(),
        west: () => this.raw.nx == -1 && this.collided(),
        north: () => this.raw.nz == 1 && this.collided(),
        south: () => this.raw.nz == -1 && this.collided(),
    };
    normalHit = {
        x: () => this.raw.nx,
        y: () => this.raw.ny,
        z: () => this.raw.nz,
    };
}


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Physics/dist/Classes/Line.js":
/*!************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Physics/dist/Classes/Line.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Line": () => (/* binding */ Line)
/* harmony export */ });
/* harmony import */ var divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-voxel-engine/Math/Classes/Vector3.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Vector3.js");

class Line {
    start = new divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 0);
    end = new divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__.Vector3(1, 1, 1);
    update(start, end) {
        this.start.updateFromVec3(start);
        this.end.updateFromVec3(end);
        return this;
    }
}


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Physics/dist/Classes/Plane.js":
/*!*************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Physics/dist/Classes/Plane.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Plane": () => (/* binding */ Plane)
/* harmony export */ });
/* harmony import */ var divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-voxel-engine/Math/Classes/Vector3.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Vector3.js");

class Plane {
    dimensions = new divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 0);
    normal = new divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 0);
    update(dimensions, normal) {
        this.dimensions.updateFromVec3(dimensions);
        this.normal.updateFromVec3(normal);
        return this;
    }
    /**# Line To Plane
     * @returns  a value between 0 and 1.
     *
     * 1 meaning there was no collision
     * and 0.5 meaning there was collision at the halfway mark of the bouding box.
     *
     */
    lineToPlane(line) {
        const NdotU = this.normal.x * line.end.x +
            this.normal.y * line.end.y +
            this.normal.z * line.end.z;
        return NdotU == 0
            ? Infinity
            : (this.normal.x * (this.dimensions.x - line.start.x) +
                this.normal.y * (this.dimensions.y - line.start.y) +
                this.normal.z * (this.dimensions.z - line.start.z)) /
                NdotU;
    }
}


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Physics/dist/Colliders/ColliderManager.js":
/*!*************************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Physics/dist/Colliders/ColliderManager.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ColliderManager": () => (/* binding */ ColliderManager)
/* harmony export */ });
const ColliderManager = {
    colliders: {},
    registerCollider(collider) {
        if (Array.isArray(collider)) {
            return collider.forEach((_) => (this.colliders[_.id] = _));
        }
        this.colliders[collider.id] = collider;
    },
    getCollider(id) {
        const collider = this.colliders[id];
        if (!collider) {
            throw new Error(`Collider with ${id} does not exists.`);
        }
        return collider;
    },
};


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Physics/dist/Colliders/Functions/RegisterDefaultColliders.js":
/*!********************************************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Physics/dist/Colliders/Functions/RegisterDefaultColliders.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegisterDefaultColliders": () => (/* binding */ RegisterDefaultColliders)
/* harmony export */ });
/* harmony import */ var _default_Box_Box_collider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../default/Box/Box.collider.js */ "../../DSLIBS/dvePlugIns/Physics/dist/Colliders/default/Box/Box.collider.js");
/* harmony import */ var _default_Stair_Stair_collider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../default/Stair/Stair.collider.js */ "../../DSLIBS/dvePlugIns/Physics/dist/Colliders/default/Stair/Stair.collider.js");
/* harmony import */ var _default_Box_ClimableBox_collider_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../default/Box/ClimableBox.collider.js */ "../../DSLIBS/dvePlugIns/Physics/dist/Colliders/default/Box/ClimableBox.collider.js");
//default colliders



function RegisterDefaultColliders(colliders) {
    colliders.registerCollider([new _default_Box_Box_collider_js__WEBPACK_IMPORTED_MODULE_0__.BoxCollider(), new _default_Stair_Stair_collider_js__WEBPACK_IMPORTED_MODULE_1__.StairCollider(), new _default_Box_ClimableBox_collider_js__WEBPACK_IMPORTED_MODULE_2__.ClimableBoxCollider()]);
}


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Physics/dist/Colliders/default/Box/Box.collider.js":
/*!**********************************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Physics/dist/Colliders/default/Box/Box.collider.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BoxCollider": () => (/* binding */ BoxCollider)
/* harmony export */ });
/* harmony import */ var _Classes_Collider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Classes/Collider.js */ "../../DSLIBS/dvePlugIns/Physics/dist/Classes/Collider.js");

class BoxCollider extends _Classes_Collider_js__WEBPACK_IMPORTED_MODULE_0__.Collider {
    id = "#dve_box";
    isSolid = true;
    flags = {};
    constructor() {
        super();
        this.addNode("main", _Classes_Collider_js__WEBPACK_IMPORTED_MODULE_0__.Collider.createBBox());
    }
    getNodes(dataTool) {
        this.nodes[0].position.set(dataTool.x, dataTool.y, dataTool.z);
        return this.nodes;
    }
}


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Physics/dist/Colliders/default/Box/ClimableBox.collider.js":
/*!******************************************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Physics/dist/Colliders/default/Box/ClimableBox.collider.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClimableBoxCollider": () => (/* binding */ ClimableBoxCollider)
/* harmony export */ });
/* harmony import */ var _Classes_Collider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Classes/Collider.js */ "../../DSLIBS/dvePlugIns/Physics/dist/Classes/Collider.js");
/* harmony import */ var _Constants_Flags_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Constants/Flags.js */ "../../DSLIBS/dvePlugIns/Physics/dist/Constants/Flags.js");


class ClimableBoxCollider extends _Classes_Collider_js__WEBPACK_IMPORTED_MODULE_0__.Collider {
    id = "#dve_climable_box";
    isSolid = false;
    flags = {
        [_Constants_Flags_js__WEBPACK_IMPORTED_MODULE_1__.DVPFlags.climbable]: 1
    };
    constructor() {
        super();
        this.addNode("main", _Classes_Collider_js__WEBPACK_IMPORTED_MODULE_0__.Collider.createBBox());
    }
    getNodes(dataTool) {
        this.nodes[0].position.set(dataTool.x, dataTool.y, dataTool.z);
        return this.nodes;
    }
}


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Physics/dist/Colliders/default/Stair/Stair.collider.js":
/*!**************************************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Physics/dist/Colliders/default/Stair/Stair.collider.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StairCollider": () => (/* binding */ StairCollider)
/* harmony export */ });
/* harmony import */ var _Classes_Collider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Classes/Collider.js */ "../../DSLIBS/dvePlugIns/Physics/dist/Classes/Collider.js");

class StairCollider extends _Classes_Collider_js__WEBPACK_IMPORTED_MODULE_0__.Collider {
    id = "#dve_stair";
    isSolid = true;
    flags = {};
    constructor() {
        super();
        this.addNode("stair-bottom", _Classes_Collider_js__WEBPACK_IMPORTED_MODULE_0__.Collider.createBBox(1, 0.5, 1));
        this.addNode("stair-top", _Classes_Collider_js__WEBPACK_IMPORTED_MODULE_0__.Collider.createBBox(1, 0.5, 0.5));
    }
    getNodes(dataTool) {
        this.nodes[0].position.set(dataTool.x, dataTool.y, dataTool.z);
        this.nodes[1].position.set(dataTool.x, dataTool.y + 0.5, dataTool.z);
        return this.nodes;
    }
}


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Physics/dist/Collisions/CollisionsHandler.js":
/*!****************************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Physics/dist/Collisions/CollisionsHandler.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CollisionsHanlder": () => (/* binding */ CollisionsHanlder)
/* harmony export */ });
/* harmony import */ var divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-voxel-engine/Math/Classes/Vector3.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Vector3.js");
/* harmony import */ var divine_voxel_engine_Math_Classes_Scalar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! divine-voxel-engine/Math/Classes/Scalar.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Scalar.js");
/* harmony import */ var _Classes_CollisionResult_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Classes/CollisionResult.js */ "../../DSLIBS/dvePlugIns/Physics/dist/Classes/CollisionResult.js");
/* harmony import */ var _Classes_Line_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Classes/Line.js */ "../../DSLIBS/dvePlugIns/Physics/dist/Classes/Line.js");
/* harmony import */ var _Classes_Plane_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Classes/Plane.js */ "../../DSLIBS/dvePlugIns/Physics/dist/Classes/Plane.js");





/** # CollisionsHanlder
 * Handles collision handling for physics nodes.
 * ***
 *
 * The swept AABB code was adapted from this article:
 * https://luisreis.net/blog/aabb_collision_handling/
 */
const CollisionsHanlder = {
    get COLLISION_CHECK_POSITION_OFFSET() {
        return 0.001;
    },
    aabb: {
        start: new divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 0),
        delta: new divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 0),
        results: new _Classes_CollisionResult_js__WEBPACK_IMPORTED_MODULE_2__.CollisionResult(),
        line: new _Classes_Line_js__WEBPACK_IMPORTED_MODULE_3__.Line(),
        plane: new _Classes_Plane_js__WEBPACK_IMPORTED_MODULE_4__.Plane(),
        dimensions: new divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 0),
    },
    /** # sweepAABBN
     * Calculates the collision for physics node against a bounding box.
     * @param physicsNodePosition
     * @param boundingBox
     * @param collisionNode
     * @param velocity Delata aka velocity of the physics object
     * @returns
     */
    sweepAABBN(physicsNodePosition, boundingBox, collisionNode, velocity) {
        let mx, my, mz, mhx, mhy, mhz;
        mx = collisionNode.position.x - (physicsNodePosition.x + boundingBox.width);
        my =
            collisionNode.position.y - (physicsNodePosition.y + boundingBox.height);
        mz = collisionNode.position.z - (physicsNodePosition.z + boundingBox.depth);
        mhx = boundingBox.width + collisionNode.boundingBox.width;
        mhy = boundingBox.height + collisionNode.boundingBox.height;
        mhz = boundingBox.depth + collisionNode.boundingBox.depth;
        collisionNode.results.reset();
        let hitDepth;
        const data = collisionNode.results.raw;
        this.aabb.line.update(divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__.Vector3.Zero, velocity);
        hitDepth = this.aabb.plane
            .update(this.aabb.dimensions.set(mx, my, mz), divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__.Vector3.West)
            .lineToPlane(this.aabb.line);
        // X min
        if (hitDepth >= 0 &&
            velocity.x > 0 &&
            hitDepth < data.hitDepth &&
            divine_voxel_engine_Math_Classes_Scalar_js__WEBPACK_IMPORTED_MODULE_1__.Scalar.Between(hitDepth * velocity.y, my, my + mhy) &&
            divine_voxel_engine_Math_Classes_Scalar_js__WEBPACK_IMPORTED_MODULE_1__.Scalar.Between(hitDepth * velocity.z, mz, mz + mhz)) {
            collisionNode.results.update(hitDepth, -1, 0, 0);
        }
        hitDepth = this.aabb.plane
            .update(this.aabb.dimensions.set(mx + mhx, my, mz), divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__.Vector3.East)
            .lineToPlane(this.aabb.line);
        // X max
        if (hitDepth >= 0 &&
            velocity.x < 0 &&
            hitDepth < data.hitDepth &&
            divine_voxel_engine_Math_Classes_Scalar_js__WEBPACK_IMPORTED_MODULE_1__.Scalar.Between(hitDepth * velocity.y, my, my + mhy) &&
            divine_voxel_engine_Math_Classes_Scalar_js__WEBPACK_IMPORTED_MODULE_1__.Scalar.Between(hitDepth * velocity.z, mz, mz + mhz)) {
            collisionNode.results.update(hitDepth, 1, 0, 0);
        }
        // Y min
        hitDepth = this.aabb.plane
            .update(this.aabb.dimensions.set(mx, my, mz), divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__.Vector3.Bottom)
            .lineToPlane(this.aabb.line);
        if (hitDepth >= 0 &&
            velocity.y > 0 &&
            hitDepth < data.hitDepth &&
            divine_voxel_engine_Math_Classes_Scalar_js__WEBPACK_IMPORTED_MODULE_1__.Scalar.Between(hitDepth * velocity.x, mx, mx + mhx) &&
            divine_voxel_engine_Math_Classes_Scalar_js__WEBPACK_IMPORTED_MODULE_1__.Scalar.Between(hitDepth * velocity.z, mz, mz + mhz)) {
            collisionNode.results.update(hitDepth, 0, -1, 0);
        }
        // Y max
        hitDepth = this.aabb.plane
            .update(this.aabb.dimensions.set(mx, my + +mhy, mz), divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__.Vector3.Top)
            .lineToPlane(this.aabb.line);
        if (hitDepth >= 0 &&
            velocity.y < 0 &&
            hitDepth < data.hitDepth &&
            divine_voxel_engine_Math_Classes_Scalar_js__WEBPACK_IMPORTED_MODULE_1__.Scalar.Between(hitDepth * velocity.x, mx, mx + mhx) &&
            divine_voxel_engine_Math_Classes_Scalar_js__WEBPACK_IMPORTED_MODULE_1__.Scalar.Between(hitDepth * velocity.z, mz, mz + mhz)) {
            collisionNode.results.update(hitDepth, 0, 1, 0);
        }
        // Z min
        hitDepth = this.aabb.plane
            .update(this.aabb.dimensions.set(mx, my, mz), divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__.Vector3.South)
            .lineToPlane(this.aabb.line);
        if (hitDepth >= 0 &&
            velocity.z > 0 &&
            hitDepth < data.hitDepth &&
            divine_voxel_engine_Math_Classes_Scalar_js__WEBPACK_IMPORTED_MODULE_1__.Scalar.Between(hitDepth * velocity.x, mx, mx + mhx) &&
            divine_voxel_engine_Math_Classes_Scalar_js__WEBPACK_IMPORTED_MODULE_1__.Scalar.Between(hitDepth * velocity.y, my, my + mhy)) {
            collisionNode.results.update(hitDepth, 0, 0, -1);
        }
        // Z max
        hitDepth = this.aabb.plane
            .update(this.aabb.dimensions.set(mx, my, mz + mhz), divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__.Vector3.South)
            .lineToPlane(this.aabb.line);
        if (hitDepth >= 0 &&
            velocity.z < 0 &&
            hitDepth < data.hitDepth &&
            divine_voxel_engine_Math_Classes_Scalar_js__WEBPACK_IMPORTED_MODULE_1__.Scalar.Between(hitDepth * velocity.x, mx, mx + mhx) &&
            divine_voxel_engine_Math_Classes_Scalar_js__WEBPACK_IMPORTED_MODULE_1__.Scalar.Between(hitDepth * velocity.y, my, my + mhy)) {
            collisionNode.results.update(hitDepth, 0, 0, 1);
        }
        //  node.results.update(h, nx, ny, nz);
        return collisionNode.results.raw;
    },
    between(x, a, b) {
        return x >= a && x <= b;
    },
    processSwpetAABB(node) {
        if (Number.isNaN(node.position.x)) {
            node.position.x = 0;
        }
        if (Number.isNaN(node.position.y)) {
            node.position.y = 0;
        }
        if (Number.isNaN(node.position.z)) {
            node.position.z = 0;
        }
        node.__previousPosiiton.updateFromVec3(node.position);
        node.applyForces();
        //Notice there is a cycle. We may have to run the algorithm several times until the collision is resolved
        while (true) {
            // First we calculate the movement vector for this frame
            // This is the entity's current position minus its last position.
            // The last position is set at the beggining of each frame.
            this.aabb.delta.x = node.position.x - node.__previousPosiiton.x;
            this.aabb.delta.y = node.position.y - node.__previousPosiiton.y;
            this.aabb.delta.z = node.position.z - node.__previousPosiiton.z;
            node.__delta.updateFromVec3(node.position);
            // These are the bounds of the AABB that may collide with the entity.
            const minX = Math.floor(Math.min(node.position.x, node.__previousPosiiton.x) -
                node.boundingBox.halfWidth);
            const maxX = Math.floor(Math.max(node.position.x, node.__previousPosiiton.x) +
                node.boundingBox.halfWidth);
            const minY = Math.floor(Math.min(node.position.y, node.__previousPosiiton.y) -
                node.boundingBox.halfHeight);
            const maxY = Math.floor(Math.max(node.position.y, node.__previousPosiiton.y) +
                node.boundingBox.halfHeight);
            const minZ = Math.floor(Math.min(node.position.z, node.__previousPosiiton.z) -
                node.boundingBox.halfDepth);
            const maxZ = Math.floor(Math.max(node.position.z, node.__previousPosiiton.z) +
                node.boundingBox.halfDepth);
            this.aabb.results.reset();
            let collisionResults = this.aabb.results.raw;
            // For each voxel that may collide with the entity, find the first that colides with it
            for (let y = minY; y <= maxY; y++) {
                for (let z = minZ; z <= maxZ; z++) {
                    for (let x = minX; x <= maxX; x++) {
                        if (!node.dataTool.loadInAt(x, y, z))
                            continue;
                        const collider = node.dataTool.getColliderObj();
                        if (!collider)
                            continue;
                        const nodes = collider.getNodes(node.dataTool);
                        const collidersLength = nodes.length;
                        for (let i = 0; i < collidersLength; i++) {
                            const colliderNode = nodes[i];
                            // Check swept collision
                            this.aabb.start.x =
                                node.__previousPosiiton.x - node.boundingBox.halfWidth;
                            this.aabb.start.y =
                                node.__previousPosiiton.y - node.boundingBox.halfHeight;
                            this.aabb.start.z =
                                node.__previousPosiiton.z - node.boundingBox.halfDepth;
                            const collisionCheck = this.sweepAABBN(this.aabb.start, node.boundingBox, colliderNode, this.aabb.delta);
                            if (collisionCheck.hitDepth < 1) {
                                node.doCollision(collider, colliderNode, node.dataTool);
                            }
                            //If the voxel will not stop the entity continue
                            if (!node.dataTool.isSolid() || !collider.isSolid)
                                continue;
                            //Check if this collision is closer than the closest so far.
                            if (collisionCheck.hitDepth < collisionResults.hitDepth) {
                                this.aabb.results.loadIn(colliderNode.results);
                            }
                        }
                    }
                }
            }
            // Update the entity's position
            // We move the entity slightly away from the block in order to miss seams.
            node.position.x =
                node.__previousPosiiton.x +
                    collisionResults.hitDepth * this.aabb.delta.x +
                    this.COLLISION_CHECK_POSITION_OFFSET * collisionResults.nx;
            node.position.y =
                node.__previousPosiiton.y +
                    collisionResults.hitDepth * this.aabb.delta.y +
                    this.COLLISION_CHECK_POSITION_OFFSET * collisionResults.ny;
            node.position.z =
                node.__previousPosiiton.z +
                    collisionResults.hitDepth * this.aabb.delta.z +
                    this.COLLISION_CHECK_POSITION_OFFSET * collisionResults.nz;
            // If there was no collision, end the algorithm.
            if (collisionResults.hitDepth == 1)
                break;
            // Wall Sliding
            // c = a - (a.b)/(b.b) b
            // c - slide vector (rejection of a over b)
            // b - normal to the block
            // a - remaining speed (= (1-h)*speed)
            const BdotB = collisionResults.nx * collisionResults.nx +
                collisionResults.ny * collisionResults.ny +
                collisionResults.nz * collisionResults.nz;
            if (BdotB != 0) {
                // Store the current position for the next iteration
                node.__previousPosiiton.updateFromVec3(node.position);
                // Apply Slide
                const AdotB = (1 - collisionResults.hitDepth) *
                    (this.aabb.delta.x * collisionResults.nx +
                        this.aabb.delta.y * collisionResults.ny +
                        this.aabb.delta.z * collisionResults.nz);
                node.position.x +=
                    (1 - collisionResults.hitDepth) * this.aabb.delta.x -
                        (AdotB / BdotB) * collisionResults.nx;
                node.position.y +=
                    (1 - collisionResults.hitDepth) * this.aabb.delta.y -
                        (AdotB / BdotB) * collisionResults.ny;
                node.position.z +=
                    (1 - collisionResults.hitDepth) * this.aabb.delta.z -
                        (AdotB / BdotB) * collisionResults.nz;
            }
            node.delta.set(node.position.x - node.__delta.x, node.position.y - node.__delta.y, node.position.z - node.__delta.z);
        }
    },
};


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Physics/dist/Constants/Flags.js":
/*!***************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Physics/dist/Constants/Flags.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DVPFlags": () => (/* binding */ DVPFlags)
/* harmony export */ });
const DVPFlags = {
    climbable: "#dve_climbable"
};


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Physics/dist/DivineVoxelPhysics.js":
/*!******************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Physics/dist/DivineVoxelPhysics.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DVP": () => (/* binding */ DVP)
/* harmony export */ });
/* harmony import */ var divine_voxel_engine_Math_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-voxel-engine/Math/index.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/index.js");
/* harmony import */ var _Collisions_CollisionsHandler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Collisions/CollisionsHandler.js */ "../../DSLIBS/dvePlugIns/Physics/dist/Collisions/CollisionsHandler.js");
/* harmony import */ var _Colliders_ColliderManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Colliders/ColliderManager.js */ "../../DSLIBS/dvePlugIns/Physics/dist/Colliders/ColliderManager.js");
/* harmony import */ var _Colliders_Functions_RegisterDefaultColliders_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Colliders/Functions/RegisterDefaultColliders.js */ "../../DSLIBS/dvePlugIns/Physics/dist/Colliders/Functions/RegisterDefaultColliders.js");
/* harmony import */ var _Tools_Data_PhysicsDataTool_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Tools/Data/PhysicsDataTool.js */ "../../DSLIBS/dvePlugIns/Physics/dist/Tools/Data/PhysicsDataTool.js");
/* harmony import */ var _Constants_Flags_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Constants/Flags.js */ "../../DSLIBS/dvePlugIns/Physics/dist/Constants/Flags.js");
//objects



//functions



const DVP = {
    math: divine_voxel_engine_Math_index_js__WEBPACK_IMPORTED_MODULE_0__.VoxelMath,
    collisions: _Collisions_CollisionsHandler_js__WEBPACK_IMPORTED_MODULE_1__.CollisionsHanlder,
    colliders: _Colliders_ColliderManager_js__WEBPACK_IMPORTED_MODULE_2__.ColliderManager,
    constants: {
        flags: _Constants_Flags_js__WEBPACK_IMPORTED_MODULE_5__.DVPFlags,
    },
    getDataTool() {
        return new _Tools_Data_PhysicsDataTool_js__WEBPACK_IMPORTED_MODULE_4__.PhysicsDataTool();
    },
};
(0,_Colliders_Functions_RegisterDefaultColliders_js__WEBPACK_IMPORTED_MODULE_3__.RegisterDefaultColliders)(DVP.colliders);


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Physics/dist/Entities/EntityBase.js":
/*!*******************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Physics/dist/Entities/EntityBase.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EntityBase": () => (/* binding */ EntityBase)
/* harmony export */ });
/* harmony import */ var _Nodes_PhysicsNodes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Nodes/PhysicsNodes.js */ "../../DSLIBS/dvePlugIns/Physics/dist/Nodes/PhysicsNodes.js");
/* harmony import */ var _Collisions_CollisionsHandler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Collisions/CollisionsHandler.js */ "../../DSLIBS/dvePlugIns/Physics/dist/Collisions/CollisionsHandler.js");


class EntityBase {
    active = true;
    node = new _Nodes_PhysicsNodes_js__WEBPACK_IMPORTED_MODULE_0__.PhysicsNode();
    update() {
        if (!this.active)
            return;
        this.beforeUpdate();
        _Collisions_CollisionsHandler_js__WEBPACK_IMPORTED_MODULE_1__.CollisionsHanlder.processSwpetAABB(this.node);
        this.afterUpdate();
    }
}


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Physics/dist/Math/EaseAndTween.js":
/*!*****************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Physics/dist/Math/EaseAndTween.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValueEaseAndTween": () => (/* binding */ ValueEaseAndTween)
/* harmony export */ });
class ValueEaseAndTween {
    data;
    //https://spicyyoghurt.com/tools/easing-functions
    static EaseInQuad = (time, start, change, duration) => change * (time /= duration) * time + start;
    static EaseLinear = (time, start, change, duration) => (change * time) / duration + start;
    static EaseOutQuad = (time, start, change, duration) => -change * (time /= duration) * (time - 2) + start;
    static EaseInOutQuad = (time, start, change, duration) => (time /= duration / 2) < 1
        ? (change / 2) * time * time + start
        : (-change / 2) * (--time * (time - 2) - 1) + start;
    static EaseInSine = (time, start, change, duration) => -change * Math.cos((time / duration) * (Math.PI / 2)) + change + start;
    static EaseOutSine = (time, start, change, duration) => change * Math.sin((time / duration) * (Math.PI / 2)) + start;
    static EaseInOutSine = (time, start, change, duration) => (-change / 2) * (Math.cos((Math.PI * time) / duration) - 1) + start;
    static EaseInExpo = (time, start, change, duration) => time == 0
        ? start
        : change * Math.pow(2, 10 * (time / duration - 1)) + start;
    static EaseOutExpo = (time, start, change, duration) => time == duration
        ? start + change
        : change * (-Math.pow(2, (-10 * time) / duration) + 1) + start;
    static EaseInOutExpo = (time, start, change, duration) => {
        if (time == 0)
            return start;
        if (time == duration)
            return start + change;
        if ((time /= duration / 2) < 1)
            return (change / 2) * Math.pow(2, 10 * (time - 1)) + start;
        return (change / 2) * (-Math.pow(2, -10 * --time) + 2) + start;
    };
    static EaseInCirc = (time, start, change, duration) => -change * (Math.sqrt(1 - (time /= duration) * time) - 1) + start;
    static EaseOutCirc = (time, start, change, duration) => change * Math.sqrt(1 - (time = time / duration - 1) * time) + start;
    static EaseInOutCirc = (time, start, change, duration) => (time /= duration / 2) < 1
        ? (-change / 2) * (Math.sqrt(1 - time * time) - 1) + start
        : (change / 2) * (Math.sqrt(1 - (time -= 2) * time) + 1) + start;
    static EaseInCubic = (time, start, change, duration) => change * (time /= duration) * time * time + start;
    static EaseOutCubic = (time, start, change, duration) => change * ((time = time / duration - 1) * time * time + 1) + start;
    static EaseInOutCubic = (time, start, change, duration) => (time /= duration / 2) < 1
        ? (change / 2) * time * time * time + start
        : (change / 2) * ((time -= 2) * time * time + 2) + start;
    static EaseInQuart = (time, start, change, duration) => change * (time /= duration) * time * time * time + start;
    static EaseOutQuart = (time, start, change, duration) => -change * ((time = time / duration - 1) * time * time * time - 1) + start;
    static EaseInOutQuart = (time, start, change, duration) => (time /= duration / 2) < 1
        ? (change / 2) * time * time * time * time + start
        : (-change / 2) * ((time -= 2) * time * time * time - 2) + start;
    static EaseInQuint = (time, start, change, duration) => change * (time /= duration) * time * time * time * time + start;
    static EaseOutQuint = (time, start, change, duration) => change * ((time = time / duration - 1) * time * time * time * time + 1) +
        start;
    static EaseInOutQuint = (time, start, change, duration) => (time /= duration / 2) < 1
        ? (change / 2) * time * time * time * time * time + start
        : (change / 2) * ((time -= 2) * time * time * time * time + 2) + start;
    static EaseInElastic = (time, start, change, duration) => {
        let s = 1.70158;
        let p = 0;
        let a = change;
        if (time == 0)
            return start;
        if ((time /= duration) == 1)
            return start + change;
        if (!p)
            p = duration * 0.3;
        if (a < Math.abs(change)) {
            a = change;
            s = p / 4;
        }
        else
            s = (p / (2 * Math.PI)) * Math.asin(change / a);
        return (-(a *
            Math.pow(2, 10 * (time -= 1)) *
            Math.sin(((time * duration - s) * (2 * Math.PI)) / p)) + start);
    };
    static EaseOutElastic = (time, start, change, duration) => {
        let s = 1.70158;
        let p = 0;
        let a = change;
        if (time == 0)
            return start;
        if ((time /= duration) == 1)
            return start + change;
        if (!p)
            p = duration * 0.3;
        if (a < Math.abs(change)) {
            a = change;
            s = p / 4;
        }
        else
            s = (p / (2 * Math.PI)) * Math.asin(change / a);
        return (a *
            Math.pow(2, -10 * time) *
            Math.sin(((time * duration - s) * (2 * Math.PI)) / p) +
            change +
            start);
    };
    static EaseInOutElastic = (time, start, change, duration) => {
        let s = 1.70158;
        let p = 0;
        let a = change;
        if (time == 0)
            return start;
        if ((time /= duration / 2) == 2)
            return start + change;
        if (!p)
            p = duration * (0.3 * 1.5);
        if (a < Math.abs(change)) {
            a = change;
            s = p / 4;
        }
        else
            s = (p / (2 * Math.PI)) * Math.asin(change / a);
        if (time < 1)
            return (-0.5 *
                (a *
                    Math.pow(2, 10 * (time -= 1)) *
                    Math.sin(((time * duration - s) * (2 * Math.PI)) / p)) +
                start);
        return (a *
            Math.pow(2, -10 * (time -= 1)) *
            Math.sin(((time * duration - s) * (2 * Math.PI)) / p) *
            0.5 +
            change +
            start);
    };
    static s = 1.70158;
    static EaseInBack = (time, start, change, duration) => change *
        (time /= duration) *
        time *
        ((ValueEaseAndTween.s + 1) * time - ValueEaseAndTween.s) +
        start;
    static EaseOutBack = (time, start, change, duration) => change *
        ((time = time / duration - 1) *
            time *
            ((ValueEaseAndTween.s + 1) * time + ValueEaseAndTween.s) +
            1) +
        start;
    static EaseInOutBack = (time, start, change, duration) => (time /= duration / 2) < 1
        ? (change / 2) *
            (time *
                time *
                (((ValueEaseAndTween.s *= 1.525) + 1) * time -
                    ValueEaseAndTween.s)) +
            start
        : (change / 2) *
            ((time -= 2) *
                time *
                (((ValueEaseAndTween.s *= 1.525) + 1) * time +
                    ValueEaseAndTween.s) +
                2) +
            start;
    _count = 0;
    _alive = true;
    _start = 0;
    _change = 0;
    _func;
    constructor(data) {
        this.data = data;
        this._start = data.start;
        this._change = data.end - data.start;
        this._func = this.data.function;
        console.log(this._func);
    }
    update() {
        if (!this._alive)
            return;
        if (this._count >= this.data.max) {
            this._count = 0;
            this.data.onDone();
            return;
        }
        this._count++;
        this.data.onUpdate(this._func(this._count, this._start, this._change, this.data.max));
    }
    setAlive(value) {
        this._alive = value;
        this._count = 0;
    }
    isAlive() {
        return this._alive;
    }
    getInterval(n) {
        return n / this.data.max;
    }
}



/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Physics/dist/Nodes/PhysicsNodes.js":
/*!******************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Physics/dist/Nodes/PhysicsNodes.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PhysicsNode": () => (/* binding */ PhysicsNode)
/* harmony export */ });
/* harmony import */ var divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-voxel-engine/Math/Classes/Vector3.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Vector3.js");
/* harmony import */ var _Tools_Data_PhysicsDataTool_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Tools/Data/PhysicsDataTool.js */ "../../DSLIBS/dvePlugIns/Physics/dist/Tools/Data/PhysicsDataTool.js");
/* harmony import */ var _Classes_BoundingBox_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Classes/BoundingBox.js */ "../../DSLIBS/dvePlugIns/Physics/dist/Classes/BoundingBox.js");
/* harmony import */ var _Tools_Data_PhysicsProbe_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Tools/Data/PhysicsProbe.js */ "../../DSLIBS/dvePlugIns/Physics/dist/Tools/Data/PhysicsProbe.js");




/**# Physics Node
 * Holds the most basic information for a physics based object.
 *
 */
class PhysicsNode {
    __previousPosiiton = new divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 0);
    __delta = new divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 0);
    acceleration = new divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__.Vector3(1, 1, 1);
    velocity = new divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 0);
    position = new divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 0);
    direction = new divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 0);
    delta = new divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 0);
    boundingBox = new _Classes_BoundingBox_js__WEBPACK_IMPORTED_MODULE_2__.BoundingBox();
    probe = new _Tools_Data_PhysicsProbe_js__WEBPACK_IMPORTED_MODULE_3__.PhysicsProbe();
    dataTool = new _Tools_Data_PhysicsDataTool_js__WEBPACK_IMPORTED_MODULE_1__.PhysicsDataTool();
    doCollision;
    setCollisionHanlder(handler) {
        this.doCollision = handler;
    }
    setLocation(location) {
        this.dataTool.setLocation(location);
        this.position.x = location[1];
        this.position.y = location[2];
        this.position.z = location[3];
    }
    setPosition(x, y, z) {
        this.position.set(x, y, z);
    }
    syncPosition(position) {
        position.x = this.position.x;
        position.y = this.position.y;
        position.z = this.position.z;
    }
    applyForces() {
        this.position.x = this.position.x + this.acceleration.x * this.velocity.x;
        this.position.y = this.position.y + this.acceleration.y * this.velocity.y;
        this.position.z = this.position.z + this.acceleration.z * this.velocity.z;
    }
    calculateFinalDirection(forwardDirection, sideDirection) {
        //reset direction
        this.direction.scaleXYZ(0);
        //get forward direction from where the player is looking
        forwardDirection.normalize();
        //get side direction from where the player is looking
        sideDirection.normalize();
        //apply any changes on the direction vector based on player's state
        //finally add, nomalize, then scale
        this.direction.addFromVec3(forwardDirection);
        this.direction.addFromVec3(sideDirection);
        if (!this.direction.isZero()) {
            this.direction.normalize();
        }
    }
}


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Physics/dist/Tools/Data/PhysicsDataTool.js":
/*!**************************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Physics/dist/Tools/Data/PhysicsDataTool.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PhysicsDataTool": () => (/* binding */ PhysicsDataTool)
/* harmony export */ });
/* harmony import */ var _DivineVoxelPhysics_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../DivineVoxelPhysics.js */ "../../DSLIBS/dvePlugIns/Physics/dist/DivineVoxelPhysics.js");
/* harmony import */ var divine_voxel_engine_Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! divine-voxel-engine/Tools/Data/DataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/DataTool.js");


class PhysicsDataTool extends divine_voxel_engine_Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_1__.DataTool {
    getColliderObj() {
        if (!this.checkCollisions())
            return false;
        let collider = this.getCollider();
        return _DivineVoxelPhysics_js__WEBPACK_IMPORTED_MODULE_0__.DVP.colliders.getCollider(collider != "none" ? collider : "Box");
    }
    isSolid() {
        return !this.isAir() && this.getSubstance() != "#dve_liquid";
    }
}


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Physics/dist/Tools/Data/PhysicsProbe.js":
/*!***********************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Physics/dist/Tools/Data/PhysicsProbe.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PhysicsProbe": () => (/* binding */ PhysicsProbe)
/* harmony export */ });
/* harmony import */ var divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-voxel-engine/Math/Classes/Vector3.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Vector3.js");

class PhysicsProbe {
    voxels = {
        _position: new divine_voxel_engine_Math_Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 0),
        *queryWithNode(node) {
            this._position.updateFromVec3(node.position);
            node.boundingBox.setPosition(node.position);
            for (const [x, y, z] of node.boundingBox.query()) {
                if (!node.dataTool.loadInAt(x, y, z))
                    continue;
                if (node.dataTool.isAir())
                    continue;
                const collider = node.dataTool.getColliderObj();
                if (!collider)
                    continue;
                const nodes = collider.getNodes(node.dataTool);
                for (const colliderNode of nodes) {
                    colliderNode.boundingBox.setPosition(this._position.set(x, y, z));
                    if (node.boundingBox.doesIntersect(colliderNode.boundingBox)) {
                        yield [x, y, z];
                        break;
                    }
                }
            }
        },
        *queryWithNodeAtPosition(position, node) {
            this._position.updateFromVec3(position);
            node.boundingBox.setPosition(position);
            for (const [x, y, z] of node.boundingBox.query()) {
                if (!node.dataTool.loadInAt(x, y, z))
                    continue;
                if (node.dataTool.isAir())
                    continue;
                const collider = node.dataTool.getColliderObj();
                if (!collider)
                    continue;
                const nodes = collider.getNodes(node.dataTool);
                for (const colliderNode of nodes) {
                    colliderNode.boundingBox.setPosition(this._position.set(x, y, z));
                    if (node.boundingBox.doesIntersect(colliderNode.boundingBox)) {
                        yield [x, y, z];
                        break;
                    }
                }
            }
        },
    };
}


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Physics/dist/index.js":
/*!*****************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Physics/dist/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DVP": () => (/* reexport safe */ _DivineVoxelPhysics_js__WEBPACK_IMPORTED_MODULE_0__.DVP),
/* harmony export */   "EntityBase": () => (/* reexport safe */ _Entities_EntityBase_js__WEBPACK_IMPORTED_MODULE_1__.EntityBase)
/* harmony export */ });
/* harmony import */ var _DivineVoxelPhysics_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DivineVoxelPhysics.js */ "../../DSLIBS/dvePlugIns/Physics/dist/DivineVoxelPhysics.js");
/* harmony import */ var _Entities_EntityBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Entities/EntityBase.js */ "../../DSLIBS/dvePlugIns/Physics/dist/Entities/EntityBase.js");




/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Player/dist/Nexus/InitNexusPlayer.js":
/*!********************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Player/dist/Nexus/InitNexusPlayer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "INIT_NEXUS_PLAYER": () => (/* binding */ INIT_NEXUS_PLAYER)
/* harmony export */ });
/* harmony import */ var _Data_PlayerManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Data/PlayerManager.js */ "../../DSLIBS/dvePlugIns/Player/dist/Data/PlayerManager.js");
/* harmony import */ var _Data_PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Data/PlayerPhysicsData.js */ "../../DSLIBS/dvePlugIns/Player/dist/Data/PlayerPhysicsData.js");
/* harmony import */ var _Data_PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Data/PlayerStatsData.js */ "../../DSLIBS/dvePlugIns/Player/dist/Data/PlayerStatsData.js");
/* harmony import */ var _Data_RegisterPlayerData_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Data/RegisterPlayerData.js */ "../../DSLIBS/dvePlugIns/Player/dist/Data/RegisterPlayerData.js");
/* harmony import */ var _NexusPlayer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NexusPlayer.js */ "../../DSLIBS/dvePlugIns/Player/dist/Nexus/NexusPlayer.js");





async function SetUpPlayerData(DVEN) {
    const { playerPhysicsTagManager, playerStatesTagManger } = (0,_Data_RegisterPlayerData_js__WEBPACK_IMPORTED_MODULE_3__.$RegisterPlayerData)();
    const physicsRemoteData = playerPhysicsTagManager.initData;
    const playePhysicsrDataSAB = new SharedArrayBuffer(physicsRemoteData.bufferSize);
    playerPhysicsTagManager.setBuffer(playePhysicsrDataSAB);
    _Data_PlayerManager_js__WEBPACK_IMPORTED_MODULE_0__.PlayerManager.physics = new _Data_PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsData(playePhysicsrDataSAB, physicsRemoteData);
    const statsRemoteData = playerStatesTagManger.initData;
    const playeStatsDataSAB = new SharedArrayBuffer(physicsRemoteData.bufferSize);
    playerPhysicsTagManager.setBuffer(playePhysicsrDataSAB);
    _Data_PlayerManager_js__WEBPACK_IMPORTED_MODULE_0__.PlayerManager.stats = new _Data_PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatsData(playeStatsDataSAB, statsRemoteData);
    await DVEN.parentComm.waitTillTasksExist("connect-player-tags");
    DVEN.parentComm.runTasks("connect-player-tags", [
        playePhysicsrDataSAB,
        physicsRemoteData,
        playeStatsDataSAB,
        statsRemoteData,
    ]);
    await DVEN.worldComm.waitTillTasksExist("connect-player-tags");
    DVEN.worldComm.runTasks("connect-player-tags", [
        playePhysicsrDataSAB,
        physicsRemoteData,
        playeStatsDataSAB,
        statsRemoteData,
    ]);
}
const INIT_NEXUS_PLAYER = async (DVEN) => {
    await SetUpPlayerData(DVEN);
    const player = new _NexusPlayer_js__WEBPACK_IMPORTED_MODULE_4__.NexusPlayer(_Data_PlayerManager_js__WEBPACK_IMPORTED_MODULE_0__.PlayerManager.physics, _Data_PlayerManager_js__WEBPACK_IMPORTED_MODULE_0__.PlayerManager.stats);
    return player;
};


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Player/dist/Nexus/NexusPlayer.js":
/*!****************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Player/dist/Nexus/NexusPlayer.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NexusPlayer": () => (/* binding */ NexusPlayer)
/* harmony export */ });
/* harmony import */ var dve_plugins_physics_Entities_EntityBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dve-plugins-physics/Entities/EntityBase.js */ "../../DSLIBS/dvePlugIns/Physics/dist/Entities/EntityBase.js");
/* harmony import */ var divine_voxel_engine_Math_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! divine-voxel-engine/Math/index.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/index.js");
/* harmony import */ var _Data_PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Data/PlayerPhysicsData.js */ "../../DSLIBS/dvePlugIns/Player/dist/Data/PlayerPhysicsData.js");
/* harmony import */ var dve_plugins_physics_Math_EaseAndTween_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dve-plugins-physics/Math/EaseAndTween.js */ "../../DSLIBS/dvePlugIns/Physics/dist/Math/EaseAndTween.js");
/* harmony import */ var dve_plugins_physics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dve-plugins-physics */ "../../DSLIBS/dvePlugIns/Physics/dist/index.js");





console.log(dve_plugins_physics_Math_EaseAndTween_js__WEBPACK_IMPORTED_MODULE_3__.ValueEaseAndTween);
class NexusPlayer extends dve_plugins_physics_Entities_EntityBase_js__WEBPACK_IMPORTED_MODULE_0__.EntityBase {
    physics;
    stats;
    states = {
        cilmbingStair: false,
        inWater: false,
        onLadder: false,
        gravity: -0.1,
        jumping: false,
        canJump: true,
        jumpVelocity: 0.15,
        onGround: false,
        climbing: false,
    };
    get position() {
        return this.node.position;
    }
    materialStandingOn = "none";
    sideDirection = new divine_voxel_engine_Math_index_js__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0);
    forwardDirection = new divine_voxel_engine_Math_index_js__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0);
    speed = 0.04;
    runSpeed = 0.03;
    tweens = {
        jump: new dve_plugins_physics_Math_EaseAndTween_js__WEBPACK_IMPORTED_MODULE_3__.ValueEaseAndTween({
            start: 0,
            end: 1,
            max: 20,
            function: dve_plugins_physics_Math_EaseAndTween_js__WEBPACK_IMPORTED_MODULE_3__.ValueEaseAndTween.EaseInQuad,
            onUpdate: (percent) => {
                this.node.acceleration.y = 1 - percent;
            },
            onDone: () => {
                this.node.acceleration.y = 0;
                this.states.jumping = false;
            },
        }),
        fall: new dve_plugins_physics_Math_EaseAndTween_js__WEBPACK_IMPORTED_MODULE_3__.ValueEaseAndTween({
            start: 0,
            end: 1.5,
            max: 20,
            function: dve_plugins_physics_Math_EaseAndTween_js__WEBPACK_IMPORTED_MODULE_3__.ValueEaseAndTween.EaseInQuad,
            onUpdate: (percent) => {
                this.node.acceleration.y = percent;
            },
            onDone: () => {
                this.node.acceleration.y = 1.5;
                this.tweens.fall.setAlive(false);
            },
        }),
        walk: new dve_plugins_physics_Math_EaseAndTween_js__WEBPACK_IMPORTED_MODULE_3__.ValueEaseAndTween({
            start: 0,
            end: 1,
            max: 20,
            function: dve_plugins_physics_Math_EaseAndTween_js__WEBPACK_IMPORTED_MODULE_3__.ValueEaseAndTween.EaseOutQuad,
            onUpdate: (percent) => {
                this.node.acceleration.x = percent;
                this.node.acceleration.z = percent;
            },
            onDone: () => {
                this.node.acceleration.x = 1;
                this.node.acceleration.z = 1;
                this.tweens.walk.setAlive(false);
            },
        }),
        stop: new dve_plugins_physics_Math_EaseAndTween_js__WEBPACK_IMPORTED_MODULE_3__.ValueEaseAndTween({
            start: 0,
            end: 1,
            max: 20,
            function: dve_plugins_physics_Math_EaseAndTween_js__WEBPACK_IMPORTED_MODULE_3__.ValueEaseAndTween.EaseOutQuad,
            onUpdate: (percent) => {
                this.node.acceleration.x = 1 - percent;
                this.node.acceleration.z = 1 - percent;
            },
            onDone: () => {
                this.node.acceleration.x = 0;
                this.node.acceleration.z = 0;
                this.tweens.stop.setAlive(false);
            },
        }),
    };
    constructor(physics, stats) {
        super();
        this.physics = physics;
        this.stats = stats;
        this.node.boundingBox.update(0.8, 1, 0.8);
        this.node.setCollisionHanlder((collider, collisionNode, dataTool) => {
            if (collisionNode.results.faceHit.top() && collider.isSolid) {
                this.states.onGround = true;
                this.materialStandingOn = dataTool.getMaterial();
            }
            if ((collider.id == "stair-bottom" || collider.id == "stair-top") &&
                collisionNode.results.collided()) {
                if (collisionNode.faceHit.north()) {
                    this.states.cilmbingStair = true;
                    return;
                }
                if (collisionNode.faceHit.top()) {
                    this.states.cilmbingStair = false;
                    return;
                }
            }
            this.states.cilmbingStair = false;
        });
    }
    _lastVelocity = new divine_voxel_engine_Math_index_js__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0);
    controlsUpdate() {
        this.forwardDirection.set(this.physics.direction.x, 0, this.physics.direction.z);
        this.sideDirection.set(this.physics.sideDirection.x, 0, this.physics.sideDirection.z);
        if (this.physics.states.movement == _Data_PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerPhysicsStatesValues.walkingBackward) {
            this.forwardDirection.scaleXYZ(-1);
        }
        if (this.physics.states.movement == _Data_PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerPhysicsStatesValues.still) {
            this.forwardDirection.scaleXYZ(0);
        }
        if (this.physics.states.secondaryMovement ==
            _Data_PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerPhysicsStatesValues.walkingRight) {
            this.sideDirection.scaleXYZ(-1);
        }
        if (this.physics.states.secondaryMovement ==
            _Data_PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerPhysicsStatesValues.secondaryStill) {
            this.sideDirection.scaleXYZ(0);
        }
        this.node.calculateFinalDirection(this.forwardDirection, this.sideDirection);
        this.node.velocity.set(this.node.direction.x * this.getSpeed(), this.node.velocity.y, this.node.direction.z * this.getSpeed());
        //set the player's velcoity based on their state
        if (this.physics.states.movement != _Data_PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerPhysicsStatesValues.still ||
            this.physics.states.secondaryMovement !=
                _Data_PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerPhysicsStatesValues.secondaryStill) {
            this._lastVelocity.updateFromVec3(this.node.velocity);
            this.tweens.stop.data.max = this.physics.states.running ? 50 : 20;
            this.tweens.stop.setAlive(true);
            this.tweens.walk.update();
        }
        if (this.physics.states.movement == _Data_PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerPhysicsStatesValues.still &&
            this.physics.states.secondaryMovement ==
                _Data_PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerPhysicsStatesValues.secondaryStill) {
            this.tweens.walk.setAlive(true);
            this.tweens.stop.update();
            if (!this.tweens.stop.isAlive()) {
                this.node.velocity.x = 0;
                this.node.velocity.z = 0;
            }
            else {
                this.node.velocity.set(this._lastVelocity.x, this.node.velocity.y, this._lastVelocity.z);
            }
        }
        if (this.states.onGround) {
            this.tweens.fall.setAlive(true);
        }
        //player jump
        if (this.physics.states.jumping &&
            !this.states.jumping &&
            (this.states.onGround || this.states.inWater || this.states.climbing)) {
            this.states.jumping = true;
            this.node.velocity.y =
                this.states.jumpVelocity + this.stats.jumpPower / 1000;
            this.node.acceleration.y = 0;
            this.physics.states.jumping = 0;
        }
        if (this.states.jumping) {
            this.tweens.jump.update();
        }
        if ((this.states.inWater || this.states.climbing) && !this.states.jumping) {
            this.node.acceleration.y = 1;
            if (this.node.acceleration.y > 2)
                this.node.acceleration.y = 2;
            this.node.velocity.y = this.states.gravity;
            this.node.velocity.y -= 0.0025;
            if (this.node.velocity.y < -0.01) {
                this.node.velocity.y = -0.01;
            }
        }
        if (!this.states.onGround && !this.states.jumping && !this.states.inWater) {
            this.tweens.fall.update();
            this.node.velocity.y = this.states.gravity;
            if (!this.tweens.fall.isAlive())
                this.node.acceleration.y += 0.1;
            if (this.node.acceleration.y > 3)
                this.node.acceleration.y = 3;
        }
    }
    getSpeed() {
        return (this.physics.states.running * this.runSpeed +
            //for every level of speed add a tenth of the player's base speed
            (this.speed + this.stats.speed * this.speed * 0.1));
    }
    beforeUpdate() {
        this.states.inWater = false;
        this.states.climbing = false;
        for (const [x, y, z] of this.node.probe.voxels.queryWithNode(this.node)) {
            if (this.node.dataTool.loadInAt(x >> 0, y >> 0, z >> 0)) {
                if (this.node.dataTool.getSubstance() == "#dve_liquid") {
                    this.states.inWater = true;
                }
                const collider = this.node.dataTool.getColliderObj();
                if (collider && collider.hasFlag(dve_plugins_physics__WEBPACK_IMPORTED_MODULE_4__.DVP.constants.flags.climbable)) {
                    console.log("climb");
                    this.states.climbing = true;
                }
            }
        }
        this.controlsUpdate();
        if (this.states.cilmbingStair) {
            this.node.velocity.set(0, 1, -1.5);
            this.node.velocity.scaleXYZ(this.getSpeed());
        }
        this.states.cilmbingStair = false;
        this.states.onGround = false;
    }
    afterUpdate() {
        this.node.syncPosition(this.physics.position);
        this.physics.states.onGround =
            this.node.velocity.y == this.states.gravity && !this.states.inWater;
        this.physics.states.inWater = this.states.inWater;
    }
}


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Player/dist/Nexus/index.js":
/*!**********************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Player/dist/Nexus/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "INIT_NEXUS_PLAYER": () => (/* reexport safe */ _InitNexusPlayer_js__WEBPACK_IMPORTED_MODULE_0__.INIT_NEXUS_PLAYER),
/* harmony export */   "NexusPlayer": () => (/* reexport safe */ _NexusPlayer_js__WEBPACK_IMPORTED_MODULE_1__.NexusPlayer)
/* harmony export */ });
/* harmony import */ var _InitNexusPlayer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InitNexusPlayer.js */ "../../DSLIBS/dvePlugIns/Player/dist/Nexus/InitNexusPlayer.js");
/* harmony import */ var _NexusPlayer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NexusPlayer.js */ "../../DSLIBS/dvePlugIns/Player/dist/Nexus/NexusPlayer.js");




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["DSLIBS_divineBinaryObject_dist_index_js-DSLIBS_divineVoxelEngine_dist_Common_Threads_Contract-5324f4","DSLIBS_divineVoxelEngine_dist_Math_index_js-DSLIBS_divineVoxelEngine_dist_Tools_Data_RichData-f07748","DSLIBS_dvePlugIns_Player_dist_Data_PlayerManager_js-DSLIBS_dvePlugIns_Player_dist_Data_Regist-d31b5c"], () => (__webpack_require__("./compiled/client/Nexus/nexus.js")))
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && !queue.d) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = 1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".DVE.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/importScripts chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "already loaded"
/******/ 		var installedChunks = {
/******/ 			"compiled_client_Nexus_nexus_js": 1
/******/ 		};
/******/ 		
/******/ 		// importScripts chunk loading
/******/ 		var installChunk = (data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			while(chunkIds.length)
/******/ 				installedChunks[chunkIds.pop()] = 1;
/******/ 			parentChunkLoadingFunction(data);
/******/ 		};
/******/ 		__webpack_require__.f.i = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					importScripts(__webpack_require__.p + __webpack_require__.u(chunkId));
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkdve_testing"] = self["webpackChunkdve_testing"] || [];
/******/ 		var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
/******/ 		chunkLoadingGlobal.push = installChunk;
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	(() => {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			return Promise.all(["DSLIBS_divineBinaryObject_dist_index_js-DSLIBS_divineVoxelEngine_dist_Common_Threads_Contract-5324f4","DSLIBS_divineVoxelEngine_dist_Math_index_js-DSLIBS_divineVoxelEngine_dist_Tools_Data_RichData-f07748","DSLIBS_dvePlugIns_Player_dist_Data_PlayerManager_js-DSLIBS_dvePlugIns_Player_dist_Data_Regist-d31b5c"].map(__webpack_require__.e, __webpack_require__)).then(next);
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;
//# sourceMappingURL=compiled_client_Nexus_nexus_js.DVE.js.map