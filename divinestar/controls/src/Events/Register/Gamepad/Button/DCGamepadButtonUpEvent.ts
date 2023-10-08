import { ControlInputTypes } from "../../../../Types/Control.types";
import { ControlEventTypes } from "../../../../Types/Event.types";
import { DCBaseGamepadButtonEvent } from "./DCBaseGamepadButtonEvent.js";

export class DCGamepadUpEvent extends DCBaseGamepadButtonEvent {
  readonly eventType: ControlEventTypes = "gamepad-botton-up";
  readonly inputType: ControlInputTypes = "gamepad-button";
  constructor() {
    super();
  }
}
