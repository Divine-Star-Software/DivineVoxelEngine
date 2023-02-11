//built in
import { DVEMesh } from "./Meshes/DVEMesh.js";
//objects
import { AnimationManager } from "./Animations/AnimationManager.js";
import { FOManager } from "./FloatingOrigin/FoManager.js";
import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
//materials
import { SkyBoxMaterial } from "./Materials/SkyBox/SkyBoxMaterial.js";
import { StandardSolidMaterial } from "./Materials/Standard/SolidMaterial.bjsmp.js";
import { StandardLiquidMaterial } from "./Materials/Standard/LiquidMaterial.bjsmp.js";
import { MeshRegister } from "../Scene/MeshRegister.js";
import { MeshManager } from "../Scene/MeshManager.js";
import { MeshCuller } from "../Scene/MeshCuller.js";
import { DVEShaders } from "./Shaders/DVEShaders.js";
import { DVEMaterial } from "./Materials/DVEMaterial.js";
const solidMaterial = new DVEMaterial("#dve_solid", {
    alphaBlending: false,
    alphaTesting: true,
});
const solidMesh = new DVEMesh("#dve_solid", solidMaterial);
const floraMat = new DVEMaterial("#dve_flora", {
    alphaBlending: false,
    alphaTesting: true,
});
const floraMesh = new DVEMesh("#dve_flora", floraMat);
/* const magmaMat = new DVEMaterial("#dve_magma", {
 alphaBlending: false,
 alphaTesting: true,
});
const magmaMesh = new DVEMesh("#dve_magma", magmaMat); */
const liquidMat = new DVEMaterial("#dve_liquid", {
    alphaBlending: true,
    alphaTesting: false,
});
const liquidMesh = new DVEMesh("#dve_liquid", liquidMat);
export const RenderManager = {
    fogOptions: {
        mode: "volumetric",
        density: 0.0005,
        color: new BABYLON.Color3(1, 1, 1),
        volumetricOptions: {
            heightFactor: 0.25,
        },
    },
    meshRegister: MeshRegister,
    meshManager: MeshManager,
    meshCuller: MeshCuller,
    fogData: new BABYLON.Vector4(1, 0.1, 0.5, 0),
    effectOptions: {
        floraEffects: false,
        liquidEffects: false,
    },
    fo: FOManager,
    shaders: DVEShaders,
    animationManager: AnimationManager,
    solidMaterial: solidMaterial,
    floraMaterial: floraMat,
    liquidMaterial: liquidMat,
    solidMesh: solidMesh,
    floraMesh: floraMesh,
    liquidMesh: liquidMesh,
    solidStandardMaterial: StandardSolidMaterial,
    liquidStandardMaterial: StandardLiquidMaterial,
    skyBoxMaterial: SkyBoxMaterial,
    scene: null,
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
        if (this.fogOptions.mode == "volumetric") {
            this.fogData.x = 1;
        }
        if (this.fogOptions.mode == "animated-volumetric") {
            this.fogData.x = 2;
        }
        this.fogData.y = this.fogOptions.density;
        this.fogData.z = this.fogOptions.volumetricOptions.heightFactor;
        this.fogData = this.fogData;
        this._setFogData();
    },
    _setFogData() {
        const fogData = this.fogData;
        this.solidMaterial.updateFogOptions(fogData);
        this.liquidMaterial.updateFogOptions(fogData);
        this.floraMaterial.updateFogOptions(fogData);
        this.skyBoxMaterial.updateFogOptions(fogData);
    },
    $INIT(scene) {
        this.updateFogOptions(this.fogOptions);
        this._setFogData();
        this.scene = scene;
        this.meshManager.$INIT(scene);
        this.meshCuller.$INIT(scene);
    },
    updateShaderEffectOptions(options) {
        if (options.floraEffects !== undefined) {
            this.effectOptions.floraEffects = options.floraEffects;
        }
        if (options.liquidEffects !== undefined) {
            this.effectOptions.liquidEffects = options.liquidEffects;
        }
        this.solidMaterial.updateMaterialSettings(EngineSettings.settings);
        this.floraMaterial.updateMaterialSettings(EngineSettings.settings);
        this.liquidMaterial.updateMaterialSettings(EngineSettings.settings);
    },
    syncSettings(settings) {
        this.solidMesh.syncSettings(settings);
        this.floraMesh.syncSettings(settings);
        this.liquidMesh.syncSettings(settings);
        //this.magmaMesh.syncSettings(settings);
    },
    getScene() {
        return this.scene;
    },
    getDefaultCamera(scene) {
        const camera = new BABYLON.UniversalCamera("", BABYLON.Vector3.Zero(), scene);
        camera.touchAngularSensibility = 10000;
        camera.speed = 1;
        camera.keysUp.push(87); // W
        camera.keysDown.push(83); // D
        camera.keysLeft.push(65); // A
        camera.keysRight.push(68); // S
        camera.keysUpward.push(69); // E
        camera.keysDownward.push(81); // Q
        camera.minZ = 0.01;
        camera.maxZ = 1000;
        camera.fov = 1.2;
        camera.attachControl(scene.getEngine().getRenderingCanvas(), true);
        scene.activeCamera = camera;
        scene.collisionsEnabled = false;
        return camera;
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
        this.liquidMaterial.setSunLightLevel(level);
        this.floraMaterial.setSunLightLevel(level);
    },
    setBaseLevel(level) {
        this.solidMaterial.setBaseLevel(level);
        this.liquidMaterial.setBaseLevel(level);
        this.floraMaterial.setBaseLevel(level);
    },
};
