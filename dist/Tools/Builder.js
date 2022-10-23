import { DVEW } from "../World/DivineVoxelEngineWorld.js";
export class BuilderTool {
    data = {
        dimesnion: 0,
        x: 0,
        y: 0,
        z: 0,
        LOD: 1,
    };
    setDimension(dimension) {
        this.data.dimesnion = dimension;
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
        DVEW.ccm.tasks.build.chunk([
            this.data.dimesnion,
            this.data.x,
            this.data.y,
            this.data.z,
            this.data.LOD,
        ]);
        return this;
    }
    buildColumn() {
        const worldColumn = DVEW.data.worldRegister.column.get(this.data.dimesnion, this.data.x, this.data.z, this.data.y);
        if (!worldColumn)
            return false;
        for (const chunkKey of Object.keys(worldColumn.chunks)) {
            const chunk = worldColumn.chunks[chunkKey];
            const chunkPOS = DVEW.chunkReader.getChunkPosition(chunk.data);
            DVEW.ccm.tasks.build.chunk([
                this.data.dimesnion,
                chunkPOS.x,
                chunkPOS.y,
                chunkPOS.z,
                this.data.LOD,
            ]);
        }
        return this;
    }
}
