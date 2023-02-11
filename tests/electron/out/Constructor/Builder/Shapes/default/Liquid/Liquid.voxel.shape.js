//objects
import { OverrideManager } from "../../../Rules/Overrides/OverridesManager.js";
export const LiquidVoxelShape = {
    id: "#dve_liquid",
    build(mesher) {
        const data = mesher._data;
        mesher.quad.setDimensions(1, 1);
        flowAnimationState = 0;
        let topFaceExposed = false;
        if (mesher.templateData.loadIn("top").isExposed()) {
            calculateVertexLevels(data);
            topFaceExposed = true;
            const angle = getAngle(data);
            mesher.quad
                .setTransform(1, 0, vertexLevels.v1v, 0)
                .setTransform(2, 0, vertexLevels.v2v, 0)
                .setTransform(3, 0, vertexLevels.v3v, 0)
                .setTransform(4, 0, vertexLevels.v4v, 0)
                .uvs.setRoation(angle);
            mesher.quad
                .setDirection("top")
                .updatePosition(0.5, 1, 0.5)
                .addData(4, flowAnimationState, false)
                .create()
                .clearTransform()
                .uvs.setRoation(0);
        }
        if (mesher.templateData.loadIn("bottom").isExposed()) {
            mesher.quad
                .setDirection("bottom")
                .updatePosition(0.5, 0, 0.5)
                .addData(4, flowAnimationState, false)
                .create();
        }
        flowAnimationState = 1;
        mesher.quad.uvs.setRoation(0);
        if (mesher.templateData.loadIn("east").isExposed()) {
            mesher.quad
                .setDirection("east")
                .updatePosition(1, 0.5, 0.5)
                .setTransform(1, 0, vertexLevels.v4v, 0)
                .setTransform(2, 0, vertexLevels.v3v, 0)
                .light.add()
                .oUVS.add()
                .setAnimationState(flowAnimationState)
                .create()
                .clearTransform();
            if (topFaceExposed) {
                mesher.quad.uvs.advancedUVs.hs1 = Math.abs(vertexLevels.v4v);
                mesher.quad.uvs.advancedUVs.hs2 = Math.abs(vertexLevels.v3v);
                mesher.quad.uvs.addAdvancedUVs().resetAdvancedUVs();
            }
            else {
                mesher.quad.uvs.add();
            }
        }
        if (mesher.templateData.loadIn("west").isExposed()) {
            mesher.quad
                .setDirection("west")
                .updatePosition(0, 0.5, 0.5)
                .setTransform(1, 0, vertexLevels.v2v, 0)
                .setTransform(2, 0, vertexLevels.v1v, 0)
                .light.add()
                .oUVS.add()
                .setAnimationState(flowAnimationState)
                .create()
                .clearTransform();
            if (topFaceExposed) {
                mesher.quad.uvs.advancedUVs.hs1 = Math.abs(vertexLevels.v2v);
                mesher.quad.uvs.advancedUVs.hs2 = Math.abs(vertexLevels.v1v);
                mesher.quad.uvs.addAdvancedUVs().resetAdvancedUVs();
            }
            else {
                mesher.quad.uvs.add();
            }
        }
        if (mesher.templateData.loadIn("south").isExposed()) {
            mesher.quad
                .setDirection("south")
                .updatePosition(0.5, 0.5, 0)
                .setTransform(1, 0, vertexLevels.v1v, 0)
                .setTransform(2, 0, vertexLevels.v4v, 0)
                .light.add()
                .oUVS.add()
                .setAnimationState(flowAnimationState)
                .create()
                .clearTransform();
            if (topFaceExposed) {
                mesher.quad.uvs.advancedUVs.hs1 = Math.abs(vertexLevels.v1v);
                mesher.quad.uvs.advancedUVs.hs2 = Math.abs(vertexLevels.v4v);
                mesher.quad.uvs.addAdvancedUVs().resetAdvancedUVs();
            }
            else {
                mesher.quad.uvs.add();
            }
        }
        if (mesher.templateData.loadIn("north").isExposed()) {
            mesher.quad
                .setDirection("north")
                .updatePosition(0.5, 0.5, 1)
                .setTransform(1, 0, vertexLevels.v3v, 0)
                .setTransform(2, 0, vertexLevels.v2v, 0)
                .light.add()
                .oUVS.add()
                .setAnimationState(flowAnimationState)
                .create()
                .clearTransform();
            if (topFaceExposed) {
                mesher.quad.uvs.advancedUVs.hs1 = Math.abs(vertexLevels.v3v);
                mesher.quad.uvs.advancedUVs.hs2 = Math.abs(vertexLevels.v2v);
                mesher.quad.uvs.addAdvancedUVs().resetAdvancedUVs();
            }
            else {
                mesher.quad.uvs.add();
            }
        }
        clearVertexLevels(data);
    },
};
OverrideManager.registerOverride("CullFace", "#dve_liquid", "Any", (data) => {
    if (data.face == "top" &&
        data.neighborVoxel.getSubstance() != "#dve_liquid" &&
        data.currentVoxel.getStringId() != data.neighborVoxel.getStringId()) {
        return true;
    }
    return data.default;
});
let flowAnimationState = 0;
const vertexLevels = {
    v1l: 0,
    v2l: 0,
    v3l: 0,
    v4l: 0,
    v1v: 0,
    v2v: 0,
    v3v: 0,
    v4v: 0,
};
const getAngle = (data) => {
    if (sourceBlockTest(data)) {
        flowAnimationState = 0;
        return 0;
    }
    const v1 = vertexLevels.v1l;
    const v2 = vertexLevels.v2l;
    const v3 = vertexLevels.v3l;
    const v4 = vertexLevels.v4l;
    if (v1 == v2 && v3 == v4 && v1 == v4 && v2 == v3) {
        flowAnimationState = 0;
        return 0;
    }
    if (v2 == v3 && v1 == v4 && v2 > v1) {
        //flowing south
        flowAnimationState = 1;
        return 0;
    }
    if (v2 == v3 && v1 == v4 && v2 < v1) {
        //flowing north
        flowAnimationState = 2;
        return 0;
    }
    if (v2 == v1 && v3 == v4 && v1 > v4) {
        //flowing east
        flowAnimationState = 2;
        return 90;
    }
    if (v3 == v4 && v2 == v1 && v4 > v1) {
        //flowing west
        flowAnimationState = 1;
        return 90;
    }
    if (v2 < v4) {
        //flowing north west
        flowAnimationState = 2;
        return 315;
    }
    if (v2 > v4) {
        //flowing south east
        flowAnimationState = 1;
        return 315;
    }
    if (v1 > v3) {
        //flowing north east
        flowAnimationState = 2;
        return 45;
    }
    if (v1 < v3) {
        //flowing south west
        flowAnimationState = 1;
        return 45;
    }
    return 0;
};
const sourceBlockTest = (data) => {
    if (data.flowTemplate && data.flowTemplateIndex != undefined) {
        if (data.flowTemplate[data.flowTemplateIndex] == 15 &&
            data.flowTemplate[data.flowTemplateIndex + 1] == 15 &&
            data.flowTemplate[data.flowTemplateIndex + 2] == 15 &&
            data.flowTemplate[data.flowTemplateIndex + 3] == 15) {
            return true;
        }
    }
    return false;
};
const calculateVertexLevels = (data) => {
    if (data.flowTemplate && data.flowTemplateIndex != undefined) {
        vertexLevels.v1l = data.flowTemplate[data.flowTemplateIndex];
        vertexLevels.v2l = data.flowTemplate[data.flowTemplateIndex + 1];
        vertexLevels.v3l = data.flowTemplate[data.flowTemplateIndex + 2];
        vertexLevels.v4l = data.flowTemplate[data.flowTemplateIndex + 3];
        vertexLevels.v1v = vertexLevels.v1l / 15 - 1;
        vertexLevels.v2v = vertexLevels.v2l / 15 - 1;
        vertexLevels.v3v = vertexLevels.v3l / 15 - 1;
        vertexLevels.v4v = vertexLevels.v4l / 15 - 1;
    }
};
const clearVertexLevels = (data) => {
    if (data.flowTemplate && data.flowTemplateIndex != undefined) {
        vertexLevels.v1l = 0;
        vertexLevels.v2l = 0;
        vertexLevels.v3l = 0;
        vertexLevels.v4l = 0;
        vertexLevels.v1v = 0;
        vertexLevels.v2v = 0;
        vertexLevels.v3v = 0;
        vertexLevels.v4v = 0;
    }
};
