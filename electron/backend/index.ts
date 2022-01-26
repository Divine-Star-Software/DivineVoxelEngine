const { app, BrowserWindow, nativeImage, ipcMain } = require("electron");
const { promises: fs } = require("fs");
const path = require("path");

const { session } = require('electron')


/*
*fix webgl context lost
https://github.com/electron/electron/issues/11934
*/
app.commandLine.appendSwitch("js-flags", "--max-old-space-size=6000");
app.commandLine.appendSwitch("--disable-gpu-process-crash-limit");
app.disableDomainBlockingFor3DAPIs();

const APP_INIT = async () => {

  session.defaultSession.webRequest.onHeadersReceived((details : any, callback : any) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Cross-Origin-Embedder-Policy': ['require-corp'],
        'Cross-Origin-Opener-Policy': ['same-origin']
      }
    })
  });
  const editorWindow = await CreateMainWindow();
};

app.whenReady().then(async () => {
  await APP_INIT();
});



const CreateMainWindow = async () => {
  //  const image = nativeImage.createFromPath(__dirname + "/logo-small.png");
  //  image.setTemplateImage(true);

  const editorWindow: any = new BrowserWindow({
    width: 1280,
    height: 720,
    frame: true,
    fullscreen: false,
    webPreferences: {
     // preload: path.join(__dirname, "WindowPreload.js"),
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      contextIsolation: false,
      devTools: true,
      spellcheck: false,

      backgroundThrottling: false,
    },
    backgroundColor: "#000000",
    // icon: image,
  });

  editorWindow.menuBarVisible = false;

  editorWindow.webContents.on("will-navigate", (event: any) => {
    event.preventDefault();
  });

  editorWindow.loadFile("app/index.html");
  /*    editorWindow.setAspectRatio = 9 / 16;
  editorWindow.setMinimumSize(700, 400);

  let resizeTimeout: any;
  editorWindow.on("resize", (event: any) => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      var size = editorWindow.getSize();
      //@ts-ignore
      editorWindow.setSize(size[0], parseInt((size[0] * 9) / 16));
    }, 100);
  });  */

  return editorWindow;
};
