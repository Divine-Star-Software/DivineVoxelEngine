import { ControlEventTypes } from "../../Event.types";
import { DCBaseMouseEvent } from "./DCBaseMouseEvent.js";

export class DCMouseUpEvent extends DCBaseMouseEvent {
  static eventType = ControlEventTypes.MouseUp;
  readonly eventType = ControlEventTypes.MouseUp;
}