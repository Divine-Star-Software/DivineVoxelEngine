import type { VoxelTemplateSubstanceType } from "Meta/index";
import type { Position3Matrix } from "Meta/Util.types.js";
/**# Height Byte
 * ---
 * Interpets height map data.
 */
export declare const HeightMapData: {
    _getHeightMapData: Record<VoxelTemplateSubstanceType, (byteData: number) => number>;
    _setHeightMapData: Record<VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
    _markSubstanceAsNotExposed: Record<VoxelTemplateSubstanceType, (data: number) => number>;
    _markSubstanceAsExposed: Record<VoxelTemplateSubstanceType, (data: number) => number>;
    _isSubstanceExposed: Record<VoxelTemplateSubstanceType, (data: number) => boolean>;
    getStartingHeightMapValue(): number;
    initalizeChunk(chunkData: DataView): void;
    updateChunkMinMax(voxelPOS: Position3Matrix, chunkData: DataView): void;
    getChunkMin(chunkData: DataView): number;
    getChunkMax(chunkData: DataView): number;
    calculateHeightRemoveDataForSubstance(height: number, substance: VoxelTemplateSubstanceType, x: number, z: number, heightMap: DataView): boolean | undefined;
    calculateHeightAddDataForSubstance(height: number, substance: VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
    getLowestExposedVoxel(x: number, z: number, chunk: DataView): number;
    getHighestExposedVoxel(x: number, z: number, chunk: DataView): number;
    isSubstanceExposed(substance: VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): boolean;
    markSubstanceAsExposed(substance: VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
    markSubstanceAsNotExposed(substance: VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
    setMinYForSubstance(height: number, substance: VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
    getMinYForSubstance(substance: VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
    setMaxYForSubstance(height: number, substance: VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
    getMaxYForSubstance(substance: VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
};
