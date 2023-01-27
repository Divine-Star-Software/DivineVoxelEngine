import { ChunkTags } from "../../../Data/World/Chunk/ChunkTags.js";
import { TagManager } from "../../../Libs/DivineBinaryTags/TagManager.js";
import { WorldSpaces } from "../../../Data/World/WorldSpaces.js";
import { WorldDataTagIDs } from "../../../Data/Constants/Tags/WorldDataTagIds.js";
import { ChunkTagIDs } from "../../../Data/Constants/Tags/ChunkTagIds.js";
export const ChunkDataTags = new TagManager("chunk-tags");
ChunkDataTags.registerTag({
    id: WorldDataTagIDs.header,
    type: "header",
    numberType: "16ui",
});
ChunkDataTags.registerTag({
    id: WorldDataTagIDs.dataType,
    type: "header",
    numberType: "16ui",
});
ChunkDataTags.registerTag({
    id: WorldDataTagIDs.dimensionId,
    type: "typed-number",
    numberType: "16ui",
});
ChunkDataTags.registerTag({
    id: WorldDataTagIDs.positionX,
    type: "typed-number",
    numberType: "32i",
});
ChunkDataTags.registerTag({
    id: WorldDataTagIDs.positionY,
    type: "typed-number",
    numberType: "32i",
});
ChunkDataTags.registerTag({
    id: WorldDataTagIDs.positionZ,
    type: "typed-number",
    numberType: "32i",
});
ChunkDataTags.registerTag({
    id: ChunkTagIDs.minHeight,
    type: "typed-number",
    numberType: "8ui",
});
ChunkDataTags.registerTag({
    id: ChunkTagIDs.maxHeight,
    type: "typed-number",
    numberType: "8ui",
});
export function InitalizeChunkTags() {
    ChunkDataTags.registerTag({
        id: ChunkTagIDs.heightMap,
        type: "typed-number-array",
        numberType: "32ui",
        length: WorldSpaces.chunk.getArea() * 2,
    });
    ChunkDataTags.registerTag({
        id: ChunkTagIDs.voxelIDSegment,
        type: "typed-number-array",
        numberType: "16ui",
        length: WorldSpaces.chunk.getVolume(),
    });
    ChunkDataTags.registerTag({
        id: ChunkTagIDs.voxelLightSegment,
        type: "typed-number-array",
        numberType: "16ui",
        length: WorldSpaces.chunk.getVolume(),
    });
    ChunkDataTags.registerTag({
        id: ChunkTagIDs.voxelStateSegment,
        type: "typed-number-array",
        numberType: "16ui",
        length: WorldSpaces.chunk.getVolume(),
    });
    ChunkDataTags.registerTag({
        id: ChunkTagIDs.voxelSecondaryIDSegment,
        type: "typed-number-array",
        numberType: "16ui",
        length: WorldSpaces.chunk.getVolume(),
    });
    const initData = ChunkDataTags.$INIT({
        indexBufferMode: "shared",
    });
    ChunkTags.$INIT(initData);
}
