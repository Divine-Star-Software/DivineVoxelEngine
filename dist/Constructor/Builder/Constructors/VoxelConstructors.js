//utils
import { UtilMap } from "../../../Global/Util/UtilMap.js";
//constructors
import { SimpleBoxVoxelConstructor } from "./Classes/SimpleBox.constructor.js";
import { PillarBoxVoxelConstructor, } from "./Classes/PillarBox.constructor.js";
import { SimpleLiquidConstructor } from "./Classes/SimpleLiquid.constructor.js";
import { SimplePanelVoxelConstructor } from "./Classes/SimplePanel.constructor.js";
import { SimpleStairVoxelConstructor } from "./Classes/SimpleStair.constructor.js";
import { SimpleCrossedPanelVoxelConstructor } from "./Classes/SimpleCrossedPanel.constructor.js";
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
        box: {
            simple(id, textures) {
                return new SimpleBoxVoxelConstructor(id, textures);
            },
            pillar(id, textures) {
                return new PillarBoxVoxelConstructor(id, textures);
            },
        },
        stair: {
            simple(id, texture) {
                return new SimpleStairVoxelConstructor(id, texture);
            },
        },
        panel: {
            simple(id, texture) {
                return new SimplePanelVoxelConstructor(id, texture);
            },
        },
        crossedPanel: {
            simple(id, texture) {
                return new SimpleCrossedPanelVoxelConstructor(id, texture);
            },
        },
        liquid: {
            simple(id, textures) {
                return new SimpleLiquidConstructor(id, textures);
            },
        },
    },
};
