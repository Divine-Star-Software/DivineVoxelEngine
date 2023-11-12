import { DCEvents } from "Events/DivineControlsEventManager";
import { DivineControlEvent } from "../Events/DivineControlEventBase";

export type InputModeTypes = "down" | "up" | "hold";
export type MouseButtonTypes = "primary" | "secondary" | "middle";
export type ControlInputData = {
  mouse?: {
    mode: InputModeTypes;
    button: MouseButtonTypes;
    initHoldDelay?: number;
    holdDelay?: number;
  };
  scroll?: {
    mode: "up" | "down";
  };
  keyboard?: {
    key: string;
    mode: InputModeTypes;
    initHoldDelay?: number;
    holdDelay?: number;
    shift?: boolean;
    ctrl?: boolean;
    alt?: boolean;
  };
  "gamepad-button"?: {
    mode: InputModeTypes;
    initHoldDelay?: number;
    holdDelay?: number;
    button: DefaultGamePadButtons;
  };
  "gamepad-axes"?: {
    stick: "Left" | "Right";
  };
};
export type ControlInputTypes = keyof ControlInputData;
export type ControlInputDataNode<T extends ControlInputTypes> =
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
