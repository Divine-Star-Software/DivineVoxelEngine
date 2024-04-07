"use strict";
(self["webpackChunkdve_testing"] = self["webpackChunkdve_testing"] || []).push([["DSLIBS_divineVoxelEngine_dist_Math_index_js-DSLIBS_divineVoxelEngine_dist_Tools_Data_RichData-f07748"],{

/***/ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/BoundingBox.js":
/*!***********************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Math/Classes/BoundingBox.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BoundingBox": () => (/* binding */ BoundingBox)
/* harmony export */ });
class BoundingBox {
    topPlane;
    bottomPlane;
    northPlane;
    southPlane;
    eastPlane;
    westPlane;
    bounds = {
        minX: Infinity,
        maxX: -Infinity,
        minZ: Infinity,
        maxZ: -Infinity,
        minY: Infinity,
        maxY: -Infinity,
    };
    constructor(data) {
        this.topPlane = data.topPlane;
        this._doMinMaxCheck(this.topPlane);
        this.bottomPlane = data.bottomPlane;
        this._doMinMaxCheck(this.bottomPlane);
        this.northPlane = data.northPlane;
        this._doMinMaxCheck(this.northPlane);
        this.southPlane = data.southPlane;
        this._doMinMaxCheck(this.southPlane);
        this.eastPlane = data.eastPlane;
        this._doMinMaxCheck(this.eastPlane);
        this.westPlane = data.westPlane;
        this._doMinMaxCheck(this.westPlane);
    }
    _doMinMaxCheck(plane) {
        if (plane.minX <= this.bounds.minX)
            this.bounds.minX = plane.minX;
        if (plane.maxX >= this.bounds.maxX)
            this.bounds.maxX = plane.maxX;
        if (plane.minY <= this.bounds.minY)
            this.bounds.minY = plane.minY;
        if (plane.maxY >= this.bounds.maxY)
            this.bounds.maxY = plane.maxY;
        if (plane.minZ <= this.bounds.minZ)
            this.bounds.minZ = plane.minZ;
        if (plane.maxZ >= this.bounds.maxZ)
            this.bounds.maxZ = plane.maxZ;
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Plane.js":
/*!*****************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Plane.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Plane": () => (/* binding */ Plane)
/* harmony export */ });
class Plane {
    v1;
    v2;
    v3;
    v4;
    minX = Infinity;
    maxX = -Infinity;
    minZ = Infinity;
    maxZ = -Infinity;
    minY = Infinity;
    maxY = -Infinity;
    constructor(data) {
        this.v1 = data.v1;
        this.v2 = data.v2;
        this.v3 = data.v3;
        this.v4 = data.v4;
        this._minMaxCompare(this.v1, this.v2);
        this._minMaxCompare(this.v1, this.v3);
        this._minMaxCompare(this.v1, this.v4);
        this._minMaxCompare(this.v2, this.v3);
        this._minMaxCompare(this.v2, this.v4);
        this._minMaxCompare(this.v3, this.v4);
    }
    _compareVales(v1, v2, axis, minProperty, maxProperty) {
        const c1 = v1;
        const c2 = v2;
        if (c1[axis] < this[minProperty]) {
            if (c1[axis] <= c2[axis]) {
                this[minProperty] = c1[axis];
            }
        }
        if (c2[axis] < this[minProperty]) {
            if (c2[axis] <= c1[axis]) {
                this[minProperty] = c2[axis];
            }
        }
        if (c1[axis] > this[maxProperty]) {
            if (c1[axis] >= c2[axis]) {
                this[maxProperty] = c1[axis];
            }
        }
        if (c2[axis] > this[maxProperty]) {
            if (c2[axis] >= c1[axis]) {
                this[maxProperty] = c2[axis];
            }
        }
    }
    _minMaxCompare(v1, v2) {
        this._compareVales(v1, v2, "x", "minX", "maxX");
        this._compareVales(v1, v2, "y", "minY", "maxY");
        this._compareVales(v1, v2, "z", "minZ", "maxZ");
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/SimpleBoundingBox.js":
/*!*****************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Math/Classes/SimpleBoundingBox.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SimpleBoundingBox": () => (/* binding */ SimpleBoundingBox)
/* harmony export */ });
/* harmony import */ var _Vector3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector3.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Vector3.js");

