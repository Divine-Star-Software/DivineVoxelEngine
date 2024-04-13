export class CollisionResult {
  raw = {
    hitDepth: 1,
    nx: 0,
    ny: 0,
    nz: 0,
  };

  update(h: number, nx: number, ny: number, nz: number) {
    this.raw.hitDepth = h;
    this.raw.nx = nx;
    this.raw.ny = ny;
    this.raw.nz = nz;
    return this;
  }
  loadIn(results : CollisionResult) {
    this.raw.hitDepth = results.raw.hitDepth;
    this.raw.nx = results.raw.nx;
    this.raw.ny = results.raw.ny;
    this.raw.nz = results.raw.nz;

  }
  reset() {
    this.raw.hitDepth = 1;
    this.raw.nx = 0;
    this.raw.ny = 0;
    this.raw.nz = 0;
  }
  collided() {
    return this.raw.hitDepth < 1;
  }
  faceHit = {
    top: () => this.raw.ny == 1 && this.collided(),
    bottom: () => this.raw.ny == -1 && this.collided(),
    east: () => this.raw.nx == 1 && this.collided(),
    west: () => this.raw.nx == -1 && this.collided(),
    north: () => this.raw.nz == 1 && this.collided(),
    south: () => this.raw.nz == -1 && this.collided(),
  };
  normalHit = {
    x: () => this.raw.nx,
    y: () => this.raw.ny,
    z: () => this.raw.nz,
  };
}
