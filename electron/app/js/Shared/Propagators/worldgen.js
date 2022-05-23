import { RegisterVoxels } from "../Functions/RegisterVoxelData.js";
import { DVEWG } from "../../../out/WorldGeneration/DivineVoxelEngineWorldGeneration.js";
RegisterVoxels(DVEWG);
(async () => {
    await DVEWG.$INIT({ onReady: () => { } });
})();
