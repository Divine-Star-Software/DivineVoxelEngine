import { QuadUVs } from "../Geometry/QuadUVs.js";
import { LightData } from "../../../Data/Light/LightByte.js";
import { QuadBuilderTool } from "./MeshBuilderTool.js";
class VoxelQuadBulder extends QuadBuilderTool {
    constructor() {
        super();
        this.light._s = this;
        this.AO._s = this;
        this.uvs._s = this;
        this.overlayUVs._s = this;
        this.faceData._s = this;
    }
    clear() {
        this._cachedPosition.x = 0;
        this._cachedPosition.y = 0;
        this._cachedPosition.z = 0;
        this._fliped = false;
        this._dimension.width = 1;
        this._dimension.height = 1;
        this.uvs.clear();
        for (let i = 1; i < 5; i++) {
            this._transform[i].x = 0;
            this._transform[i].y = 0;
            this._transform[i].z = 0;
        }
        return this;
    }
    setFlipped(flipped) {
        this._fliped = flipped;
        this.uvs.setFlipped(flipped);
        return this;
    }
    light = {
        _s: {},
        lightMap: [
            0.06, 0.1, 0.11, 0.14, 0.17, 0.21, 0.26, 0.31, 0.38, 0.45, 0.54, 0.64, 0.74,
            0.85, 0.97, 1,
        ],
        add(data) {
            const colors = this._s.tool.getAttribute("lightColors");
            if (data.length == 4) {
                for (let v = 0; v < 4; v++) {
                    const values = LightData.getLightValues(data[v]);
                    colors.push(this.lightMap[values[1]], this.lightMap[values[2]], this.lightMap[values[3]], this.lightMap[values[0]]);
                }
                return this._s;
            }
            if (data.length == 1) {
                const values = LightData.getLightValues(data[0]);
                for (let v = 0; v < 4; v++) {
                    colors.push(this.lightMap[values[1]], this.lightMap[values[2]], this.lightMap[values[3]], this.lightMap[values[0]]);
                }
            }
            return this._s;
        },
    };
    AO = {
        _s: {},
        add(data) {
            if (data.length == 4) {
                this._s.tool.addToAttribute("aoColors", data[0] ** 2.2, data[1] ** 2.2, data[2] ** 2.2, data[3] ** 2.2);
                return this._s;
            }
            this._s.tool.addToAttribute("aoColors", data[0] ** 2.2, data[0] ** 2.2, data[0] ** 2.2, data[0] ** 2.2);
            return this._s;
        },
    };
    uvs = {
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
        addAdvancedUVs(uv) {
            QuadUVs.addAdvancedUVs(this._s._direction, uv, this._s.tool.getAttribute("cuv3"), this.advancedUVs, this._fliped);
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
        add(uv) {
            QuadUVs.addUVs({
                direction: this._s._direction,
                uvs: this._s.tool.getAttribute("cuv3"),
                uv: uv,
                width: { start: this._data.width[0], end: this._data.width[1] },
                height: { start: this._data.height[0], end: this._data.height[1] },
                flipped: this._fliped,
                rotoate: this._rotation,
            });
            return this._s;
        },
    };
    overlayUVs = {
        _s: {},
        add(cumstomUVS) {
            let i = 4;
            if (cumstomUVS.length == 1) {
                while (i--) {
                    this._s.tool.addToAttribute("ocuv3", cumstomUVS[0], cumstomUVS[0], cumstomUVS[0], cumstomUVS[0]);
                }
                return this._s;
            }
            while (i--) {
                this._s.tool.addToAttribute("ocuv3", cumstomUVS[0], cumstomUVS[1], cumstomUVS[2], cumstomUVS[3]);
            }
            return this._s;
        },
    };
    faceData = {
        _s: {},
        add(v1, v2 = v1, v3 = v1, v4 = v1) {
            this._s.tool.addToAttribute("faceData", v1, v2, v3, v4);
            return this._s;
        },
    };
}
export class VoxelShapeTool {
    quad = new VoxelQuadBulder();
}
