import { BoxVoxelShape } from "../default/Box.voxel.shape.js";
export function RegisterDefaultShapes(shpaeManager, shapeHelper) {
    const boxVoxel = new BoxVoxelShape(shapeHelper);
    shpaeManager.registerShape(0, boxVoxel);
}
