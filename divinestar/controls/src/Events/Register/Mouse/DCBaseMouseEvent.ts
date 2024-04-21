import { ControlInputTypes } from "../../../Controls/Control.types.js";
import { DivineControlEvent } from "../../DivineControlEventBase.js";
export abstract class DCBaseMouseEvent extends DivineControlEvent<ControlInputTypes.Mouse> {
  readonly inputType = ControlInputTypes.Mouse;
  getButton() {
    return this.controler.data.input[ControlInputTypes.Mouse]?.button;
  }
}
