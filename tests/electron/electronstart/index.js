"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
const worker_threads_1 = require("worker_threads");
const electron_1 = require("electron");
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
const APP_INIT = async () => {
    /*  session.defaultSession.webRequest.onHeadersReceived(
     (details: any, callback: any) => {
      //enable headers to enable shared array buffer
      callback({
       responseHeaders: {
        ...details.responseHeaders,
        "Cross-Origin-Embedder-Policy": ["require-corp"],
        "Cross-Origin-Opener-Policy": ["same-origin"],
       },
      });
     }
    ); */
    const editorWindow = await CreateMainWindow();
    const worker = new worker_threads_1.Worker("./electronstart/server/fileserver.js");
};
electron_1.app.whenReady().then(async () => {
    await APP_INIT();
    electron_1.globalShortcut.register("CommandOrControl+W", () => {
        //do nothing
    });
});
const CreateMainWindow = async () => {
    const mainWindow = new electron_1.BrowserWindow({
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
    mainWindow.webContents.on("will-navigate", (event) => {
        event.preventDefault();
    });
    mainWindow.loadFile("app/index.html");
    electron_1.ipcMain.on("home", (event, args) => {
        mainWindow.loadFile("app/index.html");
    });
    electron_1.ipcMain.on("world", (event, args) => {
        console.log(args);
        mainWindow.loadFile("app/worlds.html");
        setTimeout(() => {
            mainWindow.webContents.postMessage("load", args);
        }, 1000);
    });
    return mainWindow;
};
