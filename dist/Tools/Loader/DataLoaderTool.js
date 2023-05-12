import { RegionHeaderRegister } from "../../Data/World/Region/RegionHeaderRegister.js";
import { ThreadComm } from "threadcomm";
import { ColumnDataTool } from "../Data/WorldData/ColumnDataTool.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { LocationBoundTool } from "../Classes/LocationBoundTool.js";
import { Distance3D } from "../../Math/Functions/Distance3d.js";
import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
import { DataHooks } from "../../Data/DataHooks.js";
import { WorldLock } from "../../World/Lock/WorldLock.js";
import { LoaderRegister } from "./LoaderRegister.js";
class DataLoaderTool extends LocationBoundTool {
    static columnDataTool = new ColumnDataTool();
    static isEnabled() {
        const comm = ThreadComm.getComm("data-loader");
        return Boolean(comm);
    }
    mode = "server";
    _enabled = true;
    dataComm;
    constructor() {
        super();
        const comm = ThreadComm.getComm("data-loader");
        if (!comm) {
            this._enabled = false;
            console.error("Data Loader comm must be set.");
        }
        this.dataComm = comm;
        this.mode = EngineSettings.settings.data.mode;
        LoaderRegister.$INIT(this.dataComm);
        DataHooks.settingsSynced.addToRun((data) => {
            this.mode = data.data.mode;
        });
    }
    _runTask(id, location, onDone) {
        this.dataComm.runPromiseTasks(id, location, [], (data) => {
            onDone ? onDone(data) : false;
        });
    }
    isEnabled() {
        return this._enabled;
    }
    saveRegion(onDone) {
        const location = this.getLocation();
        this.dataComm.runPromiseTasks("save-region", location, [], () => onDone ? onDone() : false);
    }
    saveRegionAsync() {
        return new Promise((resolve) => {
            this.saveRegion(() => {
                resolve(true);
            });
        });
    }
    loadRegion(onDone) {
        const location = this.getLocation();
        this.dataComm.runPromiseTasks("load-region", location, [], () => onDone ? onDone() : false);
    }
    loadRegionAsync() {
        return new Promise((resolve) => {
            this.loadRegion(() => {
                resolve(true);
            });
        });
    }
    saveColumn(onDone) {
        const location = this.getLocation();
        this.dataComm.runPromiseTasks("save-column", location, [], () => onDone ? onDone() : false);
    }
    saveColumnIfNotStored(onDone) {
        const location = this.getLocation();
        if (!DataLoaderTool.columnDataTool.setLocation(location).loadIn())
            return onDone ? onDone(false) : false;
        if (DataLoaderTool.columnDataTool.isStored())
            return onDone ? onDone(false) : false;
        this.dataComm.runPromiseTasks("save-column", location, [], () => {
            if (onDone)
                onDone(true);
        });
        return true;
    }
    loadIfExists(onDone) {
        const location = [...this.getLocation()];
        this.columnExists((exists) => {
            if (exists) {
                this.setLocation(location).loadColumn(() => {
                    onDone ? onDone(true) : false;
                });
                return;
            }
            onDone ? onDone(false) : false;
        });
    }
    saveColumnAsync() {
        return new Promise((resolve) => {
            this.saveColumn(() => {
                resolve(true);
            });
        });
    }
    loadColumn(onDone) {
        LoaderRegister.addToLoad(this.getLocation(), () => {
            onDone ? onDone(true) : false;
        });
    }
    loadColumnAsync() {
        return new Promise((resolve) => {
            this.loadColumn(() => {
                resolve(true);
            });
        });
    }
    unLoadColumn(onDone) {
        const location = this.getLocation();
        if (WorldLock.isLocked(location) || !WorldRegister.column.get(location))
            return onDone ? onDone(false) : false;
        this.dataComm.runPromiseTasks("unload-column", location, [], () => {
            onDone ? onDone(true) : false;
        });
    }
    columnExists(onDone) {
        const location = [...this.getLocation()];
        if (this.mode == "server") {
            if (!RegionHeaderRegister.get(location)) {
                this.loadRegionHeader(() => {
                    this.setLocation(location).columnExists(onDone);
                });
                return;
            }
            const exists = RegionHeaderRegister.isStored(location);
            onDone ? onDone(exists >= 1 ? true : false) : false;
            return;
        }
        this.dataComm.runPromiseTasks("column-exists", location, [], (data) => {
            onDone ? onDone(data) : false;
        });
    }
    loadRegionHeader(onDone) {
        const location = this.getLocation();
        this.dataComm.runPromiseTasks("load-region-header", location, [], (data) => {
            onDone ? onDone(data) : false;
        });
    }
    loadRegionHeaderAsync() {
        return new Promise((resolve) => {
            this.loadRegionHeader((anaswer) => {
                resolve(anaswer);
            });
        });
    }
    columnExistsAsync() {
        return new Promise((resolve) => {
            this.columnExists((anaswer) => {
                resolve(anaswer);
            });
        });
    }
    columnTimestamp(onDone) {
        const location = this.getLocation();
        this.dataComm.runPromiseTasks("column-timestamp", location, [], (data) => {
            onDone ? onDone(data) : false;
        });
    }
    columnTimestampAsync() {
        return new Promise((resolve) => {
            this.columnTimestamp((timeStamp) => {
                resolve(timeStamp);
            });
        });
    }
    unLoadAllOutsideRadius(radius, run = (columntool) => true, onDone) {
        const [dimension, sx, sy, sz] = this.location;
        const regions = WorldRegister.dimensions.get(dimension);
        if (!regions)
            return;
        let totalColumns = 0;
        for (const [key, region] of regions) {
            for (const [ckey, column] of region.columns) {
                DataLoaderTool.columnDataTool.setColumn(column);
                if (DataLoaderTool.columnDataTool.isPersistent())
                    continue;
                const [dimension, cx, cy, cz] = DataLoaderTool.columnDataTool.getLocationData();
                if (!run(DataLoaderTool.columnDataTool))
                    continue;
                const d = Distance3D(sx, sy, sz, cx, cy, cz);
                if (d > radius) {
                    totalColumns++;
                    this.setXYZ(cx, cy, cz).unLoadColumn(() => {
                        totalColumns--;
                    });
                }
            }
        }
        const inte = setInterval(() => {
            if (totalColumns == 0) {
                clearInterval(inte);
                if (onDone)
                    onDone();
            }
        }, 1);
    }
    unLoadAllColumnsAsync() {
        return new Promise((resolve) => {
            this.unLoadAllColumns(() => {
                resolve(true);
            });
        });
    }
    unLoadAllColumns(onDone) {
        const [dimension, sx, sy, sz] = this.location;
        const regions = WorldRegister.dimensions.get(dimension);
        if (!regions)
            return;
        let totalColumns = 0;
        for (const [key, region] of regions) {
            for (const [ckey, column] of region.columns) {
                DataLoaderTool.columnDataTool.setColumn(column);
                const [dimension, cx, cy, cz] = DataLoaderTool.columnDataTool.getLocationData();
                totalColumns++;
                this.setXYZ(cx, cy, cz).unLoadColumn(() => {
                    totalColumns--;
                });
            }
        }
        const inte = setInterval(() => {
            if (totalColumns == 0) {
                clearInterval(inte);
                if (onDone)
                    onDone();
            }
        }, 1);
    }
    allColumns(run) {
        const [dimension, sx, sy, sz] = this.location;
        const regions = WorldRegister.dimensions.get(dimension);
        if (!regions)
            return;
        for (const [key, region] of regions) {
            for (const [ckey, column] of region.columns) {
                DataLoaderTool.columnDataTool.setColumn(column);
                run(DataLoaderTool.columnDataTool);
            }
        }
    }
    getAllUnStoredColumns(run) {
        const [dimension, sx, sy, sz] = this.location;
        const regions = WorldRegister.dimensions.get(dimension);
        if (!regions)
            return;
        for (const [key, region] of regions) {
            for (const [ckey, column] of region.columns) {
                DataLoaderTool.columnDataTool.setColumn(column);
                if (DataLoaderTool.columnDataTool.isStored())
                    continue;
                const [dimension, cx, cy, cz] = DataLoaderTool.columnDataTool.getLocationData();
                run(dimension, cx, cy, cz);
            }
        }
    }
}
export { DataLoaderTool };
