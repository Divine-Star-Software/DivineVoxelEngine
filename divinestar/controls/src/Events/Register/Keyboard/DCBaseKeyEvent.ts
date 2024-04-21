import { ControlInputTypes } from "../../../Controls/Control.types.js";
import { DivineControlEvent } from "../../DivineControlEventBase.js";

export abstract class DCBaseKeyEvent extends DivineControlEvent<ControlInputTypes.KeyBoard> {
  readonly inputType = ControlInputTypes.KeyBoard;
  getKey() {
    return this.controler.data.input[ControlInputTypes.KeyBoard]?.key;
  }
}
