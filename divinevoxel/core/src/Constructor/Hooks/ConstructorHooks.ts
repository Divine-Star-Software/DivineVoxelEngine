import { TextureManager } from "Constructor/Builder/Textures/TextureManager";
import { Hooks } from "@divinestar/utils/Hooks";

export const ConstructorHooks = {
 texturesRegistered: Hooks.getSyncHook<typeof TextureManager, void>(),
};

