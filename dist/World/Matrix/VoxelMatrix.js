import { DVEW } from "../DivineVoxelEngineWorld.js";
import { VoxelDataByteLengths, VoxelDataIndexes, VoxelSubstanceMap, } from "../../Constants/Voxels/VoxelData.js";
import { MatrixMap } from "./MatrixMap.js";
export const VoxelMatrix = {
    byteLength: VoxelDataByteLengths,
    indexes: VoxelDataIndexes,
    matrixMap: MatrixMap,
    substanceMap: VoxelSubstanceMap,
    voxelData: {
        substance: 0,
        shapeId: 0,
        hardness: 0,
        material: 0,
        checkCollision: 0,
        colliderId: 0,
        lightSource: 0,
        lightValue: 0,
    },
    voxelDataMapped: {
        substance: "solid",
        shapeId: 0,
        hardness: 0,
        material: 0,
        checkCollision: 0,
        colliderId: 0,
        lightSource: 0,
        lightValue: 0,
    },
    voxelBuffer: new SharedArrayBuffer(0),
    voxelDataView: new DataView(new ArrayBuffer(0)),
    voxelMapBuffer: new SharedArrayBuffer(0),
    voxelMap: new Uint16Array(0),
    __isReady: false,
    $INIT() {
        const shapeMap = DVEW.matrixMap.shapeMap;
        const totalVoxels = Object.keys(DVEW.voxelManager.voxelData).length;
        const buffer = new SharedArrayBuffer(totalVoxels * this.byteLength.totalLength);
        const dv = new DataView(buffer);
        const totalRegisteredVoxels = DVEW.worldGeneration.voxelPalette.voxelPaletteCount;
        const voxelMapBuffer = new SharedArrayBuffer(totalRegisteredVoxels * 2);
        const voxelMap = new Uint16Array(voxelMapBuffer);
        const vp = DVEW.worldGeneration.voxelPalette;
        let currentCount = 0;
        let currentParent = 2;
        for (let i = 2; i < voxelMap.length; i++) {
            let newParent = vp.getVoxelPartentId(i);
            if (newParent != currentParent) {
                currentCount++;
                currentParent = newParent;
            }
            voxelMap[i] = currentCount;
        }
        const done = {};
        for (let paletteId = 2; paletteId < voxelMap.length; paletteId++) {
            const indexId = voxelMap[paletteId];
            if (done[indexId])
                continue;
            done[indexId] = true;
            const tvid = vp.getVoxelTrueId(paletteId);
            const vdata = DVEW.voxelManager.getVoxelData(tvid);
            let index = indexId * this.byteLength.totalLength;
            //substance
            dv.setUint8(index + this.indexes.substance, this.substanceMap[vdata.substance]);
            //shapeId
            dv.setUint16(index + this.indexes.shapeId, shapeMap[vdata.shapeId]);
            //hardness
            dv.setUint16(index + this.indexes.hardness, vdata.hardnress);
            //material
            dv.setUint16(index + this.indexes.material, 0);
            //check collisions
            dv.setUint8(index + this.indexes.checkCollision, vdata.physics?.checkCollisions ? 1 : 0);
            //collider id
            dv.setUint16(index + this.indexes.colliderId, vdata.physics?.collider ? 1 : 0);
            //light source
            dv.setUint8(index + this.indexes.lightSource, vdata.lightSource ? 1 : 0);
            //light value
            dv.setUint16(index + this.indexes.lightValue, vdata.lightValue ? vdata.lightValue : 0);
        }
        this.voxelMapBuffer = voxelMapBuffer;
        this.voxelMap = voxelMap;
        this.voxelBuffer = buffer;
        this.voxelDataView = dv;
    },
    getVoxelData(id) {
        const index = this.voxelMap[id] * this.byteLength.totalLength;
        this.voxelData.substance = this.voxelDataView.getUint8(this.indexes.substance + index);
        this.voxelData.shapeId = this.voxelDataView.getUint16(this.indexes.shapeId + index);
        this.voxelData.hardness = this.voxelDataView.getUint16(this.indexes.hardness + index);
        this.voxelData.material = this.voxelDataView.getUint16(this.indexes.material + index);
        this.voxelData.checkCollision = this.voxelDataView.getUint8(this.indexes.checkCollision + index);
        this.voxelData.colliderId = this.voxelDataView.getUint16(this.indexes.colliderId + index);
        this.voxelData.lightSource = this.voxelDataView.getUint8(this.indexes.lightSource + index);
        this.voxelData.lightValue = this.voxelDataView.getUint16(this.indexes.lightValue + index);
        return this.voxelData;
    },
    getSubstance(id) {
        const index = this.voxelMap[id] * this.byteLength.totalLength;
        return this.voxelDataView.getUint8(this.indexes.substance + index);
    },
    getTrueSubstance(id) {
        const index = this.voxelMap[id] * this.byteLength.totalLength;
        const substnaceId = this.voxelDataView.getUint8(this.indexes.substance + index);
        return this.matrixMap.substanceRecord[substnaceId];
    },
    getShapeId(id) {
        const index = this.voxelMap[id] * this.byteLength.totalLength;
        return this.voxelDataView.getUint8(this.indexes.shapeId + index);
    },
    getHardness(id) {
        const index = this.voxelMap[id] * this.byteLength.totalLength;
        return this.voxelDataView.getUint8(this.indexes.hardness + index);
    },
    getCheckCollisions(id) {
        const index = this.voxelMap[id] * this.byteLength.totalLength;
        return this.voxelDataView.getUint8(this.indexes.checkCollision + index);
    },
    getColliderId(id) {
        const index = this.voxelMap[id] * this.byteLength.totalLength;
        return this.voxelDataView.getUint8(this.indexes.colliderId + index);
    },
    isLightSource(id) {
        const index = this.voxelMap[id] * this.byteLength.totalLength;
        return this.voxelDataView.getUint8(this.indexes.lightSource + index);
    },
    getLightValue(id) {
        const index = this.voxelMap[id] * this.byteLength.totalLength;
        return this.voxelDataView.getUint8(this.indexes.lightValue + index);
    },
};
