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
    getValue(x: number, y: number, z: number, array: Uint32Array | number[]): number;
    getValueUseObj(position: import("../../Meta/Util.types.js").Position3Matrix, array: Uint32Array | number[]): number;
    getValueUseObjSafe(position: import("../../Meta/Util.types.js").Position3Matrix, array: Uint32Array | number[]): number;
    setValue(x: number, y: number, z: number, array: Uint32Array | number[], value: number): void;
    setValueUseObj(position: import("../../Meta/Util.types.js").Position3Matrix, array: Uint32Array | number[], value: number): void;
    setValueUseObjSafe(position: import("../../Meta/Util.types.js").Position3Matrix, array: Uint32Array | number[], value: number): void;
    deleteValue(x: number, y: number, z: number, array: Uint32Array | number[]): void;
    deleteUseObj(position: import("../../Meta/Util.types.js").Position3Matrix, array: Uint32Array | number[]): void;
    getIndex(x: number, y: number, z: number): number;
    getXYZ(index: number): import("../../Meta/Util.types.js").Position3Matrix;
};
