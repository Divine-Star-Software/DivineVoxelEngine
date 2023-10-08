/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./compiled/core/data/ENV/DVEENV.js":
/*!******************************************!*\
  !*** ./compiled/core/data/ENV/DVEENV.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DVEENV": () => (/* binding */ DVEENV)
/* harmony export */ });
const DVEENV = {
    data: {},
    async $INIT(url = ".DVE_ENV") {
        const envDataResponse = await fetch(url);
        const envData = await envDataResponse.json();
        this.data = envData;
    },
};


/***/ }),

/***/ "./compiled/databases/App/AppDataBase.js":
/*!***********************************************!*\
  !*** ./compiled/databases/App/AppDataBase.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppDataBase": () => (/* binding */ AppDataBase)
/* harmony export */ });
/* harmony import */ var dved_Broswer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dved/Broswer */ "../../DSLIBS/dvePlugins/Data/dist/Broswer/index.js");
/* harmony import */ var zeneithdb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zeneithdb */ "../../DSLIBS/zeneithDB/dist/index.js");
/* harmony import */ var _core_data_ENV_DVEENV__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/data/ENV/DVEENV */ "./compiled/core/data/ENV/DVEENV.js");
/* harmony import */ var divine_rng_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! divine-rng/util */ "../../DSLIBS/divineRNG/dist/util/index.js");




const AppDataBase = {
    db: {},
    async $INIT() {
        await zeneithdb__WEBPACK_IMPORTED_MODULE_1__.ZeneithDB.$INIT();
        const dbName = "ECD_APP";
        let db;
        const existanceCheck = await zeneithdb__WEBPACK_IMPORTED_MODULE_1__.ZeneithDB.databaseExists(dbName);
        if (!existanceCheck) {
            db = await zeneithdb__WEBPACK_IMPORTED_MODULE_1__.ZeneithDB.createDatabase({
                databaseName: dbName,
                collections: [
                    {
                        name: "meta-data",
                        schema: [],
                    },
                ],
            });
            this.db = db;
        }
        else {
            db = await zeneithdb__WEBPACK_IMPORTED_MODULE_1__.ZeneithDB.getDatabase(dbName);
            this.db = db;
        }
        await this.db.open();
    },
    async inSaveRecord(id) {
        const saveRecord = await this.db.getData("meta-data", "save-record");
        if (!saveRecord) {
            this.db.setData("meta-data", "save-record", {});
            return false;
        }
        const save = saveRecord[id];
        return save !== undefined;
    },
    async addToSaveRecord(id) {
        let saveRecord = await this.db.getData("meta-data", "save-record");
        if (!saveRecord) {
            saveRecord = {};
        }
        saveRecord[id] = _core_data_ENV_DVEENV__WEBPACK_IMPORTED_MODULE_2__.DVEENV.data.version;
        this.db.setData("meta-data", "save-record", saveRecord);
    },
    async removeFromSaveRecord(id) {
        let saveRecord = await this.db.getData("meta-data", "save-record");
        if (!saveRecord)
            return false;
        delete saveRecord[id];
        this.db.setData("meta-data", "save-record", saveRecord);
    },
    async getWorldSave(id) {
        const worldDB = await dved_Broswer__WEBPACK_IMPORTED_MODULE_0__.DVEDBrowser.getWorldDataBase(id);
        const inWorldSave = await this.inSaveRecord(id);
        if (!inWorldSave) {
            await this.addToSaveRecord(id);
            worldDB.database.setData("world-meta", "version", _core_data_ENV_DVEENV__WEBPACK_IMPORTED_MODULE_2__.DVEENV.data.version);
        }
    },
    async getAllSaves() {
        const saveRecord = await this.db.getData("meta-data", "save-record");
        if (!saveRecord)
            return {};
        return saveRecord;
    },
    async removeWorldSave(id) {
        await zeneithdb__WEBPACK_IMPORTED_MODULE_1__.ZeneithDB.deleteDatabase(id);
        await this.removeFromSaveRecord(id);
    },
    async getSavedata(id) {
        const worldDB = await dved_Broswer__WEBPACK_IMPORTED_MODULE_0__.DVEDBrowser.getWorldDataBase(id);
        await this.addToSaveRecord(id);
        const data = await worldDB.database.getData("world-meta", "save-data");
        if (!data)
            return false;
        return data;
    },
    async createNewSave(title, seed) {
        const saveData = {
            title: title,
            seed: (0,divine_rng_util__WEBPACK_IMPORTED_MODULE_3__.StringToNumber)(seed),
            created: Date.now(),
            lastPlayed: Date.now(),
            version: _core_data_ENV_DVEENV__WEBPACK_IMPORTED_MODULE_2__.DVEENV.data.version,
        };
        const worldDB = await dved_Broswer__WEBPACK_IMPORTED_MODULE_0__.DVEDBrowser.getWorldDataBase(title);
        await this.addToSaveRecord(title);
        worldDB.database.setData("world-meta", "save-data", saveData);
    },
};


/***/ }),

/***/ "./compiled/databases/World/WorldData.js":
/*!***********************************************!*\
  !*** ./compiled/databases/World/WorldData.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorldData": () => (/* binding */ WorldData)
/* harmony export */ });
/* harmony import */ var crystal_compressor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crystal-compressor */ "./node_modules/crystal-compressor/index.js");
/* harmony import */ var dved_Broswer___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dved/Broswer/ */ "../../DSLIBS/dvePlugins/Data/dist/Broswer/index.js");
/* harmony import */ var divine_voxel_engine_Data_World_WorldSpaces__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! divine-voxel-engine/Data/World/WorldSpaces */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldSpaces.js");



const WorldData = {
    async setPath(id) {
        return true;
    },
    dataType: "world-data",
    setType(data) {
        this.dataType = data;
    },
    async columnExists(location) {
        await dved_Broswer___WEBPACK_IMPORTED_MODULE_1__.WorldDataBase.setDimension(location[0]);
        return (await this.columnTimestamp(location)) > 0;
    },
    async columnTimestamp(location) {
        await dved_Broswer___WEBPACK_IMPORTED_MODULE_1__.WorldDataBase.setDimension(location[0]);
        const stamp = await dved_Broswer___WEBPACK_IMPORTED_MODULE_1__.WorldDataBase.columnTimestamp.get(divine_voxel_engine_Data_World_WorldSpaces__WEBPACK_IMPORTED_MODULE_2__.WorldSpaces.column.getKeyLocation(location), this.dataType);
        if (!stamp)
            return 0;
        return stamp;
    },
    async loadRegionHeader(location) {
        await dved_Broswer___WEBPACK_IMPORTED_MODULE_1__.WorldDataBase.setDimension(location[0]);
        const buffer = await dved_Broswer___WEBPACK_IMPORTED_MODULE_1__.WorldDataBase.regionHeader.get(divine_voxel_engine_Data_World_WorldSpaces__WEBPACK_IMPORTED_MODULE_2__.WorldSpaces.region.getKeyLocation(location), this.dataType);
        if (!buffer)
            return new ArrayBuffer(0);
        return buffer;
    },
    async loadColumn(location) {
        await dved_Broswer___WEBPACK_IMPORTED_MODULE_1__.WorldDataBase.setDimension(location[0]);
        const buffer = await dved_Broswer___WEBPACK_IMPORTED_MODULE_1__.WorldDataBase.column.get(divine_voxel_engine_Data_World_WorldSpaces__WEBPACK_IMPORTED_MODULE_2__.WorldSpaces.column.getKeyLocation(location), this.dataType);
        if (!buffer)
            return new ArrayBuffer(0);
        return await (await crystal_compressor__WEBPACK_IMPORTED_MODULE_0__.CrystalCompressor.decompressArray(buffer, "Uint8")).buffer;
    },
    async saveColumn(location, buffer) {
        const compressed = await crystal_compressor__WEBPACK_IMPORTED_MODULE_0__.CrystalCompressor.compressArray(new Uint8Array(buffer));
        await dved_Broswer___WEBPACK_IMPORTED_MODULE_1__.WorldDataBase.setDimension(location[0]);
        await dved_Broswer___WEBPACK_IMPORTED_MODULE_1__.WorldDataBase.column.set(divine_voxel_engine_Data_World_WorldSpaces__WEBPACK_IMPORTED_MODULE_2__.WorldSpaces.column.getKeyLocation(location), this.dataType, compressed.buffer);
        await dved_Broswer___WEBPACK_IMPORTED_MODULE_1__.WorldDataBase.columnTimestamp.set(divine_voxel_engine_Data_World_WorldSpaces__WEBPACK_IMPORTED_MODULE_2__.WorldSpaces.column.getKeyLocation(location), this.dataType, Date.now());
        return true;
    },
};


/***/ }),

/***/ "./compiled/environments/electron/client/dataloader.js":
/*!*************************************************************!*\
  !*** ./compiled/environments/electron/client/dataloader.js ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var divine_voxel_engine_DataLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-voxel-engine/DataLoader */ "../../DSLIBS/divineVoxelEngine/dist/DataLoader/index.js");
/* harmony import */ var _io_client_DataHandler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../io/client/DataHandler.js */ "./compiled/io/client/DataHandler.js");
/* harmony import */ var _core_data_ENV_DVEENV__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/data/ENV/DVEENV */ "./compiled/core/data/ENV/DVEENV.js");
/* harmony import */ var _io_client_Tasks_RegisterIOTasks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../io/client/Tasks/RegisterIOTasks */ "./compiled/io/client/Tasks/RegisterIOTasks.js");
/* harmony import */ var _databases_App_AppDataBase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../databases/App/AppDataBase */ "./compiled/databases/App/AppDataBase.js");





await divine_voxel_engine_DataLoader__WEBPACK_IMPORTED_MODULE_0__.DVEDL.$INIT(new _io_client_DataHandler_js__WEBPACK_IMPORTED_MODULE_1__.DVEDDataHanlder());
await _core_data_ENV_DVEENV__WEBPACK_IMPORTED_MODULE_2__.DVEENV.$INIT("../.DVE_ENV");
await _databases_App_AppDataBase__WEBPACK_IMPORTED_MODULE_4__.AppDataBase.$INIT();
(0,_io_client_Tasks_RegisterIOTasks__WEBPACK_IMPORTED_MODULE_3__.RegisterIOTasks)(divine_voxel_engine_DataLoader__WEBPACK_IMPORTED_MODULE_0__.DVEDL);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ "./compiled/io/client/DataHandler.js":
/*!*******************************************!*\
  !*** ./compiled/io/client/DataHandler.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DVEDDataHanlder": () => (/* binding */ DVEDDataHanlder)
/* harmony export */ });
/* harmony import */ var _Server_DVEDServer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Server/DVEDServer.js */ "./compiled/io/client/Server/DVEDServer.js");
/* harmony import */ var _databases_World_WorldData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../databases/World/WorldData.js */ "./compiled/databases/World/WorldData.js");
/* harmony import */ var divine_voxel_engine_DataLoader_DataHandler_DataHandlerBaes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! divine-voxel-engine/DataLoader/DataHandler/DataHandlerBaes.js */ "../../DSLIBS/divineVoxelEngine/dist/DataLoader/DataHandler/DataHandlerBaes.js");



