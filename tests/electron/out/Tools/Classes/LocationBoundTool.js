export class LocationBoundTool {
    location = ["main", 0, 0, 0];
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
