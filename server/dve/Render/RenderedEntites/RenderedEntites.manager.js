export class RenderedEntitesManager {
    DVE;
    scene;
    entityTemplate = {};
    loaedEntities = {
        player: {},
        being: {},
        item: {},
        npc: {},
        util: {},
    };
    constructor(DVE) {
        this.DVE = DVE;
    }
    setScene(scene) {
        this.scene = scene;
    }
    registerEntity(id, entityData, renderedEntity) {
        if (this.entityTemplate[id]) {
            throw new Error(`The entity with the ${id} already exists.`);
        }
        this.entityTemplate[id] = {
            template: renderedEntity,
            data: entityData,
        };
    }
    spawnEntity(entityId, identiferId, positionSBA, statesSBA) {
        const entity = this.entityTemplate[entityId];
        const newEntity = new entity.template();
        const position = new Float32Array(positionSBA);
        const states = new Float32Array(statesSBA);
        newEntity.position = position;
        newEntity.states = states;
        newEntity.$INIT(entity.data);
        this.loaedEntities[entity.data.type][identiferId] = newEntity;
        newEntity.onSpawn(this.scene);
    }
    deSpawnEntity(entityId, identiferId) {
        const entity = this.entityTemplate[entityId];
        const despawningEntity = this.loaedEntities[entity.data.type][identiferId];
        if (!despawningEntity)
            return false;
        despawningEntity.onDeSpawn();
        delete this.loaedEntities[entity.data.type][identiferId];
    }
}
