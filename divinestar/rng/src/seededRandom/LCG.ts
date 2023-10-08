export class LCG {
    m = 4294967296;
    a = 1664525;
    c = 1013904223;
    z = 0;
  
    constructor(public seed: number) {
      this.setSeed(seed);
    }
  
    setSeed(val: number) {
      this.z = this.seed = (val == null ? Math.random() * this.m : val) >>> 0;
    }
    getSeed() {
      return this.seed;
    }
    rand() {
      this.z = (this.a * this.z + this.c) % this.m;
      return this.z / this.m;
    }
  }
  