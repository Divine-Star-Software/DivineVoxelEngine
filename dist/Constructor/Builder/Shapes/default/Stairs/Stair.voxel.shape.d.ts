import type { QuadData } from "../../..//Types/ShapeBuilder.types.js";
export declare const StairVoxelShape: {
    id: string;
    add: {
        top(): void;
        bottom(): void;
        north(): void;
        south(): void;
        east(): void;
        west(): void;
    };
};
export declare const StairBuilderData: Record<number, QuadData[][]>;
