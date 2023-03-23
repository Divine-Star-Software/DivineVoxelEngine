import { LightData } from "../../../Data/Light/LightByte.js";
import { QuadBuilderTool } from "./MeshBuilderTool.js";
import { QuadVertexData } from "../Classes/VertexData.js";
const faceData = {
    _v: 0,
    _lightMask: 0xf,
    _aoMask: 0b11,
    _animationMask: 0b1111_1111_1111_11,
    _setLight(index, value) {
        return ((this._v & ~(this._lightMask << index)) |
            ((value & this._lightMask) << index));
    },
    _setAO(value) {
        const index = 16;
        return ((this._v & ~(this._aoMask << index)) | ((value & this._aoMask) << index));
    },
    _setAnimation(value) {
        const index = 18;
        return ((this._v & ~(this._animationMask << index)) |
            ((value & this._animationMask) << index));
    },
    setLight(values) {
        this._v = this._setLight(0, values[0]);
        this._v = this._setLight(4, values[1]);
        this._v = this._setLight(8, values[2]);
        this._v = this._setLight(12, values[3]);
        return this;
    },
    setAO(value) {
        this._v = this._setAO(value);
        return this;
    },
    setAnimation(value) {
        this._v = this._setAnimation(value);
        return this;
    },
    getValue() {
        return this._v;
    },
    reset() {
        this._v = 0;
    },
};
class VoxelQuadBulder extends QuadBuilderTool {
    constructor() {
        super();
        this.light._s = this;
        this.AO._s = this;
        this.textures._s = this;
        this.overlayTexture._s = this;
        this.animationState._s = this;
    }
    _lightData = new QuadVertexData();
    _AOData = new QuadVertexData();
    _animationData = new QuadVertexData();
    clear() {
        this._cachedPosition.x = 0;
        this._cachedPosition.y = 0;
        this._cachedPosition.z = 0;
        this._fliped = false;
        this._dimension.width = 1;
        this._dimension.height = 1;
        this.textures.clear();
        for (let i = 1; i < 5; i++) {
            this._transform[i].x = 0;
            this._transform[i].y = 0;
            this._transform[i].z = 0;
        }
        return this;
    }
    create() {
        this.builder.create(this.tool, this._direction, this._position, this._dimension, this._fliped, this._transform);
        const attribute = this.tool.getAttribute("voxelData");
        for (let i = 1; i <= 4; i++) {
            attribute.push(faceData
                .setLight(LightData.getLightValues(this._lightData.getVertex(i)))
                .setAO(this._AOData.getVertex(i))
                .setAnimation(this._animationData.getVertex(i))
                .getValue());
            faceData.reset();
        }
        return this;
    }
    setFlipped(flipped) {
        this._fliped = flipped;
        this.textures.setFlipped(flipped);
        return this;
    }
    animationState = {
        _s: {},
        add(data) {
            this._s._animationData.setFromQuadData(data);
            return this._s;
        },
    };
    light = {
        _s: {},
        lightMap: [
            0.06, 0.1, 0.11, 0.14, 0.17, 0.21, 0.26, 0.31, 0.38, 0.45, 0.54, 0.64, 0.74,
            0.85, 0.97, 1,
        ],
        add(data) {
            this._s._lightData.setFromQuadData(data);
            return this._s;
        },
    };
    AO = {
        _s: {},
        add(data) {
            this._s._AOData.setFromQuadData(data);
            return this._s;
        },
    };
    textures = {
        _s: {},
        _data: {
            width: [0, 1],
            height: [0, 1],
        },
        _fliped: false,
        advancedUVs: {
            hs1: 0,
            hs2: 0,
            he1: 1,
            he2: 1,
            ws1: 0,
            ws2: 0,
            we1: 1,
            we2: 1,
        },
        resetAdvancedUVs() {
            this.advancedUVs.hs1 = 0;
            this.advancedUVs.hs2 = 0;
            this.advancedUVs.he1 = 1;
            this.advancedUVs.he2 = 1;
            this.advancedUVs.ws1 = 0;
            this.advancedUVs.ws2 = 0;
            this.advancedUVs.we1 = 1;
            this.advancedUVs.we2 = 1;
            return this._s;
        },
        addAdvancedUVs(textureId) {
            this._s.uvs.addAdvancedUVs(this._s._direction, textureId, this._s.tool.getAttribute("cuv3"), this.advancedUVs, this._fliped);
            return this._s;
        },
        _rotation: 0,
        clear() {
            this._data.width[0] = 0;
            this._data.width[1] = 1;
            this._data.height[0] = 0;
            this._data.height[1] = 1;
            this._fliped = false;
            this._rotation = 0;
            this.resetAdvancedUVs();
            return this._s;
        },
        setFlipped(flipped) {
            this._fliped = flipped;
            return this._s;
        },
        setWidth(start, end) {
            this._data.width[0] = start;
            this._data.width[1] = end;
            return this._s;
        },
        setHeight(start, end) {
            this._data.height[0] = start;
            this._data.height[1] = end;
            return this._s;
        },
        setRoation(rotation) {
            this._rotation = rotation;
            return this._s;
        },
        add(textureId) {
            this._s.uvs.addUVs({
                direction: this._s._direction,
                uvs: this._s.tool.getAttribute("cuv3"),
                uv: textureId,
                width: { start: this._data.width[0], end: this._data.width[1] },
                height: { start: this._data.height[0], end: this._data.height[1] },
                flipped: this._fliped,
                rotoate: this._rotation,
            });
            return this._s;
        },
    };
    overlayTexture = {
        _s: {},
        add(data) {
            let i = 4;
            const attribute = this._s.tool.getAttribute("ocuv3");
            while (i--) {
                attribute.push(data.vetexes[1], data.vetexes[2], data.vetexes[3], data.vetexes[4]);
            }
            return this._s;
        },
    };
}
export class VoxelShapeTool {
    quad = new VoxelQuadBulder();
}
