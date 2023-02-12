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
        _comms: Record<string, import("../Libs/ThreadComm/Comm/Comm.js").CommBase>;
        _commManageras: Record<string, import("../Libs/ThreadComm/Manager/CommManager.js").CommManager>;
        _tasks: Record<string, import("../Libs/ThreadComm/Tasks/Tasks.js").Task<any>>;
        _queues: Map<string, Map<string, import("../Libs/ThreadComm/Queue/SyncedQueue.js").SyncedQueue>>;
        _onDataSync: Record<string, import("../Libs/ThreadComm/Data/DataSync.js").DataSync<any, any>>;
        parent: import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
        __internal: Record<number, Record<number, (data: any, event: any) => void>>;
        __initalized: boolean;
        __expectedPorts: Record<string, boolean>;
        $INIT(threadName: string): Promise<void>;
        getSyncedQueue(threadId: string, queueId: string): import("../Libs/ThreadComm/Queue/SyncedQueue.js").SyncedQueue | undefined;
        addComm(comm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase): void;
        createComm<T_2>(name: string, mergeObject?: T_2): T_2 & import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
        createCommManager(data: import("../Libs/ThreadComm/Meta/Manager/Manager.types.js").CommManagerData): import("../Libs/ThreadComm/Manager/CommManager.js").CommManager;
        getComm(id: string): import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
        getCommManager(id: string): import("../Libs/ThreadComm/Manager/CommManager.js").CommManager;
        __throwError(message: string): never;
        getWorkerPort(): Promise<any>;
        __handleInternalMessage(data: any[], event: any): void;
        __isInternalMessage(data: any[]): boolean;
        __handleTasksDone(tasksId: string, mode: number, threadId: string, tid: string, tasksData: any): void;
        __handleTasksMessage(data: any[]): Promise<void>;
        __isTasks(data: any[]): boolean;
        registerTasks<T_3>(id: string | number, run: (data: T_3, onDone?: Function | undefined) => void, mode?: "async" | "deffered"): import("../Libs/ThreadComm/Tasks/Tasks.js").Task<T_3>;
        __hanldeDataSyncMessage(data: any[]): Promise<void>;
        __isDataSync(data: any[]): boolean;
        onDataSync<T_4, K_1>(dataType: string | number, onSync?: ((data: T_4) => void) | undefined, onUnSync?: ((data: K_1) => void) | undefined): import("../Libs/ThreadComm/Data/DataSync.js").DataSync<T_4, K_1>;
    };
    currentCom: import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
    worldComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
    nexusComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase & {
        $INIT(): void;
    };
    dataComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase & {
        $INIT(): void;
    };
    fxComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase & {
        $INIT(): void;
    };
    richWorldComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase & {
        $INIT(): void;
    };
    constructorCommManager: import("../Libs/ThreadComm/Manager/CommManager.js").CommManager & {
        $INIT(dasta: import("../Meta/Render/Textures/Texture.types.js").TextureTypeUVMap): void;
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
                add(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): import("../Meta/Render/Scene/MeshRegister.types.js").MushRegisterRegion;
                remove(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): boolean;
                _getRegionData(): import("../Meta/Render/Scene/MeshRegister.types.js").MushRegisterRegion;
                get(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): false | import("../Meta/Render/Scene/MeshRegister.types.js").MushRegisterRegion;
            };
            column: {
                add(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterColumn;
                remove(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): false | import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterColumn;
                _getColumnData(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterColumn;
                get(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): false | import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterColumn | undefined;
            };
            chunk: {
                add(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData, mesh: import("babylonjs").Mesh, substance: string): Map<string, import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk>;
                _getChunkData(mesh: import("babylonjs").Mesh): import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk;
                remove(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData, substance: string): false | import("babylonjs").Mesh;
                get(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData, substance: string): false | import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk;
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
                removeColumn(data: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): false | undefined;
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
                    _shaders: Map<string, import("../Libs/Shaders/Classes/DivineShader.js").DivineShader>;
                    create(id: string): import("../Libs/Shaders/Classes/DivineShader.js").DivineShader;
                };
                functions: {
                    _functions: Map<string, import("../Libs/Shaders/Types/ShaderData.types.js").ShaderFunctionData<any>>;
                    _functionSets: Map<string, string[]>;
                    create(id: string, data: import("../Libs/Shaders/Types/ShaderData.types.js").ShaderFunctionData<any>): void;
                    _processFunctinos(id: string, data: import("../Libs/Shaders/Types/ShaderData.types.js").ShaderFunctionData<any>, shader?: import("../Libs/Shaders/Classes/DivineShader.js").DivineShader | null): string;
                    build(id: string, data?: import("../Libs/Shaders/Types/ShaderData.types.js").ShaderFunctionData<any> | null, shader?: import("../Libs/Shaders/Classes/DivineShader.js").DivineShader | null): string;
                };
                define: {
                    _process(data: import("../Libs/Shaders/Types/ShaderData.types.js").ShaderDefinesData): string;
                    build(data: import("../Libs/Shaders/Types/ShaderData.types.js").ShaderDefinesData | import("../Libs/Shaders/Types/ShaderData.types.js").ShaderDefinesData[] | Map<string, import("../Libs/Shaders/Types/ShaderData.types.js").ShaderDefinesData>): string;
                };
                uniforms: {
                    _process(data: import("../Libs/Shaders/Types/ShaderData.types.js").ShaderUniformData): string;
                    build(data: import("../Libs/Shaders/Types/ShaderData.types.js").ShaderUniformData | import("../Libs/Shaders/Types/ShaderData.types.js").ShaderUniformData[] | Map<string, import("../Libs/Shaders/Types/ShaderData.types.js").ShaderUniformData>): string;
                };
                snippets: {
                    _snippets: Map<string, import("../Libs/Shaders/Types/ShaderData.types.js").ShaderSnippetData<any>>;
                    create(data: import("../Libs/Shaders/Types/ShaderData.types.js").ShaderSnippetData<any>): void;
                    override(id: string, data: import("../Libs/Shaders/Types/ShaderData.types.js").ShaderSnippetData<any>): boolean;
                    get(id: string, args?: any): string;
                    _process(text: string, shader?: import("../Libs/Shaders/Classes/DivineShader.js").DivineShader | undefined): {
                        newBody: string;
                        foundSnippet: boolean;
                    };
                    build(text: string, shader?: import("../Libs/Shaders/Classes/DivineShader.js").DivineShader | undefined): string;
                };
            };
            voxelAttributes: [id: string, type: import("../Libs/Shaders/Types/ShaderData.types.js").ShaderDataTypes][];
            voxelSharedUniforms: [id: string, type: import("../Libs/Shaders/Types/ShaderData.types.js").ShaderDataTypes][];
            voxelVertexUniforms: [id: string, type: import("../Libs/Shaders/Types/ShaderData.types.js").ShaderDataTypes][];
            voxelVarying: import("../Libs/Shaders/Types/ShaderData.types.js").ShaderVaryingData<any>[];
            voxelFragFunctions: string[];
            voxelVertexFunctions: string[];
            _defaultShader: import("../Libs/Shaders/Classes/DivineShader.js").DivineShader;
            $INIT(): void;
            createVoxelShader(id: string): import("../Libs/Shaders/Classes/DivineShader.js").DivineShader;
            createSkyBoxShader(id: string): import("../Libs/Shaders/Classes/DivineShader.js").DivineShader;
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
            runEffects(): void;
        };
        scene: Scene | null;
        updateFogOptions(options: import("../Meta/Util.types.js").RecursivePartial<import("../Meta/Render/Render/Render.options.types.js").RenderFogOptions>): void;
        _setFogData(): void;
        $INIT(scene: Scene): void;
        updateShaderEffectOptions(options: import("../Meta/Util.types.js").RecursivePartial<import("../Meta/Render/Render/Render.options.types.js").DVERenderEffectsOptions>): void;
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
            removeColumn(data: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): false | undefined;
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
            region: import("../Libs/voxelSpaces/Classes/VoxelSpace.js").VoxelSpace & {
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
            column: import("../Libs/voxelSpaces/Classes/VoxelSpace.js").VoxelSpace;
            chunk: import("../Libs/voxelSpaces/Classes/VoxelSpace.js").VoxelSpace & {
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
            voxel: import("../Libs/voxelSpaces/Classes/VoxelSpace.js").VoxelSpace;
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
        _processVariations(texture: import("../Meta/Render/Textures/Texture.types.js").TextureData, texturePaths: string[], map: Record<string, number>, animations: number[][], textureAnimatioTimes: number[][], extension: string, count: number, path: string): number;
        generateTexturesData(id: string): false | undefined;
        _ready: boolean;
        isReady(): boolean;
        $INIT(): Promise<void>;
        $START_ANIMATIONS(): void;
        getTextureUVMap(): import("../Meta/Render/Textures/Texture.types.js").TextureTypeUVMap;
        defineDefaultTexturePath(path: string): void;
        getTextureType(id: string): false | import("./Textures/TextureType.js").TextureType;
        addTextureType(id: string): void;
        registerTexture(textureData: import("../Meta/Render/Textures/Texture.types.js").TextureData | import("../Meta/Render/Textures/Texture.types.js").TextureData[]): void;
    };
    tasks: {
        setChunk: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Tasks/RenderTasks.types.js").SetChunkMeshTask>;
        removeChunk: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Tasks/RenderTasks.types.js").RemoveChunkMeshTasks>;
        removeColumn: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData>;
        removeColumnsOutsideRadius: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Tasks/RenderTasks.types.js").RemoveChunksOutsideDistance>;
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
