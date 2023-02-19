import { TextureManager } from "Constructor/Builder/Textures/TextureManager";
import { Hooks } from "divine-hooks";

export const ConstructorHooks = {
 texturesRegistered: Hooks.getSyncHook<typeof TextureManager, void>(),
};

