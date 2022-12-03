import type { RemoteTagManagerInitData } from "./Meta/Util.types.js";
import { TagManagerBase } from "./Classes/TagManagerBase.js";
export declare class RemoteTagManager extends TagManagerBase {
    id: string;
    constructor(id: string);
    $INIT(data: RemoteTagManagerInitData): void;
}
