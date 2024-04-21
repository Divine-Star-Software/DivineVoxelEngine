import { DivineControlEventManager } from "../../../DivineControlsEventManager";
import { ControlEventTypes } from "../../../Event.types";
import { DCBaseGamepadAxesEvent } from "./DCBaseGamepadAxesEvent.js";
import { ControlInputTypes } from "Controls/Control.types";

export class DCGamepadAxesMoveEvent extends DCBaseGamepadAxesEvent {
  static eventType = ControlEventTypes.GamePadAxesMove;
  readonly eventType = ControlEventTypes.GamePadAxesMove;


}
