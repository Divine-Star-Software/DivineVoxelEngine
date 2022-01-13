import { ChunkMaterial } from "./Materials/Chunk/ChunkMaterial.js";
import { FloraMaterial } from "./Materials/Flora/FloraMaterial.js";
import { ShaderBuilder } from "./Materials/ShaderBuilder/ShaderBuilder.js";
import { ChunkMesh } from "./Meshes/Chunk/ChunkMesh.js";
import { TextureCreator } from "./Textures/TextureCreator.js";
export declare class RenderManager {
    shaderBuilder: ShaderBuilder;
    textureCreator: TextureCreator;
    chunkMaterial: ChunkMaterial;
    floraMaterial: FloraMaterial;
    chunkMesh: ChunkMesh;
    constructor();
}
