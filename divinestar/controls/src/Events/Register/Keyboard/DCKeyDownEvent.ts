import { ControlInputTypes } from "../../../Types/Control.types";
import { ControlEventTypes } from "../../../Types/Event.types";
import { DCBaseKeyEvent } from "./DCBaseKeyEvent.js";

export class DCKeyUpEvent extends DCBaseKeyEvent {
  readonly eventType: ControlEventTypes = "keyboard-down";
  readonly inputType: ControlInputTypes = "keyboard";
  constructor() {
    super();
  }

}
