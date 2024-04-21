import { ControlInputTypes } from "../../../../Controls/Control.types.js";
import { DivineControlEvent } from "../../../DivineControlEventBase.js";

export abstract class DCBaseGamepadButtonEvent extends DivineControlEvent<ControlInputTypes.GamePadButton> {
  readonly inputType = ControlInputTypes.GamePadButton;

  getButton() {
    return this.controler.data.input[ControlInputTypes.GamePadButton]?.button;
  }
}
