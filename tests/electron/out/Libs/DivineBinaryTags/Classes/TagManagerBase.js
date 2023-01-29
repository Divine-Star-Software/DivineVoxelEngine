import { DBTUtil, TagNodeTypes } from "../Util/DBTUtil.js";
const TagIndexData = [0, 0, 0, 0];
const getIndexData = (data, indexBufferIndex) => {
    TagIndexData[0] = data.getUint32(indexBufferIndex);
    indexBufferIndex += DBTUtil.getTypedSize("32ui");
    TagIndexData[1] = data.getUint8(indexBufferIndex);
    indexBufferIndex += DBTUtil.getTypedSize("8ui");
    TagIndexData[2] = data.getUint8(indexBufferIndex);
    indexBufferIndex += DBTUtil.getTypedSize("8ui");
    TagIndexData[3] = data.getUint8(indexBufferIndex);
    indexBufferIndex += DBTUtil.getTypedSize("8ui");
    return TagIndexData;
};
export class TagManagerBase {
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
    getBuffer() {
        if (this.data instanceof DataView) {
            return this.data.buffer;
        }
        return this.data;
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
        if (indexData[3] == TagNodeTypes.boolean ||
            indexData[3] == TagNodeTypes.number) {
            return DBTUtil.getBitValue(this.data.getUint8(indexData[0] + this.byteOffSet), indexData[1], indexData[2]);
        }
        if (indexData[3] == TagNodeTypes.typedNumber) {
            return DBTUtil.getTypedNumber(this.data, indexData[0] + this.byteOffSet, indexData[2]);
        }
        return -Infinity;
    }
    setTag(id, value) {
        const byteIndex = this.indexMap.get(id);
        if (byteIndex === undefined) {
            throw new Error(`Tag with id: ${id} does not exist.`);
        }
        const indexData = getIndexData(this.index, byteIndex);
        if (indexData[3] == TagNodeTypes.boolean ||
            indexData[3] == TagNodeTypes.number) {
            this.data.setUint8(indexData[0] + this.byteOffSet, DBTUtil.setBitValue(this.data.getUint8(indexData[0] + this.byteOffSet), indexData[1], value, indexData[2]));
            return true;
        }
        if (indexData[3] == TagNodeTypes.typedNumber) {
            DBTUtil.setTypedNumber(this.data, indexData[0] + this.byteOffSet, indexData[2], value);
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
        if (indexData[3] == TagNodeTypes.typedNumberArray) {
            return DBTUtil.getTypedNumber(this.data, indexData[0] +
                this.byteOffSet +
                index * DBTUtil.getTypedSizeFromNumber(indexData[2]), indexData[2]);
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
        if (indexData[3] == TagNodeTypes.typedNumberArray) {
            return (indexData[0] +
                this.byteOffSet +
                index * DBTUtil.getTypedSizeFromNumber(indexData[2]));
        }
        return -Infinity;
    }
    setArrayTagValue(id, index, value) {
        const byteIndex = this.indexMap.get(id);
        if (byteIndex === undefined) {
            throw new Error(`Tag with id: ${id} does not exist.`);
        }
        const indexData = getIndexData(this.index, byteIndex);
        if (indexData[3] == TagNodeTypes.typedNumberArray) {
            return DBTUtil.setTypedNumber(this.data, indexData[0] +
                this.byteOffSet +
                index * DBTUtil.getTypedSizeFromNumber(indexData[2]), indexData[2], value);
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
