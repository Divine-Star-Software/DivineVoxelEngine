export const $3dMooreNeighborhood = [];
export const $2dMooreNeighborhood = [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
    [-1, 0],
    [0, -1],
    [-1, -1],
    [1, -1],
    [-1, 1],
];
export const $3dCardinalNeighbors = [
    [0, 1, 0],
    [0, -1, 0],
    [1, 0, 0],
    [-1, 0, 0],
    [0, 0, -1],
    [0, 0, 1],
];
for (let y = -1; y < 2; y++) {
    for (const n of $2dMooreNeighborhood) {
        $3dMooreNeighborhood.push([n[0], y, n[1]]);
    }
}
