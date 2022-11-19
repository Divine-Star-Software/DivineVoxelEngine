import { StairCullFace } from "./Stair.cullface.js";
import { StairBuilderData } from "./StairData.js";
import { VoxelMesher } from "../../../Tools/VoxelMesher.js";
import { FaceMap } from "../../../../../Data/Constants/Meshing/Faces.js";
export const StairVoxelShape = {
    id: "Stair",
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
        return StairCullFace(data);
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
        if (data.face == "top" || data.face == "bottom")
            return true;
        return false;
    },
    addToChunkMesh() {
        const data = StairBuilderData[VoxelMesher.data.getShapeState()];
        if (!data)
            return;
        let i = 0;
        for (const face of FaceMap) {
            const node = data[i];
            if (VoxelMesher.templateData.loadIn(face).isExposed()) {
                let k = node.length;
                for (const quad of node) {
                    k--;
                    VoxelMesher.setTemplateIncrement(k == 0);
                    if (quad.flip >= 0) {
                        VoxelMesher.quad.setFlipped(quad.flip == 1);
                    }
                    VoxelMesher.quad
                        .setDimensions(quad.dimensions[0], quad.dimensions[1])
                        .setDirection(quad.direction)
                        .updatePosition(quad.position[0], quad.position[1], quad.position[2])
                        .light.addCustom(quad.light)
                        .AO.addCustom(quad.AO)
                        .oUVS.add()
                        .uvs.setRoation(quad.uvs[0])
                        .setWidth(quad.uvs[1], quad.uvs[2])
                        .setHeight(quad.uvs[3], quad.uvs[4])
                        .add()
                        .create()
                        .clearTransform();
                }
            }
            VoxelMesher.setTemplateIncrement(true);
            i++;
        }
    },
};
StairVoxelShape.registerShapeAOAddOverride("Box", (data) => {
    return data.default;
});
