/**# Flat 3D Array
 * ---
 * Used to treat a 1d array as a 3d array.
 */
export class Flat3DArray {
    bounds = {
        x: 16,
        y: 256,
        z: 16,
    };
    _position = {
        x: 0,
        y: 0,
        z: 0
    };
    setBounds(x, y, z) {
        this.bounds = {
            x: x,
            y: y,
            z: z
        };
    }
    getValue(x, y, z, array) {
        const i = this.getIndex(x, y, z);
        return array[i];
    }
    setValue(x, y, z, array, value) {
        const i = this.getIndex(x, y, z);
        array[i] = value;
    }
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
