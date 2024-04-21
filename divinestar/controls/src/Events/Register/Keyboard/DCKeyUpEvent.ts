import { ControlEventTypes } from "../../Event.types";
import { DCBaseKeyEvent } from "./DCBaseKeyEvent.js";

export class DCKeyUpEvent extends DCBaseKeyEvent {
  static eventType = ControlEventTypes.KeyBoardUp;
  readonly eventType = ControlEventTypes.KeyBoardUp;
}
