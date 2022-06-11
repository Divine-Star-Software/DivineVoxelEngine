import { DVEB } from "../../../DivineVoxelEngineBuilder.js";
const shapeDimensions = {
    width: 0.5,
    depth: 0.5,
    height: 0.5,
};
const processDefaultFaceData = (data, flip) => {
    const uv = data.unTemplate[data.template.uvTemplateIndex];
    if (!flip) {
        data.uvs.push(0, 0, uv, 1, 0, uv, 1, 1, uv, 0, 1, uv);
    }
    else {
        data.uvs.push(1, 0, uv, 1, 1, uv, 0, 1, uv, 0, 0, uv);
    }
    DVEB.shapeHelper.calculateLightColor(data.RGBLightColors, data.sunLightColors, data.lightTemplate, data.lightIndex);
    data.template.uvTemplateIndex += 1;
    data.lightIndex += 4;
    data.colorIndex += 4;
    data.aoIndex += 4;
};
const faceFunctions = {
    //add top face
    0: (data) => {
        const flip = DVEB.shapeHelper.shouldFaceFlip(data.face, "top");
        DVEB.shapeBuilder.addFace("top", data.position, shapeDimensions, data, flip);
        processDefaultFaceData(data, flip);
    },
    //add bottom face
    1: (data) => {
        const flip = DVEB.shapeHelper.shouldFaceFlip(data.face, "bottom");
        DVEB.shapeBuilder.addFace("bottom", data.position, shapeDimensions, data, flip);
        processDefaultFaceData(data, flip);
    },
    //add west face
    2: (data) => {
        const flip = DVEB.shapeHelper.shouldFaceFlip(data.face, "east");
        DVEB.shapeBuilder.addFace("east", data.position, shapeDimensions, data, flip);
        processDefaultFaceData(data, flip);
    },
    //add east face
    3: (data) => {
        const flip = DVEB.shapeHelper.shouldFaceFlip(data.face, "west");
        DVEB.shapeBuilder.addFace("west", data.position, shapeDimensions, data, flip);
        processDefaultFaceData(data, flip);
    },
    //add north
    4: (data) => {
        const flip = DVEB.shapeHelper.shouldFaceFlip(data.face, "south");
        DVEB.shapeBuilder.addFace("south", data.position, shapeDimensions, data, flip);
        processDefaultFaceData(data, flip);
    },
    //add south face
    5: (data) => {
        const flip = DVEB.shapeHelper.shouldFaceFlip(data.face, "north");
        DVEB.shapeBuilder.addFace("north", data.position, shapeDimensions, data, flip);
        processDefaultFaceData(data, flip);
    },
};
export const FluidSourceBlockVoxelShape = {
    id: "FluidSourceBlock",
    addToChunkMesh(data) {
        data.position.x += shapeDimensions.width;
        data.position.z += shapeDimensions.depth;
        data.position.y += shapeDimensions.height;
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "top")) {
            faceFunctions[0](data);
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "bottom")) {
            faceFunctions[1](data);
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "east")) {
            faceFunctions[2](data);
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "west")) {
            faceFunctions[3](data);
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "south")) {
            faceFunctions[4](data);
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "north")) {
            faceFunctions[5](data);
        }
        return DVEB.shapeHelper.produceShapeReturnData(data);
    },
};
