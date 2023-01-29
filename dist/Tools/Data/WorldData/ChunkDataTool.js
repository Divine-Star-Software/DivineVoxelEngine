//objects
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { ChunkTags } from "../../../Data/World/Chunk/ChunkTags.js";
import { EncodedPositionDataTool } from "../../Classes/DataToolBase.js";
import { ChunkTagIDs } from "../../../Data/Constants/Tags/ChunkTagIds.js";
import { WorldSpaces } from "../../../Data/World/WorldSpaces.js";
export class ChunkDataTool extends EncodedPositionDataTool {
    tags = ChunkTags;
    constructor() {
        super();
        this.segments.id._s = this;
        this.segments.light._s = this;
        this.segments.state._s = this;
        this.segments.secondaryId._s = this;
    }
    loadIn() {
        WorldSpaces.chunk.updateLoaction(this.location);
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
    segments = {
        id: {
            _s: {},
            get(index) {
                return this._s.getArrayTagValue(ChunkTagIDs.voxelIDSegment, index);
            },
            set(index, value) {
                return this._s.setArrayTagValue(ChunkTagIDs.voxelIDSegment, index, value);
            },
        },
        light: {
            _s: {},
            get(index) {
                return this._s.getArrayTagValue(ChunkTagIDs.voxelLightSegment, index);
            },
            set(index, value) {
                return this._s.setArrayTagValue(ChunkTagIDs.voxelLightSegment, index, value);
            },
        },
        state: {
            _s: {},
            get(index) {
                return this._s.getArrayTagValue(ChunkTagIDs.voxelStateSegment, index);
            },
            set(index, value) {
                return this._s.setArrayTagValue(ChunkTagIDs.voxelStateSegment, index, value);
            },
        },
        secondaryId: {
            _s: {},
            get(index) {
                return this._s.getArrayTagValue(ChunkTagIDs.voxelSecondaryIDSegment, index);
            },
            set(index, value) {
                return this._s.setArrayTagValue(ChunkTagIDs.voxelSecondaryIDSegment, index, value);
            },
        },
    };
}
