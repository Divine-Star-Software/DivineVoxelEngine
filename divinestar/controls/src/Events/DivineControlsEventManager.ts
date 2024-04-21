import { InputModeTypes } from "Controls/Control.types.js";
import { ControlEventTypes } from "./Event.types.js";
import { DivineControlEventConstructor } from "./DivineControlEventBase.js";
import {
  DCWheelDownEvent,
  DCWheelUpEvent,
  DCGamepadDownEvent,
  DCGamepadUpEvent,
  DCKeyUpEvent,
  DCKeyDownEvent,
  DCMouseDownEvent,
  DCMouseUpEvent,
  DCGamepadAxesMoveEvent,
  DCMouseHoldEvent,
  DCGamepadButtonHoldEvent,
  DCKeyHoldEvent,
} from "./Register/index.js";

export class DivineControlEventManager {
  private static _events = new Map<string, DivineControlEventConstructor>();

  static registerEvents(event: DivineControlEventConstructor[]) {
    event.forEach((event) => this._events.set(event.eventType, event));
  }
  static getEvent(id: ControlEventTypes) {
    return this._events.get(id)!;
  }


}

export type DCEvents =
  | DCWheelDownEvent
  | DCWheelUpEvent
  | DCGamepadDownEvent
  | DCGamepadUpEvent
  | DCKeyUpEvent
  | DCKeyDownEvent
  | DCMouseDownEvent
  | DCMouseUpEvent
  | DCGamepadAxesMoveEvent
  | DCMouseHoldEvent
  | DCGamepadButtonHoldEvent
  | DCKeyHoldEvent;

DivineControlEventManager.registerEvents([
  //mouse
  DCMouseDownEvent,
  DCMouseUpEvent,
  DCMouseHoldEvent,
  //gamepad button
  DCGamepadDownEvent,
  DCGamepadUpEvent,
  DCGamepadButtonHoldEvent,
  //game axes
  DCGamepadAxesMoveEvent,
  //keyabord
  DCKeyUpEvent,
  DCKeyDownEvent,
  DCKeyHoldEvent,
  //wheel
  DCWheelDownEvent,
  DCWheelUpEvent,
]);
