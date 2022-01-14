import { ChunkMaterial } from "./Materials/Chunk/ChunkMaterial.js";
import { FloraMaterial } from "./Materials/Flora/FloraMaterial.js";
import { FluidMaterial } from "./Materials/Fluid/FluidMaterial.js";
import { ShaderBuilder } from "./Materials/ShaderBuilder/ShaderBuilder.js";
import { ChunkMesh } from "./Meshes/Chunk/ChunkMesh.js";
import { FloraMesh } from "./Meshes/Flora/FloraMesh.js";
import { FluidMesh } from "./Meshes/Fluid/FluidMesh.js";
import { TextureCreator } from "./Textures/TextureCreator.js";
export class RenderManager {
    shaderBuilder = new ShaderBuilder();
    textureCreator = new TextureCreator();
    chunkMaterial = new ChunkMaterial(this);
    floraMaterial = new FloraMaterial(this);
    fluidMaterial = new FluidMaterial(this);
    chunkMesh = new ChunkMesh(this.chunkMaterial);
    floraMesh = new FloraMesh(this.floraMaterial);
    fluidMesh = new FluidMesh(this.fluidMaterial);
    constructor() { }
}
