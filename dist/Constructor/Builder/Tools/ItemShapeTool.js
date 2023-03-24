import { QuadBuilderTool } from "./MeshBuilderTool.js";
import { QuadVertexData } from "../Classes/VertexData.js";
class TextureQuadBulder extends QuadBuilderTool {
    constructor() {
        super();
        this.textures._s = this;
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
}
export class TextureShapeTool {
    quad = new TextureQuadBulder();
}
