import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types.js";
import { RichDataTool } from "../Tools/Data/RichDataTool.js";
import { DataTool } from "../Tools/Data/DataTool.js";
export declare const DVEC: {
    environment: "node" | "browser";
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
    propagation: {
        expolosion: {
            run(tasks: {
                rebuildQueMap: Map<string, boolean>;
                comm: import("threadcomm").CommBase;
                priority: import("../Meta/Tasks/Tasks.types.js").Priorities;
                LOD: number;
                syncQueue: import("voxelspaces").LocationData[];
                aSyncQueue: import("voxelspaces").LocationData[];
                buildMode: "async" | "sync";
                buildTasks: import("../Meta/Tasks/Tasks.types.js").PriorityTask<import("../Meta/Tasks/Tasks.types.js").BuildTasks>;
                rebuildTasks: import("../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                tasksType: string;
                origin: import("voxelspaces").LocationData;
                data: number;
                buildQueue: string;
                originThread: string;
                queues: {
                    flow: {
                        update: {
                            queue: number[][];
                            map: import("../Global/Util/VisistedMap.js").VisitedMap;
                        };
                        remove: {
                            queue: number[][];
                            map: import("../Global/Util/VisistedMap.js").VisitedMap;
                            noRemoveMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                        };
                    };
                    rgb: {
                        update: number[];
                        remove: number[];
                        map: import("../Global/Util/VisistedMap.js").VisitedMap;
                    };
                    sun: {
                        update: number[];
                        remove: number[];
                        updateMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                        remvoeMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                    };
                    queue: [x: number, y: number, z: number][];
                    map: import("../Global/Util/VisistedMap.js").VisitedMap;
                };
                start(): any;
                stop(): any;
                setPriority(priority: import("../Meta/Tasks/Tasks.types.js").Priorities): any;
                getData(): number;
                getOriginThread(): import("voxelspaces").LocationData;
                getBuildQueue(): string;
                getOrigin(): import("voxelspaces").LocationData;
                needsRebuild(): boolean;
                needsToUpdateOriginThread(): boolean;
                setBuldMode(mode: "async" | "sync"): any;
                addToRebuildQueue(x: number, y: number, z: number): boolean;
                addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                runRebuildQueue(): any;
            }): void;
        };
        flow: {
            update(tasks: {
                rebuildQueMap: Map<string, boolean>;
                comm: import("threadcomm").CommBase;
                priority: import("../Meta/Tasks/Tasks.types.js").Priorities;
                LOD: number;
                syncQueue: import("voxelspaces").LocationData[];
                aSyncQueue: import("voxelspaces").LocationData[];
                buildMode: "async" | "sync";
                buildTasks: import("../Meta/Tasks/Tasks.types.js").PriorityTask<import("../Meta/Tasks/Tasks.types.js").BuildTasks>;
                rebuildTasks: import("../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                tasksType: string;
                origin: import("voxelspaces").LocationData;
                data: null;
                buildQueue: string;
                originThread: string;
                queues: {
                    flow: {
                        update: {
                            queue: number[][];
                            map: import("../Global/Util/VisistedMap.js").VisitedMap;
                        };
                        remove: {
                            queue: number[][];
                            map: import("../Global/Util/VisistedMap.js").VisitedMap;
                            noRemoveMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                        };
                    };
                    rgb: {
                        update: number[];
                        remove: number[];
                        map: import("../Global/Util/VisistedMap.js").VisitedMap;
                    };
                    sun: {
                        update: number[];
                        remove: number[];
                        updateMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                        remvoeMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                    };
                };
                start(): any;
                stop(): any;
                setPriority(priority: import("../Meta/Tasks/Tasks.types.js").Priorities): any;
                getData(): null;
                getOriginThread(): import("voxelspaces").LocationData;
                getBuildQueue(): string;
                getOrigin(): import("voxelspaces").LocationData;
                needsRebuild(): boolean;
                needsToUpdateOriginThread(): boolean;
                setBuldMode(mode: "async" | "sync"): any;
                addToRebuildQueue(x: number, y: number, z: number): boolean;
                addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                runRebuildQueue(): any;
            }): Promise<void>;
            remove(tasks: {
                rebuildQueMap: Map<string, boolean>;
                comm: import("threadcomm").CommBase;
                priority: import("../Meta/Tasks/Tasks.types.js").Priorities;
                LOD: number;
                syncQueue: import("voxelspaces").LocationData[];
                aSyncQueue: import("voxelspaces").LocationData[];
                buildMode: "async" | "sync";
                buildTasks: import("../Meta/Tasks/Tasks.types.js").PriorityTask<import("../Meta/Tasks/Tasks.types.js").BuildTasks>;
                rebuildTasks: import("../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                tasksType: string;
                origin: import("voxelspaces").LocationData;
                data: null;
                buildQueue: string;
                originThread: string;
                queues: {
                    flow: {
                        update: {
                            queue: number[][];
                            map: import("../Global/Util/VisistedMap.js").VisitedMap;
                        };
                        remove: {
                            queue: number[][];
                            map: import("../Global/Util/VisistedMap.js").VisitedMap;
                            noRemoveMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                        };
                    };
                    rgb: {
                        update: number[];
                        remove: number[];
                        map: import("../Global/Util/VisistedMap.js").VisitedMap;
                    };
                    sun: {
                        update: number[];
                        remove: number[];
                        updateMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                        remvoeMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                    };
                };
                start(): any;
                stop(): any;
                setPriority(priority: import("../Meta/Tasks/Tasks.types.js").Priorities): any;
                getData(): null;
                getOriginThread(): import("voxelspaces").LocationData;
                getBuildQueue(): string;
                getOrigin(): import("voxelspaces").LocationData;
                needsRebuild(): boolean;
                needsToUpdateOriginThread(): boolean;
                setBuldMode(mode: "async" | "sync"): any;
                addToRebuildQueue(x: number, y: number, z: number): boolean;
                addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                runRebuildQueue(): any;
            }): Promise<void>;
        };
        worldSun: {
            run(tasks: {
                rebuildQueMap: Map<string, boolean>;
                comm: import("threadcomm").CommBase;
                priority: import("../Meta/Tasks/Tasks.types.js").Priorities;
                LOD: number;
                syncQueue: import("voxelspaces").LocationData[];
                aSyncQueue: import("voxelspaces").LocationData[];
                buildMode: "async" | "sync";
                buildTasks: import("../Meta/Tasks/Tasks.types.js").PriorityTask<import("../Meta/Tasks/Tasks.types.js").BuildTasks>;
                rebuildTasks: import("../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                tasksType: string;
                origin: import("voxelspaces").LocationData;
                data: null;
                buildQueue: string;
                originThread: string;
                queues: {
                    sun: number[];
                };
                start(): any;
                stop(): any;
                setPriority(priority: import("../Meta/Tasks/Tasks.types.js").Priorities): any;
                getData(): null;
                getOriginThread(): import("voxelspaces").LocationData;
                getBuildQueue(): string;
                getOrigin(): import("voxelspaces").LocationData;
                needsRebuild(): boolean;
                needsToUpdateOriginThread(): boolean;
                setBuldMode(mode: "async" | "sync"): any;
                addToRebuildQueue(x: number, y: number, z: number): boolean;
                addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                runRebuildQueue(): any;
            }): void;
        };
        rgb: {
            update(tasks: {
                rebuildQueMap: Map<string, boolean>;
                comm: import("threadcomm").CommBase;
                priority: import("../Meta/Tasks/Tasks.types.js").Priorities;
                LOD: number;
                syncQueue: import("voxelspaces").LocationData[];
                aSyncQueue: import("voxelspaces").LocationData[];
                buildMode: "async" | "sync";
                buildTasks: import("../Meta/Tasks/Tasks.types.js").PriorityTask<import("../Meta/Tasks/Tasks.types.js").BuildTasks>;
                rebuildTasks: import("../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                tasksType: string;
                origin: import("voxelspaces").LocationData;
                data: any;
                buildQueue: string;
                originThread: string;
                queues: {
                    rgb: {
                        update: number[];
                        remove: number[];
                        map: import("../Global/Util/VisistedMap.js").VisitedMap;
                    };
                    sun: {
                        update: number[];
                        remove: number[];
                        updateMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                        remvoeMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                    };
                };
                start(): any;
                stop(): any;
                setPriority(priority: import("../Meta/Tasks/Tasks.types.js").Priorities): any;
                getData(): any;
                getOriginThread(): import("voxelspaces").LocationData;
                getBuildQueue(): string;
                getOrigin(): import("voxelspaces").LocationData;
                needsRebuild(): boolean;
                needsToUpdateOriginThread(): boolean;
                setBuldMode(mode: "async" | "sync"): any;
                addToRebuildQueue(x: number, y: number, z: number): boolean;
                addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                runRebuildQueue(): any;
            }): void;
            remove(tasks: {
                rebuildQueMap: Map<string, boolean>;
                comm: import("threadcomm").CommBase;
                priority: import("../Meta/Tasks/Tasks.types.js").Priorities;
                LOD: number;
                syncQueue: import("voxelspaces").LocationData[];
                aSyncQueue: import("voxelspaces").LocationData[];
                buildMode: "async" | "sync";
                buildTasks: import("../Meta/Tasks/Tasks.types.js").PriorityTask<import("../Meta/Tasks/Tasks.types.js").BuildTasks>;
                rebuildTasks: import("../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                tasksType: string;
                origin: import("voxelspaces").LocationData;
                data: any;
                buildQueue: string;
                originThread: string;
                queues: {
                    rgb: {
                        update: number[];
                        remove: number[];
                        map: import("../Global/Util/VisistedMap.js").VisitedMap;
                    };
                    sun: {
                        update: number[];
                        remove: number[];
                        updateMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                        remvoeMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                    };
                };
                start(): any;
                stop(): any;
                setPriority(priority: import("../Meta/Tasks/Tasks.types.js").Priorities): any;
                getData(): any;
                getOriginThread(): import("voxelspaces").LocationData;
                getBuildQueue(): string;
                getOrigin(): import("voxelspaces").LocationData;
                needsRebuild(): boolean;
                needsToUpdateOriginThread(): boolean;
                setBuldMode(mode: "async" | "sync"): any;
                addToRebuildQueue(x: number, y: number, z: number): boolean;
                addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                runRebuildQueue(): any;
            }): void;
        };
        sun: {
            update(tasks: {
                rebuildQueMap: Map<string, boolean>;
                comm: import("threadcomm").CommBase;
                priority: import("../Meta/Tasks/Tasks.types.js").Priorities;
                LOD: number;
                syncQueue: import("voxelspaces").LocationData[];
                aSyncQueue: import("voxelspaces").LocationData[];
                buildMode: "async" | "sync";
                buildTasks: import("../Meta/Tasks/Tasks.types.js").PriorityTask<import("../Meta/Tasks/Tasks.types.js").BuildTasks>;
                rebuildTasks: import("../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                tasksType: string;
                origin: import("voxelspaces").LocationData;
                data: any;
                buildQueue: string;
                originThread: string;
                queues: {
                    rgb: {
                        update: number[];
                        remove: number[];
                        map: import("../Global/Util/VisistedMap.js").VisitedMap;
                    };
                    sun: {
                        update: number[];
                        remove: number[];
                        updateMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                        remvoeMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                    };
                };
                start(): any;
                stop(): any;
                setPriority(priority: import("../Meta/Tasks/Tasks.types.js").Priorities): any;
                getData(): any;
                getOriginThread(): import("voxelspaces").LocationData;
                getBuildQueue(): string;
                getOrigin(): import("voxelspaces").LocationData;
                needsRebuild(): boolean;
                needsToUpdateOriginThread(): boolean;
                setBuldMode(mode: "async" | "sync"): any;
                addToRebuildQueue(x: number, y: number, z: number): boolean;
                addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                runRebuildQueue(): any;
            }): void;
            remove(tasks: {
                rebuildQueMap: Map<string, boolean>;
                comm: import("threadcomm").CommBase;
                priority: import("../Meta/Tasks/Tasks.types.js").Priorities;
                LOD: number;
                syncQueue: import("voxelspaces").LocationData[];
                aSyncQueue: import("voxelspaces").LocationData[];
                buildMode: "async" | "sync";
                buildTasks: import("../Meta/Tasks/Tasks.types.js").PriorityTask<import("../Meta/Tasks/Tasks.types.js").BuildTasks>;
                rebuildTasks: import("../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
                tasksType: string;
                origin: import("voxelspaces").LocationData;
                data: any;
                buildQueue: string;
                originThread: string;
                queues: {
                    rgb: {
                        update: number[];
                        remove: number[];
                        map: import("../Global/Util/VisistedMap.js").VisitedMap;
                    };
                    sun: {
                        update: number[];
                        remove: number[];
                        updateMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                        remvoeMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                    };
                };
                start(): any;
                stop(): any;
                setPriority(priority: import("../Meta/Tasks/Tasks.types.js").Priorities): any;
                getData(): any;
                getOriginThread(): import("voxelspaces").LocationData;
                getBuildQueue(): string;
                getOrigin(): import("voxelspaces").LocationData;
                needsRebuild(): boolean;
                needsToUpdateOriginThread(): boolean;
                setBuldMode(mode: "async" | "sync"): any;
                addToRebuildQueue(x: number, y: number, z: number): boolean;
                addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
                runRebuildQueue(): any;
            }): void;
        };
    };
    worldGen: {
        worldGen: import("../index.js").WorldGenInterface | null;
        register: {
            MAX_ATTEMPTS: number;
            _requests: Map<string, {
                attempts: number;
                dimension: string;
                chunks: Map<string, [x: number, y: number, z: number]>;
                voxels: [x: number, y: number, z: number, data: import("../index.js").RawVoxelData][];
            }>;
            registerRequest(location: import("voxelspaces").LocationData): string;
            addToRequest(registerId: string, location: import("voxelspaces").LocationData, rawData: import("../index.js").RawVoxelData): void;
            attemptRequestFullFill(registerId: string): boolean;
        };
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
        _brushes: any[];
        setWorldGen(worldGen: import("../index.js").WorldGenInterface): void;
        generate(data: import("../Meta/Tasks/Tasks.types.js").GenerateTasks, mode: "decorate" | "generate", onDone: Function): Promise<void>;
        getBrush(): import("./index.js").WorldGenBrush;
    };
    builder: {
        constructors: {
            constructors: import("../Global/Util/UtilMap.js").UtilMap<string, import("./index.js").VoxelConstructor>;
            get(id: string): import("./index.js").VoxelConstructor;
            registerVoxel(voxel: import("./index.js").VoxelConstructor | import("./index.js").VoxelConstructor[]): void;
            defaults: {
                box: {
                    simple(id: string, textures: import("../index.js").ConstructorTextureData | Record<import("../index.js").DirectionNames, import("../index.js").ConstructorTextureData>): import("./Builder/Constructors/Voxel/Classes/Box/SimpleBox.constructor.js").SimpleBoxVoxelConstructor;
                    pillar(id: string, textures: import("./Builder/Constructors/Voxel/Classes/Box/PillarBox.constructor.js").PillarBoxVoxelConstructorData): import("./Builder/Constructors/Voxel/Classes/Box/PillarBox.constructor.js").PillarBoxVoxelConstructor;
                };
                stair: {
                    simple(id: string, texture: import("../index.js").ConstructorTextureData): import("./Builder/Constructors/Voxel/Classes/Stair/SimpleStair.constructor.js").SimpleStairVoxelConstructor;
                };
                panel: {
                    simple(id: string, texture: import("../index.js").ConstructorTextureData): import("./Builder/Constructors/Voxel/Classes/Panel/SimplePanel.constructor.js").SimplePanelVoxelConstructor;
                };
                crossedPanel: {
                    simple(id: string, texture: import("../index.js").ConstructorTextureData): import("./Builder/Constructors/Voxel/Classes/Panel/SimpleCrossedPanel.constructor.js").SimpleCrossedPanelVoxelConstructor;
                };
                liquid: {
                    simple(id: string, textures: [import("../index.js").ConstructorTextureData, import("../index.js").ConstructorTextureData]): import("./Builder/Constructors/Voxel/Classes/Liquid/SimpleLiquid.constructor.js").SimpleLiquidConstructor;
                };
            };
        };
        textureManager: {
            textureDataHasBeenSet: boolean;
            data: import("../index.js").TextureTypeUVMap;
            getTextureUV(data: import("../index.js").ConstructorTextureData, overlay?: boolean): number;
            setUVTextureMap(data: import("../index.js").TextureTypeUVMap): void;
            releaseTextureData(): void;
            isReady(): boolean;
        };
        chunkProcessor: {
            relative: {
                x: number;
                y: number;
                z: number;
            };
            nLocation: import("voxelspaces").LocationData;
            _process(doSecondCheck?: boolean): void;
            build(location: import("voxelspaces").LocationData): void;
        };
        textureProcessor: {
            visitedMap: Record<"top" | "bottom" | "west" | "east", Record<string, boolean>>;
            _resetVisitedMap(): void;
            faceMap: Record<import("../index.js").DirectionNames, number>;
            height: number;
            width: number;
            depth: number;
            getPosition: Record<"top" | "bottom" | "west" | "east", (face: {
                xStart: number;
                xEnd: number;
                yStart: number;
                yEnd: number;
                type: "top" | "bottom" | "west" | "east";
            }) => [number, number, number]>;
            getDimensions: Record<"top" | "bottom" | "west" | "east", (face: {
                xStart: number;
                xEnd: number;
                yStart: number;
                yEnd: number;
                type: "top" | "bottom" | "west" | "east";
            }) => [number, number]>;
            getTruePosition(face: {
                xStart: number;
                xEnd: number;
                yStart: number;
                yEnd: number;
                type: "top" | "bottom" | "west" | "east";
            }): {
                xStart: number;
                xEnd: number;
                yStart: number;
                yEnd: number;
            };
            processTexture(buildTask: import("../Meta/Tasks/RenderTasks.types.js").BuildNodeMesh): readonly [import("../Meta/Tasks/RenderTasks.types.js").SetNodeMesh, ArrayBuffer[]];
            _process(data: number[][], x: number, y: number): {
                w: boolean;
                e: boolean;
                t: boolean;
                b: boolean;
            };
            gettopFace(data: number[][], sx: number, y: number): {
                xStart: number;
                xEnd: number;
                yStart: number;
                yEnd: number;
                type: "top" | "bottom" | "west" | "east";
            };
            getbottomFace(data: number[][], sx: number, y: number): {
                xStart: number;
                xEnd: number;
                yStart: number;
                yEnd: number;
                type: "top" | "bottom" | "west" | "east";
            };
            getwestFace(data: number[][], x: number, sy: number): {
                xStart: number;
                xEnd: number;
                yStart: number;
                yEnd: number;
                type: "top" | "bottom" | "west" | "east";
            };
            geteastFace(data: number[][], x: number, sy: number): {
                xStart: number;
                xEnd: number;
                yStart: number;
                yEnd: number;
                type: "top" | "bottom" | "west" | "east";
            };
            getBlankFace(x: number, y: number, face: "top" | "bottom" | "west" | "east"): {
                xStart: number;
                xEnd: number;
                yStart: number;
                yEnd: number;
                type: "top" | "bottom" | "west" | "east";
            };
            visit(x: number, y: number, face: "top" | "bottom" | "west" | "east"): void;
            visited(x: number, y: number, face: "top" | "bottom" | "west" | "east"): boolean;
            calculateUV(face: {
                xStart: number;
                xEnd: number;
                yStart: number;
                yEnd: number;
                type: "top" | "bottom" | "west" | "east";
            }): [number, number, number, number];
            buildFace(face: {
                xStart: number;
                xEnd: number;
                yStart: number;
                yEnd: number;
                type: "top" | "bottom" | "west" | "east";
            }): void;
        };
        overrides: {
            overrides: Record<import("./index.js").OverrideTypes, Map<string, Map<string, (data: import("./index.js").FaceDataOverride) => boolean>>>;
            registerOverride(type: import("./index.js").OverrideTypes, subjectId: string, neighborShapeId: string, run: (data: import("./index.js").FaceDataOverride) => boolean): void;
            hasOverride(type: import("./index.js").OverrideTypes, shapeId: string, neighborShapeId: string): boolean;
            runOverride(type: import("./index.js").OverrideTypes, firstId: string, secondOverride: string, data: import("./index.js").FaceDataOverride): boolean;
        };
        renderedSubstances: {
            meshers: import("../Global/Util/UtilMap.js").UtilMap<string, import("./Builder/Tools/VoxelMesherDataTool.js").VoxelMesherDataTool>;
        };
        $INIT(): void;
        buildChunk(location: import("voxelspaces").LocationData, LOD?: number): boolean;
    };
    analyzer: {
        updater: {
            _voxels: Map<string, (locaton: import("voxelspaces").LocationData, deltaTime: number, anayzer: any, DVEC: any) => void>;
            registerVoxel(id: string, run: (locaton: import("voxelspaces").LocationData, deltaTime: number, anayzer: any, DVEC: any) => void): void;
            getVoxel(id: string): false | ((locaton: import("voxelspaces").LocationData, deltaTime: number, anayzer: any, DVEC: any) => void);
        };
        processor: {
            columnTool: import("../Tools/Data/WorldData/ColumnDataTool.js").ColumnDataTool;
            chunkTool: import("../Tools/Data/WorldData/ChunkDataTool.js").ChunkDataTool;
            goThroughColumn<T_2>(location: import("voxelspaces").LocationData, run: (x: number, y: number, z: number, column: import("../Tools/Data/WorldData/ColumnDataTool.js").ColumnDataTool) => void): void;
        };
        _flowChecks: number[][];
        runPropagation(data: import("../Meta/Tasks/Tasks.types.js").UpdateTasksO): Promise<void>;
        runUpdate(data: import("../Meta/Tasks/Tasks.types.js").UpdateTasksO): Promise<void>;
    };
    dataSyncNode: {
        _states: Record<string, boolean>;
        isReady(): boolean;
        voxelPalette: import("threadcomm").DataSync<import("../Meta/Data/DataSync.types.js").VoxelPaletteSyncData, any>;
        voxelData: import("threadcomm").DataSync<import("../Meta/Data/DataSync.types.js").VoxelDataSync, any>;
        dimension: import("threadcomm").DataSync<import("../Meta/Data/DimensionData.types.js").DimensionData, void>;
        chunk: import("threadcomm").DataSync<import("../Meta/Data/DataSync.types.js").WorldDataSync, import("voxelspaces").LocationData>;
        column: import("threadcomm").DataSync<import("../Meta/Data/DataSync.types.js").WorldDataSync, import("voxelspaces").LocationData>;
        region: import("threadcomm").DataSync<import("../Meta/Data/DataSync.types.js").WorldDataSync, import("voxelspaces").LocationData>;
        regionHeader: import("threadcomm").DataSync<import("../Meta/Data/DataSync.types.js").WorldDataSync, import("voxelspaces").LocationData>;
        chunkTags: import("threadcomm").DataSync<import("divine-binary-tags").RemoteTagManagerInitData, void>;
        columnTags: import("threadcomm").DataSync<import("divine-binary-tags").RemoteTagManagerInitData, void>;
        regionTags: import("threadcomm").DataSync<import("divine-binary-tags").RemoteTagManagerInitData[], void>;
        stringMap: import("threadcomm").DataSync<import("../Meta/Data/DataSync.types.js").RegisterStringMapSync, void>;
    };
    data: {
        dimensions: {
            _count: number;
            dimensionRecord: Record<string, number>;
            dimensionMap: Record<number, string>;
            __defaultDimensionOptions: import("../Meta/Data/DimensionData.types.js").DimensionOptions;
            _dimensions: Record<string, import("../Meta/Data/DimensionData.types.js").DimensionData>;
            registerDimension(id: string, option: import("../Meta/Data/DimensionData.types.js").DimensionOptions): void;
            getDimension(id: string | number): import("../Meta/Data/DimensionData.types.js").DimensionData;
            getDimensionStringId(id: string | number): string;
            getDimensionNumericId(id: string | number): number;
        };
        voxelTags: {
            voxelIndex: Uint16Array;
            id: string;
            sync(voxelMap: Uint16Array): void;
            setVoxel(id: number): void;
            initData: import("divine-binary-tags").RemoteTagManagerInitData;
            $INIT(data: import("divine-binary-tags").RemoteTagManagerInitData): void;
            byteOffSet: number;
            tagSize: number;
            tagIndexes: number;
            data: DataView;
            indexMap: Map<string, number>;
            index: DataView;
            setBuffer(data: DataView | import("divine-binary-tags").BufferTypes): void;
            getBuffer(): ArrayBuffer;
            setTagIndex(index: number): void;
            getTag(id: string): number;
            setTag(id: string, value: number): boolean;
            getArrayTagValue(id: string, index: number): number;
            getArrayTagByteIndex(id: string, index: number): number;
            setArrayTagValue(id: string, index: number, value: number): number | void;
            loopThroughTags(run: (id: string, value: number) => void): void;
            loopThroughIndex(run: (data: number[]) => void): void;
            loopThroughAllIndexTags(run: (id: string, value: number, index: number) => void): void;
        };
        world: {
            _currentionDimension: string;
            paint: {
                _dt: DataTool;
                voxel(location: import("voxelspaces").LocationData, data: import("../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): void;
                __paint(location: import("voxelspaces").LocationData, data: import("../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): false | undefined;
                erase(location: import("voxelspaces").LocationData): void;
            };
        };
        worldRegister: {
            _dimensions: import("../Meta/Data/WorldData.types.js").WorldDimensions;
            _cacheOn: boolean;
            _chunkCache: Map<string, import("../Meta/Data/WorldData.types.js").ChunkData>;
            _columnCache: Map<string, import("../Meta/Data/WorldData.types.js").Column>;
            cache: {
                enable(): void;
                disable(): void;
                _addChunk(key: string, data: import("../Meta/Data/WorldData.types.js").ChunkData): void;
                _addColumn(key: string, data: import("../Meta/Data/WorldData.types.js").Column): void;
                _getChunk(key: string): import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
                _getColumn(key: string): import("../Meta/Data/WorldData.types.js").Column | undefined;
            };
            dimensions: {
                add(id: string | number): Map<any, any>;
                get(id: string | number): Map<string, import("../Meta/Data/WorldData.types.js").Region> | undefined;
            };
            region: {
                add(location: import("voxelspaces").LocationData, sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Region;
                _getRegionData(sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Region;
                get(location: import("voxelspaces").LocationData): false | import("../Meta/Data/WorldData.types.js").Region;
                remove(location: import("voxelspaces").LocationData): boolean;
            };
            column: {
                add(location: import("voxelspaces").LocationData, sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Column | undefined;
                _getColumnData(sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Column;
                get(location: import("voxelspaces").LocationData): false | import("../Meta/Data/WorldData.types.js").Column;
                remove(location: import("voxelspaces").LocationData): boolean;
                fill(location: import("voxelspaces").LocationData): void;
                height: {
                    getRelative(location: import("voxelspaces").LocationData): number;
                    getAbsolute(location: import("voxelspaces").LocationData): number;
                };
            };
            chunk: {
                add(location: import("voxelspaces").LocationData, sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
                _getChunkData(sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").ChunkData;
                addFromServer(chunkBuffer: ArrayBuffer): import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
                get(location: import("voxelspaces").LocationData): false | import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
                remove(location: import("voxelspaces").LocationData): boolean;
            };
        };
        columnTags: import("divine-binary-tags").RemoteTagManager;
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
        register: {
            stringMaps: {
                segments: Map<string, Map<string, string[]>>;
                syncStringMap(data: import("../Meta/Data/DataSync.types.js").RegisterStringMapSync): void;
                getStringMapValue(segment: string, id: string, index: number): string;
            };
        };
        chunkTags: import("divine-binary-tags").RemoteTagManager;
        regionTags: import("divine-binary-tags").RemoteTagManager;
        regionHeaderReigster: {
            _headers: Map<string, Map<string, {
                data: DataView;
                buffer: SharedArrayBuffer;
            }>>;
            remove(location: import("voxelspaces").LocationData): boolean;
            add(location: import("voxelspaces").LocationData, buffer: SharedArrayBuffer): void;
            get(location: import("voxelspaces").LocationData): false | {
                data: DataView;
                buffer: SharedArrayBuffer;
            } | undefined;
            isStored(location: import("voxelspaces").LocationData): 0 | 1 | -1;
        };
    };
    voxelManager: {
        constructors: import("../Global/Util/UtilMap.js").UtilMap<string, import("./index.js").VoxelConstructor>;
        get(id: string): import("./index.js").VoxelConstructor;
        registerVoxel(voxel: import("./index.js").VoxelConstructor | import("./index.js").VoxelConstructor[]): void;
        defaults: {
            box: {
                simple(id: string, textures: import("../index.js").ConstructorTextureData | Record<import("../index.js").DirectionNames, import("../index.js").ConstructorTextureData>): import("./Builder/Constructors/Voxel/Classes/Box/SimpleBox.constructor.js").SimpleBoxVoxelConstructor;
                pillar(id: string, textures: import("./Builder/Constructors/Voxel/Classes/Box/PillarBox.constructor.js").PillarBoxVoxelConstructorData): import("./Builder/Constructors/Voxel/Classes/Box/PillarBox.constructor.js").PillarBoxVoxelConstructor;
            };
            stair: {
                simple(id: string, texture: import("../index.js").ConstructorTextureData): import("./Builder/Constructors/Voxel/Classes/Stair/SimpleStair.constructor.js").SimpleStairVoxelConstructor;
            };
            panel: {
                simple(id: string, texture: import("../index.js").ConstructorTextureData): import("./Builder/Constructors/Voxel/Classes/Panel/SimplePanel.constructor.js").SimplePanelVoxelConstructor;
            };
            crossedPanel: {
                simple(id: string, texture: import("../index.js").ConstructorTextureData): import("./Builder/Constructors/Voxel/Classes/Panel/SimpleCrossedPanel.constructor.js").SimpleCrossedPanelVoxelConstructor;
            };
            liquid: {
                simple(id: string, textures: [import("../index.js").ConstructorTextureData, import("../index.js").ConstructorTextureData]): import("./Builder/Constructors/Voxel/Classes/Liquid/SimpleLiquid.constructor.js").SimpleLiquidConstructor;
            };
        };
    };
    TC: {
        threadNumber: number;
        threadName: string;
        environment: "node" | "browser";
        _comms: Record<string, import("threadcomm").CommBase>;
        _commManageras: Record<string, import("threadcomm").CommManager>;
        _queues: Map<string, Map<string, import("threadcomm/Queue/SyncedQueue.js").SyncedQueue>>;
        parent: import("threadcomm").CommBase;
        internal: {
            _tasks: Map<number, Map<number, import("threadcomm/Meta/Util.types.js").MessageFunction>>;
            registerTasks(headID: number, taskId: number, run: import("threadcomm/Meta/Util.types.js").MessageFunction): void;
            isInternal(data: any): boolean;
            runInternal(data: any, event: any): false | undefined;
        };
        __initalized: boolean;
        __expectedPorts: Record<string, boolean>;
        crypto: Crypto;
        $INIT(threadName: string, threadParentName: string): Promise<void>;
        getSyncedQueue(threadId: string, queueId: string): import("threadcomm/Queue/SyncedQueue.js").SyncedQueue | undefined;
        addComm(comm: import("threadcomm").CommBase): void;
        createComm<T_3>(name: string, mergeObject?: T_3 | undefined): T_3 & import("threadcomm").CommBase;
        createCommManager(data: import("threadcomm/Meta/Manager/Manager.types.js").CommManagerData): import("threadcomm").CommManager;
        getComm(id: string): import("threadcomm").CommBase;
        getCommManager(id: string): import("threadcomm").CommManager;
        getWorkerPort(): Promise<any>;
        registerTasks<T_1>(id: string | number, run: (data: T_1, onDone?: ((data?: any, transfers?: any) => void) | undefined) => void, mode?: "async" | "deferred" | undefined): void;
        onDataSync<T_2, K_1>(dataType: string | number, onSync?: ((data: T_2) => void) | undefined, onUnSync?: ((data: K_1) => void) | undefined): import("threadcomm").DataSync<T_2, K_1>;
    };
    parentComm: import("threadcomm").CommBase;
    worldComm: import("threadcomm").CommBase;
    tasks: {
        data: {
            syncTextures: void;
        };
        build: {
            nodeMesh: void;
            chunk: {
                tasks: void;
            };
            column: void;
        };
        voxelUpdate: {
            update: void;
            erase: void;
            paint: void;
        };
        explosion: void;
        worldSun: void;
        worldGen: {
            generate: void;
            decorate: void;
        };
        anaylzer: {
            propagation: void;
            update: void;
        };
    };
    hooks: {
        texturesRegistered: import("divine-hooks/Classes/SyncHook.js").SyncHook<{
            textureDataHasBeenSet: boolean;
            data: import("../index.js").TextureTypeUVMap;
            getTextureUV(data: import("../index.js").ConstructorTextureData, overlay?: boolean): number;
            setUVTextureMap(data: import("../index.js").TextureTypeUVMap): void;
            releaseTextureData(): void;
            isReady(): boolean;
        }, void>;
    };
    requests: {
        getLightUpdateRequest(origin: import("voxelspaces").LocationData, buildQueue?: string, originThread?: string): {
            rebuildQueMap: Map<string, boolean>;
            comm: import("threadcomm").CommBase;
            priority: import("../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: import("voxelspaces").LocationData[];
            aSyncQueue: import("voxelspaces").LocationData[];
            buildMode: "async" | "sync";
            buildTasks: import("../Meta/Tasks/Tasks.types.js").PriorityTask<import("../Meta/Tasks/Tasks.types.js").BuildTasks>;
            rebuildTasks: import("../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
            tasksType: string;
            origin: import("voxelspaces").LocationData;
            data: any;
            buildQueue: string;
            originThread: string;
            queues: {
                rgb: {
                    update: number[];
                    remove: number[];
                    map: import("../Global/Util/VisistedMap.js").VisitedMap;
                };
                sun: {
                    update: number[];
                    remove: number[];
                    updateMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                    remvoeMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                };
            };
            start(): any;
            stop(): any;
            setPriority(priority: import("../Meta/Tasks/Tasks.types.js").Priorities): any;
            getData(): any;
            getOriginThread(): import("voxelspaces").LocationData;
            getBuildQueue(): string;
            getOrigin(): import("voxelspaces").LocationData;
            needsRebuild(): boolean;
            needsToUpdateOriginThread(): boolean;
            setBuldMode(mode: "async" | "sync"): any;
            addToRebuildQueue(x: number, y: number, z: number): boolean;
            addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
            runRebuildQueue(): any;
        };
        getFlowUpdateRequest(origin: import("voxelspaces").LocationData, buildQueue?: string, originThread?: string): {
            rebuildQueMap: Map<string, boolean>;
            comm: import("threadcomm").CommBase;
            priority: import("../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: import("voxelspaces").LocationData[];
            aSyncQueue: import("voxelspaces").LocationData[];
            buildMode: "async" | "sync";
            buildTasks: import("../Meta/Tasks/Tasks.types.js").PriorityTask<import("../Meta/Tasks/Tasks.types.js").BuildTasks>;
            rebuildTasks: import("../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
            tasksType: string;
            origin: import("voxelspaces").LocationData;
            data: null;
            buildQueue: string;
            originThread: string;
            queues: {
                flow: {
                    update: {
                        queue: number[][];
                        map: import("../Global/Util/VisistedMap.js").VisitedMap;
                    };
                    remove: {
                        queue: number[][];
                        map: import("../Global/Util/VisistedMap.js").VisitedMap;
                        noRemoveMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                    };
                };
                rgb: {
                    update: number[];
                    remove: number[];
                    map: import("../Global/Util/VisistedMap.js").VisitedMap;
                };
                sun: {
                    update: number[];
                    remove: number[];
                    updateMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                    remvoeMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                };
            };
            start(): any;
            stop(): any;
            setPriority(priority: import("../Meta/Tasks/Tasks.types.js").Priorities): any;
            getData(): null;
            getOriginThread(): import("voxelspaces").LocationData;
            getBuildQueue(): string;
            getOrigin(): import("voxelspaces").LocationData;
            needsRebuild(): boolean;
            needsToUpdateOriginThread(): boolean;
            setBuldMode(mode: "async" | "sync"): any;
            addToRebuildQueue(x: number, y: number, z: number): boolean;
            addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
            runRebuildQueue(): any;
        };
        getVoxelUpdateRequests(origin: import("voxelspaces").LocationData, buildQueue?: string, originThread?: string): {
            rebuildQueMap: Map<string, boolean>;
            comm: import("threadcomm").CommBase;
            priority: import("../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: import("voxelspaces").LocationData[];
            aSyncQueue: import("voxelspaces").LocationData[];
            buildMode: "async" | "sync";
            buildTasks: import("../Meta/Tasks/Tasks.types.js").PriorityTask<import("../Meta/Tasks/Tasks.types.js").BuildTasks>;
            rebuildTasks: import("../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
            tasksType: string;
            origin: import("voxelspaces").LocationData;
            data: null;
            buildQueue: string;
            originThread: string;
            queues: {
                flow: {
                    update: {
                        queue: number[][];
                        map: import("../Global/Util/VisistedMap.js").VisitedMap;
                    };
                    remove: {
                        queue: number[][];
                        map: import("../Global/Util/VisistedMap.js").VisitedMap;
                        noRemoveMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                    };
                };
                rgb: {
                    update: number[];
                    remove: number[];
                    map: import("../Global/Util/VisistedMap.js").VisitedMap;
                };
                sun: {
                    update: number[];
                    remove: number[];
                    updateMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                    remvoeMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                };
            };
            start(): any;
            stop(): any;
            setPriority(priority: import("../Meta/Tasks/Tasks.types.js").Priorities): any;
            getData(): null;
            getOriginThread(): import("voxelspaces").LocationData;
            getBuildQueue(): string;
            getOrigin(): import("voxelspaces").LocationData;
            needsRebuild(): boolean;
            needsToUpdateOriginThread(): boolean;
            setBuldMode(mode: "async" | "sync"): any;
            addToRebuildQueue(x: number, y: number, z: number): boolean;
            addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
            runRebuildQueue(): any;
        };
        getWorldSunRequests(origin: import("voxelspaces").LocationData, buildQueue?: string, originThread?: string): {
            rebuildQueMap: Map<string, boolean>;
            comm: import("threadcomm").CommBase;
            priority: import("../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: import("voxelspaces").LocationData[];
            aSyncQueue: import("voxelspaces").LocationData[];
            buildMode: "async" | "sync";
            buildTasks: import("../Meta/Tasks/Tasks.types.js").PriorityTask<import("../Meta/Tasks/Tasks.types.js").BuildTasks>;
            rebuildTasks: import("../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
            tasksType: string;
            origin: import("voxelspaces").LocationData;
            data: null;
            buildQueue: string;
            originThread: string;
            queues: {
                sun: number[];
            };
            start(): any;
            stop(): any;
            setPriority(priority: import("../Meta/Tasks/Tasks.types.js").Priorities): any;
            getData(): null;
            getOriginThread(): import("voxelspaces").LocationData;
            getBuildQueue(): string;
            getOrigin(): import("voxelspaces").LocationData;
            needsRebuild(): boolean;
            needsToUpdateOriginThread(): boolean;
            setBuldMode(mode: "async" | "sync"): any;
            addToRebuildQueue(x: number, y: number, z: number): boolean;
            addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
            runRebuildQueue(): any;
        };
        getExplosionRequests(origin: import("voxelspaces").LocationData, radius: number, buildQueue?: string, originThread?: string): {
            rebuildQueMap: Map<string, boolean>;
            comm: import("threadcomm").CommBase;
            priority: import("../Meta/Tasks/Tasks.types.js").Priorities;
            LOD: number;
            syncQueue: import("voxelspaces").LocationData[];
            aSyncQueue: import("voxelspaces").LocationData[];
            buildMode: "async" | "sync";
            buildTasks: import("../Meta/Tasks/Tasks.types.js").PriorityTask<import("../Meta/Tasks/Tasks.types.js").BuildTasks>;
            rebuildTasks: import("../Meta/Tasks/Tasks.types.js").AddToRebuildQueue;
            tasksType: string;
            origin: import("voxelspaces").LocationData;
            data: number;
            buildQueue: string;
            originThread: string;
            queues: {
                flow: {
                    update: {
                        queue: number[][];
                        map: import("../Global/Util/VisistedMap.js").VisitedMap;
                    };
                    remove: {
                        queue: number[][];
                        map: import("../Global/Util/VisistedMap.js").VisitedMap;
                        noRemoveMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                    };
                };
                rgb: {
                    update: number[];
                    remove: number[];
                    map: import("../Global/Util/VisistedMap.js").VisitedMap;
                };
                sun: {
                    update: number[];
                    remove: number[];
                    updateMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                    remvoeMap: import("../Global/Util/VisistedMap.js").VisitedMap;
                };
                queue: [x: number, y: number, z: number][];
                map: import("../Global/Util/VisistedMap.js").VisitedMap;
            };
            start(): any;
            stop(): any;
            setPriority(priority: import("../Meta/Tasks/Tasks.types.js").Priorities): any;
            getData(): number;
            getOriginThread(): import("voxelspaces").LocationData;
            getBuildQueue(): string;
            getOrigin(): import("voxelspaces").LocationData;
            needsRebuild(): boolean;
            needsToUpdateOriginThread(): boolean;
            setBuldMode(mode: "async" | "sync"): any;
            addToRebuildQueue(x: number, y: number, z: number): boolean;
            addNeighborsToRebuildQueue(x: number, y: number, z: number): false | any | undefined;
            runRebuildQueue(): any;
        };
    };
    $INIT(): Promise<void>;
    getDataTool(): DataTool;
    getRichDataTool(): RichDataTool;
};
export type DivineVoxelEngineConstructor = typeof DVEC;
