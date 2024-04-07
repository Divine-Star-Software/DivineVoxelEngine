/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./compiled/client/RichWorld/richworld.js":
/*!************************************************!*\
  !*** ./compiled/client/RichWorld/richworld.js ***!
  \************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var divine_voxel_engine_RichWorld__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-voxel-engine/RichWorld */ "../../DSLIBS/divineVoxelEngine/dist/RichWorld/index.js");

await divine_voxel_engine_RichWorld__WEBPACK_IMPORTED_MODULE_0__.DVERW.$INIT();

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

/***/ "../../DSLIBS/divineVoxelEngine/dist/RichWorld/DivineStarVoxelEngineRichWorld.js":
/*!***************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/RichWorld/DivineStarVoxelEngineRichWorld.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DVERW": () => (/* binding */ DVERW)
/* harmony export */ });
/* harmony import */ var _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Data/Settings/EngineSettings.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Settings/EngineSettings.js");
/* harmony import */ var _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Global/Util.helper.js */ "../../DSLIBS/divineVoxelEngine/dist/Global/Util.helper.js");
/* harmony import */ var _Data_DataSyncNode_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Data/DataSyncNode.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/DataSyncNode.js");
/* harmony import */ var _Data_DataManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Data/DataManager.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/DataManager.js");
/* harmony import */ var _Data_World_WorldBounds_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Data/World/WorldBounds.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldBounds.js");
/* harmony import */ var _Threads_RichWorldThreads_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Threads/RichWorldThreads.js */ "../../DSLIBS/divineVoxelEngine/dist/RichWorld/Threads/RichWorldThreads.js");
/* harmony import */ var _Init_InitWorker_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Init/InitWorker.js */ "../../DSLIBS/divineVoxelEngine/dist/RichWorld/Init/InitWorker.js");
/* harmony import */ var _Register_RichDataRegister_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Register/RichDataRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/RichWorld/Register/RichDataRegister.js");
/* harmony import */ var _World_Data_Managers_DataManagers_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../World/Data/Managers/DataManagers.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Managers/DataManagers.js");
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");
/* harmony import */ var _Tasks_RichWorldTasks_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Tasks/RichWorldTasks.js */ "../../DSLIBS/divineVoxelEngine/dist/RichWorld/Tasks/RichWorldTasks.js");
/* harmony import */ var _Tools_RichDataTool_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Tools/RichDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/RichWorld/Tools/RichDataTool.js");
/* harmony import */ var _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../Tools/Data/DataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/DataTool.js");
//objects


//import { RichWorldTasks } from "./Tasks/Tasks.js";
//data



//threads

//functions







const DVERW = {
    environment: "browser",
    __settingsHaveBeenSynced: false,
    tasks: _Tasks_RichWorldTasks_js__WEBPACK_IMPORTED_MODULE_10__.RichWorldTasks,
    TC: threadcomm__WEBPACK_IMPORTED_MODULE_9__.ThreadComm,
    worldBounds: _Data_World_WorldBounds_js__WEBPACK_IMPORTED_MODULE_4__.WorldBounds,
    UTIL: _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_1__.Util,
    settings: _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_0__.EngineSettings,
    worldComm: _Threads_RichWorldThreads_js__WEBPACK_IMPORTED_MODULE_5__.WorldComm,
    parentComm: _Threads_RichWorldThreads_js__WEBPACK_IMPORTED_MODULE_5__.ParentComm,
    nexusComm: _Threads_RichWorldThreads_js__WEBPACK_IMPORTED_MODULE_5__.NexusComm,
    constructorComm: _Threads_RichWorldThreads_js__WEBPACK_IMPORTED_MODULE_5__.ConstructorComm,
    fxComm: _Threads_RichWorldThreads_js__WEBPACK_IMPORTED_MODULE_5__.FXComm,
    dataComm: _Threads_RichWorldThreads_js__WEBPACK_IMPORTED_MODULE_5__.DataComm,
    richData: _Register_RichDataRegister_js__WEBPACK_IMPORTED_MODULE_7__.RichDataRegister,
    dataSyncNode: _Data_DataSyncNode_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncNode,
    data: _Data_DataManager_js__WEBPACK_IMPORTED_MODULE_3__.DataManager,
    voxelManager: _World_Data_Managers_DataManagers_js__WEBPACK_IMPORTED_MODULE_8__.VoxelManager,
    async $INIT() {
        await (0,_Init_InitWorker_js__WEBPACK_IMPORTED_MODULE_6__.InitWorker)(this);
    },
    getRichDataTool() {
        return new _Tools_RichDataTool_js__WEBPACK_IMPORTED_MODULE_11__.RichDataTool();
    },
    getDataTool() {
        return new _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_12__.DataTool();
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/RichWorld/Init/InitWorker.js":
/*!************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/RichWorld/Init/InitWorker.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InitWorker": () => (/* binding */ InitWorker)
/* harmony export */ });
/* harmony import */ var _Threads_RichWorldThreadState_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Threads/RichWorldThreadState.js */ "../../DSLIBS/divineVoxelEngine/dist/RichWorld/Threads/RichWorldThreadState.js");
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");


