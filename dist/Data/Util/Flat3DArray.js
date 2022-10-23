/**# Flat 3D Array
 * ---
 * Used to treat a 1d array as a 3d array.
 */
export const Flat3DArray = {
    bounds: {
        x: 16,
        y: 128,
        z: 16,
    },
    _position: {
        x: 0,
        y: 0,
        z: 0,
    },
    setBounds(x, y, z) {
        this.bounds = {
            x: x,
            y: y,
            z: z,
        };
    },
    getValue(x, y, z, array) {
        return array[x + y * this.bounds.x + z * this.bounds.z * this.bounds.y];
    },
    getValueUseObj(position, array) {
        return array[position.x +
            position.y * this.bounds.x +
            position.z * this.bounds.z * this.bounds.y];
    },
    getValueUseObjSafe(position, array) {
        if (array instanceof Uint32Array) {
            return Atomics.load(array, position.x +
                position.y * this.bounds.x +
                position.z * this.bounds.z * this.bounds.y);
        }
        return 0;
    },
    setValue(x, y, z, array, value) {
        array[x + y * this.bounds.x + z * this.bounds.z * this.bounds.y] = value;
    },
    setValueUseObj(position, array, value) {
        array[position.x +
            position.y * this.bounds.x +
            position.z * this.bounds.z * this.bounds.y] = value;
    },
    setValueUseObjSafe(position, array, value) {
        if (array instanceof Uint32Array) {
            Atomics.store(array, position.x +
                position.y * this.bounds.x +
                position.z * this.bounds.z * this.bounds.y, value);
        }
    },
    deleteValue(x, y, z, array) {
        //@ts-ignore
        array[x + y * this.bounds.x + z * this.bounds.z * this.bounds.y] = undefined;
    },
    deleteUseObj(position, array) {
        //@ts-ignore
        array[position.x +
            position.y * this.bounds.x +
            position.z * this.bounds.z * this.bounds.y] = undefined;
    },
    getIndex(x, y, z) {
        return x + y * this.bounds.x + z * this.bounds.z * this.bounds.y;
    },
    getXYZ(index) {
        this._position.x = index % this.bounds.x >> 0;
        this._position.y = (index / this.bounds.x) % this.bounds.y >> 0;
        this._position.z = (index / (this.bounds.x * this.bounds.y)) >> 0;
        return this._position;
    },
};
