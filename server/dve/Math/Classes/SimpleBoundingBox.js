import { Vector3 } from "./Vector3.js";
export class SimpleBoundingBox {
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
    checkOrigin = new Vector3(0, 0, 0);
    _voxelCheckMap = {};
    _voxelCheckPoints = [];
    _voxelBottomCheckPoints = [];
    _voxelOriginPoints = [];
    constructor(origin, dimensions) {
        this.origin = origin;
        this.dimensions = dimensions;
        const ov = origin;
        this.checkOrigin.updateVector(ov.x, ov.y, ov.z);
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
        this.origin.updateVector(x, y, z);
        this.origin.roundVector(2);
        this._updateBounds();
    }
    setOriginToCheckOrigin() {
        const cv = this.checkOrigin;
        this.origin.updateVector(cv.x, cv.y, cv.z);
        this.bounds.minX = this.checkBounds.minX;
        this.bounds.maxX = this.checkBounds.maxX;
        this.bounds.minZ = this.checkBounds.minZ;
        this.bounds.maxZ = this.checkBounds.maxZ;
        this.bounds.minY = this.checkBounds.minY;
        this.bounds.maxY = this.checkBounds.maxY;
    }
    setCheckOrigin(x, y, z) {
        this.checkOrigin.updateVector(x, y, z);
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