let mode = "indexdb";
class DVEDDataHanlder extends divine_voxel_engine_DataLoader_DataHandler_DataHandlerBaes_js__WEBPACK_IMPORTED_MODULE_2__.DataHandler {
    async getRegionHeader(location) {
        _databases_World_WorldData_js__WEBPACK_IMPORTED_MODULE_1__.WorldData.setType(this.dataType);
        if (this.mode == "server")
            return await _Server_DVEDServer_js__WEBPACK_IMPORTED_MODULE_0__.DVEDServer.loadRegionHeader(location);
        return await _databases_World_WorldData_js__WEBPACK_IMPORTED_MODULE_1__.WorldData.loadRegionHeader(location);
    }
    async getColumn(location) {
        _databases_World_WorldData_js__WEBPACK_IMPORTED_MODULE_1__.WorldData.setType(this.dataType);
        if (this.mode == "server")
            return await _Server_DVEDServer_js__WEBPACK_IMPORTED_MODULE_0__.DVEDServer.loadColumn(location);
        return await _databases_World_WorldData_js__WEBPACK_IMPORTED_MODULE_1__.WorldData.loadColumn(location);
    }
    async saveColumn(location, buffer) {
        _databases_World_WorldData_js__WEBPACK_IMPORTED_MODULE_1__.WorldData.setType(this.dataType);
        if (this.mode == "server")
            return await _Server_DVEDServer_js__WEBPACK_IMPORTED_MODULE_0__.DVEDServer.saveColumn(location, buffer);
        return await _databases_World_WorldData_js__WEBPACK_IMPORTED_MODULE_1__.WorldData.saveColumn(location, buffer);
    }
    async setPath(id) {
        _databases_World_WorldData_js__WEBPACK_IMPORTED_MODULE_1__.WorldData.setType(this.dataType);
        if (this.mode == "server")
            return _Server_DVEDServer_js__WEBPACK_IMPORTED_MODULE_0__.DVEDServer.setPath(id);
        return _databases_World_WorldData_js__WEBPACK_IMPORTED_MODULE_1__.WorldData.setPath(id);
    }
    async columnExists(location) {
        _databases_World_WorldData_js__WEBPACK_IMPORTED_MODULE_1__.WorldData.setType(this.dataType);
        const d = await _databases_World_WorldData_js__WEBPACK_IMPORTED_MODULE_1__.WorldData.columnExists(location);
        if (this.mode == "server")
            return await _Server_DVEDServer_js__WEBPACK_IMPORTED_MODULE_0__.DVEDServer.columnExists(location);
        return await _databases_World_WorldData_js__WEBPACK_IMPORTED_MODULE_1__.WorldData.columnExists(location);
    }
    async columnTimestamp(location) {
        _databases_World_WorldData_js__WEBPACK_IMPORTED_MODULE_1__.WorldData.setType(this.dataType);
        if (this.mode == "server")
            return await _Server_DVEDServer_js__WEBPACK_IMPORTED_MODULE_0__.DVEDServer.columnTimestamp(location);
        return await _databases_World_WorldData_js__WEBPACK_IMPORTED_MODULE_1__.WorldData.columnTimestamp(location);
    }
    async columnHasSegment(location, segment) {
        if (this.mode == "server") {
            return false;
        }
        _databases_World_WorldData_js__WEBPACK_IMPORTED_MODULE_1__.WorldData.setType(segment);
        return await _databases_World_WorldData_js__WEBPACK_IMPORTED_MODULE_1__.WorldData.columnExists(location);
    }
}


/***/ }),

/***/ "./compiled/io/client/Server/DVEDServer.js":
/*!*************************************************!*\
  !*** ./compiled/io/client/Server/DVEDServer.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DVEDServer": () => (/* binding */ DVEDServer)
/* harmony export */ });
/* harmony import */ var crystal_compressor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crystal-compressor */ "./node_modules/crystal-compressor/index.js");

const DVEDServer = {
    url: `http://127.0.0.1:3000`,
    async _compressToString(buffer) {
        let dataString = "";
        const compressed = await crystal_compressor__WEBPACK_IMPORTED_MODULE_0__.CrystalCompressor.compressArray(new Uint8Array(buffer));
        let length = compressed.length;
        for (let i = 0; i < length; i++) {
            dataString += String.fromCharCode(compressed[i]);
        }
        return dataString;
    },
    async sendDVEDMessage(dveMessage, buffer) {
        let dataString = "";
        if (buffer) {
            if (Array.isArray(buffer)) {
            }
            else {
                dataString = await this._compressToString(buffer);
            }
        }
        const message = `|${JSON.stringify(dveMessage)}|${dataString}`;
        return fetch(this.url, {
            method: "POST",
            body: message,
            headers: { "Content-Type": "application/dved" },
        });
    },
    async setPath(id) {
        const response = await this.sendDVEDMessage({
            type: "set-path",
            id: id,
        });
        const error = (await this._determineError(response)) != Infinity;
        if (error) {
            console.warn(`Problem setting path with id ${id}`);
            return false;
        }
        return true;
    },
    async _determineError(response) {
        let error = Infinity;
        if (!response)
            error = -1;
        const responseBuffer = await response.arrayBuffer();
        if (!responseBuffer)
            error = -1;
        const responseCode = new Uint8Array(responseBuffer)[0];
        if (responseCode !== 1)
            error = responseCode;
        if (error !== Infinity)
            return error;
        return Infinity;
    },
    async columnExists(location) {
        const response = await this.sendDVEDMessage({
            type: `column-exists`,
            location: location,
        });
        const buffer = await response.arrayBuffer();
        if (!buffer)
            return false;
        const data = new Uint8Array(buffer);
        return data[0] == 1;
    },
    async columnTimestamp(location) {
        const response = await this.sendDVEDMessage({
            type: `column-timestamp`,
            location: location,
        });
        const buffer = await response.arrayBuffer();
        if (!buffer)
            return 0;
        const data = new Uint32Array(buffer);
        return data[0];
    },
    async loadColumn(location) {
        try {
            const response = await this.sendDVEDMessage({
                type: `load-column`,
                location: location,
            });
            const buffer = await response.arrayBuffer();
            if (buffer.byteLength == 0) {
                throw new Error(`Column at ${location.toString()} could not be loaded`);
            }
            const uncompressed = await crystal_compressor__WEBPACK_IMPORTED_MODULE_0__.CrystalCompressor.core.decompressArrayBuffer(buffer);
            return uncompressed.buffer;
        }
        catch (error) {
            console.log(error);
            return new Uint8Array(0).buffer;
        }
    },
    async loadRegionHeader(location) {
        try {
            const response = await this.sendDVEDMessage({
                type: `load-region-header`,
                location: location,
            });
            const buffer = await response.arrayBuffer();
            if (buffer.byteLength == 1) {
                throw new Error(`Region header at ${location.toString()} could not be loaded`);
            }
            return buffer;
        }
        catch (error) {
            console.log(error);
            return new Uint8Array(0).buffer;
        }
    },
    async saveColumn(location, buffer) {
        const response = await this.sendDVEDMessage({
            type: `save-column`,
            location: location,
        }, buffer);
        const error = (await this._determineError(response)) != Infinity;
        if (error) {
            console.warn(`Problem saving data at ${location.toString()} code : ${error}`);
            return false;
        }
        return true;
    },
    async loadRegion(location) {
        const response = await this.sendDVEDMessage({
            type: `load-column`,
            location: location,
        });
        const buffer = await response.arrayBuffer();
        const uncompressed = await crystal_compressor__WEBPACK_IMPORTED_MODULE_0__.CrystalCompressor.decompressArray(buffer, "Uint8");
        return [uncompressed.buffer];
    },
    async saveRegion(buffer) {
        const proms = [];
        for (const column of buffer) {
            proms.push(this.saveColumn(column[0], column[1]));
        }
        await Promise.all(proms);
        return true;
    },
};


/***/ }),

/***/ "./compiled/io/client/Tasks/RegisterIOTasks.js":
/*!*****************************************************!*\
  !*** ./compiled/io/client/Tasks/RegisterIOTasks.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegisterIOTasks": () => (/* binding */ RegisterIOTasks)
/* harmony export */ });
/* harmony import */ var _databases_App_AppDataBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../databases/App/AppDataBase */ "./compiled/databases/App/AppDataBase.js");

async function RegisterIOTasks(DVEDL) {
    await _databases_App_AppDataBase__WEBPACK_IMPORTED_MODULE_0__.AppDataBase.$INIT();
    DVEDL.TC.registerTasks("set-save", async (id, onDone) => {
        await _databases_App_AppDataBase__WEBPACK_IMPORTED_MODULE_0__.AppDataBase.getWorldSave(id);
        if (onDone)
            onDone();
    }, "deferred");
}


/***/ }),

/***/ "../../DSLIBS/divineRNG/dist/util/index.js":
/*!*************************************************!*\
  !*** ../../DSLIBS/divineRNG/dist/util/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StringToNumber": () => (/* binding */ StringToNumber)
/* harmony export */ });
//https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
function StringToNumber(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 =
        Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
            Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 =
        Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
            Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/DataLoader/DataHandler/DataHandlerBaes.js":
/*!*************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/DataLoader/DataHandler/DataHandlerBaes.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataHandler": () => (/* binding */ DataHandler)
/* harmony export */ });
/* harmony import */ var _DataHandlerWrapper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DataHandlerWrapper.js */ "../../DSLIBS/divineVoxelEngine/dist/DataLoader/DataHandler/DataHandlerWrapper.js");

class DataHandler {
    mode = "indexdb";
    constructor() {
        this.mode = _DataHandlerWrapper_js__WEBPACK_IMPORTED_MODULE_0__.DataHanlderWrapper.mode;
    }
    setMode(mode) {
        this.mode = mode;
    }
    dataType = "world-data";
    setDataType(type) {
        this.dataType = type;
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/DataLoader/DataHandler/DataHandlerWrapper.js":
/*!****************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/DataLoader/DataHandler/DataHandlerWrapper.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataHanlderWrapper": () => (/* binding */ DataHanlderWrapper)
/* harmony export */ });
/* harmony import */ var _DivineVoxelEngineDataLoader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DivineVoxelEngineDataLoader.js */ "../../DSLIBS/divineVoxelEngine/dist/DataLoader/DivineVoxelEngineDataLoader.js");
/* harmony import */ var _Tools_Data_WorldData_ColumnDataTool_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Tools/Data/WorldData/ColumnDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/ColumnDataTool.js");
/* harmony import */ var _Serializers_WorldDataSerializer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Serializers/WorldDataSerializer.js */ "../../DSLIBS/divineVoxelEngine/dist/DataLoader/Serializers/WorldDataSerializer.js");
/* harmony import */ var _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Global/Util.helper.js */ "../../DSLIBS/divineVoxelEngine/dist/Global/Util.helper.js");
/* harmony import */ var _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Data/World/WorldRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldRegister.js");
/* harmony import */ var _Tools_Data_RichDataTool_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Tools/Data/RichDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/RichDataTool.js");
/* harmony import */ var _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Data/DataHooks.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/DataHooks.js");
//objects







