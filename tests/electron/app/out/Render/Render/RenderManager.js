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
import { StandardSolidMaterial } from "./Materials/Solid/Standard/SolidMaterial.bjsmp.js";
import { StandardFluidMaterial } from "./Materials/Fluid/Standard/FluidMaterial.bjsmp.js";
export const RenderManager = {
    fogOptions: {
        mode: "volumetric",
        density: 0.0002,
        color: new BABYLON.Color3(1, 1, 1),
        volumetricOptions: {
            heightFactor: 0.25,
        },
    },
    fogData: new BABYLON.Vector4(1, .1, 0.5, 0),
    effectOptions: {
        floraEffects: false,
        fluidEffects: false,
    },
    shaderBuilder: ShaderBuilder,
    textureCreator: TextureCreator,
    animationManager: AnimationManager,
    solidMaterial: SolidMaterial,
    floraMaterial: FloraMaterial,
    fluidMaterial: FluidMaterial,
    magmaMaterial: MagmaMaterial,
    itemMaterial: ItemMaterial,
    solidStandardMaterial: StandardSolidMaterial,
    fluidStandardMaterial: StandardFluidMaterial,
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
    updateFogOptions(options) {
        for (const key of Object.keys(options)) {
            //@ts-ignore
            const data = options[key];
            if (typeof data == "object") {
                for (const key2 of Object.keys(data)) {
                    const data2 = data[key2];
                    this.fogOptions[key][key2] = data2;
                }
            }
            else {
                this.fogOptions[key] = data;
            }
        }
        if (options.color && this.scene) {
            //@ts-ignore
            this.scene.fogColor = options.color;
        }
        const fogData = new BABYLON.Vector4(0, 0, 0, 0);
        if (this.fogOptions.mode == "volumetric") {
            fogData.x = 1;
        }
        if (this.fogOptions.mode == "animated-volumetric") {
            fogData.x = 2;
        }
        fogData.y = this.fogOptions.density;
        fogData.z = this.fogOptions.volumetricOptions.heightFactor;
        this.fogData = fogData;
    },
    _setFogData() {
        const fogData = this.fogData;
        this.solidMaterial.updateFogOptions(fogData);
        this.fluidMaterial.updateFogOptions(fogData);
        this.floraMaterial.updateFogOptions(fogData);
        this.magmaMaterial.updateFogOptions(fogData);
        this.itemMaterial.updateFogOptions(fogData);
        this.skyBoxMaterial.updateFogOptions(fogData);
    },
    $INIT() {
        this.updateFogOptions(this.fogOptions);
        this._setFogData();
    },
    updateShaderEffectOptions(options) {
        if (options.floraEffects !== undefined) {
            this.effectOptions.floraEffects = options.floraEffects;
        }
        if (options.fluidEffects !== undefined) {
            this.effectOptions.fluidEffects = options.fluidEffects;
        }
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
