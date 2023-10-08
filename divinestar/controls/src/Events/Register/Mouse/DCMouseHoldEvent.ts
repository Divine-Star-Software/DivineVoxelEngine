import { ControlInputTypes } from "../../../Types/Control.types";
import { ControlEventTypes } from "../../../Types/Event.types";
import { DCBaseMouseEvent } from "./DCBaseMouseEvent.js";

export class DCMouseHoldEvent extends DCBaseMouseEvent {
  readonly eventType: ControlEventTypes = "mouse-hold";
  readonly inputType: ControlInputTypes = "mouse";
  constructor() {
    super();
  }
}
