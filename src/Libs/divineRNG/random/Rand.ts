import AlgorithmContract from './Algorithm.js';
import Mulberry32 from './Algorithms/Mulberry32.js';
import Sfc32 from './Algorithms/Sfc32.js';
import Xoshiro128ss from './Algorithms/Xoshiro128ss.js';
import { isNullOrUndefined } from './helpers.js';

/**
 * Available seedable random number generator algorithms.
 *
 * @var {PRNG}
 */
export enum PRNG {
    sfc32 = 'sfc32',
    mulberry32 = 'mulberry32',
    xoshiro128ss = 'xoshiro128ss',
}

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
    private str?: string;

    /**
     * The PRNG algorithm that should be used for random number generation.
     *
     * @var {PRNG}
     */
    private prng: PRNG;

    /**
     * The generator that should be used for generating random numbers.
     *
     * @var {Function}
     */
    private generator: AlgorithmContract;

    /**
     * Create a new rand instance.
     *
     * @param {string} str
     * @param {PRNG} prng
     */
    public constructor(str?: string, prng: PRNG = PRNG.sfc32) {
        this.str = str;
        this.prng = prng;
        this.generator = this._initializeGenerator();
    }

    /**
     * Generate a new random number using the selected generator.
     *
     * @returns {number}
     */
    public next(): number {
        return this.generator.next();
    }

    /**
     * Initialize the chosen random number generator.
     *
     * @returns {Algorithm|Function}
     */
    private _initializeGenerator(): AlgorithmContract {
        if (isNullOrUndefined(this.str)) return this.wrap();

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
    private wrap(): AlgorithmContract {
        return {
            /**
             * Generate a random number.
             *
             * @return {number}
             */
            next(): number {
                return Math.random();
            },
        };
    }
}

export default Rand;
