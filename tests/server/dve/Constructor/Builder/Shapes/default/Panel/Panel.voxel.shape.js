import { DVEB } from "../../../DivineVoxelEngineBuilder.js";
const shapeDimensions = {
    width: 0.5,
    depth: 0.5,
    height: 0.5,
};
const processDefaultFaceData = (face, data, flip) => {
    const uv = data.unTemplate[data.uvTemplateIndex];
    const rotation = DVEB.shapeHelper.getTextureRotation(data.face, face);
    for (let i = 0; i < 2; i++) {
        DVEB.uvHelper.addUVs(face, {
            uvs: data.uvs,
            uv: uv,
            width: { start: 0, end: 1 },
            height: { start: 0, end: 1 },
            flipped: flip,
            rotoate: rotation,
        });
        DVEB.uvHelper.processOverlayUVs(data);
        DVEB.shapeHelper.calculateAOColorFromValue(data.AOColors, data.aoTemplate[data.aoIndex]);
        DVEB.shapeHelper.calculateLightColorFromValue(data.RGBLightColors, data.sunLightColors, data.lightTemplate[data.lightIndex]);
    }
    if (data.substance == "flora") {
        let animData = DVEB.shapeHelper.meshFaceData.setAnimationType(2, 0);
        DVEB.shapeHelper.addFaceData(animData, data.faceData);
        DVEB.shapeHelper.addFaceData(animData, data.faceData);
    }
    else {
        DVEB.shapeHelper.addFaceData(0, data.faceData);
        DVEB.shapeHelper.addFaceData(0, data.faceData);
    }
    data.uvTemplateIndex += 2;
    data.overylayUVTemplateIndex += 4;
    data.lightIndex += 1;
    data.colorIndex += 1;
    data.aoIndex += 1;
};
const shapeStates = {
    0: (data) => {
        const flip = DVEB.shapeHelper.shouldFaceFlip(data.face, "north");
        data.position.z += 0.05;
        DVEB.shapeBuilder.addFace("south", data.position, shapeDimensions, data, flip);
        data.position.z -= 1;
        DVEB.shapeBuilder.addFace("north", data.position, shapeDimensions, data, flip);
        processDefaultFaceData("north", data, flip);
    },
    1: (data) => {
        const flip = DVEB.shapeHelper.shouldFaceFlip(data.face, "north");
        data.position.z -= 0.05;
        DVEB.shapeBuilder.addFace("north", data.position, shapeDimensions, data, flip);
        data.position.z += 1;
        DVEB.shapeBuilder.addFace("south", data.position, shapeDimensions, data, flip);
        processDefaultFaceData("north", data, flip);
    },
    2: (data) => {
        const flip = DVEB.shapeHelper.shouldFaceFlip(data.face, "west");
        data.position.x -= 0.05;
        DVEB.shapeBuilder.addFace("east", data.position, shapeDimensions, data, flip);
        data.position.x += 1;
        DVEB.shapeBuilder.addFace("west", data.position, shapeDimensions, data, flip);
        processDefaultFaceData("west", data, flip);
    },
    3: (data) => {
        const flip = DVEB.shapeHelper.shouldFaceFlip(data.face, "west");
        data.position.x += 0.05;
        DVEB.shapeBuilder.addFace("west", data.position, shapeDimensions, data, flip);
        data.position.x -= 1;
        DVEB.shapeBuilder.addFace("east", data.position, shapeDimensions, data, flip);
        processDefaultFaceData("west", data, flip);
    },
    4: (data) => {
        const flip = DVEB.shapeHelper.shouldFaceFlip(data.face, "top");
        data.position.y -= 0.05;
        DVEB.shapeBuilder.addFace("top", data.position, shapeDimensions, data, flip);
        data.position.y += 1;
        DVEB.shapeBuilder.addFace("bottom", data.position, shapeDimensions, data, flip);
        processDefaultFaceData("bottom", data, flip);
    },
    5: (data) => {
        const flip = DVEB.shapeHelper.shouldFaceFlip(data.face, "bottom");
        data.position.y += 0.05;
        DVEB.shapeBuilder.addFace("bottom", data.position, shapeDimensions, data, flip);
        data.position.y -= 1;
        DVEB.shapeBuilder.addFace("top", data.position, shapeDimensions, data, flip);
        processDefaultFaceData("bottom", data, flip);
    },
};
export const PanelVoxelShape = {
    id: "Panel",
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
        if (data.voxelSubstance == "flora") {
            return false;
        }
        return data.substanceResult;
    },
    aoAddOverride(data) {
        if (this.aoAddOverrideFunctions[data.neighborVoxelShape.id]) {
            return this.aoAddOverrideFunctions[data.neighborVoxelShape.id](data);
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
        data.position.x += shapeDimensions.width;
        data.position.z += shapeDimensions.depth;
        data.position.y += shapeDimensions.height;
        const shapeState = data.shapeState;
        shapeStates[shapeState](data);
        return DVEB.shapeHelper.produceShapeReturnData(data);
    },
};
