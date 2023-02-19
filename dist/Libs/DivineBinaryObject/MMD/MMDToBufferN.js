import { MetaValues } from "../Constants/MetaValues.js";
import { ByteParser } from "../Constants/ByteData.js";
export const MMDToBuffer = {
    _proto: [],
    _tokenizeString(string) {
        for (let i = 0; i < string.length; i++) {
            this._addToken("16ui", string.charCodeAt(i));
        }
    },
    _traverseObj(data) {
        this._addMarker("object-start");
        //for the object start and end marks
        for (const key of Object.keys(data.value)) {
            let length = key.length;
            if (length > 255) {
                throw new Error("An object key cannot be longer then 255 chars.");
            }
            this._addMarker("name");
            this._addToken("8ui", key.length);
            this._tokenizeString(key);
            const node = data.value[key];
            if (node.typeName == "object") {
                this._traverseObj(node);
                continue;
            }
            if (node.typeName == "array") {
                this._traverseArray(node);
                continue;
            }
            this._tokenizePrimiives(node);
        }
        this._addMarker("object-end");
    },
    _traverseArray(data) {
        this._addMarker("array-start");
        //for object array start and end marks
        const array = data.value;
        for (const node of array) {
            if (typeof node.value == "object" && !Array.isArray(node.value)) {
                this._traverseObj(node);
                continue;
            }
            if (typeof node.value == "object" && Array.isArray(node.value)) {
                this._traverseArray(node);
                continue;
            }
            this._tokenizePrimiives(node);
        }
        this._addMarker("array-end");
    },
    _tokenizePrimiives(node) {
        if (node.typeName == "string") {
            this._addMarker("string");
            this._addToken("32ui", node.value.length);
            for (let i = 0; i < node.value.length; i++) {
                this._addToken("16ui", node.value.charCodeAt(i));
            }
            return;
        }
        if (typeof node.value == "number") {
            this._addMarker(node.typeName);
            this._addToken(node.primiteName, node.value);
            return;
        }
        if (node.typeName == "typed-array") {
            this._addMarker("typed-array");
            this._addToken("8ui", node.listType);
            this._addToken("32ui", node.value.length);
            let array = node.value;
            for (let i = 0; i < array.length; i++) {
                this._addToken(node.listTypeName, node.value[i]);
            }
        }
        if (node.typeName == "string-array") {
            this._addMarker("string-array");
            this._addToken("32ui", node.value.length);
            let array = node.value;
            for (let i = 0; i < array.length; i++) {
                const value = array[i];
                this._addToken("32ui", value.length);
                for (let k = 0; k < value.length; k++) {
                    this._addToken("16ui", value.charCodeAt(k));
                }
            }
            return;
        }
        if (node.typeName == "json") {
            let json = "";
            if (typeof node.value == "object") {
                json = JSON.stringify(node.value);
            }
            else {
                json = node.value;
            }
            this._addMarker("json");
            this._addToken("32ui", json.length);
            for (let i = 0; i < json.length; i++) {
                this._addToken("16ui", json.charCodeAt(i));
            }
            return;
        }
    },
    _tokenize(node) {
        //start as two bytes for the stand and end tags
        if (node.typeName == "object" && !Array.isArray(node.value)) {
            this._traverseObj(node);
        }
        if (node.typeName == "array" && Array.isArray(node.value)) {
            this._traverseArray(node);
        }
    },
    toBuffer(data, byteOffSet = 0) {
        this._addMarker("start");
        this._tokenize(data);
        this._addMarker("end");
        const array = Uint8Array.from(this._proto);
        return array.buffer;
    },
    _addMarker(marker) {
        ByteParser.setValue("8ui", MetaValues[marker]).addBytes(this._proto);
    },
    _addToken(type, value) {
        ByteParser.setValue(type, value).addBytes(this._proto);
    },
};
