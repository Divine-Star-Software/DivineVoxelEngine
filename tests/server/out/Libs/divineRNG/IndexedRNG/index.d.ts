export declare class IndexedRNG {
    seed: number;
    MAX_VERTICES: number;
    MAX_VERTICES_MASK: number;
    amplitude: number;
    scale: number;
    r: number[];
    constructor(seed: number);
    get(x: number): number;
    _lerp(a: number, b: number, t: number): number;
}
