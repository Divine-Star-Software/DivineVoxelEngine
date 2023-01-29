//data
import { MeshFaceDataByte } from "../../../Data/Meshing/MeshFaceDataBytes.js";
import { LightData } from "../../../Data/Light/LightByte.js";
import { FaceByte } from "../../../Data/Meshing/FaceByte.js";
import { GetConstructorDataTool } from "../../Tools/Data/ConstructorDataTool.js";
import { GeometryBuilder } from "../Geometry/GeometryBuilder.js";
const dataTool = GetConstructorDataTool();
/**# Voxel Mesher Tool
 * ---
 * Tool desinged to help make it easy to build voxel meshes.
 */
export const VoxelMesher = {
    _data: {},
    _template: {},
    templateIncrement: true,
    setTemplateIncrement(onOff) {
        this.templateIncrement = onOff;
        return this;
    },
    $buildMesh(type, template, LOD = 1, location) {
        const data = {
            substance: type,
            LOD: LOD,
            //mesh data
            positions: [],
            normals: [],
            indices: [],
            faceData: [],
            lightColors: [],
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
            if (!this.data.loadInAt(location[1] + data.position.x, location[2] + data.position.y, location[3] + data.position.z)) {
                return false;
            }
            if (!this.data.isRenderable()) {
                return false;
            }
            this.quad.setPosition(data.position.x, data.position.y, data.position.z);
            data.face = template.faceTemplate[i];
            data.shapeState = this.data.getShapeState();
            this.data.getVoxelShapeObj().build(this);
            if (data.flowTemplate) {
                if (this.templateData.loadIn("top").isExposed()) {
                    data.flowTemplateIndex += 4;
                }
            }
            this.quad.clear();
            i++;
        }
        GeometryBuilder.clearData();
        const positionArray = new Float32Array(data.positions);
        const normalsArray = new Float32Array(data.normals);
        const indiciesArray = new Uint16Array(data.indices);
        const faceDataArray = new Float32Array(data.faceData);
        const AOColorsArray = new Float32Array(data.AOColors);
        const lightColors = new Float32Array(data.lightColors);
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
                lightColors,
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
                lightColors.buffer,
                colorsArray.buffer,
                uvArray.buffer,
                overlayUVArray.buffer,
            ],
        ];
    },
    data: dataTool,
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
            this._faceData = type;
            this._faceData = MeshFaceDataByte.setAnimationType(type, this._faceData);
            return this;
        },
        setDimensions(width = 0, height = 0) {
            this._dimension.width = width;
            this._dimension.height = height;
            return this;
        },
        setPosition(x = 0, y = 0, z = 0) {
            VoxelMesher._data.position.x = x;
            VoxelMesher._data.position.y = y;
            VoxelMesher._data.position.z = z;
            this._cachedPosition.x = x;
            this._cachedPosition.y = y;
            this._cachedPosition.z = z;
            return this;
        },
        updatePosition(x = 0, y = 0, z = 0) {
            VoxelMesher._data.position.x = this._cachedPosition.x + x;
            VoxelMesher._data.position.y = this._cachedPosition.y + y;
            VoxelMesher._data.position.z = this._cachedPosition.z + z;
            return this;
        },
        updatePositionInPlace(x = 0, y = 0, z = 0) {
            VoxelMesher._data.position.x += x;
            VoxelMesher._data.position.y += y;
            VoxelMesher._data.position.z += z;
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
            return this;
        },
        setFlipped(flipped) {
            this._fliped = flipped;
            this.uvs._fliped = flipped;
            return this;
        },
        setDirection(direction) {
            this._direction = direction;
            return this;
        },
        create() {
            GeometryBuilder.createQuad(this._direction, this._dimension, VoxelMesher._data.position, this._fliped, this._transform);
            const faceData = this._faceData;
            VoxelMesher._data.faceData.push(faceData, faceData, faceData, faceData);
            this._faceData = 0;
            return VoxelMesher.quad;
        },
        addData(stride = 4, animationState = 0, doAO = true) {
            this.setAnimationState(animationState).uvs.add().oUVS.add();
            if (doAO) {
                this.AO.add(stride);
            }
            this.light.add(stride);
            return this;
        },
        clear() {
            this.uvs.clear();
            this.uvs.resetAdvancedUVs();
            this._fliped = false;
            this._cachedPosition.x = 0;
            this._cachedPosition.y = 0;
            this._cachedPosition.z = 0;
            for (let i = 1; i < 5; i++) {
                this._transform[i].x = 0;
                this._transform[i].y = 0;
                this._transform[i].z = 0;
            }
            return VoxelMesher;
        },
        oUVS: {
            getCurrent() {
                const data = VoxelMesher._data;
                let i = data.overylayUVTemplateIndex;
                return [
                    data.overylayUVTemplate[i],
                    data.overylayUVTemplate[i + 1],
                    data.overylayUVTemplate[i + 2],
                    data.overylayUVTemplate[i + 3],
                ];
            },
            add(cumstomUVS) {
                const data = VoxelMesher._data;
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
                    if (VoxelMesher.templateIncrement) {
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
                return VoxelMesher.quad;
            },
        },
        uvs: {
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
            },
            addAdvancedUVs(uv) {
                const data = VoxelMesher._data;
                if (!uv) {
                    uv = this.getCurrentUV();
                    if (VoxelMesher.templateIncrement) {
                        data.uvTemplateIndex += 1;
                    }
                }
                GeometryBuilder.quads.uvs.addAdvancedUVs(VoxelMesher.quad._direction, uv, VoxelMesher._data.uvs, this.advancedUVs, this._fliped);
                return this;
            },
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
                const data = VoxelMesher._data;
                return data.unTemplate[data.uvTemplateIndex];
            },
            add(uv) {
                const data = VoxelMesher._data;
                if (!uv) {
                    uv = this.getCurrentUV();
                    if (VoxelMesher.templateIncrement) {
                        data.uvTemplateIndex += 1;
                    }
                }
                GeometryBuilder.quads.uvs.addUVs(VoxelMesher.quad._direction, {
                    uvs: data.uvs,
                    uv: uv,
                    width: { start: this._data.width[0], end: this._data.width[1] },
                    height: { start: this._data.height[0], end: this._data.height[1] },
                    flipped: this._fliped,
                    rotoate: this._rotation,
                });
                return VoxelMesher.quad;
            },
        },
        AO: {
            add(stride = 4) {
                if (stride == 4) {
                    for (let v = 0; v < 4; v++) {
                        const aColor = VoxelMesher._data.aoTemplate[VoxelMesher._data.aoIndex + v];
                        const newColor = aColor ** 2.2;
                        VoxelMesher._data.AOColors.push(newColor);
                    }
                    if (VoxelMesher.templateIncrement) {
                        VoxelMesher._data.aoIndex += 4;
                    }
                }
                if (stride == 1) {
                    const aoValue = VoxelMesher._data.aoTemplate[VoxelMesher._data.aoIndex];
                    const newColor = aoValue ** 2.2;
                    for (let v = 0; v < 4; v++) {
                        VoxelMesher._data.AOColors.push(newColor);
                    }
                    if (VoxelMesher.templateIncrement) {
                        VoxelMesher._data.aoIndex += 1;
                    }
                }
                return VoxelMesher.quad;
            },
            addCustom(data) {
                if (data.length == 4) {
                    for (let v = 0; v < 4; v++) {
                        let aColor = data[v];
                        if (aColor < 0) {
                            aColor =
                                VoxelMesher._data.aoTemplate[VoxelMesher._data.aoIndex + Math.abs(aColor) - 1];
                        }
                        const newColor = aColor ** 2.2;
                        VoxelMesher._data.AOColors.push(newColor);
                    }
                    if (VoxelMesher.templateIncrement) {
                        VoxelMesher._data.aoIndex += 4;
                    }
                }
                if (data.length == 1) {
                    let aoValue = data[0];
                    if (aoValue < 0) {
                        aoValue =
                            VoxelMesher._data.aoTemplate[VoxelMesher._data.aoIndex + Math.abs(aoValue) - 1];
                    }
                    const newColor = aoValue ** 2.2;
                    for (let v = 0; v < 4; v++) {
                        VoxelMesher._data.AOColors.push(newColor);
                    }
                    if (VoxelMesher.templateIncrement) {
                        VoxelMesher._data.aoIndex += 1;
                    }
                }
                return VoxelMesher.quad;
            },
        },
        light: {
            lightMap: [
                0.06, 0.1, 0.11, 0.14, 0.17, 0.21, 0.26, 0.31, 0.38, 0.45, 0.54, 0.64, 0.74,
                0.85, 0.97, 1,
            ],
            add(stride = 4) {
                if (stride == 4) {
                    for (let v = 0; v < 4; v++) {
                        const values = LightData.getLightValues(VoxelMesher._data.lightTemplate[VoxelMesher._data.lightIndex + v]);
                        const s = this.lightMap[values[0]];
                        const r = this.lightMap[values[1]];
                        const g = this.lightMap[values[2]];
                        const b = this.lightMap[values[3]];
                        VoxelMesher._data.lightColors.push(r, g, b, s);
                    }
                    if (VoxelMesher.templateIncrement) {
                        VoxelMesher._data.lightIndex += 4;
                    }
                }
                if (stride == 1) {
                    const lightValue = VoxelMesher._data.lightTemplate[VoxelMesher._data.lightIndex];
                    const values = LightData.getLightValues(lightValue);
                    const s = this.lightMap[values[0]];
                    const r = this.lightMap[values[1]];
                    const g = this.lightMap[values[2]];
                    const b = this.lightMap[values[3]];
                    for (let v = 0; v < 4; v++) {
                        VoxelMesher._data.lightColors.push(r, g, b, s);
                    }
                    if (VoxelMesher.templateIncrement) {
                        VoxelMesher._data.lightIndex += 1;
                    }
                }
                return VoxelMesher.quad;
            },
            addCustom(data) {
                if (data.length == 4) {
                    for (let v = 0; v < 4; v++) {
                        let value = data[v];
                        if (value < 0 && value > -5) {
                            value =
                                VoxelMesher._data.lightTemplate[VoxelMesher._data.lightIndex + Math.abs(value) - 1];
                        }
                        if (value == -5) {
                            value = this._getBrightestLight();
                        }
                        const values = LightData.getLightValues(value);
                        const s = this.lightMap[values[0]];
                        const r = this.lightMap[values[1]];
                        const g = this.lightMap[values[2]];
                        const b = this.lightMap[values[3]];
                        VoxelMesher._data.lightColors.push(r, g, b, s);
                    }
                    if (VoxelMesher.templateIncrement) {
                        VoxelMesher._data.lightIndex += 4;
                    }
                }
                if (data.length == 1) {
                    let lightValue = data[0];
                    if (lightValue < 0 && lightValue > -5) {
                        lightValue =
                            VoxelMesher._data.lightTemplate[VoxelMesher._data.lightIndex + Math.abs(lightValue) - 1];
                    }
                    if (lightValue == -5) {
                        lightValue = this._getBrightestLight();
                    }
                    const values = LightData.getLightValues(lightValue);
                    const s = this.lightMap[values[0]];
                    const r = this.lightMap[values[1]];
                    const g = this.lightMap[values[2]];
                    const b = this.lightMap[values[3]];
                    for (let v = 0; v < 4; v++) {
                        VoxelMesher._data.lightColors.push(r, g, b, s);
                    }
                    if (VoxelMesher.templateIncrement) {
                        VoxelMesher._data.lightIndex += 1;
                    }
                }
                return VoxelMesher.quad;
            },
            _getBrightestLight() {
                const direction = VoxelMesher.quad._direction;
                const x = dataTool.location[1];
                const y = dataTool.location[2];
                const z = dataTool.location[3];
                let l = this._getLight[direction](x, y, z);
                dataTool.loadInAt(x, y, z);
                if (l < 0) {
                    l = dataTool.getLight();
                }
                if (l < 0)
                    l = 0;
                return l;
            },
            _getLight: {
                top: (x, y, z) => {
                    if (!dataTool.loadInAt(x, y + 1, z))
                        return -1;
                    return dataTool.getLight();
                },
                bottom: (x, y, z) => {
                    if (!dataTool.loadInAt(x, y - 1, z))
                        return -1;
                    return dataTool.getLight();
                },
                east: (x, y, z) => {
                    if (!dataTool.loadInAt(x + 1, y, z))
                        return -1;
                    return dataTool.getLight();
                },
                west: (x, y, z) => {
                    if (!dataTool.loadInAt(x - 1, y, z))
                        return -1;
                    return dataTool.getLight();
                },
                south: (x, y, z) => {
                    if (!dataTool.loadInAt(x, y, z - 1))
                        return -1;
                    return dataTool.getLight();
                },
                north: (x, y, z) => {
                    if (!dataTool.loadInAt(x, y, z + 1))
                        return -1;
                    return dataTool.getLight();
                },
            },
        },
    },
    templateData: {
        _face: "top",
        _exposed: false,
        loadIn(face) {
            this._face = face;
            const flipped = FaceByte.getFaceRotateState(face, VoxelMesher._data.face) == 1;
            VoxelMesher.quad.setFlipped(flipped);
            this._exposed = FaceByte.isFaceExposed(face, VoxelMesher._data.face);
            VoxelMesher.quad.uvs.setFlipped(flipped);
            VoxelMesher.quad.uvs.setRoation(FaceByte.getFaceTextureState(face, VoxelMesher._data.face));
            return this;
        },
        isExposed() {
            return this._exposed;
        },
    },
};
