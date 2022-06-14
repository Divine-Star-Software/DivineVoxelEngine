import { Vector3 } from "./Vector3.js";
export class SimpleBoundingBox {
    origion;
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
    checkOrigion = new Vector3(0, 0, 0);
    _voxelCheckMap = {};
    _voxelCheckPoints = [];
    _voxelOrigionPoints = [];
    constructor(origion, dimensions) {
        this.origion = origion;
        this.dimensions = dimensions;
        const ov = origion.getVector();
        this.checkOrigion.updateVector(ov.x, ov.y, ov.z);
        this._updateBounds();
        this._updateCheckBounds();
    }
    _updateBounds() {
        const v1 = this.origion.getVector();
        this.bounds.minX = v1.x - this.dimensions.w / 2;
        this.bounds.maxX = v1.x + this.dimensions.w / 2;
        this.bounds.minZ = v1.z - this.dimensions.d / 2;
        this.bounds.maxZ = v1.z + this.dimensions.d / 2;
        this.bounds.minY = v1.y - this.dimensions.h / 2;
        this.bounds.maxY = v1.y + this.dimensions.h / 2;
    }
    _updateCheckBounds() {
        const v1 = this.checkOrigion.getVector();
        this.checkBounds.minX = v1.x - this.dimensions.w / 2;
        this.checkBounds.maxX = v1.x + this.dimensions.w / 2;
        this.checkBounds.minZ = v1.z - this.dimensions.d / 2;
        this.checkBounds.maxZ = v1.z + this.dimensions.d / 2;
        this.checkBounds.minY = v1.y - this.dimensions.h / 2;
        this.checkBounds.maxY = v1.y + this.dimensions.h / 2;
    }
    updateOrigion(x, y, z) {
        this.origion.updateVector(x, y, z);
        this._updateBounds();
    }
    setOrigionToCheckOrigion() {
        const cv = this.checkOrigion.getVector();
        this.origion.updateVector(cv.x, cv.y, cv.z);
        this.bounds.minX = this.checkBounds.minX;
        this.bounds.maxX = this.checkBounds.maxX;
        this.bounds.minZ = this.checkBounds.minZ;
        this.bounds.maxZ = this.checkBounds.maxZ;
        this.bounds.minY = this.checkBounds.minY;
        this.bounds.maxY = this.checkBounds.maxY;
    }
    setCheckOrigion(x, y, z) {
        this.checkOrigion.updateVector(x, y, z);
        this._updateCheckBounds();
    }
    getCurrentOrigionPoints() {
        this._voxelOrigionPoints = [];
        const mx = this.bounds.minX;
        const my = this.bounds.minY;
        const mz = this.bounds.minZ;
        for (let y = my; y <= this.bounds.maxY; y++) {
            for (let x = mx - 1; x <= this.bounds.maxX + 1; x++) {
                for (let z = mz - 1; z <= this.bounds.maxZ + 1; z++) {
                    const key = this._getPositionKey(x, y, z);
                    if (!this._voxelCheckMap[key]) {
                        this._voxelOrigionPoints.push([x, y, z]);
                        this._voxelCheckMap[key] = true;
                    }
                }
            }
        }
        this._voxelCheckMap = {};
        return this._voxelOrigionPoints;
    }
    getVoxelCheckPoints() {
        this._voxelCheckPoints = [];
        const mx = this.checkBounds.minX;
        const my = this.checkBounds.minY;
        const mz = this.checkBounds.minZ;
        for (let y = my; y <= this.checkBounds.maxY; y++) {
            for (let x = mx - 1; x <= this.checkBounds.maxX + 1; x++) {
                for (let z = mz - 1; z <= this.checkBounds.maxZ + 1; z++) {
                    const key = this._getPositionKey(x, y, z);
                    if (!this._voxelCheckMap[key]) {
                        this._voxelCheckPoints.push([x, y, z]);
                        this._voxelCheckMap[key] = true;
                    }
                }
            }
        }
        this._voxelCheckMap = {};
        return this._voxelCheckPoints;
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
