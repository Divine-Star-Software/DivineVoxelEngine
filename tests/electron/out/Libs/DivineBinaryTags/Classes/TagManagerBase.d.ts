import { BufferTypes } from "../Meta/Util.types.js";
export declare class TagManagerBase {
    id: string;
    byteOffSet: number;
    tagSize: number;
    tagIndexes: number;
    data: DataView;
    indexMap: Map<string, number>;
    index: DataView;
    constructor(id: string);
    setBuffer(buffer: BufferTypes): void;
    setTagIndex(index: number): void;
    getTag(id: string): number;
    setTag(id: string, value: number): void;
    loopThroughTags(run: (id: string, value: number) => void): void;
    loopThroughAllIndexTags(run: (id: string, value: number, index: number) => void): void;
}
