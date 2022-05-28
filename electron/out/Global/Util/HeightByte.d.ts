import { VoxelTemplateSubstanceType } from "Meta/index";
import { PositionMatrix } from "Meta/Util.types.js";
/**# Height Byte
 * ---
 * Interpets height map data.
 */
export declare const HeightByte: {
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
        getValue(x: number, y: number, z: number, array: import("Meta/index").ChunkVoxels): number;
        getValueUseObj(position: PositionMatrix, array: import("Meta/index").ChunkVoxels): number;
        setValue(x: number, y: number, z: number, array: import("Meta/index").ChunkVoxels, value: number): void;
        setValueUseObj(position: PositionMatrix, array: import("Meta/index").ChunkVoxels, value: number): void;
        deleteValue(x: number, y: number, z: number, array: import("Meta/index").ChunkVoxels): void;
        deleteUseObj(position: PositionMatrix, array: import("Meta/index").ChunkVoxels): void;
        getIndex(x: number, y: number, z: number): number;
        getXYZ(index: number): PositionMatrix;
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
        setPositionUseObj(positionObj: PositionMatrix): number;
    };
    _getHeightMapData: Record<VoxelTemplateSubstanceType, (byteData: number) => number>;
    _setHeightMapData: Record<VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
    _markSubstanceAsNotExposed: Record<VoxelTemplateSubstanceType, (data: number) => number>;
    _markSubstanceAsExposed: Record<VoxelTemplateSubstanceType, (data: number) => number>;
    _isSubstanceExposed: Record<VoxelTemplateSubstanceType, (data: number) => boolean>;
    getStartingHeightMapValue(): number;
    updateChunkMinMax(voxelPOS: PositionMatrix, minMax: Uint32Array): void;
    calculateHeightRemoveDataForSubstance(height: number, substance: VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): boolean | undefined;
    calculateHeightAddDataForSubstance(height: number, substance: VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
    getLowestExposedVoxel(x: number, z: number, heightMap: Uint32Array): number;
    getHighestExposedVoxel(x: number, z: number, heightMap: Uint32Array): number;
    isSubstanceExposed(substance: VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): boolean;
    markSubstanceAsExposed(substance: VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
    markSubstanceAsNotExposed(substance: VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
    setMinYForSubstance(height: number, substance: VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
    getMinYForSubstance(substance: VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): number;
    setMaxYForSubstance(height: number, substance: VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
    getMaxYForSubstance(substance: VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): number;
};
