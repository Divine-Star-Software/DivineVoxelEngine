import { DVEB } from "../../../DivineVoxelEngineBuilder.js";
const shapeDimensions = {
    width: 0.5,
    depth: 0.5,
    height: 0.5,
};
const faceFunctions = {
    0: (data) => {
        data.positions.push(data.position.x - shapeDimensions.width, data.position.y + shapeDimensions.height, data.position.z + -shapeDimensions.depth, data.position.x + shapeDimensions.width, data.position.y + shapeDimensions.height, data.position.z + shapeDimensions.depth, data.position.x + shapeDimensions.width, data.position.y + -shapeDimensions.height, data.position.z + shapeDimensions.depth, data.position.x - shapeDimensions.width, data.position.y + -shapeDimensions.height, data.position.z + -shapeDimensions.depth);
        data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
        const uv = data.unTemplate[data.uvTemplateIndex];
        data.uvs.push(0, 0, uv, 1, 0, uv, 1, 1, uv, 0, 1, uv);
        DVEB.shapeHelper.calculateAOColor(data.AOColors, data.aoTemplate, data.aoIndex);
        data.indicieIndex += 4;
        data.uvTemplateIndex += 1;
        data.lightIndex += 4;
        data.colorIndex += 4;
        data.aoIndex += 4;
    },
    1: (data) => {
        data.positions.push(data.position.x + -shapeDimensions.width, data.position.y + shapeDimensions.height, data.position.z + shapeDimensions.depth, data.position.x + shapeDimensions.width, data.position.y + shapeDimensions.height, data.position.z + -shapeDimensions.depth, data.position.x + shapeDimensions.width, data.position.y + -shapeDimensions.height, data.position.z + -shapeDimensions.depth, data.position.x + -shapeDimensions.width, data.position.y + -shapeDimensions.height, data.position.z + shapeDimensions.depth);
        data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
        const uv = data.unTemplate[data.uvTemplateIndex];
        data.uvs.push(0, 0, uv, 1, 0, uv, 1, 1, uv, 0, 1, uv);
        DVEB.shapeHelper.calculateAOColor(data.AOColors, data.aoTemplate, data.aoIndex);
        data.indicieIndex += 4;
        data.uvTemplateIndex += 1;
        data.lightIndex += 4;
        data.colorIndex += 4;
        data.aoIndex += 4;
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
