"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("hello from node wokrer");
var fs = require("fs").promises;
var ws = require("ws");
var zlib = require("zlib");
var compress = function (input) {
    return zlib.deflateSync(input);
};
var deCompress = function (input) {
    //@ts-ignore
    return zlib.inflateSync(input);
};
var setUpDataServer = function () {
    var dataMessage = {
        0: function (data, ws) { return __awaiter(void 0, void 0, void 0, function () {
            var regionX, regionY, regionZ, name, compressed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        regionX = data[5];
                        if (data[4] == 1) {
                            regionX = regionX * -1;
                        }
                        regionY = data[7];
                        if (data[6] == 1) {
                            regionY = regionY * -1;
                        }
                        regionZ = data[9];
                        if (data[8] == 1) {
                            regionZ = regionZ * -1;
                        }
                        name = "region_".concat(regionX, "_").concat(regionY, "_").concat(regionZ, ".dved");
                        compressed = compress(data.buffer);
                        return [4 /*yield*/, fs.writeFile("./data/".concat(name), compressed)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); },
        1: function (data, ws) { return __awaiter(void 0, void 0, void 0, function () {
            var regionX, regionY, regionZ, name, directory, _i, directory_1, file, path, rawData, data_1, _8Array, dataview, returnArray, k, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        regionX = data[2];
                        if (data[1] == 1) {
                            regionX = regionX * -1;
                        }
                        regionY = data[4];
                        if (data[3] == 1) {
                            regionY = regionY * -1;
                        }
                        regionZ = data[6];
                        if (data[5] == 1) {
                            regionZ = regionZ * -1;
                        }
                        name = "region_".concat(regionX, "_").concat(regionY, "_").concat(regionZ, ".dved");
                        return [4 /*yield*/, fs.readdir("./data")];
                    case 1:
                        directory = _a.sent();
                        _i = 0, directory_1 = directory;
                        _a.label = 2;
                    case 2:
                        if (!(_i < directory_1.length)) return [3 /*break*/, 5];
                        file = directory_1[_i];
                        if (!file.includes(name)) return [3 /*break*/, 4];
                        path = "./data/".concat(file);
                        return [4 /*yield*/, fs.readFile(path)];
                    case 3:
                        rawData = _a.sent();
                        data_1 = deCompress(rawData);
                        _8Array = new Uint8Array(data_1);
                        dataview = new DataView(_8Array.buffer);
                        returnArray = new Uint32Array(_8Array.length / 4);
                        k = 0;
                        for (i = 0; i < _8Array.length; i += 4) {
                            returnArray[k] = dataview.getUint32(i, true);
                            k++;
                        }
                        ws.send(returnArray);
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        }); },
    };
    var wss = new ws.WebSocketServer({
        port: 8080,
        maxPayload: 1280 * 800000,
    });
    wss.on("connection", function connection(ws) {
        console.log("connected");
        ws.binaryType = "arraybuffer";
        ws.on("message", function message(data) {
            return __awaiter(this, void 0, void 0, function () {
                var dataArray, message;
                return __generator(this, function (_a) {
                    dataArray = new Uint32Array(data);
                    message = dataArray[0];
                    console.log("MESSAGE => ", message);
                    if (dataMessage[message]) {
                        dataMessage[message](dataArray, ws);
                    }
                    return [2 /*return*/];
                });
            });
        });
        //ws.send("something");
    });
};
setUpDataServer();
