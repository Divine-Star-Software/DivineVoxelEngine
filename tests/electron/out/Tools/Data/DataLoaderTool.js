import { RegionHeaderRegister } from "../../Data/World/Region/RegionHeaderRegister.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { DataToolWorldBound } from "./Classes/DataToolBase.js";
import { ColumnDataTool } from "./WorldData/ColumnDataTool.js";
export class DataLoaderTool extends DataToolWorldBound {
    static columnDataTool = new ColumnDataTool();
    static isEnabled() {
        const comm = ThreadComm.getComm("data-loader");
        return Boolean(comm);
    }
    dataComm;
    constructor() {
        super();
        const comm = ThreadComm.getComm("data-loader");
        if (!comm) {
            throw new Error("Data Loader comm must be set.");
        }
        this.dataComm = comm;
    }
    saveRegion(onDone) {
        const location = this.getLocation();
        this.dataComm.runPromiseTasks("save-region", location.toString(), () => (onDone ? onDone() : false), location);
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
        this.dataComm.runPromiseTasks("load-region", location.toString(), () => (onDone ? onDone() : false), location);
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
        this.dataComm.runPromiseTasks("save-column", location.toString(), () => (onDone ? onDone() : false), location);
    }
    saveColumnIfNotStored(onDone) {
        const location = this.getLocation();
        if (!DataLoaderTool.columnDataTool.loadInAt(location))
            return false;
        if (DataLoaderTool.columnDataTool.isStored())
            return false;
        this.dataComm.runPromiseTasks("save-column", location.toString(), () => (onDone ? onDone(true) : false), location);
        return true;
    }
    loadIfExists(onDone) {
        const location = [...this.getLocation()];
        this.columnExists((exists) => {
            if (exists) {
                this.setLocation(location);
                this.loadColumn(() => {
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
        const location = this.getLocation();
        this.dataComm.runPromiseTasks("load-column", location.toString(), () => (onDone ? onDone() : false), location);
    }
    loadColumnAsync() {
        return new Promise((resolve) => {
            this.loadColumn(() => {
                resolve(true);
            });
        });
    }
    _runTask(id, location, onDone) {
        this.dataComm.runPromiseTasks(id, location.toString(), (data) => {
            onDone ? onDone(data) : false;
        }, location);
    }
    columnExists(onDone) {
        const location = [...this.getLocation()];
        if (!RegionHeaderRegister.get(location)) {
            this.loadRegionHeader(() => {
                this.setLocation(location).columnExists(onDone);
            });
            return;
        }
        const exists = RegionHeaderRegister.isStored(location);
        onDone ? onDone(exists >= 1 ? true : false) : false;
    }
    loadRegionHeader(onDone) {
        const location = this.getLocation();
        this.dataComm.runPromiseTasks("load-region-header", location.toString(), (data) => {
            onDone ? onDone(data) : false;
        }, location);
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
        this.dataComm.runPromiseTasks("column-timestamp", location.toString(), (data) => {
            onDone ? onDone(data) : false;
        }, location);
    }
    columnTimestampAsync() {
        return new Promise((resolve) => {
            this.columnTimestamp((timeStamp) => {
                resolve(timeStamp);
            });
        });
    }
}
