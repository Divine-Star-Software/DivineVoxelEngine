import type { VoxelTemplate } from "Meta/Constructor/VoxelTemplate.types";
import type { VoxelShapeAddData, VoxelTemplateSubstanceType } from "Meta/index";
import type { DirectionNames } from "Meta/Util.types";
import { QuadVertexes, TextureRotations } from "Meta/Constructor/Geometry/Geometry.types.js";
import { LocationData } from "Meta/Data/CommonTypes.js";
declare type CumstonVertexData = [number, number, number, number] | [number];
/**# Voxel Mesher Tool
 * ---
 * Tool desinged to help make it easy to build voxel meshes.
 */
export declare const VoxelMesher: {
    _data: VoxelShapeAddData;
    _template: VoxelTemplate;
    templateIncrement: boolean;
    setTemplateIncrement(onOff: boolean): any;
    $buildMesh(type: VoxelTemplateSubstanceType, template: VoxelTemplate, LOD: number | undefined, location: LocationData): false | ArrayBufferLike[][];
    data: import("../../../Meta/Constructor/Constructor.types.js").ConstructorDataTool;
    quad: {
        _direction: DirectionNames;
        _faceData: number;
        _fliped: boolean;
        _cachedPosition: {
            x: number;
            y: number;
            z: number;
        };
        _dimension: {
            height: number;
            width: number;
        };
        _transform: {
            1: {
                x: number;
                y: number;
                z: number;
            };
            2: {
                x: number;
                y: number;
                z: number;
            };
            3: {
                x: number;
                y: number;
                z: number;
            };
            4: {
                x: number;
                y: number;
                z: number;
            };
        };
        setAnimationState(type: number): {
            _direction: DirectionNames;
            _faceData: number;
            _fliped: boolean;
            _cachedPosition: {
                x: number;
                y: number;
                z: number;
            };
            _dimension: {
                height: number;
                width: number;
            };
            _transform: {
                1: {
                    x: number;
                    y: number;
                    z: number;
                };
                2: {
                    x: number;
                    y: number;
                    z: number;
                };
                3: {
                    x: number;
                    y: number;
                    z: number;
                };
                4: {
                    x: number;
                    y: number;
                    z: number;
                };
            };
            setAnimationState(type: number): any;
            setDimensions(width?: number, height?: number): any;
            setPosition(x?: number, y?: number, z?: number): any;
            updatePosition(x?: number, y?: number, z?: number): any;
            updatePositionInPlace(x?: number, y?: number, z?: number): any;
            setTransform(vertex: QuadVertexes, x?: number, y?: number, z?: number): any;
            clearTransform(): any;
            setFlipped(flipped: boolean): any;
            setDirection(direction: DirectionNames): any;
            create(): any;
            addData(stride?: 1 | 4, animationState?: number, doAO?: boolean): any;
            clear(): any;
            oUVS: {
                getCurrent(): CumstonVertexData;
                add(cumstomUVS?: CumstonVertexData): any;
            };
            uvs: {
                _data: {
                    width: number[];
                    height: number[];
                };
                _fliped: boolean;
                advancedUVs: {
                    hs1: number;
                    hs2: number;
                    he1: number;
                    he2: number;
                    ws1: number;
                    ws2: number;
                    we1: number;
                    we2: number;
                };
                resetAdvancedUVs(): void;
                addAdvancedUVs(uv?: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                _rotation: TextureRotations;
                clear(): void;
                setFlipped(flipped: boolean): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setWidth(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setHeight(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setRoation(rotation: TextureRotations): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                getCurrentUV(): number;
                add(uv?: number): any;
            };
            AO: {
                add(stride?: 1 | 4): any;
                addCustom(data: [number, number, number, number] | [number]): any;
            };
            light: {
                lightMap: number[];
                add(stride?: 1 | 4): any;
                addCustom(data: [number, number, number, number] | [number]): any;
                _getBrightestLight(): number;
                _getLight: Record<DirectionNames, (x: number, y: number, z: number) => number>;
            };
        };
        setDimensions(width?: number, height?: number): {
            _direction: DirectionNames;
            _faceData: number;
            _fliped: boolean;
            _cachedPosition: {
                x: number;
                y: number;
                z: number;
            };
            _dimension: {
                height: number;
                width: number;
            };
            _transform: {
                1: {
                    x: number;
                    y: number;
                    z: number;
                };
                2: {
                    x: number;
                    y: number;
                    z: number;
                };
                3: {
                    x: number;
                    y: number;
                    z: number;
                };
                4: {
                    x: number;
                    y: number;
                    z: number;
                };
            };
            setAnimationState(type: number): any;
            setDimensions(width?: number, height?: number): any;
            setPosition(x?: number, y?: number, z?: number): any;
            updatePosition(x?: number, y?: number, z?: number): any;
            updatePositionInPlace(x?: number, y?: number, z?: number): any;
            setTransform(vertex: QuadVertexes, x?: number, y?: number, z?: number): any;
            clearTransform(): any;
            setFlipped(flipped: boolean): any;
            setDirection(direction: DirectionNames): any;
            create(): any;
            addData(stride?: 1 | 4, animationState?: number, doAO?: boolean): any;
            clear(): any;
            oUVS: {
                getCurrent(): CumstonVertexData;
                add(cumstomUVS?: CumstonVertexData): any;
            };
            uvs: {
                _data: {
                    width: number[];
                    height: number[];
                };
                _fliped: boolean;
                advancedUVs: {
                    hs1: number;
                    hs2: number;
                    he1: number;
                    he2: number;
                    ws1: number;
                    ws2: number;
                    we1: number;
                    we2: number;
                };
                resetAdvancedUVs(): void;
                addAdvancedUVs(uv?: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                _rotation: TextureRotations;
                clear(): void;
                setFlipped(flipped: boolean): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setWidth(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setHeight(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setRoation(rotation: TextureRotations): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                getCurrentUV(): number;
                add(uv?: number): any;
            };
            AO: {
                add(stride?: 1 | 4): any;
                addCustom(data: [number, number, number, number] | [number]): any;
            };
            light: {
                lightMap: number[];
                add(stride?: 1 | 4): any;
                addCustom(data: [number, number, number, number] | [number]): any;
                _getBrightestLight(): number;
                _getLight: Record<DirectionNames, (x: number, y: number, z: number) => number>;
            };
        };
        setPosition(x?: number, y?: number, z?: number): {
            _direction: DirectionNames;
            _faceData: number;
            _fliped: boolean;
            _cachedPosition: {
                x: number;
                y: number;
                z: number;
            };
            _dimension: {
                height: number;
                width: number;
            };
            _transform: {
                1: {
                    x: number;
                    y: number;
                    z: number;
                };
                2: {
                    x: number;
                    y: number;
                    z: number;
                };
                3: {
                    x: number;
                    y: number;
                    z: number;
                };
                4: {
                    x: number;
                    y: number;
                    z: number;
                };
            };
            setAnimationState(type: number): any;
            setDimensions(width?: number, height?: number): any;
            setPosition(x?: number, y?: number, z?: number): any;
            updatePosition(x?: number, y?: number, z?: number): any;
            updatePositionInPlace(x?: number, y?: number, z?: number): any;
            setTransform(vertex: QuadVertexes, x?: number, y?: number, z?: number): any;
            clearTransform(): any;
            setFlipped(flipped: boolean): any;
            setDirection(direction: DirectionNames): any;
            create(): any;
            addData(stride?: 1 | 4, animationState?: number, doAO?: boolean): any;
            clear(): any;
            oUVS: {
                getCurrent(): CumstonVertexData;
                add(cumstomUVS?: CumstonVertexData): any;
            };
            uvs: {
                _data: {
                    width: number[];
                    height: number[];
                };
                _fliped: boolean;
                advancedUVs: {
                    hs1: number;
                    hs2: number;
                    he1: number;
                    he2: number;
                    ws1: number;
                    ws2: number;
                    we1: number;
                    we2: number;
                };
                resetAdvancedUVs(): void;
                addAdvancedUVs(uv?: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                _rotation: TextureRotations;
                clear(): void;
                setFlipped(flipped: boolean): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setWidth(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setHeight(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setRoation(rotation: TextureRotations): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                getCurrentUV(): number;
                add(uv?: number): any;
            };
            AO: {
                add(stride?: 1 | 4): any;
                addCustom(data: [number, number, number, number] | [number]): any;
            };
            light: {
                lightMap: number[];
                add(stride?: 1 | 4): any;
                addCustom(data: [number, number, number, number] | [number]): any;
                _getBrightestLight(): number;
                _getLight: Record<DirectionNames, (x: number, y: number, z: number) => number>;
            };
        };
        updatePosition(x?: number, y?: number, z?: number): {
            _direction: DirectionNames;
            _faceData: number;
            _fliped: boolean;
            _cachedPosition: {
                x: number;
                y: number;
                z: number;
            };
            _dimension: {
                height: number;
                width: number;
            };
            _transform: {
                1: {
                    x: number;
                    y: number;
                    z: number;
                };
                2: {
                    x: number;
                    y: number;
                    z: number;
                };
                3: {
                    x: number;
                    y: number;
                    z: number;
                };
                4: {
                    x: number;
                    y: number;
                    z: number;
                };
            };
            setAnimationState(type: number): any;
            setDimensions(width?: number, height?: number): any;
            setPosition(x?: number, y?: number, z?: number): any;
            updatePosition(x?: number, y?: number, z?: number): any;
            updatePositionInPlace(x?: number, y?: number, z?: number): any;
            setTransform(vertex: QuadVertexes, x?: number, y?: number, z?: number): any;
            clearTransform(): any;
            setFlipped(flipped: boolean): any;
            setDirection(direction: DirectionNames): any;
            create(): any;
            addData(stride?: 1 | 4, animationState?: number, doAO?: boolean): any;
            clear(): any;
            oUVS: {
                getCurrent(): CumstonVertexData;
                add(cumstomUVS?: CumstonVertexData): any;
            };
            uvs: {
                _data: {
                    width: number[];
                    height: number[];
                };
                _fliped: boolean;
                advancedUVs: {
                    hs1: number;
                    hs2: number;
                    he1: number;
                    he2: number;
                    ws1: number;
                    ws2: number;
                    we1: number;
                    we2: number;
                };
                resetAdvancedUVs(): void;
                addAdvancedUVs(uv?: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                _rotation: TextureRotations;
                clear(): void;
                setFlipped(flipped: boolean): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setWidth(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setHeight(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setRoation(rotation: TextureRotations): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                getCurrentUV(): number;
                add(uv?: number): any;
            };
            AO: {
                add(stride?: 1 | 4): any;
                addCustom(data: [number, number, number, number] | [number]): any;
            };
            light: {
                lightMap: number[];
                add(stride?: 1 | 4): any;
                addCustom(data: [number, number, number, number] | [number]): any;
                _getBrightestLight(): number;
                _getLight: Record<DirectionNames, (x: number, y: number, z: number) => number>;
            };
        };
        updatePositionInPlace(x?: number, y?: number, z?: number): {
            _direction: DirectionNames;
            _faceData: number;
            _fliped: boolean;
            _cachedPosition: {
                x: number;
                y: number;
                z: number;
            };
            _dimension: {
                height: number;
                width: number;
            };
            _transform: {
                1: {
                    x: number;
                    y: number;
                    z: number;
                };
                2: {
                    x: number;
                    y: number;
                    z: number;
                };
                3: {
                    x: number;
                    y: number;
                    z: number;
                };
                4: {
                    x: number;
                    y: number;
                    z: number;
                };
            };
            setAnimationState(type: number): any;
            setDimensions(width?: number, height?: number): any;
            setPosition(x?: number, y?: number, z?: number): any;
            updatePosition(x?: number, y?: number, z?: number): any;
            updatePositionInPlace(x?: number, y?: number, z?: number): any;
            setTransform(vertex: QuadVertexes, x?: number, y?: number, z?: number): any;
            clearTransform(): any;
            setFlipped(flipped: boolean): any;
            setDirection(direction: DirectionNames): any;
            create(): any;
            addData(stride?: 1 | 4, animationState?: number, doAO?: boolean): any;
            clear(): any;
            oUVS: {
                getCurrent(): CumstonVertexData;
                add(cumstomUVS?: CumstonVertexData): any;
            };
            uvs: {
                _data: {
                    width: number[];
                    height: number[];
                };
                _fliped: boolean;
                advancedUVs: {
                    hs1: number;
                    hs2: number;
                    he1: number;
                    he2: number;
                    ws1: number;
                    ws2: number;
                    we1: number;
                    we2: number;
                };
                resetAdvancedUVs(): void;
                addAdvancedUVs(uv?: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                _rotation: TextureRotations;
                clear(): void;
                setFlipped(flipped: boolean): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setWidth(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setHeight(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setRoation(rotation: TextureRotations): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                getCurrentUV(): number;
                add(uv?: number): any;
            };
            AO: {
                add(stride?: 1 | 4): any;
                addCustom(data: [number, number, number, number] | [number]): any;
            };
            light: {
                lightMap: number[];
                add(stride?: 1 | 4): any;
                addCustom(data: [number, number, number, number] | [number]): any;
                _getBrightestLight(): number;
                _getLight: Record<DirectionNames, (x: number, y: number, z: number) => number>;
            };
        };
        setTransform(vertex: QuadVertexes, x?: number, y?: number, z?: number): {
            _direction: DirectionNames;
            _faceData: number;
            _fliped: boolean;
            _cachedPosition: {
                x: number;
                y: number;
                z: number;
            };
            _dimension: {
                height: number;
                width: number;
            };
            _transform: {
                1: {
                    x: number;
                    y: number;
                    z: number;
                };
                2: {
                    x: number;
                    y: number;
                    z: number;
                };
                3: {
                    x: number;
                    y: number;
                    z: number;
                };
                4: {
                    x: number;
                    y: number;
                    z: number;
                };
            };
            setAnimationState(type: number): any;
            setDimensions(width?: number, height?: number): any;
            setPosition(x?: number, y?: number, z?: number): any;
            updatePosition(x?: number, y?: number, z?: number): any;
            updatePositionInPlace(x?: number, y?: number, z?: number): any;
            setTransform(vertex: QuadVertexes, x?: number, y?: number, z?: number): any;
            clearTransform(): any;
            setFlipped(flipped: boolean): any;
            setDirection(direction: DirectionNames): any;
            create(): any;
            addData(stride?: 1 | 4, animationState?: number, doAO?: boolean): any;
            clear(): any;
            oUVS: {
                getCurrent(): CumstonVertexData;
                add(cumstomUVS?: CumstonVertexData): any;
            };
            uvs: {
                _data: {
                    width: number[];
                    height: number[];
                };
                _fliped: boolean;
                advancedUVs: {
                    hs1: number;
                    hs2: number;
                    he1: number;
                    he2: number;
                    ws1: number;
                    ws2: number;
                    we1: number;
                    we2: number;
                };
                resetAdvancedUVs(): void;
                addAdvancedUVs(uv?: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                _rotation: TextureRotations;
                clear(): void;
                setFlipped(flipped: boolean): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setWidth(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setHeight(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setRoation(rotation: TextureRotations): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                getCurrentUV(): number;
                add(uv?: number): any;
            };
            AO: {
                add(stride?: 1 | 4): any;
                addCustom(data: [number, number, number, number] | [number]): any;
            };
            light: {
                lightMap: number[];
                add(stride?: 1 | 4): any;
                addCustom(data: [number, number, number, number] | [number]): any;
                _getBrightestLight(): number;
                _getLight: Record<DirectionNames, (x: number, y: number, z: number) => number>;
            };
        };
        clearTransform(): {
            _direction: DirectionNames;
            _faceData: number;
            _fliped: boolean;
            _cachedPosition: {
                x: number;
                y: number;
                z: number;
            };
            _dimension: {
                height: number;
                width: number;
            };
            _transform: {
                1: {
                    x: number;
                    y: number;
                    z: number;
                };
                2: {
                    x: number;
                    y: number;
                    z: number;
                };
                3: {
                    x: number;
                    y: number;
                    z: number;
                };
                4: {
                    x: number;
                    y: number;
                    z: number;
                };
            };
            setAnimationState(type: number): any;
            setDimensions(width?: number, height?: number): any;
            setPosition(x?: number, y?: number, z?: number): any;
            updatePosition(x?: number, y?: number, z?: number): any;
            updatePositionInPlace(x?: number, y?: number, z?: number): any;
            setTransform(vertex: QuadVertexes, x?: number, y?: number, z?: number): any;
            clearTransform(): any;
            setFlipped(flipped: boolean): any;
            setDirection(direction: DirectionNames): any;
            create(): any;
            addData(stride?: 1 | 4, animationState?: number, doAO?: boolean): any;
            clear(): any;
            oUVS: {
                getCurrent(): CumstonVertexData;
                add(cumstomUVS?: CumstonVertexData): any;
            };
            uvs: {
                _data: {
                    width: number[];
                    height: number[];
                };
                _fliped: boolean;
                advancedUVs: {
                    hs1: number;
                    hs2: number;
                    he1: number;
                    he2: number;
                    ws1: number;
                    ws2: number;
                    we1: number;
                    we2: number;
                };
                resetAdvancedUVs(): void;
                addAdvancedUVs(uv?: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                _rotation: TextureRotations;
                clear(): void;
                setFlipped(flipped: boolean): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setWidth(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setHeight(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setRoation(rotation: TextureRotations): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                getCurrentUV(): number;
                add(uv?: number): any;
            };
            AO: {
                add(stride?: 1 | 4): any;
                addCustom(data: [number, number, number, number] | [number]): any;
            };
            light: {
                lightMap: number[];
                add(stride?: 1 | 4): any;
                addCustom(data: [number, number, number, number] | [number]): any;
                _getBrightestLight(): number;
                _getLight: Record<DirectionNames, (x: number, y: number, z: number) => number>;
            };
        };
        setFlipped(flipped: boolean): {
            _direction: DirectionNames;
            _faceData: number;
            _fliped: boolean;
            _cachedPosition: {
                x: number;
                y: number;
                z: number;
            };
            _dimension: {
                height: number;
                width: number;
            };
            _transform: {
                1: {
                    x: number;
                    y: number;
                    z: number;
                };
                2: {
                    x: number;
                    y: number;
                    z: number;
                };
                3: {
                    x: number;
                    y: number;
                    z: number;
                };
                4: {
                    x: number;
                    y: number;
                    z: number;
                };
            };
            setAnimationState(type: number): any;
            setDimensions(width?: number, height?: number): any;
            setPosition(x?: number, y?: number, z?: number): any;
            updatePosition(x?: number, y?: number, z?: number): any;
            updatePositionInPlace(x?: number, y?: number, z?: number): any;
            setTransform(vertex: QuadVertexes, x?: number, y?: number, z?: number): any;
            clearTransform(): any;
            setFlipped(flipped: boolean): any;
            setDirection(direction: DirectionNames): any;
            create(): any;
            addData(stride?: 1 | 4, animationState?: number, doAO?: boolean): any;
            clear(): any;
            oUVS: {
                getCurrent(): CumstonVertexData;
                add(cumstomUVS?: CumstonVertexData): any;
            };
            uvs: {
                _data: {
                    width: number[];
                    height: number[];
                };
                _fliped: boolean;
                advancedUVs: {
                    hs1: number;
                    hs2: number;
                    he1: number;
                    he2: number;
                    ws1: number;
                    ws2: number;
                    we1: number;
                    we2: number;
                };
                resetAdvancedUVs(): void;
                addAdvancedUVs(uv?: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                _rotation: TextureRotations;
                clear(): void;
                setFlipped(flipped: boolean): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setWidth(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setHeight(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setRoation(rotation: TextureRotations): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                getCurrentUV(): number;
                add(uv?: number): any;
            };
            AO: {
                add(stride?: 1 | 4): any;
                addCustom(data: [number, number, number, number] | [number]): any;
            };
            light: {
                lightMap: number[];
                add(stride?: 1 | 4): any;
                addCustom(data: [number, number, number, number] | [number]): any;
                _getBrightestLight(): number;
                _getLight: Record<DirectionNames, (x: number, y: number, z: number) => number>;
            };
        };
        setDirection(direction: DirectionNames): {
            _direction: DirectionNames;
            _faceData: number;
            _fliped: boolean;
            _cachedPosition: {
                x: number;
                y: number;
                z: number;
            };
            _dimension: {
                height: number;
                width: number;
            };
            _transform: {
                1: {
                    x: number;
                    y: number;
                    z: number;
                };
                2: {
                    x: number;
                    y: number;
                    z: number;
                };
                3: {
                    x: number;
                    y: number;
                    z: number;
                };
                4: {
                    x: number;
                    y: number;
                    z: number;
                };
            };
            setAnimationState(type: number): any;
            setDimensions(width?: number, height?: number): any;
            setPosition(x?: number, y?: number, z?: number): any;
            updatePosition(x?: number, y?: number, z?: number): any;
            updatePositionInPlace(x?: number, y?: number, z?: number): any;
            setTransform(vertex: QuadVertexes, x?: number, y?: number, z?: number): any;
            clearTransform(): any;
            setFlipped(flipped: boolean): any;
            setDirection(direction: DirectionNames): any;
            create(): any;
            addData(stride?: 1 | 4, animationState?: number, doAO?: boolean): any;
            clear(): any;
            oUVS: {
                getCurrent(): CumstonVertexData;
                add(cumstomUVS?: CumstonVertexData): any;
            };
            uvs: {
                _data: {
                    width: number[];
                    height: number[];
                };
                _fliped: boolean;
                advancedUVs: {
                    hs1: number;
                    hs2: number;
                    he1: number;
                    he2: number;
                    ws1: number;
                    ws2: number;
                    we1: number;
                    we2: number;
                };
                resetAdvancedUVs(): void;
                addAdvancedUVs(uv?: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                _rotation: TextureRotations;
                clear(): void;
                setFlipped(flipped: boolean): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setWidth(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setHeight(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setRoation(rotation: TextureRotations): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                getCurrentUV(): number;
                add(uv?: number): any;
            };
            AO: {
                add(stride?: 1 | 4): any;
                addCustom(data: [number, number, number, number] | [number]): any;
            };
            light: {
                lightMap: number[];
                add(stride?: 1 | 4): any;
                addCustom(data: [number, number, number, number] | [number]): any;
                _getBrightestLight(): number;
                _getLight: Record<DirectionNames, (x: number, y: number, z: number) => number>;
            };
        };
        create(): any;
        addData(stride?: 1 | 4, animationState?: number, doAO?: boolean): {
            _direction: DirectionNames;
            _faceData: number;
            _fliped: boolean;
            _cachedPosition: {
                x: number;
                y: number;
                z: number;
            };
            _dimension: {
                height: number;
                width: number;
            };
            _transform: {
                1: {
                    x: number;
                    y: number;
                    z: number;
                };
                2: {
                    x: number;
                    y: number;
                    z: number;
                };
                3: {
                    x: number;
                    y: number;
                    z: number;
                };
                4: {
                    x: number;
                    y: number;
                    z: number;
                };
            };
            setAnimationState(type: number): any;
            setDimensions(width?: number, height?: number): any;
            setPosition(x?: number, y?: number, z?: number): any;
            updatePosition(x?: number, y?: number, z?: number): any;
            updatePositionInPlace(x?: number, y?: number, z?: number): any;
            setTransform(vertex: QuadVertexes, x?: number, y?: number, z?: number): any;
            clearTransform(): any;
            setFlipped(flipped: boolean): any;
            setDirection(direction: DirectionNames): any;
            create(): any;
            addData(stride?: 1 | 4, animationState?: number, doAO?: boolean): any;
            clear(): any;
            oUVS: {
                getCurrent(): CumstonVertexData;
                add(cumstomUVS?: CumstonVertexData): any;
            };
            uvs: {
                _data: {
                    width: number[];
                    height: number[];
                };
                _fliped: boolean;
                advancedUVs: {
                    hs1: number;
                    hs2: number;
                    he1: number;
                    he2: number;
                    ws1: number;
                    ws2: number;
                    we1: number;
                    we2: number;
                };
                resetAdvancedUVs(): void;
                addAdvancedUVs(uv?: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                _rotation: TextureRotations;
                clear(): void;
                setFlipped(flipped: boolean): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setWidth(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setHeight(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setRoation(rotation: TextureRotations): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    advancedUVs: {
                        hs1: number;
                        hs2: number;
                        he1: number;
                        he2: number;
                        ws1: number;
                        ws2: number;
                        we1: number;
                        we2: number;
                    };
                    resetAdvancedUVs(): void;
                    addAdvancedUVs(uv?: number): any;
                    _rotation: TextureRotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: TextureRotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                getCurrentUV(): number;
                add(uv?: number): any;
            };
            AO: {
                add(stride?: 1 | 4): any;
                addCustom(data: [number, number, number, number] | [number]): any;
            };
            light: {
                lightMap: number[];
                add(stride?: 1 | 4): any;
                addCustom(data: [number, number, number, number] | [number]): any;
                _getBrightestLight(): number;
                _getLight: Record<DirectionNames, (x: number, y: number, z: number) => number>;
            };
        };
        clear(): any;
        oUVS: {
            getCurrent(): CumstonVertexData;
            add(cumstomUVS?: CumstonVertexData): any;
        };
        uvs: {
            _data: {
                width: number[];
                height: number[];
            };
            _fliped: boolean;
            advancedUVs: {
                hs1: number;
                hs2: number;
                he1: number;
                he2: number;
                ws1: number;
                ws2: number;
                we1: number;
                we2: number;
            };
            resetAdvancedUVs(): void;
            addAdvancedUVs(uv?: number): {
                _data: {
                    width: number[];
                    height: number[];
                };
                _fliped: boolean;
                advancedUVs: {
                    hs1: number;
                    hs2: number;
                    he1: number;
                    he2: number;
                    ws1: number;
                    ws2: number;
                    we1: number;
                    we2: number;
                };
                resetAdvancedUVs(): void;
                addAdvancedUVs(uv?: number): any;
                _rotation: TextureRotations;
                clear(): void;
                setFlipped(flipped: boolean): any;
                setWidth(start: number, end: number): any;
                setHeight(start: number, end: number): any;
                setRoation(rotation: TextureRotations): any;
                getCurrentUV(): number;
                add(uv?: number): any;
            };
            _rotation: TextureRotations;
            clear(): void;
            setFlipped(flipped: boolean): {
                _data: {
                    width: number[];
                    height: number[];
                };
                _fliped: boolean;
                advancedUVs: {
                    hs1: number;
                    hs2: number;
                    he1: number;
                    he2: number;
                    ws1: number;
                    ws2: number;
                    we1: number;
                    we2: number;
                };
                resetAdvancedUVs(): void;
                addAdvancedUVs(uv?: number): any;
                _rotation: TextureRotations;
                clear(): void;
                setFlipped(flipped: boolean): any;
                setWidth(start: number, end: number): any;
                setHeight(start: number, end: number): any;
                setRoation(rotation: TextureRotations): any;
                getCurrentUV(): number;
                add(uv?: number): any;
            };
            setWidth(start: number, end: number): {
                _data: {
                    width: number[];
                    height: number[];
                };
                _fliped: boolean;
                advancedUVs: {
                    hs1: number;
                    hs2: number;
                    he1: number;
                    he2: number;
                    ws1: number;
                    ws2: number;
                    we1: number;
                    we2: number;
                };
                resetAdvancedUVs(): void;
                addAdvancedUVs(uv?: number): any;
                _rotation: TextureRotations;
                clear(): void;
                setFlipped(flipped: boolean): any;
                setWidth(start: number, end: number): any;
                setHeight(start: number, end: number): any;
                setRoation(rotation: TextureRotations): any;
                getCurrentUV(): number;
                add(uv?: number): any;
            };
            setHeight(start: number, end: number): {
                _data: {
                    width: number[];
                    height: number[];
                };
                _fliped: boolean;
                advancedUVs: {
                    hs1: number;
                    hs2: number;
                    he1: number;
                    he2: number;
                    ws1: number;
                    ws2: number;
                    we1: number;
                    we2: number;
                };
                resetAdvancedUVs(): void;
                addAdvancedUVs(uv?: number): any;
                _rotation: TextureRotations;
                clear(): void;
                setFlipped(flipped: boolean): any;
                setWidth(start: number, end: number): any;
                setHeight(start: number, end: number): any;
                setRoation(rotation: TextureRotations): any;
                getCurrentUV(): number;
                add(uv?: number): any;
            };
            setRoation(rotation: TextureRotations): {
                _data: {
                    width: number[];
                    height: number[];
                };
                _fliped: boolean;
                advancedUVs: {
                    hs1: number;
                    hs2: number;
                    he1: number;
                    he2: number;
                    ws1: number;
                    ws2: number;
                    we1: number;
                    we2: number;
                };
                resetAdvancedUVs(): void;
                addAdvancedUVs(uv?: number): any;
                _rotation: TextureRotations;
                clear(): void;
                setFlipped(flipped: boolean): any;
                setWidth(start: number, end: number): any;
                setHeight(start: number, end: number): any;
                setRoation(rotation: TextureRotations): any;
                getCurrentUV(): number;
                add(uv?: number): any;
            };
            getCurrentUV(): number;
            add(uv?: number): any;
        };
        AO: {
            add(stride?: 1 | 4): any;
            addCustom(data: [number, number, number, number] | [number]): any;
        };
        light: {
            lightMap: number[];
            add(stride?: 1 | 4): any;
            addCustom(data: [number, number, number, number] | [number]): any;
            _getBrightestLight(): number;
            _getLight: Record<DirectionNames, (x: number, y: number, z: number) => number>;
        };
    };
    templateData: {
        _face: DirectionNames;
        _exposed: boolean;
        loadIn(face: DirectionNames): {
            _face: DirectionNames;
            _exposed: boolean;
            loadIn(face: DirectionNames): any;
            isExposed(): boolean;
        };
        isExposed(): boolean;
    };
};
export {};
