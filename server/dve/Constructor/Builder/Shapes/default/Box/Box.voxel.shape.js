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
    cullFaceFunctions: {},
    aoOverRideFunctions: {},
    registerShapeForCullFaceOverRide(shapeId, func) {
        this.cullFaceFunctions[shapeId] = func;
    },
    registerShapeAOAddOverRide(shapeId, func) {
        this.aoOverRideFunctions[shapeId] = func;
    },
    cullFace(data) {
        if (this.cullFaceFunctions[data.neighborVoxelShape.id]) {
            return this.cullFaceFunctions[data.neighborVoxelShape.id](data);
        }
        return data.substanceResult;
    },
    aoOverRide(data) {
        if (this.aoOverRideFunctions[data.neighborVoxelShape.id]) {
            return this.aoOverRideFunctions[data.neighborVoxelShape.id](data);
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
