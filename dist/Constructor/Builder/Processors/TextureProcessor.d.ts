import { DirectionNames } from "Meta";
import { BuildNodeMesh, SetNodeMesh } from "Meta/Tasks/RenderTasks.types.js";
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
    processTexture(buildTask: BuildNodeMesh): readonly [SetNodeMesh, ArrayBuffer[]];
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
        type: Faces;
    };
    getbottomFace(data: number[][], sx: number, y: number): {
        xStart: number;
        xEnd: number;
        yStart: number;
        yEnd: number;
        type: Faces;
    };
    getwestFace(data: number[][], x: number, sy: number): {
        xStart: number;
        xEnd: number;
        yStart: number;
        yEnd: number;
        type: Faces;
    };
    geteastFace(data: number[][], x: number, sy: number): {
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
