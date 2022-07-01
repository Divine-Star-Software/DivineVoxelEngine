"use strict";
const { app, BrowserWindow, nativeImage } = require("electron");
const ipcMain = require("electron").ipcMain;
const { promises: fs } = require("fs");
const path = require("path");
const ws = require("ws");
const { session } = require("electron");
const zlib = require("zlib");
const compress = (input) => {
    return zlib.deflateSync(input);
};
const deCompress = (input) => {
    //@ts-ignore
    return zlib.inflateSync(input).toString();
};
/*
*fix webgl context lost
https://github.com/electron/electron/issues/11934
*/
app.commandLine.appendSwitch("--disable-gpu-process-crash-limit");
app.disableDomainBlockingFor3DAPIs();
app.commandLine.appendSwitch("js-flags", "--max-old-space-size=10000");
const APP_INIT = async () => {
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        //enable headers to enable shared array buffer
        callback({
            responseHeaders: {
                ...details.responseHeaders,
                "Cross-Origin-Embedder-Policy": ["require-corp"],
                "Cross-Origin-Opener-Policy": ["same-origin"],
            },
        });
    });
    const editorWindow = await CreateMainWindow();
    setUpDataServer();
};
app.whenReady().then(async () => {
    await APP_INIT();
});
const CreateMainWindow = async () => {
    const mainWindow = new BrowserWindow({
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
    ipcMain.on("home", (event, args) => {
        mainWindow.loadFile("app/index.html");
    });
    ipcMain.on("world", (event, args) => {
        console.log(args);
        mainWindow.loadFile("app/worlds.html");
        setTimeout(() => {
            mainWindow.webContents.postMessage("load", args);
        }, 1000);
    });
    return mainWindow;
};
const setUpDataServer = () => {
    console.log("set up server");
    const wss = new ws.WebSocketServer({ port: 8080 });
    wss.on("connection", function connection(ws) {
        console.log("connected");
        ws.on("message", async function message(data) {
            const dataParse = JSON.parse(data);
            if (dataParse.action == "save-region") {
                console.log(dataParse.action);
                const compressed = compress(dataParse.region);
                await fs.writeFile(`./data/${dataParse.name}`, compressed);
            }
            if (dataParse.action == "load-region") {
                console.log(dataParse.action);
                const name = dataParse.name;
                const directory = await fs.readdir("./data");
                for (const file of directory) {
                    if (file.includes(name)) {
                        const path = `./data/${file}`;
                        const rawData = await fs.readFile(path);
                        const data = deCompress(rawData);
                        ws.send(JSON.stringify({
                            action: "load-region",
                            region: data,
                        }));
                    }
                }
            }
        });
        //ws.send("something");
    });
};
