"use strict";
const { contextBridge, ipcRenderer } = require("electron");
console.log("sup from preload");
const validSendChannels = ["$DSIRRCOM-%S%-DATA-REQUEST", "$DSIRRCOM-%S%-COMMAND"];
const validRecieveChannels = ["$DSIRRCOM-%R%-DATA-REQUEST", "$DSIRRCOM-%R%-COMMAND"];
const _isValidSendChannel = (channel) => {
    return validSendChannels.includes(channel);
};
const _isValidRecieveChannel = (channel) => {
    return validRecieveChannels.includes(channel);
};
contextBridge.exposeInMainWorld("IS_ELECTRON", true);
contextBridge.exposeInMainWorld("api", {
    send: (channel, data) => {
        if (_isValidSendChannel(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    receive: (channel, func) => {
        if (_isValidRecieveChannel(channel)) {
            ipcRenderer.on(channel, func);
        }
    },
});
