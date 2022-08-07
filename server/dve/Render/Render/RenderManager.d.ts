/// <reference types="babylonjs" />
import type { EngineSettingsData } from "Meta/index.js";
export declare const RenderManager: {
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
        getSkyBoxFragmentShader(): string;
        getSkyBoxVertexShader(): string;
    };
    textureCreator: {
        context: CanvasRenderingContext2D | null;
        imgWidth: number;
        imgHeight: number;
        defineTextureDimensions(width: number, height: number): void;
        setUpImageCreation(): void;
        createMaterialTexture(scene: BABYLON.Scene, images: string[], width?: number, height?: number): Promise<BABYLON.RawTexture2DArray>;
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
        getMaterial(): BABYLON.ShaderMaterial | null;
        setSunLightLevel(level: number): void;
        setBaseLevel(level: number): void;
        updateMaterialSettings(settings: EngineSettingsData): void;
        createMaterial(data: import("../../Meta/Render/Materials/Material.types.js").MaterialCreateData): BABYLON.ShaderMaterial;
        overrideMaterial(material: any): void;
    };
    floraMaterial: {
        material: BABYLON.ShaderMaterial | null;
        getMaterial(): BABYLON.ShaderMaterial | null;
        setSunLightLevel(level: number): void;
        setBaseLevel(level: number): void;
        updateMaterialSettings(settings: EngineSettingsData): void;
        createMaterial(data: import("../../Meta/Render/Materials/Material.types.js").MaterialCreateData): BABYLON.ShaderMaterial;
    };
    fluidMaterial: {
        material: BABYLON.ShaderMaterial | null;
        getMaterial(): BABYLON.ShaderMaterial | null;
        setSunLightLevel(level: number): void;
        setBaseLevel(level: number): void;
        updateMaterialSettings(settings: EngineSettingsData): void;
        createMaterial(data: import("../../Meta/Render/Materials/Material.types.js").MaterialCreateData): BABYLON.ShaderMaterial;
    };
    magmaMaterial: {
        material: BABYLON.ShaderMaterial | null;
        getMaterial(): BABYLON.ShaderMaterial | null;
        updateMaterialSettings(settings: EngineSettingsData): void;
        createMaterial(data: import("../../Meta/Render/Materials/Material.types.js").MaterialCreateData): BABYLON.ShaderMaterial;
    };
    itemMaterial: {
        material: BABYLON.ShaderMaterial | null;
        context: CanvasRenderingContext2D | null;
        getMaterial(): BABYLON.ShaderMaterial | null;
        setSunLightLevel(level: number): void;
        setBaseLevel(level: number): void;
        updateMaterialSettings(settings: EngineSettingsData): void;
        createMaterial(data: import("../../Meta/Render/Materials/Material.types.js").MaterialCreateData): BABYLON.ShaderMaterial;
        overrideMaterial(material: any): void;
    };
    skyBoxMaterial: {
        material: BABYLON.ShaderMaterial | null;
        context: CanvasRenderingContext2D | null;
        getMaterial(): BABYLON.ShaderMaterial | null;
        setSunLightLevel(level: number): void;
        setBaseLevel(level: number): void;
        updateMaterialSettings(settings: EngineSettingsData): void;
        createMaterial(scene: BABYLON.Scene): BABYLON.ShaderMaterial;
        overrideMaterial(material: any): void;
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
    syncSettings(settings: EngineSettingsData): void;
    getScene(): BABYLON.Scene | null;
    createSkyBoxMaterial(scene?: BABYLON.Scene): BABYLON.ShaderMaterial | null;
    setSunLevel(level: number): void;
    setBaseLevel(level: number): void;
};
