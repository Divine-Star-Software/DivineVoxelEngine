import { DirectionNames } from "Meta";
import { BuildNodeMesh } from "Meta/Tasks/RenderTasks.types.js";
type FaceData = {
    xStart: number;
    xEnd: number;
    yStart: number;
    yEnd: number;
    type: Faces;
};
type Faces = "west" | "east" | "top" | "bottom";
export declare const TextureProcessor: {
    visitedMap: Record<Faces, Record<string, boolean>>;
    _resetVisitedMap(): void;
    faceMap: Record<DirectionNames, number>;
    height: number;
    width: number;
    depth: number;
    getPosition: Record<Faces, (face: FaceData) => [number, number, number]>;
    getDimensions: Record<Faces, (face: FaceData) => [number, number]>;
    getTruePosition(face: FaceData): {
        xStart: number;
        xEnd: number;
        yStart: number;
        yEnd: number;
    };
    processTexture(buildTask: BuildNodeMesh): readonly [readonly [import("voxelspaces").LocationData, import("../Types/MeshData.types.js").MeshAttributes], ArrayBuffer[]];
    _process(data: number[][], x: number, y: number): {
        w: boolean;
        e: boolean;
        t: boolean;
        b: boolean;
    };
    getTopFace(data: number[][], sx: number, y: number): {
        xStart: number;
        xEnd: number;
        yStart: number;
        yEnd: number;
        type: Faces;
    };
    getBottomFace(data: number[][], sx: number, y: number): {
        xStart: number;
        xEnd: number;
        yStart: number;
        yEnd: number;
        type: Faces;
    };
    getWestFace(data: number[][], x: number, sy: number): {
        xStart: number;
        xEnd: number;
        yStart: number;
        yEnd: number;
        type: Faces;
    };
    getEastFace(data: number[][], x: number, sy: number): {
        xStart: number;
        xEnd: number;
        yStart: number;
        yEnd: number;
        type: Faces;
    };
    getBlankFace(x: number, y: number, face: Faces): {
        xStart: number;
        xEnd: number;
        yStart: number;
        yEnd: number;
        type: Faces;
    };
    visit(x: number, y: number, face: Faces): void;
    visited(x: number, y: number, face: Faces): boolean;
    calculateUV(face: FaceData): [number, number, number, number];
    buildFace(face: FaceData): void;
};
export {};