const columnDatatool = new _Tools_Data_WorldData_ColumnDataTool_js__WEBPACK_IMPORTED_MODULE_1__.ColumnDataTool();
const DataHanlderWrapper = {
    mode: "indexdb",
    handler: {},
    richData: {},
    $INIT(handler) {
        this.handler = handler;
        this.richData = new _Tools_Data_RichDataTool_js__WEBPACK_IMPORTED_MODULE_5__.RichDataTool();
    },
    async loadRegionHeader(location) {
        this.handler.setDataType("world-data");
        try {
            const headerBuffer = await this.handler.getRegionHeader(location);
            if (!headerBuffer)
                return false;
            const sab = _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_3__.Util.convertBufferToSAB(headerBuffer);
            _DivineVoxelEngineDataLoader_js__WEBPACK_IMPORTED_MODULE_0__.DVEDL.worldComm.runTasks("load-region-header", [
                location,
                sab,
            ]);
            this.handler.setDataType("world-data");
            return true;
        }
        catch (error) {
            console.error(`Problem getting region header at ${location.toString()}`);
            console.error(error);
            return false;
        }
    },
    async saveColumn(location) {
        this.handler.setDataType("world-data");
        if (columnDatatool.setLocation(location).loadIn()) {
            try {
                if (columnDatatool.isStored())
                    return true;
                columnDatatool.markAsStored();
                const column = _Serializers_WorldDataSerializer_js__WEBPACK_IMPORTED_MODULE_2__.WorldDataSerialize.serializeColumn(location);
                if (!column)
                    return false;
                this.handler.setDataType("world-data");
                const success = await this.handler.saveColumn(location, column);
                if (!success) {
                    columnDatatool.markAsNotStored();
                    throw new Error(`Could not store column at ${location.toString()}`);
                }
                if (this.richData._enabled) {
                    const column = await this.richData.setLocation(location).getColumnAsync();
                    if (column) {
                        this.handler.setDataType("rich-data");
                        const success = await this.handler.saveColumn(location, column);
                        if (!success) {
                            columnDatatool.markAsNotStored();
                            throw new Error(`Rich data could not store column at ${location.toString()}`);
                        }
                    }
                }
                this.handler.setDataType("world-data");
            }
            catch (error) {
                console.error(`Problem storing column at ${location.toString()}`);
                console.error(error);
            }
        }
    },
    async loadColumn(location) {
        this.handler.setDataType("world-data");
        try {
            if (_Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_4__.WorldRegister.column.get(location))
                return true;
            this.handler.setDataType("world-data");
            const column = await this.handler.getColumn(location);
            const data = _Serializers_WorldDataSerializer_js__WEBPACK_IMPORTED_MODULE_2__.WorldDataSerialize.deSerializeColumn(column);
            columnDatatool.setBuffer(data.column);
            _DivineVoxelEngineDataLoader_js__WEBPACK_IMPORTED_MODULE_0__.DVEDL.worldComm.runTasks("load-column", [
                location,
                data.column,
            ]);
            for (const chunk of data.chunks) {
                _DivineVoxelEngineDataLoader_js__WEBPACK_IMPORTED_MODULE_0__.DVEDL.worldComm.runTasks("load-chunk", [
                    location,
                    chunk,
                ]);
            }
            if (this.richData._enabled && columnDatatool.hasRichData()) {
                this.handler.setDataType("rich-data");
                const richColumn = await this.handler.getColumn(location);
                if (!richColumn)
                    return false;
                await this.richData.setLocation(location).setColumnAsync(richColumn);
            }
            this.handler.setDataType("world-data");
            return true;
        }
        catch (error) {
            console.error(`Problem loading column at ${location.toString()}`);
            console.error(error);
            return false;
        }
    },
    async unLoadColumn(location) {
        this.handler.setDataType("world-data");
        if (columnDatatool.setLocation(location).loadIn()) {
            try {
                if (!columnDatatool.isStored()) {
                    await this.saveColumn(location);
                }
                if (this.richData._enabled &&
                    (await this.richData.setLocation(location).columnHasDataAsync())) {
                    await this.richData.removeColumnAsync();
                }
                this.handler.setDataType("world-data");
            }
            catch (error) {
                console.error(`Problem storing column at ${location.toString()}`);
                console.error(error);
            }
        }
        else {
            return true;
        }
    },
    async setPath(id) {
        this.handler.setDataType("world-data");
        try {
            await this.handler.setPath(id);
            return true;
        }
        catch (error) {
            console.error(`Problem setting path to ${id}`);
            console.error(error);
            return false;
        }
    },
    async columnExists(location) {
        this.handler.setDataType("world-data");
        try {
            if (_Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_4__.WorldRegister.column.get(location))
                return true;
            return await this.handler.columnExists(location);
        }
        catch (error) {
            console.error(`Problem checking if column exists at ${location.toString()}`);
            console.error(error);
            return false;
        }
    },
    async columnTimestamp(location) {
        this.handler.setDataType("world-data");
        try {
            return await this.handler.columnTimestamp(location);
        }
        catch (error) {
            console.error(`Problem getting column timestamp at ${location.toString()}`);
            console.error(error);
            return 0;
        }
    },
};
_Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_6__.DataHooks.settingsSynced.addToRun((data) => {
    DataHanlderWrapper.mode = data.data.mode;
});


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/DataLoader/DivineVoxelEngineDataLoader.js":
/*!*************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/DataLoader/DivineVoxelEngineDataLoader.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DVEDL": () => (/* binding */ DVEDL)
/* harmony export */ });
/* harmony import */ var _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Data/Settings/EngineSettings.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Settings/EngineSettings.js");
/* harmony import */ var _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Global/Util.helper.js */ "../../DSLIBS/divineVoxelEngine/dist/Global/Util.helper.js");
/* harmony import */ var _Data_DataSyncNode_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Data/DataSyncNode.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/DataSyncNode.js");
/* harmony import */ var _Data_DataManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Data/DataManager.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/DataManager.js");
/* harmony import */ var _Serializers_WorldDataSerializer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Serializers/WorldDataSerializer.js */ "../../DSLIBS/divineVoxelEngine/dist/DataLoader/Serializers/WorldDataSerializer.js");
/* harmony import */ var _Threads_DataLoaderThreads_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Threads/DataLoaderThreads.js */ "../../DSLIBS/divineVoxelEngine/dist/DataLoader/Threads/DataLoaderThreads.js");
/* harmony import */ var _Init_InitWorker_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Init/InitWorker.js */ "../../DSLIBS/divineVoxelEngine/dist/DataLoader/Init/InitWorker.js");
/* harmony import */ var _Tasks_DataLoaderTasks_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Tasks/DataLoaderTasks.js */ "../../DSLIBS/divineVoxelEngine/dist/DataLoader/Tasks/DataLoaderTasks.js");
/* harmony import */ var _DataHandler_DataHandlerWrapper_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DataHandler/DataHandlerWrapper.js */ "../../DSLIBS/divineVoxelEngine/dist/DataLoader/DataHandler/DataHandlerWrapper.js");
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");
/* harmony import */ var _Tools_Data_RichDataTool_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Tools/Data/RichDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/RichDataTool.js");
/* harmony import */ var _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Tools/Data/DataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/DataTool.js");
//objects





//intercomms

//functions






const DVEDL = {
    environment: "browser",
    TC: threadcomm__WEBPACK_IMPORTED_MODULE_9__.ThreadComm,
    UTIL: _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_1__.Util,
    settings: _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_0__.EngineSettings,
    dataSyncNode: _Data_DataSyncNode_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncNode,
    data: _Data_DataManager_js__WEBPACK_IMPORTED_MODULE_3__.DataManager,
    worldComm: _Threads_DataLoaderThreads_js__WEBPACK_IMPORTED_MODULE_5__.WorldComm,
    parentComm: _Threads_DataLoaderThreads_js__WEBPACK_IMPORTED_MODULE_5__.ParentComm,
    tasks: _Tasks_DataLoaderTasks_js__WEBPACK_IMPORTED_MODULE_7__.DataLoaderTasks,
    serializer: _Serializers_WorldDataSerializer_js__WEBPACK_IMPORTED_MODULE_4__.WorldDataSerialize,
    dataHandler: _DataHandler_DataHandlerWrapper_js__WEBPACK_IMPORTED_MODULE_8__.DataHanlderWrapper,
    async $INIT(dataHanlder) {
        this.dataHandler.$INIT(dataHanlder);
        await (0,_Init_InitWorker_js__WEBPACK_IMPORTED_MODULE_6__.InitWorker)(this);
    },
    getRichDataTool() {
        return new _Tools_Data_RichDataTool_js__WEBPACK_IMPORTED_MODULE_10__.RichDataTool();
    },
    getDataTool() {
        return new _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_11__.DataTool();
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/DataLoader/Init/InitWorker.js":
/*!*************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/DataLoader/Init/InitWorker.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InitWorker": () => (/* binding */ InitWorker)
/* harmony export */ });
/* harmony import */ var _Threads_DataLoaderThreadState_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Threads/DataLoaderThreadState.js */ "../../DSLIBS/divineVoxelEngine/dist/DataLoader/Threads/DataLoaderThreadState.js");
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");


async function InitWorker(DVED) {
    let parent = "render";
    if (DVED.environment == "node") {
        parent = "server";
    }
    await threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.$INIT("data-loader", parent);
    await DVED.UTIL.createPromiseCheck({
        check: () => {
            return _Threads_DataLoaderThreadState_js__WEBPACK_IMPORTED_MODULE_0__.DataLoaderThreadState.isReady();
        },
        checkInterval: 1,
    });
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/DataLoader/Serializers/WorldDataSerializer.js":
/*!*****************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/DataLoader/Serializers/WorldDataSerializer.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorldDataSerialize": () => (/* binding */ WorldDataSerialize)
/* harmony export */ });
/* harmony import */ var _Tools_Data_WorldData_RegionDataTool_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Tools/Data/WorldData/RegionDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/RegionDataTool.js");
/* harmony import */ var _Tools_Data_WorldData_ColumnDataTool_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Tools/Data/WorldData/ColumnDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/ColumnDataTool.js");
/* harmony import */ var _Tools_Data_WorldData_ChunkDataTool_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Tools/Data/WorldData/ChunkDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/ChunkDataTool.js");
/* harmony import */ var _Data_Constants_DataHeaders_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Data/Constants/DataHeaders.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Constants/DataHeaders.js");
//objects




