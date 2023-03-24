import { OverrideManager } from "../../../Rules/Overrides/OverridesManager.js";
import { ShapeTool } from "../../ShapeTool.js";
import { QuadVertexData } from "../../../Classes/VertexData.js";
const animationState = new QuadVertexData();
export const HalfBoxVoxelShape = {
    _createFace() {
        animationState.setAll(ShapeTool.data.voxel.getSubstance() == "#dve_flora" ? 3 : 0);
        ShapeTool.builder.quad
            .setFlipped(ShapeTool.data.isFaceFlipped())
            .AO.add(ShapeTool.data.getWorldAO())
            .light.add(ShapeTool.data.getWorldLight())
            .textures.add(ShapeTool.data.getUV())
            .overlayTexture.add(ShapeTool.data.getOverlayTextures())
            .animationState.add(animationState)
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
                .textures.setHeight(0.5, 1)
                .quad.updatePosition(0.5, ShapeTool.data.voxel.getState() == 0 ? 0.5 : 0.75, 1);
            HalfBoxVoxelShape._createFace();
        },
        south() {
            ShapeTool.builder.quad
                .setDirection("south")
                .setDimensions(1, 0.5)
                .textures.setHeight(0.5, 1)
                .quad.updatePosition(0.5, ShapeTool.data.voxel.getState() == 0 ? 0.5 : 0.75, 0);
            HalfBoxVoxelShape._createFace();
        },
        east() {
            ShapeTool.builder.quad
                .setDirection("east")
                .setDimensions(1, 0.5)
                .textures.setHeight(0.5, 1)
                .quad.updatePosition(1, ShapeTool.data.voxel.getState() == 0 ? 0.5 : 0.75, 0.5);
            HalfBoxVoxelShape._createFace();
        },
        west() {
            ShapeTool.builder.quad
                .setDirection("west")
                .setDimensions(1, 0.5)
                .textures.setHeight(0.5, 1)
                .quad.updatePosition(0, ShapeTool.data.voxel.getState() == 0 ? 0.5 : 0.75, 0.5);
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
