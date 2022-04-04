import type { DivineVoxelEngineNexus } from "index";
import type { EntityTypes } from "Meta/Entity/Entity.types";
import type { NexusEntity, NexusEntityData, NexusEntityInterface } from "Meta/Entity/NexusEntity.types";
import { PositionMatrix } from "Meta/Util.types";
export declare class NexusEntites {
    private DVEN;
    entityTemplate: Record<string, {
        template: NexusEntity;
        data: NexusEntityData;
    }>;
    loaedEntities: Record<EntityTypes, Record<string, NexusEntityInterface>>;
    constructor(DVEN: DivineVoxelEngineNexus);
    registerEntity(id: string, entityData: NexusEntityData, renderedEntity: NexusEntity): void;
    _getID(): string;
    _unqiueId(): string;
    _generateUUI(): string;
    spawnEntity(entityId: string, position: PositionMatrix, otherData?: any, identiferId?: string): void;
    dSepawnEntity(entityId: string, identiferId: string): void;
}