const WorldDataSerialize = {
    regions: new _Tools_Data_WorldData_RegionDataTool_js__WEBPACK_IMPORTED_MODULE_0__.RegionDataTool(),
    columns: new _Tools_Data_WorldData_ColumnDataTool_js__WEBPACK_IMPORTED_MODULE_1__.ColumnDataTool(),
    chunks: new _Tools_Data_WorldData_ChunkDataTool_js__WEBPACK_IMPORTED_MODULE_2__.ChunkDataTool(),
    serializeRegion(location) {
        if (!this.regions
            .setDimension(location[0])
            .loadInAt(location[1], location[2], location[3]))
            return false;
        const region = this.regions.getRegion();
        const columnBuffers = [];
        region.columns.forEach((column) => {
            this.columns.setColumn(column);
            const location = this.columns.getLocationData();
            const columnBuffer = this.serializeColumn(location);
            if (columnBuffer)
                columnBuffers.push([[...location], columnBuffer]);
        });
        return columnBuffers;
    },
    serializeColumn(location) {
        if (!this.columns.setLocation(location).loadIn())
            return false;
        const columnSize = this.columns.getBufferSizeForWholeColumn();
        const columnBuffer = new ArrayBuffer(columnSize);
        const columnArray = new Uint8Array(columnBuffer);
        const column = this.columns.getColumn();
        let offset = this._readDataIntoBuffer(0, columnArray, column.buffer);
        column.chunks.forEach((chunk) => {
            offset += this._readDataIntoBuffer(offset, columnArray, chunk.buffer);
        });
        return columnArray;
    },
    deSerializeRegion(regionBuffers) {
        for (const buffer of regionBuffers) {
            this.deSerializeColumn(buffer);
        }
    },
    deSerializeColumn(columnBuffer) {
        const dv = new DataView(columnBuffer);
        if (dv.getUint16(0) != _Data_Constants_DataHeaders_js__WEBPACK_IMPORTED_MODULE_3__.DVEMessageHeader &&
            dv.getUint16(2) != _Data_Constants_DataHeaders_js__WEBPACK_IMPORTED_MODULE_3__.WorldDataHeaders.column) {
            throw new Error(`Column at ${location} is not the correct format.`);
        }
        const chunks = [];
        const columnSAB = new SharedArrayBuffer(this.columns.getBufferSize());
        const columnArray = new Uint8Array(columnSAB);
        let offset = this._readDataIntoBuffer(0, columnArray, columnBuffer, 0, this.columns.getBufferSize());
        const columnBufferLength = columnBuffer.byteLength;
        while (offset < columnBufferLength) {
            const dataType = dv.getUint16(offset + 2);
            if (dataType == _Data_Constants_DataHeaders_js__WEBPACK_IMPORTED_MODULE_3__.WorldDataHeaders.chunk) {
                const chunkSAB = new SharedArrayBuffer(this.chunks.getBufferSize());
                const chunkArray = new Uint8Array(chunkSAB);
                offset += this._readDataIntoBuffer(0, chunkArray, columnBuffer, offset, this.chunks.getBufferSize());
                chunks.push(chunkSAB);
                continue;
            }
            throw new Error(`Error loading column at: ${location}`);
        }
        return {
            column: columnSAB,
            chunks: chunks,
        };
    },
    _readDataIntoBuffer(offset, target, source, sourceOffset = 0, sourceLength = -1) {
        const bufferArray = new Uint8Array(source, sourceOffset, sourceLength == -1 ? source.byteLength : sourceLength);
        let i = bufferArray.length;
        while (i--) {
            target[i + offset] = bufferArray[i];
        }
        return bufferArray.length;
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/DataLoader/Tasks/DataLoaderTasks.js":
/*!*******************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/DataLoader/Tasks/DataLoaderTasks.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataLoaderTasks": () => (/* binding */ DataLoaderTasks)
/* harmony export */ });
/* harmony import */ var _DivineVoxelEngineDataLoader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DivineVoxelEngineDataLoader.js */ "../../DSLIBS/divineVoxelEngine/dist/DataLoader/DivineVoxelEngineDataLoader.js");
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");
/* harmony import */ var _DataLoader_DataHandler_DataHandlerWrapper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../DataLoader/DataHandler/DataHandlerWrapper.js */ "../../DSLIBS/divineVoxelEngine/dist/DataLoader/DataHandler/DataHandlerWrapper.js");
/* harmony import */ var _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Data/World/WorldRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldRegister.js");
/* harmony import */ var _Global_Util_SafeInterval_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Global/Util/SafeInterval.js */ "../../DSLIBS/divineVoxelEngine/dist/Global/Util/SafeInterval.js");





const DataLoaderTasks = {
    loadRegionHeader: threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.registerTasks("load-region-header", async (data, onDone) => {
        const success = await _DataLoader_DataHandler_DataHandlerWrapper_js__WEBPACK_IMPORTED_MODULE_2__.DataHanlderWrapper.loadRegionHeader(data);
        return onDone ? onDone(success) : false;
    }, "deferred"),
    saveColumn: threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.registerTasks("save-column", async (data, onDone) => {
        await _DataLoader_DataHandler_DataHandlerWrapper_js__WEBPACK_IMPORTED_MODULE_2__.DataHanlderWrapper.saveColumn(data);
        return onDone ? onDone() : false;
    }, "deferred"),
    loadColumn: threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.registerTasks("load-column", async (data, onDone) => {
        if (_Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_3__.WorldRegister.column.get(data)) {
            if (onDone) {
                onDone();
            }
            return;
        }
        await _DataLoader_DataHandler_DataHandlerWrapper_js__WEBPACK_IMPORTED_MODULE_2__.DataHanlderWrapper.loadColumn(data);
        const inte = new _Global_Util_SafeInterval_js__WEBPACK_IMPORTED_MODULE_4__.SafeInterval().setInterval(1).setOnRun(() => {
            if (_Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_3__.WorldRegister.column.get(data)) {
                onDone ? onDone(true) : false;
                inte.stop();
            }
        });
        inte.stop();
    }, "deferred"),
    unLoadColumn: threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.registerTasks("unload-column", async (data, onDone) => {
        if (!_Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_3__.WorldRegister.column.get(data)) {
            if (onDone)
                onDone();
            return;
        }
        await _DataLoader_DataHandler_DataHandlerWrapper_js__WEBPACK_IMPORTED_MODULE_2__.DataHanlderWrapper.unLoadColumn(data);
        _DivineVoxelEngineDataLoader_js__WEBPACK_IMPORTED_MODULE_0__.DVEDL.worldComm.runPromiseTasks("unload-column", data, [], () => {
            if (onDone)
                onDone();
        });
    }, "deferred"),
    setPath: threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.registerTasks("set-path", async (data, onDone) => {
        await _DataLoader_DataHandler_DataHandlerWrapper_js__WEBPACK_IMPORTED_MODULE_2__.DataHanlderWrapper.setPath(data[0]);
        return onDone ? onDone() : false;
    }, "deferred"),
    columnExists: threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.registerTasks("column-exists", async (data, onDone) => {
        if (_Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_3__.WorldRegister.column.get(data)) {
            if (onDone) {
                onDone();
            }
            return;
        }
        const exists = await _DataLoader_DataHandler_DataHandlerWrapper_js__WEBPACK_IMPORTED_MODULE_2__.DataHanlderWrapper.columnExists(data);
        if (onDone) {
            onDone(exists);
        }
        return false;
    }, "deferred"),
    columnTimestamp: threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.registerTasks("column-timestamp", async (data, onDone) => {
        const time = await _DataLoader_DataHandler_DataHandlerWrapper_js__WEBPACK_IMPORTED_MODULE_2__.DataHanlderWrapper.columnTimestamp(data);
        if (onDone) {
            onDone(time);
        }
        return 0;
    }, "deferred"),
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/DataLoader/Threads/DataLoaderThreadState.js":
/*!***************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/DataLoader/Threads/DataLoaderThreadState.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataLoaderThreadState": () => (/* binding */ DataLoaderThreadState)
/* harmony export */ });
/* harmony import */ var _DataLoaderThreads_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DataLoaderThreads.js */ "../../DSLIBS/divineVoxelEngine/dist/DataLoader/Threads/DataLoaderThreads.js");

const DataLoaderThreadState = {
    _settingsSynced: false,
    isReady() {
        return _DataLoaderThreads_js__WEBPACK_IMPORTED_MODULE_0__.WorldComm.isPortSet() && this._settingsSynced;
    }
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/DataLoader/Threads/DataLoaderThreads.js":
/*!***********************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/DataLoader/Threads/DataLoaderThreads.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParentComm": () => (/* binding */ ParentComm),
/* harmony export */   "RichWorldComm": () => (/* binding */ RichWorldComm),
/* harmony export */   "WorldComm": () => (/* binding */ WorldComm)
/* harmony export */ });
/* harmony import */ var _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Data/Settings/EngineSettings.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Settings/EngineSettings.js");
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");
/* harmony import */ var _DataLoaderThreadState_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DataLoaderThreadState.js */ "../../DSLIBS/divineVoxelEngine/dist/DataLoader/Threads/DataLoaderThreadState.js");
/* harmony import */ var _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Data/DataHooks.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/DataHooks.js");




const ParentComm = threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.parent;
const RichWorldComm = threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.createComm("rich-world");
const WorldComm = threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.createComm("world");
threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.registerTasks("sync-settings", (settings) => {
    _DataLoaderThreadState_js__WEBPACK_IMPORTED_MODULE_2__.DataLoaderThreadState._settingsSynced = true;
    _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_0__.EngineSettings.syncSettings(settings);
    _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_3__.DataHooks.settingsSynced.run(settings);
});


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/DataLoader/index.js":
/*!***************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/DataLoader/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DVEDL": () => (/* reexport safe */ _DivineVoxelEngineDataLoader_js__WEBPACK_IMPORTED_MODULE_0__.DVEDL)
/* harmony export */ });
/* harmony import */ var _DivineVoxelEngineDataLoader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DivineVoxelEngineDataLoader.js */ "../../DSLIBS/divineVoxelEngine/dist/DataLoader/DivineVoxelEngineDataLoader.js");



/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/Constants/DataHeaders.js":
/*!*************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/Constants/DataHeaders.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DVEMessageHeader": () => (/* binding */ DVEMessageHeader),
/* harmony export */   "WorldDataHeaders": () => (/* binding */ WorldDataHeaders)
/* harmony export */ });
const DVEMessageHeader = 0xffff;
const WorldDataHeaders = {
    region: 0,
    column: 1,
    chunk: 2,
};


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

/***/ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/RichDataTool.js":
/*!**********************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Tools/Data/RichDataTool.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RichDataTool": () => (/* binding */ RichDataTool)
/* harmony export */ });
/* harmony import */ var divine_binary_object_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-binary-object/index.js */ "../../DSLIBS/divineBinaryObject/dist/index.js");
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");
/* harmony import */ var _Classes_LocationBoundTool_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Classes/LocationBoundTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Classes/LocationBoundTool.js");



class RichDataTool extends _Classes_LocationBoundTool_js__WEBPACK_IMPORTED_MODULE_2__.LocationBoundTool {
    segment = "voxels";
    comm;
    _enabled = false;
    constructor() {
        super();
        this.comm = threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.getComm("rich-world");
        if (!this.comm || !this.comm.isPortSet()) {
            this._enabled = false;
            if (this.comm) {
                this.comm.onSetPort(() => {
                    this._enabled = true;
                });
            }
            return;
        }
        if (this.comm.isPortSet()) {
            this._enabled = true;
        }
    }
    isEnabled() {
        return this._enabled;
    }
    setSegment(segment) {
        this.segment = segment;
        return this;
    }
    columnHasData(check) {
        this.comm.runPromiseTasks("has-data", this.location, [], (hadData) => {
            check(hadData);
        });
    }
    columnHasDataAsync() {
        return new Promise((resolve) => {
            this.columnHasData((hasData) => {
                resolve(hasData);
            });
        });
    }
    getData(onDone) {
        this.comm.runPromiseTasks("get-data", [this.location, this.segment], [], (data) => {
            if (!data)
                return onDone(false);
            onDone(divine_binary_object_index_js__WEBPACK_IMPORTED_MODULE_0__.DBO.bufferToObject(data));
        });
    }
    getDataAsync() {
        return new Promise((resolve) => {
            this.getData((data) => {
                resolve(data);
            });
        });
    }
    setData(data, onDone = (data) => { }) {
        const buffer = divine_binary_object_index_js__WEBPACK_IMPORTED_MODULE_0__.DBO.objectToBuffer(data);
        this.comm.runPromiseTasks("set-data", [this.location, this.segment, buffer], [buffer], (success) => {
            onDone(success);
        });
    }
    setDataAsync(data) {
        return new Promise((resolve) => {
            this.setData(data, (updated) => {
                resolve(updated);
            });
        });
    }
    removeData(onDone) {
        this.comm.runPromiseTasks("remove-data", [this.location, this.segment], [], (removed) => {
            onDone(removed);
        });
    }
    removeDataAsync() {
        return new Promise((resolve) => {
            this.removeData((removed) => {
                resolve(removed);
            });
        });
    }
    removeColumn(onDone) {
        this.comm.runPromiseTasks("remove-column", this.location, [], (removed) => {
            onDone(removed);
        });
    }
    removeColumnAsync() {
        return new Promise((resolve) => {
            this.removeData((removed) => {
                resolve(removed);
            });
        });
    }
    getColumn(onDone) {
        this.comm.runPromiseTasks("get-column", this.location, [], (data) => {
            onDone(data);
        });
    }
    getColumnAsync() {
        return new Promise((resolve) => {
            this.getColumn((data) => {
                resolve(data);
            });
        });
    }
    setColumn(column, onDone) {
        this.comm.runPromiseTasks("set-column", [this.location, column], [], (success) => {
            onDone(success);
        });
    }
    setColumnAsync(column) {
        return new Promise((resolve) => {
            this.setColumn(column, (success) => {
                resolve(success);
            });
        });
    }
    releaeAllData() {
        this.comm.runTasks("release-all-data", [], []);
    }
}


