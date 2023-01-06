"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagManagerBase = void 0;
const DBTUtil_js_1 = require("../Util/DBTUtil.js");
const TagIndexData = [0, 0, 0, 0];
const getIndexData = (data, indexBufferIndex) => {
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
class TagManagerBase {
    id;
    byteOffSet = 0;
    tagSize = 0;
    tagIndexes = 0;
    data = new DataView(new ArrayBuffer(0));
    indexMap = new Map();
    index = new DataView(new ArrayBuffer(0));
    constructor(id) {
        this.id = id;
    }
    setBuffer(data) {
        if (data instanceof DataView) {
            this.data = data;
            return;
        }
        this.data = new DataView(data);
    }
    setTagIndex(index) {
        this.byteOffSet = index * this.tagSize;
    }
    getTag(id) {
        const byteIndex = this.indexMap.get(id);
        if (byteIndex === undefined) {
            throw new Error(`Tag with id: ${id} does not exist.`);
        }
        const indexData = getIndexData(this.index, byteIndex);
        if (indexData[3] == DBTUtil_js_1.TagNodeTypes.boolean ||
            indexData[3] == DBTUtil_js_1.TagNodeTypes.number) {
            return DBTUtil_js_1.DBTUtil.getBitValue(this.data.getUint8(indexData[0] + this.byteOffSet), indexData[1], indexData[2]);
        }
        if (indexData[3] == DBTUtil_js_1.TagNodeTypes.typedNumber) {
            return DBTUtil_js_1.DBTUtil.getTypedNumber(this.data, indexData[0] + this.byteOffSet, indexData[2]);
        }
        return -Infinity;
    }
    setTag(id, value) {
        const byteIndex = this.indexMap.get(id);
        if (byteIndex === undefined) {
            throw new Error(`Tag with id: ${id} does not exist.`);
        }
        const indexData = getIndexData(this.index, byteIndex);
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
    }
    getArrayTagValue(id, index) {
        const byteIndex = this.indexMap.get(id);
        if (byteIndex === undefined) {
            throw new Error(`Tag with id: ${id} does not exist.`);
        }
        const indexData = getIndexData(this.index, byteIndex);
        if (indexData[3] == DBTUtil_js_1.TagNodeTypes.typedNumberArray) {
            return DBTUtil_js_1.DBTUtil.getTypedNumber(this.data, indexData[0] +
                this.byteOffSet +
                index * DBTUtil_js_1.DBTUtil.getTypedSizeFromNumber(indexData[2]), indexData[2]);
        }
        return -Infinity;
    }
    /**## getArrayTagByteIndex
     *  Get the actual byte index for the provided index of the array.
     * @param id
     * @param index
     * @returns
     */
    getArrayTagByteIndex(id, index) {
        const byteIndex = this.indexMap.get(id);
        if (byteIndex === undefined) {
            throw new Error(`Tag with id: ${id} does not exist.`);
        }
        const indexData = getIndexData(this.index, byteIndex);
        if (indexData[3] == DBTUtil_js_1.TagNodeTypes.typedNumberArray) {
            return (indexData[0] +
                this.byteOffSet +
                index * DBTUtil_js_1.DBTUtil.getTypedSizeFromNumber(indexData[2]));
        }
        return -Infinity;
    }
    setArrayTagValue(id, index, value) {
        const byteIndex = this.indexMap.get(id);
        if (byteIndex === undefined) {
            throw new Error(`Tag with id: ${id} does not exist.`);
        }
        const indexData = getIndexData(this.index, byteIndex);
        if (indexData[3] == DBTUtil_js_1.TagNodeTypes.typedNumberArray) {
            return DBTUtil_js_1.DBTUtil.setTypedNumber(this.data, indexData[0] +
                this.byteOffSet +
                index * DBTUtil_js_1.DBTUtil.getTypedSizeFromNumber(indexData[2]), indexData[2], value);
        }
        return -Infinity;
    }
    loopThroughTags(run) {
        this.indexMap.forEach((i, id) => {
            run(id, this.getTag(id));
        });
    }
    loopThroughIndex(run) {
        this.indexMap.forEach((index, id) => {
            const indexData = getIndexData(this.index, index);
            run(indexData);
        });
    }
    loopThroughAllIndexTags(run) {
        for (let index = 0; index < this.tagIndexes; index++) {
            this.setTagIndex(index);
            this.indexMap.forEach((i, id) => {
                run(id, this.getTag(id), index);
            });
        }
    }
}
exports.TagManagerBase = TagManagerBase;
