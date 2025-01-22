import { EngineSettingsData } from "./EngineSettings.types.js";
import { WorldBounds } from "../Data/World/WorldBounds.js"
import { InitWorldSpaces, WorldSpaces } from "../Data/World/WorldSpaces.js"
import { Environment } from "@amodx/core/Environment/Environment.js";
import { Observable } from "@amodx/core/Observers/Observable.js";

/**# Engine Settings
 * ---
 * Handles common settings for all contexts
 */
export class EngineSettings {
  static observers = {
    updated: new Observable<EngineSettingsData>(),
  };
  static enviorment: "node" | "browser" = Environment.nodeJS.isNode
    ? "node"
    : "browser";
  static settings = new EngineSettingsData();
  static getSettings() {
    return this.settings;
  }

  static syncSettings(data: EngineSettingsData) {
    //safetly set data without prototype pollution
    for (const settingsKey of Object.keys(data)) {
      if (settingsKey.includes("__")) {
        throw new Error(
          "Can not include properties with multpile underscores."
        );
      }
      if ((this as any).settings[settingsKey] !== undefined) {
        for (const propertyKey of Object.keys((data as any)[settingsKey])) {
          if (propertyKey.includes("__")) {
            throw new Error(
              "Can not include properties with multpile underscores."
            );
          }
          if ((this as any).settings[settingsKey][propertyKey] !== undefined) {
            //@ts-ignore
            (this as any).settings[settingsKey][propertyKey] = (data as any)[
              settingsKey
            ][propertyKey];
          }
        }
      }
    }
    InitWorldSpaces(this.settings);
    if (this.settings.world) {
      WorldBounds.setWorldBounds(
        this.settings.world.minX,
        this.settings.world.maxX,
        this.settings.world.minZ,
        this.settings.world.maxZ,
        this.settings.world.minY,
        this.settings.world.maxY
      );
    }
    this.observers.updated.notify(this.settings);
  }

  static getSettingsCopy() {
    return JSON.parse(JSON.stringify(this.settings));
  }

  static syncChunkInRichWorldThread() {
    return (
      this.settings.richWorld.enabled && this.settings.richWorld.autoSyncChunks
    );
  }

  static richDataEnabled() {
    return this.settings.richWorld.enabled;
  }

  static syncChunkInDataThread() {
    return this.settings.dataLoader.enabled && this.settings.dataLoader.autoSyncChunks;
  }

  static syncChunksInNexusThread() {
    return this.settings.nexus.enabled && this.settings.nexus.autoSyncChunks;
  }

  static doSunPropagation() {
    return this.settings.lighting.autoSunLight == true;
  }
  static doRGBPropagation() {
    return this.settings.lighting.autoRGBLight == true;
  }

  static doLight() {
    return this.doRGBPropagation() || this.doSunPropagation();
  }
  static doFlow() {
    return this.settings.flow.enable;
  }
  static saveWorldData() {
    return this.settings.dataLoader.enabled;
  }
  static isServer() {
    return this.settings.server.enabled && this.enviorment == "node";
  }
  static isClient() {
    return this.enviorment != "browser";
  }
}
