import { FullBoxDiagonalIntersection } from "../default/DiagonalIntersection/FullBoxDiagonalIntersection.voxe.shape.js";
import { BoxVoxelShape } from "../default/Box/Box.voxel.shape.js";
export function RegisterDefaultShapes(shpaeManager, shapeHelper) {
    shpaeManager.registerShape(BoxVoxelShape);
    const fullBoxDiagonalIntersection = new FullBoxDiagonalIntersection(shapeHelper);
    shpaeManager.registerShape(fullBoxDiagonalIntersection);
}
