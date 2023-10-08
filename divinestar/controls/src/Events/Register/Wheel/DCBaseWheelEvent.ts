import { ControlInputTypes } from "../../../Types/Control.types";
import { ControlEventTypes } from "../../../Types/Event.types";
import { DivineControlEvent } from "../../DivineControlEventBase.js";

export class DCBaseWheelEvent extends DivineControlEvent<"mouse"> {
  readonly eventType: ControlEventTypes = "wheel-up";
  readonly inputType: ControlInputTypes = "mouse";
  constructor() {
    super();
  }
}
