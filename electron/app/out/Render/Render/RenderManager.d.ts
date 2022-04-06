import { AnimationManager } from "./Materials/Animations/AnimationManager.js";
import { ShaderBuilder } from "./Materials/ShaderBuilder/ShaderBuilder.js";
import { TextureCreator } from "./Textures/TextureCreator.js";
import { SolidMesh } from "./Meshes/Solid/SolidMesh.js";
import { FloraMesh } from "./Meshes/Flora/FloraMesh.js";
import { FluidMesh } from "./Meshes/Fluid/FluidMesh.js";
import { MagmaMesh } from "./Meshes/Magma/MagmaMesh.js";
import { SolidMaterial } from "./Materials/Solid/SolidMaterial.js";
import { FloraMaterial } from "./Materials/Flora/FloraMaterial.js";
import { FluidMaterial } from "./Materials/Fluid/FluidMaterial.js";
import { MagmaMaterial } from "./Materials/Magma/MagmaMaterial.js";
export declare class RenderManager {
    shaderBuilder: ShaderBuilder;
    textureCreator: TextureCreator;
    animationManager: AnimationManager;
    solidMaterial: SolidMaterial;
    floraMaterial: FloraMaterial;
    fluidMaterial: FluidMaterial;
    magmaMaterial: MagmaMaterial;
    solidMesh: SolidMesh;
    floraMesh: FloraMesh;
    fluidMesh: FluidMesh;
    magmaMesh: MagmaMesh;
    constructor();
    reStart(): void;
    setSunLevel(level: number): void;
    setBaseLevel(level: number): void;
}
