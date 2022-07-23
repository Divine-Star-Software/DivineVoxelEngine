import { VoxelTemplateSubstanceType } from "Meta/index";
import { Position3Matrix } from "Meta/Util.types.js";
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
        getValue(x: number, y: number, z: number, array: Uint32Array): number;
        getValueUseObj(position: Position3Matrix, array: Uint32Array): number;
        getValueUseObjSafe(position: Position3Matrix, array: Uint32Array): number;
        setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
        setValueUseObj(position: Position3Matrix, array: Uint32Array, value: number): void;
        setValueUseObjSafe(position: Position3Matrix, array: Uint32Array, value: number): void;
        deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
        deleteUseObj(position: Position3Matrix, array: Uint32Array): void;
        getIndex(x: number, y: number, z: number): number;
        getXYZ(index: number): Position3Matrix;
    };
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
        setPositionUseObj(positionObj: Position3Matrix): number;
    };
    _getHeightMapData: Record<VoxelTemplateSubstanceType, (byteData: number) => number>;
    _setHeightMapData: Record<VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
    _markSubstanceAsNotExposed: Record<VoxelTemplateSubstanceType, (data: number) => number>;
    _markSubstanceAsExposed: Record<VoxelTemplateSubstanceType, (data: number) => number>;
    _isSubstanceExposed: Record<VoxelTemplateSubstanceType, (data: number) => boolean>;
    getStartingHeightMapValue(): number;
    updateChunkMinMax(voxelPOS: Position3Matrix, minMax: Uint32Array): void;
    getChunkMin(minMax: Uint32Array): number;
    getChunkMax(minMax: Uint32Array): number;
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
