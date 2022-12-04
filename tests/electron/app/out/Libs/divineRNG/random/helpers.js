/**
 * Determine if the given value is undefined.
 *
 * @param {mixed} value
 * @returns {boolean}
 */
export const isUndefined = (value) => typeof value === 'undefined';
/**
 * Determine if the given value is null.
 *
 * @param {mixed} value
 * @returns {boolean}
 */
export const isNull = (value) => value === null;
/**
 * Determine if the given value is null or undefined.
 *
 * @param {mixed} value
 * @returns {boolean}
 */
export const isNullOrUndefined = (value) => {
    return isNull(value) || isUndefined(value);
};
