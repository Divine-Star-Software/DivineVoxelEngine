import { DataToolBase } from "Tools/Classes/DataToolBase";
export class RichDataToolBase extends DataToolBase {
    sceham;
    segment;
    setSegment(segment) {
        this.segment = segment;
        if (!this.sceham[segment]) {
            this.sceham[segment] = {};
        }
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
