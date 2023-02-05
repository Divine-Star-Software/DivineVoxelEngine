import { StairStates } from "../../../../../Data/Shapes/StairStates.js";
const getHalfHeight = (direction, position, AO, uvs) => {
    const quad = getQuad(direction, position);
    quad[1][1] = 0.5;
    quad[3] = AO;
    quad[4] = [-5, -5, -5, -5];
    quad[5] = [0, 0, 1, uvs[0], uvs[1]];
    return quad;
};
const getHalfWidth = (direction, position, AO, uvs) => {
    const quad = getHalfHeight(direction, position, AO, uvs);
    quad[1][0] = 0.5;
    quad[1][1] = 1;
    quad[4] = [-5, -5, -5, -5];
    quad[5] = [0, uvs[0], uvs[1], 0, 1];
    return quad;
};
const getQuater = (direction, position, AO, uvs) => {
    const quad = getQuad(direction, position);
    quad[1][0] = 0.5;
    quad[1][1] = 0.5;
    quad[3] = AO;
    quad[4] = [-5, -5, -5, -5];
    quad[5] = uvs;
    return quad;
};
const getQuad = (direction, position, AO = [-1, -2, -3, -4], flip = -1 | 0 | 1) => {
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
    top: getQuad("top", [0.5, 1, 0.5]),
    bottom: getQuad("bottom", [0.5, 0, 0.5]),
    east: getQuad("east", [1, 0.5, 0.5]),
    west: getQuad("west", [0, 0.5, 0.5]),
    south: getQuad("south", [0.5, 0.5, 0]),
    north: getQuad("north", [0.5, 0.5, 1]),
};
const a = 0.65;
export const StairBuilderData = {};
//bottom
StairBuilderData[StairStates.normal.bottom.north] = [
    [
        getHalfHeight("top", [0.5, 1, 0.75], [1, -2, -3, 1], [0, 0.5]),
        getHalfHeight("top", [0.5, 0.5, 0.25], [1, a, a, 1], [0.5, 1]),
    ],
    [fullQuads.bottom],
    [
        getQuater("east", [1, 0.75, 0.75], [-1, -2, 1, 1], [0, 0.5, 1, 0, 0.5]),
        getHalfHeight("east", [1, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        getQuater("west", [0, 0.75, 0.75], [-1, -2, 1, 1], [0, 0, 0.5, 0, 0.5]),
        getHalfHeight("west", [0, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        getHalfHeight("south", [0.5, 0.25, 0], [1, 1, -3, -4], [0.5, 1]),
        getHalfHeight("south", [0.5, 0.75, 0.5], [-1, -2, a, a], [0, 0.5]),
    ],
    [fullQuads.north],
];
StairBuilderData[StairStates.normal.bottom.south] = [
    [
        getHalfHeight("top", [0.5, 0.5, 0.75], [a, 1, 1, a], [0, 0.5]),
        getHalfHeight("top", [0.5, 1, 0.25], [-1, 1, 1, -4], [0.5, 1]),
    ],
    [fullQuads.bottom],
    [
        getQuater("east", [1, 0.75, 0.25], [-1, -2, 1, 1], [0, 0, 0.5, 0, 0.5]),
        getHalfHeight("east", [1, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        getQuater("west", [0, 0.75, 0.25], [-1, -2, 1, 1], [0, 0.5, 1, 0, 0.5]),
        getHalfHeight("west", [0, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [fullQuads.south],
    [
        getHalfHeight("north", [0.5, 0.25, 1], [1, 1, -3, -4], [0.5, 1]),
        getHalfHeight("north", [0.5, 0.75, 0.5], [-1, -2, a, a], [0, 0.5]),
    ],
];
StairBuilderData[StairStates.normal.bottom.east] = [
    [
        getHalfWidth("top", [0.75, 1, 0.5], [1, 1, -3, -5], [0.5, 1]),
        getHalfWidth("top", [0.25, 0.5, 0.5], [1, 1, a, a], [0, 0.5]),
    ],
    [fullQuads.bottom],
    [fullQuads.east],
    [
        getHalfHeight("west", [0, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
        getHalfHeight("west", [0.5, 0.75, 0.5], [-1, -2, a, a], [0, 0.5]),
    ],
    [
        getQuater("south", [0.75, 0.75, 0], [-1, -2, 1, 1], [0, 0.5, 1, 0, 0.5]),
        getHalfHeight("south", [0.5, 0.25, 0], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        getQuater("north", [0.75, 0.75, 1], [-1, -2, 1, 1], [0, 0, 0.5, 0, 0.5]),
        getHalfHeight("north", [0.5, 0.25, 1], [1, 1, -3, -4], [0.5, 1]),
    ],
];
StairBuilderData[StairStates.normal.bottom.west] = [
    [
        getHalfWidth("top", [0.75, 0.5, 0.5], [a, a, 1, 1], [0.5, 1]),
        getHalfWidth("top", [0.25, 1, 0.5], [-1, -2, 1, 1], [0, 0.5]),
    ],
    [fullQuads.bottom],
    [
        getHalfHeight("east", [1, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
        getHalfHeight("east", [0.5, 0.75, 0.5], [-1, -2, a, a], [0, 0.5]),
    ],
    [fullQuads.west],
    [
        getQuater("south", [0.25, 0.75, 0], [-1, -2, 1, 1], [0, 0, 0.5, 0, 0.5]),
        getHalfHeight("south", [0.5, 0.25, 0], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        getQuater("north", [0.25, 0.75, 1], [-1, -2, 1, 1], [0, 0.5, 1, 0, 0.5]),
        getHalfHeight("north", [0.5, 0.25, 1], [1, 1, -3, -4], [0.5, 1]),
    ],
];
//top
StairBuilderData[StairStates.normal.top.north] = [
    [fullQuads.top],
    [
        getHalfHeight("bottom", [0.5, 0, 0.75], [1, 1, -3, -4], [0, 0.5]),
        getHalfHeight("bottom", [0.5, 0.5, 0.25], [1, 1, a, a], [0.5, 1]),
    ],
    [
        getQuater("east", [1, 0.25, 0.75], [-1, -2, 1, 1], [0, 0.5, 1, 0.5, 1]),
        getHalfHeight("east", [1, 0.75, 0.5], [1, 1, -3, -4], [0, 0.5]),
    ],
    [
        getQuater("west", [0, 0.25, 0.75], [-1, -2, 1, 1], [0, 0, 0.5, 0.5, 1]),
        getHalfHeight("west", [0, 0.75, 0.5], [1, 1, -3, -4], [0, 0.5]),
    ],
    [
        getHalfHeight("south", [0.5, 0.25, 0.5], [a, a, 1, 1], [0.5, 1]),
        getHalfHeight("south", [0.5, 0.75, 0], [-1, -2, 1, 1], [0, 0.5]),
    ],
    [fullQuads.north],
];
StairBuilderData[StairStates.normal.top.south] = [
    [fullQuads.top],
    [
        getHalfHeight("bottom", [0.5, 0, 0.25], [-1, -2, 1, 1], [0, 0.5]),
        getHalfHeight("bottom", [0.5, 0.5, 0.75], [a, a, 1, 1], [0.5, 1]),
    ],
    [
        getQuater("east", [1, 0.25, 0.25], [-1, -2, 1, 1], [0, 0, 0.5, 0.5, 1]),
        getHalfHeight("east", [1, 0.75, 0.5], [1, 1, -3, -4], [0, 0.5]),
    ],
    [
        getQuater("west", [0, 0.25, 0.25], [-1, -2, 1, 1], [0, 0.5, 1, 0.5, 1]),
        getHalfHeight("west", [0, 0.75, 0.5], [1, 1, -3, -4], [0, 0.5]),
    ],
    [fullQuads.south],
    [
        getHalfHeight("north", [0.5, 0.25, 0.5], [a, a, 1, 1], [0.5, 1]),
        getHalfHeight("north", [0.5, 0.75, 1], [-1, -2, 1, 1], [0, 0.5]),
    ],
];
StairBuilderData[StairStates.normal.top.east] = [
    [fullQuads.top],
    [
        getHalfWidth("bottom", [0.75, 0, 0.5], [1, -2, -3, 1], [0.5, 1]),
        getHalfWidth("bottom", [0.25, 0.5, 0.5], [1, a, a, 1], [0, 0.5]),
    ],
    [fullQuads.east],
    [
        getHalfHeight("west", [0.5, 0.25, 0.5], [a, a, 1, 1], [0.5, 1]),
        getHalfHeight("west", [0, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
    ],
    [
        getQuater("south", [0.75, 0.25, 0], [-1, -2, 1, 1], [0, 0.5, 1, 0.5, 1]),
        getHalfHeight("south", [0.5, 0.75, 0], [1, 1, -3, -4], [0, 0.5]),
    ],
    [
        getQuater("north", [0.75, 0.25, 1], [-1, -2, 1, 1], [0, 0, 0.5, 0.5, 1]),
        getHalfHeight("north", [0.5, 0.75, 1], [1, 1, -3, -4], [0, 0.5]),
    ],
];
StairBuilderData[StairStates.normal.top.west] = [
    [fullQuads.top],
    [
        getHalfWidth("bottom", [0.75, 0.5, 0.5], [a, 1, 1, a], [0.5, 1]),
        getHalfWidth("bottom", [0.25, 0, 0.5], [-1, 1, 1, -4], [0, 0.5]),
    ],
    [
        getHalfHeight("east", [0.5, 0.25, 0.5], [a, a, 1, 1], [0.5, 1]),
        getHalfHeight("east", [1, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
    ],
    [fullQuads.west],
    [
        getQuater("south", [0.25, 0.25, 0], [-1, -2, 1, 1], [0, 0, 0.5, 0.5, 1]),
        getHalfHeight("south", [0.5, 0.75, 0], [1, 1, -3, -4], [0, 0.5]),
    ],
    [
        getQuater("north", [0.25, 0.25, 1], [-1, -2, 1, 1], [0, 0.5, 1, 0.5, 1]),
        getHalfHeight("north", [0.5, 0.75, 1], [1, 1, -3, -4], [0, 0.5]),
    ],
];
//connected states
//bottom
StairBuilderData[StairStates.connected.bottom.northEast] = [
    [
        getQuater("top", [0.75, 1, 0.75], [1, -2, -3, 1], [0, 0, 0.5, 0.5, 1]),
        getQuad("top", [0.5, 0.5, 0.5], [1, 1, a, 1]),
    ],
    [fullQuads.bottom],
    [
        getQuater("east", [1, 0.75, 0.75], [-1, -2, 1, 1], [0, 0.5, 1, 0, 0.5]),
        getHalfHeight("east", [1, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        getQuater("west", [0.5, 0.75, 0.75], [-1, -2, a, a], [0, 0, 0.5, 0, 0.5]),
        getHalfHeight("west", [0, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        getQuater("south", [0.75, 0.75, 0.5], [-1, -2, a, a], [0, 0.5, 1, 0, 0.5]),
        getHalfHeight("south", [0.5, 0.25, 0], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        getQuater("north", [0.75, 0.75, 1], [-1, -2, 1, 1], [0, 0, 0.5, 0, 0.5]),
        getHalfHeight("north", [0.5, 0.25, 1], [1, 1, -3, -4], [0.5, 1]),
    ],
];
StairBuilderData[StairStates.connected.bottom.northWest] = [
    [
        getQuater("top", [0.25, 1, 0.75], [1, -2, -3, 1], [0, 0, 0.5, 0.5, 1]),
        getQuad("top", [0.5, 0.5, 0.5], [1, 1, a, 1], 1),
    ],
    [fullQuads.bottom],
    [
        getQuater("east", [0.5, 0.75, 0.75], [-1, -2, a, a], [0, 0.5, 1, 0, 0.5]),
        getHalfHeight("east", [1, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        getQuater("west", [0, 0.75, 0.75], [-1, -2, 1, 1], [0, 0, 0.5, 0, 0.5]),
        getHalfHeight("west", [0, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        getQuater("south", [0.25, 0.75, 0.5], [-1, -2, a, a], [0, 0, 0.5, 0, 0.5]),
        getHalfHeight("south", [0.5, 0.25, 0], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        getQuater("north", [0.25, 0.75, 1], [-1, -2, 1, 1], [0, 0.5, 1, 0, 0.5]),
        getHalfHeight("north", [0.5, 0.25, 1], [1, 1, -3, -4], [0.5, 1]),
    ],
];
StairBuilderData[StairStates.connected.bottom.southEast] = [
    [
        getQuater("top", [0.75, 1, 0.25], [1, -2, -3, 1], [0, 0, 0.5, 0.5, 1]),
        getQuad("top", [0.5, 0.5, 0.5], [a, 1, 1, 1], 1),
    ],
    [fullQuads.bottom],
    [
        getQuater("east", [1, 0.75, 0.25], [-1, -2, 1, 1], [0, 0, 0.5, 0, 0.5]),
        getHalfHeight("east", [1, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        getQuater("west", [0.5, 0.75, 0.25], [-1, -2, a, a], [0, 0.5, 1, 0, 0.5]),
        getHalfHeight("west", [0, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        getQuater("south", [0.75, 0.75, 0], [-1, -2, 1, 1], [0, 0.5, 1, 0, 0.5]),
        getHalfHeight("south", [0.5, 0.25, 0], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        getQuater("north", [0.75, 0.75, 0.5], [-1, -2, a, a], [0, 0, 0.5, 0, 0.5]),
        getHalfHeight("north", [0.5, 0.25, 1], [1, 1, -3, -4], [0.5, 1]),
    ],
];
StairBuilderData[StairStates.connected.bottom.southWest] = [
    [
        getQuater("top", [0.25, 1, 0.25], [1, -2, -3, 1], [0, 0, 0.5, 0.5, 1]),
        getQuad("top", [0.5, 0.5, 0.5], [a, 1, 1, 1]),
    ],
    [fullQuads.bottom],
    [
        getQuater("east", [0.5, 0.75, 0.25], [-1, -2, a, a], [0, 0, 0.5, 0, 0.5]),
        getHalfHeight("east", [1, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        getQuater("west", [0, 0.75, 0.25], [-1, -2, 1, 1], [0, 0.5, 1, 0, 0.5]),
        getHalfHeight("west", [0, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        getQuater("south", [0.25, 0.75, 0], [-1, -2, 1, 1], [0, 0, 0.5, 0, 0.5]),
        getHalfHeight("south", [0.5, 0.25, 0], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        getQuater("north", [0.25, 0.75, 0.5], [-1, -2, a, a], [0, 0.5, 1, 0, 0.5]),
        getHalfHeight("north", [0.5, 0.25, 1], [1, 1, -3, -4], [0.5, 1]),
    ],
];
//top
StairBuilderData[StairStates.connected.top.northEast] = [
    [fullQuads.top],
    [
        getQuater("bottom", [0.75, 0, 0.75], [1, -2, -3, 1], [0, 0.5, 1, 0.5, 1]),
        getQuad("bottom", [0.5, 0.5, 0.5], [1, 1, a, 1]),
    ],
    [
        getHalfHeight("east", [1, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
        getQuater("east", [1, 0.25, 0.75], [1, 1, -3, -4], [0, 0.5, 1, 0.5, 1]),
    ],
    [
        getHalfHeight("west", [0, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
        getQuater("west", [0.5, 0.25, 0.75], [a, a, -3, -4], [0, 0, 0.5, 0.5, 1]),
    ],
    [
        getHalfHeight("south", [0.5, 0.75, 0], [-1, -2, 1, 1], [0, 0.5]),
        getQuater("south", [0.75, 0.25, 0.5], [a, a, -3, -4], [0, 0.5, 1, 0.5, 1]),
    ],
    [
        getHalfHeight("north", [0.5, 0.75, 1], [-1, -2, 1, 1], [0, 0.5]),
        getQuater("north", [0.75, 0.25, 1], [1, 1, -3, -4], [0, 0, 0.5, 0.5, 1]),
    ],
];
StairBuilderData[StairStates.connected.top.northWest] = [
    [fullQuads.top],
    [
        getQuater("bottom", [0.25, 0, 0.75], [1, -2, -3, 1], [0, 0, 0.5, 0.5, 1]),
        getQuad("bottom", [0.5, 0.5, 0.5], [a, 1, 1, 1], 1),
    ],
    [
        getHalfHeight("east", [1, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
        getQuater("east", [0.5, 0.25, 0.75], [a, a, -3, -4], [0, 0.5, 1, 0.5, 1]),
    ],
    [
        getHalfHeight("west", [0, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
        getQuater("west", [0, 0.25, 0.75], [1, 1, -3, -4], [0, 0, 0.5, 0.5, 1]),
    ],
    [
        getHalfHeight("south", [0.5, 0.75, 0], [-1, -2, 1, 1], [0, 0.5]),
        getQuater("south", [0.25, 0.25, 0.5], [a, a, -3, -4], [0, 0, 0.5, 0.5, 1]),
    ],
    [
        getHalfHeight("north", [0.5, 0.75, 1], [-1, -2, 1, 1], [0, 0.5]),
        getQuater("north", [0.25, 0.25, 1], [1, 1, -3, -4], [0, 0.5, 1, 0.5, 1]),
    ],
];
StairBuilderData[StairStates.connected.top.southEast] = [
    [fullQuads.top],
    [
        getQuater("bottom", [0.75, 0, 0.25], [1, -2, -3, 1], [0, 0.5, 1, 0, 0.5]),
        getQuad("bottom", [0.5, 0.5, 0.5], [1, 1, a, 1], 1),
    ],
    [
        getHalfHeight("east", [1, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
        getQuater("east", [1, 0.25, 0.25], [1, 1, -3, -4], [0, 0, 0.5, 0.5, 1]),
    ],
    [
        getHalfHeight("west", [0, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
        getQuater("west", [0.5, 0.25, 0.25], [a, a, -3, -4], [0, 0.5, 1, 0.5, 1]),
    ],
    [
        getHalfHeight("south", [0.5, 0.75, 0], [-1, -2, 1, 1], [0, 0.5]),
        getQuater("south", [0.75, 0.25, 0], [1, 1, -3, -4], [0, 0.5, 1, 0.5, 1]),
    ],
    [
        getHalfHeight("north", [0.5, 0.75, 1], [-1, -2, 1, 1], [0, 0.5]),
        getQuater("north", [0.75, 0.25, 0.5], [a, a, -3, -4], [0, 0, 0.5, 0.5, 1]),
    ],
];
StairBuilderData[StairStates.connected.top.southWest] = [
    [fullQuads.top],
    [
        getQuater("bottom", [0.25, 0, 0.25], [1, -2, -3, 1], [0, 0, 0.5, 0, 0.5]),
        getQuad("bottom", [0.5, 0.5, 0.5], [a, 1, 1, 1]),
    ],
    [
        getHalfHeight("east", [1, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
        getQuater("east", [0.5, 0.25, 0.25], [a, a, -3, -4], [0, 0, 0.5, 0.5, 1]),
    ],
    [
        getHalfHeight("west", [0, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
        getQuater("west", [0, 0.25, 0.25], [1, 1, -3, -4], [0, 0.5, 1, 0.5, 1]),
    ],
    [
        getHalfHeight("south", [0.5, 0.75, 0], [-1, -2, 1, 1], [0, 0.5]),
        getQuater("south", [0.25, 0.25, 0], [1, 1, -3, -4], [0, 0, 0.5, 0.5, 1]),
    ],
    [
        getHalfHeight("north", [0.5, 0.75, 1], [-1, -2, 1, 1], [0, 0.5]),
        getQuater("north", [0.25, 0.25, 0.5], [a, a, -3, -4], [0, 0.5, 1, 0.5, 1]),
    ],
];
