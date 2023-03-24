import { TextureManager } from "../../Textures/TextureManager.js";
import { DVEBabylon } from "../../Babylon/DVEBabylon.js";
import { RenderManager } from "../../Render/RenderManager.js";
import { NodeManager } from "../NodeManager.js";
export class NodeMaterial {
    data;
    material;
    scene;
    engine;
    time = 0;
    id = "";
    shader;
    constructor(data) {
        this.data = data;
        this.id = this.data.id;
    }
    getMaterial() {
        return this.material;
    }
    updateFogOptions(data) {
        if (!this.material)
            return;
        this.material.setVector4("fogOptions", data);
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
    createMaterial() {
        this.scene = RenderManager.scene;
        this.engine = this.scene.getEngine();
        const type = TextureManager.getTextureType(this.id);
        if (!type) {
            throw new Error(`${this.id} is not a valid texture type`);
        }
        const scene = RenderManager.scene;
        const shader = NodeManager.shaders.get(this.data.id);
        if (!shader)
            return false;
        type.addToShader(shader);
        this.shader = shader;
        shader.compile();
        DVEBabylon.system.Effect.ShadersStore[`${this.id}VertexShader`] =
            shader.compiled.vertex;
        DVEBabylon.system.Effect.ShadersStore[`${this.id}FragmentShader`] =
            shader.compiled.fragment;
        const shaderMaterial = new DVEBabylon.system.ShaderMaterial(this.id, scene, this.id, {
            attributes: shader.getAttributeList(),
            uniforms: shader.getUniformList(),
            needAlphaBlending: this.data.alphaBlending,
            needAlphaTesting: this.data.alphaTesting,
        });
        this.material = shaderMaterial;
        this.material.fogEnabled = true;
        if (this.data.alphaBlending) {
            shaderMaterial.separateCullingPass = true;
            shaderMaterial.backFaceCulling = false;
            shaderMaterial.forceDepthWrite = true;
            shaderMaterial.needDepthPrePass = true;
            //   shaderMaterial.stencil.enabled = true;
            //  shaderMaterial.stencil.func = DVEBabylon.system.Engine.NOTEQUAL;
        }
        //@ts-ignore
        type.addToMaterial(this);
        shaderMaterial.setVector3("worldOrigin", DVEBabylon.system.Vector3.Zero());
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
    }
    overrideMaterial(material) {
        this.material = material;
    }
    updateUniforms() {
        if (RenderManager.fo.activeNode) {
            this.material.setVector3("worldOrigin", RenderManager.fo.activeNode.position);
        }
    }
    runEffects() {
        // if (DVER.render.fogOptions.mode != "animated-volumetric") return;
        if (!this.material)
            return;
        this.time += 0.005;
        this.material.setFloat("time", this.time);
    }
}
