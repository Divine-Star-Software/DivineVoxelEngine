export class Vector3 {
    x = 0;
    y = 0;
    z = 0;
    _tv3 = {
        x: 0,
        y: 0,
        z: 0,
    };
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    updateFromArray(array, startIndex = 0) {
        this.x = array[startIndex];
        this.y = array[startIndex + 1];
        this.z = array[startIndex + 2];
    }
    updateVector(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    updateFromVec3(vector) {
        this.x = vector.x;
        this.y = vector.y;
        this.z = vector.z;
    }
    roundVector(deciamlPoints = 2) {
        this.x = Number(this.x.toFixed(deciamlPoints));
        this.y = Number(this.y.toFixed(deciamlPoints));
        this.z = Number(this.z.toFixed(deciamlPoints));
    }
    translate(x, y, z) {
        this.x = this.x + x;
        this.y = this.y + y;
        this.z = this.z + z;
        return this;
    }
    getTranslated(x, y, z) {
        this._tv3.x = this.x + x;
        this._tv3.y = this.y + y;
        this._tv3.z = this.z + z;
        return this._tv3;
    }
    scaleXYZ(scaler) {
        this.x = this.x * scaler;
        this.y = this.y * scaler;
        this.z = this.z * scaler;
        return this;
    }
    scale(xScale, yScale, zScale) {
        this.x = this.x * xScale;
        this.y = this.y * yScale;
        this.z = this.z * zScale;
        return this;
    }
    getScaledXYZ(scaler) {
        this._tv3.x = this.x * scaler;
        this._tv3.y = this.y * scaler;
        this._tv3.z = this.z * scaler;
        return this._tv3;
    }
    getScaled(xScale, yScale, zScale) {
        this._tv3.x = this.x * xScale;
        this._tv3.y = this.y * yScale;
        this._tv3.z = this.z * zScale;
        return this._tv3;
    }
    addXYZ(add) {
        this.x = this.x + add;
        this.y = this.y + add;
        this.z = this.z + add;
        return this;
    }
    addFromVec3(vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
        return this;
    }
    isZero() {
        return !this.x && !this.y && !this.z;
    }
    subtractXYZ(subtract) {
        this.x = this.x - subtract;
        this.y = this.y - subtract;
        this.z = this.z - subtract;
        return this;
    }
    subtractFromObj(vector) {
        this.x = this.x - vector.x;
        this.y = this.y - vector.y;
        this.z = this.z - vector.z;
        return this;
    }
    getAddXYZ(add) {
        this._tv3.x = this.x + add;
        this._tv3.y = this.y + add;
        this._tv3.z = this.z + add;
        return this._tv3;
    }
    getSubtractXYZ(subtract) {
        this._tv3.x = this.x - subtract;
        this._tv3.y = this.y - subtract;
        this._tv3.z = this.z - subtract;
        return this._tv3;
    }
    addVector(vector3) {
        this.x = vector3.x + this.x;
        this.y = vector3.y + this.y;
        this.z = vector3.z + this.z;
        return this;
    }
    getAddedVector(vector3) {
        this._tv3.x = vector3.x + this.x;
        this._tv3.y = vector3.y + this.y;
        this._tv3.z = vector3.z + this.z;
        return this._tv3;
    }
    subtractVector(vector3) {
        this.x = this.x - vector3.x;
        this.y = this.y - vector3.y;
        this.z = this.z - vector3.z;
        return this;
    }
    getSubtractedVector(vector3) {
        this._tv3.x = this.x - vector3.x;
        this._tv3.y = this.y - vector3.y;
        this._tv3.z = this.z - vector3.z;
        return this._tv3;
    }
    scaleVector(vector3) {
        this.x = this.x * vector3.x;
        this.y = this.y * vector3.y;
        this.z = this.z * vector3.z;
        return this;
    }
    getScaledVector(vector3) {
        this._tv3.x = this.x * vector3.x;
        this._tv3.y = this.y * vector3.y;
        this._tv3.z = this.z * vector3.z;
        return this._tv3;
    }
    getLength() {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }
    divide(scalar) {
        this.x = this.x / scalar;
        this.y = this.y / scalar;
        this.z = this.z / scalar;
        return this;
    }
    getDivided(scalar) {
        this._tv3.x = this.x / scalar;
        this._tv3.y = this.y / scalar;
        this._tv3.z = this.z / scalar;
        return this._tv3;
    }
    normalize() {
        return this.divide(this.getLength());
    }
    isEqual(vector3) {
        if (this.x != vector3.x) {
            return false;
        }
        if (this.y != vector3.y) {
            return false;
        }
        if (this.z != vector3.z) {
            return false;
        }
        return true;
    }
    isNotEqual(vector3) {
        if (this.x != vector3.x) {
            return true;
        }
        if (this.y != vector3.y) {
            return true;
        }
        if (this.z != vector3.z) {
            return true;
        }
        return false;
    }
}
