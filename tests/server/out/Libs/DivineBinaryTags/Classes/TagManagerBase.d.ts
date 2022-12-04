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
    setBuffer(data: BufferTypes | DataView): void;
    setTagIndex(index: number): void;
    getTag(id: string): number;
    setTag(id: string, value: number): boolean;
    getArrayTagValue(id: string, index: number): number;
    setArrayTagValue(id: string, index: number, value: number): number | void;
    loopThroughTags(run: (id: string, value: number) => void): void;
    loopThroughIndex(run: (data: number[]) => void): void;
    loopThroughAllIndexTags(run: (id: string, value: number, index: number) => void): void;
}
