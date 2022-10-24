export const CollisionsHanlder = {
    sweepAABB(
    //entity 
    ax, ay, az, ahx, ahy, ahz, 
    //position
    bx, by, bz, 
    //collider
    bhx, bhy, bhz, 
    //velocity
    dx, dy, dz) {
        var mx, my, mz, mhx, mhy, mhz;
        mx = bx - (ax + ahx);
        my = by - (ay + ahy);
        mz = bz - (az + ahz);
        mhx = ahx + bhx;
        mhy = ahy + bhy;
        mhz = ahz + bhz;
        var h = 1, s, nx = 0, ny = 0, nz = 0;
        // X min
        s = this.lineToPlane(0, 0, 0, dx, dy, dz, mx, my, mz, -1, 0, 0);
        if (s >= 0 &&
            dx > 0 &&
            s < h &&
            this.between(s * dy, my, my + mhy) &&
            this.between(s * dz, mz, mz + mhz)) {
            h = s;
            nx = -1;
            ny = 0;
            nz = 0;
        }
        // X max
        s = this.lineToPlane(0, 0, 0, dx, dy, dz, mx + mhx, my, mz, 1, 0, 0);
        if (s >= 0 &&
            dx < 0 &&
            s < h &&
            this.between(s * dy, my, my + mhy) &&
            this.between(s * dz, mz, mz + mhz)) {
            h = s;
            nx = 1;
            ny = 0;
            nz = 0;
        }
        // Y min
        s = this.lineToPlane(0, 0, 0, dx, dy, dz, mx, my, mz, 0, -1, 0);
        if (s >= 0 &&
            dy > 0 &&
            s < h &&
            this.between(s * dx, mx, mx + mhx) &&
            this.between(s * dz, mz, mz + mhz)) {
            h = s;
            nx = 0;
            ny = -1;
            nz = 0;
        }
        // Y max
        s = this.lineToPlane(0, 0, 0, dx, dy, dz, mx, my + mhy, mz, 0, 1, 0);
        if (s >= 0 &&
            dy < 0 &&
            s < h &&
            this.between(s * dx, mx, mx + mhx) &&
            this.between(s * dz, mz, mz + mhz)) {
            h = s;
            nx = 0;
            ny = 1;
            nz = 0;
        }
        // Z min
        s = this.lineToPlane(0, 0, 0, dx, dy, dz, mx, my, mz, 0, 0, -1);
        if (s >= 0 &&
            dz > 0 &&
            s < h &&
            this.between(s * dx, mx, mx + mhx) &&
            this.between(s * dy, my, my + mhy)) {
            h = s;
            nx = 0;
            ny = 0;
            nz = -1;
        }
        // Z max
        s = this.lineToPlane(0, 0, 0, dx, dy, dz, mx, my, mz + mhz, 0, 0, 1);
        if (s >= 0 &&
            dz < 0 &&
            s < h &&
            this.between(s * dx, mx, mx + mhx) &&
            this.between(s * dy, my, my + mhy)) {
            h = s;
            nx = 0;
            ny = 0;
            nz = 1;
        }
        return { h: h, nx: nx, ny: ny, nz: nz };
    },
    lineToPlane(px, py, pz, ux, uy, uz, vx, vy, vz, nx, ny, nz) {
        var NdotU = nx * ux + ny * uy + nz * uz;
        if (NdotU == 0)
            return Infinity;
        // return n.(v-p) / n.u
        return (nx * (vx - px) + ny * (vy - py) + nz * (vz - pz)) / NdotU;
    },
    between(x, a, b) {
        return x >= a && x <= b;
    },
};
