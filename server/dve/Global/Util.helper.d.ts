export declare const Util: {
    createPromiseCheck: (data: {
        check: () => boolean;
        onReady?: (() => any) | undefined;
        checkInterval: number;
        failTimeOut?: number | undefined;
        onFail?: (() => any) | undefined;
    }) => Promise<boolean>;
    getWorkerPort: (environment: "node" | "browser") => Promise<any>;
    getEnviorment(): "node" | "browser";
    getEntityFlat3dArray(): {
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
        getValue(x: number, y: number, z: number, array: Uint32Array): number;
        getValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
        getValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
        setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
        setValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
        setValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
        deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
        deleteUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): void;
        getIndex(x: number, y: number, z: number): number;
        getXYZ(index: number): import("../Meta/Util.types.js").Position3Matrix;
    };
    getDataEncoder(): {
        setData(raw: number, value: number, offset: number, numBits: number): number;
        getData(raw: number, offset: number, numBits: number): number;
    };
    getMeshFaceDataByte(): {
        setAnimationType(animationType: number, rawData: number): number;
        getAnimationType(rawData: number): number;
    };
    getFlat3DArray(): {
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
        getValue(x: number, y: number, z: number, array: Uint32Array): number;
        getValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
        getValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
        setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
        setValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
        setValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
        deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
        deleteUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): void;
        getIndex(x: number, y: number, z: number): number;
        getXYZ(index: number): import("../Meta/Util.types.js").Position3Matrix;
    };
    getFaceByte(): {
        _rotationMap: Record<import("../Meta/Constructor/Mesher.types.js").Rotations, number>;
        _rotationReverseMap: Record<number, import("../Meta/Constructor/Mesher.types.js").Rotations>;
        _setFaceTextureState: Record<import("../Meta/Util.types.js").DirectionNames, (state: number, faceBit: number) => number>;
        _getFaceTextureState: Record<import("../Meta/Util.types.js").DirectionNames, (faceBit: number) => number>;
        _setFaceRotateState: Record<import("../Meta/Util.types.js").DirectionNames, (state: number, faceBit: number) => number>;
        _getFaceRotateState: Record<import("../Meta/Util.types.js").DirectionNames, (faceBit: number) => number>;
        _markExposedFace: Record<import("../Meta/Util.types.js").DirectionNames, (faceBit: number) => number>;
        _checkExposedFace: Record<import("../Meta/Util.types.js").DirectionNames, (faceBit: number) => boolean>;
        markFaceAsExposed(direction: import("../Meta/Util.types.js").DirectionNames, rawData: number): number;
        isFaceExposed(direction: import("../Meta/Util.types.js").DirectionNames, rawData: number): boolean;
        setFaceRotateState(direction: import("../Meta/Util.types.js").DirectionNames, state: number, rawData: number): number;
        getFaceRotateState(direction: import("../Meta/Util.types.js").DirectionNames, rawData: number): number;
        setFaceTextureState(direction: import("../Meta/Util.types.js").DirectionNames, rotation: import("../Meta/Constructor/Mesher.types.js").Rotations, rawData: number): number;
        getFaceTextureState(direction: import("../Meta/Util.types.js").DirectionNames, rawData: number): import("../Meta/Constructor/Mesher.types.js").Rotations;
    };
    getHeightMapArray(): {
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
        getValue(x: number, y: number, z: number, array: Uint32Array): number;
        getValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
        getValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
        setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
        setValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
        setValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
        deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
        deleteUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): void;
        getIndex(x: number, y: number, z: number): number;
        getXYZ(index: number): import("../Meta/Util.types.js").Position3Matrix;
    };
    getHeightByte(): {
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
            getValue(x: number, y: number, z: number, array: Uint32Array): number;
            getValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
            getValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
            setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
            setValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
            setValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
            deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
            deleteUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../Meta/Util.types.js").Position3Matrix;
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
            setPositionUseObj(positionObj: import("../Meta/Util.types.js").Position3Matrix): number;
        };
        _getHeightMapData: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
        _setHeightMapData: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
        _markSubstanceAsNotExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
        _markSubstanceAsExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
        _isSubstanceExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
        getStartingHeightMapValue(): number;
        updateChunkMinMax(voxelPOS: import("../Meta/Util.types.js").Position3Matrix, minMax: Uint32Array): void;
        getChunkMin(minMax: Uint32Array): number;
        getChunkMax(minMax: Uint32Array): number;
        calculateHeightRemoveDataForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): boolean | undefined;
        calculateHeightAddDataForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        getLowestExposedVoxel(x: number, z: number, heightMap: Uint32Array): number;
        getHighestExposedVoxel(x: number, z: number, heightMap: Uint32Array): number;
        isSubstanceExposed(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): boolean;
        markSubstanceAsExposed(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        markSubstanceAsNotExposed(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        setMinYForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        getMinYForSubstance(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): number;
        setMaxYForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        getMaxYForSubstance(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): number;
    };
    getVoxelByte(): {
        setId(id: number, value: number): number;
        getId(value: number): number;
        decodeLightFromVoxelData(voxelData: number): number;
        encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
        decodeLevelFromVoxelData(stateData: number): number;
        encodeLevelIntoVoxelData(stateData: number, level: number): number;
        decodeLevelStateFromVoxelData(stateData: number): number;
        encodeLevelStateIntoVoxelData(stateData: number, levelState: number): number;
        getShapeState(voxelData: number): number;
        setShapeState(voxelData: number, shapeState: number): number;
    };
    getLightByte(): {
        SRS: number;
        _lightValues: number[];
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
    getWorldBounds(): {
        __maxChunkYSize: number;
        bounds: {
            MinZ: number;
            MaxZ: number;
            MinX: number;
            MaxX: number;
            MinY: number;
            MaxY: number;
        };
        chunkXPow2: number;
        chunkYPow2: number;
        chunkZPow2: number;
        chunkXSize: number;
        chunkYSize: number;
        chunkZSize: number;
        chunkTotalVoxels: number;
        chunkArea: number;
        regionXPow2: number;
        regionYPow2: number;
        regionZPow2: number;
        regionXSize: number;
        regionYSize: number;
        regionZSize: number;
        __regionPosition: {
            x: number;
            y: number;
            z: number;
        };
        __worldColumnPosition: {
            x: number;
            z: number;
        };
        __chunkPosition: {
            x: number;
            y: number;
            z: number;
        };
        __voxelPosition: {
            x: number;
            y: number;
            z: number;
        };
        syncBoundsWithArrays(): void;
        setWorldBounds(minX: number, maxX: number, minZ: number, maxZ: number, minY: number, maxY: number): void;
        isPositonOutsideOfBounds(x: number, y: number, z: number): boolean;
        isPositonInBounds(x: number, y: number, z: number): boolean;
        setChunkBounds(pow2X: number, pow2Y: number, pow2Z: number): void;
        setRegionBounds(pow2X: number, pow2Y: number, pow2Z: number): void;
        getRegionPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
        getChunkPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
        getChunkKey(chunkPOS: import("../Meta/Util.types.js").Position3Matrix): string;
        getChunkKeyFromPosition(x: number, y: number, z: number): string;
        getRegionKey(regionPOS: import("../Meta/Util.types.js").Position3Matrix): string;
        getRegionKeyFromPosition(x: number, y: number, z: number): string;
        getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("../Meta/Util.types.js").Position3Matrix): {
            x: number;
            y: number;
            z: number;
        };
        getRichPositionKey(x: number, y: number, z: number): string;
        getVoxelPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
        getWorldColumnKeyFromObj(position: import("../Meta/Util.types.js").Position3Matrix): string;
        getWorldColumnKey(x: number, z: number): string;
        getWorldColumnPosition(x: number, z: number): {
            x: number;
            z: number;
        };
    };
    getInfoByte(number?: number): {
        maxBit: number;
        minBit: number;
        maxDec: number;
        minDec: number;
        byteValue: number;
        getNumberValue(): number;
        setNumberValue(newValue: number): void;
        getBit(index: number): 0 | 1;
        getBitsArray(bitIndex: number, byteLength: number): (0 | 1)[];
        getHalfByteDec(bitIndex: number): number;
        setHalfByteBits(index: number, value: number): void;
        setBit(index: number, value: 0 | 1): void;
        toArray(): (0 | 1)[];
        toString(delimiter?: string): string;
    };
    degtoRad(degrees: number): number;
    radToDeg(radians: number): number;
};
