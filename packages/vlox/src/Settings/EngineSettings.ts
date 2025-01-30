import { EngineSettingsData } from "./EngineSettings.types.js";
import { Environment } from "../Util/Environment";
import { TypedEventTarget } from "../Util/TypedEventTarget.js";
type EngineSettingsEvents = {
  synced: { settings: EngineSettingsClass };
};

/**# Engine Settings
 * ---
 * Handles common settings for all contexts
 */
class EngineSettingsClass extends TypedEventTarget<EngineSettingsEvents> {
  enviorment: "node" | "browser" = Environment.isNode() ? "node" : "browser";
  settings = new EngineSettingsData();
  getSettings() {
    return this.settings;
  }

  syncSettings(data: EngineSettingsData) {
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

    this.dispatch("synced", { settings: this });
  }

  getSettingsCopy() {
    return JSON.parse(JSON.stringify(this.settings));
  }

  doSunPropagation() {
    return this.settings.lighting.autoSunLight == true;
  }
  doRGBPropagation() {
    return this.settings.lighting.autoRGBLight == true;
  }

  doLight() {
    return this.doRGBPropagation() || this.doSunPropagation();
  }
  doFlow() {
    return this.settings.flow.enable;
  }

  isClient() {
    return this.enviorment != "browser";
  }
}

export const EngineSettings = new EngineSettingsClass();
