import { ControlInputTypes } from "../../../../Types/Control.types";
import { ControlEventTypes } from "../../../../Types/Event.types";
import { DCBaseGamepadAxesEvent } from "./DCBaseGamepadAxesEvent.js";

export class DCGamepadAxesMoveEvent extends DCBaseGamepadAxesEvent {
  readonly eventType: ControlEventTypes = "gamepad-axes-move";
  readonly inputType: ControlInputTypes = "gamepad-axes";
  constructor() {
    super();
  }
}
