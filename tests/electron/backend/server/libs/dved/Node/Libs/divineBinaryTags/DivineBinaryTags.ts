import { RemoteTagManager } from "./RemoteTagManager.js";
import { TagManager } from "./TagManager.js";
export const DivineBinaryTags = {
    createTagManager(id : string) {
        return new TagManager(id );
    },
    createRemoteTagManager(id : string) {
        return new RemoteTagManager(id);
    },
};