/***/ }),

/***/ "../../DSLIBS/dvePlugins/Data/dist/Broswer/DataBase/WorldDataBase.js":
/*!***************************************************************************!*\
  !*** ../../DSLIBS/dvePlugins/Data/dist/Broswer/DataBase/WorldDataBase.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorldDataBase": () => (/* binding */ WorldDataBase)
/* harmony export */ });
const WorldDataBase = {
    database: {},
    dimension: "",
    typeStores: {},
    async setDimension(dimensionId) {
        if (this.dimension != dimensionId) {
            const worldDataId = `${dimensionId}-world-data`;
            const richDataId = `${dimensionId}-rich-data`;
            const entitiesId = `${dimensionId}-entities`;
            const dboId = `${dimensionId}-dbo`;
            this.database.close();
            await this.database.addCollection([
                {
                    name: worldDataId,
                    schema: [],
                },
                {
                    name: richDataId,
                    schema: [],
                },
                {
                    name: entitiesId,
                    schema: [],
                },
                {
                    name: dboId,
                    schema: [],
                },
            ]);
            this.typeStores["world-data"] = await this.database.getCollection(worldDataId);
            this.typeStores["rich-data"] = await this.database.getCollection(richDataId);
            this.typeStores["entities"] = await this.database.getCollection(entitiesId);
            this.typeStores["dbo"] = await this.database.getCollection(dboId);
        }
        this.dimension = dimensionId;
    },
    setDataBase(database) {
        this.dimension = "";
        this.database = database;
        //@ts-ignore
        this.typeStores = {};
    },
    regionHeader: {
        async set(key, type, data) {
            await WorldDataBase.typeStores[type].set(this._getKey(key, type), data);
        },
        async get(key, type) {
            const buffer = (await WorldDataBase.typeStores[type].get(this._getKey(key, type)));
            if (!buffer)
                return false;
            return buffer;
        },
        _getKey(key, type) {
            return `${key}_${type}_region_header`;
        },
    },
    column: {
        async set(key, type, data) {
            await WorldDataBase.typeStores[type].set(this._getKey(key, type), data);
        },
        async get(key, type) {
            const buffer = (await WorldDataBase.typeStores[type].get(this._getKey(key, type)));
            if (!buffer)
                return false;
            return await buffer;
        },
        _getKey(key, type) {
            return `${key}_${type}_column`;
        },
    },
    columnTimestamp: {
        async set(key, type, timeStamp) {
            await WorldDataBase.typeStores[type].set(this._getKey(key, type), timeStamp);
        },
        async get(key, type) {
            const timeStamp = (await WorldDataBase.typeStores[type].get(this._getKey(key, type)));
            if (!timeStamp)
                return false;
            return Number(timeStamp);
        },
        _getKey(key, type) {
            return `${key}_${type}_column_timestamp`;
        },
    },
};


/***/ }),

/***/ "../../DSLIBS/dvePlugins/Data/dist/Broswer/DivineVoxelEngineDataClient.js":
/*!********************************************************************************!*\
  !*** ../../DSLIBS/dvePlugins/Data/dist/Broswer/DivineVoxelEngineDataClient.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DVEDBrowser": () => (/* binding */ DVEDBrowser)
/* harmony export */ });
/* harmony import */ var zeneithdb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zeneithdb */ "../../DSLIBS/zeneithDB/dist/index.js");
/* harmony import */ var _DataBase_WorldDataBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DataBase/WorldDataBase.js */ "../../DSLIBS/dvePlugins/Data/dist/Broswer/DataBase/WorldDataBase.js");


const DVEDBrowser = {
    async $INIT() {
        await zeneithdb__WEBPACK_IMPORTED_MODULE_0__.ZeneithDB.$INIT();
    },
    async getWorldDataBase(dbName, dimension = "main") {
        let db;
        const existanceCheck = await zeneithdb__WEBPACK_IMPORTED_MODULE_0__.ZeneithDB.databaseExists(dbName);
        if (!existanceCheck) {
            db = await zeneithdb__WEBPACK_IMPORTED_MODULE_0__.ZeneithDB.createDatabase({
                databaseName: dbName,
                collections: [
                    {
                        name: "world-meta",
                        schema: [],
                    },
                ],
            });
            _DataBase_WorldDataBase_js__WEBPACK_IMPORTED_MODULE_1__.WorldDataBase.setDataBase(db);
        }
        else {
            db = await zeneithdb__WEBPACK_IMPORTED_MODULE_0__.ZeneithDB.getDatabase(dbName);
            _DataBase_WorldDataBase_js__WEBPACK_IMPORTED_MODULE_1__.WorldDataBase.setDataBase(db);
        }
        return _DataBase_WorldDataBase_js__WEBPACK_IMPORTED_MODULE_1__.WorldDataBase;
    },
    async deleteWorldDataBase(dbName) {
        await zeneithdb__WEBPACK_IMPORTED_MODULE_0__.ZeneithDB.deleteDatabase(dbName);
    },
};


/***/ }),

/***/ "../../DSLIBS/dvePlugins/Data/dist/Broswer/index.js":
/*!**********************************************************!*\
  !*** ../../DSLIBS/dvePlugins/Data/dist/Broswer/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DVEDBrowser": () => (/* reexport safe */ _DivineVoxelEngineDataClient_js__WEBPACK_IMPORTED_MODULE_0__.DVEDBrowser),
/* harmony export */   "WorldDataBase": () => (/* reexport safe */ _DataBase_WorldDataBase_js__WEBPACK_IMPORTED_MODULE_1__.WorldDataBase)
/* harmony export */ });
/* harmony import */ var _DivineVoxelEngineDataClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DivineVoxelEngineDataClient.js */ "../../DSLIBS/dvePlugins/Data/dist/Broswer/DivineVoxelEngineDataClient.js");
/* harmony import */ var _DataBase_WorldDataBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DataBase/WorldDataBase.js */ "../../DSLIBS/dvePlugins/Data/dist/Broswer/DataBase/WorldDataBase.js");




/***/ }),

/***/ "../../DSLIBS/zeneithDB/dist/ZeneithDB/Classes/Errors.js":
/*!***************************************************************!*\
  !*** ../../DSLIBS/zeneithDB/dist/ZeneithDB/Classes/Errors.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZeneithError": () => (/* binding */ ZeneithError)
/* harmony export */ });
/* harmony import */ var _ZeneithDB_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ZeneithDB.js */ "../../DSLIBS/zeneithDB/dist/ZeneithDB/ZeneithDB.js");
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");


class ZeneithError extends Error {
    constructor(message, data) {
        super();
        console.group();
        console.error(`[ZDB ERROR: ${new Date().toLocaleTimeString()}]
   [THREAD: name: ${threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.threadName} number: ${threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.threadName} parent : ${threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.parent.name}]
   ${message}`, data);
        console.table(_ZeneithDB_js__WEBPACK_IMPORTED_MODULE_0__.ZeneithDB.core.loadedDatabases);
        console.groupEnd();
    }
}


/***/ }),

/***/ "../../DSLIBS/zeneithDB/dist/ZeneithDB/Classes/SecureIDBWrap.js":
/*!**********************************************************************!*\
  !*** ../../DSLIBS/zeneithDB/dist/ZeneithDB/Classes/SecureIDBWrap.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SecureIDBWrap": () => (/* binding */ SecureIDBWrap)
/* harmony export */ });
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");
/* harmony import */ var _ZeneithDB_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ZeneithDB.js */ "../../DSLIBS/zeneithDB/dist/ZeneithDB/ZeneithDB.js");


class SecureIDBWrap {
    id;
    data;
    static dbs = new Map();
    static clear(id) {
        const cdb = SecureIDBWrap.dbs.get(id);
        if (!cdb)
            return;
        cdb.close();
        SecureIDBWrap.dbs.delete(id);
    }
    connectionId = crypto.randomUUID();
    constructor(id, data) {
        this.id = id;
        this.data = data;
        if (SecureIDBWrap.dbs.get(id)) {
            const cdb = SecureIDBWrap.dbs.get(id);
            cdb.close();
        }
        SecureIDBWrap.dbs.set(this.id, data);
        _ZeneithDB_js__WEBPACK_IMPORTED_MODULE_1__.ZeneithDB.core.dataBase.setData("meta", `${this.connectionId}-${id}`, {
            time: new Date().toLocaleTimeString(),
            dataBaseId: id,
            thread: {
                name: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.threadName,
                number: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.threadNumber,
                parent: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.parent.name,
            },
        });
    }
    get() {
        return this.data;
    }
    null() {
        SecureIDBWrap.clear(this.id);
        _ZeneithDB_js__WEBPACK_IMPORTED_MODULE_1__.ZeneithDB.core.dataBase.removeData("meta", `${this.connectionId}-${this.id}`);
    }
}



/***/ }),

/***/ "../../DSLIBS/zeneithDB/dist/ZeneithDB/Core/ZeneithDBCore.js":
/*!*******************************************************************!*\
  !*** ../../DSLIBS/zeneithDB/dist/ZeneithDB/Core/ZeneithDBCore.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZeneithDBCore": () => (/* binding */ ZeneithDBCore)
/* harmony export */ });
/* harmony import */ var _Database_Database_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Database/Database.js */ "../../DSLIBS/zeneithDB/dist/ZeneithDB/Database/Database.js");
/* harmony import */ var _ZeneithUtil_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ZeneithUtil.js */ "../../DSLIBS/zeneithDB/dist/ZeneithDB/ZeneithUtil.js");
/* harmony import */ var _ZeneithTasks_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ZeneithTasks.js */ "../../DSLIBS/zeneithDB/dist/ZeneithDB/Core/ZeneithTasks.js");
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");




