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
const fs = __importStar(require("fs"));
const DivineVoxelEngineData_js_1 = require("../libs/dved/Node/DivineVoxelEngineData.js");
DivineVoxelEngineData_js_1.DVED.$INIT({
    fs: fs,
    dataDirecotry: "dve-testing",
    sectorSize: 4096,
    spaceBounds: {
        regions: { x: 9, y: 8, z: 9 },
        columns: { x: 4, y: 8, z: 4 },
        chunks: { x: 4, y: 4, z: 4 },
    },
});
const regionTool = DivineVoxelEngineData_js_1.DVED.getRegionTool();
regionTool.setLocation(["main", 0, 0, 0]);
console.log("region exists => ", regionTool.regionExists());
console.log("region has column => ", regionTool.regionHasColumn());
console.log("column timestamp => ", regionTool.getColumnTimestamp());
const logPath = "./data/" + Date.now() + "-log.txt";
fs.writeFileSync(logPath, "");
const addSeperator = () => {
    fs.appendFileSync(logPath, "==========================================" + "\n");
};
const addToLog = (data) => {
    fs.appendFileSync(logPath, data + "\n");
};
exports.DVEDServer = {
    parseDVEDMessasge(message) {
        let jsonString = "";
        let pipeCount = 0;
        let finalCount = 0;
        for (let i = 0; i < message.length; i++) {
            let char = message[i];
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
    hanldeMessage(body) {
        const { message, data } = this.parseDVEDMessasge(body);
        if (message.type == "set-path") {
            DivineVoxelEngineData_js_1.DVED.system.updateFolder(message.id);
            addToLog("set path: " + message.id);
        }
        if (message.type == "save-column") {
            addSeperator();
            regionTool.setLocation(message.location);
            addToLog("saving column at " + message.location + "size: " + data.length);
            if (regionTool.regionHasColumn()) {
                addToLog("saving over column at : " + message.location.toString());
                addToLog(String(regionTool.loadColumn()));
            }
            regionTool.saveColumn(data);
            addToLog(String(regionTool.getColumnDataLength() +
                " : " +
                regionTool.getColumnTimestamp() +
                " : " +
                regionTool.getSectorIndex()));
            return new Uint8Array([1]);
        }
        if (message.type == "load-region-header") {
            const exists = regionTool.setLocation(message.location).regionExists();
            if (!exists) {
                regionTool.createRegion();
            }
            const header = regionTool.getHeader();
            if (!header)
                return new Uint8Array([0]);
            return new Uint8Array(header);
        }
        if (message.type == "load-column") {
            const column = regionTool.setLocation(message.location).loadColumn();
            addToLog("loading column at " +
                message.location +
                "size: " +
                String(column ? column.byteLength : 0));
            addToLog(String(regionTool.getColumnDataLength() +
                " : " +
                regionTool.getColumnTimestamp() +
                " : " +
                regionTool.getSectorIndex()));
            if (!column) {
                addToLog("column at " + message.location + " could not be loaded");
                addToLog(String(column +
                    String(DivineVoxelEngineData_js_1.DVED.spaces.column.getIndexXYZ(message.location[1], message.location[2], message.location[3]))));
                addToLog(String(regionTool.regionHasColumn()));
            }
            return column ? new Uint8Array(column) : new Uint8Array([0]);
        }
        if (message.type == "column-exists") {
            const exists = regionTool.setLocation(message.location).regionHasColumn();
            return new Uint8Array([Number(exists ? 1 : 0)]);
        }
        if (message.type == "column-timestamp") {
            const timeStamp = regionTool
                .setLocation(message.location)
                .getColumnTimestamp();
            console.log("Get timestamp");
            console.log(timeStamp);
            console.log("index", DivineVoxelEngineData_js_1.DVED.regionTags.getArrayTagByteIndex("#dved-column-save-timestamp", DivineVoxelEngineData_js_1.DVED.spaces.column.getIndexXYZ(message.location[1], message.location[2], message.location[3])), DivineVoxelEngineData_js_1.DVED.regionTags.tagSize);
            return new Uint8Array(new Uint32Array([timeStamp ? timeStamp : 0]).buffer);
        }
        return new Uint8Array([1]);
    },
};
