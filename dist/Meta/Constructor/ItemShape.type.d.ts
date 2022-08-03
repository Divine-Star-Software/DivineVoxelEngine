import { DirectionNames } from "Meta/Util.types";
import { Rotations } from "./Mesher.types";
export declare type ItemShapeType = {
    id: string;
    components: {
        dimensions: [number, number, number, number];
        transform?: [number, number, number, number];
        faces: Record<DirectionNames, {
            transform?: [number, number, number, number];
            uvs: {
                r: Rotations;
                ws: number;
                we: number;
                hs: number;
                he: number;
                textureIndex: number;
            };
        }>;
    }[];
};
