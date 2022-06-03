/// <reference types="babylonjs" />
declare class BlackAndWhitePluginMaterial extends BABYLON.MaterialPluginBase {
    constructor(material: BABYLON.StandardMaterial);
    prepareDefines(defines: any, scene: any, mesh: any): void;
    getClassName(): string;
    getCustomCode(shaderType: any): {
        CUSTOM_FRAGMENT_MAIN_END: string;
    } | null;
}
