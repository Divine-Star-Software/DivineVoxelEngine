//data
import { MeshFaceDataByte } from "../../../Data/Meshing/MeshFaceDataBytes.js";
import { LightData } from "../../../Data/Light/LightByte.js";
import { FaceByte } from "../../../Data/Meshing/FaceByte.js";
import { UVHelper } from "../Shapes/UVHelper.js";
//managers
import { ShapeManager } from "../../Managers/Shapes/ShapeManager.js";
import { GetConstructorDataTool } from "../../Tools/Data/ConstructorDataTool.js";
import { GeometryBuilder } from "../Geometry/GeometryBuilder.js";
/**# Voxel Mesher Tool
 * ---
 * Tool desinged to help make it easy to build voxel meshes.
 */
export const VoxelMehserTool = {
    _data: {},
    _template: {},
    templateIncrement: true,
    setTemplateIncrement(onOff) {
        this.templateIncrement = onOff;
        return this;
    },
    $buildMesh(type, template, LOD = 1) {
        const data = {
            substance: type,
            LOD: LOD,
            //mesh data
            positions: [],
            normals: [],
            indices: [],
            faceData: [],
            RGBLightColors: [],
            sunLightColors: [],
            colors: [],
            AOColors: [],
            uvs: [],
            overlayUVs: [],
            indicieIndex: 0,
            //chunks template
            shapeState: 0,
            flowTemplateIndex: 0,
            flowTemplate: template.flowTemplate,
            unTemplate: template.uvTemplate,
            uvTemplateIndex: 0,
            overylayUVTemplate: template.overlayUVTemplate,
            overylayUVTemplateIndex: 0,
            colorTemplate: template.colorTemplate,
            colorIndex: 0,
            lightTemplate: template.lightTemplate,
            lightIndex: 0,
            aoTemplate: template.aoTemplate,
            aoIndex: 0,
            //voxel data
            face: 0,
            position: { x: 0, y: 0, z: 0 },
        };
        GeometryBuilder.setData(data);
        this._template = template;
        this._data = data;
        let i = 0;
        for (let positionIndex = 0; positionIndex < template.positionTemplate.length; positionIndex += 3) {
            data.position.x = template.positionTemplate[positionIndex];
            data.position.y = template.positionTemplate[positionIndex + 1];
            data.position.z = template.positionTemplate[positionIndex + 2];
            this.data.loadIn(data.position.x, data.position.y, data.position.z);
            this.quad.setPosition(data.position.x, data.position.y, data.position.z);
            data.face = template.faceTemplate[i];
            data.shapeState = template.shapeStateTemplate[i];
            ShapeManager.getShape(template.shapeTemplate[i]).addToChunkMesh(data);
            i++;
        }
        GeometryBuilder.clearData();
        const positionArray = new Float32Array(data.positions);
        const normalsArray = new Float32Array(data.normals);
        const indiciesArray = new Int32Array(data.indices);
        const faceDataArray = new Float32Array(data.faceData);
        const AOColorsArray = new Float32Array(data.AOColors);
        const RGBLightColorsArray = new Float32Array(data.RGBLightColors);
        const sunLightColorsArray = new Float32Array(data.sunLightColors);
        const colorsArray = new Float32Array(data.colors);
        const uvArray = new Float32Array(data.uvs);
        const overlayUVArray = new Float32Array(data.overlayUVs);
        this._template = null;
        this._data = null;
        return [
            [
                positionArray,
                normalsArray,
                indiciesArray,
                faceDataArray,
                AOColorsArray,
                RGBLightColorsArray,
                sunLightColorsArray,
                colorsArray,
                uvArray,
                overlayUVArray,
            ],
            [
                positionArray.buffer,
                normalsArray.buffer,
                indiciesArray.buffer,
                faceDataArray.buffer,
                AOColorsArray.buffer,
                RGBLightColorsArray.buffer,
                sunLightColorsArray.buffer,
                colorsArray.buffer,
                uvArray.buffer,
                overlayUVArray.buffer,
            ],
        ];
    },
    data: GetConstructorDataTool(),
    quad: {
        _direction: "top",
        _faceData: 0,
        _fliped: false,
        _cachedPosition: { x: 0, y: 0, z: 0 },
        _dimension: { height: 0, width: 0 },
        _transform: {
            1: { x: 0, y: 0, z: 0 },
            2: { x: 0, y: 0, z: 0 },
            3: { x: 0, y: 0, z: 0 },
            4: { x: 0, y: 0, z: 0 },
        },
        setAnimationState(type) {
            this._faceData = MeshFaceDataByte.setAnimationType(type, this._faceData);
            return this;
        },
        setDimensions(width = 0, height = 0) {
            this._dimension.width = width;
            this._dimension.height = height;
            return this;
        },
        setPosition(x = 0, y = 0, z = 0) {
            VoxelMehserTool._data.position.x = x;
            VoxelMehserTool._data.position.y = y;
            VoxelMehserTool._data.position.z = z;
            this._cachedPosition.x = x;
            this._cachedPosition.y = y;
            this._cachedPosition.z = z;
            return this;
        },
        updatePosition(x = 0, y = 0, z = 0) {
            VoxelMehserTool._data.position.x = this._cachedPosition.x + x;
            VoxelMehserTool._data.position.y = this._cachedPosition.y + y;
            VoxelMehserTool._data.position.z = this._cachedPosition.z + z;
            return this;
        },
        updatePositionInPlace(x = 0, y = 0, z = 0) {
            VoxelMehserTool._data.position.x += x;
            VoxelMehserTool._data.position.y += y;
            VoxelMehserTool._data.position.z += z;
            return this;
        },
        setTransform(vertex, x = 0, y = 0, z = 0) {
            const t = this._transform[vertex];
            t.x = x;
            t.y = y;
            t.z = z;
            return this;
        },
        clearTransform() {
            this.setTransform(1);
            this.setTransform(2);
            this.setTransform(3);
            this.setTransform(4);
        },
        setFlipped(flipped) {
            this._fliped = flipped;
            return this;
        },
        setDirection(direction) {
            this._direction = direction;
            return this;
        },
        create() {
            GeometryBuilder.createQuad(this._direction, this._dimension, VoxelMehserTool._data.position, this._fliped, this._transform);
            const faceData = this._faceData;
            VoxelMehserTool._data.faceData.push(faceData, faceData, faceData, faceData);
            this._faceData = 0;
            return VoxelMehserTool.quad;
        },
        clear() {
            this.uvs.clear();
            this._fliped = false;
            this._cachedPosition.x = 0;
            this._cachedPosition.y = 0;
            this._cachedPosition.z = 0;
            for (let i = 1; i < 5; i++) {
                this._transform[i].x = 0;
                this._transform[i].y = 0;
                this._transform[i].z = 0;
            }
        },
        oUVS: {
            getCurrent() {
                const data = VoxelMehserTool._data;
                let i = data.overylayUVTemplateIndex;
                return [
                    data.overylayUVTemplate[i],
                    data.overylayUVTemplate[i + 1],
                    data.overylayUVTemplate[i + 2],
                    data.overylayUVTemplate[i + 3],
                ];
            },
            add(cumstomUVS) {
                const data = VoxelMehserTool._data;
                let uv1 = 0;
                let uv2 = 0;
                let uv3 = 0;
                let uv4 = 0;
                if (!cumstomUVS) {
                    let i = data.overylayUVTemplateIndex;
                    uv1 = data.overylayUVTemplate[i];
                    uv2 = data.overylayUVTemplate[i + 1];
                    uv3 = data.overylayUVTemplate[i + 2];
                    uv4 = data.overylayUVTemplate[i + 3];
                    if (VoxelMehserTool.templateIncrement) {
                        data.overylayUVTemplateIndex += 4;
                    }
                }
                else {
                    if (cumstomUVS.length == 1) {
                        const uv = cumstomUVS[0];
                        uv1 = uv;
                        uv2 = uv;
                        uv3 = uv;
                        uv4 = uv;
                    }
                    else {
                        uv1 = cumstomUVS[0];
                        uv2 = cumstomUVS[1];
                        uv3 = cumstomUVS[2];
                        uv4 = cumstomUVS[3];
                    }
                }
                let i = 4;
                while (i--) {
                    data.overlayUVs.push(uv1, uv2, uv3, uv4);
                }
                return VoxelMehserTool.quad;
            },
        },
        uvs: {
            _data: {
                width: [0, 1],
                height: [0, 1],
            },
            _fliped: false,
            _rotation: 0,
            clear() {
                this._data.width[0] = 0;
                this._data.width[1] = 1;
                this._data.height[0] = 0;
                this._data.height[1] = 1;
                this._fliped = false;
                this._rotation = 0;
            },
            setFlipped(flipped) {
                this._fliped = flipped;
                return this;
            },
            setWidth(start, end) {
                this._data.width[0] = start;
                this._data.width[1] = end;
                return this;
            },
            setHeight(start, end) {
                this._data.height[0] = start;
                this._data.height[1] = end;
                return this;
            },
            setRoation(rotation) {
                this._rotation = rotation;
                return this;
            },
            getCurrentUV() {
                const data = VoxelMehserTool._data;
                return data.unTemplate[data.uvTemplateIndex];
            },
            add(uv) {
                const data = VoxelMehserTool._data;
                if (!uv) {
                    uv = this.getCurrentUV();
                    if (VoxelMehserTool.templateIncrement) {
                        data.uvTemplateIndex += 1;
                    }
                }
                UVHelper.addUVs(VoxelMehserTool.face._face, {
                    uvs: data.uvs,
                    uv: uv,
                    width: { start: this._data.width[0], end: this._data.width[1] },
                    height: { start: this._data.height[0], end: this._data.height[1] },
                    flipped: this._fliped,
                    rotoate: this._rotation,
                });
                return VoxelMehserTool.quad;
            },
        },
        AO: {
            toLinearSpace(r, g, b) {
                r = r ** 2.2;
                g = g ** 2.2;
                b = b ** 2.2;
                return [r, g, b];
            },
            add(stride = 4) {
                if (stride == 4) {
                    for (let v = 0; v < 4; v++) {
                        const aColor = VoxelMehserTool._data.aoTemplate[VoxelMehserTool._data.aoIndex + v];
                        const newColor = this.toLinearSpace(aColor, aColor, aColor);
                        VoxelMehserTool._data.AOColors.push(newColor[0], newColor[1], newColor[2], 1);
                    }
                    if (VoxelMehserTool.templateIncrement) {
                        VoxelMehserTool._data.aoIndex += 4;
                    }
                }
                if (stride == 1) {
                    const aoValue = VoxelMehserTool._data.aoTemplate[VoxelMehserTool._data.aoIndex];
                    for (let v = 0; v < 4; v++) {
                        const newColor = this.toLinearSpace(aoValue, aoValue, aoValue);
                        VoxelMehserTool._data.AOColors.push(newColor[0], newColor[1], newColor[2], 1);
                    }
                    if (VoxelMehserTool.templateIncrement) {
                        VoxelMehserTool._data.aoIndex += 1;
                    }
                }
                return VoxelMehserTool.quad;
            },
            addCustom(data) { },
        },
        light: {
            lightMap: [
                0.06, 0.1, 0.11, 0.14, 0.17, 0.21, 0.26, 0.31, 0.38, 0.45, 0.54, 0.64, 0.74,
                0.85, 0.97, 1,
            ],
            add(stride = 4) {
                if (stride == 4) {
                    for (let v = 0; v < 4; v++) {
                        const values = LightData.getLightValues(VoxelMehserTool._data.lightTemplate[VoxelMehserTool._data.lightIndex + v]);
                        const s = this.lightMap[values[0]];
                        const r = this.lightMap[values[1]];
                        const g = this.lightMap[values[2]];
                        const b = this.lightMap[values[3]];
                        VoxelMehserTool._data.sunLightColors.push(s, s, s, 1);
                        VoxelMehserTool._data.RGBLightColors.push(r, g, b, 1);
                    }
                    if (VoxelMehserTool.templateIncrement) {
                        VoxelMehserTool._data.lightIndex += 4;
                    }
                }
                if (stride == 1) {
                    const lightValue = VoxelMehserTool._data.lightTemplate[VoxelMehserTool._data.lightIndex];
                    const values = LightData.getLightValues(lightValue);
                    const s = this.lightMap[values[0]];
                    const r = this.lightMap[values[1]];
                    const g = this.lightMap[values[2]];
                    const b = this.lightMap[values[3]];
                    for (let v = 0; v < 4; v++) {
                        VoxelMehserTool._data.sunLightColors.push(s, s, s, 1);
                        VoxelMehserTool._data.RGBLightColors.push(r, g, b, 1);
                    }
                    if (VoxelMehserTool.templateIncrement) {
                        VoxelMehserTool._data.lightIndex += 1;
                    }
                }
                return VoxelMehserTool.quad;
            },
            addCustom(data) { },
        },
    },
    face: {
        _face: "top",
        _exposed: false,
        loadIn(face) {
            this._face = face;
            const flipped = FaceByte.getFaceRotateState(face, VoxelMehserTool._data.face) == 1;
            VoxelMehserTool.quad.setFlipped(flipped);
            this._exposed = FaceByte.isFaceExposed(face, VoxelMehserTool._data.face);
            VoxelMehserTool.quad.uvs.setFlipped(flipped);
            VoxelMehserTool.quad.uvs.setRoation(FaceByte.getFaceTextureState(face, VoxelMehserTool._data.face));
            return this;
        },
        isExposed() {
            return this._exposed;
        },
    },
};
