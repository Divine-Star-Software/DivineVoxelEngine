import { EngineSettingsData } from "./EngineSettings.types.js";
import { Environment } from "../Util/Environment";
import { TypedEventTarget } from "../Util/TypedEventTarget.js";
import { Thread } from "@amodx/threads";
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
  version = "0.0.72";

  get doSunPropagation() {
    return this.settings.propagation.sunLightEnabled == true;
  }

  get doRGBPropagation() {
    return this.settings.propagation.rgbLightEnabled == true;
  }

  get doLight() {
    return this.doRGBPropagation || this.doSunPropagation;
  }

  get doFlow() {
    return this.settings.propagation.flowEnabled;
  }

  get doPower() {
    return this.settings.propagation.powerEnabled;
  }

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
}

export const EngineSettings = new EngineSettingsClass();

if (typeof SharedArrayBuffer === "undefined") {
  EngineSettings.settings.memoryAndCPU.useSharedMemory = false;
}
