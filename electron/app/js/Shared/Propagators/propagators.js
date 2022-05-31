import { RegisterVoxels } from "../Functions/RegisterVoxelData.js";
import { DVEP } from "../../../out/Propagation/DivineVoxelEngineWorldPropagation.js";
RegisterVoxels(DVEP);
await DVEP.$INIT({ onReady: () => { } });
