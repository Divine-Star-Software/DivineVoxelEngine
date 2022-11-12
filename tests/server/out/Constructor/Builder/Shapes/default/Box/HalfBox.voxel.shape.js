import { Builder } from "../../../Builder.js";
const shapeDimensions = {
    width: 0.5,
    depth: 0.5,
    height: 0.25,
};
const processDefaultFaceData = (face, data, halfUV = false) => {
    const flip = Builder.shapeHelper.shouldFaceFlip(data.face, face);
    Builder.shapeBuilder.addFace(face, data.position, shapeDimensions, data, flip);
    const uv = data.unTemplate[data.uvTemplateIndex];
    const rotation = Builder.shapeHelper.getTextureRotation(data.face, face);
    if (!halfUV) {
        Builder.uvHelper.addUVs(face, {
            uvs: data.uvs,
            uv: uv,
            width: { start: 0, end: 1 },
            height: { start: 0, end: 1 },
            flipped: flip,
            rotoate: rotation,
        });
    }
    else {
        Builder.uvHelper.addUVs(face, {
            uvs: data.uvs,
            uv: uv,
            width: { start: 0, end: 1 },
            height: { start: 0, end: 0.5 },
            flipped: flip,
            rotoate: 0,
        });
    }
    Builder.uvHelper.processOverlayUVs(data);
    Builder.shapeHelper.calculateLightColor(data.RGBLightColors, data.sunLightColors, data.lightTemplate, data.lightIndex);
    Builder.shapeHelper.calculateAOColor(data.AOColors, data.aoTemplate, data.aoIndex);
    if (data.substance == "flora") {
        let animData = Builder.shapeHelper.meshFaceData.setAnimationType(3, 0);
        Builder.shapeHelper.addFaceData(animData, data.faceData);
    }
    else {
        Builder.shapeHelper.addFaceData(0, data.faceData);
    }
    data.uvTemplateIndex += 1;
    data.overylayUVTemplateIndex += 4;
    data.lightIndex += 4;
    data.colorIndex += 4;
    data.aoIndex += 4;
};
export const HalfBoxVoxelShape = {
    id: "HalfBox",
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
        if (this.cullFaceOverrideFunctions[data.neighborVoxel.getVoxelShapeObj().id]) {
            return this.cullFaceOverrideFunctions[data.neighborVoxel.getVoxelShapeObj().id](data);
        }
        if (data.neighborVoxel.getVoxelShapeObj().id == "Box") {
            if (data.face == "bottom") {
                if (data.currentVoxel.getShapeState() == 0) {
                    return false;
                }
            }
            if (data.face == "east" ||
                data.face == "west" ||
                data.face == "north" ||
                data.face == "south") {
                return false;
            }
        }
        return data.default;
    },
    aoAddOverride(data) {
        if (this.aoAddOverrideFunctions[data.neighborVoxel.getVoxelShapeObj().id]) {
            return this.aoAddOverrideFunctions[data.neighborVoxel.getVoxelShapeObj().id](data);
        }
        return data.default;
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
        if (Builder.shapeHelper.isFaceExposexd(data.face, "top")) {
            processDefaultFaceData("top", data);
        }
        if (Builder.shapeHelper.isFaceExposexd(data.face, "bottom")) {
            processDefaultFaceData("bottom", data);
        }
        if (Builder.shapeHelper.isFaceExposexd(data.face, "east")) {
            processDefaultFaceData("east", data, true);
        }
        if (Builder.shapeHelper.isFaceExposexd(data.face, "west")) {
            processDefaultFaceData("west", data, true);
        }
        if (Builder.shapeHelper.isFaceExposexd(data.face, "south")) {
            processDefaultFaceData("south", data, true);
        }
        if (Builder.shapeHelper.isFaceExposexd(data.face, "north")) {
            processDefaultFaceData("north", data, true);
        }
        return Builder.shapeHelper.produceShapeReturnData(data);
    },
};
