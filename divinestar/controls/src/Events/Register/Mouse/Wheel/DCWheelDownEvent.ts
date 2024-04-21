import { ControlInputTypes } from "../../../../Controls/Control.types";
import { ControlEventTypes } from "../../../Event.types";
import { DCBaseWheelEvent } from "./DCBaseWheelEvent.js";

export class DCWheelDownEvent extends DCBaseWheelEvent {
  static eventType = ControlEventTypes.WheelDown;
  readonly eventType = ControlEventTypes.WheelDown;
}
