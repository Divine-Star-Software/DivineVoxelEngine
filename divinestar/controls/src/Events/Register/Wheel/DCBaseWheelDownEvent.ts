import { ControlInputTypes } from "../../../Types/Control.types";
import { ControlEventTypes } from "../../../Types/Event.types";
import { DCBaseWheelEvent } from "./DCBaseWheelEvent.js";

export class DCBaseWheelDownEvent extends DCBaseWheelEvent {
  readonly eventType: ControlEventTypes = "wheel-down";
  readonly inputType: ControlInputTypes = "mouse";
  constructor() {
    super();
  }
}
