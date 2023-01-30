import { DVEShaders } from "../../Shaders/DVEShaders.js";
import { DVER } from "../../../DivineVoxelEngineRender.js";
export const SkyBoxMaterial = {
    material: null,
    time: 0,
    getMaterial() {
        return this.material;
    },
    updateFogOptions(data) {
        if (!this.material)
            return;
        this.material.setVector4("fogOptions", data);
    },
    setSunLightLevel(level) {
        if (!this.material) {
            throw new Error("Material must be created first before it can be updated.");
        }
        this.material.setFloat("sunLightLevel", level);
    },
    setBaseLevel(level) {
        if (!this.material) {
            throw new Error("Material must be created first before it can be updated.");
        }
        this.material.setFloat("baseLevel", level);
    },
    updateMaterialSettings(settings) {
        if (!this.material) {
            throw new Error("Material must be created first before it can be updated.");
        }
        if (settings.lighting?.doAO) {
            this.material.setFloat("doAO", 1.0);
        }
        else {
            this.material.setFloat("doAO", 0.0);
        }
        if (settings.lighting?.doSunLight) {
            this.material.setFloat("doSun", 1.0);
        }
        else {
            this.material.setFloat("doSun", 0.0);
        }
        if (settings.lighting?.doRGBLight) {
            this.material.setFloat("doRGB", 1.0);
        }
        else {
            this.material.setFloat("doRGB", 0.0);
        }
        if (settings.voxels?.doColors) {
            this.material.setFloat("doColor", 1.0);
        }
        else {
            this.material.setFloat("doColor", 0.0);
        }
    },
    createMaterial(scene) {
        const shader = DVEShaders.createSkyBoxShader("skybox");
        shader.compile();
        BABYLON.Effect.ShadersStore["skyboxVertexShader"] = shader.compiled.vertex;
        BABYLON.Effect.ShadersStore["skyboxFragmentShader"] =
            shader.compiled.fragment;
        const shaderMaterial = new BABYLON.ShaderMaterial("skybox", scene, "skybox", {
            attributes: shader.getAttributeList(),
            uniforms: shader.getUniformList(),
            needAlphaBlending: false,
            needAlphaTesting: true,
        });
        shaderMaterial.backFaceCulling = false;
        this.material = shaderMaterial;
        //this.material.forceDepthWrite = true;
        this.material.fogEnabled = true;
        this.material.onBind = (mesh) => {
            if (!this.material)
                return;
            const effect = this.material.getEffect();
            const scene = mesh.getScene();
            if (!effect)
                return;
            effect.setFloat4("vFogInfos", scene.fogMode, scene.fogStart, scene.fogEnd, scene.fogDensity);
            effect.setColor3("vFogColor", scene.fogColor);
        };
        return this.material;
    },
    overrideMaterial(material) {
        this.material = material;
    },
    runEffects() {
        if (DVER.render.fogOptions.mode != "animated-volumetric")
            return;
        if (!this.material)
            return;
        this.time += 0.005;
        this.material.setFloat("time", this.time);
    },
};
