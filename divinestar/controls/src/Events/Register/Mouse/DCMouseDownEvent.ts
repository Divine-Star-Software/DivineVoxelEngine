import { ControlEventTypes } from "../../Event.types";
import { DCBaseMouseEvent } from "./DCBaseMouseEvent.js";

export class DCMouseDownEvent extends DCBaseMouseEvent {
  static eventType = ControlEventTypes.MouseDown;
  readonly eventType = ControlEventTypes.MouseDown;
}
