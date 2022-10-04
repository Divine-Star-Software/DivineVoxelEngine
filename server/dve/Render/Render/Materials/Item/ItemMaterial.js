import { DVER } from "../../../DivineVoxelEngineRender.js";
export const ItemMaterial = {
    material: null,
    context: null,
    time: 0,
    updateFogOptions(data) {
        if (!this.material)
            return;
        this.material.setVector4("fogOptions", data);
    },
    getMaterial() {
        return this.material;
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
    createMaterial(data) {
        const animData = DVER.renderManager.animationManager.registerAnimations("Item", data.animations, data.animationTimes);
        const overlayAnimData = DVER.renderManager.animationManager.registerAnimations("Item", data.overlayAnimations, data.overlayAnimationTimes, true);
        BABYLON.Effect.ShadersStore["itemVertexShader"] =
            DVER.renderManager.shaderBuilder.buildItemVertexShader(animData.uniformRegisterCode, animData.animationFunctionCode, overlayAnimData.uniformRegisterCode, overlayAnimData.animationFunctionCode);
        BABYLON.Effect.ShadersStore["itemFragmentShader"] =
            DVER.renderManager.shaderBuilder.buildItemFragmentShader();
        const shaderMaterial = new BABYLON.ShaderMaterial("item", data.scene, "item", {
            attributes: [
                "position",
                "normal",
                "faceData",
                "ocuv3",
                "cuv3",
                "aoColors",
                "colors",
                "rgbLightColors",
                "sunLightColors",
            ],
            uniforms: [
                "world",
                "view",
                "cameraPosition",
                "viewProjection",
                "worldView",
                "worldViewProjection",
                "vFogInfos",
                "vFogColor",
                "sunLightLevel",
                "baseLevel",
                "projection",
                "arrayTex",
                "doAO",
                "doSun",
                "doRGB",
                "doColor",
                "time",
                "fogOptions",
                ...animData.uniforms,
                ...overlayAnimData.uniforms,
            ],
            needAlphaBlending: false,
            needAlphaTesting: true,
        });
        this.material = shaderMaterial;
        //this.material.forceDepthWrite = true;
        this.material.fogEnabled = true;
        data.texture.hasAlpha = true;
        this.material.setTexture("arrayTex", data.texture);
        this.material.setFloat("sunLightLevel", 1);
        this.material.setFloat("baseLevel", 0.1);
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
        this.updateMaterialSettings(data.settings);
        DVER.renderManager.animationManager.registerMaterial("solid", this.material);
        /*   let time = 0;
          data.scene.registerBeforeRender(function () {
           time += 0.005;
           shaderMaterial.setFloat("time", time);
          }); */
        return this.material;
    },
    overrideMaterial(material) {
        this.material = material;
    },
    runEffects() {
        if (DVER.renderManager.fogOptions.mode != "animated-volumetric")
            return;
        if (!this.material)
            return;
        this.time += 0.005;
        this.material.setFloat("time", this.time);
    },
};
