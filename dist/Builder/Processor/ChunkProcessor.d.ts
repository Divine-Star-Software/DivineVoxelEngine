import type { ChunkVoxels, FullChunkTemplate } from "Meta/Chunks/Chunk.types.js";
import { MatrixLoadedChunk } from "Meta/Matrix/Matrix.types.js";
/**# Chunk Processor
 * ---
 * Takes the given world data and generates templates
 * to build chunk meshes.
 */
export declare const ChunkProcessor: {
    heightByte: {
        heightMapArray: {
            bounds: {
                x: number;
                y: number;
                z: number;
            };
            _position: {
                x: number;
                y: number;
                z: number;
            };
            setBounds(x: number, y: number, z: number): void;
            getValue(x: number, y: number, z: number, array: ChunkVoxels): number;
            getValueUseObj(position: import("../../Meta/Util.types.js").PositionMatrix, array: ChunkVoxels): number;
            setValue(x: number, y: number, z: number, array: ChunkVoxels, value: number): void;
            setValueUseObj(position: import("../../Meta/Util.types.js").PositionMatrix, array: ChunkVoxels, value: number): void;
            deleteValue(x: number, y: number, z: number, array: ChunkVoxels): void;
            deleteUseObj(position: import("../../Meta/Util.types.js").PositionMatrix, array: ChunkVoxels): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../../Meta/Util.types.js").PositionMatrix;
        };
        positionByte: {
            _poisiton: {
                x: number;
                y: number;
                z: number;
            };
            getY(byteData: number): number;
            getPosition(byteData: number): {
                x: number;
                y: number;
                z: number;
            };
            setPosition(x: number, y: number, z: number): number;
            setPositionUseObj(positionObj: import("../../Meta/Util.types.js").PositionMatrix): number;
        };
        _getHeightMapData: Record<import("../../Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
        _setHeightMapData: Record<import("../../Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
        _markSubstanceAsNotExposed: Record<import("../../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
        _markSubstanceAsExposed: Record<import("../../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
        _isSubstanceExposed: Record<import("../../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
        getStartingHeightMapValue(): number;
        updateChunkMinMax(voxelPOS: import("../../Meta/Util.types.js").PositionMatrix, minMax: Uint32Array): void;
        calculateHeightRemoveDataForSubstance(height: number, substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): boolean | undefined;
        calculateHeightAddDataForSubstance(height: number, substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        getLowestExposedVoxel(x: number, z: number, heightMap: Uint32Array): number;
        getHighestExposedVoxel(x: number, z: number, heightMap: Uint32Array): number;
        isSubstanceExposed(substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): boolean;
        markSubstanceAsExposed(substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        markSubstanceAsNotExposed(substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        setMinYForSubstance(height: number, substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        getMinYForSubstance(substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): number;
        setMaxYForSubstance(height: number, substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        getMaxYForSubstance(substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): number;
    };
    voxelByte: {
        setId(id: number, value: number): number;
        getId(value: number): number;
        decodeLightFromVoxelData(voxelData: number): number;
        encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
    };
    faceByte: {
        _setFaceTextureState: Record<import("../../Meta/Util.types.js").DirectionNames, (state: number, faceBit: number) => number>;
        _getFaceTextureState: Record<import("../../Meta/Util.types.js").DirectionNames, (faceBit: number) => number>;
        _setFaceRotateState: Record<import("../../Meta/Util.types.js").DirectionNames, (state: number, faceBit: number) => number>;
        _getFaceRotateState: Record<import("../../Meta/Util.types.js").DirectionNames, (faceBit: number) => number>;
        _markExposedFace: Record<import("../../Meta/Util.types.js").DirectionNames, (faceBit: number) => number>;
        _checkExposedFace: Record<import("../../Meta/Util.types.js").DirectionNames, (faceBit: number) => boolean>;
        markFaceAsExposed(direction: import("../../Meta/Util.types.js").DirectionNames, rawData: number): number;
        isFaceExposed(direction: import("../../Meta/Util.types.js").DirectionNames, rawData: number): boolean;
        setFaceRotateState(direction: import("../../Meta/Util.types.js").DirectionNames, state: number, rawData: number): number;
        getFaceRotateState(direction: import("../../Meta/Util.types.js").DirectionNames, rawData: number): number;
        setFaceTextureState(direction: import("../../Meta/Util.types.js").DirectionNames, state: number, rawData: number): number;
        getFaceTextureState(direction: import("../../Meta/Util.types.js").DirectionNames, rawData: number): number;
    };
    _3dArray: {
        bounds: {
            x: number;
            y: number;
            z: number;
        };
        _position: {
            x: number;
            y: number;
            z: number;
        };
        setBounds(x: number, y: number, z: number): void;
        getValue(x: number, y: number, z: number, array: ChunkVoxels): number;
        getValueUseObj(position: import("../../Meta/Util.types.js").PositionMatrix, array: ChunkVoxels): number;
        setValue(x: number, y: number, z: number, array: ChunkVoxels, value: number): void;
        setValueUseObj(position: import("../../Meta/Util.types.js").PositionMatrix, array: ChunkVoxels, value: number): void;
        deleteValue(x: number, y: number, z: number, array: ChunkVoxels): void;
        deleteUseObj(position: import("../../Meta/Util.types.js").PositionMatrix, array: ChunkVoxels): void;
        getIndex(x: number, y: number, z: number): number;
        getXYZ(index: number): import("../../Meta/Util.types.js").PositionMatrix;
    };
    chunkTemplates: Record<number, Record<number, number[][]>>;
    exposedFaces: number[];
    faceStates: number[];
    getBaseTemplateNew(): FullChunkTemplate;
    makeAllChunkTemplates(chunk: MatrixLoadedChunk, chunkX: number, chunkY: number, chunkZ: number): FullChunkTemplate;
};
