"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoxelSpace = void 0;
//Objects
var VoxelSpace = /** @class */ (function () {
    function VoxelSpace(data) {
        this.data = data;
        this._position = { x: 0, y: 0, z: 0 };
        this._hashedPosition = { x: 0, y: 0, z: 0 };
        this._bounds = { x: 0, y: 0, z: 0 };
        this._boundsPower2 = { x: 0, y: 0, z: 0 };
        this._boundsSet = false;
    }
    VoxelSpace.simpleCubeHash = function (space) {
        space._position.x =
            (space._position.x >> space._boundsPower2.x) << space._boundsPower2.x;
        space._position.y =
            (space._position.y >> space._boundsPower2.y) << space._boundsPower2.y;
        space._position.z =
            (space._position.z >> space._boundsPower2.z) << space._boundsPower2.z;
        return space._position;
    };
    VoxelSpace.getIndex = function (position, bounds) {
        return position.x + position.y * bounds.x + position.z * bounds.z * bounds.y;
    };
    VoxelSpace.spatialHash = function (space, parentSpace, divisor) {
        if (divisor === void 0) { divisor = VoxelSpace.WholeVec3; }
        var parentPosition = parentSpace.getPositionXYZ(space._position.x, space._position.y, space._position.z);
        space._hashedPosition.x =
            Math.abs(space._position.x - parentPosition.x) / divisor.x;
        space._hashedPosition.y =
            Math.abs(space._position.y - parentPosition.y) / divisor.y;
        space._hashedPosition.z =
            Math.abs(space._position.z - parentPosition.z) / divisor.z;
        return space._hashedPosition;
    };
    VoxelSpace.prototype.getVolume = function () {
        return this._bounds.x * this._bounds.y * this._bounds.z;
    };
    VoxelSpace.prototype.getArea = function () {
        return this._bounds.x * this._bounds.z;
    };
    VoxelSpace.prototype.setXYZ = function (x, y, z) {
        this._position.x = x;
        this._position.y = y;
        this._position.z = z;
        this.getPosition();
        return this;
    };
    VoxelSpace.prototype.setXZ = function (x, z) {
        this._position.x = x;
        this._position.z = z;
        this.getPosition();
        return this;
    };
    VoxelSpace.prototype.setCubeBounds = function (bounds) {
        if (this._boundsSet)
            return;
        this._boundsPower2.x = bounds.x;
        this._boundsPower2.y = bounds.y;
        this._boundsPower2.z = bounds.z;
        this._bounds.x = Math.pow(2, this._boundsPower2.x);
        this._bounds.y = Math.pow(2, this._boundsPower2.y);
        this._bounds.z = Math.pow(2, this._boundsPower2.z);
        this._boundsSet = true;
        return this;
    };
    VoxelSpace.prototype.setBounds = function (bounds) {
        if (this._boundsSet)
            return;
        this._bounds.x = bounds.x;
        this._bounds.y = bounds.y;
        this._bounds.z = bounds.z;
        this._boundsSet = true;
        return this;
    };
    VoxelSpace.prototype.getPosition = function () {
        return this.data.getPosition(this);
    };
    VoxelSpace.prototype.getIndex = function () {
        return this.data.getIndex(this);
    };
    VoxelSpace.prototype.getPositionXYZ = function (x, y, z) {
        return this.setXYZ(x, y, z).data.getPosition(this);
    };
    VoxelSpace.prototype.getIndexXYZ = function (x, y, z) {
        return this.setXYZ(x, y, z).data.getIndex(this);
    };
    VoxelSpace.prototype.getKeyXYZ = function (x, y, z) {
        return this.setXYZ(x, y, z).getKey();
    };
    VoxelSpace.prototype.getKey = function () {
        return "".concat(this._position.x, "-").concat(this._position.y, "-").concat(this._position.z);
    };
    VoxelSpace.WholeVec3 = { x: 1, y: 1, z: 1 };
    return VoxelSpace;
}());
exports.VoxelSpace = VoxelSpace;
