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
exports.TagManager = void 0;
var DBTUtil_js_1 = require("./Util/DBTUtil.js");
var TagManagerBase_js_1 = require("./Classes/TagManagerBase.js");
var TagIndexSize = DBTUtil_js_1.DBTUtil.getTypedSize("32ui") + DBTUtil_js_1.DBTUtil.getTypedSize("8ui") * 3;
var setIndexData = function (data, indexBufferIndex, byteIndex, bitOffSet, bitSize, type) {
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
var TagManager = /** @class */ (function (_super) {
    __extends(TagManager, _super);
    function TagManager(id) {
        var _this = _super.call(this, id) || this;
        _this.id = id;
        _this.schema = new Map();
        _this.initData = {};
        return _this;
    }
    TagManager.prototype.registerTag = function (tagData) {
        this.schema.set(tagData.id, tagData);
    };
    TagManager.prototype.$INIT = function (initData) {
        var _this = this;
        /*
    [Process Tags]
    */
        var headers = new Map();
        var booleans = [];
        var numbers = [];
        var typedNumbers = new Map();
        var typedNumbersArrays = new Map();
        this.schema.forEach(function (tag) {
            var _a;
            if (tag.type == "header") {
                var tags = headers.get(tag.numberType);
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
                var range = tag.range;
                var bitSize_1 = DBTUtil_js_1.DBTUtil.calculateBitsNeeded(range[0], range[1]);
                (_a = numbers[bitSize_1]) !== null && _a !== void 0 ? _a : (numbers[bitSize_1] = []);
                numbers[bitSize_1].push(tag);
            }
            if (tag.type == "typed-number") {
                var tags = typedNumbers.get(tag.numberType);
                if (!tags) {
                    tags = [];
                    typedNumbers.set(tag.numberType, tags);
                }
                tags.push(tag);
            }
            if (tag.type == "typed-number-array") {
                var arrayTags = typedNumbersArrays.get(tag.numberType);
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
        var indexSize = this.schema.size * TagIndexSize;
        var indexBuffer = new ArrayBuffer(indexSize);
        if ((initData === null || initData === void 0 ? void 0 : initData.indexBufferMode) == "shared") {
            indexBuffer = new SharedArrayBuffer(indexSize);
        }
        var index = new DataView(indexBuffer);
        this.index = index;
        var indexBufferIndex = 0;
        var byteIndex = 0;
        var bitIndex = 0;
        var bitSize = 1;
        /*
    [Headers]
    */
        headers.forEach(function (tags, type) {
            var byteSise = DBTUtil_js_1.DBTUtil.getTypedSize(type);
            for (var i = 0; i < tags.length; i++) {
                var tag = tags[i];
                _this.indexMap.set(tag.id, indexBufferIndex);
                indexBufferIndex = setIndexData(index, indexBufferIndex, byteIndex, 0, DBTUtil_js_1.NumberTypeRecord[tag.numberType], DBTUtil_js_1.TagNodeTypes.typedNumber);
                byteIndex += byteSise;
            }
        });
        /*
    [Booleans]
    */
        bitSize = 1;
        for (var i = 0; i < booleans.length; i++) {
            var bool = booleans[i];
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
        var cachedBitSize = 0;
        numbers.forEach(function (tags, bitS) {
            bitSize = bitS;
            if (cachedBitSize != bitSize) {
                byteIndex++;
                bitIndex = 0;
            }
            for (var i = 0; i < tags.length; i++) {
                var tag = tags[i];
                _this.indexMap.set(tag.id, indexBufferIndex);
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
        typedNumbers.forEach(function (tags, type) {
            var byteSise = DBTUtil_js_1.DBTUtil.getTypedSize(type);
            for (var i = 0; i < tags.length; i++) {
                var tag = tags[i];
                _this.indexMap.set(tag.id, indexBufferIndex);
                indexBufferIndex = setIndexData(index, indexBufferIndex, byteIndex, 0, DBTUtil_js_1.NumberTypeRecord[tag.numberType], DBTUtil_js_1.TagNodeTypes.typedNumber);
                byteIndex += byteSise;
            }
        });
        /*
    [Typed Numbers Arrays]
    */
        byteIndex++;
        typedNumbersArrays.forEach(function (tags, type) {
            var byteSise = DBTUtil_js_1.DBTUtil.getTypedSize(type);
            for (var i = 0; i < tags.length; i++) {
                var tag = tags[i];
                _this.indexMap.set(tag.id, indexBufferIndex);
                indexBufferIndex = setIndexData(index, indexBufferIndex, byteIndex, 0, DBTUtil_js_1.NumberTypeRecord[tag.numberType], DBTUtil_js_1.TagNodeTypes.typedNumberArray);
                byteIndex += byteSise * tag.length;
            }
        });
        /*
    [Create Remote Tag Manager Data]
    */
        var numberOfIndexes = 1;
        if (initData === null || initData === void 0 ? void 0 : initData.numberOfIndexes) {
            numberOfIndexes = initData.numberOfIndexes;
        }
        this.tagIndexes = numberOfIndexes;
        this.tagSize = byteIndex;
        var remoteData = {
            bufferSize: byteIndex * numberOfIndexes,
            buffer: new ArrayBuffer(0),
            indexBuffer: indexBuffer,
            indexMap: this.indexMap,
            tagSize: this.tagSize,
            totalIndexes: numberOfIndexes,
        };
        this.initData = remoteData;
        return remoteData;
    };
    return TagManager;
}(TagManagerBase_js_1.TagManagerBase));
exports.TagManager = TagManager;
