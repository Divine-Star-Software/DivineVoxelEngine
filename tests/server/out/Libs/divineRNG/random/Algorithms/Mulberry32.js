import Base from './Base.js';
/**
 * @class
 * @classdesc Concrete mulberry32 implementation.
 */
class Mulberry32 extends Base {
    /**
     * Seed parameter.
     *
     * @var {number}
     */
    a;
    /**
     * Create a new mulberry32 instance.
     *
     * @param {string} str
     */
    constructor(str) {
        super();
        this.a = Mulberry32._xfnv1a(str)();
    }
    /**
     * Generate a random number using the mulberry32 algorithm.
     *
     * @returns {number}
     */
    next() {
        let t = (this.a += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
}
export default Mulberry32;
