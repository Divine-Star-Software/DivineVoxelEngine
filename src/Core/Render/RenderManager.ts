import { ChunkMaterial } from "./Materials/Chunk/ChunkMaterial.js";
import { FloraMaterial } from "./Materials/Flora/FloraMaterial.js";
import { ShaderBuilder } from "./Materials/ShaderBuilder/ShaderBuilder.js";
import { ChunkMesh } from "./Meshes/Chunk/ChunkMesh.js";
import { TextureCreator } from "./Textures/TextureCreator.js";

export class RenderManager {
 shaderBuilder: ShaderBuilder = new ShaderBuilder();
 textureCreator: TextureCreator = new TextureCreator();


 chunkMaterial: ChunkMaterial = new ChunkMaterial(this);
 floraMaterial: FloraMaterial = new FloraMaterial(this);


 chunkMesh: ChunkMesh = new ChunkMesh(this.chunkMaterial);

 constructor() {}
}
