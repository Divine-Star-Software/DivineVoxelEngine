import { DVEB } from "../../../DivineVoxelEngineBuilder.js";
const shapeDimensions = {
    width: 0.5,
    depth: 0.5,
    height: 0.5,
};
const processFace = (face, data) => {
    const uv = data.unTemplate[data.uvTemplateIndex];
    const rotation = DVEB.shapeHelper.getTextureRotation(data.face, face);
    const flip = DVEB.shapeHelper.shouldFaceFlip(data.face, face);
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
        let animData = DVEB.shapeHelper.meshFaceData.setAnimationType(1, 0);
        DVEB.shapeHelper.addFaceData(animData, data.faceData);
        DVEB.shapeHelper.addFaceData(animData, data.faceData);
    }
    else {
        DVEB.shapeHelper.addFaceData(0, data.faceData);
        DVEB.shapeHelper.addFaceData(0, data.faceData);
    }
    data.uvTemplateIndex += 1;
    data.overylayUVTemplateIndex += 4;
    data.lightIndex += 1;
    data.colorIndex += 1;
    data.aoIndex += 1;
};
const transform1 = {
    v1: { x: 0, y: 0, z: -1 },
    v2: { x: 0, y: 0, z: 0 },
    v3: { x: 0, y: 0, z: 0 },
    v4: { x: 0, y: 0, z: -1 },
};
const transform2 = {
    v1: { x: 0, y: 0, z: 1 },
    v2: { x: 0, y: 0, z: 0 },
    v3: { x: 0, y: 0, z: 0 },
    v4: { x: 0, y: 0, z: 1 },
};
const faceFunctions = {
    0: (data) => {
        DVEB.shapeBuilder.addFace("north", data.position, shapeDimensions, data, false, transform1);
        DVEB.shapeBuilder.addFace("south", data.position, shapeDimensions, data, false, transform2);
        processFace("north", data);
    },
    1: (data) => {
        data.position.z -= 1;
        DVEB.shapeBuilder.addFace("north", data.position, shapeDimensions, data, false, transform2);
        data.position.z += 2;
        DVEB.shapeBuilder.addFace("south", data.position, shapeDimensions, data, false, transform1);
        processFace("north", data);
    },
};
export const FullBoxDiagonalIntersection = {
    id: "FullBoxDiagonalIntersection",
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
        faceFunctions[0](data);
        faceFunctions[1](data);
        return DVEB.shapeHelper.produceShapeReturnData(data);
    },
};
