import { ChunkVoxels } from "Meta/Chunks/Chunk.types";
import { PositionMatrix } from "Meta/Util.types";
/**# Flat 3D Array
 * ---
 * Used to treat a 1d array as a 3d array.
 */
export declare const Flat3DArray: {
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
    setValue(x: number, y: number, z: number, array: ChunkVoxels, value: number): void;
    delete(x: number, y: number, z: number, array: ChunkVoxels): void;
    getIndex(x: number, y: number, z: number): number;
    getXYZ(index: number): PositionMatrix;
};
