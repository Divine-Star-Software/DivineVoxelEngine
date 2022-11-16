import type { ChunkTemplate } from "Meta/Constructor/ChunkTemplate.types";
import type { Rotations } from "Meta/Constructor/Mesher.types";
import type { VoxelShapeAddData, VoxelTemplateSubstanceType } from "Meta/index";
import type { DirectionNames } from "Meta/Util.types";
import { QuadVertexes } from "Meta/Constructor/Geometry/Geometry.types.js";
declare type CumstonVertexData = [number, number, number, number] | [number];
/**# Voxel Mesher Tool
 * ---
 * Tool desinged to help make it easy to build voxel meshes.
 */
export declare const VoxelMehserTool: {
    _data: VoxelShapeAddData;
    _template: ChunkTemplate;
    templateIncrement: boolean;
    setTemplateIncrement(onOff: boolean): any;
    $buildMesh(type: VoxelTemplateSubstanceType, template: ChunkTemplate, LOD?: number): ArrayBufferLike[][];
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
            clearTransform(): void;
            setFlipped(flipped: boolean): any;
            setDirection(direction: DirectionNames): any;
            create(): any;
            clear(): void;
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
                _rotation: Rotations;
                clear(): void;
                setFlipped(flipped: boolean): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setWidth(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setHeight(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setRoation(rotation: Rotations): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                getCurrentUV(): number;
                add(uv?: number): any;
            };
            AO: {
                toLinearSpace(r: number, g: number, b: number): number[];
                add(stride?: 1 | 4): any;
                addCustom(data: [
                    number,
                    number,
                    number,
                    number
                ] | [
                    number
                ]): void;
            };
            light: {
                lightMap: number[];
                add(stride?: 1 | 4): any;
                addCustom(data: [
                    number,
                    number,
                    number,
                    number
                ] | [
                    number
                ]): void;
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
            clearTransform(): void;
            setFlipped(flipped: boolean): any;
            setDirection(direction: DirectionNames): any;
            create(): any;
            clear(): void;
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
                _rotation: Rotations;
                clear(): void;
                setFlipped(flipped: boolean): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setWidth(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setHeight(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setRoation(rotation: Rotations): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                getCurrentUV(): number;
                add(uv?: number): any;
            };
            AO: {
                toLinearSpace(r: number, g: number, b: number): number[];
                add(stride?: 1 | 4): any;
                addCustom(data: [
                    number,
                    number,
                    number,
                    number
                ] | [
                    number
                ]): void;
            };
            light: {
                lightMap: number[];
                add(stride?: 1 | 4): any;
                addCustom(data: [
                    number,
                    number,
                    number,
                    number
                ] | [
                    number
                ]): void;
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
            clearTransform(): void;
            setFlipped(flipped: boolean): any;
            setDirection(direction: DirectionNames): any;
            create(): any;
            clear(): void;
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
                _rotation: Rotations;
                clear(): void;
                setFlipped(flipped: boolean): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setWidth(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setHeight(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setRoation(rotation: Rotations): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                getCurrentUV(): number;
                add(uv?: number): any;
            };
            AO: {
                toLinearSpace(r: number, g: number, b: number): number[];
                add(stride?: 1 | 4): any;
                addCustom(data: [
                    number,
                    number,
                    number,
                    number
                ] | [
                    number
                ]): void;
            };
            light: {
                lightMap: number[];
                add(stride?: 1 | 4): any;
                addCustom(data: [
                    number,
                    number,
                    number,
                    number
                ] | [
                    number
                ]): void;
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
            clearTransform(): void;
            setFlipped(flipped: boolean): any;
            setDirection(direction: DirectionNames): any;
            create(): any;
            clear(): void;
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
                _rotation: Rotations;
                clear(): void;
                setFlipped(flipped: boolean): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setWidth(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setHeight(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setRoation(rotation: Rotations): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                getCurrentUV(): number;
                add(uv?: number): any;
            };
            AO: {
                toLinearSpace(r: number, g: number, b: number): number[];
                add(stride?: 1 | 4): any;
                addCustom(data: [
                    number,
                    number,
                    number,
                    number
                ] | [
                    number
                ]): void;
            };
            light: {
                lightMap: number[];
                add(stride?: 1 | 4): any;
                addCustom(data: [
                    number,
                    number,
                    number,
                    number
                ] | [
                    number
                ]): void;
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
            clearTransform(): void;
            setFlipped(flipped: boolean): any;
            setDirection(direction: DirectionNames): any;
            create(): any;
            clear(): void;
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
                _rotation: Rotations;
                clear(): void;
                setFlipped(flipped: boolean): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setWidth(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setHeight(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setRoation(rotation: Rotations): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                getCurrentUV(): number;
                add(uv?: number): any;
            };
            AO: {
                toLinearSpace(r: number, g: number, b: number): number[];
                add(stride?: 1 | 4): any;
                addCustom(data: [
                    number,
                    number,
                    number,
                    number
                ] | [
                    number
                ]): void;
            };
            light: {
                lightMap: number[];
                add(stride?: 1 | 4): any;
                addCustom(data: [
                    number,
                    number,
                    number,
                    number
                ] | [
                    number
                ]): void;
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
            clearTransform(): void;
            setFlipped(flipped: boolean): any;
            setDirection(direction: DirectionNames): any;
            create(): any;
            clear(): void;
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
                _rotation: Rotations;
                clear(): void;
                setFlipped(flipped: boolean): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setWidth(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setHeight(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setRoation(rotation: Rotations): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                getCurrentUV(): number;
                add(uv?: number): any;
            };
            AO: {
                toLinearSpace(r: number, g: number, b: number): number[];
                add(stride?: 1 | 4): any;
                addCustom(data: [
                    number,
                    number,
                    number,
                    number
                ] | [
                    number
                ]): void;
            };
            light: {
                lightMap: number[];
                add(stride?: 1 | 4): any;
                addCustom(data: [
                    number,
                    number,
                    number,
                    number
                ] | [
                    number
                ]): void;
            };
        };
        clearTransform(): void;
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
            clearTransform(): void;
            setFlipped(flipped: boolean): any;
            setDirection(direction: DirectionNames): any;
            create(): any;
            clear(): void;
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
                _rotation: Rotations;
                clear(): void;
                setFlipped(flipped: boolean): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setWidth(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setHeight(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setRoation(rotation: Rotations): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                getCurrentUV(): number;
                add(uv?: number): any;
            };
            AO: {
                toLinearSpace(r: number, g: number, b: number): number[];
                add(stride?: 1 | 4): any;
                addCustom(data: [
                    number,
                    number,
                    number,
                    number
                ] | [
                    number
                ]): void;
            };
            light: {
                lightMap: number[];
                add(stride?: 1 | 4): any;
                addCustom(data: [
                    number,
                    number,
                    number,
                    number
                ] | [
                    number
                ]): void;
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
            clearTransform(): void;
            setFlipped(flipped: boolean): any;
            setDirection(direction: DirectionNames): any;
            create(): any;
            clear(): void;
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
                _rotation: Rotations;
                clear(): void;
                setFlipped(flipped: boolean): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setWidth(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setHeight(start: number, end: number): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                setRoation(rotation: Rotations): {
                    _data: {
                        width: number[];
                        height: number[];
                    };
                    _fliped: boolean;
                    _rotation: Rotations;
                    clear(): void;
                    setFlipped(flipped: boolean): any;
                    setWidth(start: number, end: number): any;
                    setHeight(start: number, end: number): any;
                    setRoation(rotation: Rotations): any;
                    getCurrentUV(): number;
                    add(uv?: number): any;
                };
                getCurrentUV(): number;
                add(uv?: number): any;
            };
            AO: {
                toLinearSpace(r: number, g: number, b: number): number[];
                add(stride?: 1 | 4): any;
                addCustom(data: [
                    number,
                    number,
                    number,
                    number
                ] | [
                    number
                ]): void;
            };
            light: {
                lightMap: number[];
                add(stride?: 1 | 4): any;
                addCustom(data: [
                    number,
                    number,
                    number,
                    number
                ] | [
                    number
                ]): void;
            };
        };
        create(): any;
        clear(): void;
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
            _rotation: Rotations;
            clear(): void;
            setFlipped(flipped: boolean): {
                _data: {
                    width: number[];
                    height: number[];
                };
                _fliped: boolean;
                _rotation: Rotations;
                clear(): void;
                setFlipped(flipped: boolean): any;
                setWidth(start: number, end: number): any;
                setHeight(start: number, end: number): any;
                setRoation(rotation: Rotations): any;
                getCurrentUV(): number;
                add(uv?: number): any;
            };
            setWidth(start: number, end: number): {
                _data: {
                    width: number[];
                    height: number[];
                };
                _fliped: boolean;
                _rotation: Rotations;
                clear(): void;
                setFlipped(flipped: boolean): any;
                setWidth(start: number, end: number): any;
                setHeight(start: number, end: number): any;
                setRoation(rotation: Rotations): any;
                getCurrentUV(): number;
                add(uv?: number): any;
            };
            setHeight(start: number, end: number): {
                _data: {
                    width: number[];
                    height: number[];
                };
                _fliped: boolean;
                _rotation: Rotations;
                clear(): void;
                setFlipped(flipped: boolean): any;
                setWidth(start: number, end: number): any;
                setHeight(start: number, end: number): any;
                setRoation(rotation: Rotations): any;
                getCurrentUV(): number;
                add(uv?: number): any;
            };
            setRoation(rotation: Rotations): {
                _data: {
                    width: number[];
                    height: number[];
                };
                _fliped: boolean;
                _rotation: Rotations;
                clear(): void;
                setFlipped(flipped: boolean): any;
                setWidth(start: number, end: number): any;
                setHeight(start: number, end: number): any;
                setRoation(rotation: Rotations): any;
                getCurrentUV(): number;
                add(uv?: number): any;
            };
            getCurrentUV(): number;
            add(uv?: number): any;
        };
        AO: {
            toLinearSpace(r: number, g: number, b: number): number[];
            add(stride?: 1 | 4): any;
            addCustom(data: [
                number,
                number,
                number,
                number
            ] | [
                number
            ]): void;
        };
        light: {
            lightMap: number[];
            add(stride?: 1 | 4): any;
            addCustom(data: [
                number,
                number,
                number,
                number
            ] | [
                number
            ]): void;
        };
    };
    face: {
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
