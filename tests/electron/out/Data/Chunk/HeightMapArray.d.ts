/**# HeightMapArray
 * ---
 * Used to read height map data.
 */
export declare const HeightMapArray: {
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
    getValueUseObj(position: import("../../Meta/Util.types.js").Position3Matrix, array: number[] | Uint32Array): number;
    getValueUseObjSafe(position: import("../../Meta/Util.types.js").Position3Matrix, array: number[] | Uint32Array): number;
    setValue(x: number, y: number, z: number, array: number[] | Uint32Array, value: number): void;
    setValueUseObj(position: import("../../Meta/Util.types.js").Position3Matrix, array: number[] | Uint32Array, value: number): void;
    setValueUseObjSafe(position: import("../../Meta/Util.types.js").Position3Matrix, array: number[] | Uint32Array, value: number): void;
    deleteValue(x: number, y: number, z: number, array: number[] | Uint32Array): void;
    deleteUseObj(position: import("../../Meta/Util.types.js").Position3Matrix, array: number[] | Uint32Array): void;
    getIndex(x: number, y: number, z: number): number;
    getXYZ(index: number): import("../../Meta/Util.types.js").Position3Matrix;
};
