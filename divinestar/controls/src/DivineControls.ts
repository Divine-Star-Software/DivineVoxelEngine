import {
  ObjectCollectionGroupData,
  StoredCollection,
  ObjectCollection,
} from "@divinestar/schemas/";
import { GamepadManager } from "./Gamepads/GamepadManager.js";
import {
  ControlData,
  ControlInputData,
  ControlInputTypes,
  DefaultGamePadButtons,
  InputModeTypes,
  MouseButtonTypes,
} from "./Types/Control.types";
import { DivineControlEventManager } from "./Events/DivineControlsEventManager.js";
import { DCKeyDownEvent } from "Events/Register/index.js";
import { RecursivePartial } from "@divinestar/utils";

class HoldManager {
  private static _functions = new Map<
    string,
    {
      time: number;
      delay: number;
      activeDelay: number;
      run: Function;
      activeTime: number;
    }
  >();

  static addHold(id: string, run: Function, delay: number, activeDelay = 0) {
    if (this._functions.has(id)) return;
    this._functions.set(id, {
      time: performance.now(),
      delay,
      run,
      activeDelay,
      activeTime: performance.now(),
    });
  }
  static removeHold(id: string) {
    this._functions.delete(id);
  }

  static hasHold(id: string) {
    return this._functions.has(id);
  }

  static run(frameDelta: number) {
    const time = performance.now();
    for (const [key, node] of this._functions) {
      if (node.delay) {
        const activeDelta = time - node.activeTime + frameDelta;
        if (activeDelta < node.delay) {
          continue;
        }
      }
      if (node.activeDelay) {
        const delta = time - node.time + frameDelta;
        if (delta < node.activeDelay) {
          continue;
        }
      }
      node.run();
      node.activeTime = time;
    }
  }
}

export class DivineControls {
  static gamepads = GamepadManager;
  static controls = new ObjectCollection<ControlData>();
  static holds = HoldManager;
  static _os: "widnows" | "linux" | "mac" | "android" | "ios" = "widnows";

  static _mouseInputs = <Record<InputModeTypes, Map<string, ControlData>>>{
    down: new Map(),
    hold: new Map(),
    up: new Map(),
  };

  static _scrollInputs: Record<"up" | "down", ControlData | false> = {
    down: false,
    up: false,
  };

  static _keyboardInputs: Record<InputModeTypes, Map<string, ControlData>> = {
    down: new Map(),
    hold: new Map(),
    up: new Map(),
  };

  static _gamePadInputs: Record<
    InputModeTypes,
    Map<DefaultGamePadButtons, ControlData>
  > = {
    down: new Map(),
    hold: new Map(),
    up: new Map(),
  };
  static _gamePadStickInputs = new Map<"Left" | "Right", ControlData>();

  static _mapMoueButton(input: number): MouseButtonTypes {
    if (input == 0) return "primary";
    if (input == 2) return "secondary";
    return "middle";
  }
  static _mapKey(key: string) {
    return key.length == 1 ? key.toLocaleLowerCase() : key;
  }
  static _heldKesy = new Set();

  static _capturing = false;
  static _capturingMode: "gamepad" | "keyboard" = "gamepad";
  static _capturedData: RecursivePartial<ControlInputData> | null = null;

  private constructor() {}

