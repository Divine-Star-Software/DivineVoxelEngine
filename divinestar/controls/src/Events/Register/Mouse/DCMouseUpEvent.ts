import { ControlInputTypes } from "../../../Types/Control.types";
import { ControlEventTypes } from "../../../Types/Event.types";
import { DCBaseMouseEvent } from "./DCBaseMouseEvent.js";

export class DCMouseUpEvent extends DCBaseMouseEvent {
  readonly eventType: ControlEventTypes = "mouse-up";
  readonly inputType: ControlInputTypes = "mouse";
  constructor() {
    super();
  }
}
