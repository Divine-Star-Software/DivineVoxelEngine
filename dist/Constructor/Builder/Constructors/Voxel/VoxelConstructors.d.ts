import type { ConstructorTextureData } from "Meta/Constructor/Constructor.types.js";
import type { DirectionNames } from "Meta/Util.types.js";
import type { VoxelConstructor } from "Meta/Constructor/Voxel.types.js";
import { BoxVoxelConstructor, PillarBoxVoxelConstructor, PillarBoxVoxelConstructorData } from "./classes/Box.constructor.js";
import { LiquidVoxelConstructor } from "./classes/Liquid.constructor.js";
import { PanelVoxelConstructor } from "./classes/Panel.constructor.js";
export declare const VoxelConstructors: {
    voxelObjects: Map<string, VoxelConstructor>;
    getVoxel(id: string): VoxelConstructor;
    registerVoxel(voxel: VoxelConstructor | VoxelConstructor[]): void;
    defaults: {
        box: {
            simple(id: string, textures: ConstructorTextureData | Record<DirectionNames, ConstructorTextureData>): BoxVoxelConstructor;
            pillar(id: string, textures: PillarBoxVoxelConstructorData): PillarBoxVoxelConstructor;
        };
        panel: {
            simple(id: string, texture: ConstructorTextureData): PanelVoxelConstructor;
        };
        liquid: {
            simple(id: string, textures: [ConstructorTextureData, ConstructorTextureData]): LiquidVoxelConstructor;
        };
    };
};
