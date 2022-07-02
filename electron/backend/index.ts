import type { WebSocketServer } from "ws";

const { app, BrowserWindow, nativeImage } = require("electron");
const ipcMain: Electron.IpcMain = require("electron").ipcMain;
const { promises: fs } = require("fs");
const path = require("path");
const ws = require("ws");
const { session } = require("electron");
const zlib = require("zlib");

const compress = (input: any) => {
 return zlib.deflateSync(input);
};

const deCompress = (input: any) => {
 //@ts-ignore
 return zlib.inflateSync(input);
};

/*
*fix webgl context lost
https://github.com/electron/electron/issues/11934
*/
app.commandLine.appendSwitch("--disable-gpu-process-crash-limit");
app.disableDomainBlockingFor3DAPIs();
app.commandLine.appendSwitch("js-flags", "--max-old-space-size=10000");

const APP_INIT = async () => {
 session.defaultSession.webRequest.onHeadersReceived(
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
 );
 const editorWindow = await CreateMainWindow();
 setUpDataServer();
};

app.whenReady().then(async () => {
 await APP_INIT();
});

const CreateMainWindow = async () => {
 const mainWindow: any = new BrowserWindow({
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

 mainWindow.webContents.on("will-navigate", (event: any) => {
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
   (mainWindow as Electron.BrowserWindow).webContents.postMessage("load", args);
  }, 1000);
 });

 return mainWindow;
};

const setUpDataServer = () => {
 const dataMessage: Record<
  number,
  (data: Uint32Array, ws: any) => Promise<void>
 > = {
  0: async (data, ws) => {
   let regionX = data[5];
   if (data[4] == 1) {
    regionX = regionX * -1;
   }
   let regionY = data[7];
   if (data[6] == 1) {
    regionY = regionY * -1;
   }
   let regionZ = data[9];
   if (data[8] == 1) {
    regionZ = regionZ * -1;
   }
   const name = `region_${regionX}_${regionY}_${regionZ}.dved`;
   const compressed = compress(data.buffer);
   await fs.writeFile(`./data/${name}`, compressed);
  },
  1: async (data, ws) => {
   let regionX = data[2];
   if (data[1] == 1) {
    regionX = regionX * -1;
   }
   let regionY = data[4];
   if (data[3] == 1) {
    regionY = regionY * -1;
   }
   let regionZ = data[6];
   if (data[5] == 1) {
    regionZ = regionZ * -1;
   }
   const name = `region_${regionX}_${regionY}_${regionZ}.dved`;
   const directory: string[] = await fs.readdir("./data");
   for (const file of directory) {
    if (file.includes(name)) {
     const path = `./data/${file}`;
     const rawData = await fs.readFile(path);
     
     const data = deCompress(rawData);
     const _8Array = new Uint8Array(data);
     let dataview = new DataView(_8Array.buffer);
     const returnArray = new Uint32Array(_8Array.length / 4);
     let k = 0;
     for (let i = 0; i < _8Array.length; i += 4) {
      returnArray[k] = dataview.getUint32(i, true);
      k++;
     }
     ws.send(returnArray);
    }
   }
  },
 };

 const wss: WebSocketServer = new ws.WebSocketServer({
  port: 8080,
  maxPayload: 1280 * 800000,
 });
 wss.on("connection", function connection(ws) {
  console.log("connected");
  ws.binaryType = "arraybuffer";
  ws.on("message", async function message(data) {
   const dataArray = new Uint32Array(data as ArrayBuffer);
   const message = dataArray[0];
   console.log("MESSAGE => ",message);
   if (dataMessage[message]) {
    dataMessage[message](dataArray, ws);
   }
  });

  //ws.send("something");
 });
};
