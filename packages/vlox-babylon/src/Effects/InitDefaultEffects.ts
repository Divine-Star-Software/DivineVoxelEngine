import { VoxelEffectRegister } from "@divinevoxel/vlox/VoxelEffects/VoxelEffectRegister";
import { CandleParticles } from "./Default/CandleParticles";

export default function () {
  VoxelEffectRegister.register(CandleParticles);
}
