const eastWestSides = {
    0: true,
    2: true,
    4: true,
    6: true,
};
const eastBoxes = {
    3: true,
    7: true,
    10: true,
    11: true,
    14: true,
    15: true,
};
const westBoxes = {
    1: true,
    5: true,
    8: true,
    9: true,
    12: true,
    13: true,
};
const northSouthSides = {
    1: true,
    3: true,
    5: true,
    7: true,
};
const northBoxes = {
    2: true,
    6: true,
    9: true,
    11: true,
    13: true,
    15: true,
};
const southBoxes = {
    0: true,
    4: true,
    8: true,
    10: true,
    12: true,
    14: true,
};
const sameCullEastWast = {
    0: true,
    2: true,
    4: true,
    6: true,
};
const sameCullNorthSouth = {
    1: true,
    4: true,
    7: true,
    5: true,
};
const halfBoxCull = (Data) => {
    return true;
};
const stairCull = (data) => {
    if (data.shapeState >= 0 && data.shapeState <= 7) {
        if (data.face == "east" || data.face == "west") {
            if (data.shapeState == data.neighborVoxelShapeState) {
                return sameCullNorthSouth[data.shapeState];
            }
            if (data.face == "east") {
                if (eastBoxes[data.shapeState] && westBoxes[data.neighborVoxelShapeState])
                    return false;
            }
            if (data.face == "west") {
                if (westBoxes[data.shapeState] && eastBoxes[data.neighborVoxelShapeState])
                    return false;
            }
        }
        if (data.face == "north" || data.face == "south") {
            if (data.shapeState == data.neighborVoxelShapeState) {
                return sameCullEastWast[data.shapeState];
            }
            if (data.face == "north") {
                if (northBoxes[data.shapeState] && southBoxes[data.neighborVoxelShapeState])
                    return false;
            }
            if (data.face == "south") {
                if (southBoxes[data.shapeState] && northBoxes[data.neighborVoxelShapeState])
                    return false;
            }
        }
    }
    return true;
};
const boxCull = (data) => {
    if (data.face == "bottom") {
        if ((data.shapeState >= 0 && data.shapeState <= 3) ||
            (data.shapeState >= 8 && data.shapeState <= 11)) {
            return false;
        }
    }
    if (data.face == "top") {
        if ((data.shapeState >= 4 && data.shapeState <= 7) ||
            (data.shapeState >= 12 && data.shapeState <= 15)) {
            return false;
        }
    }
    if (data.face == "east") {
        if (eastWestSides[data.shapeState])
            return false;
        if (eastBoxes[data.shapeState])
            return false;
    }
    if (data.face == "west") {
        if (eastWestSides[data.shapeState])
            return false;
        if (westBoxes[data.shapeState])
            return false;
    }
    if (data.face == "north") {
        if (northSouthSides[data.shapeState])
            return false;
        if (northBoxes[data.shapeState])
            return false;
    }
    if (data.face == "south") {
        if (northSouthSides[data.shapeState])
            return false;
        if (southBoxes[data.shapeState])
            return false;
    }
    return true;
};
export const StairCullFace = (data) => {
    if (data.neighborVoxelShape.id == "Box") {
        return boxCull(data);
    }
    if (data.neighborVoxelShape.id == "HalfBox") {
        return halfBoxCull(data);
    }
    if (data.neighborVoxelShape.id == "Stair") {
        return stairCull(data);
    }
    return true;
};
