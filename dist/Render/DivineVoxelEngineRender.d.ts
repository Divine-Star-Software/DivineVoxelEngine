import { DVEBabylonSystem } from "./Babylon/DVEBabylon.js";
import type { DVERInitData } from "Meta/Render/DVER";
import type { Scene } from "@babylonjs/core";
import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types";
import { SceneTool } from "./Tools/SceneTool.js";
export declare const DVER: {
    UTIL: {
        createPromiseCheck: (data: {
            check: () => boolean;
            onReady?: (() => any) | undefined;
            checkInterval: number;
            failTimeOut?: number | undefined;
            onFail?: (() => any) | undefined;
        }) => Promise<boolean>;
        getEnviorment(): "node" | "browser";
        getAQueue<T>(): import("../Global/Util/Queue.js").Queue<T>;
        merge<T_1, K>(target: T_1, newObject: K): T_1 & K;
        degtoRad(degrees: number): number;
        radToDeg(radians: number): number;
        convertBufferToSAB(buffer: ArrayBuffer): SharedArrayBuffer;
        converSABToBuffer(buffer: SharedArrayBuffer): ArrayBuffer;
    };
    TC: any;
    currentCom: any;
    worldComm: any;
    nexusComm: any;
    dataComm: any;
    fxComm: any;
    richWorldComm: any;
    constructorCommManager: any;
    babylon: {
        system: DVEBabylonSystem;
        $INIT(system: DVEBabylonSystem): void;
    };
    settings: {
        enviorment: "node" | "browser";
        settings: EngineSettingsData;
        getSettings(): EngineSettingsData;
        syncSettings(data: EngineSettingsData): void;
        __syncWithObjects(): void;
        syncWithWorldBounds(worldBounds: {
            bounds: {
                MinZ: number;
                MaxZ: number;
                MinX: number;
                MaxX: number;
                MinY: number;
                MaxY: number;
            };
            setWorldBounds(minX: number, maxX: number, minZ: number, maxZ: number, minY: number, maxY: number): void;
        }): void;
        getSettingsCopy(): any;
        syncChunkInRichWorldThread(): boolean;
        richDataEnabled(): boolean;
        syncChunkInFXThread(): boolean;
        syncChunkInDataThread(): boolean;
        syncChunksInNexusThread(): boolean;
        doSunPropagation(): boolean;
        doRGBPropagation(): boolean;
        doLight(): boolean;
        doFlow(): boolean;
        saveWorldData(): boolean;
        isServer(): boolean;
        isClient(): boolean;
    };
    render: {
        fogOptions: import("../Meta/Render/Render/Render.options.types.js").RenderFogOptions;
        meshRegister: {
            _dimensions: import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterDimensions;
            $INIT(): void;
            dimensions: {
                add(id: string): Map<any, any>;
                get(id: string): Map<string, import("../Meta/Render/Scene/MeshRegister.types.js").MushRegisterRegion> | undefined;
                remove(id: string): boolean;
            };
            region: {
                add(location: import("voxelspaces").LocationData): import("../Meta/Render/Scene/MeshRegister.types.js").MushRegisterRegion;
                remove(location: import("voxelspaces").LocationData): boolean;
                _getRegionData(): import("../Meta/Render/Scene/MeshRegister.types.js").MushRegisterRegion;
                get(location: import("voxelspaces").LocationData): false | import("../Meta/Render/Scene/MeshRegister.types.js").MushRegisterRegion;
            };
            column: {
                add(location: import("voxelspaces").LocationData): import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterColumn;
                remove(location: import("voxelspaces").LocationData): false | import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterColumn;
                _getColumnData(location: import("voxelspaces").LocationData): import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterColumn;
                get(location: import("voxelspaces").LocationData): false | import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterColumn | undefined;
            };
            chunk: {
                add(location: import("voxelspaces").LocationData, mesh: import("@babylonjs/core").Mesh, substance: string): Map<string, import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk>;
                _getChunkData(mesh: import("@babylonjs/core").Mesh): import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk;
                remove(location: import("voxelspaces").LocationData, substance: string): false | import("@babylonjs/core").Mesh;
                get(location: import("voxelspaces").LocationData, substance: string): false | import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk;
            };
        };
        meshManager: {
            scene: Scene;
            runningUpdate: boolean;
            meshMakers: Record<string, import("./Render/Meshes/DVEMesh.js").DVEMesh>;
            $INIT(scene: Scene): void;
            chunks: {
                remove(data: import("../Meta/Tasks/RenderTasks.types.js").RemoveChunkMeshTasks): false | undefined;
                update(data: import("../Meta/Tasks/RenderTasks.types.js").SetChunkMeshTask): void;
                removeColumn(data: import("voxelspaces").LocationData): false | undefined;
            };
        };
        meshCuller: {
            $INIT(scene: Scene): void;
        };
        fogData: import("@babylonjs/core").Vector4;
        effectOptions: import("../Meta/Render/Render/Render.options.types.js").DVERenderEffectsOptions;
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
        solidMaterial: import("./Render/Materials/DVEMaterial.js").DVEMaterial;
        floraMaterial: import("./Render/Materials/DVEMaterial.js").DVEMaterial;
        liquidMaterial: import("./Render/Materials/DVEMaterial.js").DVEMaterial;
        solidMesh: import("./Render/Meshes/DVEMesh.js").DVEMesh;
        floraMesh: import("./Render/Meshes/DVEMesh.js").DVEMesh;
        liquidMesh: import("./Render/Meshes/DVEMesh.js").DVEMesh;
        skyBoxMaterial: {
            material: import("@babylonjs/core").ShaderMaterial | null;
            time: number;
            getMaterial(): import("@babylonjs/core").ShaderMaterial | null;
            updateFogOptions(data: import("@babylonjs/core").Vector4): void;
            setSunLightLevel(level: number): void;
            setBaseLevel(level: number): void;
            updateMaterialSettings(settings: EngineSettingsData): void;
            createMaterial(scene: Scene): import("@babylonjs/core").ShaderMaterial;
            overrideMaterial(material: any): void;
            updateUniforms(): void;
            runEffects(): void;
        };
        scene: Scene | null;
        updateFogOptions(options: import("../index.js").RecursivePartial<import("../Meta/Render/Render/Render.options.types.js").RenderFogOptions>): void;
        _setFogData(): void;
        $INIT(scene: Scene): void;
        updateShaderEffectOptions(options: import("../index.js").RecursivePartial<import("../Meta/Render/Render/Render.options.types.js").DVERenderEffectsOptions>): void;
        syncSettings(): void;
        getScene(): Scene | null;
        getDefaultCamera(scene: Scene): import("@babylonjs/core").UniversalCamera;
        createSkyBoxMaterial(scene?: Scene | undefined): import("@babylonjs/core").ShaderMaterial | null;
        setSunLevel(level: number): void;
        setBaseLevel(level: number): void;
    };
    meshManager: {
        scene: Scene;
        runningUpdate: boolean;
        meshMakers: Record<string, import("./Render/Meshes/DVEMesh.js").DVEMesh>;
        $INIT(scene: Scene): void;
        chunks: {
            remove(data: import("../Meta/Tasks/RenderTasks.types.js").RemoveChunkMeshTasks): false | undefined;
            update(data: import("../Meta/Tasks/RenderTasks.types.js").SetChunkMeshTask): void;
            removeColumn(data: import("voxelspaces").LocationData): false | undefined;
        };
    };
    data: {
        worldBounds: {
            bounds: {
                MinZ: number;
                MaxZ: number;
                MinX: number;
                MaxX: number;
                MinY: number;
                MaxY: number;
            };
            setWorldBounds(minX: number, maxX: number, minZ: number, maxZ: number, minY: number, maxY: number): void;
        };
        spaces: {
            region: import("voxelspaces/Classes/VoxelSpace.js").VoxelSpace & {
                chunkBounds: {
                    x: number;
                    y: number;
                    z: number;
                };
                columnBounds: {
                    x: number;
                    y: number;
                    z: number;
                };
                getChunkVolume(): number;
                getColumnVolume(): number;
            };
            column: import("voxelspaces/Classes/VoxelSpace.js").VoxelSpace;
            chunk: import("voxelspaces/Classes/VoxelSpace.js").VoxelSpace & {
                _regionPosition: {
                    x: number;
                    y: number;
                    z: number;
                };
                getRegionPositonx(): {
                    x: number;
                    y: number;
                    z: number;
                    copy(): any;
                    copyTo(vec3: {
                        x: number;
                        y: number;
                        z: number;
                    }): void;
                    toString(): string;
                    multiply(vec3: {
                        x: number;
                        y: number;
                        z: number;
                    }): any;
                };
                getRegionPositonxXYZ(x: number, y: number, z: number): {
                    x: number;
                    y: number;
                    z: number;
                    copy(): any;
                    copyTo(vec3: {
                        x: number;
                        y: number;
                        z: number;
                    }): void;
                    toString(): string;
                    multiply(vec3: {
                        x: number;
                        y: number;
                        z: number;
                    }): any;
                };
                getRegionIndex(): number;
                getRegionIndexXYZ(x: number, y: number, z: number): number;
            };
            voxel: import("voxelspaces/Classes/VoxelSpace.js").VoxelSpace;
            setDimensions(data: {
                regions: {
                    x: number;
                    y: number;
                    z: number;
                };
                columns: {
                    x: number;
                    y: number;
                    z: number;
                };
                chunks: {
                    x: number;
                    y: number;
                    z: number;
                };
            }): void;
        } & {
            $INIT(settings: EngineSettingsData): void;
        };
    };
    textures: {
        defaultTexturePath: string;
        textureTypes: Map<string, import("./Textures/TextureType.js").TextureType>;
        _processVariations(textureData: import("../index.js").TextureData, paths: Map<string, false | Uint8ClampedArray>, map: Record<string, number>, animations: number[][], textureAnimatioTimes: number[][], extension: string, count: number, path: string): number;
        generateTexturesData(id: string): false | undefined;
        _ready: boolean;
        isReady(): boolean;
        $INIT(): Promise<void>;
        $START_ANIMATIONS(): void;
        getTextureUVMap(): import("../index.js").TextureTypeUVMap;
        defineDefaultTexturePath(path: string): void;
        getTextureType(id: string): false | import("./Textures/TextureType.js").TextureType;
        addTextureType(id: string): void;
        registerTexture(textureData: import("../index.js").TextureData | import("../index.js").TextureData[]): void;
    };
    tasks: {
        setChunk: any;
        removeChunk: any;
        removeColumn: any;
        removeColumnsOutsideRadius: any;
    };
    syncSettingsWithWorkers(data: EngineSettingsData): void;
    $INIT(initData: DVERInitData): Promise<void>;
    $SCENEINIT(data: {
        scene: Scene;
        system: DVEBabylonSystem;
    }): Promise<void>;
    __createWorker(path: string): Worker;
    getSceneTool(): SceneTool;
};
export declare type DivineVoxelEngineRender = typeof DVER;