async function InitWorker(DVERW) {
    let parent = "render";
    if (DVERW.environment == "node") {
        parent = "server";
    }
    await threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.$INIT("rich-world", parent);
    await DVERW.UTIL.createPromiseCheck({
        check: () => {
            return _Threads_RichWorldThreadState_js__WEBPACK_IMPORTED_MODULE_0__.RichWorldThreadState.isReady();
        },
        checkInterval: 1,
    });
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/RichWorld/Register/RichDataRegister.js":
/*!**********************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/RichWorld/Register/RichDataRegister.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RichDataRegister": () => (/* binding */ RichDataRegister)
/* harmony export */ });
/* harmony import */ var _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Data/World/WorldSpaces.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldSpaces.js");

const RichDataRegister = {
    _dimensions: new Map([["main", new Map()]]),
    releaeeAll() {
        this._dimensions.clear();
        this._dimensions = new Map([["main", new Map()]]);
    },
    dimensions: {
        get(dimensionId) {
            const dimension = RichDataRegister._dimensions.get(dimensionId);
            if (!dimension)
                return false;
            return dimension;
        },
        add(dimensionId) {
            const newdimension = new Map();
            RichDataRegister._dimensions.set(dimensionId, newdimension);
            return newdimension;
        },
    },
    region: {
        _getRegionData() {
            return {
                columns: new Map(),
            };
        },
        add(location) {
            let dimension = RichDataRegister.dimensions.get(location[0]);
            if (!dimension) {
                dimension = RichDataRegister.dimensions.add(location[0]);
            }
            const region = this._getRegionData();
            dimension.set(_Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_0__.WorldSpaces.region.getKeyLocation(location), region);
            return region;
        },
        get(location) {
            const dimension = RichDataRegister.dimensions.get(location[0]);
            if (!dimension)
                return false;
            const region = dimension.get(_Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_0__.WorldSpaces.region.getKeyLocation(location));
            if (!region)
                return false;
            return region;
        },
        remove(location) {
            const dimension = RichDataRegister.dimensions.get(location[0]);
            if (!dimension)
                return false;
            const key = _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_0__.WorldSpaces.region.getKeyLocation(location);
            const region = dimension.get(key);
            if (!region)
                return false;
            dimension.delete(key);
            return region;
        },
    },
    column: {
        _getColumnData() {
            return {
                data: {
                    voxels: {},
                },
            };
        },
        add(location) {
            let region = RichDataRegister.region.get(location);
            if (!region) {
                region = RichDataRegister.region.add(location);
            }
            const column = this._getColumnData();
            region.columns.set(_Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_0__.WorldSpaces.column.getKeyLocation(location), column);
            return column;
        },
        get(location) {
            const region = RichDataRegister.region.get(location);
            if (!region)
                return false;
            const column = region.columns.get(_Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_0__.WorldSpaces.column.getKeyLocation(location));
            if (!column)
                return false;
            return column;
        },
        update(location, data) {
            const region = RichDataRegister.region.get(location);
            if (!region)
                return false;
            const column = region.columns.get(_Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_0__.WorldSpaces.column.getKeyLocation(location));
            if (!column)
                return false;
            column.data = data;
        },
        remove(location) {
            const region = RichDataRegister.region.get(location);
            if (!region)
                return false;
            const key = _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_0__.WorldSpaces.column.getKeyLocation(location);
            const column = region.columns.get(key);
            if (!column)
                return false;
            region.columns.delete(key);
            if (region.columns.size == 0) {
                RichDataRegister.region.remove(location);
            }
            return column;
        },
    },
    getKey(location) {
        return `${_Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_0__.WorldSpaces.chunk.getKeyLocation(location)}_${_Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_0__.WorldSpaces.voxel.getKeyLocation(location)}`;
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/RichWorld/Tasks/RichWorldTasks.js":
/*!*****************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/RichWorld/Tasks/RichWorldTasks.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RichWorldTasks": () => (/* binding */ RichWorldTasks)
/* harmony export */ });
/* harmony import */ var divine_binary_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-binary-object */ "../../DSLIBS/divineBinaryObject/dist/index.js");
/* harmony import */ var _Register_RichDataRegister_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Register/RichDataRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/RichWorld/Register/RichDataRegister.js");
/* harmony import */ var _Tools_RichColumnDataTool_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Tools/RichColumnDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/RichWorld/Tools/RichColumnDataTool.js");
/* harmony import */ var _Tools_RichDataTool_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Tools/RichDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/RichWorld/Tools/RichDataTool.js");
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");





