import type { RecursivePartial } from "Meta/Util.types.js";
import { DVEMesh } from "./Meshes/DVEMesh.js";
import { RenderFogOptions, DVERenderEffectsOptions } from "Meta/Render/Render/Render.options.types.js";
import { DVEMaterial } from "./Materials/DVEMaterial.js";
import { Scene, Vector4 } from "babylonjs";
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
            add(location: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData, mesh: import("babylonjs").Mesh, substance: string): Map<string, import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk>;
            _getChunkData(mesh: import("babylonjs").Mesh): import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk;
            remove(location: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData, substance: string): false | import("babylonjs").Mesh;
            get(location: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData, substance: string): false | import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk;
        };
    };
    meshManager: {
        scene: Scene;
        runningUpdate: boolean;
        meshMakers: Record<string, DVEMesh>;
        $INIT(scene: Scene): void;
        chunks: {
            remove(data: import("../../Meta/Tasks/RenderTasks.types.js").RemoveChunkMeshTasks): false | undefined;
            update(data: import("../../Meta/Tasks/RenderTasks.types.js").SetChunkMeshTask): void;
            removeColumn(data: import("../../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): false | undefined;
        };
    };
    meshCuller: {
        $INIT(scene: Scene): void;
    };
    fogData: Vector4;
    effectOptions: DVERenderEffectsOptions;
    fo: {
        activeCamera: import("babylonjs").TransformNode | null;
        activeNode: import("babylonjs").TransformNode | null;
        onOriginSet: Function[];
        registerOnOriginSet(run: (node: import("babylonjs").TransformNode) => void): void;
        setOriginCenter(scene: Scene, object: {
            position: import("babylonjs").Vector3;
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
                build(data: import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderDefinesData | import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderDefinesData[] | Map<string, import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderDefinesData>): string;
            };
            uniforms: {
                _process(data: import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderUniformData): string;
                build(data: import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderUniformData | import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderUniformData[] | Map<string, import("../../Libs/Shaders/Types/ShaderData.types.js").ShaderUniformData>): string;
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
    solidMaterial: DVEMaterial;
    floraMaterial: DVEMaterial;
    liquidMaterial: DVEMaterial;
    solidMesh: DVEMesh;
    floraMesh: DVEMesh;
    liquidMesh: DVEMesh;
    skyBoxMaterial: {
        material: import("babylonjs").ShaderMaterial | null;
        time: number;
        getMaterial(): import("babylonjs").ShaderMaterial | null;
        updateFogOptions(data: Vector4): void;
        setSunLightLevel(level: number): void;
        setBaseLevel(level: number): void;
        updateMaterialSettings(settings: import("../../Meta/Data/Settings/EngineSettings.types.js").EngineSettingsData): void;
        createMaterial(scene: Scene): import("babylonjs").ShaderMaterial;
        overrideMaterial(material: any): void;
        runEffects(): void;
    };
    scene: Scene | null;
    updateFogOptions(options: RecursivePartial<RenderFogOptions>): void;
    _setFogData(): void;
    $INIT(scene: Scene): void;
    updateShaderEffectOptions(options: RecursivePartial<DVERenderEffectsOptions>): void;
    syncSettings(): void;
    getScene(): Scene | null;
    getDefaultCamera(scene: Scene): import("babylonjs").UniversalCamera;
    createSkyBoxMaterial(scene?: Scene): import("babylonjs").ShaderMaterial | null;
    setSunLevel(level: number): void;
    setBaseLevel(level: number): void;
};
