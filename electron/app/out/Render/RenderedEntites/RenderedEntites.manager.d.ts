/// <reference types="babylonjs" />
import { DivineVoxelEngineRender } from "index";
import { EntityTypes } from "Meta/Builder/Entity/Entity.types";
import type { RenderedEntity, RenderedEntityData, RenderedEntityInterface } from "Meta/Builder/Entity/RenderedEntity.types";
export declare class RenderedEntitesManager {
    private DVE;
    scene: BABYLON.Scene;
    entityTemplate: Record<string, {
        template: RenderedEntity;
        data: RenderedEntityData;
    }>;
    loaedEntities: Record<EntityTypes, Record<string, RenderedEntityInterface>>;
    constructor(DVE: DivineVoxelEngineRender);
    setScene(scene: BABYLON.Scene): void;
    registerEntity(id: string, entityData: RenderedEntityData, renderedEntity: RenderedEntity): void;
    spawnEntity(entityId: string, identiferId: string, positionSBA: SharedArrayBuffer, statesSBA: SharedArrayBuffer): void;
    deSpawnEntity(entityId: string, identiferId: string): false | undefined;
}
