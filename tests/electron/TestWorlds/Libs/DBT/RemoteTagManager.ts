import type { RemoteTagManagerInitData } from "./Types/Util.types.js";
import { TagManagerBase } from "./Classes/TagManagerBase.js";

export class RemoteTagManager extends TagManagerBase {
  constructor(public id: string) {
    super(id);
  }
  $INIT(data: RemoteTagManagerInitData) {
    this.data = new DataView(data.buffer);
    this.index = new DataView(data.indexBuffer);
    this.indexMap = data.indexMap;
    this.tagIndexes = data.totalIndexes;
    this.tagSize = data.tagSize;
  }
}
