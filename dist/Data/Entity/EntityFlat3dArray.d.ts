/**# EntityFlat3dArray
 * ---
 * Used to read an entity 'chunk".
 */
export declare const EntityFlat3dArray: {
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
    getValue(x: number, y: number, z: number, array: number[] | Uint32Array): number;
    getValueUseObj(position: import("../../Math/index.js").Position3Matrix, array: number[] | Uint32Array): number;
    getValueUseObjSafe(position: import("../../Math/index.js").Position3Matrix, array: number[] | Uint32Array): number;
    setValue(x: number, y: number, z: number, array: number[] | Uint32Array, value: number): void;
    setValueUseObj(position: import("../../Math/index.js").Position3Matrix, array: number[] | Uint32Array, value: number): void;
    setValueUseObjSafe(position: import("../../Math/index.js").Position3Matrix, array: number[] | Uint32Array, value: number): void;
    deleteValue(x: number, y: number, z: number, array: number[] | Uint32Array): void;
    deleteUseObj(position: import("../../Math/index.js").Position3Matrix, array: number[] | Uint32Array): void;
    getIndex(x: number, y: number, z: number): number;
    getXYZ(index: number): import("../../Math/index.js").Position3Matrix;
};
