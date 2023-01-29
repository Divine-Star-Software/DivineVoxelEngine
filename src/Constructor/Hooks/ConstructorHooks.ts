import { TextureManager } from "Constructor/Builder/Textures/TextureManager";
import { Hooks } from "../../Libs/Hooks/Hooks.js";

export const ConstructorHooks = {
 texturesRegistered: Hooks.getSyncHook<typeof TextureManager, void>(),
};

