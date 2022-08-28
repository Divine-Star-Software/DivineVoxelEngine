export const StairData = {
    /**
     *    Bottom
     *      N
     *      |
     *     \ /
     *      S
     */
    0: {
        top: {
            type: "stair-top",
            StairAO: {
                1: [0, -1, -2, -3],
                2: [0.4, 1, 1, 0.4],
            },
            transform: {
                2: [0, -0.5, 0.5],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0, he: 0.5 },
                2: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
            },
            dimensions: {
                1: [0.5, 0.25, 0.5],
            },
        },
        bottom: {
            type: "normal",
        },
        east: {
            type: "side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [0, -1, 1, 1],
            },
            transform: {
                2: [0, 0.5, 0],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0, we: 0.5, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.5, 0.25, 0.25],
            },
        },
        west: {
            type: "side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [0, -1, 1, 1],
            },
            transform: {
                2: [0, 0.5, 0],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.5, 0.25, 0.25],
            },
        },
        south: {
            type: "normal",
        },
        north: {
            type: "stair-side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [1, 1, 0.4, 0.4],
            },
            transform: {
                2: [0, 0.5, -0.5],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
            },
        },
    },
    /**
     *    Bottom
     *
     *  E ==> W
     *
     */
    1: {
        top: {
            type: "stair-top",
            StairAO: {
                1: [0, -1, -2, -3],
                2: [0.4, 0.4, 1, 1],
            },
            transform: {
                2: [0.5, -0.5, 0],
            },
            uvs: {
                1: { r: 270, ws: 0, we: 1, hs: 0, he: 0.5 },
                2: { r: 270, ws: 0, we: 1, hs: 0.5, he: 1 },
            },
            dimensions: {
                1: [0.25, 0.5, 0.5],
            },
        },
        bottom: {
            type: "normal",
        },
        east: {
            type: "stair-side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [1, 1, 0.4, 0.4],
            },
            transform: {
                2: [-0.5, 0.5, 0],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
            },
        },
        west: {
            type: "normal",
        },
        south: {
            type: "side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [0, -1, 1, 1],
            },
            transform: {
                2: [0, 0.5, 0],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0, we: 0.5, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.25, 0.5, 0.25],
            },
        },
        north: {
            type: "side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [0, -1, 1, 1],
            },
            transform: {
                2: [0, 0.5, 0],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.25, 0.5, 0.25],
            },
        },
    },
    /**
     *    Bottom
     *      N
     *     / \
     *      |
     *      S
     */
    2: {
        top: {
            type: "stair-top",
            StairAO: {
                1: [1, 0.4, 0.4, 1],
                2: [0, -1, -2, -3],
            },
            transform: {
                1: [0, -0.5, 0],
                2: [0, 0, 0.5],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.25, 0.5],
            },
        },
        bottom: {
            type: "normal",
        },
        east: {
            type: "side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [0, -1, 1, 1],
            },
            transform: {
                2: [0, 0.5, 0.5],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.5, 0.25, 0.25],
            },
        },
        west: {
            type: "side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [0, -1, 1, 1],
            },
            transform: {
                2: [0, 0.5, 0.5],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0, we: 0.5, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.5, 0.25, 0.25],
            },
        },
        south: {
            type: "stair-side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [1, 1, 0.4, 0.4],
            },
            transform: {
                2: [0, 0.5, 0.5],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
            },
        },
        north: {
            type: "normal",
        },
    },
    /**
     *    Bottom
     *
     *  E <=== W
     *
     */
    3: {
        top: {
            type: "stair-top",
            StairAO: {
                1: [1, 1, 0.4, 0.4],
                2: [0, -1, -2, -3],
            },
            transform: {
                1: [0, -0.5, 0],
                2: [0.5, 0, 0],
            },
            uvs: {
                1: { r: 90, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 90, ws: 0, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.25, 0.5, 0.5],
            },
        },
        bottom: {
            type: "normal",
        },
        east: {
            type: "normal",
        },
        west: {
            type: "stair-side",
            transform: {
                2: [0.5, 0.5, 0],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0, we: 1, hs: 0, he: 0.5 },
            },
            StairAO: {
                1: [1, 1, -2, -3],
                2: [1, 1, 0.4, 0.4],
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
            },
        },
        south: {
            type: "side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [0, -1, 1, 1],
            },
            transform: {
                2: [0.5, 0.5, 0],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.25, 0.5, 0.25],
            },
        },
        north: {
            type: "side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [0, -1, 1, 1],
            },
            transform: {
                2: [0.5, 0.5, 0],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0, we: 0.5, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.25, 0.5, 0.25],
            },
        },
    },
    /**
     *    Top
     *      N
     *      |
     *     \ /
     *      S
     */
    4: {
        top: {
            type: "normal",
        },
        bottom: {
            type: "stair-top",
            StairAO: {
                1: [0, -1, -2, -3],
                2: [0.4, 0.4, 1, 1],
            },
            transform: {
                2: [0, 0.5, 0.5],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0, he: 0.5 },
                2: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
            },
            dimensions: {
                1: [0.5, 0.25, 0.5],
            },
        },
        east: {
            type: "side",
            StairAO: {
                1: [0, -1, 1, 1],
                2: [1, 1, -2, -3],
            },
            transform: {
                1: [0, 0.5, 0],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 180, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.5, 0.25, 0.25],
            },
        },
        west: {
            type: "side",
            StairAO: {
                1: [0, -1, 1, 1],
                2: [1, 1, -2, -3],
            },
            transform: {
                1: [0, 0.5, 0],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 180, ws: 0, we: 0.5, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.5, 0.25, 0.25],
            },
        },
        south: {
            type: "normal",
        },
        north: {
            type: "stair-side",
            StairAO: {
                1: [0, -1, 1, 1],
                2: [0.4, 0.4, 1, 1],
            },
            transform: {
                1: [0, 0.5, 0],
                2: [0, 0, -0.5],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 180, ws: 0, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
            },
        },
    },
    /**
     *    Top
     *
     *  E ==> W
     *
     */
    5: {
        top: {
            type: "normal",
        },
        bottom: {
            type: "stair-top",
            StairAO: {
                1: [0, -1, -2, -3],
                2: [0.4, 1, 1, 0.4],
            },
            transform: {
                2: [0.5, 0.5, 0],
            },
            uvs: {
                1: { r: 270, ws: 0, we: 1, hs: 0, he: 0.5 },
                2: { r: 270, ws: 0, we: 1, hs: 0.5, he: 1 },
            },
            dimensions: {
                1: [0.25, 0.5, 0.5],
            },
        },
        east: {
            type: "stair-side",
            StairAO: {
                1: [0, -1, 1, 1],
                2: [0.4, 0.4, 1, 1],
            },
            transform: {
                1: [0, 0.5, 0],
                2: [-0.5, 0, 0],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 180, ws: 0, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
            },
        },
        west: {
            type: "normal",
        },
        south: {
            type: "side",
            StairAO: {
                1: [0, -1, 1, 1],
                2: [1, 1, -2, -3],
            },
            transform: {
                1: [0, 0.5, 0],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 180, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.25, 0.5, 0.25],
            },
        },
        north: {
            type: "side",
            StairAO: {
                1: [0, -1, 1, 1],
                2: [1, 1, -2, -3],
            },
            transform: {
                1: [0, 0.5, 0],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 180, ws: 0, we: 0.5, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.25, 0.5, 0.25],
            },
        },
    },
    /**
     *    Top
     *      N
     *     / \
     *      |
     *      S
     */
    6: {
        top: {
            type: "normal",
        },
        bottom: {
            type: "stair-top",
            StairAO: {
                1: [1, 1, 0.4, 0.4],
                2: [0, -1, -2, -3],
            },
            transform: {
                1: [0, 0.5, 0],
                2: [0, 0, 0.5],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 180, ws: 0, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.25, 0.5],
            },
        },
        east: {
            type: "side",
            StairAO: {
                1: [0, -1, 1, 1],
                2: [1, 1, -2, -3],
            },
            transform: {
                1: [0, 0.5, 0],
                2: [0, 0, 0.5],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 180, ws: 0, we: 0.5, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.5, 0.25, 0.25],
            },
        },
        west: {
            type: "side",
            StairAO: {
                1: [0, -1, 1, 1],
                2: [1, 1, -2, -3],
            },
            transform: {
                1: [0, 0.5, 0],
                2: [0, 0, 0.5],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 180, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.5, 0.25, 0.25],
            },
        },
        south: {
            type: "stair-side",
            StairAO: {
                1: [0.4, 0.4, 1, 1],
                2: [0, -1, 1, 1],
            },
            transform: {
                1: [0, 0, 0.5],
                2: [0, 0.5, 0],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0, he: 0.5 },
                2: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
            },
        },
        north: {
            type: "normal",
        },
    },
    /**
     *    Top
     *
     *  E <=== W
     *
     */
    7: {
        top: {
            type: "normal",
        },
        bottom: {
            type: "stair-top",
            StairAO: {
                1: [1, 0.4, 0.4, 1],
                2: [0, -1, -2, -3],
            },
            transform: {
                1: [0, 0.5, 0],
                2: [0.5, 0, 0],
            },
            uvs: {
                1: { r: 90, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 90, ws: 0, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.25, 0.5, 0.5],
            },
        },
        east: {
            type: "normal",
        },
        west: {
            type: "stair-side",
            transform: {
                1: [0.5, 0, 0],
                2: [0, 0.5, 0],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0, he: 0.5 },
                2: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
            },
            StairAO: {
                1: [0.4, 0.4, 1, 1],
                2: [0, -1, 1, 1],
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
            },
        },
        south: {
            type: "side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [0, -1, 1, 1],
            },
            transform: {
                1: [0, 0.5, 0],
                2: [0.5, 0, 0],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 180, ws: 0, we: 0.5, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.25, 0.5, 0.25],
            },
        },
        north: {
            type: "side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [0, -1, 1, 1],
            },
            transform: {
                1: [0, 0.5, 0],
                2: [0.5, 0, 0],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 180, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.25, 0.5, 0.25],
            },
        },
    },
    /**********
     *
     * Connected States
     *
     * ********
     */
    /**
     *  Bottom
     *  South To North
     */
    8: {
        top: {
            type: "stair-top",
            flip: {
                1: true,
            },
            StairAO: {
                1: [1, 0.1, 1, 1],
                2: [0, -1, -2, -3],
            },
            transform: {
                1: [0, -0.5, 0],
                2: [0, 0, 0],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0, he: 1 },
                2: { r: 180, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.5],
                2: [0.25, 0.25, 0.5],
            },
        },
        bottom: {
            type: "normal",
        },
        east: {
            type: "side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [1, 1, 0.4, 0.4],
            },
            transform: {
                2: [-0.5, 0.5, 0],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0, we: 0.5, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.5, 0.25, 0.25],
            },
        },
        west: {
            type: "side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [0, -1, 1, 1],
            },
            transform: {
                2: [0, 0.5, 0],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.5, 0.25, 0.25],
            },
        },
        south: {
            type: "side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [0, -1, 1, 1],
            },
            transform: {
                2: [0, 0.5, 0],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0, we: 0.5, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.25, 0.5, 0.25],
            },
        },
        north: {
            type: "side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [1, 1, 0.4, 0.4],
            },
            transform: {
                2: [0, 0.5, -0.5],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.25, 0.5, 0.25],
            },
        },
    },
    /**
     *  Bottom
     *  North To South
     *
     */
    9: {
        top: {
            type: "stair-top",
            StairAO: {
                1: [1, 0.1, 1, 1],
                2: [0, -1, -2, -3],
            },
            transform: {
                1: [0, -0.5, 0],
                2: [0, 0, 0.5],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0, he: 1 },
                2: { r: 0, ws: 0, we: 0.5, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.5],
                2: [0.25, 0.25, 0.5],
            },
        },
        bottom: {
            type: "normal",
        },
        east: {
            type: "side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [1, 1, 0.4, 0.4],
            },
            transform: {
                2: [-0.5, 0.5, 0.5],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.5, 0.25, 0.25],
            },
        },
        west: {
            type: "side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [0, -1, 1, 1],
            },
            transform: {
                2: [0, 0.5, 0.5],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0, we: 0.5, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.5, 0.25, 0.25],
            },
        },
        south: {
            type: "side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [1, 1, 0.4, 0.4],
            },
            transform: {
                2: [0, 0.5, 0.5],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0, we: 0.5, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.25, 0.5, 0.25],
            },
        },
        north: {
            type: "side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [0, -1, 1, 1],
            },
            transform: {
                2: [0, 0.5, 0],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.25, 0.5, 0.25],
            },
        },
    },
    /**
     *
     */
    10: {
        top: {
            type: "stair-top",
            StairAO: {
                1: [1, 1, 1, 0.1],
                2: [0, -1, -2, -3],
            },
            transform: {
                1: [0, -0.5, 0],
                2: [0.5, 0, 0],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0, he: 1 },
                2: { r: 180, ws: 0, we: 0.5, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.5],
                2: [0.25, 0.25, 0.5],
            },
        },
        bottom: {
            type: "normal",
        },
        east: {
            type: "side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [0, -1, 1, 1],
            },
            transform: {
                2: [0, 0.5, 0],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0, we: 0.5, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.5, 0.25, 0.25],
            },
        },
        west: {
            type: "side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [1, 1, 0.4, 0.4],
            },
            transform: {
                2: [0.5, 0.5, 0],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.5, 0.25, 0.25],
            },
        },
        south: {
            type: "side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [0, -1, 1, 1],
            },
            transform: {
                2: [0.5, 0.5, 0],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.25, 0.5, 0.25],
            },
        },
        north: {
            type: "side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [1, 1, 0.4, 0.4],
            },
            transform: {
                2: [0.5, 0.5, -0.5],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0, we: 0.5, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.25, 0.5, 0.25],
            },
        },
    },
    /**
     *
     */
    11: {
        top: {
            type: "stair-top",
            flip: {
                1: true,
            },
            StairAO: {
                1: [1, 1, 1, 0.1],
                2: [0, -1, -2, -3],
            },
            transform: {
                1: [0, -0.5, 0],
                2: [0.5, 0, 0.5],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0, he: 1 },
                2: { r: 0, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.5],
                2: [0.25, 0.25, 0.5],
            },
        },
        bottom: {
            type: "normal",
        },
        east: {
            type: "side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [0, -1, 1, 1],
            },
            transform: {
                2: [0, 0.5, 0.5],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.5, 0.25, 0.25],
            },
        },
        west: {
            type: "side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [1, 1, 0.4, 0.4],
            },
            transform: {
                2: [0.5, 0.5, 0.5],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0, we: 0.5, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.5, 0.25, 0.25],
            },
        },
        south: {
            type: "side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [1, 1, 0.4, 0.4],
            },
            transform: {
                2: [0.5, 0.5, 0.5],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.25, 0.5, 0.25],
            },
        },
        north: {
            type: "side",
            StairAO: {
                1: [1, 1, -2, -3],
                2: [0, -1, 1, 1],
            },
            transform: {
                2: [0.5, 0.5, 0],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 0, ws: 0, we: 0.5, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.25, 0.5, 0.25],
            },
        },
    },
    /**
     * Connected Top States
     */
    12: {
        top: {
            type: "normal",
        },
        bottom: {
            type: "stair-top",
            flip: {
                1: true,
            },
            StairAO: {
                1: [1, 0.1, 1, 1],
                2: [0, -1, -2, -3],
            },
            transform: {
                1: [0, 0.5, 0],
                2: [0, 0, 0],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0, he: 1 },
                2: { r: 0, ws: 0, we: 0.5, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.5],
                2: [0.25, 0.25, 0.5],
            },
        },
        east: {
            type: "side",
            StairAO: {
                1: [0, -1, 1, 1],
                2: [0.4, 0.4, 1, 1],
            },
            transform: {
                1: [0, 0.5, 0],
                2: [-0.5, 0, 0],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 180, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.5, 0.25, 0.25],
            },
        },
        west: {
            type: "side",
            StairAO: {
                1: [0, -1, 1, 1],
                2: [1, 1, -2, -3],
            },
            transform: {
                1: [0, 0.5, 0],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 180, ws: 0, we: 0.5, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.5, 0.25, 0.25],
            },
        },
        south: {
            type: "side",
            StairAO: {
                1: [0, -1, 1, 1],
                2: [1, 1, -2, -3],
            },
            transform: {
                1: [0, 0.5, 0],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 180, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.25, 0.5, 0.25],
            },
        },
        north: {
            type: "side",
            StairAO: {
                1: [0, -1, 1, 1],
                2: [0.4, 0.4, 1, 1],
            },
            transform: {
                1: [0, 0.5, 0],
                2: [0, 0, -0.5],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 180, ws: 0, we: 0.5, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.25, 0.5, 0.25],
            },
        },
    },
    13: {
        top: {
            type: "normal",
        },
        bottom: {
            type: "stair-top",
            StairAO: {
                1: [1, 1, 1, 0.1],
                2: [0, -1, -2, -3],
            },
            transform: {
                1: [0, 0.5, 0],
                2: [0, 0, 0.5],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0, he: 1 },
                2: { r: 180, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.5],
                2: [0.25, 0.25, 0.5],
            },
        },
        east: {
            type: "side",
            StairAO: {
                1: [0, -1, 1, 1],
                2: [0.4, 0.4, 1, 1],
            },
            transform: {
                1: [0, 0.5, 0],
                2: [-0.5, 0, 0.5],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 180, ws: 0, we: 0.5, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.5, 0.25, 0.25],
            },
        },
        west: {
            type: "side",
            StairAO: {
                1: [0, -1, 1, 1],
                2: [1, 1, -2, -3],
            },
            transform: {
                1: [0, 0.5, 0],
                2: [0, 0, 0.5],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 180, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.5, 0.25, 0.25],
            },
        },
        south: {
            type: "side",
            StairAO: {
                1: [0, -1, 1, 1],
                2: [0.4, 0.4, 1, 1],
            },
            transform: {
                1: [0, 0.5, 0],
                2: [0, 0, 0.5],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 180, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.25, 0.5, 0.25],
            },
        },
        north: {
            type: "side",
            StairAO: {
                1: [0, -1, 1, 1],
                2: [1, 1, -2, -3],
            },
            transform: {
                1: [0, 0.5, 0],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 180, ws: 0, we: 0.5, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.25, 0.5, 0.25],
            },
        },
    },
    14: {
        top: {
            type: "normal",
        },
        bottom: {
            type: "stair-top",
            StairAO: {
                1: [1, 0.1, 1, 1],
                2: [0, -1, -2, -3],
            },
            transform: {
                1: [0, 0.5, 0],
                2: [0.5, 0, 0],
            },
            uvs: {
                1: { r: 0, ws: 0, we: 1, hs: 0, he: 1 },
                2: { r: 0, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.5],
                2: [0.25, 0.25, 0.5],
            },
        },
        east: {
            type: "side",
            StairAO: {
                1: [0, -1, 1, 1],
                2: [1, 1, -2, -3],
            },
            transform: {
                1: [0, 0.5, 0],
                2: [0, 0, 0],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 180, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.5, 0.25, 0.25],
            },
        },
        west: {
            type: "side",
            StairAO: {
                1: [0, -1, 1, 1],
                2: [0.4, 0.4, 1, 1],
            },
            transform: {
                1: [0, 0.5, 0],
                2: [0.5, 0, 0],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 180, ws: 0, we: 0.5, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.5, 0.25, 0.25],
            },
        },
        south: {
            type: "side",
            StairAO: {
                1: [0, -1, 1, 1],
                2: [1, 1, -2, -3],
            },
            transform: {
                1: [0, 0.5, 0],
                2: [0.5, 0, 0],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 180, ws: 0, we: 0.5, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.25, 0.5, 0.25],
            },
        },
        north: {
            type: "side",
            StairAO: {
                1: [0, -1, 1, 1],
                2: [0.4, 0.4, 1, 1],
            },
            transform: {
                1: [0, 0.5, 0],
                2: [0.5, 0, -0.5],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 180, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.25, 0.5, 0.25],
            },
        },
    },
    15: {
        top: {
            type: "normal",
        },
        bottom: {
            type: "stair-top",
            flip: {
                1: true,
            },
            StairAO: {
                1: [1, 1, 1, 0.1],
                2: [0, -1, -2, -3],
            },
            transform: {
                1: [0, 0.5, 0],
                2: [0.5, 0, 0.5],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0, he: 1 },
                2: { r: 180, ws: 0, we: 0.5, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.5],
                2: [0.25, 0.25, 0.5],
            },
        },
        east: {
            type: "side",
            StairAO: {
                1: [0, -1, 1, 1],
                2: [1, 1, -2, -3],
            },
            transform: {
                1: [0, 0.5, 0],
                2: [0, 0, 0.5],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 180, ws: 0, we: 0.5, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.5, 0.25, 0.25],
            },
        },
        west: {
            type: "side",
            StairAO: {
                1: [0, -1, 1, 1],
                2: [0.4, 0.4, 1, 1],
            },
            transform: {
                1: [0, 0.5, 0],
                2: [0.5, 0, 0.5],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 180, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.5, 0.25, 0.25],
            },
        },
        south: {
            type: "side",
            StairAO: {
                1: [0, -1, 1, 1],
                2: [0.4, 0.4, 1, 1],
            },
            transform: {
                1: [0, 0.5, 0],
                2: [0.5, 0, 0.5],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 180, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.25, 0.5, 0.25],
            },
        },
        north: {
            type: "side",
            StairAO: {
                1: [0, -1, 1, 1],
                2: [1, 1, -2, -3],
            },
            transform: {
                1: [0, 0.5, 0],
                2: [0.5, 0, 0],
            },
            uvs: {
                1: { r: 180, ws: 0, we: 1, hs: 0.5, he: 1 },
                2: { r: 180, ws: 0.5, we: 1, hs: 0, he: 0.5 },
            },
            dimensions: {
                1: [0.5, 0.5, 0.25],
                2: [0.25, 0.5, 0.25],
            },
        },
    },
};
