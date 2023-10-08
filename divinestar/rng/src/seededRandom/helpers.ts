/**
 * Determine if the given value is undefined.
 *
 * @param {mixed} value
 * @returns {boolean}
 */
export const isUndefined = (value: unknown): value is undefined => typeof value === 'undefined';

/**
 * Determine if the given value is null.
 *
 * @param {mixed} value
 * @returns {boolean}
 */
export const isNull = (value: unknown): value is null => value === null;

/**
 * Determine if the given value is null or undefined.
 *
 * @param {mixed} value
 * @returns {boolean}
 */
export const isNullOrUndefined = (value: unknown): value is null | undefined => {
    return isNull(value) || isUndefined(value);
};
