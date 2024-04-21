import { ControlEventTypes } from "../../../Event.types";
import { DCBaseGamepadButtonEvent } from "./DCBaseGamepadButtonEvent.js";
export class DCGamepadUpEvent extends DCBaseGamepadButtonEvent {
  static eventType = ControlEventTypes.GamePadButtonUp;
  readonly eventType = ControlEventTypes.GamePadButtonHold;
}
