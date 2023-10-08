import { ControlInputTypes } from "../../../../Types/Control.types";
import { ControlEventTypes } from "../../../../Types/Event.types";
import { DivineControlEvent } from "../../../DivineControlEventBase.js";

export class DCBaseGamepadButtonEvent extends DivineControlEvent<"gamepad-button"> {
  readonly eventType: ControlEventTypes = "gamepad-botton-down";
  readonly inputType: ControlInputTypes = "gamepad-button";
  constructor() {
    super();
  }

  getButton() {
    return this.getData()!.button;
  }
}
