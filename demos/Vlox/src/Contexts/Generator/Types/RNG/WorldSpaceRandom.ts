import { IndexedRNG } from "@amodx/rng/IndexedRNG/index";
export class WorldSpaceRandom {
  rng: IndexedRNG;

  x = 0;
  y = 0;
  z = 0;

  constructor(public seed: number) {
    this.rng = new IndexedRNG(seed);
  }

  setXYZ(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  random() {
    const x = this.x ? this.x : 1;
    const y = this.y ? this.y : 1;
    const z = this.z ? this.z : 1;

    return this.rng.get(x * y * z);
  }
}
