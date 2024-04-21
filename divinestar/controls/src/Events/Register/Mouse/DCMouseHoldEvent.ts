import { ControlEventTypes } from "../../Event.types";
import { DCBaseMouseEvent } from "./DCBaseMouseEvent.js";

export class DCMouseHoldEvent extends DCBaseMouseEvent {
  static eventType = ControlEventTypes.MouseHold;
  readonly eventType = ControlEventTypes.MouseHold;
}
