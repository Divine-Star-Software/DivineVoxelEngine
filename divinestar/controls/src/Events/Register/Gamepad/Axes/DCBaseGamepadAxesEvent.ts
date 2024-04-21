import { ControlInputTypes } from "../../../../Controls/Control.types.js";
import { DivineControlEvent } from "../../../DivineControlEventBase.js";

export abstract class DCBaseGamepadAxesEvent extends DivineControlEvent<ControlInputTypes.GamePadAxes> {
  axes: [x: number, y: number] = [0, 0];
  readonly inputType = ControlInputTypes.GamePadAxes;

  getStick() {
    return this.controler.data.input[ControlInputTypes.GamePadAxes]?.stick;
  }
}
