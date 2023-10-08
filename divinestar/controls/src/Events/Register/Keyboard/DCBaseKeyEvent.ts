import { ControlInputTypes } from "../../../Types/Control.types";
import { ControlEventTypes } from "../../../Types/Event.types";
import { DivineControlEvent } from "../../DivineControlEventBase.js";

export class DCBaseKeyEvent extends DivineControlEvent<"keyboard"> {
  readonly eventType: ControlEventTypes = "keyboard-down";
  readonly inputType: ControlInputTypes = "keyboard";
  constructor() {
    super();
  }

  getKey() {
    return this.getData()!.key;
  }
  
}
