import { DVER } from "../../../DivineVoxelEngineRender.js";
export const FloraMaterial = {
    material: null,
    context: null,
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
    createMaterial(settings, scene, texture, animations, animationTimes) {
        const animData = DVER.renderManager.animationManager.registerAnimations("flora", animations, animationTimes);
        BABYLON.Effect.ShadersStore["floraVertexShader"] =
            DVER.renderManager.shaderBuilder.getDefaultVertexShader("flora", animData.uniformRegisterCode, animData.animationFunctionCode);
        BABYLON.Effect.ShadersStore["floraFragmentShader"] =
            DVER.renderManager.shaderBuilder.getDefaultFragmentShader("flora");
        const shaderMaterial = new BABYLON.ShaderMaterial("flora", scene, "flora", {
            attributes: [
                "position",
                "normal",
                "cuv3",
                "aoColors",
                "colors",
                "rgbLightColors",
                "sunLightColors",
            ],
            uniforms: [
                "world",
                "view",
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
                ...animData.uniforms,
            ],
            needAlphaBlending: false,
            needAlphaTesting: true,
        });
        shaderMaterial.fogEnabled = true;
        texture.hasAlpha = true;
        shaderMaterial.setTexture("arrayTex", texture);
        shaderMaterial.alphaMode = BABYLON.Engine.ALPHA_COMBINE;
        shaderMaterial.backFaceCulling = false;
        // shaderMaterial.separateCullingPass = false;
        // shaderMaterial.needDepthPrePass = true;
        shaderMaterial.onBind = (mesh) => {
            const effect = shaderMaterial.getEffect();
            if (!effect)
                return;
            effect.setFloat4("vFogInfos", scene.fogMode, scene.fogStart, scene.fogEnd, scene.fogDensity);
            effect.setColor3("vFogColor", scene.fogColor);
            effect.setColor4("baseLightColor", new BABYLON.Color3(0.5, 0.5, 0.5), 1);
        };
        let time = 0;
        scene.registerBeforeRender(function () {
            time += 0.08;
            shaderMaterial.setFloat("time", time);
        });
        this.material = shaderMaterial;
        DVER.renderManager.animationManager.registerMaterial("magma", shaderMaterial);
        this.updateMaterialSettings(settings);
        return this.material;
    },
};
