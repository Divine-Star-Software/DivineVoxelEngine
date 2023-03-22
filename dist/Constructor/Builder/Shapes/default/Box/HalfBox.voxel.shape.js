import { OverrideManager } from "../../../Rules/Overrides/OverridesManager.js";
import { ShapeTool } from "../../ShapeTool.js";
export const HalfBoxVoxelShape = {
    _createFace() {
        ShapeTool.builder.quad
            .setFlipped(ShapeTool.data.isFaceFlipped())
            .AO.add(ShapeTool.data.getAO())
            .light.add(ShapeTool.data.getLight())
            .uvs.add(ShapeTool.data.getUV()[0])
            .overlayUVs.add(ShapeTool.data.getOverlayUV())
            .faceData.add(ShapeTool.data.voxel.getSubstance() == "#dve_flora" ? 3 : 0)
            .create()
            .clear();
    },
    add: {
        top() {
            ShapeTool.builder.quad
                .setDirection("top")
                .setDimensions(1, 1)
                .updatePosition(0.5, ShapeTool.data.voxel.getState() == 0 ? 0.5 : 1, 0.5);
            HalfBoxVoxelShape._createFace();
        },
        bottom() {
            ShapeTool.builder.quad
                .setDirection("bottom")
                .setDimensions(1, 1)
                .updatePosition(0.5, ShapeTool.data.voxel.getState() == 0 ? 0 : 0.5, 0.5);
            HalfBoxVoxelShape._createFace();
        },
        north() {
            ShapeTool.builder.quad
                .setDirection("north")
                .setDimensions(1, 0.5)
                .uvs.setHeight(0.5, 1)
                .updatePosition(0.5, ShapeTool.data.voxel.getState() == 0 ? 0.5 : 0.75, 1);
            HalfBoxVoxelShape._createFace();
        },
        south() {
            ShapeTool.builder.quad
                .setDirection("south")
                .setDimensions(1, 0.5)
                .uvs.setHeight(0.5, 1)
                .updatePosition(0.5, ShapeTool.data.voxel.getState() == 0 ? 0.5 : 0.75, 0);
            HalfBoxVoxelShape._createFace();
        },
        east() {
            ShapeTool.builder.quad
                .setDirection("east")
                .setDimensions(1, 0.5)
                .uvs.setHeight(0.5, 1)
                .updatePosition(1, ShapeTool.data.voxel.getState() == 0 ? 0.5 : 0.75, 0.5);
            HalfBoxVoxelShape._createFace();
        },
        west() {
            ShapeTool.builder.quad
                .setDirection("west")
                .setDimensions(1, 0.5)
                .uvs.setWidth(0, 1)
                .uvs.setHeight(0.5, 1)
                .updatePosition(0, ShapeTool.data.voxel.getState() == 0 ? 0.5 : 0.75, 0.5);
            HalfBoxVoxelShape._createFace();
        },
    },
};
//cullface
OverrideManager.registerOverride("CullFace", "#dve_half_box", "#dve_panel", (data) => {
    return false;
});
OverrideManager.registerOverride("CullFace", "#dve_half_box", "#dve_box", (data) => {
    if (data.face == "bottom") {
        if (data.currentVoxel.getShapeState() == 0) {
            return false;
        }
    }
    if (data.face == "top") {
        if (data.currentVoxel.getShapeState() == 1) {
            return false;
        }
    }
    return true;
});
OverrideManager.registerOverride("CullFace", "#dve_half_box", "#dve_stair", (data) => {
    return data.default;
});
//AO
OverrideManager.registerOverride("AO", "#dve_half_box", "#dve_panel", (data) => {
    return false;
});
OverrideManager.registerOverride("AO", "#dve_half_box", "#dve_box", (data) => {
    const shapeState = data.currentVoxel.getShapeState();
    if (shapeState == 1) {
        if (data.face == "top") {
            if (data.neighborVoxel.location[2] > data.currentVoxel.location[2]) {
                return true;
            }
        }
        if (data.neighborVoxel.location[2] == data.currentVoxel.location[2]) {
            return true;
        }
        return false;
    }
    return data.default;
});
