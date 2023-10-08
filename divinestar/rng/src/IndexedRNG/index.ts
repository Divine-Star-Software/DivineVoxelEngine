import { LCG } from "../seededRandom/LCG.js";

export class IndexedRNG {
  MAX_VERTICES = 256_000;
  MAX_VERTICES_MASK = this.MAX_VERTICES - 1;
  amplitude = 1;
  scale = 1;

  r: number[] = [];

  constructor(public seed: number) {
    const lcg = new LCG(seed);
    for (let i = 0; i < this.MAX_VERTICES; ++i) {
      this.r.push(lcg.rand());
    }
  }

  get(x: number) {
    const scaledX = x * this.scale;
    const xFloor = Math.floor(scaledX);
    const t = scaledX - xFloor;
    const tRemapSmoothstep = t * t * (3 - 2 * t);
    const xMin = xFloor & this.MAX_VERTICES_MASK;
    const xMax = (xMin + 1) & this.MAX_VERTICES_MASK;
    const y = this._lerp(this.r[xMin], this.r[xMax], tRemapSmoothstep);
    return y * this.amplitude;
  }
  _lerp(a: number, b: number, t: number) {
    return a * (1 - t) + b * t;
  }

}
