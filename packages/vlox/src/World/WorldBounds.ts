export class WorldBounds {
  static bounds = {
    MinZ: -Number.MAX_SAFE_INTEGER,
    MaxZ: Number.MAX_SAFE_INTEGER,
    MinX: -Number.MAX_SAFE_INTEGER,
    MaxX: Number.MAX_SAFE_INTEGER,
    MinY: 0,
    MaxY: 256,
  };

  static setWorldBounds(
    minX: number,
    maxX: number,
    minZ: number,
    maxZ: number,
    minY: number,
    maxY: number
  ) {
    this.bounds.MinX = minX;
    this.bounds.MaxX = maxX;
    this.bounds.MinX = minZ;
    this.bounds.MaxZ = maxZ;
    this.bounds.MinY = minY;
    this.bounds.MaxY = maxY;
  }

  static inBounds(x: number, y: number, z: number) {
    if (x < this.bounds.MinX) return false;
    if (y < this.bounds.MinY) return false;
    if (z < this.bounds.MinZ) return false;
    if (x > this.bounds.MaxX) return false;
    if (y > this.bounds.MaxY) return false;
    if (z > this.bounds.MaxZ) return false;
    return true;
  }

  static getWorldWidth(): number {
    return this.bounds.MaxX - this.bounds.MinX;
  }

  static getWorldDepth(): number {
    return this.bounds.MaxZ - this.bounds.MinZ;
  }

  static getWorldHeightY(): number {
    return this.bounds.MaxY - this.bounds.MinY;
  }

  static getWorldDimensions(): {
    width: number;
    depth: number;
    height: number;
  } {
    return {
      width: this.getWorldWidth(),
      depth: this.getWorldDepth(),
      height: this.getWorldHeightY(),
    };
  }
}
