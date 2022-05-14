import { DVEB } from "../../../DivineVoxelEngineBuilder.js";
const shapeDimensions = {
    width: 0.5,
    depth: 0.5,
    height: 0.5,
};
const faceFunctions = {
    //add top face
    0: (data) => {
        data.positions.push(data.position.x + -shapeDimensions.width, data.position.y + shapeDimensions.height, data.position.z + -shapeDimensions.depth, data.position.x + -shapeDimensions.width, data.position.y + shapeDimensions.height, data.position.z + shapeDimensions.depth, data.position.x + shapeDimensions.width, data.position.y + shapeDimensions.height, data.position.z + shapeDimensions.depth, data.position.x + shapeDimensions.width, data.position.y + shapeDimensions.height, data.position.z + -shapeDimensions.depth);
        data.indices.push(data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex, data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex);
        const uv = data.unTemplate[data.uvTemplateIndex];
        data.uvs.push(0, 0, uv, 1, 0, uv, 1, 1, uv, 0, 1, uv);
        DVEB.shapeHelper.calculateLightColor(data.RGBLightColors, data.sunLightColors, data.lightTemplate, data.lightIndex);
        DVEB.shapeHelper.calculateAOColor(data.AOColors, data.aoTemplate, data.aoIndex);
        return {
            newIndicieIndex: data.indicieIndex + 4,
            newUVTemplateIndex: data.uvTemplateIndex + 1,
            newlightIndex: data.lightIndex + 4,
            newColorIndex: data.colorIndex + 4,
            newAOIndex: data.aoIndex + 4,
        };
    },
    //add bottom face
    1: (data) => {
        data.positions.push(data.position.x + -shapeDimensions.width, data.position.y + -shapeDimensions.height, data.position.z + -shapeDimensions.depth, data.position.x + shapeDimensions.width, data.position.y + -shapeDimensions.height, data.position.z + -shapeDimensions.depth, data.position.x + shapeDimensions.width, data.position.y + -shapeDimensions.height, data.position.z + shapeDimensions.depth, data.position.x + -shapeDimensions.width, data.position.y + -shapeDimensions.height, data.position.z + shapeDimensions.depth);
        data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
        const uv = data.unTemplate[data.uvTemplateIndex];
        data.uvs.push(0, 0, uv, 1, 0, uv, 1, 1, uv, 0, 1, uv);
        DVEB.shapeHelper.calculateLightColor(data.RGBLightColors, data.sunLightColors, data.lightTemplate, data.lightIndex);
        DVEB.shapeHelper.calculateAOColor(data.AOColors, data.aoTemplate, data.aoIndex);
        return {
            newIndicieIndex: data.indicieIndex + 4,
            newUVTemplateIndex: data.uvTemplateIndex + 1,
            newlightIndex: data.lightIndex + 4,
            newColorIndex: data.colorIndex + 4,
            newAOIndex: data.aoIndex + 4,
        };
    },
    //add west face
    2: (data) => {
        data.positions.push(data.position.x + shapeDimensions.width, data.position.y + shapeDimensions.height, data.position.z + -shapeDimensions.depth, data.position.x + shapeDimensions.width, data.position.y + shapeDimensions.height, data.position.z + shapeDimensions.depth, data.position.x + shapeDimensions.width, data.position.y + -shapeDimensions.height, data.position.z + shapeDimensions.depth, data.position.x + shapeDimensions.width, data.position.y + -shapeDimensions.height, data.position.z + -shapeDimensions.depth);
        data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
        const uv = data.unTemplate[data.uvTemplateIndex];
        data.uvs.push(0, 0, uv, 1, 0, uv, 1, 1, uv, 0, 1, uv);
        DVEB.shapeHelper.calculateLightColor(data.RGBLightColors, data.sunLightColors, data.lightTemplate, data.lightIndex);
        DVEB.shapeHelper.calculateAOColor(data.AOColors, data.aoTemplate, data.aoIndex);
        return {
            newIndicieIndex: data.indicieIndex + 4,
            newUVTemplateIndex: data.uvTemplateIndex + 1,
            newlightIndex: data.lightIndex + 4,
            newColorIndex: data.colorIndex + 4,
            newAOIndex: data.aoIndex + 4,
        };
    },
    //add east face
    3: (data) => {
        data.positions.push(data.position.x + -shapeDimensions.width, data.position.y + shapeDimensions.height, data.position.z + shapeDimensions.depth, data.position.x + -shapeDimensions.width, data.position.y + shapeDimensions.height, data.position.z + -shapeDimensions.depth, data.position.x + -shapeDimensions.width, data.position.y + -shapeDimensions.height, data.position.z + -shapeDimensions.depth, data.position.x + -shapeDimensions.width, data.position.y + -shapeDimensions.height, data.position.z + shapeDimensions.depth);
        data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
        const uv = data.unTemplate[data.uvTemplateIndex];
        data.uvs.push(0, 0, uv, 1, 0, uv, 1, 1, uv, 0, 1, uv);
        DVEB.shapeHelper.calculateLightColor(data.RGBLightColors, data.sunLightColors, data.lightTemplate, data.lightIndex);
        DVEB.shapeHelper.calculateAOColor(data.AOColors, data.aoTemplate, data.aoIndex);
        return {
            newIndicieIndex: data.indicieIndex + 4,
            newUVTemplateIndex: data.uvTemplateIndex + 1,
            newlightIndex: data.lightIndex + 4,
            newColorIndex: data.colorIndex + 4,
            newAOIndex: data.aoIndex + 4,
        };
    },
    //add north face
    4: (data) => {
        data.positions.push(data.position.x + -shapeDimensions.width, data.position.y + shapeDimensions.height, data.position.z + -shapeDimensions.depth, data.position.x + shapeDimensions.width, data.position.y + shapeDimensions.height, data.position.z + -shapeDimensions.depth, data.position.x + shapeDimensions.width, data.position.y + -shapeDimensions.height, data.position.z + -shapeDimensions.depth, data.position.x + -shapeDimensions.width, data.position.y + -shapeDimensions.height, data.position.z + -shapeDimensions.depth);
        data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
        const uv = data.unTemplate[data.uvTemplateIndex];
        data.uvs.push(0, 0, uv, 1, 0, uv, 1, 1, uv, 0, 1, uv);
        DVEB.shapeHelper.calculateLightColor(data.RGBLightColors, data.sunLightColors, data.lightTemplate, data.lightIndex);
        DVEB.shapeHelper.calculateAOColor(data.AOColors, data.aoTemplate, data.aoIndex);
        return {
            newIndicieIndex: data.indicieIndex + 4,
            newUVTemplateIndex: data.uvTemplateIndex + 1,
            newlightIndex: data.lightIndex + 4,
            newColorIndex: data.colorIndex + 4,
            newAOIndex: data.aoIndex + 4,
        };
    },
    //add south face
    5: (data) => {
        data.positions.push(data.position.x + shapeDimensions.width, data.position.y + shapeDimensions.height, data.position.z + shapeDimensions.depth, data.position.x + -shapeDimensions.width, data.position.y + shapeDimensions.height, data.position.z + shapeDimensions.depth, data.position.x + -shapeDimensions.width, data.position.y + -shapeDimensions.height, data.position.z + shapeDimensions.depth, data.position.x + shapeDimensions.width, data.position.y + -shapeDimensions.height, data.position.z + shapeDimensions.depth);
        data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
        const uv = data.unTemplate[data.uvTemplateIndex];
        data.uvs.push(0, 0, uv, 1, 0, uv, 1, 1, uv, 0, 1, uv);
        DVEB.shapeHelper.calculateLightColor(data.RGBLightColors, data.sunLightColors, data.lightTemplate, data.lightIndex);
        DVEB.shapeHelper.calculateAOColor(data.AOColors, data.aoTemplate, data.aoIndex);
        return {
            newIndicieIndex: data.indicieIndex + 4,
            newUVTemplateIndex: data.uvTemplateIndex + 1,
            newlightIndex: data.lightIndex + 4,
            newColorIndex: data.colorIndex + 4,
            newAOIndex: data.aoIndex + 4,
        };
    },
};
export const FluidSourceBlockVoxelShape = {
    id: "FluidSourceBlock",
    addToChunkMesh(data) {
        data.position.x += shapeDimensions.width;
        data.position.z += shapeDimensions.depth;
        data.position.y += shapeDimensions.height;
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "top")) {
            DVEB.shapeHelper.processReturnData(data, faceFunctions[0](data));
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "bottom")) {
            DVEB.shapeHelper.processReturnData(data, faceFunctions[1](data));
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "west")) {
            DVEB.shapeHelper.processReturnData(data, faceFunctions[2](data));
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "east")) {
            DVEB.shapeHelper.processReturnData(data, faceFunctions[3](data));
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "north")) {
            DVEB.shapeHelper.processReturnData(data, faceFunctions[4](data));
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "south")) {
            DVEB.shapeHelper.processReturnData(data, faceFunctions[5](data));
        }
        return DVEB.shapeHelper.produceShapeReturnData(data);
    },
};
