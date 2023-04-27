export class Flat3DIndex {
    _position = {
        x: 0,
        y: 0,
        z: 0,
    };
    bounds = {
        x: 0,
        y: 0,
        z: 0,
    };
    getIndex(x, y, z) {
        return x + y * this.bounds.x + z * this.bounds.z * this.bounds.y;
    }
    getXYZ(index) {
        this._position.x = index % this.bounds.x >> 0;
        this._position.y = (index / this.bounds.x) % this.bounds.y >> 0;
        this._position.z = (index / (this.bounds.x * this.bounds.y)) >> 0;
        return this._position;
    }
}
/**# Flat 3D Array
 * ---
 * Used to treat a number or typed array 1d array as a 3d array.
 */
export class Flat3DArray extends Flat3DIndex {
    bounds;
    array = [];
    volumne = 0;
    constructor(bounds) {
        super();
        this.bounds = bounds;
        this.volumne = bounds.x * bounds.y * bounds.z;
        this.fillArray();
    }
    updateBounds(bounds) {
        this.bounds.x = bounds.x;
        this.bounds.y = bounds.y;
        this.bounds.z = bounds.z;
        this.array = [];
        this.fillArray();
    }
    setArray(array) {
        this.array = array;
    }
    fillArray(value = 0) {
        for (let i = 0; i < this.volumne; i++) {
            this.array[i] = value;
        }
    }
    getValue(x, y, z) {
        return this.array[x + y * this.bounds.x + z * this.bounds.z * this.bounds.y];
    }
    getValueUseObj(position) {
        return this.array[position.x +
            position.y * this.bounds.x +
            position.z * this.bounds.z * this.bounds.y];
    }
    setValue(x, y, z, value) {
        this.array[x + y * this.bounds.x + z * this.bounds.z * this.bounds.y] = value;
    }
    setValueUseObj(position, value) {
        this.array[position.x +
            position.y * this.bounds.x +
            position.z * this.bounds.z * this.bounds.y] = value;
    }
    deleteValue(x, y, z) {
        //@ts-ignore
        this.array[x + y * this.bounds.x + z * this.bounds.z * this.bounds.y] =
            undefined;
    }
    deleteUseObj(position) {
        //@ts-ignore
        this.array[position.x +
            position.y * this.bounds.x +
            position.z * this.bounds.z * this.bounds.y] = undefined;
    }
}
/**# Flat 3D Any Array
 * ---
 * Used to treat a 1d array as a 3d array.
 */
export class Flat3DAnyArray extends Flat3DIndex {
    array;
    _position = {
        x: 0,
        y: 0,
        z: 0,
    };
    volumne = 0;
    constructor(bounds, array) {
        super();
        this.array = array;
        this.bounds.x = bounds[0];
        this.bounds.y = bounds[1];
        this.bounds.z = bounds[2];
        this.volumne = this.bounds.x * this.bounds.y * this.bounds.z;
    }
    updateBounds(bounds) {
        this.bounds.x = bounds.x;
        this.bounds.y = bounds.y;
        this.bounds.z = bounds.z;
    }
    setArray(array) {
        this.array = array;
    }
    getValue(x, y, z) {
        return this.array[x + y * this.bounds.x + z * this.bounds.z * this.bounds.y];
    }
    setValue(x, y, z, value) {
        this.array[x + y * this.bounds.x + z * this.bounds.z * this.bounds.y] = value;
    }
    deleteValue(x, y, z) {
        //@ts-ignore
        this.array[x + y * this.bounds.x + z * this.bounds.z * this.bounds.y] =
            undefined;
    }
}
