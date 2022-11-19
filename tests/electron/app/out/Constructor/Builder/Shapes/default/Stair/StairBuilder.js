import { Builder } from "../../../Builder.js";
import { BuildStair } from "./StairBuilderN.js";
export const stairCachedPosition = {
    x: 0,
    y: 0,
    z: 0,
};
const position = {
    x: 0,
    y: 0,
    z: 0,
};
const boxDimensions = {
    width: 0.5,
    depth: 0.5,
    height: 0.5,
};
const sd = {
    width: 0.5,
    depth: 0.5,
    height: 0.5,
};
const getAO = (aoValue, data) => {
    if (aoValue <= 0) {
        return data.aoTemplate[data.aoIndex + Math.abs(aoValue)];
    }
    return aoValue;
};
const processAO = (stairAO, data) => {
    Builder.shapeHelper.calculateAOColor(data.AOColors, [
        getAO(stairAO[0], data),
        getAO(stairAO[1], data),
        getAO(stairAO[2], data),
        getAO(stairAO[3], data),
    ], 0);
};
const getBrighttestLight = (data) => {
    let max = data.lightTemplate[data.lightIndex];
    if (max < data.lightTemplate[data.lightIndex + 1]) {
        max = data.lightTemplate[data.lightIndex + 1];
    }
    if (max < data.lightTemplate[data.lightIndex + 2]) {
        max = data.lightTemplate[data.lightIndex + 2];
    }
    if (max < data.lightTemplate[data.lightIndex + 3]) {
        max = data.lightTemplate[data.lightIndex + 3];
    }
    return max;
};
const processLight = (data) => {
    const light = getBrighttestLight(data);
    Builder.shapeHelper.calculateLightColorFromValue(data.RGBLightColors, data.sunLightColors, light);
};
const setPositon = (x, y, z) => {
    position.x = x;
    position.y = y;
    position.z = z;
};
const incrementIndexes = (data) => {
    data.uvTemplateIndex += 1;
    data.overylayUVTemplateIndex += 4;
    data.lightIndex += 4;
    data.colorIndex += 4;
    data.aoIndex += 4;
};
const addUVs = (face, data, flip, uv, uvData) => {
    Builder.uvHelper.addUVs(face, {
        uvs: data.uvs,
        uv: uv,
        width: { start: uvData.ws, end: uvData.we },
        height: { start: uvData.hs, end: uvData.he },
        flipped: flip,
        rotoate: uvData.r,
    });
    Builder.uvHelper.processOverlayUVs(data);
};
const addSide = (face, stairData, data) => {
    const uv = data.unTemplate[data.uvTemplateIndex];
    let dimensions = boxDimensions;
    let flip = false;
    if (stairData.flip && stairData.flip[1]) {
        flip = stairData.flip[1];
    }
    if (stairData.dimensions && stairData.dimensions[1]) {
        sd.width = stairData.dimensions[1][0];
        sd.depth = stairData.dimensions[1][1];
        sd.height = stairData.dimensions[1][2];
        dimensions = sd;
    }
    setPositon(stairCachedPosition.x + dimensions.width, stairCachedPosition.y + dimensions.height, stairCachedPosition.z + dimensions.depth);
    if (stairData.transform && stairData.transform[1]) {
        position.x = position.x + stairData.transform[1][0];
        position.y = position.y + stairData.transform[1][1];
        position.z = position.z + stairData.transform[1][2];
    }
    //lower
    Builder.shapeBuilder.addFace(face, position, dimensions, data, flip);
    if (stairData.uvs && stairData.uvs[1]) {
        addUVs(face, data, flip, uv, stairData.uvs[1]);
    }
    if (stairData.StairAO && stairData.StairAO[1]) {
        processAO(stairData.StairAO[1], data);
    }
    processLight(data);
    //upper
    flip = false;
    if (stairData.flip && stairData.flip[2]) {
        flip = stairData.flip[2];
    }
    if (stairData.dimensions && stairData.dimensions[2]) {
        sd.width = stairData.dimensions[2][0];
        sd.depth = stairData.dimensions[2][1];
        sd.height = stairData.dimensions[2][2];
        dimensions = sd;
    }
    setPositon(stairCachedPosition.x + dimensions.width, stairCachedPosition.y + dimensions.height, stairCachedPosition.z + dimensions.depth);
    if (stairData.transform && stairData.transform[2]) {
        position.x = position.x + stairData.transform[2][0];
        position.y = position.y + stairData.transform[2][1];
        position.z = position.z + stairData.transform[2][2];
    }
    Builder.shapeBuilder.addFace(face, position, dimensions, data, flip);
    if (stairData.uvs && stairData.uvs[2]) {
        addUVs(face, data, flip, uv, stairData.uvs[2]);
    }
    if (stairData.StairAO && stairData.StairAO[2]) {
        processAO(stairData.StairAO[2], data);
    }
    processLight(data);
    incrementIndexes(data);
};
const addNomral = (face, stairData, data) => {
    setPositon(stairCachedPosition.x + boxDimensions.width, stairCachedPosition.y + boxDimensions.height, stairCachedPosition.z + boxDimensions.depth);
    // const flip = DVEB.shapeHelper.shouldFaceFlip(data.face, face);
    const flip = false;
    Builder.shapeBuilder.addFace(face, position, boxDimensions, data, flip);
    const rotation = Builder.shapeHelper.getTextureRotation(data.face, face);
    const uv = data.unTemplate[data.uvTemplateIndex];
    Builder.uvHelper.addUVs(face, {
        uvs: data.uvs,
        uv: uv,
        width: { start: 0, end: 1 * data.LOD },
        height: { start: 0, end: 1 * data.LOD },
        flipped: flip,
        rotoate: rotation,
    });
    Builder.uvHelper.processOverlayUVs(data);
    Builder.shapeHelper.calculateLightColor(data.RGBLightColors, data.sunLightColors, data.lightTemplate, data.lightIndex);
    Builder.shapeHelper.calculateAOColor(data.AOColors, data.aoTemplate, data.aoIndex);
    Builder.shapeHelper.addFaceData(0, data.faceData);
    incrementIndexes(data);
};
const stairFunctions = {
    normal: addNomral,
    side: addSide,
    "stair-top": addSide,
    "stair-side": addSide,
};
export const buildStair = (data, stairData) => {
    BuildStair();
};
