import { Observable } from "@divinestar/utils/Observers/Observable.js";
import { DivineGamepad } from "./DivineGamepad.js";
import { DCUserManager } from "../Users/DCUserManager.js";

export class GamepadManager {
  static _gamepads = new Map<number, DivineGamepad>();

  static observers = {
    gamepadAdded: new Observable<DivineGamepad>(),
    gamepadRemoved: new Observable<DivineGamepad>(),
  };

  static addGamepad(event: GamepadEvent) {
    const user = DCUserManager.addUser(event.gamepad.index);
    const newGamePad = new DivineGamepad(user, event.gamepad);
    this._gamepads.set(event.gamepad.index, newGamePad);
    this.observers.gamepadAdded.notify(newGamePad);
    return newGamePad;
  }
  static removeGamepad(event: GamepadEvent) {
    if (!this._gamepads.has(event.gamepad.index)) return;
    this.observers.gamepadRemoved.notify(
      this._gamepads.get(event.gamepad.index)!
    );
    this._gamepads.delete(event.gamepad.index);
  }
  static updateGamepads() {
    for (const [index, gamepad] of this._gamepads) {
      gamepad.update();
    }
  }
}
