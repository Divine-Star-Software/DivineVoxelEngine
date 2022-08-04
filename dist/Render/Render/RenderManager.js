//objects
import { AnimationManager } from "./Animations/AnimationManager.js";
import { ShaderBuilder } from "./Shaders/ShaderBuilder.js";
import { TextureCreator } from "./Textures/TextureCreator.js";
//meshes
import { SolidMesh } from "./Meshes/Solid/SolidMesh.js";
import { FloraMesh } from "./Meshes/Flora/FloraMesh.js";
import { FluidMesh } from "./Meshes/Fluid/FluidMesh.js";
import { MagmaMesh } from "./Meshes/Magma/MagmaMesh.js";
import { ItemMesh } from "./Meshes/Item/ItemMesh.js";
//materials
import { SolidMaterial } from "./Materials/Solid/SolidMaterial.js";
import { FloraMaterial } from "./Materials/Flora/FloraMaterial.js";
import { FluidMaterial } from "./Materials/Fluid/FluidMaterial.js";
import { MagmaMaterial } from "./Materials/Magma/MagmaMaterial.js";
import { SkyBoxMaterial } from "./Materials/SkyBox/SkyBoxMaterial.js";
import { ItemMaterial } from "./Materials/Item/ItemMaterial.js";
export const RenderManager = {
    shaderBuilder: ShaderBuilder,
    textureCreator: TextureCreator,
    animationManager: AnimationManager,
    solidMaterial: SolidMaterial,
    floraMaterial: FloraMaterial,
    fluidMaterial: FluidMaterial,
    magmaMaterial: MagmaMaterial,
    itemMaterial: ItemMaterial,
    skyBoxMaterial: SkyBoxMaterial,
    solidMesh: SolidMesh,
    floraMesh: FloraMesh,
    fluidMesh: FluidMesh,
    magmaMesh: MagmaMesh,
    itemMesh: ItemMesh,
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
        this.itemMesh.syncSettings(settings);
    },
    getScene() {
        return this.scene;
    },
    createSkyBoxMaterial(scene) {
        if (!this.scene && !scene) {
            throw new Error(`Must set a scene first.`);
        }
        if (!this.scene && scene) {
            this.skyBoxMaterial.createMaterial(scene);
        }
        if (this.scene && !scene) {
            this.skyBoxMaterial.createMaterial(this.scene);
        }
        return this.skyBoxMaterial.getMaterial();
    },
    setSunLevel(level) {
        this.solidMaterial.setSunLightLevel(level);
        this.fluidMaterial.setSunLightLevel(level);
        this.floraMaterial.setSunLightLevel(level);
        this.itemMaterial.setSunLightLevel(level);
    },
    setBaseLevel(level) {
        this.solidMaterial.setBaseLevel(level);
        this.fluidMaterial.setBaseLevel(level);
        this.floraMaterial.setBaseLevel(level);
        this.itemMaterial.setBaseLevel(level);
    },
};
