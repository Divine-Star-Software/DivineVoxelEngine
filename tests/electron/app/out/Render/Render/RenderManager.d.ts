import type { EngineSettingsData, RecursivePartial } from "Meta/index.js";
import { DVEMesh } from "./Meshes/DVEMesh.js";
import { RenderFogOptions, DVERenderEffectsOptions } from "Meta/Render/Render/Render.options.types.js";
import { DVEMaterial } from "./Materials/DVEMaterial.js";
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
            add(location: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): import("../../Meta/Render/Scene/MeshRegister.types.js").MushRegisterRegion;
            remove(location: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): boolean;
            _getRegionData(): import("../../Meta/Render/Scene/MeshRegister.types.js").MushRegisterRegion;
            get(location: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): false | import("../../Meta/Render/Scene/MeshRegister.types.js").MushRegisterRegion;
        };
        column: {
            add(location: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterColumn;
            remove(location: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): false | import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterColumn;
            _getColumnData(location: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterColumn;
            get(location: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): false | import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterColumn | undefined;
        };
        chunk: {
            add(location: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData, mesh: BABYLON.Mesh, substance: import("Meta/index.js").VoxelTemplateSubstanceType): Map<import("Meta/index.js").VoxelTemplateSubstanceType, import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk>;
            _getChunkData(mesh: BABYLON.Mesh): import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk;
            remove(location: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData, substance: import("Meta/index.js").VoxelTemplateSubstanceType): false | BABYLON.Mesh;
            get(location: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData, substance: import("Meta/index.js").VoxelTemplateSubstanceType): false | import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk;
        };
    };
    meshManager: {
        scene: BABYLON.Scene;
        runningUpdate: boolean;
        meshes: Record<import("Meta/index.js").VoxelSubstanceType, Record<string, Record<string, BABYLON.Mesh>>>;
        meshMakers: Record<import("Meta/index.js").VoxelSubstanceType, DVEMesh>;
        $INIT(scene: BABYLON.Scene): void;
        chunks: {
            remove(data: import("../../Meta/Tasks/RenderTasks.types.js").RemoveChunkMeshTasks): false | undefined;
            update(data: import("../../Meta/Tasks/RenderTasks.types.js").SetChunkMeshTask): void;
            removeColumn(data: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): false | undefined;
        };
    };
    meshCuller: {
        $INIT(scene: BABYLON.Scene): void;
    };
    fogData: BABYLON.Vector4;
    effectOptions: DVERenderEffectsOptions;
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
    shaders: {
        voxelAttributes: [id: string, type: import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderDataTypes][];
        voxelSharedUniforms: [id: string, type: import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderDataTypes][];
        voxelVertexUniforms: [id: string, type: import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderDataTypes][];
        voxelVarying: [id: string, type: import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderDataTypes, set: import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderCodeBody][];
        voxelFragFunctions: string[];
        voxelVertexFunctions: string[];
        _defaultShader: import("../../Libs/Shaders/Classes/DVEShader.js").DVEShader;
        $INIT(): void;
        createVoxelShader(id: string): import("../../Libs/Shaders/Classes/DVEShader.js").DVEShader;
        createSkyBoxShader(id: string): import("../../Libs/Shaders/Classes/DVEShader.js").DVEShader;
    };
    textureCreator: {
        context: CanvasRenderingContext2D | null;
        imgWidth: number;
        imgHeight: number;
        _mipMapSizes: number[];
        defineTextureDimensions(textureSize: number, mipMapSizes: number[]): void;
        setUpImageCreation(): void;
        createMaterialTexture(name: string, scene: BABYLON.Scene, images: string[], width?: number, height?: number): Promise<BABYLON.RawTexture2DArray[]>;
        _createTextures(name: string, scene: BABYLON.Scene, images: string[], width: number, height: number): Promise<BABYLON.RawTexture2DArray>;
        _loadImages(imgPath: string, width: number, height: number): Promise<Uint8ClampedArray>;
        _combineImageData(totalLength: number, arrays: Uint8ClampedArray[]): Uint8ClampedArray;
    };
    animationManager: {
        animatedMaterials: Record<"Item" | import("Meta/index.js").VoxelSubstanceType, BABYLON.ShaderMaterial>;
        animCount: number;
        animations: {
            uniformShaderId: string;
            keys: number[];
            currentFrame: number;
            currentCount: number;
            keyCounts: number[];
            substance: "Item" | import("Meta/index.js").VoxelSubstanceType;
        }[];
        registerAnimations(voxelSubstanceType: "Item" | import("Meta/index.js").VoxelSubstanceType, animations: number[][], animationTimes: number[][], overlay?: boolean): import("../../Meta/Render/Animations/Animation.types.js").ShaderAnimationData;
        registerAnimationsN(voxelSubstanceType: "Item" | import("Meta/index.js").VoxelSubstanceType, animations: number[][], animationTimes: number[][], overlay?: boolean): {
            uniforms: [id: string, type: import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderDataTypes][];
            animationFunctionBody: string;
        };
        registerMaterial(voxelSubstanceType: "Item" | import("Meta/index.js").VoxelSubstanceType, material: BABYLON.ShaderMaterial): void;
        startAnimations(): void;
    };
    solidMaterial: DVEMaterial;
    floraMaterial: DVEMaterial;
    liquidMaterial: DVEMaterial;
    magmaMaterial: DVEMaterial;
    solidMesh: DVEMesh;
    floraMesh: DVEMesh;
    liquidMesh: DVEMesh;
    magmaMesh: DVEMesh;
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
    updateShaderEffectOptions(options: RecursivePartial<DVERenderEffectsOptions>): void;
    syncSettings(settings: EngineSettingsData): void;
    getScene(): BABYLON.Scene | null;
    getDefaultCamera(scene: BABYLON.Scene): BABYLON.UniversalCamera;
    createSkyBoxMaterial(scene?: BABYLON.Scene): BABYLON.ShaderMaterial | null;
    setSunLevel(level: number): void;
    setBaseLevel(level: number): void;
};
