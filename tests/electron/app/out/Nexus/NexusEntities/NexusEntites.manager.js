import { DVEN } from "../DivineVoxelEngineNexus.js";
export const NexusEntites = {
    entityTemplate: {},
    loaedEntities: {
        player: {},
        being: {},
        item: {},
        npc: {},
        util: {},
    },
    registerEntity(id, entityData, nexusEntity) {
        if (this.entityTemplate[id]) {
            throw new Error(`The entity with the ${id} already exists.`);
        }
        this.entityTemplate[id] = {
            template: nexusEntity,
            data: entityData,
        };
    },
    _getID() {
        return `${this._unqiueId()}-${this._unqiueId()}`;
    },
    _unqiueId() {
        return Math.floor((1 + Math.random()) * 0x1000000).toString(16);
    },
    _generateUUI() {
        return this._getID();
    },
    spawnEntity(entityId, position, otherData, identiferId) {
        const entity = this.entityTemplate[entityId];
        const newEntity = new entity.template();
        const positionSAB = new SharedArrayBuffer(4 * 3);
        const statesSAB = new SharedArrayBuffer(entity.data.numStates * 4);
        newEntity.position = new Float32Array(positionSAB);
        newEntity.states = new Float32Array(statesSAB);
        newEntity.position[0] = position.x;
        newEntity.position[1] = position.y;
        newEntity.position[2] = position.z;
        newEntity.$INIT(DVEN, entity.data, otherData);
        let uuid = "";
        if (identiferId) {
            uuid = identiferId;
        }
        else {
            uuid = this._generateUUI();
        }
        this.loaedEntities[entity.data.type][uuid] = newEntity;
        newEntity.onSpawn();
        DVEN.parentComm.sendMessage("spawn-entity", [
            entityId,
            identiferId,
            positionSAB,
            statesSAB,
        ]);
    },
    ddSepawnEntity(entityId, identiferId) {
        const entity = this.entityTemplate[entityId];
        const despawningEntity = this.loaedEntities[entity.data.type][identiferId];
        despawningEntity.onDeSpawn();
        delete this.loaedEntities[entity.data.type][identiferId];
        DVEN.parentComm.sendMessage("de-spawn-entity", [entityId, identiferId]);
    },
};
