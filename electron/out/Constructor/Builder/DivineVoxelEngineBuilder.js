//objects
import { DVEC } from "../DivineVoxelEngineConstructor.js";
import { ShapeHelper } from "./Shapes/ShapeHelper.js";
import { ShapeManager } from "./Shapes/ShapeManager.js";
import { ShapeBuilder } from "./Shapes/ShapeBuilder.js";
import { TextureManager } from "../Textures/TextureManager.js";
import { ChunkProcessor } from "./Processor/ChunkProcessor.js";
import { ChunkMeshBuilder } from "./Mesher/ChunkMeshBuilder.js";
//functions
import { InitBuilder } from "./Init/InitBuilder.js";
export const DVEB = {
    textureManager: TextureManager,
    shapeManager: ShapeManager,
    shapeHelper: ShapeHelper,
    shapeBuilder: ShapeBuilder,
    chunkMesher: ChunkMeshBuilder,
    chunkProccesor: ChunkProcessor,
    async $INIT() {
        InitBuilder(this);
    },
    async buildChunk(chunkX, chunkY, chunkZ) {
        let chunk = DVEC.worldMatrix.getChunk(chunkX, chunkY, chunkZ);
        if (!chunk) {
            await DVEC.matrixHub.requestChunkSync(chunkX, chunkY, chunkZ);
            chunk = DVEC.worldMatrix.getChunk(chunkX, chunkY, chunkZ);
            if (!chunk) {
                console.warn(`${chunkX} ${chunkY} ${chunkZ} could not be loaded`);
                return;
            }
        }
        const template = this.chunkProccesor.makeAllChunkTemplates(chunk, chunkX, chunkY, chunkZ);
        this.chunkMesher.buildChunkMesh(chunkX, chunkY, chunkZ, template);
        return true;
    },
};
