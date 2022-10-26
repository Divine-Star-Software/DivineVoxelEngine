import { WorldRegister } from "./WorldRegister.js";
import { VoxelReader } from "../Voxel/VoxelByte.js";
import { VoxelData } from "../Voxel/VoxelData.js";
import { ChunkReader } from "../Chunk/ChunkReader.js";
import { WorldBounds } from "./WorldBounds.js";
import { HeightMapData } from "../Chunk/HeightMapData.js";
import { DataHooks } from "../DataHooks.js";
import { DimensionsData } from "../../Data/Dimensions/DimensionsData.js";
import { VoxelPaletteReader } from "../Voxel/VoxelPalette.js";
import { DataTool } from "../../Tools/Data/DataTool.js";
const WP = {
    _currentionDimension: "main",
    util: {
        isSameVoxel(dimensionId, x, y, z, x2, y2, z2, secondary = false) {
            return true;
        },
    },
    heightMap: {
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
    },
    paint: {
        _dt: new DataTool(),
        voxel(data, update = true) {
            if (!data.dimension) {
                data.dimension = WP._currentionDimension;
            }
            const dimension = DimensionsData.getDimensionNumericId(data.dimension);
            const pos = data.position;
            let chunk = WorldRegister.chunk.get(dimension, pos[0], pos[1], pos[2]);
            if (!chunk) {
                let buffer = DataHooks.chunk.onGetSync.run([
                    dimension,
                    pos[0],
                    pos[1],
                    pos[2],
                ]);
                if (!buffer)
                    return;
                chunk = WorldRegister.chunk.add(dimension, pos[0], pos[1], pos[2], buffer);
            }
            this.__paint(dimension, data, chunk, update);
        },
        async voxelAsync(data) {
            if (!data.dimension) {
                data.dimension = WP._currentionDimension;
            }
            const dimension = DimensionsData.getDimensionNumericId(data.dimension);
            const pos = data.position;
            let chunk = WorldRegister.chunk.get(dimension, pos[0], pos[1], pos[2]);
            if (!chunk) {
                let buffer = await DataHooks.chunk.onGetAsync.run([
                    dimension,
                    pos[0],
                    pos[1],
                    pos[2],
                ]);
                if (!buffer)
                    return;
                chunk = WorldRegister.chunk.add(dimension, pos[0], pos[1], pos[2], buffer);
            }
            this.__paint(dimension, data, chunk);
        },
        __paint(dimension, data, chunk, update = true) {
            const x = data.position[0];
            const y = data.position[1];
            const z = data.position[2];
            const id = VoxelPaletteReader.id.getPaletteId(data.id, data.state ? data.state : 0);
            const voxleData = VoxelData.getVoxelData(id);
            if (id < 0)
                return false;
            WP.heightMap.update.add(dimension, voxleData.substance, x, y, z);
            let stateData = VoxelReader.setShapeState(0, data.shapeState ? data.shapeState : 0);
            if (voxleData.substance == "fluid" || voxleData.substance == "magma") {
                stateData = VoxelReader.setLevel(stateData, 15);
            }
            if (data.secondaryVoxelId && data.secondaryVoxelId != "dve:air") {
                const vid = VoxelPaletteReader.id.getPaletteId(data.secondaryVoxelId, data.secondaryState ? data.secondaryState : 0);
                if (vid > 0) {
                    stateData = VoxelReader.setId(vid, stateData);
                }
            }
            const voxelPOS = WorldBounds.getVoxelPosition(x, y, z);
            ChunkReader.setVoxelDataUseObj(chunk, voxelPOS, VoxelReader.setId(id, 0));
            ChunkReader.setVoxelDataUseObj(chunk, voxelPOS, stateData, true);
            if (data.secondaryVoxelId && data.secondaryVoxelId != "dve:air") {
            }
            if (update) {
                if (voxleData.lightSource && voxleData.lightValue) {
                    DataHooks.paint.addToRGBUpdate.run([dimension, x, y, z]);
                }
            }
        },
        erease(dimensionId, x, y, z) {
            if (!this._dt.loadIn(x, y, z))
                return;
            if (!this._dt.isRenderable())
                return;
            const substance = this._dt.getSubstance();
            WP.heightMap.update.remove(dimensionId, substance, x, y, z);
            this._dt.setAir().commit();
        },
    },
};
export const WorldPainter = WP;
