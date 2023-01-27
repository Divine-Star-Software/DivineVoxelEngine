import Base from './Base.js';
import Algorithm from '../Algorithm.js';
/**
 * @class
 * @classdesc Concrete sfc32 implementation.
 */
declare class Sfc32 extends Base implements Algorithm {
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
     * Create a new sfc32 instance.
     *
     * @param {string} str
     */
    constructor(str: string);
    /**
     * Generate a random number using the sfc32 algorithm.
     *
     * @returns {number}
     */
    next(): number;
}
export default Sfc32;
