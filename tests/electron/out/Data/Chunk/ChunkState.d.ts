import { VoxelSubstanceType } from "Meta/index.js";
import { Vector3 } from "Meta/Util.types.js";
export declare const ChunkState: {
    positionByte: {
        _poisiton: {
            x: number;
            y: number;
            z: number;
        };
        _positionMasks: {
            x: number;
            z: number;
            y: number;
        };
        getY(byteData: number): number;
        getPosition(byteData: number): {
            x: number;
            y: number;
            z: number;
        };
        setPosition(x: number, y: number, z: number): number;
        setPositionUseObj(positionObj: Vector3): number;
    };
    indexes: {
        states: number;
        minHeight: number;
        maxHeight: number;
        voxelCount1: number;
        voxelCount2: number;
        voxelCount3: number;
    };
    _chunkStates: {
        empty: boolean;
        worldGenDone: boolean;
        sunLightDone: boolean;
        RGBLightDone: boolean;
        liquidDone: boolean;
        magmaDone: boolean;
    };
    _chunkStateMask: {
        empty: number;
        emptyIndex: number;
        worldGenDone: number;
        worldGenIndex: number;
        sunLightDone: number;
        sunLightIndex: number;
        RGBLightDone: number;
        RGBLightIndex: number;
        liquidDone: number;
        liquidIndex: number;
        magmaDone: number;
        magmaIndex: number;
    };
    updateChunkMinMax(voxelPOS: Vector3, chunkStatesData: Uint32Array): void;
    getChunkMin(chunkStatesData: Uint32Array): number;
    getChunkMax(chunkStatesData: Uint32Array): number;
    isEmpty(chunkStatesData: Uint32Array): boolean;
    isWorldGenDone(chunkStatesData: Uint32Array): boolean;
    isSunLightUpdatesDone(chunkStatesData: Uint32Array): boolean;
    isRGBLightUpdatesDone(chunkStatesData: Uint32Array): boolean;
    isLiquidFlowDone(chunkStatesData: Uint32Array): boolean;
    isMagmaFlowDone(chunkStatesData: Uint32Array): boolean;
    getFullChunkStates(chunkStatesData: Uint32Array): {
        empty: boolean;
        worldGenDone: boolean;
        sunLightDone: boolean;
        RGBLightDone: boolean;
        liquidDone: boolean;
        magmaDone: boolean;
    };
    addToVoxelCount(voxelSubstance: VoxelSubstanceType, chunkStatesData: Uint32Array): void;
    subtractFromVoxelCount(voxelSubstance: VoxelSubstanceType, chunkStatesData: Uint32Array): void;
    getTotalVoxels(chunkStatesData: Uint32Array): void;
    getTotalVoxelsOfASubstance(voxelSubstance: VoxelSubstanceType, chunkStatesData: Uint32Array): void;
};
