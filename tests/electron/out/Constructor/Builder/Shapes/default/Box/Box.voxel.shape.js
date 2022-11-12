import { Builder } from "../../../Builder.js";
const shapeDimensions = {
    width: 0.5,
    depth: 0.5,
    height: 0.5,
};
const tempDimensions = {
    width: 0.5,
    depth: 0.5,
    height: 0.5,
};
const processDefaultFaceData = (face, data) => {
    const flip = Builder.shapeHelper.shouldFaceFlip(data.face, face);
    Builder.shapeBuilder.addFace(face, data.position, tempDimensions, data, flip);
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
export const BoxVoxelShape = {
    id: "Box",
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
        if (data.neighborVoxel.getVoxelShapeObj().id == "Stair") {
            return stairCull(data);
        }
        return data.default;
    },
    aoAddOverride(data) {
        if (this.aoAddOverrideFunctions[data.neighborVoxel.getVoxelShapeObj().id]) {
            return this.aoAddOverrideFunctions[data.neighborVoxel.getVoxelShapeObj().id](data);
        }
        const neighborShape = data.neighborVoxel.getVoxelShapeObj();
        if (neighborShape.id == "HalfBox") {
            if (data.neighborVoxel.getShapeState() == 0) {
                return false;
            }
        }
        if (neighborShape.id == "Box") {
            return true;
        }
        if (neighborShape.id == "Panel") {
            return false;
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
        data.position.x += shapeDimensions.width * data.LOD;
        data.position.z += shapeDimensions.depth * data.LOD;
        data.position.y += shapeDimensions.height * data.LOD;
        tempDimensions.width = shapeDimensions.width * data.LOD;
        tempDimensions.height = shapeDimensions.height * data.LOD;
        tempDimensions.depth = shapeDimensions.depth * data.LOD;
        if (Builder.shapeHelper.isFaceExposexd(data.face, "top")) {
            processDefaultFaceData("top", data);
        }
        if (Builder.shapeHelper.isFaceExposexd(data.face, "bottom")) {
            processDefaultFaceData("bottom", data);
        }
        if (Builder.shapeHelper.isFaceExposexd(data.face, "east")) {
            processDefaultFaceData("east", data);
        }
        if (Builder.shapeHelper.isFaceExposexd(data.face, "west")) {
            processDefaultFaceData("west", data);
        }
        if (Builder.shapeHelper.isFaceExposexd(data.face, "south")) {
            processDefaultFaceData("south", data);
        }
        if (Builder.shapeHelper.isFaceExposexd(data.face, "north")) {
            processDefaultFaceData("north", data);
        }
        return Builder.shapeHelper.produceShapeReturnData(data);
    },
};
const stairCullFunctions = {
    top: (data) => {
        const neighborVoxelShapeState = data.neighborVoxel.getShapeState();
        if ((neighborVoxelShapeState >= 0 && neighborVoxelShapeState <= 3) ||
            (neighborVoxelShapeState >= 8 && neighborVoxelShapeState <= 11)) {
            return false;
        }
        return true;
    },
    bottom: (data) => {
        const neighborVoxelShapeState = data.neighborVoxel.getShapeState();
        if ((neighborVoxelShapeState >= 4 && neighborVoxelShapeState <= 7) ||
            (neighborVoxelShapeState >= 12 && neighborVoxelShapeState <= 15)) {
            return false;
        }
        return true;
    },
    east: (data) => {
        const neighborVoxelShapeState = data.neighborVoxel.getShapeState();
        if (neighborVoxelShapeState == 1 || neighborVoxelShapeState == 5)
            return false;
        return true;
    },
    west: (data) => {
        const neighborVoxelShapeState = data.neighborVoxel.getShapeState();
        if (neighborVoxelShapeState == 3 || neighborVoxelShapeState == 7)
            return false;
        return true;
    },
    north: (data) => {
        const neighborVoxelShapeState = data.neighborVoxel.getShapeState();
        if (neighborVoxelShapeState == 0 || neighborVoxelShapeState == 4)
            return false;
        return true;
    },
    south: (data) => {
        const neighborVoxelShapeState = data.neighborVoxel.getShapeState();
        if (neighborVoxelShapeState == 2 || neighborVoxelShapeState == 6)
            return false;
        return true;
    },
};
const stairCull = (data) => {
    return stairCullFunctions[data.face](data);
};
