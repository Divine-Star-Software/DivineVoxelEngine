import { DimensionsRegister } from "../../Data/Dimensions/DimensionsRegister.js";
import { ChunkReader } from "../../Data/Chunk/ChunkReader.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { CCM } from "../../Common/Threads/Constructor/ConstructorComm.js";
export class BuilderTool {
    data = {
        dimesnion: 0,
        x: 0,
        y: 0,
        z: 0,
        LOD: 1,
    };
    setDimension(dimensionId) {
        this.data.dimesnion = DimensionsRegister.getDimensionNumericId(dimensionId);
        return this;
    }
    setLOD(lod) {
        this.data.LOD = lod;
        return this;
    }
    setXZ(x, z) {
        this.data.x = x;
        this.data.z = z;
        return this;
    }
    setXYZ(x, y, z) {
        this.data.x = x;
        this.data.y = y;
        this.data.z = z;
        return this;
    }
    buildChunk() {
        CCM.tasks.build.chunk([
            this.data.dimesnion,
            this.data.x,
            this.data.y,
            this.data.z,
            this.data.LOD,
        ]);
        return this;
    }
    buildColumn() {
        const column = WorldRegister.column.get(this.data.dimesnion, this.data.x, this.data.z, this.data.y);
        if (!column)
            return false;
        if (column.chunks.size == 0)
            return false;
        for (const [key, chunk] of column.chunks) {
            const chunkPOS = ChunkReader.getChunkPosition(chunk.data);
            CCM.tasks.build.chunk([
                this.data.dimesnion,
                chunkPOS.x,
                chunkPOS.y,
                chunkPOS.z,
                this.data.LOD,
            ]);
        }
        return this;
    }
    fillColumn() {
        WorldRegister.column.fill(this.data.dimesnion, this.data.x, this.data.z, this.data.y);
        return this;
    }
}
