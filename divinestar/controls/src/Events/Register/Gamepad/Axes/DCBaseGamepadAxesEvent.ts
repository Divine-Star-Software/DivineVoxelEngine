import { ControlInputTypes } from "../../../../Types/Control.types";
import { ControlEventTypes } from "../../../../Types/Event.types";
import { DivineControlEvent } from "../../../DivineControlEventBase.js";

export class DCBaseGamepadAxesEvent extends DivineControlEvent<"gamepad-axes"> {
  readonly eventType: ControlEventTypes = "gamepad-axes-move";
  readonly inputType: ControlInputTypes = "gamepad-axes";
  axes : [x : number, y : number] = [0,0];
  
  constructor() {
    super();
  }

  getStick() {
    return this.getData()!.stick;
  }
}
