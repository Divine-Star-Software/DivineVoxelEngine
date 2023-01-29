import { BufferTypes } from "../Types/Util.types.js";
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
    getBuffer(): ArrayBuffer;
    setTagIndex(index: number): void;
    getTag(id: string): number;
    setTag(id: string, value: number): boolean;
    getArrayTagValue(id: string, index: number): number;
    /**## getArrayTagByteIndex
     *  Get the actual byte index for the provided index of the array.
     * @param id
     * @param index
     * @returns
     */
    getArrayTagByteIndex(id: string, index: number): number;
    setArrayTagValue(id: string, index: number, value: number): number | void;
    loopThroughTags(run: (id: string, value: number) => void): void;
    loopThroughIndex(run: (data: number[]) => void): void;
    loopThroughAllIndexTags(run: (id: string, value: number, index: number) => void): void;
}
