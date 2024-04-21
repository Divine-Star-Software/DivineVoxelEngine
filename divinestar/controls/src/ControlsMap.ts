import { InputModeTypes, MouseButtonTypes } from "./Controls/Control.types";

export class ControlsMap {
  static mapMoueButton(input: number): MouseButtonTypes {
    if (input == 0) return "primary";
    if (input == 2) return "secondary";
    return "middle";
  }
  static mapKey(key: string) {
    return key.length == 1 ? key.toLocaleLowerCase() : key;
  }
  static getKeyBaordId = (key: string, mode: InputModeTypes) => {
    return `keyboard-${key}-${mode}`;
  };
  static getGamePadId = (button: string, mode: InputModeTypes) => {
    return `gamepad-${button}-${mode}`;
  };
  static getGamePadAxeusId = (stic: string) => {
    return `gamepad-axes-${stic}`;
  };
  static getMouseId = (button: string, mode: InputModeTypes) => {
    return `mouse-${button}-${mode}`;
  };
  static getScrollId = (mode: string) => {
    return `scroll-${mode}`;
  };
}