const richTool = new _Tools_RichDataTool_js__WEBPACK_IMPORTED_MODULE_3__.RichDataTool();
const richColumnTool = new _Tools_RichColumnDataTool_js__WEBPACK_IMPORTED_MODULE_2__.RichColumnDataTool();
const RichWorldTasks = {
    hasData: threadcomm__WEBPACK_IMPORTED_MODULE_4__.ThreadComm.registerTasks("has-data", (location, onDone) => {
        if (onDone)
            onDone(Boolean(_Register_RichDataRegister_js__WEBPACK_IMPORTED_MODULE_1__.RichDataRegister.column.get(location)));
    }, "deferred"),
    getData: threadcomm__WEBPACK_IMPORTED_MODULE_4__.ThreadComm.registerTasks("get-data", ([location, segment], onDone) => {
        if (!onDone)
            return false;
        if (!richTool.setSegment(segment).setLocation(location).loadIn()) {
            return onDone(false);
        }
        const buffer = divine_binary_object__WEBPACK_IMPORTED_MODULE_0__.DBO.objectToBuffer(richTool.getData());
        onDone(buffer, buffer);
    }, "deferred"),
    setData: threadcomm__WEBPACK_IMPORTED_MODULE_4__.ThreadComm.registerTasks("set-data", ([location, segment, objectBuffer], onDone) => {
        richColumnTool.setLocation(location).loadIn();
        richTool.setSegment(segment).setLocation(location).loadIn();
        if (onDone)
            onDone(richTool.setData(divine_binary_object__WEBPACK_IMPORTED_MODULE_0__.DBO.bufferToObject(objectBuffer)).commit());
    }, "deferred"),
    removeData: threadcomm__WEBPACK_IMPORTED_MODULE_4__.ThreadComm.registerTasks("remove-data", ([location, segment], onDone) => {
        if (onDone)
            onDone(richTool.setSegment(segment).setLocation(location).delete());
    }, "deferred"),
    removeColumn: threadcomm__WEBPACK_IMPORTED_MODULE_4__.ThreadComm.registerTasks("remove-column", (location, onDone) => {
        const column = _Register_RichDataRegister_js__WEBPACK_IMPORTED_MODULE_1__.RichDataRegister.column.get(location);
        if (!column)
            return onDone(false);
        _Register_RichDataRegister_js__WEBPACK_IMPORTED_MODULE_1__.RichDataRegister.column.remove(location);
        onDone(true);
    }, "deferred"),
    getColumn: threadcomm__WEBPACK_IMPORTED_MODULE_4__.ThreadComm.registerTasks("get-column", (location, onDone) => {
        const column = _Register_RichDataRegister_js__WEBPACK_IMPORTED_MODULE_1__.RichDataRegister.column.get(location);
        if (!column)
            return onDone(false);
        const buf = divine_binary_object__WEBPACK_IMPORTED_MODULE_0__.DBO.objectToBuffer(column.data);
        onDone(buf, buf);
    }, "deferred"),
    setColumn: threadcomm__WEBPACK_IMPORTED_MODULE_4__.ThreadComm.registerTasks("set-column", ([location, buffer], onDone) => {
        if (!onDone)
            return false;
        const column = _Register_RichDataRegister_js__WEBPACK_IMPORTED_MODULE_1__.RichDataRegister.column.add(location);
        column.data = divine_binary_object__WEBPACK_IMPORTED_MODULE_0__.DBO.bufferToObject(buffer);
        return onDone(true);
    }, "deferred"),
    releaseAllData: threadcomm__WEBPACK_IMPORTED_MODULE_4__.ThreadComm.registerTasks("release-all-data", (data, onDone) => {
        _Register_RichDataRegister_js__WEBPACK_IMPORTED_MODULE_1__.RichDataRegister.releaeeAll();
        if (onDone)
            onDone(true);
    }, "deferred"),
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/RichWorld/Threads/RichWorldThreadState.js":
/*!*************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/RichWorld/Threads/RichWorldThreadState.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RichWorldThreadState": () => (/* binding */ RichWorldThreadState)
/* harmony export */ });
/* harmony import */ var _RichWorldThreads_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RichWorldThreads.js */ "../../DSLIBS/divineVoxelEngine/dist/RichWorld/Threads/RichWorldThreads.js");

