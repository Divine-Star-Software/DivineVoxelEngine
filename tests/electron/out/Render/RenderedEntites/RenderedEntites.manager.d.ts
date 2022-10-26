/// <reference types="babylonjs" />
import type { EntityTypes } from "Meta/Data/Entity/Entity.types";
import type { RenderedEntity, RenderedEntityData, RenderedEntityInterface } from "Meta/Interfaces/Entity/RenderedEntity.types";
export declare const RenderedEntitesManager: {
    scene: BABYLON.Scene | null;
    entityTemplate: Record<string, {
        template: RenderedEntity;
        data: RenderedEntityData;
    }>;
    loaedEntities: Record<EntityTypes, Record<string, RenderedEntityInterface>>;
    setScene(scene: BABYLON.Scene): void;
    registerEntity(id: string, entityData: RenderedEntityData, renderedEntity: RenderedEntity): void;
    spawnEntity(entityId: string, identiferId: string, positionSBA: SharedArrayBuffer, statesSBA: SharedArrayBuffer): void;
    deSpawnEntity(entityId: string, identiferId: string): false | undefined;
};
