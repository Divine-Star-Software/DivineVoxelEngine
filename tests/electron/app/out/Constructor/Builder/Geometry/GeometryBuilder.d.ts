import { GeometryBuildData, QuadDimensions, QuadTransforms } from "Meta/Constructor/Geometry/Geometry.types";
import { DirectionNames, Vector3 } from "Meta/Util.types";
export declare const GeometryBuilder: {
    data: GeometryBuildData;
    quads: {
        builder: {
            faceFunctions: Record<DirectionNames, (origin: Vector3, data: GeometryBuildData, transform: QuadTransforms, flip?: boolean | undefined) => void>;
            create(direction: DirectionNames, origin: Vector3, dimensions: QuadDimensions, data: GeometryBuildData, flip?: boolean, transform?: QuadTransforms): void;
        };
        uvs: {
            uvRotations: Record<"top" | "bottom" | "side", Record<import("Meta/Constructor/Geometry/Geometry.types").TextureRotations, (uv: number, ws: number, we: number, hs: number, he: number, flipped: boolean, uvs: number[]) => void>>;
            advancedUVs: Record<"top" | "bottom" | "side", (uv: number, data: import("Meta/Constructor/Geometry/Geometry.types").AdvancedUVs, uvs: number[], flipped: boolean) => void>;
            uvFunctions: Record<DirectionNames, (data: import("Meta/Constructor/Geometry/Geometry.types").AddQuadUVsData) => void>;
            addUVs(face: DirectionNames, data: import("Meta/Constructor/Geometry/Geometry.types").AddQuadUVsData): void;
            addAdvancedUVs(direction: DirectionNames, uv: number, uvs: number[], data: import("Meta/Constructor/Geometry/Geometry.types").AdvancedUVs, flipped?: boolean): void;
            processOverlayUVs(data: import("../../../Meta/index.js").VoxelShapeAddData): void;
        };
    };
    setData(data: GeometryBuildData): void;
    clearData(): void;
    createQuad(directon: DirectionNames, dimensions: QuadDimensions, origion: Vector3, flip?: boolean, transforms?: QuadTransforms): void;
};