class SimpleBoundingBox {
    origin;
    dimensions;
    bounds = {
        minX: Infinity,
        maxX: -Infinity,
        minZ: Infinity,
        maxZ: -Infinity,
        minY: Infinity,
        maxY: -Infinity,
    };
    checkBounds = {
        minX: Infinity,
        maxX: -Infinity,
        minZ: Infinity,
        maxZ: -Infinity,
        minY: Infinity,
        maxY: -Infinity,
    };
    checkOrigin = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 0);
    _voxelCheckMap = {};
    _voxelCheckPoints = [];
    _voxelBottomCheckPoints = [];
    _voxelOriginPoints = [];
    constructor(origin, dimensions) {
        this.origin = origin;
        this.dimensions = dimensions;
        const ov = origin;
        this.checkOrigin.set(ov.x, ov.y, ov.z);
        this._updateBounds();
        this._updateCheckBounds();
    }
    _updateBounds() {
        const ov = this.origin;
        this.bounds.minX = ov.x - this.dimensions.w / 2;
        this.bounds.maxX = ov.x + this.dimensions.w / 2;
        this.bounds.minZ = ov.z - this.dimensions.d / 2;
        this.bounds.maxZ = ov.z + this.dimensions.d / 2;
        this.bounds.minY = ov.y - this.dimensions.h / 2;
        this.bounds.maxY = ov.y + this.dimensions.h / 2;
    }
    _updateCheckBounds() {
        const cv = this.checkOrigin;
        this.checkBounds.minX = cv.x - this.dimensions.w / 2;
        this.checkBounds.maxX = cv.x + this.dimensions.w / 2;
        this.checkBounds.minZ = cv.z - this.dimensions.d / 2;
        this.checkBounds.maxZ = cv.z + this.dimensions.d / 2;
        this.checkBounds.minY = cv.y - this.dimensions.h / 2;
        this.checkBounds.maxY = cv.y + this.dimensions.h / 2;
    }
    updateOrigin(x, y, z) {
        this.origin.set(x, y, z);
        this.origin.roundVector(2);
        this._updateBounds();
    }
    setOriginToCheckOrigin() {
        const cv = this.checkOrigin;
        this.origin.set(cv.x, cv.y, cv.z);
        this.bounds.minX = this.checkBounds.minX;
        this.bounds.maxX = this.checkBounds.maxX;
        this.bounds.minZ = this.checkBounds.minZ;
        this.bounds.maxZ = this.checkBounds.maxZ;
        this.bounds.minY = this.checkBounds.minY;
        this.bounds.maxY = this.checkBounds.maxY;
    }
    setCheckOrigin(x, y, z) {
        this.checkOrigin.set(x, y, z);
        this._updateCheckBounds();
    }
    getCurrentOriginPoints() {
        this._voxelOriginPoints = [];
        const mx = this.bounds.minX;
        const my = this.bounds.minY;
        const mz = this.bounds.minZ;
        for (let y = my; y <= this.bounds.maxY; y++) {
            for (let x = mx - 1; x <= this.bounds.maxX + 1; x++) {
                for (let z = mz - 1; z <= this.bounds.maxZ + 1; z++) {
                    const key = this._getPositionKey(x, y, z);
                    if (!this._voxelCheckMap[key]) {
                        this._voxelOriginPoints.push([x, y, z]);
                        this._voxelCheckMap[key] = true;
                    }
                }
            }
        }
        this._voxelCheckMap = {};
        return this._voxelOriginPoints;
    }
    getVoxelCheckPoints() {
        this._voxelCheckPoints = [];
        const mx = this.checkBounds.minX;
        const my = this.checkBounds.minY;
        const mz = this.checkBounds.minZ;
        for (let y = my; y <= this.checkBounds.maxY; y++) {
            for (let x = mx; x <= this.checkBounds.maxX + 1; x++) {
                for (let z = mz; z <= this.checkBounds.maxZ + 1; z++) {
                    const key = this._getPositionKey(x, y, z);
                    if (!this._voxelCheckMap[key]) {
                        this._voxelCheckPoints.push([
                            Math.floor(x),
                            Math.floor(y),
                            Math.floor(z),
                        ]);
                        this._voxelCheckMap[key] = true;
                    }
                }
            }
        }
        this._voxelCheckMap = {};
        return this._voxelCheckPoints;
    }
    getVoxelBottomCheckPoints() {
        this._voxelBottomCheckPoints = [];
        const mx = this.checkBounds.minX;
        const my = this.checkBounds.minY;
        const mz = this.checkBounds.minZ;
        for (let y = my - 1; y <= my; y++) {
            for (let x = mx; x <= this.checkBounds.maxX + 1; x++) {
                for (let z = mz; z <= this.checkBounds.maxZ + 1; z++) {
                    const key = this._getPositionKey(x, y, z);
                    if (!this._voxelCheckMap[key]) {
                        this._voxelBottomCheckPoints.push([
                            Math.floor(x),
                            Math.floor(y),
                            Math.floor(z),
                        ]);
                        this._voxelCheckMap[key] = true;
                    }
                }
            }
        }
        this._voxelCheckMap = {};
        return this._voxelBottomCheckPoints;
    }
    _getPositionKey(x, y, z) {
        return `${x}-${y}-${z}`;
    }
    isPointInsideBox(point) {
        const box = this.bounds;
        return (point.x >= box.minX &&
            point.x <= box.maxX &&
            point.y >= box.minY &&
            point.y <= box.maxY &&
            point.z >= box.minZ &&
            point.z <= box.maxZ);
    }
    doesBoxIntersect(testBox) {
        const box = this.bounds;
        return (box.minX <= testBox.maxX &&
            box.maxX >= testBox.minX &&
            box.minY <= testBox.maxY &&
            box.maxY >= testBox.minY &&
            box.minZ <= testBox.maxZ &&
            box.maxZ >= testBox.minZ);
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Vector3.js":
/*!*******************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Vector3.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Vector3": () => (/* binding */ Vector3)
/* harmony export */ });
class V3 {
    _data = [0, 0, 0];
    get x() {
        return this._data[0];
    }
    set x(x) {
        this._data[0] = x;
    }
    get y() {
        return this._data[1];
    }
    set y(y) {
        this._data[1] = y;
    }
    get z() {
        return this._data[2];
    }
    set z(z) {
        this._data[2] = z;
    }
}
class Vector3 extends V3 {
    static Zero = new Vector3(0, 0, 0);
    static Top = new Vector3(0, 1, 0);
    static Bottom = new Vector3(0, -1, 0);
    static East = new Vector3(1, 0, 0);
    static West = new Vector3(-1, 0, 0);
    static North = new Vector3(0, 0, 1);
    static South = new Vector3(0, 0, -1);
    _tv3 = new V3();
    static NaNRestore(vec3) {
        if (Number.isNaN(vec3.x))
            vec3.x = 0;
        if (Number.isNaN(vec3.y))
            vec3.y = 0;
        if (Number.isNaN(vec3.z))
            vec3.z = 0;
    }
    constructor(x = 0, y = 0, z = 0) {
        super();
        this.x = x;
        this.y = y;
        this.z = z;
    }
    updateFromArray(array, startIndex = 0) {
        this.x = array[startIndex];
        this.y = array[startIndex + 1];
        this.z = array[startIndex + 2];
        return this;
    }
    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    setAll(value) {
        this.x = value;
        this.y = value;
        this.z = value;
        return this;
    }
    updateFromVec3(vector) {
        this.x = vector.x;
        this.y = vector.y;
        this.z = vector.z;
        return this;
    }
    roundVector(deciamlPoints = 2) {
        this.x = Number(this.x.toFixed(deciamlPoints));
        this.y = Number(this.y.toFixed(deciamlPoints));
        this.z = Number(this.z.toFixed(deciamlPoints));
        return this;
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
    add(x, y, z) {
        this.x += x;
        this.y += y;
        this.z += z;
        return this;
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
        Vector3.NaNRestore(this);
        return this;
    }
    getDivided(scalar) {
        this._tv3.x = this.x / scalar;
        this._tv3.y = this.y / scalar;
        this._tv3.z = this.z / scalar;
        Vector3.NaNRestore(this._tv3);
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



/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Math/Functions/Distance2d.js":
/*!************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Math/Functions/Distance2d.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Distance2D": () => (/* binding */ Distance2D)
/* harmony export */ });
function Distance2D(x1, x2, y1, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Math/Functions/Distance3d.js":
/*!************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Math/Functions/Distance3d.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Distance3D": () => (/* binding */ Distance3D)
/* harmony export */ });
function Distance3D(x1, y1, z1, x2, y2, z2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Math/Functions/DistnaceSort.js":
/*!**************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Math/Functions/DistnaceSort.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocationDataDistanceSort": () => (/* binding */ LocationDataDistanceSort),
/* harmony export */   "Vec3ArrayDistanceSort": () => (/* binding */ Vec3ArrayDistanceSort)
/* harmony export */ });
/* harmony import */ var _Distance3d_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Distance3d.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Functions/Distance3d.js");

