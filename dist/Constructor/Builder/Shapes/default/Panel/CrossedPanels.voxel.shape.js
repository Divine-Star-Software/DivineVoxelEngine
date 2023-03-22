import { ShapeTool } from "../../ShapeTool.js";
let topANIM = 0;
let bottomANIM = 0;
const addData = () => {
    return ShapeTool.builder.quad.light
        .add(ShapeTool.data.getLight())
        .AO.add(ShapeTool.data.getAO())
        .uvs.add(ShapeTool.data.getUV()[0])
        .overlayUVs.add(ShapeTool.data.getOverlayUV());
};
export const CrossedPanels = {
    id: "#dve_crossed_panels",
    build() {
        topANIM = 0;
        bottomANIM = 0;
        if (ShapeTool.data.voxel.getSubstance() == "#dve_flora") {
            if (ShapeTool.data.voxel.isSameVoxel(ShapeTool.data.voxel.x, ShapeTool.data.voxel.y + 1, ShapeTool.data.voxel.z)) {
                topANIM = 3;
                bottomANIM = 3;
            }
            else {
                topANIM = 1;
            }
        }
        ShapeTool.builder.quad.setDimensions(1, 1);
        addData()
            .setDirection("north")
            .setFlipped(false)
            .faceData.add(topANIM, topANIM, bottomANIM, bottomANIM)
            .updatePosition(0.5, 0.5, 1)
            .setTransform(1, 0, 0, -1)
            .setTransform(4, 0, 0, -1)
            .create()
            .clearTransform();
        addData()
            .setDirection("north")
            .setFlipped(false)
            .faceData.add(topANIM, topANIM, bottomANIM, bottomANIM)
            .updatePosition(0.5, 0.5, 0)
            .setTransform(1, 0, 0, 1)
            .setTransform(4, 0, 0, 1)
            .create()
            .clearTransform();
        addData()
            .setDirection("south")
            .setFlipped(false)
            .faceData.add(topANIM, topANIM, bottomANIM, bottomANIM)
            .updatePosition(0.5, 0.5, 0)
            .setTransform(1, 0, 0, 1)
            .setTransform(4, 0, 0, 1)
            .create()
            .clearTransform();
        addData()
            .setDirection("south")
            .setFlipped(false)
            .faceData.add(topANIM, topANIM, bottomANIM, bottomANIM)
            .updatePosition(0.5, 0.5, 1)
            .setTransform(1, 0, 0, -1)
            .setTransform(4, 0, 0, -1)
            .create()
            .clearTransform();
    },
};
