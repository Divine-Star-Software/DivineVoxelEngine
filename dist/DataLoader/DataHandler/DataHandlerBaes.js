import { DataHanlderWrapper } from "./DataHandlerWrapper.js";
export class DataHandler {
    mode = "indexdb";
    constructor() {
        this.mode = DataHanlderWrapper.mode;
    }
    setMode(mode) {
        this.mode = mode;
    }
    dataType = "world-data";
    setDataType(type) {
        this.dataType = type;
    }
}
