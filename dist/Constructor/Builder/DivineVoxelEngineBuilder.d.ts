import { type EngineSettingsData } from "Meta/index.js";
export declare const DVEB: {
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
        shapes: Record<number, import("Meta/index.js").VoxelShapeInterface>;
        shapeMap: Record<string, number>;
        shapeCount: number;
        registerShape(shapeObject: import("Meta/index.js").VoxelShapeInterface): void;
        getShape(shapeId: number): import("Meta/index.js").VoxelShapeInterface;
        getShapeId(shapeId: string): number;
        getShapeMap(): Record<string, number>;
    };
    shapeHelper: {
        faceByte: {
            _rotationMap: Record<import("../../Meta/Constructor/Mesher.types.js").Rotations, number>;
            _rotationReverseMap: Record<number, import("../../Meta/Constructor/Mesher.types.js").Rotations>;
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
            setFaceTextureState(direction: import("Meta/index.js").DirectionNames, rotation: import("../../Meta/Constructor/Mesher.types.js").Rotations, rawData: number): number;
            getFaceTextureState(direction: import("Meta/index.js").DirectionNames, rawData: number): import("../../Meta/Constructor/Mesher.types.js").Rotations;
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
        meshFaceData: {
            setAnimationType(animationType: number, rawData: number): number;
            getAnimationType(rawData: number): number;
        };
        lightMap: number[];
        shouldFaceFlip(faceBit: number, faceDirection: import("Meta/index.js").DirectionNames): boolean;
        getTextureRotation(faceBit: number, faceDirection: import("Meta/index.js").DirectionNames): import("../../Meta/Constructor/Mesher.types.js").Rotations;
        isFaceExposexd(faceBit: number, faceDirection: import("Meta/index.js").DirectionNames): boolean;
        produceShapeReturnData(shapeData: import("Meta/index.js").VoxelShapeAddData): import("Meta/index.js").VoxelShapeAddReturnData;
        toLinearSpace(r: number, g: number, b: number, a: number): number[];
        addFaceData(faceData: number, faceDataArray: number[]): void;
        calculateLightColor(RGBlightColors: number[], sunlightColors: number[], lightTemplate: number[], startIndex: number): void;
        calculateLightColorFromValue(RGBlightColors: number[], sunlightColors: number[], lightValue: number): void;
        calculateSunightColor(sunLight: number[], sunLightTemplate: number[], sunLightIndex: number): void;
        calculateAOColor(aoColors: number[], aoTemplate: number[], aoTemplateIndex: number): void;
        calculateAOColorFromValue(aoColors: number[], aoValue: number): void;
    };
    shapeBuilder: {
        faceFunctions: Record<import("Meta/index.js").DirectionNames, (origin: import("Meta/index.js").Position3Matrix, dimensions: {
            width: number;
            height: number;
            depth: number;
        }, data: import("Meta/index.js").VoxelShapeAddData | import("../../Meta/Constructor/ItemShape.type.js").CreateItemData, transform: {
            v1: {
                x: number;
                y: number;
                z: number;
            };
            v2: {
                x: number;
                y: number;
                z: number;
            };
            v3: {
                x: number;
                y: number;
                z: number;
            };
            v4: {
                x: number;
                y: number;
                z: number;
            };
        }, flip?: boolean | undefined) => void>;
        addFace(direction: import("Meta/index.js").DirectionNames, origin: import("Meta/index.js").Position3Matrix, dimensions: {
            width: number;
            height: number;
            depth: number;
        }, data: import("Meta/index.js").VoxelShapeAddData | import("../../Meta/Constructor/ItemShape.type.js").CreateItemData, flip?: boolean, transform?: {
            v1: {
                x: number;
                y: number;
                z: number;
            };
            v2: {
                x: number;
                y: number;
                z: number;
            };
            v3: {
                x: number;
                y: number;
                z: number;
            };
            v4: {
                x: number;
                y: number;
                z: number;
            };
        }): void;
    };
    uvHelper: {
        uvRotations: Record<"top" | "bottom" | "side", Record<import("../../Meta/Constructor/Mesher.types.js").Rotations, (uv: number, ws: number, we: number, hs: number, he: number, flipped: boolean, uvs: number[]) => void>>;
        advancedUVs: Record<"top" | "bottom" | "side", (uv: number, ws1: number, ws2: number, we1: number, we2: number, hs1: number, hs2: number, he1: number, he2: number, uvs: number[]) => void>;
        uvFunctions: Record<import("Meta/index.js").DirectionNames, (data: import("../../Meta/Constructor/Mesher.types.js").UVFunctionData) => void>;
        addUVs(face: import("Meta/index.js").DirectionNames, data: import("../../Meta/Constructor/Mesher.types.js").UVFunctionData): void;
        addAdvancedUVs(uv: number, uvs: number, ws1: number, ws2: number, we1: number, we2: number, hs1: number, hs2: number, he1: number, he2: number): void;
        processOverlayUVs(data: import("Meta/index.js").VoxelShapeAddData): void;
    };
    chunkMesher: {
        voxelBuildOrder: import("Meta/index.js").VoxelTemplateSubstanceType[];
        buildChunkMesh(dimension: number, chunkX: number, chunkY: number, chunkZ: number, template: import("../../Meta/Constructor/ChunkTemplate.types.js").FullChunkTemplate, LOD?: number): void;
    };
    entityMesher: {
        buildEntityMesh(x: number, y: number, z: number, template: import("../../Meta/Constructor/ChunkTemplate.types.js").ChunkTemplate): void;
    };
    itemMesher: {
        createItem(itemId: string, x: number, y: number, z: number): void;
    };
    processor: {
        LOD: number;
        mDataTool: import("../../Tools/Data/DataTool.js").DataTool;
        nDataTool: import("../../Tools/Data/DataTool.js").DataTool;
        heightByte: {
            _getHeightMapData: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
            _setHeightMapData: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
            _markSubstanceAsNotExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _markSubstanceAsExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _isSubstanceExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
            getStartingHeightMapValue(): number;
            initalizeChunk(chunkData: DataView): void;
            updateChunkMinMax(voxelPOS: import("Meta/index.js").Position3Matrix, chunkData: DataView): void;
            getChunkMin(chunkData: DataView): number;
            getChunkMax(chunkData: DataView): number;
            calculateHeightRemoveDataForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: DataView): boolean | undefined;
            calculateHeightAddDataForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            getLowestExposedVoxel(x: number, z: number, chunk: DataView): number;
            getHighestExposedVoxel(x: number, z: number, chunk: DataView): number;
            isSubstanceExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): boolean;
            markSubstanceAsExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            markSubstanceAsNotExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            setMinYForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            getMinYForSubstance(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
            setMaxYForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            getMaxYForSubstance(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
        };
        faceByte: {
            _rotationMap: Record<import("../../Meta/Constructor/Mesher.types.js").Rotations, number>;
            _rotationReverseMap: Record<number, import("../../Meta/Constructor/Mesher.types.js").Rotations>;
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
            setFaceTextureState(direction: import("Meta/index.js").DirectionNames, rotation: import("../../Meta/Constructor/Mesher.types.js").Rotations, rawData: number): number;
            getFaceTextureState(direction: import("Meta/index.js").DirectionNames, rawData: number): import("../../Meta/Constructor/Mesher.types.js").Rotations;
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
        calculatFlow: typeof import("./Processor/Functions/CalculateFlow.js").CalculateFlow;
        voxellightMixCalc: typeof import("./Processor/Functions/CalculateVoxelLight.js").VoxelLightMixCalc;
        doVoxelLight: typeof import("./Processor/Functions/CalculateVoxelLight.js").CalculateVoxelLight;
        exposedFaces: number[];
        faceStates: number[];
        textureRotation: import("../../Meta/Constructor/Mesher.types.js").Rotations[];
        settings: {
            doAO: boolean;
            doSun: boolean;
            doRGB: boolean;
            ignoreSun: boolean;
            entity: boolean;
            composedEntity: number;
        };
        voxelProcesseData: import("../../Meta/Constructor/Voxel.types.js").VoxelProcessData;
        cullFaceOverrideData: any;
        aoOverRideData: any;
        template: import("../../Meta/Constructor/ChunkTemplate.types.js").FullChunkTemplate;
        faceIndexMap: Record<import("Meta/index.js").DirectionNames, number>;
        dimension: number;
        $INIT(): void;
        cullCheck(face: import("Meta/index.js").DirectionNames, voxelId: string, voxelShapeId: number, voxelSubstance: import("Meta/index.js").VoxelSubstanceType, shapeState: number, x: number, y: number, z: number, faceBit: number): number;
        faceStateCheck(face: import("Meta/index.js").DirectionNames, faceBit: number): number;
        _process(template: import("../../Meta/Constructor/ChunkTemplate.types.js").FullChunkTemplate, x: number, y: number, z: number, doSecondCheck?: boolean): void;
        constructEntity(composed?: number): import("../../Meta/Constructor/ChunkTemplate.types.js").FullChunkTemplate;
        makeAllChunkTemplates(dimension: number, chunk: import("../../Meta/Data/WorldData.types.js").ChunkData, chunkX: number, chunkY: number, chunkZ: number, LOD?: number): import("../../Meta/Constructor/ChunkTemplate.types.js").FullChunkTemplate;
        processVoxelLight(data: import("../../Meta/Constructor/Voxel.types.js").VoxelProcessData, ignoreAO?: boolean): void;
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
            getValueUseObj(position: import("Meta/index.js").Position3Matrix, array: number[] | Uint32Array): number;
            getValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: number[] | Uint32Array): number;
            setValue(x: number, y: number, z: number, array: number[] | Uint32Array, value: number): void;
            setValueUseObj(position: import("Meta/index.js").Position3Matrix, array: number[] | Uint32Array, value: number): void;
            setValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: number[] | Uint32Array, value: number): void;
            deleteValue(x: number, y: number, z: number, array: number[] | Uint32Array): void;
            deleteUseObj(position: import("Meta/index.js").Position3Matrix, array: number[] | Uint32Array): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("Meta/index.js").Position3Matrix;
        };
        voxelReader: {
            setId(id: number, value: number): number;
            getId(value: number): number;
            getLight(voxelData: number): number;
            setLight(voxelData: number, encodedLight: number): number;
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
    buildChunk(dimension: string | number, chunkX: number, chunkY: number, chunkZ: number, LOD?: number): Promise<true | undefined>;
    constructEntity(): void;
};
