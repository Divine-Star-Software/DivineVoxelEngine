import { LightData } from "../Data/Light/LightByte.js";
import { VoxelReader } from "../Data/Voxel/VoxelByte.js";
import { Flat3DArray } from "./Util/Flat3DArray.js";
import { GetWorkerPort } from "./Util/GetWorkerPort.js";
import { CreatePromiseCheck } from "./Util/CreatePromiseCheck.js";
import { FaceByte } from "./Util/FaceByte.js";
import { HeightMapData } from "../Data/Chunk/HeightByte.js";
import { HeightMapArray } from "../Data/Chunk/HeightMapArray.js";
import { MeshFaceDataByte } from "./Util/MeshFaceDataBytes.js";
import { DataEncoder } from "./Util/DataEncoder.js";
import { EntityFlat3dArray } from "./Util/EntityFlat3dArray.js";
import { Queue } from "./Util/Queue.js";
import { ChunkReader } from "../Data/Chunk/ChunkReader.js";
export const Util = {
    createPromiseCheck: CreatePromiseCheck,
    getWorkerPort: GetWorkerPort,
    getEnviorment() {
        let environment = "browser";
        //@ts-ignore
        if (typeof process !== "undefined" && typeof Worker === "undefined") {
            environment = "node";
        }
        return environment;
    },
    getChunkReader() {
        return ChunkReader;
    },
    getAQueue() {
        return new Queue();
    },
    merge(target, newObject) {
        return Object.assign(target, newObject);
    },
    getEntityFlat3dArray() {
        return EntityFlat3dArray;
    },
    getDataEncoder() {
        return DataEncoder;
    },
    getMeshFaceDataByte() {
        return MeshFaceDataByte;
    },
    getFlat3DArray() {
        return Flat3DArray;
    },
    getFaceByte() {
        return FaceByte;
    },
    getHeightMapArray() {
        return HeightMapArray;
    },
    getHeightByte() {
        return HeightMapData;
    },
    getVoxelByte() {
        return VoxelReader;
    },
    getLightByte() {
        return LightData;
    },
    degtoRad(degrees) {
        return degrees * (Math.PI / 180);
    },
    radToDeg(radians) {
        return radians * (180 / Math.PI);
    },
};
