import type { DVERInitData } from "Meta/Render/DVER";
import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types";
import { SceneTool } from "./Tools/SceneTool.js";
import type { Scene } from "babylonjs";
import { DVEBabylonSystem } from "./Babylon/DVEBabylon.js";
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
    TC: {
        threadNumber: number;
        threadName: string;
        environment: "node" | "browser";
        _comms: Record<string, import("threadcomm").CommBase>;
        _commManageras: Record<string, import("threadcomm").CommManager>;
        _tasks: Record<string, import("threadcomm").Task<any>>;
        _queues: Map<string, Map<string, import("threadcomm/Queue/SyncedQueue.js").SyncedQueue>>;
        _onDataSync: Record<string, import("threadcomm").DataSync<any, any>>;
        parent: import("threadcomm").CommBase;
        __internal: Record<number, Record<number, (data: any, event: any) => void>>;
        __initalized: boolean;
        __expectedPorts: Record<string, boolean>;
        $INIT(threadName: string): Promise<void>;
        getSyncedQueue(threadId: string, queueId: string): import("threadcomm/Queue/SyncedQueue.js").SyncedQueue | undefined;
        addComm(comm: import("threadcomm").CommBase): void;
        createComm<T_2>(name: string, mergeObject?: T_2 | undefined): T_2 & import("threadcomm").CommBase;
        createCommManager(data: import("threadcomm/Meta/Manager/Manager.types.js").CommManagerData): import("threadcomm").CommManager;
        getComm(id: string): import("threadcomm").CommBase;
        getCommManager(id: string): import("threadcomm").CommManager;
        __throwError(message: string): never;
        getWorkerPort(): Promise<any>;
        __handleInternalMessage(data: any[], event: any): void;
        __isInternalMessage(data: any[]): boolean;
        __handleTasksDone(tasksId: string, mode: number, threadId: string, tid: string, tasksData: any): void;
        __handleTasksMessage(data: any[]): Promise<void>;
        __isTasks(data: any[]): boolean;
        registerTasks<T_1>(id: string | number, run: (data: T_1, onDone?: Function | undefined) => void, mode?: "async" | "deffered" | undefined): import("threadcomm").Task<T_1>;
        __hanldeDataSyncMessage(data: any[]): Promise<void>;
        __isDataSync(data: any[]): boolean;
        onDataSync<T_2, K_1>(dataType: string | number, onSync?: ((data: T_2) => void) | undefined, onUnSync?: ((data: K_1) => void) | undefined): import("threadcomm").DataSync<T_2, K_1>;
    };
    currentCom: import("threadcomm").CommBase;
    worldComm: import("threadcomm").CommBase;
    nexusComm: import("threadcomm").CommBase & {
        $INIT(): void;
    };
    dataComm: import("threadcomm").CommBase & {
        $INIT(): void;
    };
    fxComm: import("threadcomm").CommBase & {
        $INIT(): void;
    };
    richWorldComm: import("threadcomm").CommBase & {
        $INIT(): void;
    };
    constructorCommManager: import("threadcomm").CommManager & {
        $INIT(dasta: import("../index.js").TextureTypeUVMap): void;
        createConstructors(path: string, numBuilders?: number): void;
        setConstructors(constructors: Worker[]): void;
        syncSettings(data: any): void;
    };
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
                add(location: import("voxelspaces").LocationData, mesh: import("babylonjs").Mesh, substance: string): Map<string, import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk>;
                _getChunkData(mesh: import("babylonjs").Mesh): import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk;
                remove(location: import("voxelspaces").LocationData, substance: string): false | import("babylonjs").Mesh;
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
        fogData: import("babylonjs").Vector4;
        effectOptions: import("../Meta/Render/Render/Render.options.types.js").DVERenderEffectsOptions;
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
            material: import("babylonjs").ShaderMaterial | null;
            time: number;
            getMaterial(): import("babylonjs").ShaderMaterial | null;
            updateFogOptions(data: import("babylonjs").Vector4): void;
            setSunLightLevel(level: number): void;
            setBaseLevel(level: number): void;
            updateMaterialSettings(settings: EngineSettingsData): void;
            createMaterial(scene: Scene): import("babylonjs").ShaderMaterial;
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
        getDefaultCamera(scene: Scene): import("babylonjs").UniversalCamera;
        createSkyBoxMaterial(scene?: Scene | undefined): import("babylonjs").ShaderMaterial | null;
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
        setChunk: import("threadcomm").Task<import("../Meta/Tasks/RenderTasks.types.js").SetChunkMeshTask>;
        removeChunk: import("threadcomm").Task<import("../Meta/Tasks/RenderTasks.types.js").RemoveChunkMeshTasks>;
        removeColumn: import("threadcomm").Task<import("voxelspaces").LocationData>;
        removeColumnsOutsideRadius: import("threadcomm").Task<import("../Meta/Tasks/RenderTasks.types.js").RemoveChunksOutsideDistance>;
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