const RichWorldThreadState = {
    _settingsSynced: false,
    isReady() {
        return _RichWorldThreads_js__WEBPACK_IMPORTED_MODULE_0__.WorldComm.isReady() && this._settingsSynced;
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/RichWorld/Threads/RichWorldThreads.js":
/*!*********************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/RichWorld/Threads/RichWorldThreads.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConstructorComm": () => (/* binding */ ConstructorComm),
/* harmony export */   "DataComm": () => (/* binding */ DataComm),
/* harmony export */   "FXComm": () => (/* binding */ FXComm),
/* harmony export */   "NexusComm": () => (/* binding */ NexusComm),
/* harmony export */   "ParentComm": () => (/* binding */ ParentComm),
/* harmony export */   "WorldComm": () => (/* binding */ WorldComm)
/* harmony export */ });
/* harmony import */ var _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Data/Settings/EngineSettings.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Settings/EngineSettings.js");
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");
/* harmony import */ var _RichWorldThreadState_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RichWorldThreadState.js */ "../../DSLIBS/divineVoxelEngine/dist/RichWorld/Threads/RichWorldThreadState.js");
/* harmony import */ var _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Data/DataHooks.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/DataHooks.js");




const ParentComm = threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.parent;
const WorldComm = threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.createComm("world");
const NexusComm = threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.createComm("nexus");
const FXComm = threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.createComm("fx");
const DataComm = threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.createComm("data-loader");
const ConstructorComm = threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.createCommManager({
    name: "constructor",
    onPortSet() { },
});
threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.registerTasks("sync-settings", (settings) => {
    _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_0__.EngineSettings.syncSettings(settings);
    _RichWorldThreadState_js__WEBPACK_IMPORTED_MODULE_2__.RichWorldThreadState._settingsSynced = true;
    _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_3__.DataHooks.settingsSynced.run(settings);
});


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/RichWorld/Tools/RichColumnDataTool.js":
/*!*********************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/RichWorld/Tools/RichColumnDataTool.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RichColumnDataTool": () => (/* binding */ RichColumnDataTool)
/* harmony export */ });
/* harmony import */ var divine_binary_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-binary-object */ "../../DSLIBS/divineBinaryObject/dist/index.js");
/* harmony import */ var _Register_RichDataRegister_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Register/RichDataRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/RichWorld/Register/RichDataRegister.js");
/* harmony import */ var _Tools_Classes_RichDataToolBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Tools/Classes/RichDataToolBase.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Classes/RichDataToolBase.js");



class RichColumnDataTool extends _Tools_Classes_RichDataToolBase_js__WEBPACK_IMPORTED_MODULE_2__.RichDataSegmentTool {
    column;
    loadIn() {
        let column = _Register_RichDataRegister_js__WEBPACK_IMPORTED_MODULE_1__.RichDataRegister.column.get(this.location);
        if (!column) {
            column = _Register_RichDataRegister_js__WEBPACK_IMPORTED_MODULE_1__.RichDataRegister.column.add(this.location);
        }
        this.sceham = column.data;
        this.column = column;
        return true;
    }
    toBuffer() {
        return divine_binary_object__WEBPACK_IMPORTED_MODULE_0__.DBO.objectToBuffer(this.sceham);
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/RichWorld/Tools/RichDataTool.js":
/*!***************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/RichWorld/Tools/RichDataTool.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RichDataTool": () => (/* binding */ RichDataTool)
/* harmony export */ });
/* harmony import */ var _Register_RichDataRegister_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Register/RichDataRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/RichWorld/Register/RichDataRegister.js");
/* harmony import */ var divine_binary_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! divine-binary-object */ "../../DSLIBS/divineBinaryObject/dist/index.js");
/* harmony import */ var _Tools_Classes_RichDataToolBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Tools/Classes/RichDataToolBase.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Classes/RichDataToolBase.js");
/* harmony import */ var _RichColumnDataTool_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RichColumnDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/RichWorld/Tools/RichColumnDataTool.js");
/* harmony import */ var _Tools_Data_WorldData_ColumnDataTool_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Tools/Data/WorldData/ColumnDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/ColumnDataTool.js");





