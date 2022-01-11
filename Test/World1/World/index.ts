import { DivineVoxelEngineWorld } from "../../../Core/Contexts/World/DivineVoxelEngineWorld.js";


const DVEW = new DivineVoxelEngineWorld((self as any));

DVEW.registerDefaultVoxels();
DVEW.$INIT();
