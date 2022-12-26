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
//@ts-ignore
var worker_threads_1 = require("worker_threads");
var electron_1 = require("electron");
/*
*fix webgl context lost
https://github.com/electron/electron/issues/11934
*/
electron_1.app.commandLine.appendSwitch("enable-features", "SharedArrayBuffer");
electron_1.app.commandLine.appendSwitch("enable-unsafe-webgpu");
electron_1.app.commandLine.appendSwitch("disable-gpu-process-crash-limit");
electron_1.app.disableDomainBlockingFor3DAPIs();
electron_1.app.commandLine.appendSwitch("js-flags", "--max-old-space-size=10000");
electron_1.app.commandLine.appendSwitch("disable-http-cache");
var APP_INIT = function () { return __awaiter(void 0, void 0, void 0, function () {
    var editorWindow, worker;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, CreateMainWindow()];
            case 1:
                editorWindow = _a.sent();
                worker = new worker_threads_1.Worker("./electronstart/server/fileserver.js");
                return [2 /*return*/];
        }
    });
}); };
electron_1.app.whenReady().then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, APP_INIT()];
            case 1:
                _a.sent();
                electron_1.globalShortcut.register("CommandOrControl+W", function () {
                    //do nothing
                });
                return [2 /*return*/];
        }
    });
}); });
var CreateMainWindow = function () { return __awaiter(void 0, void 0, void 0, function () {
    var mainWindow;
    return __generator(this, function (_a) {
        mainWindow = new electron_1.BrowserWindow({
            width: 1280,
            height: 720,
            frame: true,
            fullscreen: false,
            webPreferences: {
                nodeIntegration: true,
                nodeIntegrationInWorker: false,
                contextIsolation: false,
                devTools: true,
                spellcheck: false,
                backgroundThrottling: false,
            },
            backgroundColor: "#000000",
        });
        mainWindow.menuBarVisible = false;
        mainWindow.webContents.on("will-navigate", function (event) {
            event.preventDefault();
        });
        mainWindow.loadFile("app/index.html");
        electron_1.ipcMain.on("home", function (event, args) {
            mainWindow.loadFile("app/index.html");
        });
        electron_1.ipcMain.on("world", function (event, args) {
            console.log(args);
            mainWindow.loadFile("app/worlds.html");
            setTimeout(function () {
                mainWindow.webContents.postMessage("load", args);
            }, 1000);
        });
        return [2 /*return*/, mainWindow];
    });
}); };
