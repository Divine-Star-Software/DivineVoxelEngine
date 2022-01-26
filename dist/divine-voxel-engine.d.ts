import { DVE, DVEOptions, DVEInitData } from 'Meta/Core/DVE.js';
import { Util } from '../Global/Util.helper.ts';
import { BuilderWorkerManager } from './Builders/BuilderWorkerManager.ts';
import { World } from './World/World.ts';
import { RenderManager } from './Render/RenderManager.ts';
import { MeshManager } from './Meshes/MeshManager.ts';

declare class DivineVoxelEngine implements DVE {
    world: World;
    renderManager: RenderManager;
    builderManager: BuilderWorkerManager;
    meshManager: MeshManager;
    util: Util;
    constructor();
    _handleOptions(data: DVEOptions): void;
    reStart(data: DVEOptions): Promise<void>;
    $INIT(data: DVEInitData): Promise<void>;
    $SCENEINIT(data: {
        scene: BABYLON.Scene;
    }): Promise<void>;
}

export { DivineVoxelEngine };
