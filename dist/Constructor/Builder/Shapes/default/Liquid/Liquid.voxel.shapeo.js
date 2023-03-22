import { OverrideManager } from "../../../Rules/Overrides/OverridesManager.js";
import { ShapeTool } from "../../ShapeTool.js";
//objects
const addData = () => {
    return ShapeTool.builder.quad
        .setFlipped(ShapeTool.data.isFaceFlipped())
        .light.add(ShapeTool.data.getLight())
        .uvs.add(ShapeTool.data.getUV()[0])
        .overlayUVs.add(ShapeTool.data.getOverlayUV())
        .faceData.add([flowAnimationState]);
};
let flowTemplate = [];
let topFaceExposed = false;
let flowAnimationState = 0;
export const LiquidVoxelShape = {
    id: "#dve_liquid",
    start() {
        vertexLevels.v1l = 0;
        vertexLevels.v2l = 0;
        vertexLevels.v3l = 0;
        vertexLevels.v4l = 0;
        vertexLevels.v1v = 0;
        vertexLevels.v2v = 0;
        vertexLevels.v3v = 0;
        vertexLevels.v4v = 0;
        topFaceExposed = false;
        ShapeTool.builder.quad.setDimensions(1, 1).uvs.setRoation(0);
        flowAnimationState = 0;
        flowTemplate = [15, 15, 15, 15];
    },
    add: {
        top() {
            topFaceExposed = true;
            ShapeTool.data.calculateFlow();
            flowTemplate = ShapeTool.data.getLevel();
            calculateVertexLevels();
            ShapeTool.builder.quad
                .setTransform(1, 0, vertexLevels.v1v, 0)
                .setTransform(2, 0, vertexLevels.v2v, 0)
                .setTransform(3, 0, vertexLevels.v3v, 0)
                .setTransform(4, 0, vertexLevels.v4v, 0)
                .uvs.setRoation(getAngle());
            addData()
                .setDirection("top")
                .updatePosition(0.5, 1, 0.5)
                .create()
                .clearTransform()
                .uvs.clear();
        },
        bottom() {
            flowAnimationState = 0;
            addData()
                .setDirection("bottom")
                .updatePosition(0.5, 0, 0.5)
                .create()
                .clearTransform()
                .uvs.clear();
        },
        north() {
            ShapeTool.builder.quad
                .setDirection("north")
                .updatePosition(0.5, 0.5, 1)
                .setTransform(1, 0, vertexLevels.v3v, 0)
                .setTransform(2, 0, vertexLevels.v2v, 0)
                .light.add(ShapeTool.data.getLight())
                .overlayUVs.add(ShapeTool.data.getOverlayUV())
                .faceData.add([1]);
            if (topFaceExposed) {
                ShapeTool.builder.quad.uvs.advancedUVs.hs1 = Math.abs(vertexLevels.v3v);
                ShapeTool.builder.quad.uvs.advancedUVs.hs2 = Math.abs(vertexLevels.v2v);
                ShapeTool.builder.quad.uvs.addAdvancedUVs(ShapeTool.data.getUV()[0]);
            }
            else {
                ShapeTool.builder.quad.uvs.add(ShapeTool.data.getUV()[0]);
            }
            ShapeTool.builder.quad.create().clearTransform().uvs.clear();
        },
        south() {
            ShapeTool.builder.quad
                .setDirection("south")
                .updatePosition(0.5, 0.5, 0)
                .setTransform(1, 0, vertexLevels.v1v, 0)
                .setTransform(2, 0, vertexLevels.v4v, 0)
                .light.add(ShapeTool.data.getLight())
                .overlayUVs.add(ShapeTool.data.getOverlayUV())
                .faceData.add([1]);
            if (topFaceExposed) {
                ShapeTool.builder.quad.uvs.advancedUVs.hs1 = Math.abs(vertexLevels.v1v);
                ShapeTool.builder.quad.uvs.advancedUVs.hs2 = Math.abs(vertexLevels.v4v);
                ShapeTool.builder.quad.uvs.addAdvancedUVs(ShapeTool.data.getUV()[0]);
            }
            else {
                ShapeTool.builder.quad.uvs.add(ShapeTool.data.getUV()[0]);
            }
            ShapeTool.builder.quad.create().clearTransform().uvs.clear();
        },
        east() {
            addData()
                .setDirection("east")
                .updatePosition(1, 0.5, 0.5)
                .setTransform(1, 0, vertexLevels.v4v, 0)
                .setTransform(2, 0, vertexLevels.v3v, 0)
                .light.add(ShapeTool.data.getLight())
                .overlayUVs.add(ShapeTool.data.getOverlayUV())
                .faceData.add([1]);
            if (topFaceExposed) {
                ShapeTool.builder.quad.uvs.advancedUVs.hs1 = Math.abs(vertexLevels.v4v);
                ShapeTool.builder.quad.uvs.advancedUVs.hs2 = Math.abs(vertexLevels.v3v);
                ShapeTool.builder.quad.uvs.addAdvancedUVs(ShapeTool.data.getUV()[0]);
            }
            else {
                ShapeTool.builder.quad.uvs.add(ShapeTool.data.getUV()[0]);
            }
            ShapeTool.builder.quad.create().clearTransform().uvs.clear();
        },
        west() {
            ShapeTool.builder.quad
                .setDirection("west")
                .updatePosition(0, 0.5, 0.5)
                .setTransform(1, 0, vertexLevels.v2v, 0)
                .setTransform(2, 0, vertexLevels.v1v, 0)
                .light.add(ShapeTool.data.getLight())
                .overlayUVs.add(ShapeTool.data.getOverlayUV())
                .faceData.add([1]);
            if (topFaceExposed) {
                ShapeTool.builder.quad.uvs.advancedUVs.hs1 = Math.abs(vertexLevels.v2v);
                ShapeTool.builder.quad.uvs.advancedUVs.hs2 = Math.abs(vertexLevels.v1v);
                ShapeTool.builder.quad.uvs.addAdvancedUVs(ShapeTool.data.getUV()[0]);
            }
            else {
                ShapeTool.builder.quad.uvs.add(ShapeTool.data.getUV()[0]);
            }
            ShapeTool.builder.quad.create().clearTransform().uvs.clear();
        },
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
const getAngle = () => {
    if (sourceBlockTest()) {
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
const sourceBlockTest = () => {
    if (flowTemplate[0] == 15 &&
        flowTemplate[1] == 15 &&
        flowTemplate[2] == 15 &&
        flowTemplate[3] == 15) {
        return true;
    }
    return false;
};
const calculateVertexLevels = () => {
    vertexLevels.v1l = flowTemplate[0];
    vertexLevels.v2l = flowTemplate[1];
    vertexLevels.v3l = flowTemplate[2];
    vertexLevels.v4l = flowTemplate[3];
    vertexLevels.v1v = vertexLevels.v1l / 15 - 1;
    vertexLevels.v2v = vertexLevels.v2l / 15 - 1;
    vertexLevels.v3v = vertexLevels.v3l / 15 - 1;
    vertexLevels.v4v = vertexLevels.v4l / 15 - 1;
};
