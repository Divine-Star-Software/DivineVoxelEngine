import { WorldBounds } from "../World/WorldBounds.js";
import { WorldRegister } from "../World/WorldRegister.js";
import { HeightMapData } from "./HeightMapData.js";
export const ChunkHeightMap = {
    update: {
        add(dimensionId, substance, x, y, z) {
            const chunk = WorldRegister.chunk.get(dimensionId, x, y, z);
            if (!chunk)
                return;
            const voxelPOS = WorldBounds.getVoxelPosition(x, y, z);
            if (substance == "transparent") {
                substance = "solid";
            }
            HeightMapData.calculateHeightAddDataForSubstance(voxelPOS.y, substance, voxelPOS.x, voxelPOS.z, chunk.data);
            HeightMapData.updateChunkMinMax(voxelPOS, chunk.data);
        },
        remove(dimensionId, substance, x, y, z) {
            const chunk = WorldRegister.chunk.get(dimensionId, x, y, z);
            if (!chunk)
                return;
            const voxelPOS = WorldBounds.getVoxelPosition(x, y, z);
            if (substance == "transparent") {
                substance = "solid";
            }
            HeightMapData.calculateHeightRemoveDataForSubstance(voxelPOS.y, substance, voxelPOS.x, voxelPOS.z, chunk.data);
            HeightMapData.updateChunkMinMax(voxelPOS, chunk.data);
        },
    },
};
