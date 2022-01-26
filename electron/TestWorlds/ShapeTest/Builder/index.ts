import { DivineVoxelEngineBuilder } from "../../../out/Builder/DivineVoxelEngineBuilder.js";


const DVEB = new DivineVoxelEngineBuilder();
(self as any).DVEB = DVEB;


DVEB.$INIT((self as any));