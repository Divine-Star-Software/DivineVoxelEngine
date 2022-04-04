/// <reference types="babylonjs" />
import { DivineVoxelEngine } from "index";
import { EntityTypes } from "Meta/Entity/Entity.types";
import type { RenderedEntity, RenderedEntityData, RenderedEntityInterface } from "Meta/Entity/RenderedEntity.types";
export declare class RenderedEntitesManager {
    private DVE;
    scene: BABYLON.Scene;
    entityTemplate: Record<string, {
        template: RenderedEntity;
        data: RenderedEntityData;
    }>;
    loaedEntities: Record<EntityTypes, Record<string, RenderedEntityInterface>>;
    constructor(DVE: DivineVoxelEngine);
    setScene(scene: BABYLON.Scene): void;
    registerEntity(id: string, entityData: RenderedEntityData, renderedEntity: RenderedEntity): void;
    spawnEntity(entityId: string, identiferId: string, positionSBA: SharedArrayBuffer, statesSBA: SharedArrayBuffer): void;
    deSpawnEntity(entityId: string, identiferId: string): false | undefined;
}