class RichDataTool extends _Tools_Classes_RichDataToolBase_js__WEBPACK_IMPORTED_MODULE_2__.RichDataSegmentTool {
    data;
    static richColumn = new _RichColumnDataTool_js__WEBPACK_IMPORTED_MODULE_3__.RichColumnDataTool();
    static columnTool = new _Tools_Data_WorldData_ColumnDataTool_js__WEBPACK_IMPORTED_MODULE_4__.ColumnDataTool();
    loadIn() {
        const column = _Register_RichDataRegister_js__WEBPACK_IMPORTED_MODULE_0__.RichDataRegister.column.get(this.location);
        if (!column)
            return false;
        this.sceham = column.data;
        const segment = column.data[this.segment];
        if (!segment)
            return false;
        const data = segment[_Register_RichDataRegister_js__WEBPACK_IMPORTED_MODULE_0__.RichDataRegister.getKey(this.location)];
        if (!data)
            return false;
        this.data = data;
        return true;
    }
    setData(data) {
        this.data = data;
        return this;
    }
    getData() {
        return this.data;
    }
    delete() {
        const segment = this.getSegment();
        if (!segment)
            return false;
        delete segment[_Register_RichDataRegister_js__WEBPACK_IMPORTED_MODULE_0__.RichDataRegister.getKey(this.location)];
        this.data = null;
        const column = _Register_RichDataRegister_js__WEBPACK_IMPORTED_MODULE_0__.RichDataRegister.column.get(this.location);
        if (!column)
            return;
        let items = false;
        for (const segment in column.data) {
            const seg = column.data[segment];
            if (Object.keys(seg).length != 0) {
                items = true;
            }
        }
        if (!items) {
            _Register_RichDataRegister_js__WEBPACK_IMPORTED_MODULE_0__.RichDataRegister.column.remove(this.location);
            RichDataTool.columnTool.loadInAtLocation(this.location);
            RichDataTool.columnTool.setRichData(false);
        }
        return true;
    }
    commit() {
        const segment = this.getSegment();
        if (!segment)
            return false;
        segment[_Register_RichDataRegister_js__WEBPACK_IMPORTED_MODULE_0__.RichDataRegister.getKey(this.location)] = this.data;
        this.data = null;
        if (RichDataTool.columnTool.loadInAtLocation(this.location)) {
            RichDataTool.columnTool.markAsNotStored();
            RichDataTool.columnTool.setRichData(true);
        }
        return true;
    }
    toBuffer() {
        if (!this.data)
            return false;
        return divine_binary_object__WEBPACK_IMPORTED_MODULE_1__.DBO.objectToBuffer(this.data);
    }
}



/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/RichWorld/index.js":
/*!**************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/RichWorld/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DVERW": () => (/* reexport safe */ _DivineStarVoxelEngineRichWorld_js__WEBPACK_IMPORTED_MODULE_0__.DVERW)
/* harmony export */ });
/* harmony import */ var _DivineStarVoxelEngineRichWorld_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DivineStarVoxelEngineRichWorld.js */ "../../DSLIBS/divineVoxelEngine/dist/RichWorld/DivineStarVoxelEngineRichWorld.js");



/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Tools/Classes/RichDataToolBase.js":
/*!*****************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Tools/Classes/RichDataToolBase.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RichDataSegmentTool": () => (/* binding */ RichDataSegmentTool)
/* harmony export */ });
/* harmony import */ var _DataToolBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DataToolBase.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Classes/DataToolBase.js");

