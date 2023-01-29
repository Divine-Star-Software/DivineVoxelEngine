const collisionReturn = [
    {
        name: "main",
        boundingBox: {
            w: 1,
            h: 1,
            d: 1,
        },
        position: [0, 0, 0],
    },
];
export const BoxCollider = {
    id: "#dve_box",
    getColliderData(x, y, z) {
        collisionReturn[0].position[0] = x;
        collisionReturn[0].position[1] = y;
        collisionReturn[0].position[2] = z;
        return collisionReturn;
    },
};
