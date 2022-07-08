import { AnimationManager } from "./Animations/AnimationManager.js";
import { ShaderBuilder } from "./Shaders/ShaderBuilder.js";
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
export const RenderManager = {
    shaderBuilder: ShaderBuilder,
    textureCreator: TextureCreator,
    animationManager: AnimationManager,
    solidMaterial: SolidMaterial,
    floraMaterial: FloraMaterial,
    fluidMaterial: FluidMaterial,
    magmaMaterial: MagmaMaterial,
    solidMesh: SolidMesh,
    floraMesh: FloraMesh,
    fluidMesh: FluidMesh,
    magmaMesh: MagmaMesh,
    scene: null,
    reStart() { },
    setScene(scene) {
        this.scene = scene;
    },
    syncSettings(settings) {
        this.solidMesh.syncSettings(settings);
        this.floraMesh.syncSettings(settings);
        this.fluidMesh.syncSettings(settings);
        this.magmaMesh.syncSettings(settings);
    },
    getScene() {
        return this.scene;
    },
    setSunLevel(level) {
        this.solidMaterial.setSunLightLevel(level);
        this.fluidMaterial.setSunLightLevel(level);
        this.floraMaterial.setSunLightLevel(level);
    },
    setBaseLevel(level) {
        this.solidMaterial.setBaseLevel(level);
        this.fluidMaterial.setBaseLevel(level);
        this.floraMaterial.setBaseLevel(level);
    },
};
