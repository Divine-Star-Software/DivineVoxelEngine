export declare const RenderManager: {
    shaderBuilder: {
        buildFloraVertexSahder(uniformRegister?: string, animationFunction?: string): string;
        buildFluidVertexShader(uniformRegister?: string, animationFunction?: string): string;
        buildSolidVertexShader(uniformRegister?: string, animationFunction?: string): string;
        buildMagmaVertexShader(uniformRegister?: string, animationFunction?: string): string;
        buildSolidFragmentShader(): string;
        buildFluidFragmentShader(): string;
        buildFloraFragmentShader(): string;
        buildMagmaFragmentShader(): string;
        getDefaultVertexShader(voxelSubstance: import("../../Meta/index.js").VoxelSubstanceType, uniformRegister?: string, animationFunction?: string): string;
        getDefaultFragmentShader(voxelSubstance: import("../../Meta/index.js").VoxelSubstanceType): string;
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
        animatedMaterials: Record<import("../../Meta/index.js").VoxelSubstanceType, BABYLON.ShaderMaterial>;
        animCount: number;
        animations: {
            uniformShaderId: string;
            keys: number[];
            currentFrame: number;
            currentCount: number;
            keyCounts: number[];
            substance: import("../../Meta/index.js").VoxelSubstanceType;
        }[];
        registerAnimations(voxelSubstanceType: import("../../Meta/index.js").VoxelSubstanceType, animations: number[][], animationTimes: number[][]): {
            uniforms: string[];
            uniformRegisterCode: string;
            animationFunctionCode: string;
        };
        registerMaterial(voxelSubstanceType: import("../../Meta/index.js").VoxelSubstanceType, material: BABYLON.ShaderMaterial): void;
        startAnimations(): void;
    };
    solidMaterial: {
        material: BABYLON.ShaderMaterial | null;
        context: CanvasRenderingContext2D | null;
        getMaterial(): BABYLON.ShaderMaterial | null;
        setSunLightLevel(level: number): void;
        setBaseLevel(level: number): void;
        updateMaterialSettings(settings: import("../../Meta/index.js").EngineSettingsData): void;
        createMaterial(settings: import("../../Meta/index.js").EngineSettingsData, scene: BABYLON.Scene, texture: BABYLON.RawTexture2DArray, animations: number[][], animationTimes: number[][]): BABYLON.ShaderMaterial;
        overrideMaterial(material: any): void;
    };
    floraMaterial: {
        material: BABYLON.ShaderMaterial | null;
        context: CanvasRenderingContext2D | null;
        getMaterial(): BABYLON.ShaderMaterial | null;
        updateMaterialSettings(settings: import("../../Meta/index.js").EngineSettingsData): void;
        createMaterial(scene: BABYLON.Scene, texture: BABYLON.RawTexture2DArray, animations: number[][], animationTimes: number[][]): BABYLON.ShaderMaterial;
    };
    fluidMaterial: {
        material: BABYLON.ShaderMaterial | null;
        context: CanvasRenderingContext2D | null;
        getMaterial(): BABYLON.ShaderMaterial | null;
        setSunLightLevel(level: number): void;
        setBaseLevel(level: number): void;
        updateMaterialSettings(settings: import("../../Meta/index.js").EngineSettingsData): void;
        createMaterial(settings: import("../../Meta/index.js").EngineSettingsData, scene: BABYLON.Scene, texture: BABYLON.RawTexture2DArray, animations: number[][], animationTimes: number[][]): BABYLON.ShaderMaterial;
    };
    magmaMaterial: {
        material: BABYLON.ShaderMaterial | null;
        context: CanvasRenderingContext2D | null;
        getMaterial(): BABYLON.ShaderMaterial | null;
        updateMaterialSettings(settings: import("../../Meta/index.js").EngineSettingsData): void;
        createMaterial(scene: BABYLON.Scene, texture: BABYLON.RawTexture2DArray, animations: number[][], animationTimes: number[][]): BABYLON.ShaderMaterial;
    };
    solidMesh: import("../../Meta/index.js").VoxelMeshInterface;
    floraMesh: import("../../Meta/index.js").VoxelMeshInterface;
    fluidMesh: import("../../Meta/index.js").VoxelMeshInterface;
    magmaMesh: import("../../Meta/index.js").VoxelMeshInterface;
    reStart(): void;
    setSunLevel(level: number): void;
    setBaseLevel(level: number): void;
};
