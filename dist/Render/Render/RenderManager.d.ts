/// <reference types="babylonjs" />
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
            add(location: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData, mesh: BABYLON.Mesh, substance: string): Map<string, import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk>;
            _getChunkData(mesh: BABYLON.Mesh): import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk;
            remove(location: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData, substance: string): false | BABYLON.Mesh;
            get(location: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData, substance: string): false | import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk;
        };
    };
    meshManager: {
        scene: BABYLON.Scene;
        runningUpdate: boolean;
        meshes: Record<string, Record<string, Record<string, BABYLON.Mesh>>>;
        meshMakers: Record<string, DVEMesh>;
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
        builder: {
            shaders: {
                _shaders: Map<string, import("../../Libs/Shaders/Classes/DivineShader.js").DivineShader>;
                create(id: string): import("../../Libs/Shaders/Classes/DivineShader.js").DivineShader;
            };
            functions: {
                _functions: Map<string, import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderFunctionData<any>>;
                _functionSets: Map<string, string[]>;
                create(id: string, data: import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderFunctionData<any>): void;
                _processFunctinos(id: string, data: import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderFunctionData<any>, shader?: import("../../Libs/Shaders/Classes/DivineShader.js").DivineShader | null): string;
                build(id: string, data?: import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderFunctionData<any> | null, shader?: import("../../Libs/Shaders/Classes/DivineShader.js").DivineShader | null): string;
            };
            define: {
                _process(data: import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderDefinesData): string;
                build(data: import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderDefinesData | Map<string, import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderDefinesData> | import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderDefinesData[]): string;
            };
            uniforms: {
                _process(data: import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderUniformData): string;
                build(data: import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderUniformData | Map<string, import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderUniformData> | import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderUniformData[]): string;
            };
            snippets: {
                _snippets: Map<string, import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderSnippetData<any>>;
                create(data: import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderSnippetData<any>): void;
                override(id: string, data: import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderSnippetData<any>): boolean;
                get(id: string, args?: any): string;
                _process(text: string, shader?: import("../../Libs/Shaders/Classes/DivineShader.js").DivineShader | undefined): {
                    newBody: string;
                    foundSnippet: boolean;
                };
                build(text: string, shader?: import("../../Libs/Shaders/Classes/DivineShader.js").DivineShader | undefined): string;
            };
        };
        voxelAttributes: [id: string, type: import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderDataTypes][];
        voxelSharedUniforms: [id: string, type: import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderDataTypes][];
        voxelVertexUniforms: [id: string, type: import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderDataTypes][];
        voxelVarying: import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderVaryingData<any>[];
        voxelFragFunctions: string[];
        voxelVertexFunctions: string[];
        _defaultShader: import("../../Libs/Shaders/Classes/DivineShader.js").DivineShader;
        $INIT(): void;
        createVoxelShader(id: string): import("../../Libs/Shaders/Classes/DivineShader.js").DivineShader;
        createSkyBoxShader(id: string): import("../../Libs/Shaders/Classes/DivineShader.js").DivineShader;
    };
    animationManager: {
        animatedMaterials: Record<string, BABYLON.ShaderMaterial>;
        animCount: number;
        animationUniforms: Map<string, Float32Array>;
        overlayAnimationUniforms: Map<string, Float32Array>;
        animations: {
            uniformIndex: number;
            overlay?: boolean | undefined;
            keys: number[];
            currentFrame: number;
            currentCount: number;
            keyCounts: number[];
            substance: string;
        }[];
        registerAnimations(voxelSubstanceType: string, shader: import("../../Libs/Shaders/Classes/DivineShader.js").DivineShader, animations: number[][], animationTimes: number[][], overlay?: boolean): Float32Array;
        registerMaterial(voxelSubstanceType: string, material: BABYLON.ShaderMaterial): void;
        startAnimations(): void;
    };
    solidMaterial: DVEMaterial;
    floraMaterial: DVEMaterial;
    liquidMaterial: DVEMaterial;
    solidMesh: DVEMesh;
    floraMesh: DVEMesh;
    liquidMesh: DVEMesh;
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
