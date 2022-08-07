import { type EngineSettingsData } from "Meta/index.js";
export declare const DVEB: {
    textureManager: {
        textureDataHasBeenSet: boolean;
        uvTextureMap: Record<import("Meta/index.js").TextureTypes, Record<string, number>>;
        overlayUVTextureMap: Record<import("Meta/index.js").TextureTypes, Record<string, number>>;
        getTextureUV(textureType: import("Meta/index.js").TextureTypes, textureId: string, varation?: string | false | null, overlay?: boolean): number;
        setUVTextureMap(data: Record<import("Meta/index.js").TextureTypes, Record<string, number>>): void;
        setOverlayUVTextureMap(data: Record<import("Meta/index.js").TextureTypes, Record<string, number>>): void;
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
        voxelTypeMap: {
            solid: number;
            flora: number;
            fluid: number;
            magma: number;
        };
        buildChunkMesh(chunkX: number, chunkY: number, chunkZ: number, template: import("../../Meta/Constructor/ChunkTemplate.types.js").FullChunkTemplate, LOD?: number): void;
    };
    entityMesher: {
        buildEntityMesh(x: number, y: number, z: number, template: import("../../Meta/Constructor/ChunkTemplate.types.js").ChunkTemplate): void;
    };
    itemMesher: {
        createItem(itemId: string, x: number, y: number, z: number): void;
    };
    processor: {
        LOD: number;
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
                getValue(x: number, y: number, z: number, array: Uint32Array): number;
                getValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
                getValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
                setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
                setValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
                setValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
                deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
                deleteUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): void;
                getIndex(x: number, y: number, z: number): number;
                getXYZ(index: number): import("Meta/index.js").Position3Matrix;
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
                setPositionUseObj(positionObj: import("Meta/index.js").Position3Matrix): number;
            };
            _getHeightMapData: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
            _setHeightMapData: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
            _markSubstanceAsNotExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _markSubstanceAsExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _isSubstanceExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
            getStartingHeightMapValue(): number;
            updateChunkMinMax(voxelPOS: import("Meta/index.js").Position3Matrix, minMax: Uint32Array): void;
            getChunkMin(minMax: Uint32Array): number;
            getChunkMax(minMax: Uint32Array): number;
            calculateHeightRemoveDataForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): boolean | undefined;
            calculateHeightAddDataForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
            getLowestExposedVoxel(x: number, z: number, heightMap: Uint32Array): number;
            getHighestExposedVoxel(x: number, z: number, heightMap: Uint32Array): number;
            isSubstanceExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): boolean;
            markSubstanceAsExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
            markSubstanceAsNotExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
            setMinYForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
            getMinYForSubstance(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): number;
            setMaxYForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
            getMaxYForSubstance(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): number;
        };
        voxelByte: {
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
            getValue(x: number, y: number, z: number, array: Uint32Array): number;
            getValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
            getValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
            setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
            setValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
            setValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
            deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
            deleteUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("Meta/index.js").Position3Matrix;
        };
        lightByte: {
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
        worldMatrix: {
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
                getValue(x: number, y: number, z: number, array: Uint32Array): number;
                getValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
                getValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
                setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
                setValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
                setValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
                deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
                deleteUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): void;
                getIndex(x: number, y: number, z: number): number;
                getXYZ(index: number): import("Meta/index.js").Position3Matrix;
            };
            worldBounds: {
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
                getChunkKey(chunkPOS: import("Meta/index.js").Position3Matrix): string;
                getChunkKeyFromPosition(x: number, y: number, z: number): string;
                getRegionKey(regionPOS: import("Meta/index.js").Position3Matrix): string;
                getRegionKeyFromPosition(x: number, y: number, z: number): string;
                getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("Meta/index.js").Position3Matrix): {
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
                getWorldColumnKeyFromObj(position: import("Meta/index.js").Position3Matrix): string;
                getWorldColumnKey(x: number, z: number): string;
                getWorldColumnPosition(x: number, z: number): {
                    x: number;
                    z: number;
                };
            };
            voxelByte: {
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
            lightByte: {
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
                    getValue(x: number, y: number, z: number, array: Uint32Array): number;
                    getValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
                    getValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
                    setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
                    setValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
                    setValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
                    deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
                    deleteUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): void;
                    getIndex(x: number, y: number, z: number): number;
                    getXYZ(index: number): import("Meta/index.js").Position3Matrix;
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
                    setPositionUseObj(positionObj: import("Meta/index.js").Position3Matrix): number;
                };
                _getHeightMapData: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
                _setHeightMapData: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
                _markSubstanceAsNotExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
                _markSubstanceAsExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
                _isSubstanceExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
                getStartingHeightMapValue(): number;
                updateChunkMinMax(voxelPOS: import("Meta/index.js").Position3Matrix, minMax: Uint32Array): void;
                getChunkMin(minMax: Uint32Array): number;
                getChunkMax(minMax: Uint32Array): number;
                calculateHeightRemoveDataForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): boolean | undefined;
                calculateHeightAddDataForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
                getLowestExposedVoxel(x: number, z: number, heightMap: Uint32Array): number;
                getHighestExposedVoxel(x: number, z: number, heightMap: Uint32Array): number;
                isSubstanceExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): boolean;
                markSubstanceAsExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
                markSubstanceAsNotExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
                setMinYForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
                getMinYForSubstance(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): number;
                setMaxYForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
                getMaxYForSubstance(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): number;
            };
            _air: string[];
            _barrier: string[];
            updateDieTime: number;
            loadDieTime: number;
            regions: import("../../Meta/Matrix/Matrix.types.js").MatrixLoadedRegion;
            chunks: Record<string, Uint32Array>;
            chunkStates: Record<string, Uint8Array>;
            paletteMode: number;
            globalVoxelPalette: Record<number, string>;
            globalVoxelPaletteRecord: Record<string, string[]>;
            globalVoxelPaletteMap: Record<string, number>;
            voxelManager: import("../../Meta/Voxels/VoxelManager.types.js").VoxelManagerInterface | null;
            lightValueFunctions: {
                r: (value: number) => number;
                g: (value: number) => number;
                b: (value: number) => number;
                s: (value: number) => number;
            };
            threadName: string;
            setVoxelManager(voxelManager: import("../../Meta/Voxels/VoxelManager.types.js").VoxelManagerInterface): void;
            syncChunkBounds(): void;
            getVoxelPalette(voxelId: string, voxelState: string): number;
            awaitChunkLoad(x: number, y: number, z: number, timeout?: number): Promise<boolean>;
            __setGlobalVoxelPalette(palette: Record<number, string>, record: Record<string, string[]>, map: Record<string, number>): void;
            getVoxel(x: number, y: number, z: number, secondary?: boolean): false | string[];
            getVoxelShapeState(x: number, y: number, z: number): number;
            getLevel(x: number, y: number, z: number): number;
            setLevel(level: number, x: number, y: number, z: number): void;
            getLevelState(x: number, y: number, z: number): number;
            setLevelState(state: number, x: number, y: number, z: number): void;
            setVoxel(voxelId: string, voxelStateId: string, shapeState: number, x: number, y: number, z: number): false | undefined;
            __handleHeightMapUpdateForVoxelAdd(voxelPOS: import("Meta/index.js").Position3Matrix, voxelData: import("Meta/index.js").VoxelData, chunk: import("../../Meta/Matrix/Matrix.types.js").MatrixLoadedChunk): void;
            getVoxelPaletteNumberId(voxelId: string, voxelStateId: string): number;
            getVoxelData(x: number, y: number, z: number, secondary?: boolean): false | import("Meta/index.js").VoxelData;
            _createRegion(x: number, y: number, z: number): {
                chunks: {};
            };
            __setChunk(x: number, y: number, z: number, voxelsSAB: SharedArrayBuffer, voxelStatesSAB: SharedArrayBuffer, heightMapSAB: SharedArrayBuffer, minMaxMapSAB: SharedArrayBuffer, chunkStateSAB: SharedArrayBuffer): void;
            getRegion(x: number, y: number, z: number): false | {
                palette?: import("../../Meta/World/WorldData/World.types.js").WorldRegionPalette | undefined;
                chunks: Record<string, Record<string, import("../../Meta/Matrix/Matrix.types.js").MatrixLoadedChunk>>;
            };
            __removeChunk(x: number, y: number, z: number): false | undefined;
            getChunk(x: number, y: number, z: number): false | import("../../Meta/Matrix/Matrix.types.js").MatrixLoadedChunk;
            getWorldColumn(x: number, z: number): false | Record<string, import("../../Meta/Matrix/Matrix.types.js").MatrixLoadedChunk>;
            isChunkLocked(x: number, y: number, z: number): boolean;
            lockChunk(x: number, y: number, z: number): boolean;
            unLockChunk(x: number, y: number, z: number): boolean;
            updateChunkData(x: number, y: number, z: number, run: (chunk: {
                voxels: Uint32Array;
                chunkStates: Uint8Array;
            }) => {}): false | Promise<boolean>;
            setData(x: number, y: number, z: number, data: number, state?: boolean): false | undefined;
            getData(x: number, y: number, z: number, state?: boolean): number;
            getVoxelNumberID(x: number, y: number, z: number, secondary?: boolean): number | false;
            getLight(x: number, y: number, z: number): number;
            setAir(x: number, y: number, z: number, lightValue: number): void;
            setFullSun(x: number, y: number, z: number): void;
            setLight(x: number, y: number, z: number, lightValue: number): void;
            getLightValue(x: number, y: number, z: number, type: "r" | "g" | "b" | "s"): number;
            sameVoxel(x: number, y: number, z: number, cx: number, cy: number, cz: number): boolean;
        };
        calculatFlow: typeof import("../../Constants/Meshing/Functions/CalculateFlow.js").CalculateFlow;
        voxellightMixCalc: typeof import("../../Constants/Meshing/Functions/CalculateVoxelLight.js").VoxelLightMixCalc;
        doVoxelLight: typeof import("../../Constants/Meshing/Functions/CalculateVoxelLight.js").CalculateVoxelLight;
        chunkTemplates: Record<number, Record<number, number[][]>>;
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
        $INIT(): void;
        getVoxel(x: number, y: number, z: number, getSecond?: boolean): false | string[];
        getVoxelData(x: number, y: number, z: number, getSecond?: boolean): false | import("Meta/index.js").VoxelData;
        getVoxelShapeState(x: number, y: number, z: number, getSecond?: boolean): number;
        getVoxelLevel(x: number, y: number, z: number, getSecond?: boolean): number;
        getVoxelLevelState(x: number, y: number, z: number, getSecond?: boolean): number;
        getLight(x: number, y: number, z: number): number;
        cullCheck(face: import("Meta/index.js").DirectionNames, voxel: import("Meta/index.js").VoxelConstructorObject, voxelState: string, shapeState: number, x: number, y: number, z: number, faceBit: number): number;
        faceStateCheck(face: import("Meta/index.js").DirectionNames, faceBit: number): number;
        _process(template: import("../../Meta/Constructor/ChunkTemplate.types.js").FullChunkTemplate, x: number, y: number, z: number, doSecondCheck?: boolean): void;
        constructEntity(composed?: number): import("../../Meta/Constructor/ChunkTemplate.types.js").FullChunkTemplate;
        makeAllChunkTemplates(chunk: import("../../Meta/Matrix/Matrix.types.js").MatrixLoadedChunk, chunkX: number, chunkY: number, chunkZ: number, LOD?: number): import("../../Meta/Constructor/ChunkTemplate.types.js").FullChunkTemplate;
        processVoxelLight(data: import("../../Meta/Constructor/Voxel.types.js").VoxelProcessData, ignoreAO?: boolean): void;
        syncSettings(settings: EngineSettingsData): void;
        flush(): void;
    };
    voxelHelper: {
        substanceMap: Record<string, number>;
        substanceRules: Record<string, boolean>;
        ruleMap: Record<number, boolean>;
        $INIT(): void;
        substanceRuleCheck(voxel: import("Meta/index.js").VoxelData, neightborVoxel: import("Meta/index.js").VoxelData): boolean;
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
            getValue(x: number, y: number, z: number, array: Uint32Array): number;
            getValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
            getValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
            setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
            setValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
            setValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
            deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
            deleteUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("Meta/index.js").Position3Matrix;
        };
        voxelByte: {
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
        lightByte: {
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
        getVoxel(x: number, y: number, z: number, composed?: number): string[];
        getLevel(x: number, y: number, z: number, composed?: number): number;
        getLevelState(x: number, y: number, z: number, composed?: number): number;
        getShapeState(x: number, y: number, z: number, composed?: number): number;
        getLight(x: number, y: number, z: number, composed?: number): number;
        clearEntityData(): void;
    };
    $INIT(): Promise<void>;
    syncSettings(settings: EngineSettingsData): void;
    buildChunk(chunkX: number, chunkY: number, chunkZ: number, LOD?: number): Promise<true | undefined>;
    constructEntity(): void;
};
export declare type DivineVoxelEngineBuilder = typeof DVEB;
