"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagManagerBase = void 0;
var DBTUtil_js_1 = require("../Util/DBTUtil.js");
var TagIndexData = [0, 0, 0, 0];
var getIndexData = function (data, indexBufferIndex) {
    TagIndexData[0] = data.getUint32(indexBufferIndex);
    indexBufferIndex += DBTUtil_js_1.DBTUtil.getTypedSize("32ui");
    TagIndexData[1] = data.getUint8(indexBufferIndex);
    indexBufferIndex += DBTUtil_js_1.DBTUtil.getTypedSize("8ui");
    TagIndexData[2] = data.getUint8(indexBufferIndex);
    indexBufferIndex += DBTUtil_js_1.DBTUtil.getTypedSize("8ui");
    TagIndexData[3] = data.getUint8(indexBufferIndex);
    indexBufferIndex += DBTUtil_js_1.DBTUtil.getTypedSize("8ui");
    return TagIndexData;
};
var TagManagerBase = /** @class */ (function () {
    function TagManagerBase(id) {
        this.id = id;
        this.byteOffSet = 0;
        this.tagSize = 0;
        this.tagIndexes = 0;
        this.data = new DataView(new ArrayBuffer(0));
        this.indexMap = new Map();
        this.index = new DataView(new ArrayBuffer(0));
    }
    TagManagerBase.prototype.setBuffer = function (data) {
        if (data instanceof DataView) {
            this.data = data;
            return;
        }
        this.data = new DataView(data);
    };
    TagManagerBase.prototype.setTagIndex = function (index) {
        this.byteOffSet = index * this.tagSize;
    };
    TagManagerBase.prototype.getTag = function (id) {
        var byteIndex = this.indexMap.get(id);
        if (byteIndex === undefined) {
            throw new Error("Tag with id: ".concat(id, " does not exist."));
        }
        var indexData = getIndexData(this.index, byteIndex);
        if (indexData[3] == DBTUtil_js_1.TagNodeTypes.boolean ||
            indexData[3] == DBTUtil_js_1.TagNodeTypes.number) {
            return DBTUtil_js_1.DBTUtil.getBitValue(this.data.getUint8(indexData[0] + this.byteOffSet), indexData[1], indexData[2]);
        }
        if (indexData[3] == DBTUtil_js_1.TagNodeTypes.typedNumber) {
            return DBTUtil_js_1.DBTUtil.getTypedNumber(this.data, indexData[0] + this.byteOffSet, indexData[2]);
        }
        return -Infinity;
    };
    TagManagerBase.prototype.setTag = function (id, value) {
        var byteIndex = this.indexMap.get(id);
        if (byteIndex === undefined) {
            throw new Error("Tag with id: ".concat(id, " does not exist."));
        }
        var indexData = getIndexData(this.index, byteIndex);
        if (indexData[3] == DBTUtil_js_1.TagNodeTypes.boolean ||
            indexData[3] == DBTUtil_js_1.TagNodeTypes.number) {
            this.data.setUint8(indexData[0] + this.byteOffSet, DBTUtil_js_1.DBTUtil.setBitValue(this.data.getUint8(indexData[0] + this.byteOffSet), indexData[1], value, indexData[2]));
            return true;
        }
        if (indexData[3] == DBTUtil_js_1.TagNodeTypes.typedNumber) {
            DBTUtil_js_1.DBTUtil.setTypedNumber(this.data, indexData[0] + this.byteOffSet, indexData[2], value);
            return true;
        }
        return false;
    };
    TagManagerBase.prototype.getArrayTagValue = function (id, index) {
        var byteIndex = this.indexMap.get(id);
        if (byteIndex === undefined) {
            throw new Error("Tag with id: ".concat(id, " does not exist."));
        }
        var indexData = getIndexData(this.index, byteIndex);
        if (indexData[3] == DBTUtil_js_1.TagNodeTypes.typedNumberArray) {
            return DBTUtil_js_1.DBTUtil.getTypedNumber(this.data, indexData[0] +
                this.byteOffSet +
                index * DBTUtil_js_1.DBTUtil.getTypedSizeFromNumber(indexData[2]), indexData[2]);
        }
        return -Infinity;
    };
    /**## getArrayTagByteIndex
     *  Get the actual byte index for the provided index of the array.
     * @param id
     * @param index
     * @returns
     */
    TagManagerBase.prototype.getArrayTagByteIndex = function (id, index) {
        var byteIndex = this.indexMap.get(id);
        if (byteIndex === undefined) {
            throw new Error("Tag with id: ".concat(id, " does not exist."));
        }
        var indexData = getIndexData(this.index, byteIndex);
        if (indexData[3] == DBTUtil_js_1.TagNodeTypes.typedNumberArray) {
            return (indexData[0] +
                this.byteOffSet +
                index * DBTUtil_js_1.DBTUtil.getTypedSizeFromNumber(indexData[2]));
        }
        return -Infinity;
    };
    TagManagerBase.prototype.setArrayTagValue = function (id, index, value) {
        var byteIndex = this.indexMap.get(id);
        if (byteIndex === undefined) {
            throw new Error("Tag with id: ".concat(id, " does not exist."));
        }
        var indexData = getIndexData(this.index, byteIndex);
        if (indexData[3] == DBTUtil_js_1.TagNodeTypes.typedNumberArray) {
            return DBTUtil_js_1.DBTUtil.setTypedNumber(this.data, indexData[0] +
                this.byteOffSet +
                index * DBTUtil_js_1.DBTUtil.getTypedSizeFromNumber(indexData[2]), indexData[2], value);
        }
        return -Infinity;
    };
    TagManagerBase.prototype.loopThroughTags = function (run) {
        var _this = this;
        this.indexMap.forEach(function (i, id) {
            run(id, _this.getTag(id));
        });
    };
    TagManagerBase.prototype.loopThroughIndex = function (run) {
        var _this = this;
        this.indexMap.forEach(function (index, id) {
            var indexData = getIndexData(_this.index, index);
            run(indexData);
        });
    };
    TagManagerBase.prototype.loopThroughAllIndexTags = function (run) {
        var _this = this;
        var _loop_1 = function (index) {
            this_1.setTagIndex(index);
            this_1.indexMap.forEach(function (i, id) {
                run(id, _this.getTag(id), index);
            });
        };
        var this_1 = this;
        for (var index = 0; index < this.tagIndexes; index++) {
            _loop_1(index);
        }
    };
    return TagManagerBase;
}());
exports.TagManagerBase = TagManagerBase;
