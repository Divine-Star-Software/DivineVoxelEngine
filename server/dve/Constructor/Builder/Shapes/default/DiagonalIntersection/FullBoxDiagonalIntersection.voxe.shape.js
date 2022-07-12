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
    data.indicieIndex += 4;
    data.uvTemplateIndex += 1;
    data.overylayUVTemplateIndex += 4;
    data.lightIndex += 1;
    data.colorIndex += 1;
    data.aoIndex += 1;
};
const faceFunctions = {
    0: (data) => {
        data.positions.push(data.position.x - shapeDimensions.width, data.position.y + shapeDimensions.height, data.position.z + -shapeDimensions.depth, data.position.x + shapeDimensions.width, data.position.y + shapeDimensions.height, data.position.z + shapeDimensions.depth, data.position.x + shapeDimensions.width, data.position.y + -shapeDimensions.height, data.position.z + shapeDimensions.depth, data.position.x - shapeDimensions.width, data.position.y + -shapeDimensions.height, data.position.z + -shapeDimensions.depth);
        data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
        data.normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1);
        processFace("north", data);
    },
    1: (data) => {
        data.positions.push(data.position.x + -shapeDimensions.width, data.position.y + shapeDimensions.height, data.position.z + shapeDimensions.depth, data.position.x + shapeDimensions.width, data.position.y + shapeDimensions.height, data.position.z + -shapeDimensions.depth, data.position.x + shapeDimensions.width, data.position.y + -shapeDimensions.height, data.position.z + -shapeDimensions.depth, data.position.x + -shapeDimensions.width, data.position.y + -shapeDimensions.height, data.position.z + shapeDimensions.depth);
        data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
        data.normals.push(0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, 1);
        processFace("south", data);
    },
};
export const FullBoxDiagonalIntersection = {
    id: "FullBoxDiagonalIntersection",
    addToChunkMesh(data) {
        data.position.x += shapeDimensions.width;
        data.position.z += shapeDimensions.depth;
        data.position.y += shapeDimensions.height;
        faceFunctions[0](data);
        faceFunctions[1](data);
        return DVEB.shapeHelper.produceShapeReturnData(data);
    },
};
