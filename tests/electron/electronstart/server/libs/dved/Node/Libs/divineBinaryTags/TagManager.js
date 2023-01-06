"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagManager = void 0;
const DBTUtil_js_1 = require("./Util/DBTUtil.js");
const TagManagerBase_js_1 = require("./Classes/TagManagerBase.js");
const TagIndexSize = DBTUtil_js_1.DBTUtil.getTypedSize("32ui") + DBTUtil_js_1.DBTUtil.getTypedSize("8ui") * 3;
const setIndexData = (data, indexBufferIndex, byteIndex, bitOffSet, bitSize, type) => {
    data.setUint32(indexBufferIndex, byteIndex);
    indexBufferIndex += DBTUtil_js_1.DBTUtil.getTypedSize("32ui");
    data.setUint8(indexBufferIndex, bitOffSet);
    indexBufferIndex += DBTUtil_js_1.DBTUtil.getTypedSize("8ui");
    data.setUint8(indexBufferIndex, bitSize);
    indexBufferIndex += DBTUtil_js_1.DBTUtil.getTypedSize("8ui");
    data.setUint8(indexBufferIndex, type);
    indexBufferIndex += DBTUtil_js_1.DBTUtil.getTypedSize("8ui");
    return indexBufferIndex;
};
class TagManager extends TagManagerBase_js_1.TagManagerBase {
    id;
    schema = new Map();
    initData = {};
    constructor(id) {
        super(id);
        this.id = id;
    }
    registerTag(tagData) {
        this.schema.set(tagData.id, tagData);
    }
    $INIT(initData) {
        /*
    [Process Tags]
    */
        const headers = new Map();
        const booleans = [];
        const numbers = [];
        const typedNumbers = new Map();
        const typedNumbersArrays = new Map();
        this.schema.forEach((tag) => {
            if (tag.type == "header") {
                let tags = headers.get(tag.numberType);
                if (!tags) {
                    tags = [];
                    headers.set(tag.numberType, tags);
                }
                tags.push(tag);
            }
            if (tag.type == "boolean") {
                booleans.push(tag);
            }
            if (tag.type == "number") {
                const range = tag.range;
                const bitSize = DBTUtil_js_1.DBTUtil.calculateBitsNeeded(range[0], range[1]);
                numbers[bitSize] ??= [];
                numbers[bitSize].push(tag);
            }
            if (tag.type == "typed-number") {
                let tags = typedNumbers.get(tag.numberType);
                if (!tags) {
                    tags = [];
                    typedNumbers.set(tag.numberType, tags);
                }
                tags.push(tag);
            }
            if (tag.type == "typed-number-array") {
                let arrayTags = typedNumbersArrays.get(tag.numberType);
                if (!arrayTags) {
                    arrayTags = [];
                    typedNumbersArrays.set(tag.numberType, arrayTags);
                }
                arrayTags.push(tag);
            }
        });
        /*
    [Build Index]
    */
        const indexSize = this.schema.size * TagIndexSize;
        let indexBuffer = new ArrayBuffer(indexSize);
        if (initData?.indexBufferMode == "shared") {
            indexBuffer = new SharedArrayBuffer(indexSize);
        }
        const index = new DataView(indexBuffer);
        this.index = index;
        let indexBufferIndex = 0;
        let byteIndex = 0;
        let bitIndex = 0;
        let bitSize = 1;
        /*
    [Headers]
    */
        headers.forEach((tags, type) => {
            const byteSise = DBTUtil_js_1.DBTUtil.getTypedSize(type);
            for (let i = 0; i < tags.length; i++) {
                const tag = tags[i];
                this.indexMap.set(tag.id, indexBufferIndex);
                indexBufferIndex = setIndexData(index, indexBufferIndex, byteIndex, 0, DBTUtil_js_1.NumberTypeRecord[tag.numberType], DBTUtil_js_1.TagNodeTypes.typedNumber);
                byteIndex += byteSise;
            }
        });
        /*
    [Booleans]
    */
        bitSize = 1;
        for (let i = 0; i < booleans.length; i++) {
            const bool = booleans[i];
            this.indexMap.set(bool.id, indexBufferIndex);
            indexBufferIndex = setIndexData(index, indexBufferIndex, byteIndex, bitIndex, bitSize, DBTUtil_js_1.TagNodeTypes.boolean);
            bitIndex++;
            if (bitIndex >= 8) {
                byteIndex++;
                bitIndex = 0;
            }
        }
        /*
    [Ranged Numbers]
    */
        byteIndex++;
        bitIndex = 0;
        let cachedBitSize = 0;
        numbers.forEach((tags, bitS) => {
            bitSize = bitS;
            if (cachedBitSize != bitSize) {
                byteIndex++;
                bitIndex = 0;
            }
            for (let i = 0; i < tags.length; i++) {
                const tag = tags[i];
                this.indexMap.set(tag.id, indexBufferIndex);
                indexBufferIndex = setIndexData(index, indexBufferIndex, byteIndex, bitIndex, bitSize, DBTUtil_js_1.TagNodeTypes.number);
                bitIndex += bitSize;
                if (bitIndex >= 8) {
                    byteIndex++;
                    bitIndex = 0;
                }
            }
        });
        /*
    [Typed Numbers]
    */
        bitIndex = 0;
        byteIndex++;
        typedNumbers.forEach((tags, type) => {
            const byteSise = DBTUtil_js_1.DBTUtil.getTypedSize(type);
            for (let i = 0; i < tags.length; i++) {
                const tag = tags[i];
                this.indexMap.set(tag.id, indexBufferIndex);
                indexBufferIndex = setIndexData(index, indexBufferIndex, byteIndex, 0, DBTUtil_js_1.NumberTypeRecord[tag.numberType], DBTUtil_js_1.TagNodeTypes.typedNumber);
                byteIndex += byteSise;
            }
        });
        /*
    [Typed Numbers Arrays]
    */
        byteIndex++;
        typedNumbersArrays.forEach((tags, type) => {
            const byteSise = DBTUtil_js_1.DBTUtil.getTypedSize(type);
            for (let i = 0; i < tags.length; i++) {
                const tag = tags[i];
                this.indexMap.set(tag.id, indexBufferIndex);
                indexBufferIndex = setIndexData(index, indexBufferIndex, byteIndex, 0, DBTUtil_js_1.NumberTypeRecord[tag.numberType], DBTUtil_js_1.TagNodeTypes.typedNumberArray);
                byteIndex += byteSise * tag.length;
            }
        });
        /*
    [Create Remote Tag Manager Data]
    */
        let numberOfIndexes = 1;
        if (initData?.numberOfIndexes) {
            numberOfIndexes = initData.numberOfIndexes;
        }
        this.tagIndexes = numberOfIndexes;
        this.tagSize = byteIndex;
        const remoteData = {
            bufferSize: byteIndex * numberOfIndexes,
            buffer: new ArrayBuffer(0),
            indexBuffer: indexBuffer,
            indexMap: this.indexMap,
            tagSize: this.tagSize,
            totalIndexes: numberOfIndexes,
        };
        this.initData = remoteData;
        return remoteData;
    }
}
exports.TagManager = TagManager;
