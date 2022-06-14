export class Vector3 {
    _v3 = {
        x: 0,
        y: 0,
        z: 0,
    };
    _tv3 = {
        x: 0,
        y: 0,
        z: 0,
    };
    constructor(x, y, z) {
        this._v3.x = x;
        this._v3.y = y;
        this._v3.z = z;
    }
    getVector() {
        return this._v3;
    }
    updateVector(x, y, z) {
        this._v3.x = x;
        this._v3.y = y;
        this._v3.z = z;
    }
    translate(x, y, z) {
        this._v3.x = this._v3.x + x;
        this._v3.y = this._v3.y + y;
        this._v3.z = this._v3.z + z;
        return this._v3;
    }
    getTranslated(x, y, z) {
        this._tv3.x = this._v3.x + x;
        this._tv3.y = this._v3.y + y;
        this._tv3.z = this._v3.z + z;
        return this._tv3;
    }
    scaleXYZ(scaler) {
        this._v3.x = this._v3.x * scaler;
        this._v3.y = this._v3.y * scaler;
        this._v3.z = this._v3.z * scaler;
        return this._v3;
    }
    scale(xScale, yScale, zScale) {
        this._v3.x = this._v3.x * xScale;
        this._v3.y = this._v3.y * yScale;
        this._v3.z = this._v3.z * zScale;
        return this._v3;
    }
    getScaledXYZ(scaler) {
        this._tv3.x = this._v3.x * scaler;
        this._tv3.y = this._v3.y * scaler;
        this._tv3.z = this._v3.z * scaler;
        return this._tv3;
    }
    getScaled(xScale, yScale, zScale) {
        this._tv3.x = this._v3.x * xScale;
        this._tv3.y = this._v3.y * yScale;
        this._tv3.z = this._v3.z * zScale;
        return this._tv3;
    }
    addXYZ(add) {
        this._v3.x = this._v3.x + add;
        this._v3.y = this._v3.y + add;
        this._v3.z = this._v3.z + add;
        return this._v3;
    }
    subtractXYZ(subtract) {
        this._v3.x = this._v3.x - subtract;
        this._v3.y = this._v3.y - subtract;
        this._v3.z = this._v3.z - subtract;
        return this._v3;
    }
    getAddXYZ(add) {
        this._tv3.x = this._v3.x + add;
        this._tv3.y = this._v3.y + add;
        this._tv3.z = this._v3.z + add;
        return this._tv3;
    }
    getSubtractXYZ(subtract) {
        this._tv3.x = this._v3.x - subtract;
        this._tv3.y = this._v3.y - subtract;
        this._tv3.z = this._v3.z - subtract;
        return this._tv3;
    }
    addVector(vector3) {
        this._v3.x = vector3._v3.x + this._v3.x;
        this._v3.y = vector3._v3.y + this._v3.y;
        this._v3.z = vector3._v3.z + this._v3.z;
        return this._v3;
    }
    getAddedVector(vector3) {
        this._tv3.x = vector3._v3.x + this._v3.x;
        this._tv3.y = vector3._v3.y + this._v3.y;
        this._tv3.z = vector3._v3.z + this._v3.z;
        return this._tv3;
    }
    subtractVector(vector3) {
        this._v3.x = this._v3.x - vector3._v3.x;
        this._v3.y = this._v3.y - vector3._v3.y;
        this._v3.z = this._v3.z - vector3._v3.z;
        return this._v3;
    }
    getSubtractedVector(vector3) {
        this._tv3.x = this._v3.x - vector3._v3.x;
        this._tv3.y = this._v3.y - vector3._v3.y;
        this._tv3.z = this._v3.z - vector3._v3.z;
        return this._tv3;
    }
    scaleVector(vector3) {
        this._v3.x = this._v3.x * vector3._v3.x;
        this._v3.y = this._v3.y * vector3._v3.y;
        this._v3.z = this._v3.z * vector3._v3.z;
        return this._v3;
    }
    getScaledVector(vector3) {
        this._tv3.x = this._v3.x * vector3._v3.x;
        this._tv3.y = this._v3.y * vector3._v3.y;
        this._tv3.z = this._v3.z * vector3._v3.z;
        return this._tv3;
    }
    isEqual(vector3) {
        if (this._v3.x != vector3._v3.x) {
            return false;
        }
        if (this._v3.y != vector3._v3.y) {
            return false;
        }
        if (this._v3.z != vector3._v3.z) {
            return false;
        }
        return true;
    }
    isNotEqual(vector3) {
        if (this._v3.x != vector3._v3.x) {
            return true;
        }
        if (this._v3.y != vector3._v3.y) {
            return true;
        }
        if (this._v3.z != vector3._v3.z) {
            return true;
        }
        return false;
    }
}
