//objects
import { DVEC } from "../DivineVoxelEngineConstructor.js";
import { ShapeManager } from "../Managers/Shapes/ShapeManager.js";
import { TextureManager } from "./Textures/TextureManager.js";
import { Processor } from "./Processor/Processor.js";
import { ChunkMesher } from "./Mesher/ChunkMesher.js";
import { VoxelHelper } from "./Processor/VoxelHelper.js";
import { EntityConstructor } from "./EntityConstructor/EntityConstructor.js";
import { EntityMesher } from "./Mesher/EntityMesher.js";
import { ItemMesher } from "./Mesher/ItemMesher.js";
//functions
import { InitBuilder } from "./Init/InitBuilder.js";
export const Builder = {
    textureManager: TextureManager,
    shapeManager: ShapeManager,
    chunkMesher: ChunkMesher,
    entityMesher: EntityMesher,
    itemMesher: ItemMesher,
    processor: Processor,
    voxelHelper: VoxelHelper,
    entityConstructor: EntityConstructor,
    dimension: 0,
    async $INIT() {
        InitBuilder(this);
    },
    syncSettings(settings) {
        this.processor.syncSettings(settings);
    },
    async buildChunk(dimension, chunkX, chunkY, chunkZ, LOD = 1) {
        let chunk = DVEC.data.worldRegister.chunk.get(dimension, chunkX, chunkY, chunkZ);
        if (!chunk) {
            console.warn(`${chunkX} ${chunkY} ${chunkZ} could not be loaded`);
            return;
        }
        DVEC.data.worldRegister.cache.enable();
        const template = this.processor.makeAllChunkTemplates(dimension, chunkX, chunkY, chunkZ, LOD);
        this.chunkMesher.buildChunkMesh(dimension, chunkX, chunkY, chunkZ, template, LOD);
        this.processor.flush();
        DVEC.data.worldRegister.cache.disable();
        return true;
    },
    constructEntity() {
        const template = this.processor.constructEntity();
        this.entityMesher.buildEntityMesh(this.entityConstructor.pos.x, this.entityConstructor.pos.y, this.entityConstructor.pos.z, template.solid);
        this.entityConstructor.clearEntityData();
        this.processor.flush();
    },
};
