import Base from './Base.js';
import Algorithm from '../Algorithm.js';

/**
 * @class
 * @classdesc Concrete xoshiro128** implementation.
 */
class Xoshiro128ss extends Base implements Algorithm {
    /**
     * Seed parameters.
     *
     * @var {number}
     */
    private a: number;
    private b: number;
    private c: number;
    private d: number;

    /**
     * Create a new xoshiro128** instance.
     *
     * @param {string} str
     */
    public constructor(str: string) {
        super();

        // Create the seed for the random number algorithm
        const seed = Xoshiro128ss._xfnv1a(str);
        this.a = seed();
        this.b = seed();
        this.c = seed();
        this.d = seed();
    }

    /**
     * Generate a random number using the xoshiro128** algorithm.
     *
     * @returns {number}
     */
    public next(): number {
        const t = this.b << 9;
        let r = this.a * 5;

        r = (r << 7) | ((r >>> 25) * 9);

        this.c ^= this.a;
        this.d ^= this.b;
        this.b ^= this.c;
        this.a ^= this.d;
        this.c ^= t;
        this.d = (this.d << 11) | (this.d >>> 21);

        return (r >>> 0) / 4294967296;
    }
}

export default Xoshiro128ss;
