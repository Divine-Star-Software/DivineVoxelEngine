import { WorldRegister } from "./WorldRegister.js";
import { DataHooks } from "../DataHooks.js";
import { DimensionsRegister } from "../Dimensions/DimensionsRegister.js";
import { VoxelPaletteReader } from "../Voxel/VoxelPalette.js";
import { DataTool } from "../../Tools/Data/DataTool.js";
const WP = {
    _currentionDimension: "main",
    util: {
        isSameVoxel(dimensionId, x, y, z, x2, y2, z2, secondary = false) {
            return true;
        },
    },
    paint: {
        _dt: new DataTool(),
        voxel(data, update = true) {
            if (!data.dimension) {
                data.dimension = WP._currentionDimension;
            }
            const dimension = DimensionsRegister.getDimensionNumericId(data.dimension);
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
            this.__paint(dimension, data, update);
        },
        async voxelAsync(data) {
            if (!data.dimension) {
                data.dimension = WP._currentionDimension;
            }
            const dimension = DimensionsRegister.getDimensionNumericId(data.dimension);
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
            this.__paint(dimension, data);
        },
        __paint(dimension, data, update = true) {
            this._dt.setDimension(dimension);
            const x = data.position[0];
            const y = data.position[1];
            const z = data.position[2];
            if (!this._dt.loadIn(x, y, z))
                return;
            const id = VoxelPaletteReader.id.getPaletteId(data.id, data.state ? data.state : 0);
            if (id < 0)
                return false;
            this._dt.setId(id);
            this._dt.setShapeState(data.shapeState ? data.shapeState : 0);
            const substance = this._dt.getSubstance();
            if (substance == "fluid" || substance == "magma") {
                this._dt.setLevel(15);
            }
            if (data.secondaryVoxelId && data.secondaryVoxelId != "dve:air") {
                const vid = VoxelPaletteReader.id.getPaletteId(data.secondaryVoxelId, data.secondaryState ? data.secondaryState : 0);
                if (vid > 0) {
                    this._dt.setSecondary(true);
                    this._dt.setId(vid);
                    this._dt.setSecondary(false);
                }
            }
            this._dt.commit(1);
            if (update) {
                if (this._dt.isLightSource() && this._dt.getLightSourceValue()) {
                    DataHooks.paint.onAddToRGBUpdate.run([dimension, x, y, z]);
                }
            }
            if (this._dt.isRich()) {
                DataHooks.paint.onRichVoxelPaint.run([
                    this._dt.getStringId(),
                    dimension,
                    x,
                    y,
                    z,
                ]);
            }
        },
        erease(dimensionId, x, y, z) {
            this._dt.setDimension(dimensionId);
            if (!this._dt.loadIn(x, y, z))
                return;
            if (!this._dt.isRenderable())
                return;
            this._dt
                .setLight(0)
                .setLevel(0)
                .setLevelState(0)
                .setShapeState(0)
                .setAir()
                .commit(2);
        },
    },
};
export const WorldPainter = WP;
