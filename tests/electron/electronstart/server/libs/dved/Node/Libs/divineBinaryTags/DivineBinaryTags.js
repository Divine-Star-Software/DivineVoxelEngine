"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DivineBinaryTags = void 0;
const RemoteTagManager_js_1 = require("./RemoteTagManager.js");
const TagManager_js_1 = require("./TagManager.js");
exports.DivineBinaryTags = {
    createTagManager(id) {
        return new TagManager_js_1.TagManager(id);
    },
    createRemoteTagManager(id) {
        return new RemoteTagManager_js_1.RemoteTagManager(id);
    },
};
