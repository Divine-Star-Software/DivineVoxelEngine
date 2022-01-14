import { ChunkMaterial } from "./Materials/Chunk/ChunkMaterial.js";
import { FloraMaterial } from "./Materials/Flora/FloraMaterial.js";
import { FluidMaterial } from "./Materials/Fluid/FluidMaterial.js";
import { ShaderBuilder } from "./Materials/ShaderBuilder/ShaderBuilder.js";
import { ChunkMesh } from "./Meshes/Chunk/ChunkMesh.js";
import { FloraMesh } from "./Meshes/Flora/FloraMesh.js";
import { FluidMesh } from "./Meshes/Fluid/FluidMesh.js";
import { TextureCreator } from "./Textures/TextureCreator.js";
export declare class RenderManager {
    shaderBuilder: ShaderBuilder;
    textureCreator: TextureCreator;
    chunkMaterial: ChunkMaterial;
    floraMaterial: FloraMaterial;
    fluidMaterial: FluidMaterial;
    chunkMesh: ChunkMesh;
    floraMesh: FloraMesh;
    fluidMesh: FluidMesh;
    constructor();
}
