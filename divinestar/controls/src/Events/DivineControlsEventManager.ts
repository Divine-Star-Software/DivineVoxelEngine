import { ControlEventTypes } from "../Types/Event.types.js";
import { DivineControlEvent } from "./DivineControlEventBase.js";
import {
  DCBaseWheelDownEvent,
  DCBaseWheelUpEvent,
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
  private static _events = new Map<string, DivineControlEvent<any>>();

  static registerEvents(event: DivineControlEvent<any>[]) {
    event.forEach((event) => this._events.set(event.eventType, event));
  }
  static getEvent(id: ControlEventTypes) {
    return this._events.get(id)!;
  }
}

export type DCEvents =
  | DCBaseWheelDownEvent
  | DCBaseWheelUpEvent
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
  new DCMouseDownEvent(),
  new DCMouseUpEvent(),
  new DCMouseHoldEvent(),
  //gamepad button
  new DCGamepadDownEvent(),
  new DCGamepadUpEvent(),
  new DCGamepadButtonHoldEvent(),
  //game axes
  new DCGamepadAxesMoveEvent(),
  //keyabord
  new DCKeyUpEvent(),
  new DCKeyDownEvent(),
  new DCKeyHoldEvent(),
  //wheel
  new DCBaseWheelDownEvent(),
  new DCBaseWheelUpEvent(),
]);
