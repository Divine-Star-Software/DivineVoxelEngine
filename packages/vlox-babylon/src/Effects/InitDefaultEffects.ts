import { VoxelEffectRegister } from "@divinevoxel/vlox/Voxels/Effects/VoxelEffectRegister";
import { CandleParticles } from "./Default/CandleParticles";

export default function () {
  VoxelEffectRegister.register(CandleParticles);
}
