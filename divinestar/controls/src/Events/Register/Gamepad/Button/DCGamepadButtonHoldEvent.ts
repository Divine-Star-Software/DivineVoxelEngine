import { ControlEventTypes } from "../../../Event.types";
import { DCBaseGamepadButtonEvent } from "./DCBaseGamepadButtonEvent.js";

export class DCGamepadButtonHoldEvent extends DCBaseGamepadButtonEvent {
  static eventType = ControlEventTypes.GamePadButtonHold;
  readonly eventType = ControlEventTypes.GamePadButtonHold;
}
