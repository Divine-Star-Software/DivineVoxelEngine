//utils
import { UtilMap } from "../../../../Global/Util/UtilMap.js";
//constructors
import { SimpleBoxVoxelConstructor } from "./Classes/Box/SimpleBox.constructor.js";
import { PillarBoxVoxelConstructor, } from "./Classes/Box/PillarBox.constructor.js";
import { SimpleLiquidConstructor } from "./Classes/Liquid/SimpleLiquid.constructor.js";
import { SimplePanelVoxelConstructor } from "./Classes/Panel/SimplePanel.constructor.js";
import { SimpleStairVoxelConstructor } from "./Classes/Stair/SimpleStair.constructor.js";
import { SimpleCrossedPanelVoxelConstructor } from "./Classes/Panel/SimpleCrossedPanel.constructor.js";
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
