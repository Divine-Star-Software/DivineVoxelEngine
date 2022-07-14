import { DVEB } from "../../../DivineVoxelEngineBuilder.js";
const shapeDimensions = {
    width: 0.5,
    depth: 0.5,
    height: 0.5,
};
const processDefaultFaceData = (face, data) => {
    const flip = DVEB.shapeHelper.shouldFaceFlip(data.face, face);
    DVEB.shapeBuilder.addFace(face, data.position, shapeDimensions, data, flip);
    const rotation = DVEB.shapeHelper.getTextureRotation(data.face, face);
    const uv = data.unTemplate[data.uvTemplateIndex];
    DVEB.uvHelper.addUVs(face, {
        uvs: data.uvs,
        uv: uv,
        width: { start: 0, end: 1 },
        height: { start: 0, end: 1 },
        flipped: flip,
        rotoate: rotation,
    });
    DVEB.uvHelper.processOverlayUVs(data);
    DVEB.shapeHelper.calculateLightColor(data.RGBLightColors, data.sunLightColors, data.lightTemplate, data.lightIndex);
    DVEB.shapeHelper.calculateAOColor(data.AOColors, data.aoTemplate, data.aoIndex);
    data.uvTemplateIndex += 1;
    data.overylayUVTemplateIndex += 4;
    data.lightIndex += 4;
    data.colorIndex += 4;
    data.aoIndex += 4;
};
export const BoxVoxelShape = {
    id: "Box",
    addToChunkMesh(data) {
        data.position.x += shapeDimensions.width;
        data.position.z += shapeDimensions.depth;
        data.position.y += shapeDimensions.height;
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
