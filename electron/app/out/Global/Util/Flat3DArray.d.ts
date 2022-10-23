import { Position3Matrix } from "Meta/Util.types";
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
    getValue(x: number, y: number, z: number, array: Uint32Array | number[]): number;
    getValueUseObj(position: Position3Matrix, array: Uint32Array | number[]): number;
    getValueUseObjSafe(position: Position3Matrix, array: Uint32Array | number[]): number;
    setValue(x: number, y: number, z: number, array: Uint32Array | number[], value: number): void;
    setValueUseObj(position: Position3Matrix, array: Uint32Array | number[], value: number): void;
    setValueUseObjSafe(position: Position3Matrix, array: Uint32Array | number[], value: number): void;
    deleteValue(x: number, y: number, z: number, array: Uint32Array | number[]): void;
    deleteUseObj(position: Position3Matrix, array: Uint32Array | number[]): void;
    getIndex(x: number, y: number, z: number): number;
    getXYZ(index: number): Position3Matrix;
};
