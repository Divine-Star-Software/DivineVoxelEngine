import { ControlInputTypes } from "../../../../Types/Control.types";
import { ControlEventTypes } from "../../../../Types/Event.types";
import { DCBaseGamepadButtonEvent } from "./DCBaseGamepadButtonEvent.js";

export class DCGamepadButtonHoldEvent extends DCBaseGamepadButtonEvent {
  readonly eventType: ControlEventTypes = "gamepad-botton-hold";
  readonly inputType: ControlInputTypes = "gamepad-button";
  constructor() {
    super();
  }
}

