import { ChunkMaterial } from "./Materials/Chunk/ChunkMaterial.js";
import { FloraMaterial } from "./Materials/Flora/FloraMaterial.js";
import { FluidMaterial } from "./Materials/Fluid/FluidMaterial.js";
import { ShaderBuilder } from "./Materials/ShaderBuilder/ShaderBuilder.js";
import { ChunkMesh } from "./Meshes/Chunk/ChunkMesh.js";
import { FloraMesh } from "./Meshes/Flora/FloraMesh.js";
import { FluidMesh } from "./Meshes/Fluid/FluidMesh.js";
import { TextureCreator } from "./Textures/TextureCreator.js";

export class RenderManager {
 shaderBuilder: ShaderBuilder = new ShaderBuilder();
 textureCreator: TextureCreator = new TextureCreator();


 chunkMaterial: ChunkMaterial = new ChunkMaterial(this);
 floraMaterial: FloraMaterial = new FloraMaterial(this);
 fluidMaterial : FluidMaterial = new FluidMaterial(this);


 chunkMesh: ChunkMesh = new ChunkMesh(this.chunkMaterial);
 floraMesh : FloraMesh = new FloraMesh(this.floraMaterial);
 fluidMesh : FluidMesh = new FluidMesh(this.fluidMaterial);

 constructor() {}
}
