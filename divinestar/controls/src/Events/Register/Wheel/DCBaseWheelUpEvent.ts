import { ControlInputTypes } from "../../../Types/Control.types";
import { ControlEventTypes } from "../../../Types/Event.types";
import { DCBaseWheelEvent } from "./DCBaseWheelEvent.js";

export class DCBaseWheelUpEvent extends DCBaseWheelEvent {
  readonly eventType: ControlEventTypes = "wheel-up";
  readonly inputType: ControlInputTypes = "mouse";
  constructor() {
    super();
  }
}
