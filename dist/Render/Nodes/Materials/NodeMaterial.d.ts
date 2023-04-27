import type { Scene, ShaderMaterial, Vector4 } from "@babylonjs/core";
import { NodeMaterialData } from "../types/RenderNode.types.js";
import { DivineShader } from "divine-shaders";
export declare class NodeMaterial {
    data: NodeMaterialData;
    material: ShaderMaterial;
    scene: Scene;
    time: number;
    id: string;
    shader: DivineShader;
    afterCreate: ((material: ShaderMaterial) => void)[];
    constructor(data: NodeMaterialData);
    getMaterial(): ShaderMaterial;
    updateFogOptions(data: Vector4): void;
    setSunLightLevel(level: number): void;
    setBaseLevel(level: number): void;
    _build(scene: Scene): false | undefined;
    reBuild(): void;
    createMaterial(scene: Scene): ShaderMaterial | false;
    overrideMaterial(material: any): void;
    updateUniforms(): void;
    runEffects(): void;
}
