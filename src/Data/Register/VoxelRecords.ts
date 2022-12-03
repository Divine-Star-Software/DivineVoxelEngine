import { VoxelSubstanceType } from "Meta/index";

export const VoxelSubstanceMap: Record<VoxelSubstanceType, number> = {
 solid: 0,
 transparent: 1,
 flora: 2,
 liquid: 3,
 magma: 4,
};

export const VoxelSubstanceRecord: Record<number, VoxelSubstanceType> = {
 0: "solid",
 1: "transparent",
 2: "flora",
 3: "liquid",
 4: "magma",
};


