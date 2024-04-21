import { DivineControls } from "../DivineControls.js";
import { DefaultGamePadButtons } from "../index.js";
import { DCGamepadAxesMoveEvent } from "../Events/Register/Gamepad/Axes/DCGamepadAxesMoveEvent.js";
import { Observable } from "@divinestar/utils/Observers/Observable.js";
import { DCUser } from "../Users/DCUser.js";
import { ControlsMap } from "../ControlsMap.js";
import { HoldRegister } from "../HoldRegister.js";

export class DivineGamepad {
  static BINDINGS = {
    XBOX360: <DefaultGamePadButtons[]>[
      "A",
      "B",
      "X",
      "Y",
      "LB",
      "RB",
      "Left Trigger",
      "Right Trigger",

      "Back",
      "Start",
      "Left Analog In",
      "Right Analog In",

      "DPad Up",
      "DPad Down",
      "DPad Left",
      "DPad Right",
    ],
  };

  invertYAxis: boolean;

  bindings: DefaultGamePadButtons[];
  pressed: Record<string, number> = {};

  axes: number[];

  observables = {
    buttonPressed: new Observable<{ number: number; key: string }>(),
    buttonReleased: new Observable<{ number: number; key: string }>(),
  };

  constructor(public user: DCUser, public gamepad: Gamepad) {
    for (const button of DivineGamepad.BINDINGS.XBOX360) {
      this.pressed[button] = -1;
    }
    this.bindings = DivineGamepad.BINDINGS.XBOX360;
    if (DivineControls._os == "mac") {
      this.invertYAxis = true;
    }
  }

  _axes1: number[] = [0, 0];
  _axes2: number[] = [0, 0];

  _testAxes(value: number) {
    return (value * 100) >> 0;
  }

  update() {
    const gp = navigator.getGamepads()[this.gamepad.index]!;

    if (this._testAxes(gp.axes[0]) || this._testAxes(gp.axes[1])) {
      const key = ControlsMap.getGamePadAxeusId("Left");
      const control = this.user.getControlByType(key);
      control && control.run(key);
      if (control) {
        const dcEvent = control.getEvent(key) as DCGamepadAxesMoveEvent;
        dcEvent.axes[0] = gp.axes[0];
        dcEvent.axes[1] = gp.axes[1] * (this.invertYAxis ? -1 : 1);
        control.run(key);
      }
    }

    if (this._testAxes(gp.axes[2]) || this._testAxes(gp.axes[3])) {
      const key = ControlsMap.getGamePadAxeusId("Left");
      const control = this.user.getControlByType(key);
      control && control.run(key);
      if (control) {
        const dcEvent = control.getEvent(key) as DCGamepadAxesMoveEvent;
        dcEvent.axes[0] = gp.axes[2];
        dcEvent.axes[1] = gp.axes[3] * (this.invertYAxis ? -1 : 1);
        control.run(key);
      }
    }
    for (let i = 0; i < gp.buttons.length; i++) {
      //   if (!this.bindings[i]) continue;
      const id = `${i}-${this.gamepad.index}`;
      const button = gp.buttons[i];
      const buttonKey = this.bindings[i];
      if (button.pressed) {
        if (this.pressed[buttonKey] < 0) {
          const key = ControlsMap.getGamePadId(buttonKey, "down");
          const control = this.user.getControlByType(key);
          if (control) {
            control.run(key);
          }
          this.observables.buttonPressed.notify({
            number: i,
            key: buttonKey,
          });
          this.pressed[buttonKey] = 1;
        }

        this.pressed[buttonKey]++;

        const key = ControlsMap.getGamePadId(buttonKey, "hold");
        const control = this.user.getControlByType(key);

        if (control) {
          if (!HoldRegister.hasHold(id)) {
            control.run(key);
            const input = control.data.input;
            let delay = input["gamepad-button"]?.holdDelay;
            delay = delay ? delay : 10;
            HoldRegister.addHold(
              id,
              () => {
                control.run(key);
              },
              delay,
              input["gamepad-button"]?.initHoldDelay
                ? input["gamepad-button"]?.initHoldDelay
                : 250
            );
          }
        }
      } else {
        if (this.pressed[buttonKey]) {
          const key = ControlsMap.getGamePadId(buttonKey, "up");
          const control = this.user.getControlByType(key);
          if (control) {
            control.run(key);
          }
        }
        if (HoldRegister.hasHold(id)) {
          HoldRegister.removeHold(id);
        }
        this.pressed[buttonKey] = -1;
        this.observables.buttonReleased.notify({
          number: i,
          key: buttonKey,
        });
      }
    }
  }
}