class RichDataSegmentTool extends _DataToolBase_js__WEBPACK_IMPORTED_MODULE_0__.DataToolBase {
    sceham = {};
    segment = "voxel";
    constructor() {
        super();
    }
    setSegment(segment) {
        this.segment = segment;
        if (!this.sceham[segment]) {
            this.sceham[segment] = {};
        }
        return this;
    }
    getSegment() {
        const segment = this.sceham[this.segment];
        if (segment)
            return segment;
        return false;
    }
    getAll() {
        if (this.sceham)
            return this.sceham;
        return false;
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Classes/RegisterDataManager.js":
/*!*************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/World/Data/Classes/RegisterDataManager.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegisterDataManager": () => (/* binding */ RegisterDataManager)
/* harmony export */ });
class RegisterDataManager {
    data = new Map();
    getData(id) {
        const voxelData = this.data.get(id);
        if (!voxelData) {
            throw new Error(`Voxel with ${id} does not exists.`);
        }
        return voxelData;
    }
    registerData(data) {
        if (Array.isArray(data)) {
            for (const voxel of data) {
                this.data.set(voxel.id, voxel);
            }
            return;
        }
        this.data.set(data.id, data);
    }
    clear() {
        this.data.clear();
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Managers/DataManagers.js":
/*!*******************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/World/Data/Managers/DataManagers.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SubstanceManager": () => (/* binding */ SubstanceManager),
/* harmony export */   "VoxelManager": () => (/* binding */ VoxelManager)
/* harmony export */ });
/* harmony import */ var _Classes_RegisterDataManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Classes/RegisterDataManager.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Classes/RegisterDataManager.js");

const VoxelManager = new _Classes_RegisterDataManager_js__WEBPACK_IMPORTED_MODULE_0__.RegisterDataManager();
const SubstanceManager = new _Classes_RegisterDataManager_js__WEBPACK_IMPORTED_MODULE_0__.RegisterDataManager();
SubstanceManager.registerData([
    {
        id: "#dve_solid",
        tags: [
            ["#dve_parent_substance", "#dve_solid"],
            ["#dve_rendered_substance", "#dve_solid"],
            ["#dve_is_solid", true],
            ["#dve_is_liquid", false],
            ["#dve_flow_rate", 0],
            ["#dve_culled_substances", ["#dve_solid"]],
        ],
    },
    {
        id: "#dve_translucent",
        tags: [
            ["#dve_parent_substance", "#dve_flora"],
            ["#dve_rendered_substance", "#dve_solid"],
            ["#dve_is_solid", true],
            ["#dve_is_liquid", false],
            ["#dve_flow_rate", 0],
            ["#dve_culled_substances", []],
        ],
    },
    {
        id: "#dve_transparent",
        tags: [
            ["#dve_parent_substance", "#dve_solid"],
            ["#dve_rendered_substance", "#dve_solid"],
            ["#dve_is_solid", true],
            ["#dve_is_liquid", false],
            ["#dve_flow_rate", 0],
            ["#dve_culled_substances", ["#dve_transparent"]],
        ],
    },
    {
        id: "#dve_flora",
        tags: [
            ["#dve_parent_substance", "#dve_flora"],
            ["#dve_rendered_substance", "#dve_flora"],
            ["#dve_is_solid", true],
            ["#dve_is_liquid", false],
            ["#dve_flow_rate", 0],
            ["#dve_culled_substances", []],
        ],
    },
    {
        id: "#dve_liquid",
        tags: [
            ["#dve_parent_substance", "#dve_liquid"],
            ["#dve_rendered_substance", "#dve_liquid"],
            ["#dve_is_solid", false],
            ["#dve_is_liquid", true],
            ["#dve_flow_rate", 1],
            ["#dve_culled_substances", ["#dve_liquid", "#dve_solid"]],
        ],
    },
    {
        id: "#dve_magma",
        tags: [
            ["#dve_parent_substance", "#dve_liquid"],
            ["#dve_rendered_substance", "#dve_liquid"],
            ["#dve_is_solid", false],
            ["#dve_is_liquid", true],
            ["#dve_flow_rate", 3],
            ["#dve_culled_substances", ["#dve_liquid", "#dve_solid"]],
        ],
    },
]);


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
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["DSLIBS_divineBinaryObject_dist_index_js-DSLIBS_divineVoxelEngine_dist_Common_Threads_Contract-5324f4"], () => (__webpack_require__("./compiled/client/RichWorld/richworld.js")))
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
/******/ 			"compiled_client_RichWorld_richworld_js": 1
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
/******/ 			return __webpack_require__.e("DSLIBS_divineBinaryObject_dist_index_js-DSLIBS_divineVoxelEngine_dist_Common_Threads_Contract-5324f4").then(next);
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
//# sourceMappingURL=compiled_client_RichWorld_richworld_js.DVE.js.map