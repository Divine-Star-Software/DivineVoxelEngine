import { DataToolBase } from "./DataToolBase.js";
export class RichDataSegmentTool extends DataToolBase {
    sceham = {};
    segment = "voxel";
    constructor() {
        super();
    }
    setSegment(segment) {
        this.segment = segment;
        if (!this.sceham[segment]) {
            this.sceham[segment] = {};
        }
        return this;
    }
    getSegment() {
        const segment = this.sceham[this.segment];
        if (segment)
            return segment;
        return false;
    }
    getAll() {
        if (this.sceham)
            return this.sceham;
        return false;
    }
}
