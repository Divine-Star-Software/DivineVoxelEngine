"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteTagManager = void 0;
var TagManagerBase_js_1 = require("./Classes/TagManagerBase.js");
var RemoteTagManager = /** @class */ (function (_super) {
    __extends(RemoteTagManager, _super);
    function RemoteTagManager(id) {
        var _this = _super.call(this, id) || this;
        _this.id = id;
        return _this;
    }
    RemoteTagManager.prototype.$INIT = function (data) {
        this.data = new DataView(data.buffer);
        this.index = new DataView(data.indexBuffer);
        this.indexMap = data.indexMap;
        this.tagIndexes = data.totalIndexes;
        this.tagSize = data.tagSize;
    };
    return RemoteTagManager;
}(TagManagerBase_js_1.TagManagerBase));
exports.RemoteTagManager = RemoteTagManager;
