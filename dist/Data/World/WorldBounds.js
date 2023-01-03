export const WorldBounds = {
    bounds: {
        MinZ: -Infinity,
        MaxZ: Infinity,
        MinX: -Infinity,
        MaxX: Infinity,
        MinY: 0,
        MaxY: 256,
    },
    setWorldBounds(minX, maxX, minZ, maxZ, minY, maxY) {
        this.bounds.MinX = minX;
        this.bounds.MaxX = maxX;
        this.bounds.MinX = minZ;
        this.bounds.MaxZ = maxZ;
        this.bounds.MinY = minY;
        this.bounds.MaxY = maxY;
    },
};
