//objects
import { DVEC } from "../DivineVoxelEngineConstructor.js";
//functions
export const VoxelHelper = {
    substanceRules: {
        "solid-solid": false,
        "solid-flora": true,
        "solid-transparent": true,
        "solid-fluid": true,
        "solid-magma": true,
        "transparent-solid": true,
        "transparent-flora": true,
        "transparent-transparent": false,
        "transparent-fluid": true,
        "transparent-magma": true,
        "flora-solid": true,
        "flora-flora": true,
        "flora-transparent": true,
        "flora-fluid": true,
        "flora-magma": true,
        "fluid-solid": false,
        "fluid-flora": true,
        "fluid-transparent": true,
        "fluid-fluid": false,
        "fluid-magma": true,
        "magma-solid": false,
        "magma-flora": true,
        "magma-transparent": true,
        "magma-fluid": true,
        "magma-magma": false,
    },
    voxelFaceCheck(face, voxel, x, y, z) {
        const checkVoxelId = DVEC.worldMatrix.getVoxel(x, y, z);
        if (checkVoxelId && checkVoxelId[0] == "dve:air")
            return true;
        if (!checkVoxelId)
            return true;
        const checkVoxelObject = DVEC.voxelManager.getVoxel(checkVoxelId[0]);
        if (this.substanceRules[`${voxel.data.substance}-${checkVoxelObject.data.substance}`]) {
            return true;
        }
        else {
            return false;
        }
    },
};
