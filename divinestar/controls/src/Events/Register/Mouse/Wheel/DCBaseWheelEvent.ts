import { ControlInputTypes } from "../../../../Controls/Control.types.js";
import { DivineControlEvent } from "../../../DivineControlEventBase.js";

export abstract class DCBaseWheelEvent extends DivineControlEvent<ControlInputTypes.Scroll> {
  readonly inputType = ControlInputTypes.Scroll;
  getDirection() {
    return this.controler.data.input[ControlInputTypes.Scroll]?.mode;
  }
}
