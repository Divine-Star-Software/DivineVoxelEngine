/// <reference types="babylonjs" />
import type { EngineSettingsData, RecursivePartial } from "Meta/index.js";
import { DVEMesh } from "./Meshes/DVEMesh.js";
import { DVEMaterial } from "./Materials/DVEMaterial.js";
import { RenderFogOptions, RenderEffectsOptions } from "Meta/Render/Render/Render.options.types.js";
export declare const RenderManager: {
    fogOptions: RenderFogOptions;
    meshRegister: {
        _dimensions: import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterDimensions;
        $INIT(): void;
        dimensions: {
            add(id: string): Map<any, any>;
            get(id: string): Map<string, import("../../Meta/Render/Scene/MeshRegister.types.js").MushRegisterRegion> | undefined;
            remove(id: string): boolean;
        };
        region: {
            add(dimensionId: string, x: number, y: number, z: number): import("../../Meta/Render/Scene/MeshRegister.types.js").MushRegisterRegion;
            remove(dimensionId: string, x: number, z: number, y?: number): boolean;
            _getRegionData(): import("../../Meta/Render/Scene/MeshRegister.types.js").MushRegisterRegion;
            get(dimensionId: string, x: number, y: number, z: number): false | import("../../Meta/Render/Scene/MeshRegister.types.js").MushRegisterRegion;
        };
        column: {
            add(dimensionId: string, x: number, z: number, y?: number): import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterColumn;
            remove(dimensionId: string, x: number, z: number, y?: number): false | import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterColumn;
            _getColumnData(position: [x: number, y: number, z: number]): import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterColumn;
            get(dimensionId: string, x: number, z: number, y?: number): false | import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterColumn | undefined;
        };
        chunk: {
            add(dimensionId: string, x: number, y: number, z: number, mesh: BABYLON.Mesh, substance: import("Meta/index.js").VoxelTemplateSubstanceType): Map<import("Meta/index.js").VoxelTemplateSubstanceType, import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk>;
            _getChunkData(mesh: BABYLON.Mesh): import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk;
            remove(dimensionId: string, x: number, y: number, z: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType): false | BABYLON.Mesh;
            get(dimensionId: string, x: number, y: number, z: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType): false | import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk;
        };
    };
    meshManager: {
        scene: BABYLON.Scene | null;
        runningUpdate: boolean;
        meshes: Record<import("Meta/index.js").VoxelSubstanceType, Record<string, Record<string, BABYLON.Mesh>>>;
        meshMakers: Record<import("Meta/index.js").VoxelSubstanceType, DVEMesh>;
        $INIT(scene: BABYLON.Scene): void;
        removeChunk(data: import("../../Meta/Tasks/RenderTasks.types.js").RemoveChunkMeshTasks): false | undefined;
        updateChunk(data: import("../../Meta/Tasks/RenderTasks.types.js").SetChunkMeshTask): void;
        removeColumn(data: import("../../Meta/Data/CommonTypes.js").LocationData): false | undefined;
        handleItemUpdate(x: number, y: number, z: number, data: any): void;
        handleEntityUpdate(x: number, y: number, z: number, data: any): void;
    };
    meshCuller: {
        $INIT(scene: BABYLON.Scene): void;
    };
    fogData: BABYLON.Vector4;
    effectOptions: RenderEffectsOptions;
    fo: {
        activeCamera: import("./FloatingOrigin/FOCamera.js").FOCamera | null;
        activeNode: import("./FloatingOrigin/FONode.js").FONode | null;
        onOriginSet: Function[];
        registerOnOriginSet(run: (node: import("./FloatingOrigin/FONode.js").FONode) => void): void;
        getCamera(scene: BABYLON.Scene, name: string, position?: BABYLON.Vector3, canvas?: HTMLCanvasElement | undefined): import("./FloatingOrigin/FOCamera.js").FOCamera;
        getNode(scene: BABYLON.Scene, name: string): import("./FloatingOrigin/FONode.js").FONode;
        setOriginCenter(scene: BABYLON.Scene, object: {
            position: BABYLON.Vector3;
        }): void;
    };
    shaderBuilder: {
        voxelShaders: {
            solid: {
                fragMain: string;
            };
            flora: {
                setPosition: string;
                fragMain: string;
            };
            liquid: {
                vertexVars: string;
                vertexWave: string;
                fragVars: string;
                fragMain: string;
            };
            item: {
                fragMain: string;
            };
        };
        buildVertexShader(data: import("../../Meta/Render/Shaders/Shader.types.js").VertexShaderCreateData, setPosition: string, doAO?: boolean, vars?: string): string;
        buildFragmentShader(fragMain: string, doAO?: boolean, vars?: string): string;
        getDefaultVertexShader(voxelSubstance: "Item" | import("Meta/index.js").VoxelTemplateSubstanceType, data: import("../../Meta/Render/Shaders/Shader.types.js").VertexShaderCreateData): string;
        getDefaultFragmentShader(voxelSubstance: "Item" | import("Meta/index.js").VoxelTemplateSubstanceType): string;
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
    updateFogOptions(options: RecursivePartial<RenderFogOptions>): void;
    _setFogData(): void;
    $INIT(scene: BABYLON.Scene): void;
    updateShaderEffectOptions(options: RecursivePartial<RenderEffectsOptions>): void;
    syncSettings(settings: EngineSettingsData): void;
    getScene(): BABYLON.Scene | null;
    getDefaultCamera(scene: BABYLON.Scene): BABYLON.UniversalCamera;
    createSkyBoxMaterial(scene?: BABYLON.Scene): BABYLON.ShaderMaterial | null;
    setSunLevel(level: number): void;
    setBaseLevel(level: number): void;
};