function Vec3ArrayDistanceSort(origion, array) {
    //filter tasks to keep them close to the player
    return array.sort((a, b) => {
        const aDistance = (0,_Distance3d_js__WEBPACK_IMPORTED_MODULE_0__.Distance3D)(a[0], a[1], a[2], origion[0], origion[1], origion[2]);
        const bDistance = (0,_Distance3d_js__WEBPACK_IMPORTED_MODULE_0__.Distance3D)(b[0], b[1], b[2], origion[0], origion[1], origion[2]);
        //if a is closer then b put it first
        if (aDistance < bDistance)
            return -1;
        //if b is closer then a put it first
        if (aDistance > bDistance)
            return 1;
        //no change
        return 0;
    });
}
function LocationDataDistanceSort(origion, array) {
    //filter tasks to keep them close to the player
    return array.sort((a, b) => {
        const aDistance = (0,_Distance3d_js__WEBPACK_IMPORTED_MODULE_0__.Distance3D)(a[1], a[2], a[3], origion[1], origion[2], origion[3]);
        const bDistance = (0,_Distance3d_js__WEBPACK_IMPORTED_MODULE_0__.Distance3D)(b[1], b[2], b[3], origion[1], origion[2], origion[3]);
        //if a is closer then b put it first
        if (aDistance < bDistance)
            return -1;
        //if b is closer then a put it first
        if (aDistance > bDistance)
            return 1;
        //no change
        return 0;
    });
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Math/Functions/VisitAll.js":
/*!**********************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Math/Functions/VisitAll.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VisitAll": () => (/* binding */ VisitAll)
/* harmony export */ });
/** # Visit All
 * ---
 * Given a starting point and an end point it will visit all voxels that are between them.
 * @param startPoint
 * @param endPoint
 * @param visitor
 * @returns an array of numbers with a stride of 3 for positions
 */
