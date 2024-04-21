import { DCEvents } from "Events/DivineControlsEventManager";

export enum ControlInputTypes {
  Mouse = "mouse",
  Scroll = "scroll",
  KeyBoard = "keyboard",
  GamePadButton = "gamepad-button",
  GamePadAxes = "gamepad-axes",
}

export type InputModeTypes = "down" | "up" | "hold";
export type MouseButtonTypes = "primary" | "secondary" | "middle";
export type ControlInputData = {
  [ControlInputTypes.Mouse]?: {
    mode: InputModeTypes;
    button: MouseButtonTypes;
    initHoldDelay?: number;
    holdDelay?: number;
  };
  [ControlInputTypes.Scroll]?: {
    mode: "up" | "down";
  };
  [ControlInputTypes.KeyBoard]?: {
    key: string;
    mode: InputModeTypes;
    initHoldDelay?: number;
    holdDelay?: number;
    shift?: boolean;
    ctrl?: boolean;
    alt?: boolean;
  };
  [ControlInputTypes.GamePadButton]?: {
    mode: InputModeTypes;
    initHoldDelay?: number;
    holdDelay?: number;
    button: DefaultGamePadButtons;
  };
  [ControlInputTypes.GamePadAxes]?: {
    stick: "Left" | "Right";
  };
};
type ControlInputKeys = keyof ControlInputData;
export type ControlInputDataNode<T extends ControlInputKeys> =
  ControlInputData[T];
export type ControlData = {
  id: string;
  groupId: string;
  name: string;
  input: ControlInputData;
  action: (event: DCEvents) => void;
};

export type ControlGroupData = {
  id: string;
  name: string;
};

export type DefaultGamePadButtons =
  | "A"
  | "B"
  | "X"
  | "Y"
  | "LB"
  | "RB"
  | "Left Trigger"
  | "Right Trigger"
  | "Back"
  | "Start"
  | "Left Analog In"
  | "Right Analog In"
  | "DPad Up"
  | "DPad Down"
  | "DPad Left"
  | "DPad Right";
