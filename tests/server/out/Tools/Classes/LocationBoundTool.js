export class LocationBoundTool {
    location = ["main", 0, 0, 0];
    get dimension() {
        return this.location[0];
    }
    set dimension(dimension) {
        this.location[0] = dimension;
    }
    get x() {
        return this.location[1];
    }
    set x(value) {
        this.location[1] = value;
    }
    get y() {
        return this.location[2];
    }
    set y(value) {
        this.location[2] = value;
    }
    get z() {
        return this.location[3];
    }
    set z(value) {
        this.location[3] = value;
    }
    setDimension(dimensionId) {
        this.location[0] = dimensionId;
        return this;
    }
    getLocation() {
        return this.location;
    }
    setXYZ(x, y, z) {
        this.location[1] = x;
        this.location[2] = y;
        this.location[3] = z;
        return this;
    }
    setXZ(x, z) {
        this.setXYZ(x, this.location[2], z);
        return this;
    }
    setLocation(location) {
        this.location[0] = location[0];
        this.location[1] = location[1];
        this.location[2] = location[2];
        this.location[3] = location[3];
        return this;
    }
}
