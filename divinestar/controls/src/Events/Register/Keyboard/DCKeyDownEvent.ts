import { ControlInputTypes } from "../../../Types/Control.types";
import { ControlEventTypes } from "../../../Types/Event.types";
import { DCBaseKeyEvent } from "./DCBaseKeyEvent.js";
import { Observable } from "@divinestar/utils/Observers/Observable";
export class DCKeyDownEvent extends DCBaseKeyEvent {
  readonly eventType: ControlEventTypes = "keyboard-down";
  readonly inputType: ControlInputTypes = "keyboard";

  observers = {
    onRelease: new Observable<void>(),
  };
  constructor() {
    super();
  }
}
