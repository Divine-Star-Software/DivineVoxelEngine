import Mulberry32 from './Algorithms/Mulberry32.js';
import Sfc32 from './Algorithms/Sfc32.js';
import Xoshiro128ss from './Algorithms/Xoshiro128ss.js';
import { isNullOrUndefined } from './helpers.js';
/**
 * Available seedable random number generator algorithms.
 *
 * @var {PRNG}
 */
export var PRNG;
(function (PRNG) {
    PRNG["sfc32"] = "sfc32";
    PRNG["mulberry32"] = "mulberry32";
    PRNG["xoshiro128ss"] = "xoshiro128ss";
})(PRNG || (PRNG = {}));
/**
 * A class for generating random numbers. Several different (seedable) random
 * number generator algorithms are configurable.
 *
 * See https://stackoverflow.com/a/47593316/7024747 for more info.
 * @class
 * @classdesc A class for generating random numbers.
 */
class Rand {
    /**
     * The string that will be used for generating a suitable hash for any of
     * the provided PRNG algorithms.
     *
     * @var {string}
     */
    str;
    /**
     * The PRNG algorithm that should be used for random number generation.
     *
     * @var {PRNG}
     */
    prng;
    /**
     * The generator that should be used for generating random numbers.
     *
     * @var {Function}
     */
    generator;
    /**
     * Create a new rand instance.
     *
     * @param {string} str
     * @param {PRNG} prng
     */
    constructor(str, prng = PRNG.sfc32) {
        this.str = str;
        this.prng = prng;
        this.generator = this._initializeGenerator();
    }
    /**
     * Generate a new random number using the selected generator.
     *
     * @returns {number}
     */
    next() {
        return this.generator.next();
    }
    /**
     * Initialize the chosen random number generator.
     *
     * @returns {Algorithm|Function}
     */
    _initializeGenerator() {
        if (isNullOrUndefined(this.str))
            return this.wrap();
        switch (this.prng) {
            case 'sfc32':
                return new Sfc32(this.str);
            case 'mulberry32':
                return new Mulberry32(this.str);
            case 'xoshiro128ss':
                return new Xoshiro128ss(this.str);
            default:
                return this.wrap();
        }
    }
    /**
     * Wrap the standard random function in an object.
     *
     * @returns {Algorithm}
     */
    wrap() {
        return {
            /**
             * Generate a random number.
             *
             * @return {number}
             */
            next() {
                return Math.random();
            },
        };
    }
}
export default Rand;
