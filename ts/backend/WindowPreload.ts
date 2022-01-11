const { contextBridge, ipcRenderer } = require("electron");
console.log("sup from preload");


const validSendChannels: string[] = ["$DSIRRCOM-%S%-DATA-REQUEST","$DSIRRCOM-%S%-COMMAND"];

const validRecieveChannels: string[] = ["$DSIRRCOM-%R%-DATA-REQUEST","$DSIRRCOM-%R%-COMMAND"];

const _isValidSendChannel = (channel: string) => {
  return validSendChannels.includes(channel);
};
const _isValidRecieveChannel = (channel: string) => {
  return validRecieveChannels.includes(channel);
};

contextBridge.exposeInMainWorld("IS_ELECTRON", true);

contextBridge.exposeInMainWorld("api", {
  send: (channel: string, data: any) => {
    if (_isValidSendChannel(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel: string, func: VoidFunction) => {
    if (_isValidRecieveChannel(channel)) {
      ipcRenderer.on(channel, func);
    }
  },
});
