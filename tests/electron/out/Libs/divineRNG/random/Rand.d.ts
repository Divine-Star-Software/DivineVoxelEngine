/**
 * Available seedable random number generator algorithms.
 *
 * @var {PRNG}
 */
export declare enum PRNG {
    sfc32 = "sfc32",
    mulberry32 = "mulberry32",
    xoshiro128ss = "xoshiro128ss"
}
/**
 * A class for generating random numbers. Several different (seedable) random
 * number generator algorithms are configurable.
 *
 * See https://stackoverflow.com/a/47593316/7024747 for more info.
 * @class
 * @classdesc A class for generating random numbers.
 */
declare class Rand {
    /**
     * The string that will be used for generating a suitable hash for any of
     * the provided PRNG algorithms.
     *
     * @var {string}
     */
    private str?;
    /**
     * The PRNG algorithm that should be used for random number generation.
     *
     * @var {PRNG}
     */
    private prng;
    /**
     * The generator that should be used for generating random numbers.
     *
     * @var {Function}
     */
    private generator;
    /**
     * Create a new rand instance.
     *
     * @param {string} str
     * @param {PRNG} prng
     */
    constructor(str?: string, prng?: PRNG);
    /**
     * Generate a new random number using the selected generator.
     *
     * @returns {number}
     */
    next(): number;
    /**
     * Initialize the chosen random number generator.
     *
     * @returns {Algorithm|Function}
     */
    private _initializeGenerator;
    /**
     * Wrap the standard random function in an object.
     *
     * @returns {Algorithm}
     */
    private wrap;
}
export default Rand;
