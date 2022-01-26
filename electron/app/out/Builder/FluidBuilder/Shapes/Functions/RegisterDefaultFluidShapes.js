import { FluidSourceBlockVoxelShape } from "../Default/SourceBlock.voxel.shape.js";
export function RegisterDefaultFluidShapes(DVEFB) {
    const sourceBlock = new FluidSourceBlockVoxelShape(DVEFB.shapeHelper);
    DVEFB.shapeManager.registerShape(sourceBlock);
}
