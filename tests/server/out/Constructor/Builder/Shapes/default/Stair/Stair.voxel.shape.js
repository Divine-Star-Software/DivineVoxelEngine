//functions
import { SetUpStairOverrides } from "./Stair.overrides.js";
//data
import { StairBuilderData } from "./StairData.js";
import { FaceMap } from "../../../../../Data/Constants/Util/Faces.js";
export const StairVoxelShape = {
    id: "#dve_stair",
    build(mesher) {
        const data = StairBuilderData[mesher.data.getShapeState()];
        if (!data)
            return;
        let i = 0;
        for (const face of FaceMap) {
            const node = data[i];
            if (mesher.templateData.loadIn(face).isExposed()) {
                let k = node.length;
                for (const quad of node) {
                    k--;
                    mesher.setTemplateIncrement(k == 0);
                    if (quad[6] >= 0) {
                        mesher.quad.setFlipped(quad[6] == 1);
                    }
                    mesher.quad
                        .setDimensions(quad[1][0], quad[1][1])
                        .setDirection(quad[0])
                        .updatePosition(quad[2][0], quad[2][1], quad[2][2])
                        .AO.addCustom(quad[3])
                        .light.addCustom(quad[4])
                        .oUVS.add()
                        .uvs.setRoation(quad[5][0])
                        .setWidth(quad[5][1], quad[5][2])
                        .setHeight(quad[5][3], quad[5][4])
                        .add()
                        .create()
                        .clearTransform();
                }
            }
            mesher.setTemplateIncrement(true);
            i++;
        }
    },
};
SetUpStairOverrides();
