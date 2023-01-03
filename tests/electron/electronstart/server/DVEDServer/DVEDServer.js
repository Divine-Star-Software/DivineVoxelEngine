"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DVEDServer = void 0;
var fs = __importStar(require("fs"));
var DivineVoxelEngineData_js_1 = require("../libs/dved/Node/DivineVoxelEngineData.js");
var DVEDSystem_js_1 = require("../libs/dved/Node/DVEDSystem.js");
DivineVoxelEngineData_js_1.DVED.$INIT({
    fs: fs,
    sectorSize: 4096,
    spaceBounds: {
        regions: { x: 9, y: 8, z: 9 },
        columns: { x: 4, y: 8, z: 4 },
        chunks: { x: 4, y: 4, z: 4 },
    },
});
var regionTool = DivineVoxelEngineData_js_1.DVED.getRegionTool();
var dataPath = "D:/DSSoftware/APPS/divinevoxelengine/tests/electron/data";
var setPath = function (id) {
    var path = "".concat(dataPath, "/").concat(id);
    DVEDSystem_js_1.DVEDSystem.mkdirs([path]);
    regionTool.setPath(path);
};
exports.DVEDServer = {
    parseDVEDMessasge: function (message) {
        var jsonString = "";
        var pipeCount = 0;
        var finalCount = 0;
        for (var i = 0; i < message.length; i++) {
            var char = message[i];
            finalCount++;
            if (char == "|") {
                pipeCount++;
                if (pipeCount == 2)
                    break;
                continue;
            }
            jsonString += char;
        }
        return {
            message: JSON.parse(jsonString),
            data: message.substring(finalCount),
        };
    },
    hanldeMessage: function (body) {
        var _a = this.parseDVEDMessasge(body), message = _a.message, data = _a.data;
        console.log(message);
        if (message.type == "set-path") {
            setPath(message.id);
        }
        if (message.type == "save-column") {
            regionTool.setLocation(message.location).saveColumn(data);
            console.log("saving column at ", message.location, "size: ", data.length);
            return new Uint8Array([1]);
        }
        if (message.type == "load-region-header") {
            var exists = regionTool.setLocation(message.location).regionExists();
            if (!exists) {
                regionTool.createRegion();
            }
            var header = regionTool.getHeader();
            if (!header)
                return new Uint8Array([0]);
            return new Uint8Array(header);
        }
        if (message.type == "load-column") {
            var column = regionTool.setLocation(message.location).loadColumn();
            console.log(column);
            console.log("loading column at ", message.location, "size: ", column ? column.byteLength : 0);
            return column ? new Uint8Array(column) : new Uint8Array([0]);
        }
        if (message.type == "column-exists") {
            var exists = regionTool.setLocation(message.location).regionHasColumn();
            return new Uint8Array([Number(exists ? 1 : 0)]);
        }
        if (message.type == "column-timestamp") {
            var timeStamp = regionTool
                .setLocation(message.location)
                .getColumnTimestamp();
            console.log("Get timestamp");
            console.log(timeStamp);
            return new Uint8Array(new Uint32Array([timeStamp ? timeStamp : 0]).buffer);
        }
        return new Uint8Array([1]);
    },
};
