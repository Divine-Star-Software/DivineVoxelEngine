import type { EngineSettingsData } from "Meta/index.js";
export declare const DVEC: {
    environment: "node" | "browser";
    __settingsHaveBeenSynced: boolean;
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
    };
    propagation: {
        illumination: {
            lightData: {
                SRS: number;
                _lightValues: [s: number, r: number, g: number, b: number];
                getS(value: number): number;
                getR(value: number): number;
                getG(value: number): number;
                getB(value: number): number;
                setS(value: number, sl: number): number;
                setR(value: number, sl: number): number;
                setG(value: number, sl: number): number;
                setB(value: number, sl: number): number;
                removeS(sl: number): number;
                hasRGBLight(sl: number): boolean;
                getRGB(sl: number): number;
                setRGB(value: number, sl: number): number;
                decodeLightFromVoxelData(voxelData: number): number;
                encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
                setLightValues(values: number[]): number;
                getLightValues(value: number): [s: number, r: number, g: number, b: number];
                isLessThanForRGBRemove(n1: number, n2: number): boolean;
                isLessThanForRGBAdd(n1: number, n2: number): boolean;
                isGreaterOrEqualThanForRGBRemove(n1: number, n2: number): boolean;
                getMinusOneForRGB(sl: number, nl: number): number;
                removeRGBLight(sl: number): number;
                getFullSunLight(sl: number): number;
                isLessThanForSunAdd(n1: number, n2: number): boolean;
                isLessThanForSunAddDown(n1: number, n2: number): boolean;
                isLessThanForSunAddUp(n1: number, n2: number): boolean;
                getSunLightForUnderVoxel(sl: number, nl: number): number;
                getMinusOneForSun(sl: number, nl: number): number;
                isLessThanForSunRemove(n1: number, sl: number): boolean;
                isGreaterOrEqualThanForSunRemove(n1: number, sl: number): boolean;
                sunLightCompareForDownSunRemove(n1: number, sl: number): boolean;
                removeSunLight(sl: number): number;
                minusOneForAll(sl: number): number;
            };
            runSunLightUpdateAt: typeof import("./Propagation/Illumanation/Functions/SunLight.js").runSunLightUpdateAt;
            runSunLightUpdate: typeof import("./Propagation/Illumanation/Functions/SunLight.js").runSunLightUpdate;
            runSunLightRemove: typeof import("./Propagation/Illumanation/Functions/SunLight.js").runSunLightRemove;
            runSunLightRemoveAt: typeof import("./Propagation/Illumanation/Functions/SunLight.js").runSunLightRemoveAt;
            _sunLightUpdate: import("../Global/Util/Queue.js").Queue<number[]>;
            _sunLightRemove: number[][];
            runWorldSun: typeof import("./Propagation/Illumanation/Functions/WorldSun.js").RunWorldSun;
            _worldSunQueue: number[][];
            runRGBUpdateAt: typeof import("./Propagation/Illumanation/Functions/RGBLight.js").runRGBUpdateAt;
            runRGBUpdate: typeof import("./Propagation/Illumanation/Functions/RGBLight.js").runRGBUpdate;
            runRGBRemoveAt: typeof import("./Propagation/Illumanation/Functions/RGBLight.js").runRGBRemoveAt;
            runRGBRemove: typeof import("./Propagation/Illumanation/Functions/RGBLight.js").runRGBRemove;
            _RGBlightUpdateQ: number[][];
            _RGBlightRemovalQ: number[][];
            _sDataTool: import("../Tools/Data/DataTool.js").DataTool;
            _nDataTool: import("../Tools/Data/DataTool.js").DataTool;
            addToRebuildQue(x: number, y: number, z: number): void;
        };
        flow: {
            lightData: {
                SRS: number;
                _lightValues: [s: number, r: number, g: number, b: number];
                getS(value: number): number;
                getR(value: number): number;
                getG(value: number): number;
                getB(value: number): number;
                setS(value: number, sl: number): number;
                setR(value: number, sl: number): number;
                setG(value: number, sl: number): number;
                setB(value: number, sl: number): number;
                removeS(sl: number): number;
                hasRGBLight(sl: number): boolean;
                getRGB(sl: number): number;
                setRGB(value: number, sl: number): number;
                decodeLightFromVoxelData(voxelData: number): number;
                encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
                setLightValues(values: number[]): number;
                getLightValues(value: number): [s: number, r: number, g: number, b: number];
                isLessThanForRGBRemove(n1: number, n2: number): boolean;
                isLessThanForRGBAdd(n1: number, n2: number): boolean;
                isGreaterOrEqualThanForRGBRemove(n1: number, n2: number): boolean;
                getMinusOneForRGB(sl: number, nl: number): number;
                removeRGBLight(sl: number): number;
                getFullSunLight(sl: number): number;
                isLessThanForSunAdd(n1: number, n2: number): boolean;
                isLessThanForSunAddDown(n1: number, n2: number): boolean;
                isLessThanForSunAddUp(n1: number, n2: number): boolean;
                getSunLightForUnderVoxel(sl: number, nl: number): number;
                getMinusOneForSun(sl: number, nl: number): number;
                isLessThanForSunRemove(n1: number, sl: number): boolean;
                isGreaterOrEqualThanForSunRemove(n1: number, sl: number): boolean;
                sunLightCompareForDownSunRemove(n1: number, sl: number): boolean;
                removeSunLight(sl: number): number;
                minusOneForAll(sl: number): number;
            };
            dimension: string;
            currentVoxel: number;
            _visitedMap: Map<string, boolean>;
            _removeMap: Map<string, boolean>;
            _flowQue: number[][];
            _flowRemoveQue: number[][];
            _brush: import("../Tools/Brush/Brush.js").BrushTool;
            _sDataTool: import("../Tools/Data/DataTool.js").DataTool;
            _nDataTool: import("../Tools/Data/DataTool.js").DataTool;
            runRemovePropagation: typeof import("./Propagation/Flow/Functions/RunFlowRemove.js").RunRemovePropagation;
            runFlowReduce: typeof import("./Propagation/Flow/Functions/RunFlowRemove.js").RunFlowReduce;
            runFlowRemove: typeof import("./Propagation/Flow/Functions/RunFlowRemove.js").RunFlowRemove;
            runFlow: typeof import("./Propagation/Flow/Functions/RunFlow.js").RunFlow;
            runFlowNoChunkRebuild: typeof import("./Propagation/Flow/Functions/RunFlowNoChunkBuild.js").RunFlowNoChunkBuild;
            runFlowIncrease: typeof import("./Propagation/Flow/Functions/RunFlow.js").RunFlowIncrease;
            runFlowPropagation: typeof import("./Propagation/Flow/Functions/RunFlow.js").RunFlowPropagation;
            rebuildQue: number[][];
            rebuildMap: Record<string, boolean>;
            addToMap(x: number, y: number, z: number): void;
            inMap(x: number, y: number, z: number): boolean;
            addToRemoveMap(x: number, y: number, z: number): void;
            inRemoveMap(x: number, y: number, z: number): boolean;
            removeFromRemoveMap(x: number, y: number, z: number): boolean;
            setVoxel(level: number, levelState: number, x: number, y: number, z: number): void;
            removeVoxel(x: number, y: number, z: number): void;
            flowOutCheck(l: number, nl: number, ns: number, x: number, y: number, z: number): void;
            runRemoveCheck(x: number, y: number, z: number): void;
            setCurrentVoxel(x: number, y: number, z: number): boolean;
            runRebuildQue(): void;
            __addToRebuildQue(x: number, y: number, z: number): void;
            resetRebuildQue(): void;
            addToRebuildQue(x: number, y: number, z: number, sync?: boolean): void;
            setLevel(level: number, x: number, y: number, z: number): void;
            getLevel(x: number, y: number, z: number): number;
            getLevelState(x: number, y: number, z: number): number;
            canFlowOutwardTest(x: number, y: number, z: number): boolean;
            flowDownTest(x: number, y: number, z: number): boolean;
            wait(ms: number): Promise<unknown>;
            _lightValues: [s: number, r: number, g: number, b: number];
            getAbsorbLight(x: number, y: number, z: number): number;
            sunCheck(x: number, y: number, z: number): void;
        };
        explosion: {
            _queue: number[][];
            _visitedMap: Map<string, boolean>;
            addToMap(x: number, y: number, z: number): void;
            inMap(x: number, y: number, z: number): boolean;
            runExplosion(dimension: string, sx: number, sy: number, sz: number, radius: number): void;
        };
        rebuildQueMap: Map<string, Map<string, boolean>>;
        $INIT(): void;
        _dimension: string;
        _buildQueue: string;
        addToRebuildQue(x: number, y: number, z: number, substance: import("Meta/index.js").VoxelSubstanceType | "all"): void;
        setBuildData(dimension: string, buildQueue: string): void;
        _process(data: import("../Meta/Tasks/Tasks.types.js").UpdateTasksO): void;
        resetRebuildQue(): void;
        runRebuildQue(): void;
        runRGBUpdate(data: import("../Meta/Tasks/Tasks.types.js").UpdateTasksO): void;
        runRGBRemove(data: import("../Meta/Tasks/Tasks.types.js").UpdateTasksO): void;
        runSunLightUpdate(data: import("../Meta/Tasks/Tasks.types.js").UpdateTasksO): void;
        runSunLightRemove(data: import("../Meta/Tasks/Tasks.types.js").UpdateTasksO): void;
        updateFlowAt(data: import("../Meta/Tasks/Tasks.types.js").UpdateTasksO): Promise<void>;
        removeFlowAt(data: import("../Meta/Tasks/Tasks.types.js").UpdateTasksO): Promise<void>;
        runExplosion(data: import("../Meta/Tasks/Tasks.types.js").ExplosionTasks): void;
        runWorldSun(data: import("../Meta/Tasks/Tasks.types.js").WorldSunTask): void;
    };
    worldGen: {
        worldGen: import("../Meta/Interfaces/WorldGen/WorldGen.types.js").WorldGenInterface | null;
        register: {
            _requests: Map<string, {
                dimension: string;
                chunks: Map<string, [x: number, y: number, z: number]>;
                voxels: [x: number, y: number, z: number, data: import("Meta/index.js").RawVoxelData][];
            }>;
            registerRequest(dimension: string, x: number, y: number, z: number): string;
            addToRequest(registerId: string, x: number, y: number, z: number, rawData: import("Meta/index.js").RawVoxelData): void;
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
        setWorldGen(worldGen: import("../Meta/Interfaces/WorldGen/WorldGen.types.js").WorldGenInterface): void;
        generate(data: import("../Meta/Tasks/Tasks.types.js").GenerateTasks, onDone: Function): void;
        getBrush(): import("../Tools/Brush/Brush.js").BrushTool & {
            requestsId: string;
            paint(this: import("../Tools/Brush/Brush.js").BrushTool): import("../Tools/Brush/Brush.js").BrushTool;
        };
    };
    builder: {
        textureManager: {
            textureDataHasBeenSet: boolean;
            uvTextureMap: Record<import("Meta/index.js").TextureTypes, Record<string, number>>;
            overlayUVTextureMap: Record<import("Meta/index.js").TextureTypes, Record<string, number>>;
            getTextureUV(textureType: import("Meta/index.js").TextureTypes, textureId: string, varation?: string | false | null, overlay?: boolean): number;
            setUVTextureMap(data: Record<import("Meta/index.js").TextureTypes, Record<string, number>>): void;
            setOverlayUVTextureMap(data: Record<import("Meta/index.js").TextureTypes, Record<string, number>>): void;
            releaseTextureData(): void;
            isReady(): boolean;
        };
        shapeManager: {
            shapes: Record<number, import("Meta/index.js").VoxelShape>;
            shapeMap: Record<string, number>;
            shapeCount: number;
            registerShape(shapeObject: import("Meta/index.js").VoxelShape): void;
            getShape(shapeId: number): import("Meta/index.js").VoxelShape;
            getShapeId(shapeId: string): number;
            getShapeMap(): Record<string, number>;
        };
        chunkMesher: {
            voxelBuildOrder: import("Meta/index.js").VoxelTemplateSubstanceType[];
            buildChunkMesh(dimension: string, chunkX: number, chunkY: number, chunkZ: number, template: import("../Meta/Constructor/ChunkTemplate.types.js").FullChunkTemplate, LOD?: number): void;
        };
        entityMesher: {
            buildEntityMesh(x: number, y: number, z: number, template: import("../Meta/Constructor/ChunkTemplate.types.js").ChunkTemplate): void;
        };
        itemMesher: {
            createItem(itemId: string, x: number, y: number, z: number): void;
        };
        processor: {
            LOD: number;
            mDataTool: import("../Meta/Constructor/Constructor.types.js").ConstructorDataTool;
            nDataTool: import("../Meta/Constructor/Constructor.types.js").ConstructorDataTool;
            faceByte: {
                _rotationMap: Record<import("../Meta/Constructor/Geometry/Geometry.types.js").TextureRotations, number>;
                _rotationReverseMap: Record<number, import("../Meta/Constructor/Geometry/Geometry.types.js").TextureRotations>;
                _setFaceTextureState: Record<import("Meta/index.js").DirectionNames, (state: number, faceBit: number) => number>;
                _getFaceTextureState: Record<import("Meta/index.js").DirectionNames, (faceBit: number) => number>;
                _setFaceRotateState: Record<import("Meta/index.js").DirectionNames, (state: number, faceBit: number) => number>;
                _getFaceRotateState: Record<import("Meta/index.js").DirectionNames, (faceBit: number) => number>;
                _markExposedFace: Record<import("Meta/index.js").DirectionNames, (faceBit: number) => number>;
                _checkExposedFace: Record<import("Meta/index.js").DirectionNames, (faceBit: number) => boolean>;
                markFaceAsExposed(direction: import("Meta/index.js").DirectionNames, rawData: number): number;
                isFaceExposed(direction: import("Meta/index.js").DirectionNames, rawData: number): boolean;
                setFaceRotateState(direction: import("Meta/index.js").DirectionNames, state: number, rawData: number): number;
                getFaceRotateState(direction: import("Meta/index.js").DirectionNames, rawData: number): number;
                setFaceTextureState(direction: import("Meta/index.js").DirectionNames, rotation: import("../Meta/Constructor/Geometry/Geometry.types.js").TextureRotations, rawData: number): number;
                getFaceTextureState(direction: import("Meta/index.js").DirectionNames, rawData: number): import("../Meta/Constructor/Geometry/Geometry.types.js").TextureRotations;
            };
            lightData: {
                SRS: number;
                _lightValues: [s: number, r: number, g: number, b: number];
                getS(value: number): number;
                getR(value: number): number;
                getG(value: number): number;
                getB(value: number): number;
                setS(value: number, sl: number): number;
                setR(value: number, sl: number): number;
                setG(value: number, sl: number): number;
                setB(value: number, sl: number): number;
                removeS(sl: number): number;
                hasRGBLight(sl: number): boolean;
                getRGB(sl: number): number;
                setRGB(value: number, sl: number): number;
                decodeLightFromVoxelData(voxelData: number): number;
                encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
                setLightValues(values: number[]): number;
                getLightValues(value: number): [s: number, r: number, g: number, b: number];
                isLessThanForRGBRemove(n1: number, n2: number): boolean;
                isLessThanForRGBAdd(n1: number, n2: number): boolean;
                isGreaterOrEqualThanForRGBRemove(n1: number, n2: number): boolean;
                getMinusOneForRGB(sl: number, nl: number): number;
                removeRGBLight(sl: number): number;
                getFullSunLight(sl: number): number;
                isLessThanForSunAdd(n1: number, n2: number): boolean;
                isLessThanForSunAddDown(n1: number, n2: number): boolean;
                isLessThanForSunAddUp(n1: number, n2: number): boolean;
                getSunLightForUnderVoxel(sl: number, nl: number): number;
                getMinusOneForSun(sl: number, nl: number): number;
                isLessThanForSunRemove(n1: number, sl: number): boolean;
                isGreaterOrEqualThanForSunRemove(n1: number, sl: number): boolean;
                sunLightCompareForDownSunRemove(n1: number, sl: number): boolean;
                removeSunLight(sl: number): number;
                minusOneForAll(sl: number): number;
            };
            calculatFlow: typeof import("./Builder/Processor/Functions/CalculateFlow.js").CalculateFlow;
            voxellightMixCalc: typeof import("./Builder/Processor/Functions/CalculateVoxelLight.js").VoxelLightMixCalc;
            doVoxelLight: typeof import("./Builder/Processor/Functions/CalculateVoxelLight.js").CalculateVoxelLight;
            exposedFaces: number[];
            faceStates: number[];
            textureRotation: import("../Meta/Constructor/Geometry/Geometry.types.js").TextureRotations[];
            settings: {
                doAO: boolean;
                doSun: boolean;
                doRGB: boolean;
                ignoreSun: boolean;
                entity: boolean;
                composedEntity: number;
            };
            voxelProcesseData: import("../Meta/Constructor/Voxel.types.js").VoxelProcessData;
            faceDataOverride: import("../Meta/Constructor/OverRide.types.js").FaceDataOverride;
            aoOverRideData: any;
            template: import("../Meta/Constructor/ChunkTemplate.types.js").FullChunkTemplate;
            faceIndexMap: Record<import("Meta/index.js").DirectionNames, number>;
            dimension: number;
            $INIT(): void;
            cullCheck(face: import("Meta/index.js").DirectionNames, voxelObject: import("Meta/index.js").VoxelConstructorObject, voxelShape: import("Meta/index.js").VoxelShape, voxelSubstance: import("Meta/index.js").VoxelSubstanceType, x: number, y: number, z: number, faceBit: number): number;
            faceStateCheck(face: import("Meta/index.js").DirectionNames, faceBit: number): number;
            _process(template: import("../Meta/Constructor/ChunkTemplate.types.js").FullChunkTemplate, x: number, y: number, z: number, doSecondCheck?: boolean): void;
            constructEntity(composed?: number): import("../Meta/Constructor/ChunkTemplate.types.js").FullChunkTemplate;
            makeAllChunkTemplates(dimension: string, chunkX: number, chunkY: number, chunkZ: number, LOD?: number): import("../Meta/Constructor/ChunkTemplate.types.js").FullChunkTemplate;
            processVoxelLight(data: import("../Meta/Constructor/Voxel.types.js").VoxelProcessData, ignoreAO?: boolean): void;
            syncSettings(settings: EngineSettingsData): void;
            flush(): void;
        };
        voxelHelper: {
            substanceMap: Record<import("Meta/index.js").VoxelSubstanceType, number>;
            substanceRules: Record<string, boolean>;
            ruleMap: Record<number, boolean>;
            $INIT(): void;
            substanceRuleCheck(voxel: import("Meta/index.js").VoxelSubstanceType, neightborVoxel: import("Meta/index.js").VoxelSubstanceType): boolean;
        };
        entityConstructor: {
            voxelData: Uint32Array[];
            _3dArray: {
                bounds: {
                    x: number;
                    y: number;
                    z: number;
                };
                _position: {
                    x: number;
                    y: number;
                    z: number;
                };
                setBounds(x: number, y: number, z: number): void;
                getValue(x: number, y: number, z: number, array: number[] | Uint32Array): number;
                getValueUseObj(position: import("Meta/index.js").Vector3, array: number[] | Uint32Array): number;
                getValueUseObjSafe(position: import("Meta/index.js").Vector3, array: number[] | Uint32Array): number;
                setValue(x: number, y: number, z: number, array: number[] | Uint32Array, value: number): void;
                setValueUseObj(position: import("Meta/index.js").Vector3, array: number[] | Uint32Array, value: number): void;
                setValueUseObjSafe(position: import("Meta/index.js").Vector3, array: number[] | Uint32Array, value: number): void;
                deleteValue(x: number, y: number, z: number, array: number[] | Uint32Array): void;
                deleteUseObj(position: import("Meta/index.js").Vector3, array: number[] | Uint32Array): void;
                getIndex(x: number, y: number, z: number): number;
                getXYZ(index: number): import("Meta/index.js").Vector3;
            };
            voxelReader: {
                getLevel(stateData: number): number;
                setLevel(stateData: number, level: number): number;
                getLevelState(stateData: number): number;
                setLevelState(stateData: number, levelState: number): number;
                getShapeState(voxelData: number): number;
                setShapeState(voxelData: number, shapeState: number): number;
            };
            lightByte: {
                SRS: number;
                _lightValues: [s: number, r: number, g: number, b: number];
                getS(value: number): number;
                getR(value: number): number;
                getG(value: number): number;
                getB(value: number): number;
                setS(value: number, sl: number): number;
                setR(value: number, sl: number): number;
                setG(value: number, sl: number): number;
                setB(value: number, sl: number): number;
                removeS(sl: number): number;
                hasRGBLight(sl: number): boolean;
                getRGB(sl: number): number;
                setRGB(value: number, sl: number): number;
                decodeLightFromVoxelData(voxelData: number): number;
                encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
                setLightValues(values: number[]): number;
                getLightValues(value: number): [s: number, r: number, g: number, b: number];
                isLessThanForRGBRemove(n1: number, n2: number): boolean;
                isLessThanForRGBAdd(n1: number, n2: number): boolean;
                isGreaterOrEqualThanForRGBRemove(n1: number, n2: number): boolean;
                getMinusOneForRGB(sl: number, nl: number): number;
                removeRGBLight(sl: number): number;
                getFullSunLight(sl: number): number;
                isLessThanForSunAdd(n1: number, n2: number): boolean;
                isLessThanForSunAddDown(n1: number, n2: number): boolean;
                isLessThanForSunAddUp(n1: number, n2: number): boolean;
                getSunLightForUnderVoxel(sl: number, nl: number): number;
                getMinusOneForSun(sl: number, nl: number): number;
                isLessThanForSunRemove(n1: number, sl: number): boolean;
                isGreaterOrEqualThanForSunRemove(n1: number, sl: number): boolean;
                sunLightCompareForDownSunRemove(n1: number, sl: number): boolean;
                removeSunLight(sl: number): number;
                minusOneForAll(sl: number): number;
            };
            pos: {
                x: number;
                y: number;
                z: number;
            };
            totalComposed: number;
            width: number;
            depth: number;
            height: number;
            setEntityData(x: number, y: number, z: number, width: number, height: number, depth: number, composed: number, voxelData: Uint32Array[]): void;
            getVoxel(x: number, y: number, z: number, composed?: number): false | [string, number];
            getLevel(x: number, y: number, z: number, composed?: number): number;
            getLevelState(x: number, y: number, z: number, composed?: number): number;
            getShapeState(x: number, y: number, z: number, composed?: number): number;
            getLight(x: number, y: number, z: number, composed?: number): number;
            clearEntityData(): void;
        };
        dimension: number;
        $INIT(): Promise<void>;
        syncSettings(settings: EngineSettingsData): void;
        buildChunk(dimension: string, chunkX: number, chunkY: number, chunkZ: number, LOD?: number): Promise<true | undefined>;
        constructEntity(): void;
    };
    dataSyncNode: {
        _states: Record<string, boolean>;
        isReady(): boolean;
        voxelPalette: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Meta/Data/DataSync.types.js").VoxelPaletteSyncData, any>;
        voxelData: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Meta/Data/DataSync.types.js").VoxelDataSync, any>;
        materialMap: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Meta/Data/DataSync.types.js").VoxelMapSyncData, any>;
        colliderMap: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Meta/Data/DataSync.types.js").VoxelMapSyncData, any>;
        dimension: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Meta/Data/DimensionData.types.js").DimensionData, void>;
        chunk: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Meta/Data/DataSync.types.js").ChunkSyncData, import("../Meta/Data/DataSync.types.js").ChunkUnSyncData>;
        column: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Meta/Data/DataSync.types.js").ChunkSyncData, import("../Meta/Data/DataSync.types.js").ChunkUnSyncData>;
        region: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Meta/Data/DataSync.types.js").RegionSyncData, import("../Meta/Data/DataSync.types.js").RegionUnSyncData>;
        regionHeader: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Meta/Data/DataSync.types.js").RegionSyncData, import("../Meta/Data/DataSync.types.js").RegionUnSyncData>;
        chunkTags: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Libs/DivineBinaryTags/Types/Util.types.js").RemoteTagManagerInitData, void>;
        columnTags: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Libs/DivineBinaryTags/Types/Util.types.js").RemoteTagManagerInitData, void>;
        regionTags: import("../Libs/ThreadComm/Data/DataSync.js").DataSync<import("../Libs/DivineBinaryTags/Types/Util.types.js").RemoteTagManagerInitData[], void>;
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
            voxelMap: Uint16Array;
            substanceRecord: Record<number, import("Meta/index.js").VoxelSubstanceType>;
            materialMap: Record<number, string>;
            colliderMap: Record<number, string>;
            voxelData: {
                substance: import("Meta/index.js").VoxelSubstanceType;
                shapeId: number;
                hardness: number;
                material: string;
                checkCollision: number;
                colliderId: string;
                lightSource: number;
                lightValue: number;
                isRich: number;
            };
            id: string;
            sync(voxelMap: Uint16Array): void;
            setVoxel(id: number): void;
            getVoxelData(id: number): {
                substance: import("Meta/index.js").VoxelSubstanceType;
                shapeId: number;
                hardness: number;
                material: string;
                checkCollision: number;
                colliderId: string;
                lightSource: number;
                lightValue: number;
                isRich: number;
            };
            getTrueSubstance(id: number): import("Meta/index.js").VoxelSubstanceType;
            getMaterial(id: number): string;
            getCollider(id: number): string;
            $INIT(data: import("../Libs/DivineBinaryTags/Types/Util.types.js").RemoteTagManagerInitData): void;
            byteOffSet: number;
            tagSize: number;
            tagIndexes: number;
            data: DataView;
            indexMap: Map<string, number>;
            index: DataView;
            setBuffer(data: DataView | import("../Libs/DivineBinaryTags/Types/Util.types.js").BufferTypes): void;
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
            util: {
                isSameVoxel(dimensionId: string | number, x: number, y: number, z: number, x2: number, y2: number, z2: number, secondary?: boolean): boolean;
            };
            paint: {
                _dt: import("../Tools/Data/DataTool.js").DataTool;
                voxel(data: import("../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): void;
                voxelAsync(data: import("../Meta/Data/WorldData.types.js").AddVoxelData): Promise<void>;
                __paint(dimension: string, data: import("../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): false | undefined;
                erase(dimensionId: string | number, x: number, y: number, z: number): void;
            };
        };
        worldRegister: {
            _dimensions: import("../Meta/Data/WorldData.types.js").WorldDimensions;
            _cacheOn: boolean;
            _chunkCache: Map<string, import("../Meta/Data/WorldData.types.js").ChunkData>;
            _columnCache: Map<string, import("../Meta/Data/WorldData.types.js").Column>;
            $INIT(): void;
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
                add(dimensionId: string, x: number, y: number, z: number, sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Region;
                _getRegionData(sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Region;
                get(dimensionId: string, x: number, y: number, z: number): false | import("../Meta/Data/WorldData.types.js").Region;
            };
            column: {
                add(dimensionId: string, x: number, z: number, y: number | undefined, sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Column | undefined;
                _getColumnData(sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").Column;
                get(dimensionId: string, x: number, z: number, y?: number): false | import("../Meta/Data/WorldData.types.js").Column;
                fill(dimensionId: string, x: number, z: number, y?: number): void;
                height: {
                    getRelative(dimensionId: string, x: number, z: number, y?: number): number;
                    getAbsolute(dimensionId: string, x: number, z: number, y?: number): number;
                };
            };
            chunk: {
                add(dimensionId: string, x: number, y: number, z: number, sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
                _getChunkData(sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").ChunkData;
                addFromServer(chunkBuffer: ArrayBuffer): import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
                get(dimensionId: string, x: number, y: number, z: number): false | import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
            };
        };
        columnTags: import("../Libs/DivineBinaryTags/RemoteTagManager.js").RemoteTagManager;
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
                };
                getRegionPositonxXYZ(x: number, y: number, z: number): {
                    x: number;
                    y: number;
                    z: number;
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
        register: {
            voxels: {
                substanceMap: Record<import("Meta/index.js").VoxelSubstanceType, number>;
                substanceRecord: Record<number, import("Meta/index.js").VoxelSubstanceType>;
                materialMap: Record<number, string>;
                colliderMap: Record<number, string>;
            };
        };
        chunkTags: import("../Libs/DivineBinaryTags/RemoteTagManager.js").RemoteTagManager;
        regionTags: import("../Libs/DivineBinaryTags/RemoteTagManager.js").RemoteTagManager;
        regionHeaderReigster: {
            _headers: Map<string, Map<string, {
                data: DataView;
                buffer: SharedArrayBuffer;
            }>>;
            add(location: import("../Meta/Data/CommonTypes.js").LocationData, buffer: SharedArrayBuffer): void;
            get(location: import("../Meta/Data/CommonTypes.js").LocationData): false | {
                data: DataView;
                buffer: SharedArrayBuffer;
            } | undefined;
            isStored(location: import("../Meta/Data/CommonTypes.js").LocationData): 1 | 0 | -1;
        };
    };
    itemManager: {
        itemObjects: Record<string, import("../Meta/Data/Items/Item.types.js").ItemConstructorObject>;
        itemShapes: Record<string, import("../Meta/Constructor/ItemShape.type.js").ItemShapeData>;
        getItem(id: string): import("../Meta/Data/Items/Item.types.js").ItemConstructorObject;
        registerItem(item: import("../Meta/Data/Items/Item.types.js").ItemConstructorObject): void;
        registerItemShape(shapeData: import("../Meta/Constructor/ItemShape.type.js").ItemShapeData): void;
        getItemShapeData(id: string): import("../Meta/Constructor/ItemShape.type.js").ItemShapeData;
        runItemHookForAll(hook: any): void;
        removeItemHookForAll(hook: any): void;
    };
    voxelManager: {
        voxelObjects: Record<string, import("Meta/index.js").VoxelConstructorObject>;
        syncShapeData(): Generator<never, void, unknown>;
        getVoxel(id: string): import("Meta/index.js").VoxelConstructorObject;
        registerVoxel(voxel: import("Meta/index.js").VoxelConstructorObject): void;
        runVoxelHookForAll(hook: any): void;
        removeVoxelHookForAll(hook: any): void;
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
    parentComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
    worldComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
    tasks: {
        build: {
            chunk: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Tasks/Tasks.types.js").BuildTasks>;
            column: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Tasks/Tasks.types.js").BuildTasks>;
            entity: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<any[]>;
            item: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<any[]>;
        };
        voxelUpdate: {
            erase: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Tasks/Tasks.types.js").UpdateTasksO>;
            paint: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Tasks/Tasks.types.js").PaintTasks>;
        };
        rgb: {
            update: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Tasks/Tasks.types.js").UpdateTasksO>;
            remove: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Tasks/Tasks.types.js").UpdateTasksO>;
        };
        worldSun: {
            run: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Tasks/Tasks.types.js").WorldSunTask>;
        };
        sun: {
            update: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Tasks/Tasks.types.js").UpdateTasksO>;
            remove: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Tasks/Tasks.types.js").UpdateTasksO>;
        };
        explosion: {
            run: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Tasks/Tasks.types.js").ExplosionTasks>;
        };
        flow: {
            update: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Tasks/Tasks.types.js").UpdateTasksO>;
            remove: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Tasks/Tasks.types.js").UpdateTasksO>;
        };
        worldGen: {
            generate: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Tasks/Tasks.types.js").GenerateTasks>;
        };
    };
    syncSettings(data: EngineSettingsData): void;
    reStart(): void;
    isReady(): boolean;
    $INIT(): Promise<void>;
    getDataTool(): import("../Meta/Constructor/Constructor.types.js").ConstructorDataTool;
};
export declare type DivineVoxelEngineConstructor = typeof DVEC;
