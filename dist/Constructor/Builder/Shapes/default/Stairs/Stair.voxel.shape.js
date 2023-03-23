//functions
import { SetUpStairOverrides } from "./Stair.overrides.js";
//data
import { StairStates } from "../../../../../Data/Shapes/StairStates.js";
import { ShapeBuilder } from "../../Builder/ShapeBuilder.js";
import { ShapeTool } from "../../ShapeTool.js";
import { FaceRecord } from "../../../../../Math/Constants/Faces.js";
export const StairVoxelShape = {
    id: "#dve_stair",
    add: {
        top() {
            ShapeBuilder.build(StairBuilderData[ShapeTool.data.voxel.getShapeState()][FaceRecord["top"]]);
        },
        bottom() {
            ShapeBuilder.build(StairBuilderData[ShapeTool.data.voxel.getShapeState()][FaceRecord["bottom"]]);
        },
        north() {
            ShapeBuilder.build(StairBuilderData[ShapeTool.data.voxel.getShapeState()][FaceRecord["north"]]);
        },
        south() {
            ShapeBuilder.build(StairBuilderData[ShapeTool.data.voxel.getShapeState()][FaceRecord["south"]]);
        },
        east() {
            ShapeBuilder.build(StairBuilderData[ShapeTool.data.voxel.getShapeState()][FaceRecord["east"]]);
        },
        west() {
            ShapeBuilder.build(StairBuilderData[ShapeTool.data.voxel.getShapeState()][FaceRecord["west"]]);
        },
    },
};
SetUpStairOverrides();
const halfHeightQuad = (direction, position, AO, uvs) => {
    const mewQuad = quad(direction, position);
    mewQuad[1][1] = 0.5;
    mewQuad[3] = AO;
    mewQuad[4] = [-5, -5, -5, -5];
    mewQuad[5] = [0, 0, 1, uvs[0], uvs[1]];
    return mewQuad;
};
const halfWidthQuad = (direction, position, AO, uvs) => {
    const quad = halfHeightQuad(direction, position, AO, uvs);
    quad[1][0] = 0.5;
    quad[1][1] = 1;
    quad[4] = [-5, -5, -5, -5];
    quad[5] = [0, uvs[0], uvs[1], 0, 1];
    return quad;
};
const quaterQuad = (direction, position, AO, uvs) => {
    const mewQuad = quad(direction, position);
    mewQuad[1][0] = 0.5;
    mewQuad[1][1] = 0.5;
    mewQuad[3] = AO;
    mewQuad[4] = [-5, -5, -5, -5];
    mewQuad[5] = uvs;
    return mewQuad;
};
const quad = (direction, position, AO = [-1, -2, -3, -4], flip = -1 | 0 | 1) => {
    return [
        direction,
        [1, 1],
        position,
        AO,
        [-1, -2, -3, -4],
        [0, 0, 1, 0, 1],
        flip,
    ];
};
const fullQuads = {
    top: quad("top", [0.5, 1, 0.5]),
    bottom: quad("bottom", [0.5, 0, 0.5]),
    east: quad("east", [1, 0.5, 0.5]),
    west: quad("west", [0, 0.5, 0.5]),
    south: quad("south", [0.5, 0.5, 0]),
    north: quad("north", [0.5, 0.5, 1]),
};
const a = 3;
export const StairBuilderData = {};
//bottom
StairBuilderData[StairStates.normal.bottom.north] = [
    [
        halfHeightQuad("top", [0.5, 1, 0.75], [1, -2, -3, 1], [0, 0.5]),
        halfHeightQuad("top", [0.5, 0.5, 0.25], [1, a, a, 1], [0.5, 1]),
    ],
    [fullQuads.bottom],
    [
        quaterQuad("east", [1, 0.75, 0.75], [-1, -2, 1, 1], [0, 0.5, 1, 0, 0.5]),
        halfHeightQuad("east", [1, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("west", [0, 0.75, 0.75], [-1, -2, 1, 1], [0, 0, 0.5, 0, 0.5]),
        halfHeightQuad("west", [0, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        halfHeightQuad("south", [0.5, 0.25, 0], [1, 1, -3, -4], [0.5, 1]),
        halfHeightQuad("south", [0.5, 0.75, 0.5], [-1, -2, a, a], [0, 0.5]),
    ],
    [fullQuads.north],
];
StairBuilderData[StairStates.normal.bottom.south] = [
    [
        halfHeightQuad("top", [0.5, 0.5, 0.75], [a, 1, 1, a], [0, 0.5]),
        halfHeightQuad("top", [0.5, 1, 0.25], [-1, 1, 1, -4], [0.5, 1]),
    ],
    [fullQuads.bottom],
    [
        quaterQuad("east", [1, 0.75, 0.25], [-1, -2, 1, 1], [0, 0, 0.5, 0, 0.5]),
        halfHeightQuad("east", [1, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("west", [0, 0.75, 0.25], [-1, -2, 1, 1], [0, 0.5, 1, 0, 0.5]),
        halfHeightQuad("west", [0, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [fullQuads.south],
    [
        halfHeightQuad("north", [0.5, 0.25, 1], [1, 1, -3, -4], [0.5, 1]),
        halfHeightQuad("north", [0.5, 0.75, 0.5], [-1, -2, a, a], [0, 0.5]),
    ],
];
StairBuilderData[StairStates.normal.bottom.east] = [
    [
        halfWidthQuad("top", [0.75, 1, 0.5], [1, 1, -3, -5], [0.5, 1]),
        halfWidthQuad("top", [0.25, 0.5, 0.5], [1, 1, a, a], [0, 0.5]),
    ],
    [fullQuads.bottom],
    [fullQuads.east],
    [
        halfHeightQuad("west", [0, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
        halfHeightQuad("west", [0.5, 0.75, 0.5], [-1, -2, a, a], [0, 0.5]),
    ],
    [
        quaterQuad("south", [0.75, 0.75, 0], [-1, -2, 1, 1], [0, 0.5, 1, 0, 0.5]),
        halfHeightQuad("south", [0.5, 0.25, 0], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("north", [0.75, 0.75, 1], [-1, -2, 1, 1], [0, 0, 0.5, 0, 0.5]),
        halfHeightQuad("north", [0.5, 0.25, 1], [1, 1, -3, -4], [0.5, 1]),
    ],
];
StairBuilderData[StairStates.normal.bottom.west] = [
    [
        halfWidthQuad("top", [0.75, 0.5, 0.5], [a, a, 1, 1], [0.5, 1]),
        halfWidthQuad("top", [0.25, 1, 0.5], [-1, -2, 1, 1], [0, 0.5]),
    ],
    [fullQuads.bottom],
    [
        halfHeightQuad("east", [1, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
        halfHeightQuad("east", [0.5, 0.75, 0.5], [-1, -2, a, a], [0, 0.5]),
    ],
    [fullQuads.west],
    [
        quaterQuad("south", [0.25, 0.75, 0], [-1, -2, 1, 1], [0, 0, 0.5, 0, 0.5]),
        halfHeightQuad("south", [0.5, 0.25, 0], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("north", [0.25, 0.75, 1], [-1, -2, 1, 1], [0, 0.5, 1, 0, 0.5]),
        halfHeightQuad("north", [0.5, 0.25, 1], [1, 1, -3, -4], [0.5, 1]),
    ],
];
//top
StairBuilderData[StairStates.normal.top.north] = [
    [fullQuads.top],
    [
        halfHeightQuad("bottom", [0.5, 0, 0.75], [1, 1, -3, -4], [0, 0.5]),
        halfHeightQuad("bottom", [0.5, 0.5, 0.25], [1, 1, a, a], [0.5, 1]),
    ],
    [
        quaterQuad("east", [1, 0.25, 0.75], [-1, -2, 1, 1], [0, 0.5, 1, 0.5, 1]),
        halfHeightQuad("east", [1, 0.75, 0.5], [1, 1, -3, -4], [0, 0.5]),
    ],
    [
        quaterQuad("west", [0, 0.25, 0.75], [-1, -2, 1, 1], [0, 0, 0.5, 0.5, 1]),
        halfHeightQuad("west", [0, 0.75, 0.5], [1, 1, -3, -4], [0, 0.5]),
    ],
    [
        halfHeightQuad("south", [0.5, 0.25, 0.5], [a, a, 1, 1], [0.5, 1]),
        halfHeightQuad("south", [0.5, 0.75, 0], [-1, -2, 1, 1], [0, 0.5]),
    ],
    [fullQuads.north],
];
StairBuilderData[StairStates.normal.top.south] = [
    [fullQuads.top],
    [
        halfHeightQuad("bottom", [0.5, 0, 0.25], [-1, -2, 1, 1], [0, 0.5]),
        halfHeightQuad("bottom", [0.5, 0.5, 0.75], [a, a, 1, 1], [0.5, 1]),
    ],
    [
        quaterQuad("east", [1, 0.25, 0.25], [-1, -2, 1, 1], [0, 0, 0.5, 0.5, 1]),
        halfHeightQuad("east", [1, 0.75, 0.5], [1, 1, -3, -4], [0, 0.5]),
    ],
    [
        quaterQuad("west", [0, 0.25, 0.25], [-1, -2, 1, 1], [0, 0.5, 1, 0.5, 1]),
        halfHeightQuad("west", [0, 0.75, 0.5], [1, 1, -3, -4], [0, 0.5]),
    ],
    [fullQuads.south],
    [
        halfHeightQuad("north", [0.5, 0.25, 0.5], [a, a, 1, 1], [0.5, 1]),
        halfHeightQuad("north", [0.5, 0.75, 1], [-1, -2, 1, 1], [0, 0.5]),
    ],
];
StairBuilderData[StairStates.normal.top.east] = [
    [fullQuads.top],
    [
        halfWidthQuad("bottom", [0.75, 0, 0.5], [1, -2, -3, 1], [0.5, 1]),
        halfWidthQuad("bottom", [0.25, 0.5, 0.5], [1, a, a, 1], [0, 0.5]),
    ],
    [fullQuads.east],
    [
        halfHeightQuad("west", [0.5, 0.25, 0.5], [a, a, 1, 1], [0.5, 1]),
        halfHeightQuad("west", [0, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
    ],
    [
        quaterQuad("south", [0.75, 0.25, 0], [-1, -2, 1, 1], [0, 0.5, 1, 0.5, 1]),
        halfHeightQuad("south", [0.5, 0.75, 0], [1, 1, -3, -4], [0, 0.5]),
    ],
    [
        quaterQuad("north", [0.75, 0.25, 1], [-1, -2, 1, 1], [0, 0, 0.5, 0.5, 1]),
        halfHeightQuad("north", [0.5, 0.75, 1], [1, 1, -3, -4], [0, 0.5]),
    ],
];
StairBuilderData[StairStates.normal.top.west] = [
    [fullQuads.top],
    [
        halfWidthQuad("bottom", [0.75, 0.5, 0.5], [a, 1, 1, a], [0.5, 1]),
        halfWidthQuad("bottom", [0.25, 0, 0.5], [-1, 1, 1, -4], [0, 0.5]),
    ],
    [
        halfHeightQuad("east", [0.5, 0.25, 0.5], [a, a, 1, 1], [0.5, 1]),
        halfHeightQuad("east", [1, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
    ],
    [fullQuads.west],
    [
        quaterQuad("south", [0.25, 0.25, 0], [-1, -2, 1, 1], [0, 0, 0.5, 0.5, 1]),
        halfHeightQuad("south", [0.5, 0.75, 0], [1, 1, -3, -4], [0, 0.5]),
    ],
    [
        quaterQuad("north", [0.25, 0.25, 1], [-1, -2, 1, 1], [0, 0.5, 1, 0.5, 1]),
        halfHeightQuad("north", [0.5, 0.75, 1], [1, 1, -3, -4], [0, 0.5]),
    ],
];
//connected states
//bottom
StairBuilderData[StairStates.connected.bottom.northEast] = [
    [
        quaterQuad("top", [0.75, 1, 0.75], [1, -2, -3, 1], [0, 0, 0.5, 0.5, 1]),
        quad("top", [0.5, 0.5, 0.5], [1, 1, a, 1]),
    ],
    [fullQuads.bottom],
    [
        quaterQuad("east", [1, 0.75, 0.75], [-1, -2, 1, 1], [0, 0.5, 1, 0, 0.5]),
        halfHeightQuad("east", [1, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("west", [0.5, 0.75, 0.75], [-1, -2, a, a], [0, 0, 0.5, 0, 0.5]),
        halfHeightQuad("west", [0, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("south", [0.75, 0.75, 0.5], [-1, -2, a, a], [0, 0.5, 1, 0, 0.5]),
        halfHeightQuad("south", [0.5, 0.25, 0], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("north", [0.75, 0.75, 1], [-1, -2, 1, 1], [0, 0, 0.5, 0, 0.5]),
        halfHeightQuad("north", [0.5, 0.25, 1], [1, 1, -3, -4], [0.5, 1]),
    ],
];
StairBuilderData[StairStates.connected.bottom.northWest] = [
    [
        quaterQuad("top", [0.25, 1, 0.75], [1, -2, -3, 1], [0, 0, 0.5, 0.5, 1]),
        quad("top", [0.5, 0.5, 0.5], [1, 1, a, 1], 1),
    ],
    [fullQuads.bottom],
    [
        quaterQuad("east", [0.5, 0.75, 0.75], [-1, -2, a, a], [0, 0.5, 1, 0, 0.5]),
        halfHeightQuad("east", [1, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("west", [0, 0.75, 0.75], [-1, -2, 1, 1], [0, 0, 0.5, 0, 0.5]),
        halfHeightQuad("west", [0, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("south", [0.25, 0.75, 0.5], [-1, -2, a, a], [0, 0, 0.5, 0, 0.5]),
        halfHeightQuad("south", [0.5, 0.25, 0], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("north", [0.25, 0.75, 1], [-1, -2, 1, 1], [0, 0.5, 1, 0, 0.5]),
        halfHeightQuad("north", [0.5, 0.25, 1], [1, 1, -3, -4], [0.5, 1]),
    ],
];
StairBuilderData[StairStates.connected.bottom.southEast] = [
    [
        quaterQuad("top", [0.75, 1, 0.25], [1, -2, -3, 1], [0, 0, 0.5, 0.5, 1]),
        quad("top", [0.5, 0.5, 0.5], [a, 1, 1, 1], 1),
    ],
    [fullQuads.bottom],
    [
        quaterQuad("east", [1, 0.75, 0.25], [-1, -2, 1, 1], [0, 0, 0.5, 0, 0.5]),
        halfHeightQuad("east", [1, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("west", [0.5, 0.75, 0.25], [-1, -2, a, a], [0, 0.5, 1, 0, 0.5]),
        halfHeightQuad("west", [0, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("south", [0.75, 0.75, 0], [-1, -2, 1, 1], [0, 0.5, 1, 0, 0.5]),
        halfHeightQuad("south", [0.5, 0.25, 0], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("north", [0.75, 0.75, 0.5], [-1, -2, a, a], [0, 0, 0.5, 0, 0.5]),
        halfHeightQuad("north", [0.5, 0.25, 1], [1, 1, -3, -4], [0.5, 1]),
    ],
];
StairBuilderData[StairStates.connected.bottom.southWest] = [
    [
        quaterQuad("top", [0.25, 1, 0.25], [1, -2, -3, 1], [0, 0, 0.5, 0.5, 1]),
        quad("top", [0.5, 0.5, 0.5], [a, 1, 1, 1]),
    ],
    [fullQuads.bottom],
    [
        quaterQuad("east", [0.5, 0.75, 0.25], [-1, -2, a, a], [0, 0, 0.5, 0, 0.5]),
        halfHeightQuad("east", [1, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("west", [0, 0.75, 0.25], [-1, -2, 1, 1], [0, 0.5, 1, 0, 0.5]),
        halfHeightQuad("west", [0, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("south", [0.25, 0.75, 0], [-1, -2, 1, 1], [0, 0, 0.5, 0, 0.5]),
        halfHeightQuad("south", [0.5, 0.25, 0], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("north", [0.25, 0.75, 0.5], [-1, -2, a, a], [0, 0.5, 1, 0, 0.5]),
        halfHeightQuad("north", [0.5, 0.25, 1], [1, 1, -3, -4], [0.5, 1]),
    ],
];
//top
StairBuilderData[StairStates.connected.top.northEast] = [
    [fullQuads.top],
    [
        quaterQuad("bottom", [0.75, 0, 0.75], [1, -2, -3, 1], [0, 0.5, 1, 0.5, 1]),
        quad("bottom", [0.5, 0.5, 0.5], [1, 1, a, 1]),
    ],
    [
        halfHeightQuad("east", [1, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("east", [1, 0.25, 0.75], [1, 1, -3, -4], [0, 0.5, 1, 0.5, 1]),
    ],
    [
        halfHeightQuad("west", [0, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("west", [0.5, 0.25, 0.75], [a, a, -3, -4], [0, 0, 0.5, 0.5, 1]),
    ],
    [
        halfHeightQuad("south", [0.5, 0.75, 0], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("south", [0.75, 0.25, 0.5], [a, a, -3, -4], [0, 0.5, 1, 0.5, 1]),
    ],
    [
        halfHeightQuad("north", [0.5, 0.75, 1], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("north", [0.75, 0.25, 1], [1, 1, -3, -4], [0, 0, 0.5, 0.5, 1]),
    ],
];
StairBuilderData[StairStates.connected.top.northWest] = [
    [fullQuads.top],
    [
        quaterQuad("bottom", [0.25, 0, 0.75], [1, -2, -3, 1], [0, 0, 0.5, 0.5, 1]),
        quad("bottom", [0.5, 0.5, 0.5], [a, 1, 1, 1], 1),
    ],
    [
        halfHeightQuad("east", [1, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("east", [0.5, 0.25, 0.75], [a, a, -3, -4], [0, 0.5, 1, 0.5, 1]),
    ],
    [
        halfHeightQuad("west", [0, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("west", [0, 0.25, 0.75], [1, 1, -3, -4], [0, 0, 0.5, 0.5, 1]),
    ],
    [
        halfHeightQuad("south", [0.5, 0.75, 0], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("south", [0.25, 0.25, 0.5], [a, a, -3, -4], [0, 0, 0.5, 0.5, 1]),
    ],
    [
        halfHeightQuad("north", [0.5, 0.75, 1], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("north", [0.25, 0.25, 1], [1, 1, -3, -4], [0, 0.5, 1, 0.5, 1]),
    ],
];
StairBuilderData[StairStates.connected.top.southEast] = [
    [fullQuads.top],
    [
        quaterQuad("bottom", [0.75, 0, 0.25], [1, -2, -3, 1], [0, 0.5, 1, 0, 0.5]),
        quad("bottom", [0.5, 0.5, 0.5], [1, 1, a, 1], 1),
    ],
    [
        halfHeightQuad("east", [1, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("east", [1, 0.25, 0.25], [1, 1, -3, -4], [0, 0, 0.5, 0.5, 1]),
    ],
    [
        halfHeightQuad("west", [0, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("west", [0.5, 0.25, 0.25], [a, a, -3, -4], [0, 0.5, 1, 0.5, 1]),
    ],
    [
        halfHeightQuad("south", [0.5, 0.75, 0], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("south", [0.75, 0.25, 0], [1, 1, -3, -4], [0, 0.5, 1, 0.5, 1]),
    ],
    [
        halfHeightQuad("north", [0.5, 0.75, 1], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("north", [0.75, 0.25, 0.5], [a, a, -3, -4], [0, 0, 0.5, 0.5, 1]),
    ],
];
StairBuilderData[StairStates.connected.top.southWest] = [
    [fullQuads.top],
    [
        quaterQuad("bottom", [0.25, 0, 0.25], [1, -2, -3, 1], [0, 0, 0.5, 0, 0.5]),
        quad("bottom", [0.5, 0.5, 0.5], [a, 1, 1, 1]),
    ],
    [
        halfHeightQuad("east", [1, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("east", [0.5, 0.25, 0.25], [a, a, -3, -4], [0, 0, 0.5, 0.5, 1]),
    ],
    [
        halfHeightQuad("west", [0, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("west", [0, 0.25, 0.25], [1, 1, -3, -4], [0, 0.5, 1, 0.5, 1]),
    ],
    [
        halfHeightQuad("south", [0.5, 0.75, 0], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("south", [0.25, 0.25, 0], [1, 1, -3, -4], [0, 0, 0.5, 0.5, 1]),
    ],
    [
        halfHeightQuad("north", [0.5, 0.75, 1], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("north", [0.25, 0.25, 0.5], [a, a, -3, -4], [0, 0.5, 1, 0.5, 1]),
    ],
];
