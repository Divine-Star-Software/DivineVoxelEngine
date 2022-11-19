import { OverrideManager } from "../../../Overrides/OverridesManager.js";
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
    const shapeState = data.currentVoxel.getShapeState();
    const neighborShapeState = data.neighborVoxel.getShapeState();
    if (shapeState >= 0 && shapeState <= 7) {
        if (data.face == "east" || data.face == "west") {
            if (shapeState == neighborShapeState) {
                return sameCullNorthSouth[shapeState];
            }
            if (data.face == "east") {
                if (eastBoxes[shapeState] && westBoxes[neighborShapeState])
                    return false;
            }
            if (data.face == "west") {
                if (westBoxes[shapeState] && eastBoxes[neighborShapeState])
                    return false;
            }
        }
        if (data.face == "north" || data.face == "south") {
            if (shapeState == neighborShapeState) {
                return sameCullEastWast[shapeState];
            }
            if (data.face == "north") {
                if (northBoxes[shapeState] && southBoxes[neighborShapeState])
                    return false;
            }
            if (data.face == "south") {
                if (southBoxes[shapeState] && northBoxes[neighborShapeState])
                    return false;
            }
        }
    }
    return true;
};
const boxCull = (data) => {
    const shapeState = data.currentVoxel.getShapeState();
    if (data.face == "bottom") {
        if ((shapeState >= 0 && shapeState <= 3) ||
            (shapeState >= 8 && shapeState <= 11)) {
            return false;
        }
    }
    if (data.face == "top") {
        if ((shapeState >= 4 && shapeState <= 7) ||
            (shapeState >= 12 && shapeState <= 15)) {
            return false;
        }
    }
    if (data.face == "east") {
        if (eastWestSides[shapeState])
            return false;
        if (eastBoxes[shapeState])
            return false;
    }
    if (data.face == "west") {
        if (eastWestSides[shapeState])
            return false;
        if (westBoxes[shapeState])
            return false;
    }
    if (data.face == "north") {
        if (northSouthSides[shapeState])
            return false;
        if (northBoxes[shapeState])
            return false;
    }
    if (data.face == "south") {
        if (northSouthSides[shapeState])
            return false;
        if (southBoxes[shapeState])
            return false;
    }
    return true;
};
export const StairCullFace = (data) => {
    const id = data.neighborVoxel.getVoxelShapeObj().id;
    if (id == "Box") {
        return boxCull(data);
    }
    if (id == "HalfBox") {
        return halfBoxCull(data);
    }
    if (id == "Stair") {
        return stairCull(data);
    }
    return true;
};
export function SetUpStairOverrides() {
    OverrideManager.registerOverride("CullFace", "Stair", "Any", (data) => {
        StairCullFace(data);
        return data.default;
    });
    OverrideManager.registerOverride("AOFlip", "Stair", "Any", (data) => {
        if (data.face == "top" || data.face == "bottom")
            return true;
        return false;
    });
}
