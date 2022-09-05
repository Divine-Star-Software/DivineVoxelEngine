import { DirectionNames } from "Meta/Util.types";
import { Rotations } from "./Mesher.types";
export declare type CustomShapeType = {
    id: string;
    causeAO: boolean;
    alwaysVisible: boolean;
    components: {
        dimensions: [number, number, number];
        transform: [number, number, number, number];
        faces: Record<Partial<DirectionNames>, {
            lightMode: "shade" | "max";
            AO: [number, number, number, number];
            light?: [number, number, number, number];
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
