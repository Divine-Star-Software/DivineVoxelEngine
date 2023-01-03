import { ColumnDataTool } from "../../../Tools/Data/WorldData/ColumnDataTool.js";
import { $2dMooreNeighborhood } from "../../../Data/Constants/Util/CardinalNeighbors.js";
import { BuilderTool } from "../../../Tools/Build/BuilderTool.js";
import { TasksTool } from "../../../Tools/Tasks/TasksTool.js";
import { Distance3D } from "../../../Libs/Math/Functions/Distance3d.js";
import { WorldSpaces } from "../../../Data/World/WorldSpaces.js";
import { DataLoaderTool } from "../../../Tools/Data/DataLoaderTool.js";
/**# Infinite World Generator
 *
 */
export class IWG {
    data;
    columnTool = new ColumnDataTool();
    nColumnTool = new ColumnDataTool();
    builder = new BuilderTool();
    dataLoader;
    tasks = TasksTool();
    dimension = "main";
    _cachedPosition = [-Infinity, -Infinity, -Infinity];
    _columnQueue = [];
    _generateQueue = [];
    _visitedMap = new Map();
    _activeColumns = new Map();
    _generateMap = new Map();
    _existsCheckMap = new Map();
    _sunMap = new Map();
    constructor(data) {
        this.data = data;
        if (!DataLoaderTool.isEnabled()) {
            throw new Error("Data Loader must be enabled.");
        }
        this.dataLoader = new DataLoaderTool();
    }
    setDimension(id) {
        this.dimension = id;
    }
    _generate(columnKey, x, y, z, onDone) {
        this.builder.setDimension(this.dimension).setXYZ(x, y, z).fillColumn();
        this._generateMap.set(columnKey, true);
        this.tasks.generate.deferred.run(x, y, z, [], () => {
            if (this.columnTool.loadIn(x, y, z)) {
                this._generateMap.delete(columnKey);
                this.columnTool.setTagValue("#dve_is_world_gen_done", 1);
                onDone ? onDone() : false;
            }
        });
    }
    update() {
        const position = this.data.positionWatch;
        let positionChanged = false;
        const wx = position[0];
        const wy = 0;
        const wz = position[2];
        const worldColumnPOS = WorldSpaces.column.getPositionXYZ(wx, 0, wz);
        if (worldColumnPOS.x != this._cachedPosition[0] ||
            worldColumnPOS.y != this._cachedPosition[1] ||
            worldColumnPOS.z != this._cachedPosition[2])
            positionChanged = true;
        if (positionChanged) {
            this.builder
                .setXYZ(worldColumnPOS.x, worldColumnPOS.y, worldColumnPOS.z)
                .removeColumnsOutsideRadius(this.data.renderDistance);
            this._cachedPosition[0] = worldColumnPOS.x;
            this._cachedPosition[1] = worldColumnPOS.y;
            this._cachedPosition[2] = worldColumnPOS.z;
            this._generateQueue = [];
            for (const [key, pos] of this._activeColumns) {
                const distance = Distance3D(worldColumnPOS.x, 0, worldColumnPOS.z, pos[0], 0, pos[2]);
                if (distance <= this.data.renderDistance)
                    continue;
                this._activeColumns.delete(key);
            }
        }
        this._generateQueue.push([
            worldColumnPOS.x,
            worldColumnPOS.y,
            worldColumnPOS.z,
        ]);
        while (this._generateQueue.length) {
            const node = this._generateQueue.shift();
            if (!node)
                break;
            const cx = node[0];
            const cy = 0;
            const cz = node[2];
            const columnKey = WorldSpaces.column.getKeyXYZ(cx, 0, cz);
            if (this._visitedMap.has(columnKey) || this._existsCheckMap.has(columnKey))
                continue;
            this._visitedMap.set(columnKey, true);
            const distance = Distance3D(wx, 0, wz, cx, 0, cz);
            if (distance > this.data.generateDistance)
                continue;
            if (this._generateMap.has(columnKey) || this._sunMap.has(columnKey))
                continue;
            let needToGenerate = false;
            if (!this.columnTool.loadIn(cx, cy, cz)) {
                needToGenerate = true;
                this._existsCheckMap.set(columnKey, true);
                this.dataLoader
                    .setLocation([this.dimension, cx, cy, cz])
                    .loadIfExists((exists) => {
                    if (!exists) {
                        this._generate(columnKey, cx, cy, cz, () => {
                            this._existsCheckMap.delete(columnKey);
                        });
                        return;
                    }
                    this._existsCheckMap.delete(columnKey);
                });
                continue;
            }
            else {
                if (!this.columnTool.getTagValue("#dve_is_world_gen_done")) {
                    this._generate(columnKey, cx, cy, cz);
                    continue;
                }
            }
            let nWorldGenAllDone = true;
            let nSunAllDone = true;
            if (!this.columnTool.getTagValue("#dve_is_world_sun_done")) {
                nSunAllDone = false;
            }
            for (const n of $2dMooreNeighborhood) {
                const nx = cx + n[0] * WorldSpaces.column._bounds.x;
                const nz = cz + n[1] * WorldSpaces.column._bounds.z;
                const columnPOS = WorldSpaces.column.getPositionXYZ(nx, cy, nz), key = WorldSpaces.column.getKey();
                if (!this._visitedMap.has(key)) {
                    this._generateQueue.push([columnPOS.x, cy, columnPOS.z]);
                }
                if (!this.nColumnTool.loadIn(columnPOS.x, cy, columnPOS.z)) {
                    nWorldGenAllDone = false;
                    nSunAllDone = false;
                    break;
                }
                if (!this.nColumnTool.getTagValue("#dve_is_world_gen_done")) {
                    nWorldGenAllDone = false;
                }
                if (!this.nColumnTool.getTagValue("#dve_is_world_sun_done")) {
                    nSunAllDone = false;
                }
            }
            if (nWorldGenAllDone &&
                !this._sunMap.has(columnKey) &&
                !this.columnTool.getTagValue("#dve_is_world_sun_done")) {
                this._sunMap.set(columnKey, true);
                this.tasks.light.worldSun.deferred.run(cx, cy, cz, () => {
                    if (this.columnTool.loadIn(cx, cy, cz)) {
                        this._sunMap.delete(columnKey);
                        this.columnTool.setTagValue("#dve_is_world_sun_done", 1);
                    }
                });
            }
            if (distance > this.data.renderDistance)
                continue;
            if (nWorldGenAllDone &&
                nSunAllDone &&
                distance < this.data.renderDistance &&
                !this._activeColumns.has(columnKey)) {
                this.builder.setDimension(this.dimension).setXYZ(cx, cy, cz).buildColumn();
                this._activeColumns.set(columnKey, [cx, cy, cz]);
                this.dataLoader
                    .setLocation([this.dimension, cx, cy, cz])
                    .saveColumnIfNotStored();
            }
        }
        this._visitedMap.clear();
    }
}
