class LCG {
    seed;
    m = 4294967296;
    a = 1664525;
    c = 1013904223;
    z = 0;
    constructor(seed) {
        this.seed = seed;
        this.setSeed(seed);
    }
    setSeed(val) {
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
export class IndexedRNG {
    seed;
    MAX_VERTICES = 256_000;
    MAX_VERTICES_MASK = this.MAX_VERTICES - 1;
    amplitude = 1;
    scale = 1;
    r = [];
    constructor(seed) {
        this.seed = seed;
        const lcg = new LCG(seed);
        for (let i = 0; i < this.MAX_VERTICES; ++i) {
            this.r.push(lcg.rand());
        }
    }
    get(x) {
        const scaledX = x * this.scale;
        const xFloor = Math.floor(scaledX);
        const t = scaledX - xFloor;
        const tRemapSmoothstep = t * t * (3 - 2 * t);
        const xMin = xFloor & this.MAX_VERTICES_MASK;
        const xMax = (xMin + 1) & this.MAX_VERTICES_MASK;
        const y = this._lerp(this.r[xMin], this.r[xMax], tRemapSmoothstep);
        return y * this.amplitude;
    }
    _lerp(a, b, t) {
        return a * (1 - t) + b * t;
    }
}
