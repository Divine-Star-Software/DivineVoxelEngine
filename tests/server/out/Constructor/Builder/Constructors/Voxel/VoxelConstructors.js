import { BoxVoxelConstructor, PillarBoxVoxelConstructor, } from "./classes/Box.constructor.js";
import { LiquidVoxelConstructor } from "./classes/Liquid.constructor.js";
import { PanelVoxelConstructor } from "./classes/Panel.constructor.js";
export const VoxelConstructors = {
    voxelObjects: new Map(),
    getVoxel(id) {
        return this.voxelObjects.get(id);
    },
    registerVoxel(voxel) {
        if (Array.isArray(voxel)) {
            for (const vox of voxel) {
                this.voxelObjects.set(vox.id, vox);
            }
            return;
        }
        this.voxelObjects.set(voxel.id, voxel);
    },
    defaults: {
        box: {
            simple(id, textures) {
                return new BoxVoxelConstructor(id, textures);
            },
            pillar(id, textures) {
                return new PillarBoxVoxelConstructor(id, textures);
            },
        },
        panel: {
            simple(id, texture) {
                return new PanelVoxelConstructor(id, texture);
            },
        },
        liquid: {
            simple(id, textures) {
                return new LiquidVoxelConstructor(id, textures);
            },
        },
    },
};
