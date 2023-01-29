//objects
import { DVEC } from "../DivineVoxelEngineConstructor.js";
import { ShapeManager } from "./Shapes/ShapeManager.js";
import { TextureManager } from "./Textures/TextureManager.js";
import { Processor } from "./Processor/Processor.js";
import { ChunkMesher } from "./Mesher/ChunkMesher.js";
import { SubstanceRules } from "./Rules/SubstanceRules.js";
//functions
import { InitBuilder } from "./Init/InitBuilder.js";
export const Builder = {
    textureManager: TextureManager,
    shapeManager: ShapeManager,
    chunkMesher: ChunkMesher,
    processor: Processor,
    substanceRules: SubstanceRules,
    dimension: 0,
    async $INIT() {
        InitBuilder(this);
    },
    syncSettings(settings) {
        this.processor.syncSettings(settings);
    },
    buildChunk(location, LOD = 1) {
        let chunk = DVEC.data.worldRegister.chunk.get(location);
        if (!chunk) {
            console.warn(`${location.toString()}could not be loaded`);
            return;
        }
        DVEC.data.worldRegister.cache.enable();
        const template = this.processor.makeAllChunkTemplates(location, LOD);
        this.chunkMesher.buildChunkMesh(location, template, LOD);
        this.processor.flush();
        DVEC.data.worldRegister.cache.disable();
        return true;
    },
    constructEntity() {
        /*   const template = this.processor.constructEntity();
          this.entityMesher.buildEntityMesh(
           this.entityConstructor.pos.x,
           this.entityConstructor.pos.y,
           this.entityConstructor.pos.z,
           template.solid
          );
          this.entityConstructor.clearEntityData();
          this.processor.flush(); */
    },
};
