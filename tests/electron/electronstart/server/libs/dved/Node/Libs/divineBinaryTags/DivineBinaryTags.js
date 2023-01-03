"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DivineBinaryTags = void 0;
var RemoteTagManager_js_1 = require("./RemoteTagManager.js");
var TagManager_js_1 = require("./TagManager.js");
exports.DivineBinaryTags = {
    createTagManager: function (id) {
        return new TagManager_js_1.TagManager(id);
    },
    createRemoteTagManager: function (id) {
        return new RemoteTagManager_js_1.RemoteTagManager(id);
    },
};
