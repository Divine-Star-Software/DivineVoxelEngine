//utils
import { UtilMap } from "../../../../Global/Util/UtilMap.js";
//constructors
import { SimpleBoxVoxelConstructor } from "./Classes/Box/SimpleBox.constructor.js";
import { PillarBoxVoxelConstructor, } from "./Classes/Box/PillarBox.constructor.js";
export const VoxelConstructors = {
    constructors: new UtilMap(),
    get(id) {
        return this.constructors.get(id);
    },
    registerVoxel(voxel) {
        if (Array.isArray(voxel)) {
            for (const vox of voxel) {
                this.constructors.set(vox.id, vox);
            }
            return;
        }
        this.constructors.set(voxel.id, voxel);
    },
    defaults: {
        simple(id, textures) {
            return new SimpleBoxVoxelConstructor(id, textures);
        },
        pillar(id, textures) {
            return new PillarBoxVoxelConstructor(id, textures);
        },
    },
};