(0,_ZeneithTasks_js__WEBPACK_IMPORTED_MODULE_2__.RegisterZeneithTasks)();
const ZeneithDBCore = {
    dataBase: {},
    __version: 1,
    loadedDatabases: {},
    util: _ZeneithUtil_js__WEBPACK_IMPORTED_MODULE_1__.ZeneithUtil,
    async initialize() {
        this.dataBase = new _Database_Database_js__WEBPACK_IMPORTED_MODULE_0__.DataBase({
            databaseName: "ZeneithDB",
            collections: [
                {
                    name: "meta",
                    schema: [],
                },
                {
                    name: "collections",
                    schema: [],
                },
                {
                    name: "databases",
                    schema: [],
                },
            ],
        }, true);
        const version = await this.dataBase.getDatabaeVersion();
        if (version != this.__version + 1) {
            console.warn("ZeneithDB is being created.");
            await this.dataBase.__create();
        }
        await this.dataBase.open();
        await this.dataBase.removeAllData("meta");
    },
    async createDataBase(data) {
        if (this.loadedDatabases[data.databaseName])
            return this.loadedDatabases[data.databaseName];
        const databaseCheck = await this.dataBase.getData("databases", data.databaseName);
        if (databaseCheck) {
            throw new Error(`The database ${data.databaseName} already exists. Use 'updateDatabase' to update the database instead.`);
        }
        await this.dataBase.setData("databases", data.databaseName, {
            collectionCount: data.collections.length,
            creationData: data,
        });
        const database = new _Database_Database_js__WEBPACK_IMPORTED_MODULE_0__.DataBase(data);
        this.loadedDatabases[data.databaseName] = database;
        await database.__create();
        return database;
    },
    async updateDatBaseData(data) {
        await this.dataBase.setData("databases", data.databaseName, {
            collectionCount: data.collections.length,
            creationData: data,
        });
    },
    async getDataBase(dataBasename) {
        if (this.loadedDatabases[dataBasename]) {
            return this.loadedDatabases[dataBasename];
        }
        await this.dataBase.open();
        const dataBaseCheck = await this.dataBase.getData("databases", dataBasename);
        if (!dataBaseCheck) {
            throw new Error(`The database ${dataBasename} does not exists inside of ZeneithDB.`);
        }
        const database = new _Database_Database_js__WEBPACK_IMPORTED_MODULE_0__.DataBase(dataBaseCheck.creationData);
        this.loadedDatabases[dataBasename] = database;
        return database;
    },
    async dataBaseExist(dataBasename) {
        const check = await this.dataBase.getData("databases", dataBasename);
        if (!check) {
            return false;
        }
        else {
            return true;
        }
    },
    async deleteDataBase(dataBasename) {
        delete this.loadedDatabases[dataBasename];
        await this.dataBase.open();
        const check = await this.dataBase.getData("databases", dataBasename);
        if (!check) {
            return false;
        }
        this.dataBase.removeData("databases", dataBasename);
        for (const collection of check.creationData.collections) {
            await this.dataBase.removeData("collections", `${dataBasename}-${collection.name}`);
        }
        indexedDB.deleteDatabase(dataBasename);
    },
    tasks: {
        close(comm, id) {
            return new Promise(async (resolve, reject) => {
                console.log("closing ", id, comm instanceof threadcomm__WEBPACK_IMPORTED_MODULE_3__.CommBase);
                if (comm instanceof threadcomm__WEBPACK_IMPORTED_MODULE_3__.CommBase) {
                    return comm.runPromiseTasks("zdb-close-database", id, [], () => {
                        resolve(true);
                    });
                }
                if (comm instanceof threadcomm__WEBPACK_IMPORTED_MODULE_3__.CommManager) {
                    await Promise.all(comm.__comms.map((_) => new Promise((r) => {
                        _.runPromiseTasks("zdb-close-database", id, [], () => {
                            r(true);
                            console.log(id, "close", _.name);
                        });
                    })));
                    return resolve(true);
                }
                reject(false);
            });
        },
        open(comm, id) {
            return new Promise(async (resolve, reject) => {
                if (comm instanceof threadcomm__WEBPACK_IMPORTED_MODULE_3__.CommBase) {
                    return comm.runPromiseTasks("zdb-open-database", id, [], () => {
                        resolve(true);
                    });
                }
                if (comm instanceof threadcomm__WEBPACK_IMPORTED_MODULE_3__.CommManager) {
                    await Promise.all(comm.__comms.map((_) => new Promise((r) => {
                        _.runPromiseTasks("zdb-open-database", id, [], () => {
                            r(true);
                        });
                    })));
                    return resolve(true);
                }
                reject(false);
            });
        },
    },
};


/***/ }),

/***/ "../../DSLIBS/zeneithDB/dist/ZeneithDB/Core/ZeneithTasks.js":
/*!******************************************************************!*\
  !*** ../../DSLIBS/zeneithDB/dist/ZeneithDB/Core/ZeneithTasks.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegisterZeneithTasks": () => (/* binding */ RegisterZeneithTasks)
/* harmony export */ });
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");
/* harmony import */ var _ZeneithDBCore_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ZeneithDBCore.js */ "../../DSLIBS/zeneithDB/dist/ZeneithDB/Core/ZeneithDBCore.js");


function RegisterZeneithTasks() {
    threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.registerTasks("zdb-close-database", async (dbId, onDone) => {
        const db = _ZeneithDBCore_js__WEBPACK_IMPORTED_MODULE_1__.ZeneithDBCore.loadedDatabases[dbId];
        if (!db)
            return;
        await db.waitTillTranscationDone();
        db.close();
        if (onDone)
            onDone();
    }, "deferred");
    threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.registerTasks("zdb-open-database", async (dbId, onDone) => {
        const db = _ZeneithDBCore_js__WEBPACK_IMPORTED_MODULE_1__.ZeneithDBCore.loadedDatabases[dbId];
        if (!db)
            return;
        await db.waitTillTranscationDone();
        db.open();
        if (onDone)
            onDone();
    }, "deferred");
}


/***/ }),

/***/ "../../DSLIBS/zeneithDB/dist/ZeneithDB/Database/Database.js":
/*!******************************************************************!*\
  !*** ../../DSLIBS/zeneithDB/dist/ZeneithDB/Database/Database.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataBase": () => (/* binding */ DataBase)
/* harmony export */ });
/* harmony import */ var _Core_ZeneithDBCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Core/ZeneithDBCore.js */ "../../DSLIBS/zeneithDB/dist/ZeneithDB/Core/ZeneithDBCore.js");
/* harmony import */ var _ZeneithUtil_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ZeneithUtil.js */ "../../DSLIBS/zeneithDB/dist/ZeneithDB/ZeneithUtil.js");
/* harmony import */ var _Store_ObjectStore_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Store/ObjectStore.js */ "../../DSLIBS/zeneithDB/dist/ZeneithDB/Store/ObjectStore.js");
/* harmony import */ var _Classes_Errors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Classes/Errors.js */ "../../DSLIBS/zeneithDB/dist/ZeneithDB/Classes/Errors.js");
/* harmony import */ var _Classes_SecureIDBWrap_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Classes/SecureIDBWrap.js */ "../../DSLIBS/zeneithDB/dist/ZeneithDB/Classes/SecureIDBWrap.js");





