//objects
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { ChunkTags } from "../../../Data/World/Chunk/ChunkTags.js";
import { EncodedPositionDataTool } from "../../Classes/DataToolBase.js";
export class ChunkDataTool extends EncodedPositionDataTool {
    tags = ChunkTags;
    loadIn() {
        const chunk = WorldRegister.chunk.get(this.location);
        if (!chunk)
            return false;
        this.tags.setBuffer(chunk.data);
        this._c = chunk.data;
        return true;
    }
    setChunk(chunk) {
        this.tags.setBuffer(chunk.data);
        this._c = chunk.data;
        return this;
    }
}
