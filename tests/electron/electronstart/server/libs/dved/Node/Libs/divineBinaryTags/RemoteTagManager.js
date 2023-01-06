"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteTagManager = void 0;
const TagManagerBase_js_1 = require("./Classes/TagManagerBase.js");
class RemoteTagManager extends TagManagerBase_js_1.TagManagerBase {
    id;
    constructor(id) {
        super(id);
        this.id = id;
    }
    $INIT(data) {
        this.data = new DataView(data.buffer);
        this.index = new DataView(data.indexBuffer);
        this.indexMap = data.indexMap;
        this.tagIndexes = data.totalIndexes;
        this.tagSize = data.tagSize;
    }
}
exports.RemoteTagManager = RemoteTagManager;
