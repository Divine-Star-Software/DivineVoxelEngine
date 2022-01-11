import { DivineVoxelEngineWorld } from "../../../Core/Contexts/World/DivineVoxelEngineWorld.js";
import { RegisterTexutres } from "./Functions/RegisterTextures.js";
import { RegisterVoxels } from "./Functions/RegisterVoxel.js";

const DVEW = new DivineVoxelEngineWorld(self as any);


RegisterTexutres(DVEW);
RegisterVoxels(DVEW);

DVEW.$INIT();
