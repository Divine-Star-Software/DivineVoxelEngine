import { DVER } from "../../../DivineVoxelEngineRender.js";
export const FluidMaterial = {
    material: null,
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
        const animData = DVER.renderManager.animationManager.registerAnimations("fluid", data.animations, data.animationTimes);
        const overlayAnimData = DVER.renderManager.animationManager.registerAnimations("fluid", data.overlayAnimations, data.overlayAnimationTimes, true);
        BABYLON.Effect.ShadersStore["fluidVertexShader"] =
            DVER.renderManager.shaderBuilder.getDefaultVertexShader("fluid", animData.uniformRegisterCode, animData.animationFunctionCode, overlayAnimData.uniformRegisterCode, overlayAnimData.animationFunctionCode);
        BABYLON.Effect.ShadersStore["fluidFragmentShader"] =
            DVER.renderManager.shaderBuilder.getDefaultFragmentShader("fluid");
        const shaderMaterial = new BABYLON.ShaderMaterial("fluid", data.scene, "fluid", {
            attributes: [
                "position",
                "normal",
                "faceData",
                "ocuv3",
                "cuv3",
                "colors",
                "rgbLightColors",
                "sunLightColors",
            ],
            uniforms: [
                "world",
                "view",
                "viewProjection",
                "cameraPosition",
                "worldView",
                "worldMatrix",
                "worldViewProjection",
                "vFogInfos",
                "vFogColor",
                "sunLightLevel",
                "baseLevel",
                "projection",
                "arrayTex",
                "overlayTex",
                "doSun",
                "doRGB",
                "doColor",
                "time",
                ...animData.uniforms,
                ...overlayAnimData.uniforms,
            ],
            needAlphaBlending: true,
            needAlphaTesting: false,
        });
        data.texture.hasAlpha = true;
        this.material = shaderMaterial;
        // shaderMaterial.needDepthPrePass = true;
        shaderMaterial.separateCullingPass = true;
        shaderMaterial.backFaceCulling = false;
        shaderMaterial.forceDepthWrite = true;
        shaderMaterial.setTexture("arrayTex", data.texture);
        shaderMaterial.setTexture("overlayTex", data.overlayTexture);
        shaderMaterial.setFloat("sunLightLevel", 1);
        shaderMaterial.setFloat("baseLevel", 0.1);
        shaderMaterial.onBind = (mesh) => {
            const effect = shaderMaterial.getEffect();
            const scene = mesh.getScene();
            if (!effect)
                return;
            effect.setFloat4("vFogInfos", scene.fogMode, scene.fogStart, scene.fogEnd, scene.fogDensity);
            effect.setColor3("vFogColor", scene.fogColor);
            //  effect.setColor4("baseLightColor", new BABYLON.Color3(0.5, 0.5, 0.5), 1);
        };
        this.updateMaterialSettings(data.settings);
        let time = 0;
        data.scene.registerBeforeRender(function () {
            time += 0.005;
            shaderMaterial.setFloat("time", time);
        });
        DVER.renderManager.animationManager.registerMaterial("fluid", shaderMaterial);
        return this.material;
    },
};
