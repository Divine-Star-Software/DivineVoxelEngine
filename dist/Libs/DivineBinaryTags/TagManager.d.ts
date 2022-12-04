import type { DBTSchema, DBTTagNodes } from "./Meta/DBTSchema.tyeps";
import type { RemoteTagManagerInitData } from "./Meta/Util.types.js";
import { TagManagerBase } from "./Classes/TagManagerBase.js";
declare type TagManagerInitData = {
    indexBufferMode?: "normal" | "shared";
    numberOfIndexes?: number;
};
export declare class TagManager extends TagManagerBase {
    id: string;
    schema: DBTSchema;
    initData: RemoteTagManagerInitData;
    constructor(id: string);
    registerTag(tagData: DBTTagNodes): void;
    $INIT(initData?: TagManagerInitData): RemoteTagManagerInitData;
}
export {};
