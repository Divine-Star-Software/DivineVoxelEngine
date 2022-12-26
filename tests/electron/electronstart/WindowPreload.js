"use strict";
var _a = require("electron"), contextBridge = _a.contextBridge, ipcRenderer = _a.ipcRenderer;
console.log("sup from preload");
var validSendChannels = ["$DSIRRCOM-%S%-DATA-REQUEST", "$DSIRRCOM-%S%-COMMAND"];
var validRecieveChannels = ["$DSIRRCOM-%R%-DATA-REQUEST", "$DSIRRCOM-%R%-COMMAND"];
var _isValidSendChannel = function (channel) {
    return validSendChannels.includes(channel);
};
var _isValidRecieveChannel = function (channel) {
    return validRecieveChannels.includes(channel);
};
contextBridge.exposeInMainWorld("IS_ELECTRON", true);
contextBridge.exposeInMainWorld("api", {
    send: function (channel, data) {
        if (_isValidSendChannel(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    receive: function (channel, func) {
        if (_isValidRecieveChannel(channel)) {
            ipcRenderer.on(channel, func);
        }
    },
});