class DataBase {
    creationData;
    outsideZeneith;
    dataBaseName = "";
    util = _ZeneithUtil_js__WEBPACK_IMPORTED_MODULE_1__.ZeneithUtil;
    opened = false;
    __db = null;
    states = {
        dataUpdating: false,
        collectionUpdate: false,
    };
    get db() {
        return this.__db;
    }
    set db(db) {
        if (this.__db != null && db != null) {
            throw new _Classes_Errors_js__WEBPACK_IMPORTED_MODULE_3__.ZeneithError("Overrode active database.", {
                dataBaseID: this.dataBaseName,
                dataBase: this,
            });
        }
        this.__db = db;
    }
    _beingUpgrded = false;
    _openeed = [];
    _closed = [];
    _activeTransaction = null;
    constructor(creationData, outsideZeneith = false) {
        this.creationData = creationData;
        this.outsideZeneith = outsideZeneith;
        this.dataBaseName = this.creationData.databaseName;
    }
    __open(version) {
        this._openeed.push(performance.now());
        if (this.db)
            this.close();
        this.db = null;
        _Classes_SecureIDBWrap_js__WEBPACK_IMPORTED_MODULE_4__.SecureIDBWrap.clear(this.dataBaseName);
        return indexedDB.open(this.dataBaseName, version);
    }
    isOpen() {
        return this.db !== null;
    }
    getUUID() {
        return _ZeneithUtil_js__WEBPACK_IMPORTED_MODULE_1__.ZeneithUtil.getUUID();
    }
    open() {
        if (this._beingUpgrded) {
            throw new _Classes_Errors_js__WEBPACK_IMPORTED_MODULE_3__.ZeneithError("Tried opening while updating", {
                dataBase: this,
                dataBaseID: this.dataBaseName,
                functionName: this.open.name,
            });
        }
        if (this.isOpen())
            return true;
        const prom = new Promise((resolve, reject) => {
            const request = this.__open();
            request.onerror = (event) => {
                reject(false);
                throw new _Classes_Errors_js__WEBPACK_IMPORTED_MODULE_3__.ZeneithError("Opening a database failed.", {
                    dataBaseID: this.dataBaseName,
                    event: event,
                });
            };
            request.onblocked = (event) => {
                reject(false);
                throw new _Classes_Errors_js__WEBPACK_IMPORTED_MODULE_3__.ZeneithError("Opening a database was blocked", {
                    blocked: true,
                    dataBaseID: this.dataBaseName,
                    event: event,
                });
            };
            request.onsuccess = (event) => {
                this.db = new _Classes_SecureIDBWrap_js__WEBPACK_IMPORTED_MODULE_4__.SecureIDBWrap(this.dataBaseName, request.result);
                this.opened = true;
                resolve(true);
            };
        });
        return prom;
    }
    close() {
        this._closed.push(performance.now());
        if (!this.db) {
            return false;
        }
        this.opened = false;
        this.db.null();
        this.db = null;
        return true;
    }
    _openAtVersion(version = 1) {
        const prom = new Promise(async (resolve, reject) => {
            const request = this.__open(version);
            request.onerror = (event) => {
                reject(false);
                throw new _Classes_Errors_js__WEBPACK_IMPORTED_MODULE_3__.ZeneithError("Opening a database failed.", {
                    dataBaseID: this.dataBaseName,
                    event: event,
                    dataBase: this,
                    functionName: this._openAtVersion.name,
                });
            };
            request.onblocked = (event) => {
                reject(false);
                throw new _Classes_Errors_js__WEBPACK_IMPORTED_MODULE_3__.ZeneithError("Opening a database was blocked", {
                    blocked: true,
                    dataBaseID: this.dataBaseName,
                    event: event,
                    dataBase: this,
                    functionName: this._openAtVersion.name,
                });
            };
            request.onsuccess = (event) => {
                this.db = new _Classes_SecureIDBWrap_js__WEBPACK_IMPORTED_MODULE_4__.SecureIDBWrap(this.dataBaseName, request.result);
                this.opened = true;
                resolve(true);
            };
        });
        return prom;
    }
    async __create() {
        return await this.forceUpdate(undefined, true);
    }
    async forceUpdate(removeCollections, newDB = false) {
        let version = newDB ? 1 : await this.getDatabaeVersion();
        if (this._beingUpgrded) {
            throw new _Classes_Errors_js__WEBPACK_IMPORTED_MODULE_3__.ZeneithError("Tried updating while already updating", {
                dataBase: this,
                dataBaseID: this.dataBaseName,
                functionName: this.forceUpdate.name,
            });
        }
        this._beingUpgrded = true;
        this.close();
        return new Promise((resolve, reject) => {
            const request = this.__open(version + 1);
            request.onerror = (event) => {
                this._beingUpgrded = false;
                reject(false);
                throw new _Classes_Errors_js__WEBPACK_IMPORTED_MODULE_3__.ZeneithError("Force update ran into an error.", {
                    dataBaseID: this.dataBaseName,
                    event: event,
                    dataBase: this,
                    functionName: this.forceUpdate.name,
                });
            };
            request.onblocked = (event) => {
                this._beingUpgrded = false;
                reject(false);
                throw new _Classes_Errors_js__WEBPACK_IMPORTED_MODULE_3__.ZeneithError("Force update was blocked.", {
                    blocked: true,
                    dataBaseID: this.dataBaseName,
                    event: event,
                    dataBase: this,
                    functionName: this.forceUpdate.name,
                });
            };
            request.onupgradeneeded = (event) => {
                const db = new _Classes_SecureIDBWrap_js__WEBPACK_IMPORTED_MODULE_4__.SecureIDBWrap(this.dataBaseName, request.result);
                this.db = db;
                if (!this.outsideZeneith) {
                    _Core_ZeneithDBCore_js__WEBPACK_IMPORTED_MODULE_0__.ZeneithDBCore.updateDatBaseData(this.creationData);
                }
                if (removeCollections) {
                    for (const collectionName of removeCollections) {
                        db.get().deleteObjectStore(collectionName);
                    }
                }
                for (const collectionData of this.creationData.collections) {
                    if (db.get().objectStoreNames.contains(collectionData.name))
                        continue;
                    this._processCollectionScehma(db.get().createObjectStore(collectionData.name), collectionData.schema);
                }
            };
            request.onsuccess = (event) => {
                if (!this.db)
                    this.db = new _Classes_SecureIDBWrap_js__WEBPACK_IMPORTED_MODULE_4__.SecureIDBWrap(this.dataBaseName, request.result);
                this.close();
                resolve(true);
                this._beingUpgrded = false;
            };
        });
    }
    _processCollectionScehma(collection, schema) {
        this.__traverseColletionScehma(collection, schema);
    }
    __traverseColletionScehma(collection, schema) {
        for (const node of schema) {
            if (Array.isArray(node)) {
                this.__traverseColletionScehma(collection, node);
                continue;
            }
            if (node.index) {
                collection.createIndex(node.name, node.name, { unique: node.isUnique });
            }
            if (node.children) {
                this.__traverseColletionScehma(collection, node.children);
            }
        }
    }
    async getCollection(id) {
        if (!this.isOpen())
            await this.open();
        if (!this.db?.get().objectStoreNames.contains(id)) {
            throw new Error(`${id} does not exists in database ${this.creationData.databaseName}`);
        }
        return new _Store_ObjectStore_js__WEBPACK_IMPORTED_MODULE_2__.ObjectStore(this, id);
    }
    async addCollection(data) {
        if (this._beingUpgrded) {
            throw new _Classes_Errors_js__WEBPACK_IMPORTED_MODULE_3__.ZeneithError("Tried adding collections while updating", {
                dataBase: this,
                dataBaseID: this.dataBaseName,
                functionName: this.addCollection.name,
            });
        }
        try {
            if (!this.isOpen())
                await this.open();
            let count = 0;
            for (const store of data) {
                if (this.db.get().objectStoreNames.contains(store.name))
                    continue;
                this.creationData.collections.push(store);
                count++;
            }
            this.close();
            if (count)
                await this.forceUpdate();
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
    async removeCollection(collectionName) {
        if (this._beingUpgrded) {
            throw new _Classes_Errors_js__WEBPACK_IMPORTED_MODULE_3__.ZeneithError("Tried removing collections while updating", {
                dataBase: this,
                dataBaseID: this.dataBaseName,
                functionName: this.removeCollection.name,
            });
        }
        try {
            let deleteCollections = [];
            if (typeof collectionName == "string") {
                deleteCollections.push(collectionName);
            }
            else {
                deleteCollections.push(...collectionName);
            }
            const collections = [];
            for (const collection of this.creationData.collections) {
                if (!deleteCollections.includes(collection.name)) {
                    collections.push(collection);
                }
            }
            this.creationData.collections = collections;
            await this.forceUpdate(deleteCollections);
            return true;
        }
        catch (error) {
            console.log(`Failed making a new collection with the name ${collectionName}`);
            console.error(error);
            return false;
        }
    }
    getDatabaeVersion() {
        if (this.db)
            return this.db.get().version;
        const prom = new Promise((resolve, reject) => {
            const request = this.__open();
            request.onsuccess = (event) => {
                const version = request.result.version;
                this.db = new _Classes_SecureIDBWrap_js__WEBPACK_IMPORTED_MODULE_4__.SecureIDBWrap(this.dataBaseName, request.result);
                this.close();
                resolve(version);
            };
            request.onerror = (event) => {
                reject(false);
                throw new _Classes_Errors_js__WEBPACK_IMPORTED_MODULE_3__.ZeneithError("Get version ran into an error.", {
                    dataBaseID: this.dataBaseName,
                    event: event,
                    dataBase: this,
                    functionName: this.getDatabaeVersion.name,
                });
            };
            request.onblocked = (event) => {
                this._beingUpgrded = false;
                reject(false);
                this.getDatabaeVersion.name;
                throw new _Classes_Errors_js__WEBPACK_IMPORTED_MODULE_3__.ZeneithError("Get version was blocked.", {
                    blocked: true,
                    dataBaseID: this.dataBaseName,
                    event: event,
                    dataBase: this,
                    functionName: this.getDatabaeVersion.name,
                });
            };
        });
        return prom;
    }
    doesCollectionExist(collectionName) {
        if (!this.db) {
            throw new Error(`Database ${this.dataBaseName} is not opened.`);
        }
        if (this.db.get().objectStoreNames.contains(collectionName)) {
            return true;
        }
        else {
            return false;
        }
    }
    waitTillTranscationDone() {
        return new Promise((resolve) => {
            const inte = setInterval(() => {
                if (this._activeTransaction)
                    return;
                clearInterval(inte);
                resolve(true);
            }, 10);
        });
    }
    waitTillUpdatingDone() {
        return new Promise((resolve) => {
            const inte = setInterval(() => {
                if (this._beingUpgrded)
                    return;
                clearInterval(inte);
                resolve(true);
            }, 10);
        });
    }
    getData(collectionName, key) {
        return new Promise(async (resolve, reject) => {
            await this.waitTillUpdatingDone();
            await this.waitTillTranscationDone();
            if (!this.isOpen())
                await this.open();
            const transaction = this.db.get().transaction([collectionName], "readonly");
            const objectStore = transaction.objectStore(collectionName);
            this._activeTransaction = transaction;
            const request = objectStore.get(key);
            request.onerror = (event) => {
                reject(false);
                this._activeTransaction = null;
                throw new _Classes_Errors_js__WEBPACK_IMPORTED_MODULE_3__.ZeneithError("Error while getting data.", {
                    dataBaseID: this.dataBaseName,
                    event: event,
                    dataBase: this,
                    functionName: "getData",
                });
            };
            transaction.oncomplete = () => {
                this._activeTransaction = null;
                if (!request.result) {
                    resolve(false);
                }
                else {
                    resolve(request.result);
                }
            };
        });
    }
    getAllData(collectionName) {
        return new Promise(async (resolve, reject) => {
            await this.waitTillUpdatingDone();
            await this.waitTillTranscationDone();
            if (!this.isOpen())
                await this.open();
            const transaction = this.db.get().transaction([collectionName], "readonly");
            const request = transaction
                .objectStore(collectionName)
                .getAll();
            this._activeTransaction = transaction;
            request.onerror = (event) => {
                reject(false);
                throw new _Classes_Errors_js__WEBPACK_IMPORTED_MODULE_3__.ZeneithError("Error while getting all data.", {
                    dataBaseID: this.dataBaseName,
                    event: event,
                    dataBase: this,
                    functionName: "getAllData",
                });
            };
            transaction.oncomplete = () => {
                this._activeTransaction = null;
                if (!request.result) {
                    resolve(false);
                }
                else {
                    resolve(request.result);
                }
            };
        });
    }
    getAllKeys(collectionName) {
        return new Promise(async (resolve, reject) => {
            await this.waitTillUpdatingDone();
            await this.waitTillTranscationDone();
            if (!this.isOpen())
                await this.open();
            const transaction = this.db.get().transaction([collectionName], "readonly");
            const request = transaction
                .objectStore(collectionName)
                .getAllKeys();
            this._activeTransaction = transaction;
            request.onerror = (event) => {
                reject(false);
                throw new _Classes_Errors_js__WEBPACK_IMPORTED_MODULE_3__.ZeneithError("Error while getting all keys.", {
                    dataBaseID: this.dataBaseName,
                    event: event,
                    dataBase: this,
                    functionName: "getAllKeys",
                });
            };
            transaction.oncomplete = () => {
                this._activeTransaction = null;
                if (!request.result) {
                    resolve(false);
                }
                else {
                    resolve(request.result);
                }
            };
        });
    }
    removeData(collectionName, key) {
        this.states.dataUpdating = true;
        return new Promise(async (resolve, reject) => {
            await this.waitTillUpdatingDone();
            await this.waitTillTranscationDone();
            if (!this.isOpen())
                await this.open();
            const transaction = this.db.get().transaction([collectionName], "readwrite");
            const request = transaction.objectStore(collectionName).delete(key);
            this._activeTransaction = transaction;
            request.onerror = (event) => {
                reject(false);
                this._activeTransaction = null;
                throw new _Classes_Errors_js__WEBPACK_IMPORTED_MODULE_3__.ZeneithError("Error while removing data.", {
                    dataBaseID: this.dataBaseName,
                    event: event,
                    dataBase: this,
                    functionName: "removeData",
                });
            };
            transaction.oncomplete = () => {
                resolve(true);
                this._activeTransaction = null;
            };
        });
    }
    removeAllData(collectionName) {
        return new Promise(async (resolve, reject) => {
            await this.waitTillUpdatingDone();
            await this.waitTillTranscationDone();
            if (!this.isOpen())
                await this.open();
            const transaction = this.db.get().transaction([collectionName], "readwrite");
            const request = transaction.objectStore(collectionName).clear();
            this._activeTransaction = transaction;
            request.onerror = (event) => {
                this._activeTransaction = null;
                reject(false);
                throw new _Classes_Errors_js__WEBPACK_IMPORTED_MODULE_3__.ZeneithError("Error while removing all data.", {
                    dataBaseID: this.dataBaseName,
                    event: event,
                    dataBase: this,
                    functionName: "removeAllData",
                });
            };
            transaction.oncomplete = () => {
                resolve(true);
                this._activeTransaction = null;
            };
        });
    }
    setData(collectionName, key, setData) {
        this.states.dataUpdating = true;
        return new Promise(async (resolve, reject) => {
            await this.waitTillUpdatingDone();
            await this.waitTillTranscationDone();
            if (!this.isOpen())
                await this.open();
            const transaction = this.db.get().transaction([collectionName], "readwrite");
            const request = transaction.objectStore(collectionName).put(setData, key);
            this._activeTransaction = transaction;
            request.onerror = (event) => {
                reject(false);
                this._activeTransaction = null;
                throw new _Classes_Errors_js__WEBPACK_IMPORTED_MODULE_3__.ZeneithError("Error while setting data.", {
                    dataBaseID: this.dataBaseName,
                    event: event,
                    dataBase: this,
                    functionName: "setData",
                });
            };
            transaction.oncomplete = () => {
                resolve(true);
                this._activeTransaction = null;
            };
        });
    }
    updateData(collectionName, key, updateFunction) {
        this.states.dataUpdating = true;
        return new Promise(async (resolve, reject) => {
            await this.waitTillUpdatingDone();
            await this.waitTillTranscationDone();
            if (!this.isOpen())
                await this.open();
            const transaction = this.db.get().transaction([collectionName], "readwrite");
            const objectStore = transaction.objectStore(collectionName);
            const request = objectStore.get(key);
            this._activeTransaction = transaction;
            request.onerror = (event) => {
                reject(false);
                this._activeTransaction = null;
                throw new _Classes_Errors_js__WEBPACK_IMPORTED_MODULE_3__.ZeneithError("Error while updating data.", {
                    dataBaseID: this.dataBaseName,
                    event: event,
                    dataBase: this,
                    functionName: "updateData",
                });
            };
            request.onsuccess = (event) => {
                this._activeTransaction = null;
                //@ts-ignore
                const data = event.target.result;
                if (!data) {
                    resolve(false);
                    transaction.commit();
                    return;
                }
                const newData = updateFunction(data);
                const requestUpdate = objectStore.put(newData);
                requestUpdate.onerror = (event) => {
                    this._activeTransaction = null;
                    reject(false);
                    throw new _Classes_Errors_js__WEBPACK_IMPORTED_MODULE_3__.ZeneithError("Error while updating data.", {
                        dataBaseID: this.dataBaseName,
                        event: event,
                        dataBase: this,
                        functionName: "updateData",
                    });
                };
                transaction.oncomplete = () => {
                    this._activeTransaction = null;
                    resolve(true);
                };
            };
        });
    }
}


/***/ }),

