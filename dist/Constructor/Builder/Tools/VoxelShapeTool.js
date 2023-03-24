import { QuadBuilderTool, QuadUVTool } from "./MeshBuilderTool.js";
import { QuadVertexData } from "../Classes/VertexData.js";
const faceData = {
    _v: 0,
    _lightMask: 0xffff,
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
        this._v = 0;
        this._v = this._setLight(0, values);
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
};
class VoxelQuadBulder extends QuadBuilderTool {
    constructor() {
        super();
        this.light._s = this;
        this.AO._s = this;
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
        attribute.push(faceData
            .setLight(this._lightData.getVertex(1))
            .setAO(this._AOData.getVertex(1))
            .setAnimation(this._animationData.getVertex(1))
            .getValue(), faceData
            .setLight(this._lightData.getVertex(2))
            .setAO(this._AOData.getVertex(2))
            .setAnimation(this._animationData.getVertex(2))
            .getValue(), faceData
            .setLight(this._lightData.getVertex(3))
            .setAO(this._AOData.getVertex(3))
            .setAnimation(this._animationData.getVertex(3))
            .getValue(), faceData
            .setLight(this._lightData.getVertex(4))
            .setAO(this._AOData.getVertex(4))
            .setAnimation(this._animationData.getVertex(4))
            .getValue());
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
    textures = new QuadUVTool(this, "cuv3");
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
