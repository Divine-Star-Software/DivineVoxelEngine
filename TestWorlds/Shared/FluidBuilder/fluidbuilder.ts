
import {DivineVoxelEngineFluidBuilder} from "../../../out/Builder/FluidBuilder/DivineVoxelEngineFluidBuilder.js";
const DVEFB = new DivineVoxelEngineFluidBuilder();

DVEFB.$INIT((self as any));

(self as any).DVEFB = DVEFB;

console.log("SUP FROM FLUID BUILDER");