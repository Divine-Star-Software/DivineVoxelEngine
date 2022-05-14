export class FluidMaterial {
    renderManager;
    material;
    context;
    constructor(renderManager) {
        this.renderManager = renderManager;
    }
    getMaterial() {
        return this.material;
    }
    setSunLightLevel(level) {
        if (!this.material) {
            throw new Error("Material must be created first before it can be updated.");
        }
        this.material.setFloat("sunLightLevel", level);
    }
    setBaseLevel(level) {
        if (!this.material) {
            throw new Error("Material must be created first before it can be updated.");
        }
        this.material.setFloat("baseLevel", level);
    }
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
    }
    createMaterial(settings, scene, texture, animations, animationTimes) {
        const animData = this.renderManager.animationManager.registerAnimations("fluid", animations, animationTimes);
        BABYLON.Effect.ShadersStore["fluidVertexShader"] =
            this.renderManager.shaderBuilder.getDefaultVertexShader("fluid", animData.uniformRegisterCode, animData.animationFunctionCode);
        BABYLON.Effect.ShadersStore["fluidFragmentShader"] =
            this.renderManager.shaderBuilder.getDefaultFragmentShader("fluid");
        const shaderMaterial = new BABYLON.ShaderMaterial("fluid", scene, "fluid", {
            attributes: [
                "position",
                "normal",
                "cuv3",
                "colors",
                "rgbLightColors",
                "sunLightColors",
            ],
            uniforms: [
                "world",
                "view",
                "viewProjection",
                "worldView",
                "worldMatrix",
                "worldViewProjection",
                "vFogInfos",
                "vFogColor",
                "sunLightLevel",
                "baseLevel",
                "projection",
                "arrayTex",
                "doSun",
                "doRGB",
                "doColor",
                "time",
                ...animData.uniforms,
            ],
            needAlphaBlending: true,
            needAlphaTesting: false,
        });
        this.material = shaderMaterial;
        shaderMaterial.setTexture("arrayTex", texture);
        this.material.setFloat("sunLightLevel", 1);
        this.material.setFloat("baseLevel", 0.1);
        shaderMaterial.needDepthPrePass = true;
        shaderMaterial.onBind = (mesh) => {
            var effect = shaderMaterial.getEffect();
            if (!effect)
                return;
            effect.setFloat4("vFogInfos", scene.fogMode, scene.fogStart, scene.fogEnd, scene.fogDensity);
            effect.setColor3("vFogColor", scene.fogColor);
            //  effect.setColor4("baseLightColor", new BABYLON.Color3(0.5, 0.5, 0.5), 1);
        };
        this.updateMaterialSettings(settings);
        let time = 0;
        scene.registerBeforeRender(function () {
            time += 0.005;
            shaderMaterial.setFloat("time", time);
        });
        this.renderManager.animationManager.registerMaterial("fluid", shaderMaterial);
        return this.material;
    }
}
