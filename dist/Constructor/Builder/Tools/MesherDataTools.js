import { UtilMap } from "../../../Global/Util/UtilMap.js";
import { TypedArrayMap } from "divine-binary-object/Constants/ByteData.js";
export class MesherDataTool {
    indicieIndex = 0;
    vars = new UtilMap();
    segments = new UtilMap();
    quadVertexData = new UtilMap();
    attributes = new UtilMap([
        ["position", [[], 3, "32f"]],
        ["normal", [[], 3, "32f"]],
        ["indices", [[], 1, "16ui"]],
    ]);
    addPositions(...positions) {
        this.attributes.get("position")[0].push(...positions);
        return this;
    }
    addNormals(...normals) {
        this.attributes.get("normal")[0].push(...normals);
        return this;
    }
    addIndices(...indices) {
        this.attributes.get("indices")[0].push(...indices);
        return this;
    }
    addToAttribute(id, ...data) {
        const attribute = this.attributes.get(id);
        if (!attribute)
            return this;
        attribute[0].push(...data);
        return this;
    }
    getAttribute(id) {
        return this.attributes.get(id)[0];
    }
    addToSegment(id, ...normals) {
        const segment = this.segments.get(id);
        if (!segment)
            return this;
        segment.push(...normals);
        return this;
    }
    setVar(id, value) {
        if (this.vars.has(id)) {
            this.vars.set(id, value);
        }
        return this;
    }
    getVar(id) {
        return this.vars.get(id);
    }
    resetAll() {
        this.resetSegments();
        this.resetAttributes();
        this.resetVars();
        return this;
    }
    resetSegments() {
        for (const [key, v] of this.segments._map) {
            this.segments._map.set(key, []);
        }
        return this;
    }
    resetAttributes() {
        for (const [key, v] of this.attributes._map) {
            this.attributes._map.set(key, [[], v[1], v[2]]);
        }
        this.indicieIndex = 0;
        return this;
    }
    resetVars() {
        for (const key of this.vars._map.keys()) {
            this.vars.set(key, 0);
        }
        return this;
    }
    getMeshData() {
        const arrays = [];
        const strides = [];
        const trasnfers = [];
        for (const [key, [value, stride, type]] of this.attributes._map) {
            //@ts-ignore
            const newArray = TypedArrayMap[type].from(value);
            arrays.push(newArray);
            strides.push(stride);
            trasnfers.push(newArray.buffer);
        }
        return [arrays, trasnfers, strides];
    }
    getAllAttributes() {
        const data = [];
        const trasnfers = [];
        for (const [key, [value, stride, type]] of this.attributes._map) {
            //@ts-ignore
            const newArray = TypedArrayMap[type].from(value);
            trasnfers.push(newArray.buffer);
            data.push([key, newArray, stride]);
        }
        return [data, trasnfers];
    }
}