  static $INIT() {
    if (navigator.userAgent.indexOf("Win") != -1) this._os = "widnows";
    if (navigator.userAgent.indexOf("Mac") != -1) this._os = "mac";
    if (navigator.userAgent.indexOf("Linux") != -1) this._os = "linux";
    if (navigator.userAgent.indexOf("Android") != -1) this._os = "android";
    if (navigator.userAgent.indexOf("like Mac") != -1) this._os = "ios";
    window.addEventListener("gamepadconnected", (e) => {
      const newGamepad = GamepadManager.addGamepad(e);
      newGamepad.observables.buttonPressed.subscribe(
        DivineControls,
        ({ number, key }) => {
          if (this._capturing && this._capturingMode == "gamepad") {
            this._capturedData = {
              "gamepad-button": {
                button: key as any,
              },
            };
            this._capturing = false;
            return;
          }
        }
      );
    });
    window.addEventListener("gamepaddisconnected", (e) => {
      GamepadManager.removeGamepad(e);
    });
    window.addEventListener("mousedown", (event) => {
      const button = this._mapMoueButton(event.button);
      if (this._capturing && this._capturingMode == "keyboard") {
        this._capturedData = {
          mouse: {
            mode: "down",
            button: button,
          },
        };
        this._capturing = false;
        return;
      }

      down: {
        const control = this._mouseInputs["down"].get(button);
        if (control) {
          const dcEvent = DivineControlEventManager.getEvent("mouse-down")!;
          control.action(dcEvent.setData(control));
        }
        break down;
      }
      hold: {
        const control = this._mouseInputs["hold"].get(button);
        if (!control || HoldManager.hasHold(button)) break hold;

        const dcEvent = DivineControlEventManager.getEvent("mouse-hold")!;
        control.action(dcEvent.setData(control));
        HoldManager.addHold(
          button,
          () => control.action(dcEvent.setData(control)),
          control.input.mouse?.holdDelay ? control.input.mouse?.holdDelay : 10,
          control.input.mouse?.initHoldDelay
            ? control.input.mouse?.initHoldDelay
            : 250
        );
      }
    });

    window.addEventListener("mouseup", (event) => {
      const button = this._mapMoueButton(event.button);
      HoldManager.removeHold(button);
      const control = this._mouseInputs["up"].get(button);
      if (!control) return;
      const dcEvent = DivineControlEventManager.getEvent("mouse-up")!;
      control.action(dcEvent.setData(control));
    });

    window.addEventListener("keydown", (event) => {
      const key = this._mapKey(event.key);
      if (this._capturing && this._capturingMode == "keyboard") {
        this._capturedData = {
          keyboard: {
            key: key,
            mode: "down",
          },
        };
        this._capturing = false;
        return;
      }

      down: {
        const control = this._keyboardInputs["down"].get(key);

        if (!control || this._heldKesy.has(key)) break down;
        this._heldKesy.add(key);
        const dcEvent = DivineControlEventManager.getEvent("keyboard-down")!;
        control.action(dcEvent.setData(control));
      }
      hold: {
        const control = this._keyboardInputs["hold"].get(key);
        if (!control || HoldManager.hasHold(key)) break hold;
        const dcEvent = DivineControlEventManager.getEvent("keyboard-hold")!;
        control.action(dcEvent.setData(control));
        HoldManager.addHold(
          key,
          () => control.action(dcEvent.setData(control)),
          control.input.keyboard?.holdDelay
            ? control.input.keyboard?.holdDelay
            : 10,
          control.input.keyboard?.initHoldDelay
            ? control.input.keyboard?.initHoldDelay
            : 250
        );
      }
    });

    window.addEventListener("keyup", (event) => {
      const key = this._mapKey(event.key);
      this._heldKesy.delete(key);
      HoldManager.removeHold(key);
      up: {
        const control = this._keyboardInputs["up"].get(key);
        if (!control) break up;
        const dcEvent = DivineControlEventManager.getEvent("keyboard-up")!;
        control.action(dcEvent.setData(control));
      }
      down: {
        const control = this._keyboardInputs["down"].get(key);
        if (!control) break down;
        const dcEvent = DivineControlEventManager.getEvent(
          "keyboard-down"
        )! as DCKeyDownEvent;
        dcEvent.observers.onRelease.notify();
      }
    });

    window.addEventListener("wheel", (event) => {
      if (event.deltaY < 0) {
        if (this._capturing && this._capturingMode == "keyboard") {
          this._capturedData = {
            scroll: {
              mode: "up",
            },
          };
          this._capturing = false;
          return;
        }
        const control = this._scrollInputs["up"];
        if (!control) return;
        const dcEvent = DivineControlEventManager.getEvent("wheel-up")!;
        control.action(dcEvent.setData(control));
      } else {
        if (this._capturing && this._capturingMode == "keyboard") {
          this._capturedData = {
            scroll: {
              mode: "down",
            },
          };
          this._capturing = false;
          return;
        }
        const control = this._scrollInputs["down"];
        if (!control) return;
        const dcEvent = DivineControlEventManager.getEvent("wheel-down")!;
        control.action(dcEvent.setData(control));
      }
    });
  }

  static registerControlGroups(data: ObjectCollectionGroupData[]) {
    this.controls.addGroups(data);
  }

  static _addControlInput(control: ControlData) {
    for (const type in control.input) {
      if (type == "keyboard") {
        const inputMap = this._keyboardInputs[control.input[type]!.mode];
        inputMap.set(control.input[type]!.key, control);
      }
      if (type == "mouse") {
        const inputMap = this._mouseInputs[control.input[type]!.mode];
        inputMap.set(control.input[type]!.button.toLocaleLowerCase(), control);
      }
      if (type == "scroll") {
        this._scrollInputs[control.input[type]!.mode] = control;
      }
      if (type == "gamepad-button") {
        const inputMap = this._gamePadInputs[control.input[type]!.mode];
        inputMap.set(control.input[type]!.button, control);
      }
      if (type == "gamepad-axes") {
        this._gamePadStickInputs.set(control.input[type]!.stick, control);
      }
    }
  }

  static _removeontrolInput(control: ControlData) {
    for (const type in control.input) {
      if (type == "keyboard") {
        const inputMap = this._keyboardInputs[control.input[type]!.mode];
        inputMap.delete(control.input[type]!.key);
      }
      if (type == "mouse") {
        const inputMap = this._mouseInputs[control.input[type]!.mode];
        inputMap.delete(control.input[type]!.button.toLocaleLowerCase());
      }
      if (type == "scroll") {
        this._scrollInputs[control.input[type]!.mode] = false;
      }
      if (type == "gamepad-button") {
        const inputMap = this._gamePadInputs[control.input[type]!.mode];
        inputMap.delete(control.input[type]!.button);
      }
      if (type == "gamepad-axes") {
        this._gamePadStickInputs.delete(control.input[type]!.stick);
      }
    }
  }

  static registerControls(data: ControlData[]) {
    this.controls.addNodes(data);
    for (const control of data) {
      this._addControlInput(control);
    }
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
    this._removeontrolInput(control);

    for (const type in control.input) {
      //@ts-ignore
      if (!data[type]) continue;
      //@ts-ignore
      control.input[type] = { ...control.input[type], ...data[type] };
    }

    this._addControlInput(control);
  }

  static seralizeInputData(): StoredCollection {
    return this.controls.store();
  }

  static injestInputData(data: [string, ControlInputData][]) {
    this.controls.loadIn(data);
  }

  static update(delta = 0.16) {
    GamepadManager.updateGamepads();
    HoldManager.run(delta);
  }
}
