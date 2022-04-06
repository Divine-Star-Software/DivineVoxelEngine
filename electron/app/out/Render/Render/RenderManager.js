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
    shaderBuilder = new ShaderBuilder();
    textureCreator = new TextureCreator();
    animationManager = new AnimationManager();
    solidMaterial = new SolidMaterial(this);
    floraMaterial = new FloraMaterial(this);
    fluidMaterial = new FluidMaterial(this);
    magmaMaterial = new MagmaMaterial(this);
    solidMesh = new SolidMesh(this.solidMaterial);
    floraMesh = new FloraMesh(this.floraMaterial);
    fluidMesh = new FluidMesh(this.fluidMaterial);
    magmaMesh = new MagmaMesh(this.magmaMaterial);
    constructor() { }
    reStart() { }
    setSunLevel(level) {
        this.solidMaterial.setSunLightLevel(level);
        this.fluidMaterial.setSunLightLevel(level);
    }
    setBaseLevel(level) {
        this.solidMaterial.setBaseLevel(level);
        this.fluidMaterial.setBaseLevel(level);
    }
}
