import { FaceMap } from "../../../../../Data/Constants/Meshing/Faces.js";
import { VoxelMesher } from "../../../Tools/VoxelMesher.js";
import { StairBuilderData } from "./StairDataN.js";
export function BuildStair() {
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
}
