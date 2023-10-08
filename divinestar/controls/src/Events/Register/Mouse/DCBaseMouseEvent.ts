import { ControlInputTypes } from "../../../Types/Control.types";
import { ControlEventTypes } from "../../../Types/Event.types";
import { DivineControlEvent } from "../../DivineControlEventBase.js";

export class DCBaseMouseEvent extends DivineControlEvent<"mouse"> {
  readonly eventType: ControlEventTypes = "mouse-down";
  readonly inputType: ControlInputTypes = "mouse";
  constructor() {
    super();
  }
  getButton() {
    return this.getData()!.button;
  }
}
