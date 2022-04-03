/**# Flat 3D Array
 * ---
 * Used to treat a 1d array as a 3d array.
 */
export class Flat3DArray {
    bounds = {
        x: 16,
        y: 128,
        z: 16,
    };
    _position = {
        x: 0,
        y: 0,
        z: 0,
    };
    setBounds(x, y, z) {
        console.log(x, y, z);
        /*   this.bounds = {
           x: x,
           y: y,
           z: z,
          }; */
    }
    getValue(x, y, z, array) {
        return array[x + y * this.bounds.x + z * this.bounds.z * this.bounds.y];
    }
    setValue(x, y, z, array, value) {
        array[x + y * this.bounds.x + z * this.bounds.z * this.bounds.y] = value;
    }
    delete(x, y, z, array) {
        delete array[x + y * this.bounds.x + z * this.bounds.z * this.bounds.y];
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
