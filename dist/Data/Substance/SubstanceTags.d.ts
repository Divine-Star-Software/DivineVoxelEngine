import { RemoteTagManager } from "divine-binary-tags";
declare class SDTags extends RemoteTagManager {
    id: string;
    constructor(id: string);
    setSubstance(id: string | number): void;
}
export declare const SubstanceTags: SDTags;
export {};
