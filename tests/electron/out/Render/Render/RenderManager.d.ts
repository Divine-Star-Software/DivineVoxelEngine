/// <reference types="babylonjs" />
import type { EngineSettingsData, RecursivePartial } from "Meta/index.js";
import { RenderFogOptions, RenderEffectsOptions } from "Meta/Render/Render/Render.options.types.js";
export declare const RenderManager: {
    fogOptions: RenderFogOptions;
    fogData: BABYLON.Vector4;
    effectOptions: RenderEffectsOptions;
    shaderBuilder: {
        buildFloraVertexShader(uniformRegister?: string, animationFunction?: string, overlayUniformRegister?: string, overlayAnimationFunction?: string): string;
        buildFluidVertexShader(uniformRegister?: string, animationFunction?: string, overlayUniformRegister?: string, overlayAnimationFunction?: string): string;
        buildSolidVertexShader(uniformRegister?: string, animationFunction?: string, overlayUniformRegister?: string, overlayAnimationFunction?: string): string;
        buildItemVertexShader(uniformRegister?: string, animationFunction?: string, overlayUniformRegister?: string, overlayAnimationFunction?: string): string;
        buildMagmaVertexShader(uniformRegister?: string, animationFunction?: string, overlayUniformRegister?: string, overlayAnimationFunction?: string): string;
        buildSolidFragmentShader(): string;
        buildItemFragmentShader(): string;
        buildFluidFragmentShader(): string;
        buildFloraFragmentShader(): string;
        buildMagmaFragmentShader(): string;
        getDefaultVertexShader(voxelSubstance: import("Meta/index.js").VoxelSubstanceType, uniformRegister?: string, animationFunction?: string, overlayUniformRegister?: string, ovlerayAnimationFunction?: string): string;
        getDefaultFragmentShader(voxelSubstance: import("Meta/index.js").VoxelSubstanceType): string;
        getSkyBoxVertexShader(): string;
        getSkyBoxFragmentShader(): string;
    };
    textureCreator: {
        context: CanvasRenderingContext2D | null;
        imgWidth: number;
        imgHeight: number;
        defineTextureDimensions(width: number, height: number): void;
        setUpImageCreation(): void;
        createMaterialTexture(name: string, scene: BABYLON.Scene, images: string[], width?: number, height?: number): Promise<BABYLON.RawTexture2DArray>;
        _loadImages(imgPath: string, width: number, height: number): Promise<Uint8ClampedArray>;
        _combineImageData(totalLength: number, arrays: Uint8ClampedArray[]): Uint8ClampedArray;
        getTextureBuffer(imgPath: string, width?: number, height?: number): Promise<Uint8ClampedArray>;
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
        registerAnimations(voxelSubstanceType: import("Meta/index.js").VoxelSubstanceType | "Item", animations: number[][], animationTimes: number[][], overlay?: boolean): {
            uniforms: string[];
            uniformRegisterCode: string;
            animationFunctionCode: string;
        };
        registerMaterial(voxelSubstanceType: import("Meta/index.js").VoxelSubstanceType | "Item", material: BABYLON.ShaderMaterial): void;
        startAnimations(): void;
    };
    solidMaterial: {
        material: BABYLON.ShaderMaterial | null;
        time: number;
        getMaterial(): BABYLON.ShaderMaterial | null;
        updateFogOptions(data: BABYLON.Vector4): void;
        setSunLightLevel(level: number): void;
        setBaseLevel(level: number): void;
        updateMaterialSettings(settings: EngineSettingsData): void;
        createMaterial(data: import("../../Meta/Render/Materials/Material.types.js").MaterialCreateData): BABYLON.ShaderMaterial;
        overrideMaterial(material: any): void;
        runEffects(): void;
    };
    floraMaterial: {
        material: BABYLON.ShaderMaterial | null;
        doEffects: boolean;
        time: number;
        getMaterial(): BABYLON.ShaderMaterial | null;
        updateFogOptions(data: BABYLON.Vector4): void;
        updateEffects(doEffects: boolean): void;
        setSunLightLevel(level: number): void;
        setBaseLevel(level: number): void;
        updateMaterialSettings(settings: EngineSettingsData): void;
        createMaterial(data: import("../../Meta/Render/Materials/Material.types.js").MaterialCreateData): BABYLON.ShaderMaterial;
        runEffects(): void;
    };
    fluidMaterial: {
        material: BABYLON.ShaderMaterial | null;
        doEffects: boolean;
        time: number;
        getMaterial(): BABYLON.ShaderMaterial | null;
        updateFogOptions(data: BABYLON.Vector4): void;
        updateEffects(doEffects: boolean): void;
        setSunLightLevel(level: number): void;
        setBaseLevel(level: number): void;
        updateMaterialSettings(settings: EngineSettingsData): void;
        createMaterial(data: import("../../Meta/Render/Materials/Material.types.js").MaterialCreateData): BABYLON.ShaderMaterial;
        runEffects(): void;
    };
    magmaMaterial: {
        material: BABYLON.ShaderMaterial | null;
        getMaterial(): BABYLON.ShaderMaterial | null;
        time: number;
        updateFogOptions(data: BABYLON.Vector4): void;
        updateMaterialSettings(settings: EngineSettingsData): void;
        createMaterial(data: import("../../Meta/Render/Materials/Material.types.js").MaterialCreateData): BABYLON.ShaderMaterial;
        runEffects(): void;
    };
    itemMaterial: {
        material: BABYLON.ShaderMaterial | null;
        context: CanvasRenderingContext2D | null;
        time: number;
        updateFogOptions(data: BABYLON.Vector4): void;
        getMaterial(): BABYLON.ShaderMaterial | null;
        setSunLightLevel(level: number): void;
        setBaseLevel(level: number): void;
        updateMaterialSettings(settings: EngineSettingsData): void;
        createMaterial(data: import("../../Meta/Render/Materials/Material.types.js").MaterialCreateData): BABYLON.ShaderMaterial;
        overrideMaterial(material: any): void;
        runEffects(): void;
    };
    solidStandardMaterial: {
        material: BABYLON.StandardMaterial | null;
        plugin: import("./Materials/Solid/Standard/SolidMaterial.bjsmp.js").SolidMaterialPlugin | null;
        $INIT(texture: BABYLON.RawTexture2DArray, scnee: BABYLON.Scene): void;
        getMaterial(): BABYLON.StandardMaterial;
    };
    fluidStandardMaterial: {
        material: BABYLON.StandardMaterial | null;
        reflectionprobe: BABYLON.RenderTargetTexture | null;
        plugin: import("./Materials/Fluid/Standard/FluidMaterial.bjsmp.js").FluidMaterialPlugin | null;
        $INIT(texture: BABYLON.RawTexture2DArray, scene: BABYLON.Scene): void;
        getMaterial(): BABYLON.StandardMaterial;
        addToRenderList(mesh: BABYLON.Mesh): void;
    };
    skyBoxMaterial: {
        material: BABYLON.ShaderMaterial | null;
        context: CanvasRenderingContext2D | null;
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
    solidMesh: import("Meta/index.js").VoxelMeshInterface;
    floraMesh: import("Meta/index.js").VoxelMeshInterface;
    fluidMesh: import("Meta/index.js").VoxelMeshInterface;
    magmaMesh: import("Meta/index.js").VoxelMeshInterface;
    itemMesh: {
        pickable: boolean;
        checkCollisions: boolean;
        seralize: boolean;
        clearCachedGeometry: boolean;
        createTemplateMesh(scene: BABYLON.Scene): BABYLON.Mesh;
        syncSettings(settings: EngineSettingsData): void;
        _applyVertexData(mesh: BABYLON.Mesh, data: import("../../Meta/Render/Meshes/ItemMesh.types.js").ItemMeshSetData): void;
        rebuildMeshGeometory(mesh: BABYLON.Mesh, data: import("../../Meta/Render/Meshes/ItemMesh.types.js").ItemMeshSetData): Promise<BABYLON.Mesh>;
        createMesh(x: number, y: number, z: number, data: import("../../Meta/Render/Meshes/ItemMesh.types.js").ItemMeshSetData): Promise<BABYLON.Mesh>;
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
