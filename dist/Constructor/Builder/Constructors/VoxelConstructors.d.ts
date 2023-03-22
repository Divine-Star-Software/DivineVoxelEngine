import type { ConstructorTextureData } from "Meta/Constructor/Constructor.types.js";
import type { DirectionNames } from "Meta/Util.types.js";
import { UtilMap } from "../../../Global/Util/UtilMap.js";
import { SimpleBoxVoxelConstructor } from "./Classes/SimpleBox.constructor.js";
import { PillarBoxVoxelConstructor, PillarBoxVoxelConstructorData } from "./Classes/PillarBox.constructor.js";
import { SimpleLiquidConstructor } from "./Classes/SimpleLiquid.constructor.js";
import { SimplePanelVoxelConstructor } from "./Classes/SimplePanel.constructor.js";
import { SimpleStairVoxelConstructor } from "./Classes/SimpleStair.constructor.js";
import { VoxelConstructor } from "./Classes/VoxelConstructor.js";
import { SimpleCrossedPanelVoxelConstructor } from "./Classes/SimpleCrossedPanel.constructor.js";
export declare const VoxelConstructors: {
    constructors: UtilMap<string, VoxelConstructor>;
    get(id: string): VoxelConstructor;
    registerVoxel(voxel: VoxelConstructor | VoxelConstructor[]): void;
    defaults: {
        box: {
            simple(id: string, textures: ConstructorTextureData | Record<DirectionNames, ConstructorTextureData>): SimpleBoxVoxelConstructor;
            pillar(id: string, textures: PillarBoxVoxelConstructorData): PillarBoxVoxelConstructor;
        };
        stair: {
            simple(id: string, texture: ConstructorTextureData): SimpleStairVoxelConstructor;
        };
        panel: {
            simple(id: string, texture: ConstructorTextureData): SimplePanelVoxelConstructor;
        };
        crossedPanel: {
            simple(id: string, texture: ConstructorTextureData): SimpleCrossedPanelVoxelConstructor;
        };
        liquid: {
            simple(id: string, textures: [ConstructorTextureData, ConstructorTextureData]): SimpleLiquidConstructor;
        };
    };
};
