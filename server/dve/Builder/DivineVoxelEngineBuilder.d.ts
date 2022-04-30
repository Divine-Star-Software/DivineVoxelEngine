import { EngineSettingsData } from "Meta/Global/EngineSettings.types.js";
import { EngineSettings } from "../Global/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
import { ChunkMeshBuilder } from "./ChunkMeshBuilder.js";
import { ShapeHelper } from "./Shapes/ShapeHelper.js";
import { ShapeManager } from "./Shapes/ShapeManager.js";
import { MatrixHub } from "../Matrix/MatrixHub.js";
import { WorldMatrix } from "../Matrix/WorldMatrix.js";
import type { DVEBInitData } from "Meta/Builder/DVEB.js";
import { ChunkBounds } from "../Global/Chunks/ChunkBounds.js";
import { VoxelManager } from "./Voxels/VoxelManager.js";
import { VoxelHelper } from "./Voxels/VoxelHelper.js";
import { TextureManager } from "./Textures/TextureManager.js";
export declare class DivineVoxelEngineBuilder {
    environment: "node" | "browser";
    worker: Worker;
    UTIL: Util;
    worldMatrix: WorldMatrix;
    matrixHub: MatrixHub;
    renderComm: import("../Meta/Comms/InterComm.types.js").InterCommInterface & {
        onReady: () => void;
        onRestart: () => void;
    };
    worldComm: import("../Meta/Comms/InterComm.types.js").InterCommInterface;
    chunkBounds: ChunkBounds;
    textureManager: TextureManager;
    voxelManager: VoxelManager;
    voxelHelper: VoxelHelper;
    __connectedToWorld: boolean;
    engineSettings: EngineSettings;
    shapeManager: ShapeManager;
    shapeHelper: ShapeHelper;
    builder: ChunkMeshBuilder;
    syncSettings(data: EngineSettingsData): void;
    reStart(): void;
    isReady(): boolean;
    $INIT(initData: DVEBInitData): Promise<void>;
}
export declare const DVEB: DivineVoxelEngineBuilder;
