/// <reference types="babylonjs" />
import type { DVERInitData } from "Meta/Render/DVER";
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
        $INIT(dasta: import("../Meta/index.js").TextureTypeUVMap): void;
        createConstructors(path: string, numBuilders?: number): void;
        setConstructors(constructors: Worker[]): void;
        syncSettings(data: any): void;
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
                add(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData, mesh: BABYLON.Mesh, substance: string): Map<string, import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk>;
                _getChunkData(mesh: BABYLON.Mesh): import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk;
                remove(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData, substance: string): false | BABYLON.Mesh;
                get(location: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData, substance: string): false | import("../Meta/Render/Scene/MeshRegister.types.js").MeshRegisterChunk;
            };
        };
        meshManager: {
            scene: BABYLON.Scene;
            runningUpdate: boolean;
            meshes: Record<string, Record<string, Record<string, BABYLON.Mesh>>>;
            meshMakers: Record<string, import("./Render/Meshes/DVEMesh.js").DVEMesh>;
            $INIT(scene: BABYLON.Scene): void;
            chunks: {
                remove(data: import("../Meta/Tasks/RenderTasks.types.js").RemoveChunkMeshTasks): false | undefined;
                update(data: import("../Meta/Tasks/RenderTasks.types.js").SetChunkMeshTask): void;
                removeColumn(data: import("../Libs/voxelSpaces/Types/VoxelSpaces.types.js").LocationData): false | undefined;
            };
        };
        meshCuller: {
            $INIT(scene: BABYLON.Scene): void;
        };
        fogData: BABYLON.Vector4;
        effectOptions: import("../Meta/Render/Render/Render.options.types.js").DVERenderEffectsOptions;
        fo: {
            activeCamera: import("./Render/FloatingOrigin/FOCamera.js").FOCamera | null;
            activeNode: import("./Render/FloatingOrigin/FONode.js").FONode | null;
            onOriginSet: Function[];
            registerOnOriginSet(run: (node: import("./Render/FloatingOrigin/FONode.js").FONode) => void): void;
            getCamera(scene: BABYLON.Scene, name: string, position?: BABYLON.Vector3, canvas?: HTMLCanvasElement | undefined): import("./Render/FloatingOrigin/FOCamera.js").FOCamera;
            getNode(scene: BABYLON.Scene, name: string): import("./Render/FloatingOrigin/FONode.js").FONode;
            setOriginCenter(scene: BABYLON.Scene, object: {
                position: BABYLON.Vector3;
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
                    build(data: import("../Libs/Shaders/Types/ShaderData.types.js").ShaderDefinesData | Map<string, import("../Libs/Shaders/Types/ShaderData.types.js").ShaderDefinesData> | import("../Libs/Shaders/Types/ShaderData.types.js").ShaderDefinesData[]): string;
                };
                uniforms: {
                    _process(data: import("../Libs/Shaders/Types/ShaderData.types.js").ShaderUniformData): string;
                    build(data: import("../Libs/Shaders/Types/ShaderData.types.js").ShaderUniformData | Map<string, import("../Libs/Shaders/Types/ShaderData.types.js").ShaderUniformData> | import("../Libs/Shaders/Types/ShaderData.types.js").ShaderUniformData[]): string;
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
            registerAnimations(voxelSubstanceType: string, shader: import("../Libs/Shaders/Classes/DivineShader.js").DivineShader, animations: number[][], animationTimes: number[][], overlay?: boolean): Float32Array;
            registerMaterial(voxelSubstanceType: string, material: BABYLON.ShaderMaterial): void;
            startAnimations(): void;
        };
        solidMaterial: import("./Render/Materials/DVEMaterial.js").DVEMaterial;
        floraMaterial: import("./Render/Materials/DVEMaterial.js").DVEMaterial;
        liquidMaterial: import("./Render/Materials/DVEMaterial.js").DVEMaterial;
        solidMesh: import("./Render/Meshes/DVEMesh.js").DVEMesh;
        floraMesh: import("./Render/Meshes/DVEMesh.js").DVEMesh;
        liquidMesh: import("./Render/Meshes/DVEMesh.js").DVEMesh;
        solidStandardMaterial: {
            material: BABYLON.StandardMaterial | null;
            plugin: import("./Render/Materials/Standard/SolidMaterial.bjsmp.js").SolidMaterialPlugin | null;
            $INIT(texture: BABYLON.RawTexture2DArray, scnee: BABYLON.Scene): void;
            getMaterial(): BABYLON.StandardMaterial;
        };
        liquidStandardMaterial: {
            material: BABYLON.StandardMaterial | null;
            reflectionprobe: BABYLON.RenderTargetTexture | null;
            plugin: import("./Render/Materials/Standard/LiquidMaterial.bjsmp.js").LiquidMaterialPlugin | null;
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
        updateFogOptions(options: import("../Meta/Util.types.js").RecursivePartial<import("../Meta/Render/Render/Render.options.types.js").RenderFogOptions>): void;
        _setFogData(): void;
        $INIT(scene: BABYLON.Scene): void;
        updateShaderEffectOptions(options: import("../Meta/Util.types.js").RecursivePartial<import("../Meta/Render/Render/Render.options.types.js").DVERenderEffectsOptions>): void;
        syncSettings(settings: EngineSettingsData): void;
        getScene(): BABYLON.Scene | null;
        getDefaultCamera(scene: BABYLON.Scene): BABYLON.UniversalCamera;
        createSkyBoxMaterial(scene?: BABYLON.Scene | undefined): BABYLON.ShaderMaterial | null;
        setSunLevel(level: number): void;
        setBaseLevel(level: number): void;
    };
    meshManager: {
        scene: BABYLON.Scene;
        runningUpdate: boolean;
        meshes: Record<string, Record<string, Record<string, BABYLON.Mesh>>>;
        meshMakers: Record<string, import("./Render/Meshes/DVEMesh.js").DVEMesh>;
        $INIT(scene: BABYLON.Scene): void;
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
        _processVariations(texture: import("../Meta/index.js").TextureData, texturePaths: string[], map: Record<string, number>, animations: number[][], textureAnimatioTimes: number[][], extension: string, count: number, path: string): number;
        generateTexturesData(id: string): false | undefined;
        _ready: boolean;
        isReady(): boolean;
        $INIT(): Promise<void>;
        $START_ANIMATIONS(): void;
        getTextureUVMap(): import("../Meta/index.js").TextureTypeUVMap;
        defineDefaultTexturePath(path: string): void;
        getTextureType(id: string): false | import("./Textures/TextureType.js").TextureType;
        addTextureType(id: string): void;
        registerTexture(textureData: import("../Meta/index.js").TextureData | import("../Meta/index.js").TextureData[]): void;
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
        scene: BABYLON.Scene;
    }): Promise<void>;
    __createWorker(path: string): Worker;
    getSceneTool(): SceneTool;
};
export declare type DivineVoxelEngineRender = typeof DVER;
