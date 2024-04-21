import { ControlEventTypes } from "../../Event.types";
import { DCBaseKeyEvent } from "./DCBaseKeyEvent.js";
import { Observable } from "@divinestar/utils/Observers/Observable";
export class DCKeyDownEvent extends DCBaseKeyEvent {
  static eventType = ControlEventTypes.KeyBoardDown;
  readonly eventType = ControlEventTypes.KeyBoardDown;

  observers = {
    onRelease: new Observable<void>(),
  };

}