const VisitAll = (startPoint, endPoint, visitor = (x, y, z) => {
    return true;
}) => {
    const gx0 = startPoint.x;
    const gy0 = startPoint.y;
    const gz0 = startPoint.z;
    const gx1 = endPoint.x;
    const gy1 = endPoint.y;
    const gz1 = endPoint.z;
    const positons = [];
    const gx0idx = Math.floor(gx0);
    const gy0idx = Math.floor(gy0);
    const gz0idx = Math.floor(gz0);
    const gx1idx = Math.floor(gx1);
    const gy1idx = Math.floor(gy1);
    const gz1idx = Math.floor(gz1);
    const sx = gx1idx > gx0idx ? 1 : gx1idx < gx0idx ? -1 : 0;
    const sy = gy1idx > gy0idx ? 1 : gy1idx < gy0idx ? -1 : 0;
    const sz = gz1idx > gz0idx ? 1 : gz1idx < gz0idx ? -1 : 0;
    let gx = gx0idx;
    let gy = gy0idx;
    let gz = gz0idx;
    const gxp = gx0idx + (gx1idx > gx0idx ? 1 : 0);
    const gyp = gy0idx + (gy1idx > gy0idx ? 1 : 0);
    const gzp = gz0idx + (gz1idx > gz0idx ? 1 : 0);
    const vx = gx1 === gx0 ? 1 : gx1 - gx0;
    const vy = gy1 === gy0 ? 1 : gy1 - gy0;
    const vz = gz1 === gz0 ? 1 : gz1 - gz0;
    const vxvy = vx * vy;
    const vxvz = vx * vz;
    const vyvz = vy * vz;
    let errx = (gxp - gx0) * vyvz;
    let erry = (gyp - gy0) * vxvz;
    let errz = (gzp - gz0) * vxvy;
    const derrx = sx * vyvz;
    const derry = sy * vxvz;
    const derrz = sz * vxvy;
    do {
        if (!visitor(gx, gy, gz))
            break;
        positons.push(gx, gy, gz);
        if (gx === gx1idx && gy === gy1idx && gz === gz1idx)
            break;
        let xr = Math.abs(errx);
        let yr = Math.abs(erry);
        let zr = Math.abs(errz);
        if (sx !== 0 && (sy === 0 || xr < yr) && (sz === 0 || xr < zr)) {
            gx += sx;
            errx += derrx;
        }
        else if (sy !== 0 && (sz === 0 || yr < zr)) {
            gy += sy;
            erry += derry;
        }
        else if (sz !== 0) {
            gz += sz;
            errz += derrz;
        }
    } while (true);
    return positons;
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Math/Types/Math.types.js":
/*!********************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Math/Types/Math.types.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Math/VoxelMath.js":
/*!*************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Math/VoxelMath.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VoxelMath": () => (/* binding */ VoxelMath)
/* harmony export */ });
/* harmony import */ var _Classes_BoundingBox_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Classes/BoundingBox.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/BoundingBox.js");
/* harmony import */ var _Classes_Plane_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Classes/Plane.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Plane.js");
/* harmony import */ var _Classes_SimpleBoundingBox_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Classes/SimpleBoundingBox.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/SimpleBoundingBox.js");
/* harmony import */ var _Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Classes/Vector3.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Vector3.js");
/* harmony import */ var _Functions_VisitAll_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Functions/VisitAll.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Functions/VisitAll.js");





