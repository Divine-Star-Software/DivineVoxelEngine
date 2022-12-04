import Base from './Base.js';
import Algorithm from '../Algorithm.js';
/**
 * @class
 * @classdesc Concrete mulberry32 implementation.
 */
declare class Mulberry32 extends Base implements Algorithm {
    /**
     * Seed parameter.
     *
     * @var {number}
     */
    private a;
    /**
     * Create a new mulberry32 instance.
     *
     * @param {string} str
     */
    constructor(str: string);
    /**
     * Generate a random number using the mulberry32 algorithm.
     *
     * @returns {number}
     */
    next(): number;
}
export default Mulberry32;
