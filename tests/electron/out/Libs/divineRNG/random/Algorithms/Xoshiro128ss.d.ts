import Base from './Base.js';
import Algorithm from '../Algorithm.js';
/**
 * @class
 * @classdesc Concrete xoshiro128** implementation.
 */
declare class Xoshiro128ss extends Base implements Algorithm {
    /**
     * Seed parameters.
     *
     * @var {number}
     */
    private a;
    private b;
    private c;
    private d;
    /**
     * Create a new xoshiro128** instance.
     *
     * @param {string} str
     */
    constructor(str: string);
    /**
     * Generate a random number using the xoshiro128** algorithm.
     *
     * @returns {number}
     */
    next(): number;
}
export default Xoshiro128ss;
