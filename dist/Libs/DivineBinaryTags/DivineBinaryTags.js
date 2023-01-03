import { RemoteTagManager } from "./RemoteTagManager.js";
import { TagManager } from "./TagManager.js";
export const DivineBinaryTags = {
    createTagManager(id) {
        return new TagManager(id);
    },
    createRemoteTagManager(id) {
        return new RemoteTagManager(id);
    },
};
