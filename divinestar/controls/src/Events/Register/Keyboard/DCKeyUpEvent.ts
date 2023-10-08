import { ControlInputTypes } from "../../../Types/Control.types";
import { ControlEventTypes } from "../../../Types/Event.types";
import { DCBaseKeyEvent } from "./DCBaseKeyEvent.js";

export class DCKeyDownEvent extends DCBaseKeyEvent {
  readonly eventType: ControlEventTypes = "keyboard-up";
  readonly inputType: ControlInputTypes = "keyboard";
  constructor() {
    super();
  }
}