/**# Voxel Math
 * ---
 * Can be used in any thread that needs it.
 * Has functions for collision detection, finding voxels in a direction, and path finding.
 */
const VoxelMath = {
    visitAll: _Functions_VisitAll_js__WEBPACK_IMPORTED_MODULE_4__.VisitAll,
    getVector3(x, y, z) {
        return new _Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_3__.Vector3(x, y, z);
    },
    getPlane(pv1, pv2, pv3, pv4) {
        return new _Classes_Plane_js__WEBPACK_IMPORTED_MODULE_1__.Plane({
            v1: pv1,
            v2: pv2,
            v3: pv3,
            v4: pv4,
        });
    },
    getSimpleBoundingBox(origin, dimensions) {
        return new _Classes_SimpleBoundingBox_js__WEBPACK_IMPORTED_MODULE_2__.SimpleBoundingBox(origin, dimensions);
    },
    getBoundingBox(data) {
        return new _Classes_BoundingBox_js__WEBPACK_IMPORTED_MODULE_0__.BoundingBox(data);
    },
    convertToOriginGridSpace(position) {
        position[0] = Math.round(position[0]) + 0.5;
        position[1] = Math.round(position[1]) + 0.5;
        position[2] = Math.round(position[2]) + 0.5;
        return position;
    },
    distance2D(x1, x2, y1, y2) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    },
    distance3D(x1, y1, z1, x2, y2, z2) {
        const a = x2 - x1;
        const b = y2 - y1;
        const c = z2 - z1;
        return Math.sqrt(a * a + b * b + c * c);
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Math/index.js":
/*!*********************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Math/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BoundingBox": () => (/* reexport safe */ _Classes_BoundingBox_js__WEBPACK_IMPORTED_MODULE_1__.BoundingBox),
/* harmony export */   "Distance2D": () => (/* reexport safe */ _Functions_Distance2d_js__WEBPACK_IMPORTED_MODULE_5__.Distance2D),
/* harmony export */   "Distance3D": () => (/* reexport safe */ _Functions_Distance3d_js__WEBPACK_IMPORTED_MODULE_6__.Distance3D),
/* harmony export */   "LocationDataDistanceSort": () => (/* reexport safe */ _Functions_DistnaceSort_js__WEBPACK_IMPORTED_MODULE_7__.LocationDataDistanceSort),
/* harmony export */   "Plane": () => (/* reexport safe */ _Classes_Plane_js__WEBPACK_IMPORTED_MODULE_2__.Plane),
/* harmony export */   "SimpleBoundingBox": () => (/* reexport safe */ _Classes_SimpleBoundingBox_js__WEBPACK_IMPORTED_MODULE_3__.SimpleBoundingBox),
/* harmony export */   "Vec3ArrayDistanceSort": () => (/* reexport safe */ _Functions_DistnaceSort_js__WEBPACK_IMPORTED_MODULE_7__.Vec3ArrayDistanceSort),
/* harmony export */   "Vector3": () => (/* reexport safe */ _Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_4__.Vector3),
/* harmony export */   "VisitAll": () => (/* reexport safe */ _Functions_VisitAll_js__WEBPACK_IMPORTED_MODULE_8__.VisitAll),
/* harmony export */   "VoxelMath": () => (/* reexport safe */ _VoxelMath_js__WEBPACK_IMPORTED_MODULE_0__.VoxelMath)
/* harmony export */ });
/* harmony import */ var _VoxelMath_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VoxelMath.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/VoxelMath.js");
/* harmony import */ var _Classes_BoundingBox_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Classes/BoundingBox.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/BoundingBox.js");
/* harmony import */ var _Classes_Plane_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Classes/Plane.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Plane.js");
/* harmony import */ var _Classes_SimpleBoundingBox_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Classes/SimpleBoundingBox.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/SimpleBoundingBox.js");
/* harmony import */ var _Classes_Vector3_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Classes/Vector3.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Classes/Vector3.js");
/* harmony import */ var _Functions_Distance2d_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Functions/Distance2d.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Functions/Distance2d.js");
/* harmony import */ var _Functions_Distance3d_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Functions/Distance3d.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Functions/Distance3d.js");
/* harmony import */ var _Functions_DistnaceSort_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Functions/DistnaceSort.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Functions/DistnaceSort.js");
/* harmony import */ var _Functions_VisitAll_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Functions/VisitAll.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Functions/VisitAll.js");
/* harmony import */ var _Types_Math_types_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Types/Math.types.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Types/Math.types.js");













