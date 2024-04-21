import { ControlEventTypes } from "../Events/Event.types";
import {
  DCEvents,
  DivineControlEventManager,
} from "../Events/DivineControlsEventManager";
import {
  ControlData,
  ControlInputData,
  ControlInputTypes,
} from "./Control.types";
import { DivineControlEvent } from "../Events/DivineControlEventBase";
import { DCUser } from "../Users/DCUser";
import { ControlsMap } from "../ControlsMap";

export class DCControl {
  constructor(public user: DCUser, public data: ControlData) {
    this.registerEvents(data.input)
  }
  _events = new Map<string, DivineControlEvent>();

  run(key: string) {
    const event = this.getEvent(key);
    if (!event) return;
    this.data.action(event as DCEvents);
  }

  getEvent(id: string) {
    return this._events.get(id);
  }
  registerEvents(control: ControlInputData) {
    if (control[ControlInputTypes.KeyBoard]) {
      const keyBoardControl = control[ControlInputTypes.KeyBoard];
      const key = ControlsMap.getKeyBaordId(
        ControlsMap.mapKey(keyBoardControl.key),
        keyBoardControl.mode
      );
      keyBoardControl.mode == "down" &&
        this._events.set(
          key,
          new (DivineControlEventManager.getEvent(
            ControlEventTypes.KeyBoardDown
          )!)(this)
        );
      keyBoardControl.mode == "up" &&
        this._events.set(
          key,
          new (DivineControlEventManager.getEvent(
            ControlEventTypes.KeyBoardUp
          )!)(this)
        );
      keyBoardControl.mode == "hold" &&
        this._events.set(
          key,
          new (DivineControlEventManager.getEvent(
            ControlEventTypes.KeyBoardHold
          )!)(this)
        );
    }
    if (control[ControlInputTypes.Mouse]) {
      const mouseControl = control[ControlInputTypes.Mouse];
      const key = ControlsMap.getMouseId(
        mouseControl.button,
        mouseControl.mode
      );
      mouseControl.mode == "down" &&
        this._events.set(
          key,
          new (DivineControlEventManager.getEvent(
            ControlEventTypes.MouseDown
          )!)(this)
        );
      mouseControl.mode == "up" &&
        this._events.set(
          key,
          new (DivineControlEventManager.getEvent(
            ControlEventTypes.MouseHold
          )!)(this)
        );
      mouseControl.mode == "hold" &&
        this._events.set(
          key,
          new (DivineControlEventManager.getEvent(
            ControlEventTypes.MouseHold
          )!)(this)
        );
    }
    if (control[ControlInputTypes.GamePadButton]) {
      const gamePadButtonControl = control[ControlInputTypes.GamePadButton];
      const key = ControlsMap.getGamePadId(
        gamePadButtonControl.button,
        gamePadButtonControl.mode
      );
      gamePadButtonControl.mode == "down" &&
        this._events.set(
          key,
          new (DivineControlEventManager.getEvent(
            ControlEventTypes.GamePadButtonDown
          )!)(this)
        );
      gamePadButtonControl.mode == "up" &&
        this._events.set(
          key,
          new (DivineControlEventManager.getEvent(
            ControlEventTypes.GamePadButtonUp
          )!)(this)
        );
      gamePadButtonControl.mode == "hold" &&
        this._events.set(
          key,
          new (DivineControlEventManager.getEvent(
            ControlEventTypes.GamePadButtonHold
          )!)(this)
        );
    }
    if (control[ControlInputTypes.GamePadAxes]) {
      const gamePadButtonControl = control[ControlInputTypes.GamePadAxes];
      const key = ControlsMap.getGamePadAxeusId(
        gamePadButtonControl.stick
      );

      this._events.set(
        key,
        new (DivineControlEventManager.getEvent(
          ControlEventTypes.GamePadAxesMove
        )!)(this)
      );
    }
    if (control[ControlInputTypes.Scroll]) {
      const scrollControl = control[ControlInputTypes.Scroll];
      const key = ControlsMap.getGamePadAxeusId(
        scrollControl.mode
      );
      scrollControl.mode == "up" &&
        this._events.set(
          key,
          new (DivineControlEventManager.getEvent(ControlEventTypes.WheelUp)!)(
            this
          )
        );
      scrollControl.mode == "down" &&
        this._events.set(
          key,
          new (DivineControlEventManager.getEvent(
            ControlEventTypes.WheelDown
          )!)(this)
        );
    }
  }
}
