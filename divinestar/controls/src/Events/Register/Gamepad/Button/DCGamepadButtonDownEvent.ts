import { ControlEventTypes } from "../../../Event.types";
import { DCBaseGamepadButtonEvent } from "./DCBaseGamepadButtonEvent.js";

export class DCGamepadDownEvent extends DCBaseGamepadButtonEvent {
  static eventType = ControlEventTypes.GamePadButtonDown;
  readonly eventType = ControlEventTypes.GamePadButtonDown;
}
