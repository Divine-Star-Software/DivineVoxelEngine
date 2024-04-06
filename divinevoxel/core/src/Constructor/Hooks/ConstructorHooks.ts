import { Hooks } from "@divinestar/utils/Hooks";

export const ConstructorHooks = {
 texturesRegistered: Hooks.getSyncHook<any, void>(),
};

