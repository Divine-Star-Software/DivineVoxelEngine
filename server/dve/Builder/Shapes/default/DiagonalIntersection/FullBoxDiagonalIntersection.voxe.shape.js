import { DVEB } from "../../../DivineVoxelEngineBuilder.js";
const shapeDimensions = {
    width: 0.5,
    depth: 0.5,
    height: 0.5,
};
const processFace = (data) => {
    const uv = data.unTemplate[data.template.uvTemplateIndex];
    data.uvs.push(0, 0, uv, 1, 0, uv, 1, 1, uv, 0, 1, uv);
    DVEB.shapeHelper.calculateAOColorFromValue(data.AOColors, data.aoTemplate[data.aoIndex]);
    DVEB.shapeHelper.calculateLightColorFromValue(data.RGBLightColors, data.sunLightColors, data.lightTemplate[data.lightIndex]);
    data.indicieIndex += 4;
    data.template.uvTemplateIndex += 1;
    data.lightIndex += 1;
    data.colorIndex += 1;
    data.aoIndex += 1;
};
const faceFunctions = {
    0: (data) => {
        data.positions.push(data.position.x - shapeDimensions.width, data.position.y + shapeDimensions.height, data.position.z + -shapeDimensions.depth, data.position.x + shapeDimensions.width, data.position.y + shapeDimensions.height, data.position.z + shapeDimensions.depth, data.position.x + shapeDimensions.width, data.position.y + -shapeDimensions.height, data.position.z + shapeDimensions.depth, data.position.x - shapeDimensions.width, data.position.y + -shapeDimensions.height, data.position.z + -shapeDimensions.depth);
        data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
        processFace(data);
    },
    1: (data) => {
        data.positions.push(data.position.x + -shapeDimensions.width, data.position.y + shapeDimensions.height, data.position.z + shapeDimensions.depth, data.position.x + shapeDimensions.width, data.position.y + shapeDimensions.height, data.position.z + -shapeDimensions.depth, data.position.x + shapeDimensions.width, data.position.y + -shapeDimensions.height, data.position.z + -shapeDimensions.depth, data.position.x + -shapeDimensions.width, data.position.y + -shapeDimensions.height, data.position.z + shapeDimensions.depth);
        data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
        processFace(data);
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
