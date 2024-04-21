import { ControlEventTypes } from "../../../Event.types";
import { DCBaseWheelEvent } from "./DCBaseWheelEvent.js";

export class DCWheelUpEvent extends DCBaseWheelEvent {
  static eventType = ControlEventTypes.WheelUp;
  readonly eventType = ControlEventTypes.WheelUp;
}
