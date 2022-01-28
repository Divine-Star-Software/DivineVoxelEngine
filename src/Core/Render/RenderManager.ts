import { AnimationManager } from "./Materials/Animations/AnimationManager.js";
import { ShaderBuilder } from "./Materials/ShaderBuilder/ShaderBuilder.js";
import { TextureCreator } from "./Textures/TextureCreator.js";

//meshes
import { SolidMesh } from "./Meshes/Solid/SolidMesh.js";
import { FloraMesh } from "./Meshes/Flora/FloraMesh.js";
import { FluidMesh } from "./Meshes/Fluid/FluidMesh.js";
import { MagmaMesh } from "./Meshes/Magma/MagmaMesh.js";
//materials
import { SolidMaterial } from "./Materials/Solid/SolidMaterial.js";
import { FloraMaterial } from "./Materials/Flora/FloraMaterial.js";
import { FluidMaterial } from "./Materials/Fluid/FluidMaterial.js";
import { MagmaMaterial } from "./Materials/Magma/MagmaMaterial.js";

export class RenderManager {
 shaderBuilder: ShaderBuilder = new ShaderBuilder();
 textureCreator: TextureCreator = new TextureCreator();

 animationManager: AnimationManager = new AnimationManager();

 solidMaterial: SolidMaterial = new SolidMaterial(this);
 floraMaterial: FloraMaterial = new FloraMaterial(this);
 fluidMaterial: FluidMaterial = new FluidMaterial(this);
 magmaMaterial: MagmaMaterial = new MagmaMaterial(this);

 solidMesh: SolidMesh = new SolidMesh(this.solidMaterial);
 floraMesh: FloraMesh = new FloraMesh(this.floraMaterial);
 fluidMesh: FluidMesh = new FluidMesh(this.fluidMaterial);
 magmaMesh: MagmaMesh = new MagmaMesh(this.magmaMaterial);

 constructor() {}

 reStart() {}

 setSunLevel(level: number) {
  this.solidMaterial.setSunLightLevel(level);
 }
 setBaseLevel(level: number) {
  this.solidMaterial.setBaseLevel(level);
 }
}
