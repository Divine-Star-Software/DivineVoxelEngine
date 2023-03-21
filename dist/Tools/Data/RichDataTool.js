import { DBO } from "divine-binary-object/index.js";
import { ThreadComm } from "threadcomm";
import { LocationBoundTool } from "../Classes/LocationBoundTool.js";
export class RichDataTool extends LocationBoundTool {
    segment = "voxels";
    comm;
    _enabled = false;
    constructor() {
        super();
        this.comm = ThreadComm.getComm("rich-world");
        if (!this.comm || !this.comm.isPortSet()) {
            this._enabled = false;
            if (this.comm) {
                this.comm.onSetPort(() => {
                    this._enabled = true;
                });
            }
            return;
        }
        if (this.comm.isPortSet()) {
            this._enabled = true;
        }
    }
    isEnabled() {
        return this._enabled;
    }
    setSegment(segment) {
        this.segment = segment;
        return this;
    }
    columnHasData(check) {
        this.comm.runPromiseTasks("has-data", this.location, [], (hadData) => {
            check(hadData);
        });
    }
    columnHasDataAsync() {
        return new Promise((resolve) => {
            this.columnHasData((hasData) => {
                resolve(hasData);
            });
        });
    }
    getData(onDone) {
        this.comm.runPromiseTasks("get-data", [this.location, this.segment], [], (data) => {
            if (!data)
                return onDone(false);
            onDone(DBO.bufferToObject(data));
        });
    }
    getDataAsync() {
        return new Promise((resolve) => {
            this.getData((data) => {
                resolve(data);
            });
        });
    }
    setData(data, onDone = (data) => { }) {
        const buffer = DBO.objectToBuffer(data);
        this.comm.runPromiseTasks("set-data", [this.location, this.segment, buffer], [buffer], (success) => {
            onDone(success);
        });
    }
    setDataAsync(data) {
        return new Promise((resolve) => {
            this.setData(data, (updated) => {
                resolve(updated);
            });
        });
    }
    removeData(onDone) {
        this.comm.runPromiseTasks("remove-data", [this.location, this.segment], [], (removed) => {
            onDone(removed);
        });
    }
    removeDataAsync() {
        return new Promise((resolve) => {
            this.removeData((removed) => {
                resolve(removed);
            });
        });
    }
    removeColumn(onDone) {
        this.comm.runPromiseTasks("remove-column", this.location, [], (removed) => {
            onDone(removed);
        });
    }
    removeColumnAsync() {
        return new Promise((resolve) => {
            this.removeData((removed) => {
                resolve(removed);
            });
        });
    }
    getColumn(onDone) {
        this.comm.runPromiseTasks("get-column", this.location, [], (data) => {
            onDone(data);
        });
    }
    getColumnAsync() {
        return new Promise((resolve) => {
            this.getColumn((data) => {
                resolve(data);
            });
        });
    }
    setColumn(column, onDone) {
        this.comm.runPromiseTasks("set-column", [this.location, column], [], (success) => {
            onDone(success);
        });
    }
    setColumnAsync(column) {
        return new Promise((resolve) => {
            this.setColumn(column, (success) => {
                resolve(success);
            });
        });
    }
    releaeAllData() {
        this.comm.runTasks("release-all-data", [], []);
    }
}
