import { DVEB } from "../../../DivineVoxelEngineBuilder.js";
const shapeDimensions = {
    width: 0.5,
    depth: 0.5,
    height: 0.25,
};
const processDefaultFaceData = (face, data, halfUV = false) => {
    const flip = DVEB.shapeHelper.shouldFaceFlip(data.face, face);
    DVEB.shapeBuilder.addFace(face, data.position, shapeDimensions, data, flip);
    const uv = data.unTemplate[data.uvTemplateIndex];
    const rotation = DVEB.shapeHelper.getTextureRotation(data.face, face);
    if (!halfUV) {
        DVEB.uvHelper.addUVs(face, {
            uvs: data.uvs,
            uv: uv,
            width: { start: 0, end: 1 },
            height: { start: 0, end: 1 },
            flipped: flip,
            rotoate: rotation,
        });
    }
    else {
        DVEB.uvHelper.addUVs(face, {
            uvs: data.uvs,
            uv: uv,
            width: { start: 0, end: 1 },
            height: { start: 0, end: 0.5 },
            flipped: flip,
            rotoate: 0,
        });
    }
    DVEB.uvHelper.processOverlayUVs(data);
    DVEB.shapeHelper.calculateLightColor(data.RGBLightColors, data.sunLightColors, data.lightTemplate, data.lightIndex);
    DVEB.shapeHelper.calculateAOColor(data.AOColors, data.aoTemplate, data.aoIndex);
    data.uvTemplateIndex += 1;
    data.overylayUVTemplateIndex += 4;
    data.lightIndex += 4;
    data.colorIndex += 4;
    data.aoIndex += 4;
};
export const HalfBoxVoxelShape = {
    id: "HalfBox",
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
            processDefaultFaceData("east", data, true);
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "west")) {
            processDefaultFaceData("west", data, true);
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "south")) {
            processDefaultFaceData("south", data, true);
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "north")) {
            processDefaultFaceData("north", data, true);
        }
        return DVEB.shapeHelper.produceShapeReturnData(data);
    },
};
