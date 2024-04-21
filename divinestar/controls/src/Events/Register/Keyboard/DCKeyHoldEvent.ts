import { ControlEventTypes } from "../../Event.types";
import { DCBaseKeyEvent } from "./DCBaseKeyEvent.js";

export class DCKeyHoldEvent extends DCBaseKeyEvent {
  static eventType = ControlEventTypes.KeyBoardHold;
  readonly eventType = ControlEventTypes.KeyBoardHold;


}
