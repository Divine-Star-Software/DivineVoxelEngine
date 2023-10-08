import { DivineGamepad } from "./DivineGamepad.js";

export class GamepadManager {
  static _gamepads = new Map<number, DivineGamepad>();

  static addGamepad(event: GamepadEvent) {
    this._gamepads.set(event.gamepad.index, new DivineGamepad(event.gamepad));
  }
  static removeGamepad(event: GamepadEvent) {
    this._gamepads.delete(event.gamepad.index);
  }
  static updateGamepads() {
    for (const [index, gamepad] of this._gamepads) {
      gamepad.update();
    }
  }
}
