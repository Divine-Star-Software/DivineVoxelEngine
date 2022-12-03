import { TagManagerBase } from "./Classes/TagManagerBase.js";
export class RemoteTagManager extends TagManagerBase {
    id;
    constructor(id) {
        super(id);
        this.id = id;
    }
    $INIT(data) {
        this.data = new DataView(data.buffer);
        this.index = new DataView(data.indexBuffer);
        this.indexMap = data.indexMap;
        this.tagIndexes = data.totalIndexes;
        this.tagSize = data.tagSize;
    }
}
