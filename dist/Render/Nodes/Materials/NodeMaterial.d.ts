import type { Engine, Scene, ShaderMaterial, Vector4 } from "@babylonjs/core";
import { NodeMaterialData } from "../types/RenderNode.types.js";
import { DivineShader } from "divine-shaders";
export declare class NodeMaterial {
    data: NodeMaterialData;
    material: ShaderMaterial;
    scene: Scene;
    engine: Engine;
    time: number;
    id: string;
    shader: DivineShader;
    constructor(data: NodeMaterialData);
    getMaterial(): ShaderMaterial;
    updateFogOptions(data: Vector4): void;
    setSunLightLevel(level: number): void;
    setBaseLevel(level: number): void;
    createMaterial(): ShaderMaterial | false;
    overrideMaterial(material: any): void;
    updateUniforms(): void;
    runEffects(): void;
}
