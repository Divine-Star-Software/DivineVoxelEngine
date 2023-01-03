//Objects
export class VoxelSpace {
    data;
    static simpleCubeHash(space) {
        space._position.x =
            (space._position.x >> space._boundsPower2.x) << space._boundsPower2.x;
        space._position.y =
            (space._position.y >> space._boundsPower2.y) << space._boundsPower2.y;
        space._position.z =
            (space._position.z >> space._boundsPower2.z) << space._boundsPower2.z;
        return space._position;
    }
    static getIndex(position, bounds) {
        return position.x + position.y * bounds.x + position.z * bounds.z * bounds.y;
    }
    static WholeVec3 = { x: 1, y: 1, z: 1 };
    static spatialHash(space, parentSpace, divisor = VoxelSpace.WholeVec3) {
        const parentPosition = parentSpace.getPositionXYZ(space._position.x, space._position.y, space._position.z);
        space._hashedPosition.x =
            Math.abs(space._position.x - parentPosition.x) / divisor.x;
        space._hashedPosition.y =
            Math.abs(space._position.y - parentPosition.y) / divisor.y;
        space._hashedPosition.z =
            Math.abs(space._position.z - parentPosition.z) / divisor.z;
        return space._hashedPosition;
    }
    _position = { x: 0, y: 0, z: 0 };
    _hashedPosition = { x: 0, y: 0, z: 0 };
    _bounds = { x: 0, y: 0, z: 0 };
    _boundsPower2 = { x: 0, y: 0, z: 0 };
    _boundsSet = false;
    constructor(data) {
        this.data = data;
    }
    getVolume() {
        return this._bounds.x * this._bounds.y * this._bounds.z;
    }
    getArea() {
        return this._bounds.x * this._bounds.z;
    }
    setXYZ(x, y, z) {
        this._position.x = x;
        this._position.y = y;
        this._position.z = z;
        this.getPosition();
        return this;
    }
    setXZ(x, z) {
        this._position.x = x;
        this._position.z = z;
        this.getPosition();
        return this;
    }
    setCubeBounds(bounds) {
        if (this._boundsSet)
            return;
        this._boundsPower2.x = bounds.x;
        this._boundsPower2.y = bounds.y;
        this._boundsPower2.z = bounds.z;
        this._bounds.x = 2 ** this._boundsPower2.x;
        this._bounds.y = 2 ** this._boundsPower2.y;
        this._bounds.z = 2 ** this._boundsPower2.z;
        this._boundsSet = true;
        return this;
    }
    setBounds(bounds) {
        if (this._boundsSet)
            return;
        this._bounds.x = bounds.x;
        this._bounds.y = bounds.y;
        this._bounds.z = bounds.z;
        this._boundsSet = true;
        return this;
    }
    getPosition() {
        return this.data.getPosition(this);
    }
    getIndex() {
        return this.data.getIndex(this);
    }
    getPositionXYZ(x, y, z) {
        return this.setXYZ(x, y, z).data.getPosition(this);
    }
    getIndexXYZ(x, y, z) {
        return this.setXYZ(x, y, z).data.getIndex(this);
    }
    getKeyXYZ(x, y, z) {
        return this.setXYZ(x, y, z).getKey();
    }
    getKey() {
        return `${this._position.x}-${this._position.y}-${this._position.z}`;
    }
}
