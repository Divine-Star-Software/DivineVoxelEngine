/// <reference types="babylonjs" />
import type { EngineSettingsData, RecursivePartial } from "Meta/index.js";
import { DVEMesh } from "./Meshes/DVEMesh.js";
import { DVEMaterial } from "./Materials/DVEMaterial.js";
import { RenderFogOptions, RenderEffectsOptions } from "Meta/Render/Render/Render.options.types.js";
export declare const RenderManager: {
    fogOptions: RenderFogOptions;
    fogData: BABYLON.Vector4;
    effectOptions: RenderEffectsOptions;
    shaderBuilder: {
        buildVertexShader(data: import("../../Meta/Render/Shaders/Shader.types.js").VertexShaderCreateData, setPosition: string, doAO?: boolean, vars?: string): string;
        buildFragmentShader(fragMain: string, doAO?: boolean, vars?: string): string;
        getDefaultVertexShader(voxelSubstance: import("Meta/index.js").VoxelTemplateSubstanceType | "Item", data: import("../../Meta/Render/Shaders/Shader.types.js").VertexShaderCreateData): string;
        getDefaultFragmentShader(voxelSubstance: import("Meta/index.js").VoxelTemplateSubstanceType | "Item"): string;
        getSkyBoxVertexShader(): string;
        getSkyBoxFragmentShader(): string;
    };
    textureCreator: {
        context: CanvasRenderingContext2D | null;
        imgWidth: number;
        imgHeight: number;
        _mipMapSizes: number[][];
        defineTextureDimensions(width: number, height: number): void;
        setUpImageCreation(): void;
        createMaterialTexture(name: string, scene: BABYLON.Scene, images: string[], width?: number, height?: number): Promise<BABYLON.RawTexture2DArray[]>;
        _createTextures(name: string, scene: BABYLON.Scene, images: string[], width: number, height: number): Promise<BABYLON.RawTexture2DArray>;
        _loadImages(imgPath: string, width: number, height: number): Promise<Uint8ClampedArray>;
        _combineImageData(totalLength: number, arrays: Uint8ClampedArray[]): Uint8ClampedArray;
    };
    animationManager: {
        animatedMaterials: Record<import("Meta/index.js").VoxelSubstanceType | "Item", BABYLON.ShaderMaterial>;
        animCount: number;
        animations: {
            uniformShaderId: string;
            keys: number[];
            currentFrame: number;
            currentCount: number;
            keyCounts: number[];
            substance: import("Meta/index.js").VoxelSubstanceType | "Item";
        }[];
        registerAnimations(voxelSubstanceType: import("Meta/index.js").VoxelSubstanceType | "Item", animations: number[][], animationTimes: number[][], overlay?: boolean): import("../../Meta/Render/Animations/Animation.types.js").ShaderAnimationData;
        registerMaterial(voxelSubstanceType: import("Meta/index.js").VoxelSubstanceType | "Item", material: BABYLON.ShaderMaterial): void;
        startAnimations(): void;
    };
    solidMaterial: DVEMaterial;
    floraMaterial: DVEMaterial;
    liquidMaterial: DVEMaterial;
    magmaMaterial: DVEMaterial;
    itemMaterial: DVEMaterial;
    solidMesh: DVEMesh;
    floraMesh: DVEMesh;
    liquidMesh: DVEMesh;
    magmaMesh: DVEMesh;
    itemMesh: DVEMesh;
    solidStandardMaterial: {
        material: BABYLON.StandardMaterial | null;
        plugin: import("./Materials/Standard/SolidMaterial.bjsmp.js").SolidMaterialPlugin | null;
        $INIT(texture: BABYLON.RawTexture2DArray, scnee: BABYLON.Scene): void;
        getMaterial(): BABYLON.StandardMaterial;
    };
    liquidStandardMaterial: {
        material: BABYLON.StandardMaterial | null;
        reflectionprobe: BABYLON.RenderTargetTexture | null;
        plugin: import("./Materials/Standard/LiquidMaterial.bjsmp.js").LiquidMaterialPlugin | null;
        $INIT(texture: BABYLON.RawTexture2DArray, scene: BABYLON.Scene): void;
        getMaterial(): BABYLON.StandardMaterial;
        addToRenderList(mesh: BABYLON.Mesh): void;
    };
    skyBoxMaterial: {
        material: BABYLON.ShaderMaterial | null;
        time: number;
        getMaterial(): BABYLON.ShaderMaterial | null;
        updateFogOptions(data: BABYLON.Vector4): void;
        setSunLightLevel(level: number): void;
        setBaseLevel(level: number): void;
        updateMaterialSettings(settings: EngineSettingsData): void;
        createMaterial(scene: BABYLON.Scene): BABYLON.ShaderMaterial;
        overrideMaterial(material: any): void;
        runEffects(): void;
    };
    scene: BABYLON.Scene | null;
    reStart(): void;
    setScene(scene: BABYLON.Scene): void;
    updateFogOptions(options: RecursivePartial<RenderFogOptions>): void;
    _setFogData(): void;
    $INIT(): void;
    updateShaderEffectOptions(options: RecursivePartial<RenderEffectsOptions>): void;
    syncSettings(settings: EngineSettingsData): void;
    getScene(): BABYLON.Scene | null;
    createSkyBoxMaterial(scene?: BABYLON.Scene): BABYLON.ShaderMaterial | null;
    setSunLevel(level: number): void;
    setBaseLevel(level: number): void;
};
