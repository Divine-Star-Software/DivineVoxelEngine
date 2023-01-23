import { MMDP } from "./MMD/MetaMarkedParser.js";
import { DBOP } from "./DBO/DivineBinaryObjectParser.js";
import { TNM } from "./NodeMaker.js";
export const DBO = {
    metaMarkedParser: MMDP,
    parser: DBOP,
    nodeMaker: TNM,
};
