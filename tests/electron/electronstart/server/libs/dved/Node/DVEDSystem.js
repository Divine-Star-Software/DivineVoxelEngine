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
exports.DVEDSystem = void 0;
var DVED_constants_js_1 = require("./Constants/DVED.constants.js");
exports.DVEDSystem = {
    fs: {},
    setFS: function (fs) {
        this.fs = fs;
    },
    mkdirs: function (paths) {
        for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
            var path = paths_1[_i];
            if (!this.fs.existsSync(path)) {
                this.fs.mkdirSync(path);
            }
        }
    },
    fileExists: function (path) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.fs.stat(path, function (error, stats) {
                if (error || stats.size < DVED_constants_js_1.RegionHeaderData.byteSize) {
                    resolve(0);
                    return;
                }
                resolve(stats.size);
            });
        });
    },
    fileExistsSync: function (path) {
        try {
            var stat = this.fs.statSync(path);
            return stat.size;
        }
        catch (error) {
            return 0;
        }
    },
    createFileSync: function (path, data) {
        try {
            this.fs.writeFileSync(path, new Uint8Array(data));
            return true;
        }
        catch (error) {
            return false;
        }
    },
    createFile: function (path, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.fs.writeFile(path, new Uint8Array(data), {}, function (data) {
                if ((data === null || data === void 0 ? void 0 : data.errno) != 0) {
                    resolve(false);
                }
            });
        });
    },
    stringToUint8Array: function (string) {
        var array = new Uint8Array(string.length);
        for (var i = 0; array.length; i++) {
            array[i] = string[i].charCodeAt(0);
        }
    },
    writeAtByteIndex: function (path, start, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this.fs.open(path, "r+", function (err, fd) {
                    if (!err) {
                        _this.fs.write(fd, new Uint8Array(data), 0, data.byteLength, start, function (err, bytesWritten, buffer) {
                            if (!err) {
                                // succesfully wrote byte to offset
                                _this.fs.close(fd, function () {
                                    resolve(true);
                                });
                            }
                            else {
                                resolve(false);
                            }
                        });
                        return;
                    }
                    console.error(err);
                    resolve(false);
                });
            }
            catch (error) {
                console.error(error);
                resolve(false);
            }
        });
    },
    readAtByteIndex: function (path, start, length) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this.fs.open(path, "r", function (err, fd) {
                    if (!err) {
                        var storeBuffer_1 = Buffer.alloc(length);
                        _this.fs.read(fd, storeBuffer_1, 0, length, start, function (err) {
                            if (!err) {
                                _this.fs.close(fd, function () {
                                    resolve(new Uint8Array(storeBuffer_1));
                                });
                            }
                            else {
                                console.error(err);
                                resolve(false);
                            }
                        });
                        return;
                    }
                    console.error(err);
                    resolve(false);
                });
            }
            catch (error) {
                console.error(error);
                resolve(false);
            }
        });
    },
    clearSector: function (path, start, sectors) {
        var _this = this;
        if (sectors === void 0) { sectors = 1; }
        var data = Buffer.alloc(DVED_constants_js_1.SecotrData.byteSize);
        return new Promise(function (resolve, reject) {
            try {
                _this.fs.open(path, "r+", function (err, fd) {
                    if (!err) {
                        _this.fs.write(fd, new Uint8Array(data), 0, data.byteLength, start, function (err) {
                            if (!err) {
                                // succesfully wrote byte to offset
                                _this.fs.close(fd, function () {
                                    resolve(true);
                                });
                            }
                            else {
                                console.error(err);
                                resolve(false);
                            }
                        });
                        return;
                    }
                    console.error(err);
                    resolve(false);
                });
            }
            catch (error) {
                console.error(error);
                resolve(false);
            }
        });
    },
    writeToSector: function (path, start, data) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.clearSector(path, start, DVED_constants_js_1.SecotrData.getSectorsNeeded(data.byteLength))];
                    case 1:
                        _a.sent();
                        this.fs.open(path, "r+", function (err, fd) {
                            if (!err) {
                                _this.fs.write(fd, new Uint8Array(data), 0, data.byteLength, start, function (err) {
                                    if (!err) {
                                        _this.fs.close(fd, function () {
                                            resolve(true);
                                        });
                                    }
                                    else {
                                        console.error(err);
                                        resolve(false);
                                    }
                                });
                            }
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        resolve(false);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    },
    readSectors: function (path, start, length) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this.fs.open(path, "r", function (err, fd) {
                    if (err) {
                        console.error(err);
                        resolve(false);
                        return;
                    }
                    if (!err) {
                        var storeBuffer_2 = new Uint8Array(length);
                        _this.fs.read(fd, storeBuffer_2, 0, length, start, function (err) {
                            if (!err) {
                                _this.fs.close(fd, function () {
                                    resolve(storeBuffer_2);
                                });
                            }
                            else {
                                console.error(err);
                                resolve(false);
                                return;
                            }
                        });
                    }
                });
            }
            catch (error) {
                console.error(error);
                resolve(false);
            }
        });
    },
};
