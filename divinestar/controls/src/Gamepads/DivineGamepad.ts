import { DivineControlEventManager } from "../Events/DivineControlsEventManager.js";
import { DivineControls } from "../DivineControls.js";
import { DefaultGamePadButtons } from "index";
import { DCGamepadAxesMoveEvent } from "Events/Register/Gamepad/Axes/DCGamepadAxesMoveEvent.js";

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

  constructor(public gamepad: Gamepad) {
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

  update(animationRatio = 1) {
    const gp = navigator.getGamepads()[this.gamepad.index]!;

    if (this._testAxes(gp.axes[0]) || this._testAxes(gp.axes[1])) {
      const control = DivineControls._gamePadStickInputs.get("Left");
      if (control) {
        const dcEvent = <DCGamepadAxesMoveEvent>(
          DivineControlEventManager.getEvent("gamepad-axes-move")!
        );
        dcEvent.axes[0] = gp.axes[0];
        dcEvent.axes[1] = gp.axes[1] * (this.invertYAxis ? -1 : 1);

        control.action(dcEvent.setData(control.input["gamepad-axes"]));
      }
    }

    if (this._testAxes(gp.axes[2]) || this._testAxes(gp.axes[3])) {
      const control = DivineControls._gamePadStickInputs.get("Right");
      if (control) {
        const dcEvent = <DCGamepadAxesMoveEvent>(
          DivineControlEventManager.getEvent("gamepad-axes-move")!
        );
        dcEvent.axes[0] = gp.axes[2];
        dcEvent.axes[1] = gp.axes[3] * (this.invertYAxis ? -1 : 1);

        control.action(dcEvent.setData(control.input["gamepad-axes"]));
      }
    }
    for (let i = 0; i < gp.buttons.length; i++) {
      //   if (!this.bindings[i]) continue;
      const id = `${i}-${this.gamepad.index}`;
      const button = gp.buttons[i];
      if (button.pressed) {
        if (this.pressed[this.bindings[i]] < 0) {
          const control = DivineControls._gamePadInputs.down.get(
            this.bindings[i]
          );
          if (control) {
            const dcEvent = DivineControlEventManager.getEvent(
              "gamepad-botton-down"
            )!;
            control.action(dcEvent.setData(control));
          }
          this.pressed[this.bindings[i]] = 1;
        }

        this.pressed[this.bindings[i]]++;

        const control = DivineControls._gamePadInputs.hold.get(
          this.bindings[i]
        );

        if (control) {
          const dcEvent = DivineControlEventManager.getEvent(
            "gamepad-botton-down"
          )!;
          if (!DivineControls.holds.hasHold(id)) {
            control.action(dcEvent.setData(control));
            let delay = control.input["gamepad-button"]?.holdDelay;
            delay = delay ? delay : 10;
            DivineControls.holds.addHold(
              id,
              () => {
                control.action(dcEvent.setData(control));
              },
              delay,
              control.input["gamepad-button"]?.initHoldDelay
                ? control.input["gamepad-button"]?.initHoldDelay
                : 250
            );
          }
        }
      } else {
        if (this.pressed[this.bindings[i]]) {
          const control = DivineControls._gamePadInputs.up.get(
            this.bindings[i]
          );
          if (control) {
            const dcEvent =
              DivineControlEventManager.getEvent("gamepad-botton-up")!;
            control.action(dcEvent.setData(control));
          }
        }
        if (DivineControls.holds.hasHold(id)) {
          DivineControls.holds.removeHold(id);
        }
        this.pressed[this.bindings[i]] = -1;
      }
    }
  }
}
