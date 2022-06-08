export declare const DVEB: {
    textureManager: {
        textureDataHasBeenSet: boolean;
        uvTextureMap: Record<import("../../Meta/index.js").VoxelSubstanceType, Record<string, number>>;
        getTextureUV(voxelSubstanceType: import("../../Meta/index.js").VoxelSubstanceType, textureId: string, varation?: string | undefined): number;
        isReady(): boolean;
        setUVTextureMap(data: Record<import("../../Meta/index.js").VoxelSubstanceType, Record<string, number>>): void;
    };
    shapeManager: {
        shapes: Record<number, import("../../Meta/index.js").VoxelShapeInterface>;
        shapeMap: Record<string, number>;
        shapeCount: number;
        registerShape(shapeObject: import("../../Meta/index.js").VoxelShapeInterface): void;
        getShape(shapeId: number): import("../../Meta/index.js").VoxelShapeInterface;
        getShapeId(shapeId: string): number;
        getShapeMap(): Record<string, number>;
    };
    shapeHelper: {
        faceByte: {
            _setFaceTextureState: Record<import("../../Meta/Util.types.js").DirectionNames, (state: number, faceBit: number) => number>;
            _getFaceTextureState: Record<import("../../Meta/Util.types.js").DirectionNames, (faceBit: number) => number>;
            _setFaceRotateState: Record<import("../../Meta/Util.types.js").DirectionNames, (state: number, faceBit: number) => number>;
            _getFaceRotateState: Record<import("../../Meta/Util.types.js").DirectionNames, (faceBit: number) => number>;
            _markExposedFace: Record<import("../../Meta/Util.types.js").DirectionNames, (faceBit: number) => number>;
            _checkExposedFace: Record<import("../../Meta/Util.types.js").DirectionNames, (faceBit: number) => boolean>;
            markFaceAsExposed(direction: import("../../Meta/Util.types.js").DirectionNames, rawData: number): number;
            isFaceExposed(direction: import("../../Meta/Util.types.js").DirectionNames, rawData: number): boolean;
            setFaceRotateState(direction: import("../../Meta/Util.types.js").DirectionNames, state: number, rawData: number): number;
            getFaceRotateState(direction: import("../../Meta/Util.types.js").DirectionNames, rawData: number): number;
            setFaceTextureState(direction: import("../../Meta/Util.types.js").DirectionNames, state: number, rawData: number): number;
            getFaceTextureState(direction: import("../../Meta/Util.types.js").DirectionNames, rawData: number): number;
        };
        lightByte: {
            _lightValues: number[];
            getS(value: number): number;
            getR(value: number): number;
            getG(value: number): number;
            getB(value: number): number;
            setS(value: number, sl: number): number;
            setR(value: number, sl: number): number;
            setG(value: number, sl: number): number;
            setB(value: number, sl: number): number;
            hasRGBLight(sl: number): boolean;
            decodeLightFromVoxelData(voxelData: number): number;
            encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
            setLightValues(values: number[]): number;
            getLightValues(value: number): number[];
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
        };
        lightMap: number[];
        shouldFaceFlip(faceBit: number, faceDirection: import("../../Meta/Util.types.js").DirectionNames): boolean;
        isFaceExposexd(faceBit: number, faceDirection: import("../../Meta/Util.types.js").DirectionNames): boolean;
        produceShapeReturnData(shapeData: import("../../Meta/index.js").VoxelShapeAddData): import("../../Meta/index.js").VoxelShapeAddReturnData;
        toLinearSpace(r: number, g: number, b: number, a: number): number[];
        calculateLightColor(RGBlightColors: number[], sunlightColors: number[], lightTemplate: number[], startIndex: number): void;
        calculateLightColorFromValue(RGBlightColors: number[], sunlightColors: number[], lightValue: number): void;
        calculateSunightColor(sunLight: number[], sunLightTemplate: number[], sunLightIndex: number): void;
        calculateAOColor(aoColors: number[], aoTemplate: number[], aoTemplateIndex: number): void;
        calculateAOColorFromValue(aoColors: number[], aoValue: number): void;
    };
    shapeBuilder: {
        faceFunctions: Record<import("../../Meta/Util.types.js").DirectionNames, (origion: import("../../Meta/Util.types.js").Position3Matrix, dimensions: {
            width: number;
            height: number;
            depth: number;
        }, data: import("../../Meta/index.js").VoxelShapeAddData, flip?: boolean | undefined) => void>;
        addFace(direction: import("../../Meta/Util.types.js").DirectionNames, origion: import("../../Meta/Util.types.js").Position3Matrix, dimensions: {
            width: number;
            height: number;
            depth: number;
        }, data: import("../../Meta/index.js").VoxelShapeAddData, flip?: boolean): void;
    };
    chunkMesher: {
        voxelBuildOrder: import("../../Meta/index.js").VoxelSubstanceType[];
        voxelTypeMap: {
            solid: number;
            flora: number;
            fluid: number;
            magma: number;
        };
        buildChunkMesh(chunkX: number, chunkY: number, chunkZ: number, template: import("../../Meta/index.js").FullChunkTemplate): void;
    };
    chunkProccesor: {
        heightByte: {
            heightMapArray: {
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
                getValue(x: number, y: number, z: number, array: import("../../Meta/index.js").ChunkVoxels): number;
                getValueUseObj(position: import("../../Meta/Util.types.js").Position3Matrix, array: import("../../Meta/index.js").ChunkVoxels): number;
                getValueUseObjSafe(position: import("../../Meta/Util.types.js").Position3Matrix, array: import("../../Meta/index.js").ChunkVoxels): any;
                setValue(x: number, y: number, z: number, array: import("../../Meta/index.js").ChunkVoxels, value: number): void;
                setValueUseObj(position: import("../../Meta/Util.types.js").Position3Matrix, array: import("../../Meta/index.js").ChunkVoxels, value: number): void;
                setValueUseObjSafe(position: import("../../Meta/Util.types.js").Position3Matrix, array: import("../../Meta/index.js").ChunkVoxels, value: number): void;
                deleteValue(x: number, y: number, z: number, array: import("../../Meta/index.js").ChunkVoxels): void;
                deleteUseObj(position: import("../../Meta/Util.types.js").Position3Matrix, array: import("../../Meta/index.js").ChunkVoxels): void;
                getIndex(x: number, y: number, z: number): number;
                getXYZ(index: number): import("../../Meta/Util.types.js").Position3Matrix;
            };
            positionByte: {
                _poisiton: {
                    x: number;
                    y: number;
                    z: number;
                };
                _positionMasks: {
                    x: number;
                    z: number;
                    y: number;
                };
                getY(byteData: number): number;
                getPosition(byteData: number): {
                    x: number;
                    y: number;
                    z: number;
                };
                setPosition(x: number, y: number, z: number): number;
                setPositionUseObj(positionObj: import("../../Meta/Util.types.js").Position3Matrix): number;
            };
            _getHeightMapData: Record<import("../../Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
            _setHeightMapData: Record<import("../../Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
            _markSubstanceAsNotExposed: Record<import("../../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _markSubstanceAsExposed: Record<import("../../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _isSubstanceExposed: Record<import("../../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
            getStartingHeightMapValue(): number;
            updateChunkMinMax(voxelPOS: import("../../Meta/Util.types.js").Position3Matrix, minMax: Uint32Array): void;
            getChunkMin(minMax: Uint32Array): number;
            getChunkMax(minMax: Uint32Array): number;
            calculateHeightRemoveDataForSubstance(height: number, substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): boolean | undefined;
            calculateHeightAddDataForSubstance(height: number, substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
            getLowestExposedVoxel(x: number, z: number, heightMap: Uint32Array): number;
            getHighestExposedVoxel(x: number, z: number, heightMap: Uint32Array): number;
            isSubstanceExposed(substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): boolean;
            markSubstanceAsExposed(substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
            markSubstanceAsNotExposed(substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
            setMinYForSubstance(height: number, substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
            getMinYForSubstance(substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): number;
            setMaxYForSubstance(height: number, substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
            getMaxYForSubstance(substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): number;
        };
        voxelByte: {
            setId(id: number, value: number): number;
            getId(value: number): number;
            decodeLightFromVoxelData(voxelData: number): number;
            encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
        };
        faceByte: {
            _setFaceTextureState: Record<import("../../Meta/Util.types.js").DirectionNames, (state: number, faceBit: number) => number>;
            _getFaceTextureState: Record<import("../../Meta/Util.types.js").DirectionNames, (faceBit: number) => number>;
            _setFaceRotateState: Record<import("../../Meta/Util.types.js").DirectionNames, (state: number, faceBit: number) => number>;
            _getFaceRotateState: Record<import("../../Meta/Util.types.js").DirectionNames, (faceBit: number) => number>;
            _markExposedFace: Record<import("../../Meta/Util.types.js").DirectionNames, (faceBit: number) => number>;
            _checkExposedFace: Record<import("../../Meta/Util.types.js").DirectionNames, (faceBit: number) => boolean>;
            markFaceAsExposed(direction: import("../../Meta/Util.types.js").DirectionNames, rawData: number): number;
            isFaceExposed(direction: import("../../Meta/Util.types.js").DirectionNames, rawData: number): boolean;
            setFaceRotateState(direction: import("../../Meta/Util.types.js").DirectionNames, state: number, rawData: number): number;
            getFaceRotateState(direction: import("../../Meta/Util.types.js").DirectionNames, rawData: number): number;
            setFaceTextureState(direction: import("../../Meta/Util.types.js").DirectionNames, state: number, rawData: number): number;
            getFaceTextureState(direction: import("../../Meta/Util.types.js").DirectionNames, rawData: number): number;
        };
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
            getValue(x: number, y: number, z: number, array: import("../../Meta/index.js").ChunkVoxels): number;
            getValueUseObj(position: import("../../Meta/Util.types.js").Position3Matrix, array: import("../../Meta/index.js").ChunkVoxels): number;
            getValueUseObjSafe(position: import("../../Meta/Util.types.js").Position3Matrix, array: import("../../Meta/index.js").ChunkVoxels): any;
            setValue(x: number, y: number, z: number, array: import("../../Meta/index.js").ChunkVoxels, value: number): void;
            setValueUseObj(position: import("../../Meta/Util.types.js").Position3Matrix, array: import("../../Meta/index.js").ChunkVoxels, value: number): void;
            setValueUseObjSafe(position: import("../../Meta/Util.types.js").Position3Matrix, array: import("../../Meta/index.js").ChunkVoxels, value: number): void;
            deleteValue(x: number, y: number, z: number, array: import("../../Meta/index.js").ChunkVoxels): void;
            deleteUseObj(position: import("../../Meta/Util.types.js").Position3Matrix, array: import("../../Meta/index.js").ChunkVoxels): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../../Meta/Util.types.js").Position3Matrix;
        };
        chunkTemplates: Record<number, Record<number, number[][]>>;
        exposedFaces: number[];
        faceStates: number[];
        getBaseTemplateNew(): import("../../Meta/index.js").FullChunkTemplate;
        makeAllChunkTemplates(chunk: import("../../Meta/Matrix/Matrix.types.js").MatrixLoadedChunk, chunkX: number, chunkY: number, chunkZ: number): import("../../Meta/index.js").FullChunkTemplate;
    };
    $INIT(): Promise<void>;
    buildChunk(chunkX: number, chunkY: number, chunkZ: number): Promise<true | undefined>;
};
export declare type DivineVoxelEngineBuilder = typeof DVEB;
