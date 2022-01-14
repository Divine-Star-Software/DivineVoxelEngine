import { ChunkMaterial } from "./Materials/Chunk/ChunkMaterial.js";
import { FloraMaterial } from "./Materials/Flora/FloraMaterial.js";
import { ShaderBuilder } from "./Materials/ShaderBuilder/ShaderBuilder.js";
import { ChunkMesh } from "./Meshes/Chunk/ChunkMesh.js";
import { FloraMesh } from "./Meshes/Flora/FloraMesh.js";
import { TextureCreator } from "./Textures/TextureCreator.js";
export class RenderManager {
    shaderBuilder = new ShaderBuilder();
    textureCreator = new TextureCreator();
    chunkMaterial = new ChunkMaterial(this);
    floraMaterial = new FloraMaterial(this);
    chunkMesh = new ChunkMesh(this.chunkMaterial);
    floraMesh = new FloraMesh(this.floraMaterial);
    constructor() { }
}
