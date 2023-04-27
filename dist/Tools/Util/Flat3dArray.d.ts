import type { Position3Matrix, Vec3Array } from "Math";
export declare class Flat3DIndex {
    _position: {
        x: number;
        y: number;
        z: number;
    };
    bounds: {
        x: number;
        y: number;
        z: number;
    };
    getIndex(x: number, y: number, z: number): number;
    getXYZ(index: number): Position3Matrix;
}
/**# Flat 3D Array
 * ---
 * Used to treat a number or typed array 1d array as a 3d array.
 */
export declare class Flat3DArray extends Flat3DIndex {
    bounds: Position3Matrix;
    array: number[] | Uint8Array;
    volumne: number;
    constructor(bounds: Position3Matrix);
    updateBounds(bounds: Position3Matrix): void;
    setArray(array: number[] | Uint8Array): void;
    fillArray(value?: number): void;
    getValue(x: number, y: number, z: number): number;
    getValueUseObj(position: Position3Matrix): number;
    setValue(x: number, y: number, z: number, value: number): void;
    setValueUseObj(position: Position3Matrix, value: number): void;
    deleteValue(x: number, y: number, z: number): void;
    deleteUseObj(position: Position3Matrix): void;
}
/**# Flat 3D Any Array
 * ---
 * Used to treat a 1d array as a 3d array.
 */
export declare class Flat3DAnyArray<T> extends Flat3DIndex {
    array: T[];
    _position: {
        x: number;
        y: number;
        z: number;
    };
    volumne: number;
    constructor(bounds: Vec3Array, array: T[]);
    updateBounds(bounds: Position3Matrix): void;
    setArray(array: T[]): void;
    getValue(x: number, y: number, z: number): T;
    setValue(x: number, y: number, z: number, value: T): void;
    deleteValue(x: number, y: number, z: number): void;
}
