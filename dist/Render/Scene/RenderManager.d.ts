import type { RecursivePartial } from "Meta/Util.types.js";
import type { Scene, Vector4 } from "@babylonjs/core";
import { DVEMesh } from "../Render/Meshes/DVEMesh.js";
import { RenderFogOptions, DVERenderEffectsOptions } from "Meta/Render/Render/Render.options.types.js";
import { DVEMaterial } from "../Render/Materials/DVEMaterial.js";
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
            add(location: import("voxelspaces").LocationData): import("../../Meta/Render/Scene/MeshRegister.types.js").MushRegisterRegion;
            remove(location: import("voxelspaces").LocationData): boolean;
            _getRegionData(): import("../../Meta/Render/Scene/MeshRegister.types.js").MushRegisterRegion;
            get(location: import("voxelspaces").LocationData): false | import("../../Meta/Render/Scene/MeshRegister.types.js").MushRegisterRegion;
        };
        column: {
            add(location: import("voxelspaces").LocationData): import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterColumn;
            remove(location: import("voxelspaces").LocationData): false | import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterColumn;
            _getColumnData(location: import("voxelspaces").LocationData): import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterColumn;
            get(location: import("voxelspaces").LocationData): false | import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterColumn | undefined;
        };
        chunk: {
            add(location: import("voxelspaces").LocationData, mesh: import("@babylonjs/core").Mesh, substance: string): Map<string, import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk>;
            _getChunkData(mesh: import("@babylonjs/core").Mesh): import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk;
            remove(location: import("voxelspaces").LocationData, substance: string): false | import("@babylonjs/core").Mesh;
            get(location: import("voxelspaces").LocationData, substance: string): false | import("../../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk;
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
            removeColumn(data: import("voxelspaces").LocationData): false | undefined;
        };
    };
    meshCuller: {
        $INIT(scene: Scene): void;
    };
    fogData: Vector4;
    effectOptions: DVERenderEffectsOptions;
    fo: {
        activeCamera: import("@babylonjs/core").TransformNode | null;
        activeNode: import("@babylonjs/core").TransformNode | null;
        onOriginSet: Function[];
        registerOnOriginSet(run: (node: import("@babylonjs/core").TransformNode) => void): void;
        setOriginCenter(scene: Scene, object: {
            position: import("@babylonjs/core").Vector3;
        }): void;
    };
    shaders: {
        builder: {
            shaders: {
                _shaders: Map<string, import("divine-shaders").DivineShader>;
                create(id: string): import("divine-shaders").DivineShader;
            };
            functions: {
                _functions: Map<string, import("divine-shaders").ShaderFunctionData<any>>;
                _functionSets: Map<string, string[]>;
                create(id: string, data: import("divine-shaders").ShaderFunctionData<any>): void;
                _processFunctinos(id: string, data: import("divine-shaders").ShaderFunctionData<any>, shader?: import("divine-shaders").DivineShader | null | undefined): string;
                build(id: string, data?: import("divine-shaders").ShaderFunctionData<any> | null | undefined, shader?: import("divine-shaders").DivineShader | null | undefined): string;
            };
            define: {
                _process(data: import("divine-shaders").ShaderDefinesData): string;
                build(data: import("divine-shaders").ShaderDefinesData | import("divine-shaders").ShaderDefinesData[] | Map<string, import("divine-shaders").ShaderDefinesData>): string;
            };
            uniforms: {
                _process(data: import("divine-shaders").ShaderUniformData): string;
                build(data: import("divine-shaders").ShaderUniformData | import("divine-shaders").ShaderUniformData[] | Map<string, import("divine-shaders").ShaderUniformData>): string;
            };
            snippets: {
                _snippets: Map<string, import("divine-shaders").ShaderSnippetData<any>>;
                create(data: import("divine-shaders").ShaderSnippetData<any>): void;
                override(id: string, data: import("divine-shaders").ShaderSnippetData<any>): boolean;
                get(id: string, args?: any): string;
                _process(text: string, shader?: import("divine-shaders").DivineShader | undefined): {
                    newBody: string;
                    foundSnippet: boolean;
                };
                build(text: string, shader?: import("divine-shaders").DivineShader | undefined): string;
            };
        };
        voxelAttributes: [id: string, type: import("divine-shaders").ShaderDataTypes][];
        voxelSharedUniforms: [id: string, type: import("divine-shaders").ShaderDataTypes][];
        voxelVertexUniforms: [id: string, type: import("divine-shaders").ShaderDataTypes][];
        voxelVarying: import("divine-shaders").ShaderVaryingData<any>[];
        voxelFragFunctions: string[];
        voxelVertexFunctions: string[];
        _defaultShader: import("divine-shaders").DivineShader;
        $INIT(): void;
        createVoxelShader(id: string): import("divine-shaders").DivineShader;
        createSkyBoxShader(id: string): import("divine-shaders").DivineShader;
    };
    solidMaterial: DVEMaterial;
    floraMaterial: DVEMaterial;
    liquidMaterial: DVEMaterial;
    solidMesh: DVEMesh;
    floraMesh: DVEMesh;
    liquidMesh: DVEMesh;
    skyBoxMaterial: {
        material: import("@babylonjs/core").ShaderMaterial | null;
        time: number;
        getMaterial(): import("@babylonjs/core").ShaderMaterial | null;
        updateFogOptions(data: Vector4): void;
        setSunLightLevel(level: number): void;
        setBaseLevel(level: number): void;
        updateMaterialSettings(settings: import("../../Meta/Data/Settings/EngineSettings.types.js").EngineSettingsData): void;
        createMaterial(scene: Scene): import("@babylonjs/core").ShaderMaterial;
        overrideMaterial(material: any): void;
        updateUniforms(): void;
        runEffects(): void;
    };
    scene: Scene | null;
    updateFogOptions(options: RecursivePartial<RenderFogOptions>): void;
    _setFogData(): void;
    $INIT(scene: Scene): void;
    updateShaderEffectOptions(options: RecursivePartial<DVERenderEffectsOptions>): void;
    syncSettings(): void;
    getScene(): Scene | null;
    getDefaultCamera(scene: Scene): import("@babylonjs/core").UniversalCamera;
    createSkyBoxMaterial(scene?: Scene): import("@babylonjs/core").ShaderMaterial | null;
    setSunLevel(level: number): void;
    setBaseLevel(level: number): void;
};