/***/ "../../DSLIBS/zeneithDB/dist/ZeneithDB/Meta/Database/Database.types.js":
/*!*****************************************************************************!*\
  !*** ../../DSLIBS/zeneithDB/dist/ZeneithDB/Meta/Database/Database.types.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../DSLIBS/zeneithDB/dist/ZeneithDB/Meta/Database/Schema.types.js":
/*!***************************************************************************!*\
  !*** ../../DSLIBS/zeneithDB/dist/ZeneithDB/Meta/Database/Schema.types.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../DSLIBS/zeneithDB/dist/ZeneithDB/Meta/Zeneith/Database.schema.js":
/*!*****************************************************************************!*\
  !*** ../../DSLIBS/zeneithDB/dist/ZeneithDB/Meta/Zeneith/Database.schema.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../DSLIBS/zeneithDB/dist/ZeneithDB/Meta/index.js":
/*!***********************************************************!*\
  !*** ../../DSLIBS/zeneithDB/dist/ZeneithDB/Meta/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Database_Database_types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Database/Database.types.js */ "../../DSLIBS/zeneithDB/dist/ZeneithDB/Meta/Database/Database.types.js");
/* harmony import */ var _Database_Schema_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Database/Schema.types.js */ "../../DSLIBS/zeneithDB/dist/ZeneithDB/Meta/Database/Schema.types.js");
/* harmony import */ var _Zeneith_Database_schema_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Zeneith/Database.schema.js */ "../../DSLIBS/zeneithDB/dist/ZeneithDB/Meta/Zeneith/Database.schema.js");





/***/ }),

/***/ "../../DSLIBS/zeneithDB/dist/ZeneithDB/Store/ObjectStore.js":
/*!******************************************************************!*\
  !*** ../../DSLIBS/zeneithDB/dist/ZeneithDB/Store/ObjectStore.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObjectStore": () => (/* binding */ ObjectStore)
/* harmony export */ });
class ObjectStore {
    db;
    id;
    constructor(db, id) {
        this.db = db;
        this.id = id;
    }
    async get(id) {
        return await this.db.getData(this.id, id);
    }
    async set(id, data) {
        return await this.db.setData(this.id, id, data);
    }
    async delete(id) {
        return await this.db.removeData(this.id, id);
    }
}


/***/ }),

/***/ "../../DSLIBS/zeneithDB/dist/ZeneithDB/ZeneithDB.js":
/*!**********************************************************!*\
  !*** ../../DSLIBS/zeneithDB/dist/ZeneithDB/ZeneithDB.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZeneithDB": () => (/* binding */ ZeneithDB)
/* harmony export */ });
/* harmony import */ var _Core_ZeneithDBCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Core/ZeneithDBCore.js */ "../../DSLIBS/zeneithDB/dist/ZeneithDB/Core/ZeneithDBCore.js");

const ZeneithDB = {
    __initalized: false,
    core: _Core_ZeneithDBCore_js__WEBPACK_IMPORTED_MODULE_0__.ZeneithDBCore,
    async $INIT() {
        if (this.__initalized)
            return;
        await this.core.initialize();
        this.__initalized = true;
    },
    async databaseExists(dataBaseName) {
        return await this.core.dataBaseExist(dataBaseName);
    },
    async createDatabase(data) {
        return await this.core.createDataBase(data);
    },
    async updateDatabase(data) {
        return await this.core.createDataBase(data);
    },
    async getDatabase(name) {
        return await this.core.getDataBase(name);
    },
    async deleteDatabase(name) {
        return await this.core.deleteDataBase(name);
    },
};


/***/ }),

/***/ "../../DSLIBS/zeneithDB/dist/ZeneithDB/ZeneithUtil.js":
/*!************************************************************!*\
  !*** ../../DSLIBS/zeneithDB/dist/ZeneithDB/ZeneithUtil.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZeneithUtil": () => (/* binding */ ZeneithUtil)
/* harmony export */ });
const ZeneithUtil = {
    getUUID: function () {
        let d = new Date().getTime();
        let d2 = (performance && performance.now && performance.now() * 1000) || 0;
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            let r = Math.random() * 16;
            if (d > 0) {
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            }
            else {
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        });
    },
};


/***/ }),

/***/ "../../DSLIBS/zeneithDB/dist/ZeneithDB/index.js":
/*!******************************************************!*\
  !*** ../../DSLIBS/zeneithDB/dist/ZeneithDB/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataBase": () => (/* reexport safe */ _Database_Database_js__WEBPACK_IMPORTED_MODULE_1__.DataBase),
/* harmony export */   "ObjectStore": () => (/* reexport safe */ _Store_ObjectStore_js__WEBPACK_IMPORTED_MODULE_2__.ObjectStore),
/* harmony export */   "ZeneithDB": () => (/* reexport safe */ _ZeneithDB_js__WEBPACK_IMPORTED_MODULE_0__.ZeneithDB)
/* harmony export */ });
/* harmony import */ var _ZeneithDB_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ZeneithDB.js */ "../../DSLIBS/zeneithDB/dist/ZeneithDB/ZeneithDB.js");
/* harmony import */ var _Database_Database_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Database/Database.js */ "../../DSLIBS/zeneithDB/dist/ZeneithDB/Database/Database.js");
/* harmony import */ var _Store_ObjectStore_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Store/ObjectStore.js */ "../../DSLIBS/zeneithDB/dist/ZeneithDB/Store/ObjectStore.js");





/***/ }),

/***/ "../../DSLIBS/zeneithDB/dist/index.js":
/*!********************************************!*\
  !*** ../../DSLIBS/zeneithDB/dist/index.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataBase": () => (/* reexport safe */ _ZeneithDB_index_js__WEBPACK_IMPORTED_MODULE_0__.DataBase),
/* harmony export */   "ObjectStore": () => (/* reexport safe */ _ZeneithDB_index_js__WEBPACK_IMPORTED_MODULE_0__.ObjectStore),
/* harmony export */   "ZeneithDB": () => (/* reexport safe */ _ZeneithDB_index_js__WEBPACK_IMPORTED_MODULE_0__.ZeneithDB)
/* harmony export */ });
/* harmony import */ var _ZeneithDB_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ZeneithDB/index.js */ "../../DSLIBS/zeneithDB/dist/ZeneithDB/index.js");
/* harmony import */ var _ZeneithDB_Meta_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ZeneithDB/Meta/index.js */ "../../DSLIBS/zeneithDB/dist/ZeneithDB/Meta/index.js");




/***/ }),

/***/ "./node_modules/crystal-compressor/CrystalCompressor/CCCore.js":
/*!*********************************************************************!*\
  !*** ./node_modules/crystal-compressor/CrystalCompressor/CCCore.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CCCore": () => (/* binding */ CCCore)
/* harmony export */ });
const CCCore = {
    async compressArrayBuffer(input) {
        //@ts-ignore
        const cs = new CompressionStream("gzip");
        const writer = cs.writable.getWriter();
        writer.write(input);
        writer.close();
        const output = [];
        const reader = cs.readable.getReader();
        let totalSize = 0;
        while (true) {
            const { value, done } = await reader.read();
            if (done)
                break;
            output.push(value);
            totalSize += value.byteLength;
        }
        const concatenated = new Uint8Array(totalSize);
        let offset = 0;
        for (const array of output) {
            concatenated.set(array, offset);
            offset += array.byteLength;
        }
        return concatenated;
    },
    async decompressArrayBuffer(input) {
        //@ts-ignore
        const ds = new DecompressionStream("gzip");
        const writer = ds.writable.getWriter();
        writer.write(input);
        writer.close();
        const output = [];
        const reader = ds.readable.getReader();
        let totalSize = 0;
        while (true) {
            const { value, done } = await reader.read();
            if (done)
                break;
            output.push(value);
            totalSize += value.byteLength;
        }
        const concatenated = new Uint8Array(totalSize);
        let offset = 0;
        for (const array of output) {
            concatenated.set(array, offset);
            offset += array.byteLength;
        }
        return concatenated;
    },
    processArray(type, array) {
        const returnArray = this.getArray[type](array.buffer);
        return returnArray;
    },
    getArray: {
        Int8: (buffer) => {
            return new Int8Array(buffer);
        },
        Uint8: (buffer) => {
            return new Uint8Array(buffer);
        },
        Uint8Clamped: (buffer) => {
            return new Uint8ClampedArray(buffer);
        },
        Int16: (buffer) => {
            return new Int16Array(buffer);
        },
        Uint16: (buffer) => {
            return new Uint16Array(buffer);
        },
        Int32: (buffer) => {
            return new Int32Array(buffer);
        },
        Uint32: (buffer) => {
            return new Uint32Array(buffer);
        },
        Float32: (buffer) => {
            return new Float32Array(buffer);
        },
        Float64: (buffer) => {
            return new Float64Array(buffer);
        },
        BigInt64: (buffer) => {
            return new BigInt64Array(buffer);
        },
        BigUint64: (buffer) => {
            return new BigUint64Array(buffer);
        },
    },
};


/***/ }),

/***/ "./node_modules/crystal-compressor/CrystalCompressor/CrystalCompressor.js":
/*!********************************************************************************!*\
  !*** ./node_modules/crystal-compressor/CrystalCompressor/CrystalCompressor.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CrystalCompressor": () => (/* binding */ CrystalCompressor)
/* harmony export */ });
/* harmony import */ var _CCCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CCCore.js */ "./node_modules/crystal-compressor/CrystalCompressor/CCCore.js");

const CrystalCompressor = {
    core: _CCCore_js__WEBPACK_IMPORTED_MODULE_0__.CCCore,
    version: 0.0,
    async compressArray(array) {
        const returnArray = await this.core.compressArrayBuffer(array.buffer);
        return returnArray;
    },
    async decompressArray(buffer, type) {
        const returnData = await this.core.decompressArrayBuffer(buffer);
        return this.core.processArray(type, returnData);
    },
};


/***/ }),

/***/ "./node_modules/crystal-compressor/CrystalCompressor/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/crystal-compressor/CrystalCompressor/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CrystalCompressor": () => (/* reexport safe */ _CrystalCompressor_js__WEBPACK_IMPORTED_MODULE_0__.CrystalCompressor)
/* harmony export */ });
/* harmony import */ var _CrystalCompressor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CrystalCompressor.js */ "./node_modules/crystal-compressor/CrystalCompressor/CrystalCompressor.js");



/***/ }),

/***/ "./node_modules/crystal-compressor/index.js":
/*!**************************************************!*\
  !*** ./node_modules/crystal-compressor/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CrystalCompressor": () => (/* reexport safe */ _CrystalCompressor_index_js__WEBPACK_IMPORTED_MODULE_0__.CrystalCompressor)
/* harmony export */ });
/* harmony import */ var _CrystalCompressor_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CrystalCompressor/index.js */ "./node_modules/crystal-compressor/CrystalCompressor/index.js");



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
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["DSLIBS_divineBinaryObject_dist_index_js-DSLIBS_divineVoxelEngine_dist_Common_Threads_Contract-5324f4"], () => (__webpack_require__("./compiled/environments/electron/client/dataloader.js")))
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
/******/ 			"compiled_environments_electron_client_dataloader_js": 1
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
//# sourceMappingURL=compiled_environments_electron_client_dataloader_js.DVE.js.map