/// <reference types="babylonjs" />
export declare class SolidMaterialPlugin extends BABYLON.MaterialPluginBase {
    onUBSet: (uniformBuffer: BABYLON.UniformBuffer) => void;
    _texArray: BABYLON.RawTexture2DArray;
    _textureSet: boolean;
    ubof: any;
    constructor(material: BABYLON.StandardMaterial, texArray: BABYLON.RawTexture2DArray, onUBSet: (uniformBuffer: BABYLON.UniformBuffer) => void);
    prepareDefines(defines: Record<string, boolean>): void;
    getClassName(): string;
    getSamplers(samplers: string[]): void;
    getAttributes(attributes: string[]): void;
    getUniforms(): {
        ubo: {
            name: string;
            size: number;
            type: string;
        }[];
        fragment: string;
    };
    bindForSubMesh(uniformBuffer: BABYLON.UniformBuffer, scene: BABYLON.Scene): void;
    getCustomCode(shaderType: any): {
        CUSTOM_VERTEX_MAIN_BEGIN: string;
        CUSTOM_VERTEX_DEFINITIONS: string;
        CUSTOM_FRAGMENT_DEFINITIONS?: undefined;
        CUSTOM_FRAGMENT_MAIN_BEGIN?: undefined;
        "!baseColor\\=texture2D\\(diffuseSampler,vDiffuseUV\\+uvOffset\\);"?: undefined;
        "!info\\=computeLighting\\(viewDirectionW\\,normalW\\,light0\\.vLightData\\,light0\\.vLightDiffuse\\.rgb\\,light0\\.vLightSpecular\\.rgb\\,light0\\.vLightDiffuse\\.a\\,glossiness\\);"?: undefined;
        "!diffuseBase\\+\\=info\\.diffuse\\*shadow;"?: undefined;
        "!\\#define vBumpUV vMainUV1"?: undefined;
        "!vec3 finalDiffuse\\=clamp\\(diffuseBase\\*diffuseColor\\+emissiveColor\\+vAmbientColor\\,0\\.0\\,1\\.0\\)\\*baseColor\\.rgb;"?: undefined;
    } | {
        CUSTOM_FRAGMENT_DEFINITIONS: string;
        CUSTOM_FRAGMENT_MAIN_BEGIN: string;
        "!baseColor\\=texture2D\\(diffuseSampler,vDiffuseUV\\+uvOffset\\);": string;
        "!info\\=computeLighting\\(viewDirectionW\\,normalW\\,light0\\.vLightData\\,light0\\.vLightDiffuse\\.rgb\\,light0\\.vLightSpecular\\.rgb\\,light0\\.vLightDiffuse\\.a\\,glossiness\\);": string;
        "!diffuseBase\\+\\=info\\.diffuse\\*shadow;": string;
        "!\\#define vBumpUV vMainUV1": string;
        "!vec3 finalDiffuse\\=clamp\\(diffuseBase\\*diffuseColor\\+emissiveColor\\+vAmbientColor\\,0\\.0\\,1\\.0\\)\\*baseColor\\.rgb;": string;
        CUSTOM_VERTEX_MAIN_BEGIN?: undefined;
        CUSTOM_VERTEX_DEFINITIONS?: undefined;
    } | null;
}
export declare const StandardSolidMaterial: {
    material: BABYLON.StandardMaterial | null;
    plugin: SolidMaterialPlugin | null;
    $INIT(texture: BABYLON.RawTexture2DArray, scnee: BABYLON.Scene): void;
    getMaterial(): BABYLON.StandardMaterial;
};
