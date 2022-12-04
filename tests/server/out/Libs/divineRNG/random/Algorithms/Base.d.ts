/**
 * @class
 * @classdesc Base class all algorithm implementations should inherit from.
 */
declare abstract class Base {
    /**
     * Generate a hash from a string that is suitable to use as a seed for any
     * of the PRNG's that inherit from this.
     *
     * @param {string} str
     * @returns {Function}
     */
    protected static _xfnv1a(str: string): () => number;
}
export default Base;
