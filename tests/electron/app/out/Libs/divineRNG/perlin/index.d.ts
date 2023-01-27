/**# Perlin Noise 3d
 * ---
 * TypeScript version of the library found here:
 * https://github.com/alterebro/perlin-noise-3d
 */
export declare class PerlinNoise3d {
    PERLIN_YWRAPB: number;
    PERLIN_YWRAP: number;
    PERLIN_ZWRAPB: number;
    PERLIN_ZWRAP: number;
    PERLIN_SIZE: number;
    SINCOS_PRECISION: number;
    SINCOS_LENGTH: number;
    sinLUT: any[];
    cosLUT: any[];
    DEG_TO_RAD: number;
    perlin_octaves: number;
    perlin_amp_falloff: number;
    perlin: null | any[];
    perlin_PI: number;
    constructor();
    lcg(): {
        setSeed: (val: number) => void;
        getSeed: () => number;
        rand: () => number;
    };
    noiseSeed(seed: number): this;
    noise_fsc(i: number): number;
    get(x: number, y: number, z: number): number;
}
