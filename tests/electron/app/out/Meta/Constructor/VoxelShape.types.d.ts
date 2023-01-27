import type { VoxelMesher } from "Constructor/Builder/Tools/VoxelMesher";
import type { VoxelSubstanceType } from "Meta/index";
import type { GeometryBuildData } from "./Geometry/Geometry.types";
/** # Voxel Shape Add DAta
---
*/
export declare type VoxelShapeAddData = {
    LOD: number;
    substance: VoxelSubstanceType;
    face: number;
    shapeState: number;
    flowTemplateIndex?: number;
    flowTemplate?: number[];
    unTemplate: number[];
    uvTemplateIndex: number;
    overylayUVTemplate: number[];
    overylayUVTemplateIndex: number;
    colorTemplate: number[];
    colorIndex: number;
    lightTemplate: number[];
    lightIndex: number;
    aoTemplate: number[];
    aoIndex: number;
} & GeometryBuildData;
/**# Voxel Shape
 * ---
 * Describes a basic voxel shape such as a box or half box.
 * Voxel shapes are used by the mesh bulder to generate the mush.
 * It checks with the voxel shape to build the proper mesh.
 */
export declare type VoxelShape = {
    id: string;
    build(mesher: typeof VoxelMesher): void;
};
