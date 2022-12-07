import type { TagManager } from "Libs/DivineBinaryTags/TagManager";
export declare class DataToolBase {
    tags: TagManager;
    _c: ArrayBuffer | SharedArrayBuffer | DataView;
    constructor(tags: TagManager);
    getTagValue(id: string): number;
    setTagValue(id: string, value: number): boolean;
    getArrayTagValue(id: string, index: number): number;
    setArrayTagValue(id: string, index: number, value: number): number | void;
}
