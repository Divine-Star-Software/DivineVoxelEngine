import { DVEB } from "../../../DivineVoxelEngineBuilder.js";
const shapeDimensions = {
    width: 0.5,
    depth: 0.5,
    height: 0.5,
};
const tempDimensions = {
    width: 0.5,
    depth: 0.5,
    height: 0.5,
};
const processDefaultFaceData = (face, data) => {
    const flip = DVEB.shapeHelper.shouldFaceFlip(data.face, face);
    DVEB.shapeBuilder.addFace(face, data.position, tempDimensions, data, flip);
    const rotation = DVEB.shapeHelper.getTextureRotation(data.face, face);
    const uv = data.unTemplate[data.uvTemplateIndex];
    DVEB.uvHelper.addUVs(face, {
        uvs: data.uvs,
        uv: uv,
        width: { start: 0, end: 1 * data.LOD },
        height: { start: 0, end: 1 * data.LOD },
        flipped: flip,
        rotoate: rotation,
    });
    DVEB.uvHelper.processOverlayUVs(data);
    DVEB.shapeHelper.calculateLightColor(data.RGBLightColors, data.sunLightColors, data.lightTemplate, data.lightIndex);
    DVEB.shapeHelper.calculateAOColor(data.AOColors, data.aoTemplate, data.aoIndex);
    if (data.substance == "flora") {
        let animData = DVEB.shapeHelper.meshFaceData.setAnimationType(3, 0);
        DVEB.shapeHelper.addFaceData(animData, data.faceData);
    }
    else {
        DVEB.shapeHelper.addFaceData(0, data.faceData);
    }
    data.uvTemplateIndex += 1;
    data.overylayUVTemplateIndex += 4;
    data.lightIndex += 4;
    data.colorIndex += 4;
    data.aoIndex += 4;
};
export const BoxVoxelShape = {
    id: "Box",
    cullFaceOverrideFunctions: {},
    aoAddOverrideFunctions: {},
    aoFlipOverrideFunctions: {},
    registerShapeForCullFaceOverride(shapeId, func) {
        this.cullFaceOverrideFunctions[shapeId] = func;
    },
    registerShapeAOAddOverride(shapeId, func) {
        this.aoAddOverrideFunctions[shapeId] = func;
    },
    cullFaceOverride(data) {
        if (this.cullFaceOverrideFunctions[data.neighborVoxelShape.id]) {
            return this.cullFaceOverrideFunctions[data.neighborVoxelShape.id](data);
        }
        if (data.neighborVoxelShape.id == "Stair") {
            return stairCull(data);
        }
        return data.substanceResult;
    },
    aoAddOverride(data) {
        if (this.aoAddOverrideFunctions[data.neighborVoxelShape.id]) {
            return this.aoAddOverrideFunctions[data.neighborVoxelShape.id](data);
        }
        if (data.neighborVoxelShape.id == "HalfBox") {
            if (data.neighborVoxelShapeState == 0) {
                return false;
            }
        }
        if (data.neighborVoxelShape.id == "Box") {
            return true;
        }
        if (data.neighborVoxelShape.id == "Panel") {
            return false;
        }
        return data.substanceResult;
    },
    registerShapeAOFlipOverride(shapeId, func) {
        this.aoAddOverrideFunctions[shapeId] = func;
    },
    aoFlipOverride(data) {
        return false;
    },
    addToChunkMesh(data) {
        data.position.x += shapeDimensions.width * data.LOD;
        data.position.z += shapeDimensions.depth * data.LOD;
        data.position.y += shapeDimensions.height * data.LOD;
        tempDimensions.width = shapeDimensions.width * data.LOD;
        tempDimensions.height = shapeDimensions.height * data.LOD;
        tempDimensions.depth = shapeDimensions.depth * data.LOD;
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "top")) {
            processDefaultFaceData("top", data);
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "bottom")) {
            processDefaultFaceData("bottom", data);
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "east")) {
            processDefaultFaceData("east", data);
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "west")) {
            processDefaultFaceData("west", data);
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "south")) {
            processDefaultFaceData("south", data);
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "north")) {
            processDefaultFaceData("north", data);
        }
        return DVEB.shapeHelper.produceShapeReturnData(data);
    },
};
const stairCullFunctions = {
    top: (data) => {
        if ((data.neighborVoxelShapeState >= 0 && data.neighborVoxelShapeState <= 3) ||
            (data.neighborVoxelShapeState >= 8 && data.neighborVoxelShapeState <= 11)) {
            return false;
        }
        return true;
    },
    bottom: (data) => {
        if ((data.neighborVoxelShapeState >= 4 && data.neighborVoxelShapeState <= 7) ||
            (data.neighborVoxelShapeState >= 12 && data.neighborVoxelShapeState <= 15)) {
            return false;
        }
        return true;
    },
    east: (data) => {
        if (data.neighborVoxelShapeState == 1 || data.neighborVoxelShapeState == 5)
            return false;
        return true;
    },
    west: (data) => {
        if (data.neighborVoxelShapeState == 3 || data.neighborVoxelShapeState == 7)
            return false;
        return true;
    },
    north: (data) => {
        if (data.neighborVoxelShapeState == 0 || data.neighborVoxelShapeState == 4)
            return false;
        return true;
    },
    south: (data) => {
        if (data.neighborVoxelShapeState == 2 || data.neighborVoxelShapeState == 6)
            return false;
        return true;
    },
};
const stairCull = (data) => {
    return stairCullFunctions[data.face](data);
};
