import type { ChunkVoxels, FullChunkTemplate } from "Meta/Chunks/Chunk.types.js";
/**# Chunk Processor
 * ---
 * Takes the given world data and generates templates
 * to build chunk meshes.
 */
export declare const ChunkProcessor: {
    voxelByte: {
        setId(id: number, value: number): number;
        getId(value: number): number;
        decodeLightFromVoxelData(voxelData: number): number;
        encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
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
    getBaseTemplateNew(): FullChunkTemplate;
    makeAllChunkTemplates(voxels: ChunkVoxels, chunkX: number, chunkY: number, chunkZ: number): FullChunkTemplate;
};
