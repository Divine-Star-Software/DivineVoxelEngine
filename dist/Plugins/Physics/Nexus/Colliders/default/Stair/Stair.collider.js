const collisionReturn = [
    {
        name: "stair-bottom",
        boundingBox: {
            w: 1,
            h: 0.5,
            d: 1,
        },
        position: [0, 0, 0],
    },
    {
        name: "stair-top",
        boundingBox: {
            w: 1,
            h: 0.5,
            d: 0.5,
        },
        position: [0, 0, 0],
    },
];
export const StairCollider = {
    id: "#dve_stair",
    getColliderData(x, y, z) {
        collisionReturn[0].position[0] = x;
        collisionReturn[0].position[1] = y;
        collisionReturn[0].position[2] = z;
        collisionReturn[1].position[0] = x;
        collisionReturn[1].position[1] = y + .5;
        collisionReturn[1].position[2] = z;
        return collisionReturn;
    },
};
