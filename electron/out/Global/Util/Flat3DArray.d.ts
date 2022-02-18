/**# Flat 3D Array
 * ---
 * Used to treat a 1d array as a 3d array.
 */
export declare class Flat3DArray {
    bounds: {
        x: number;
        y: number;
        z: number;
    };
    setBounds(x: number, y: number, z: number): void;
    getValue(x: number, y: number, z: number, array: number[]): number;
    setValue(x: number, y: number, z: number, array: number[], value: number): void;
    getIndex(x: number, y: number, z: number): number;
    getXYZ(index: number): number[];
}
