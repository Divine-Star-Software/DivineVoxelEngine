import { DVEW } from "../DivineVoxelEngineWorld.js";
export const VoxelDataCreator = {
    voxelBuffer: new SharedArrayBuffer(0),
    voxelMapBuffer: new SharedArrayBuffer(0),
    shapeMap: {},
    __shapeMapSet: false,
    isReady() {
        return this.__shapeMapSet;
    },
    $createVoxelData() {
        const byteLength = DVEW.data.register.voxels.byteLengths;
        const indexes = DVEW.data.register.voxels.dataIndexes;
        const substanceMap = DVEW.data.register.voxels.substanceMap;
        const shapeMap = this.shapeMap;
        const totalVoxels = Object.keys(DVEW.voxelManager.voxelData).length;
        const buffer = new SharedArrayBuffer(totalVoxels * byteLength.totalLength);
        const dv = new DataView(buffer);
        const totalRegisteredVoxels = this.palette._count;
        const voxelMapBuffer = new SharedArrayBuffer(totalRegisteredVoxels * 2);
        const voxelMap = new Uint16Array(voxelMapBuffer);
        const vp = this.palette;
        let currentCount = 0;
        let currentParent = 2;
        for (let i = 2; i < voxelMap.length; i++) {
            let newParent = vp.getVoxelBaseId(i);
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
            const tvid = vp.getVoxelStringId(paletteId);
            const vdata = DVEW.voxelManager.getVoxelData(tvid);
            let index = indexId * byteLength.totalLength;
            //substance
            dv.setUint8(index + indexes.substance, substanceMap[vdata.substance]);
            //shapeId
            dv.setUint16(index + indexes.shapeId, shapeMap[vdata.shapeId]);
            //hardness
            dv.setUint16(index + indexes.hardness, vdata.hardnress);
            //material
            dv.setUint16(index + indexes.material, 0);
            //check collisions
            dv.setUint8(index + indexes.checkCollision, vdata.physics?.checkCollisions ? 1 : 0);
            //collider id
            dv.setUint16(index + indexes.colliderId, vdata.physics?.collider ? 1 : 0);
            //light source
            dv.setUint8(index + indexes.lightSource, vdata.lightSource ? 1 : 0);
            //light value
            dv.setUint16(index + indexes.lightValue, vdata.lightValue ? vdata.lightValue : 0);
            //is rich
            dv.setUint8(index + indexes.isRich, vdata.isRich ? 1 : 0);
        }
        this.voxelMapBuffer = voxelMapBuffer;
        this.voxelBuffer = buffer;
        DVEW.data.voxel.syncData(this.voxelBuffer, this.voxelMapBuffer);
        //@ts-ignore
        delete this["shapeMap"];
    },
    setShapeMap(shapeMap) {
        this.shapeMap = shapeMap;
        this.__shapeMapSet = true;
    },
    palette: {
        _count: 2,
        _palette: {
            0: "dve:air",
            1: "dve:barrier",
        },
        _map: {
            "dve:air": 0,
            "dve:barrier": 1,
        },
        registerVoxel(voxel) {
            this._palette[this._count] = voxel.id;
            this._map[voxel.id] = this._count;
            if (voxel.states) {
                for (let i = this._count; i <= this._count + voxel.states; i++) {
                    this._palette[i] = voxel.id;
                }
                this._count += voxel.states;
            }
            this._count++;
        },
        getVoxelBaseId(id) {
            const mainData = this.getVoxelStringId(id);
            return this.getVoxelStateId(mainData, 0);
        },
        getVoxelStateId(voxelId, voxelState) {
            return this._map[voxelId] + voxelState;
        },
        getVoxelStringId(voxelId) {
            return this._palette[voxelId];
        },
        getVoxelState(voxelId) {
            const trueId = this._palette[voxelId];
            const mapId = this._map[trueId];
            return voxelId - mapId;
        },
        get() {
            return this._palette;
        },
        getMap() {
            return this._map;
        },
    },
};