/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/RichDataTool.js":
/*!**********************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Tools/Data/RichDataTool.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RichDataTool": () => (/* binding */ RichDataTool)
/* harmony export */ });
/* harmony import */ var divine_binary_object_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-binary-object/index.js */ "../../DSLIBS/divineBinaryObject/dist/index.js");
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");
/* harmony import */ var _Classes_LocationBoundTool_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Classes/LocationBoundTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Classes/LocationBoundTool.js");



class RichDataTool extends _Classes_LocationBoundTool_js__WEBPACK_IMPORTED_MODULE_2__.LocationBoundTool {
    segment = "voxels";
    comm;
    _enabled = false;
    constructor() {
        super();
        this.comm = threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.getComm("rich-world");
        if (!this.comm || !this.comm.isPortSet()) {
            this._enabled = false;
            if (this.comm) {
                this.comm.onSetPort(() => {
                    this._enabled = true;
                });
            }
            return;
        }
        if (this.comm.isPortSet()) {
            this._enabled = true;
        }
    }
    isEnabled() {
        return this._enabled;
    }
    setSegment(segment) {
        this.segment = segment;
        return this;
    }
    columnHasData(check) {
        this.comm.runPromiseTasks("has-data", this.location, [], (hadData) => {
            check(hadData);
        });
    }
    columnHasDataAsync() {
        return new Promise((resolve) => {
            this.columnHasData((hasData) => {
                resolve(hasData);
            });
        });
    }
    getData(onDone) {
        this.comm.runPromiseTasks("get-data", [this.location, this.segment], [], (data) => {
            if (!data)
                return onDone(false);
            onDone(divine_binary_object_index_js__WEBPACK_IMPORTED_MODULE_0__.DBO.bufferToObject(data));
        });
    }
    getDataAsync() {
        return new Promise((resolve) => {
            this.getData((data) => {
                resolve(data);
            });
        });
    }
    setData(data, onDone = (data) => { }) {
        const buffer = divine_binary_object_index_js__WEBPACK_IMPORTED_MODULE_0__.DBO.objectToBuffer(data);
        this.comm.runPromiseTasks("set-data", [this.location, this.segment, buffer], [buffer], (success) => {
            onDone(success);
        });
    }
    setDataAsync(data) {
        return new Promise((resolve) => {
            this.setData(data, (updated) => {
                resolve(updated);
            });
        });
    }
    removeData(onDone) {
        this.comm.runPromiseTasks("remove-data", [this.location, this.segment], [], (removed) => {
            onDone(removed);
        });
    }
    removeDataAsync() {
        return new Promise((resolve) => {
            this.removeData((removed) => {
                resolve(removed);
            });
        });
    }
    removeColumn(onDone) {
        this.comm.runPromiseTasks("remove-column", this.location, [], (removed) => {
            onDone(removed);
        });
    }
    removeColumnAsync() {
        return new Promise((resolve) => {
            this.removeData((removed) => {
                resolve(removed);
            });
        });
    }
    getColumn(onDone) {
        this.comm.runPromiseTasks("get-column", this.location, [], (data) => {
            onDone(data);
        });
    }
    getColumnAsync() {
        return new Promise((resolve) => {
            this.getColumn((data) => {
                resolve(data);
            });
        });
    }
    setColumn(column, onDone) {
        this.comm.runPromiseTasks("set-column", [this.location, column], [], (success) => {
            onDone(success);
        });
    }
    setColumnAsync(column) {
        return new Promise((resolve) => {
            this.setColumn(column, (success) => {
                resolve(success);
            });
        });
    }
    releaeAllData() {
        this.comm.runTasks("release-all-data", [], []);
    }
}


/***/ })

}]);
//# sourceMappingURL=DSLIBS_divineVoxelEngine_dist_Math_index_js-DSLIBS_divineVoxelEngine_dist_Tools_Data_RichData-f07748.DVE.js.map