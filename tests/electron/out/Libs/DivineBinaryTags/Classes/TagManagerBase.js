import { DBTUtil } from "../Util/DBTUtil.js";
const TagNodeTypes = {
    boolean: 0,
    number: 1,
    typedNumber: 2,
};
const TagIndexData = [0, 0, 0, 0];
const getIndexData = (data, indexBufferIndex) => {
    TagIndexData[0] = data.getUint32(indexBufferIndex);
    indexBufferIndex += DBTUtil.getNumberTypesize("32ui");
    TagIndexData[1] = data.getUint8(indexBufferIndex);
    indexBufferIndex += DBTUtil.getNumberTypesize("8ui");
    TagIndexData[2] = data.getUint8(indexBufferIndex);
    indexBufferIndex += DBTUtil.getNumberTypesize("8ui");
    TagIndexData[3] = data.getUint8(indexBufferIndex);
    indexBufferIndex += DBTUtil.getNumberTypesize("8ui");
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
    setBuffer(buffer) {
        this.data = new DataView(buffer);
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
            return DBTUtil.getValue(this.data.getUint8(indexData[0] + this.byteOffSet), indexData[1], indexData[2]);
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
            this.data.setUint8(indexData[0] + this.byteOffSet, DBTUtil.setValue(this.data.getUint8(indexData[0] + this.byteOffSet), indexData[1], value, indexData[2]));
            return;
        }
        if (indexData[3] == TagNodeTypes.typedNumber) {
            DBTUtil.setTypedNumber(this.data, indexData[0] + this.byteOffSet, indexData[2], value);
        }
    }
    loopThroughTags(run) {
        this.indexMap.forEach((i, id) => {
            run(id, this.getTag(id));
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
