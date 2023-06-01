//objects
import { ThreadComm } from "threadcomm";
import { WorldRegister } from "./World/WorldRegister.js";
import { DataSyncIds } from "../Common/Threads/Contracts/DataSyncIds.js";
import { VoxelPaletteReader } from "./Voxel/VoxelPalette.js";
import { DimensionsRegister } from "./World/Dimensions/DimensionsRegister.js";
import { ChunkTags } from "./World/Chunk/ChunkTags.js";
import { RegionHeaderTags, RegionTags } from "./World/Region/RegionTags.js";
import { ColumnTags } from "./World/Column/ColumnTags.js";
import { VoxelTags } from "./Voxel/VoxelTags.js";
import { MappedDataRegister } from "./Register/MappedDataRegister.js";
import { RegionHeaderRegister } from "./World/Region/RegionHeaderRegister.js";
import { SubstancePaletteReader } from "./Substance/SubstancePalette.js";
import { SubstanceTags } from "./Substance/SubstanceTags.js";
export const DataSyncNode = {
    maps: {
        strings: ThreadComm.onDataSync(DataSyncIds.registerStringMap, (data) => {
            MappedDataRegister.stringMaps.sync(data);
        }),
        objects: ThreadComm.onDataSync(DataSyncIds.registerObjectMap, (data) => {
            MappedDataRegister.objectMaps.sync(data);
        }),
    },
    palettes: {
        voxel: ThreadComm.onDataSync(DataSyncIds.voxelPalette, ([palette, map]) => {
            VoxelPaletteReader.setVoxelPalette(palette, map);
        }),
        substance: ThreadComm.onDataSync(DataSyncIds.substancePalette, ([palette, map]) => {
            SubstancePaletteReader.setPalette(palette, map);
        }),
    },
    worldData: {
        dimension: ThreadComm.onDataSync(DataSyncIds.dimesnion, (data) => {
            DimensionsRegister.registerDimension(data.id, data.options);
        }),
        chunk: ThreadComm.onDataSync(DataSyncIds.chunk, (data) => {
            WorldRegister.chunk.add(data[0], data[1]);
        }, (data) => {
            WorldRegister.chunk.remove(data);
        }),
        column: ThreadComm.onDataSync(DataSyncIds.column, (data) => {
            WorldRegister.column.add(data[0], data[1]);
        }, (data) => {
            WorldRegister.column.remove(data);
        }),
        region: ThreadComm.onDataSync(DataSyncIds.region, (data) => {
            WorldRegister.region.add(data[0], data[1]);
        }, (data) => {
            WorldRegister.region.remove(data);
        }),
        regionHeader: ThreadComm.onDataSync(DataSyncIds.regionHeader, (data) => {
            RegionHeaderRegister.add(data[0], data[1]);
        }, (data) => {
            RegionHeaderRegister.remove(data);
        }),
    },
    tags: {
        voxel: ThreadComm.onDataSync(DataSyncIds.voxelTags, (data) => {
            VoxelTags.$INIT(data[0]);
            VoxelTags.sync(new Uint16Array(data[1]));
        }),
        substance: ThreadComm.onDataSync(DataSyncIds.substanceTags, (data) => {
            SubstanceTags.$INIT(data);
        }),
        chunk: ThreadComm.onDataSync(DataSyncIds.chunkTags, (data) => {
            ChunkTags.$INIT(data);
        }),
        column: ThreadComm.onDataSync(DataSyncIds.columnTags, (data) => {
            ColumnTags.$INIT(data);
        }),
        region: ThreadComm.onDataSync(DataSyncIds.regionTags, (data) => {
            RegionTags.$INIT(data[0]);
            RegionHeaderTags.$INIT(data[1]);
        }),
    },
};
