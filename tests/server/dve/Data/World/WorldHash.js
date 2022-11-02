export const WorldHash = {
    hash(x, y, z) {
        x = x >= 0 ? 2 * x : -2 * x - 1;
        y = y >= 0 ? 2 * y : -2 * y - 1;
        z = z >= 0 ? 2 * z : -2 * z - 1;
        const max = Math.max(x, y, z);
        let hash = max ** 3 + 2 * max * z + z;
        if (max == z) {
            hash += Math.max(x, y) ** 2;
        }
        return y >= x ? hash += x + y : hash += y;
    },
};
