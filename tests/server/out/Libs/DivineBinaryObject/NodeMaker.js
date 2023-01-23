import { TypedNode } from "./Classes/TypedNode.js";
import { MetaValues } from "./Constants/MetaValues.js";
export const TNM = {
    json(data) {
        return new TypedNode(MetaValues["json"], data);
    },
    mmd(data) {
        return new TypedNode(MetaValues["mmd"], data);
    },
    object(data) {
        return new TypedNode(MetaValues["object"], data);
    },
    array(data) {
        if (!Array.isArray(data))
            throw new Error("Data for array must be an array.");
        return new TypedNode(MetaValues["array"], data);
    },
    _8i(value) {
        return new TypedNode(MetaValues["8i"], value);
    },
    _8ui(value) {
        return new TypedNode(MetaValues["8ui"], value);
    },
    _16i(value) {
        return new TypedNode(MetaValues["16i"], value);
    },
    _16ui(value) {
        return new TypedNode(MetaValues["16ui"], value);
    },
    _32ui(value) {
        return new TypedNode(MetaValues["32ui"], value);
    },
    _32i(value) {
        return new TypedNode(MetaValues["32i"], value);
    },
    _32f(value) {
        return new TypedNode(MetaValues["32f"], value);
    },
    _64f(value) {
        return new TypedNode(MetaValues["64f"], value);
    },
    bigi(value) {
        return new TypedNode(MetaValues["bigi"], value);
    },
    bigui(value) {
        return new TypedNode(MetaValues["bigui"], value);
    },
    typedArray(type, value) {
        return new TypedNode(MetaValues["typed-array"], value, MetaValues[type]);
    },
    stringArray(value) {
        return new TypedNode(MetaValues["string-array"], value);
    },
    string(value) {
        return new TypedNode(MetaValues["string"], value);
    },
    fixedString(value, length) {
        return new TypedNode(MetaValues["fixed-string"], value, 0, length);
    },
    fixedTypedArray(type, value, length) {
        return new TypedNode(MetaValues["fixed-typed-array"], value, MetaValues[type], length);
    },
    toJSONString(json) {
        if (typeof json === "string") {
            json = JSON.parse(json);
        }
        let output = JSON.stringify(json, function (k, v) {
            if (v instanceof Array)
                return JSON.stringify(v);
            return v;
        }, 2)
            .replace(/\\/g, "")
            .replace(/\"\[/g, "[")
            .replace(/\]\"/g, "]")
            .replace(/\"\{/g, "{")
            .replace(/\}\"/g, "}");
        return output;
    },
};
