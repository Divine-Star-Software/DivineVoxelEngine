import { DVER } from "../../../DivineVoxelEngineRender.js";
export const MagmaMaterial = {
    material: null,
    getMaterial() {
        return this.material;
    },
    time: 0,
    updateFogOptions(data) {
        if (!this.material)
            return;
        this.material.setVector4("fogOptions", data);
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
        const animData = DVER.renderManager.animationManager.registerAnimations("magma", data.animations, data.animationTimes);
        const overlayAnimData = DVER.renderManager.animationManager.registerAnimations("magma", data.overlayAnimations, data.overlayAnimationTimes, true);
        BABYLON.Effect.ShadersStore["magmaVertexShader"] =
            DVER.renderManager.shaderBuilder.getDefaultVertexShader("magma", animData.uniformRegisterCode, animData.animationFunctionCode, overlayAnimData.uniformRegisterCode, overlayAnimData.animationFunctionCode);
        BABYLON.Effect.ShadersStore["magmaFragmentShader"] =
            DVER.renderManager.shaderBuilder.getDefaultFragmentShader("magma");
        const shaderMaterial = new BABYLON.ShaderMaterial("magma", data.scene, "magma", {
            attributes: [
                "position",
                "normal",
                "faceData",
                "ocuv3",
                "cuv3",
                "colors",
                "rgbLightColors",
            ],
            uniforms: [
                "world",
                "view",
                "viewProjection",
                "worldView",
                "worldViewProjection",
                "vFogInfos",
                "cameraPosition",
                "vFogColor",
                "baseLightColor",
                "projection",
                "anim1Index",
                "arrayTex",
                "fogOptions",
                ...animData.uniforms,
                ...overlayAnimData.uniforms,
            ],
            needAlphaBlending: true,
            needAlphaTesting: false,
        });
        shaderMaterial.fogEnabled = true;
        shaderMaterial.setTexture("arrayTex", data.texture);
        shaderMaterial.needDepthPrePass = true;
        shaderMaterial.onBind = (mesh) => {
            const effect = shaderMaterial.getEffect();
            const scene = mesh.getScene();
            if (!effect)
                return;
            effect.setFloat4("vFogInfos", scene.fogMode, scene.fogStart, scene.fogEnd, scene.fogDensity);
            effect.setColor3("vFogColor", scene.fogColor);
            effect.setColor4("baseLightColor", new BABYLON.Color3(0.5, 0.5, 0.5), 1);
        };
        this.material = shaderMaterial;
        DVER.renderManager.animationManager.registerMaterial("magma", shaderMaterial);
        return this.material;
    },
    runEffects() {
        if (!this.material)
            return;
        this.time += 0.005;
        this.material.setFloat("time", this.time);
    },
};
