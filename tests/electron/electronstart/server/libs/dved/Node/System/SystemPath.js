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
exports.SystemPath = void 0;
const path = __importStar(require("path"));
exports.SystemPath = {
    _dataPath: "",
    _dataFolder: "dved",
    _folder: "test",
    _tempPath: "/",
    setFolder(folder) {
        this._folder = folder;
    },
    getDataPath() {
        return path.join(this._dataPath, this._dataFolder);
    },
    getDataDirectory(fileName = "") {
        return path.join(this._dataPath, this._dataFolder, this._folder, fileName);
    },
    getDirecoty(fileName = "") {
        return path.dirname(fileName);
    },
    getTempPath(fileName = "") {
        return path.join(`${this._tempPath}/${this._dataFolder}`, fileName);
    },
    $INIT() {
        this._dataPath =
            process.env.APPDATA ||
                (process.platform == "darwin"
                    ? process.env.HOME + "/Library/Preferences"
                    : process.env.HOME + "/.local/share");
    },
};
