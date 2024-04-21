import {
  ObjectCollectionGroupData,
  StoredCollection,
  ObjectCollection,
} from "@divinestar/utils/Schemas";
import { GamepadManager } from "./Gamepads/GamepadManager.js";
import { ControlData, ControlInputData } from "./Controls/Control.types.js";
import { RecursivePartial } from "@divinestar/utils";
import { DCUser } from "./Users/DCUser.js";
import { Environment } from "@divinestar/utils/Environment/Environment.js";

import { HoldRegister } from "./HoldRegister.js";
import InitControls from "./InitControls.js";
import { DCUserManager } from "./Users/DCUserManager.js";
export class DivineControls {
  static controls = new ObjectCollection<ControlData>();
  static _os = Environment.system.os;

  static _capturing = false;
  static _capturingMode: "gamepad" | "keyboard" = "gamepad";
  static _capturedData: RecursivePartial<ControlInputData> | null = null;
  static mainUser: DCUser;
  private constructor() {}
  static reInitControls = () => {};
  static clearControls = () => {};

  private static _initalized = false;
  static init() {
    if (this._initalized) return this;
    this._initalized = true;
    const { addListeners, removeListeners } = InitControls(this);
    this.clearControls = () => {
      removeListeners();
    };
    this.reInitControls = () => {
      addListeners();
    };
    return this;
  }

  static registerControlGroups(data: ObjectCollectionGroupData[]) {
    this.controls.addGroups(data);
    return this;
  }

  static registerControls(data: ControlData[]) {
    this.controls.addNodes(data);
    return this;
  }

  static getControl(id: string) {
    return this.controls.getData(id);
  }

  static captureControlForInput(
    controlId: string,
    mode: "keyboard" | "gamepad" = "keyboard"
  ) {
    return new Promise((resolve) => {
      this._capturingMode = mode;
      setTimeout(() => {
        this._capturing = true;
        const inte = setInterval(() => {
          if (!this._capturing) {
            resolve(true);
            clearInterval(inte);
            if (!this._capturedData) return;
            this.updateControlInputData(controlId, this._capturedData);
          }
        }, 100);
      }, 200);
    });
  }

  static updateControlInputData(
    controlId: string,
    data: RecursivePartial<ControlInputData>
  ) {
    const control = this.getControl(controlId);
    if (!control) {
      throw new Error(`Control with id: ${controlId} does not exists`);
    }
    for (const type in control.input) {
      //@ts-ignore
      if (!data[type]) continue;
      //@ts-ignore
      control.input[type] = { ...control.input[type], ...data[type] };
    }
    DCUserManager.updateControls();
  }

  static serializeInputData(): StoredCollection {
    return this.controls.store();
  }

  static injestInputData(data: [string, ControlInputData][]) {
    this.controls.loadIn(data);
  }

  static update(delta = 0.16) {
    GamepadManager.updateGamepads();
    HoldRegister.run(delta);
  }
}
