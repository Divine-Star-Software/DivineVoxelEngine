import { ControlInputTypes } from "../../../Types/Control.types";
import { ControlEventTypes } from "../../../Types/Event.types";
import { DCBaseKeyEvent } from "./DCBaseKeyEvent.js";

export class DCKeyHoldEvent extends DCBaseKeyEvent {
  readonly eventType: ControlEventTypes = "keyboard-hold";
  readonly inputType: ControlInputTypes = "keyboard";
  constructor() {
    super();
  }

}
