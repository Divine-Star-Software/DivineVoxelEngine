import Base from './Base.js';
import Algorithm from '../Algorithm.js';

/**
 * @class
 * @classdesc Concrete sfc32 implementation.
 */
class Sfc32 extends Base implements Algorithm {
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
     * Create a new sfc32 instance.
     *
     * @param {string} str
     */
    public constructor(str: string) {
        super();

        // Create the seed for the random number algorithm
        const seed = Sfc32._xfnv1a(str);
        this.a = seed();
        this.b = seed();
        this.c = seed();
        this.d = seed();
    }

    /**
     * Generate a random number using the sfc32 algorithm.
     *
     * @returns {number}
     */
    public next(): number {
        this.a >>>= 0;
        this.b >>>= 0;
        this.c >>>= 0;
        this.d >>>= 0;

        let t = (this.a + this.b) | 0;

        this.a = this.b ^ (this.b >>> 9);
        this.b = (this.c + (this.c << 3)) | 0;
        this.c = (this.c << 21) | (this.c >>> 11);
        this.d = (this.d + 1) | 0;
        t = (t + this.d) | 0;
        this.c = (this.c + t) | 0;

        return (t >>> 0) / 4294967296;
    }
}

export default Sfc32;
