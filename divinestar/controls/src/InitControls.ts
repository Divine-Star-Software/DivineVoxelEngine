import { GamepadManager } from "./Gamepads/GamepadManager";
import { DCUserManager } from "./Users/DCUserManager";
import { DivineControls } from "./DivineControls";
import { HoldRegister } from "./HoldRegister";
import { DCKeyDownEvent } from "./Events/Register";
import { ControlsMap } from "./ControlsMap";

export default function (controls: typeof DivineControls) {
  const user = DCUserManager.addUser(0);
  controls.mainUser = user;
  const heldKeys = new Set();
  const gamePadConnectionListener = (e: GamepadEvent) => {
    const newGamepad = GamepadManager.addGamepad(e);
    newGamepad.observables.buttonPressed.subscribe(
      DivineControls,
      ({ number, key }) => {
        if (controls._capturing && controls._capturingMode == "gamepad") {
          controls._capturedData = {
            "gamepad-button": {
              button: key as any,
            },
          };
          controls._capturing = false;
          return;
        }
      }
    );
  };

  const gamePaddisconnectListener = (e: GamepadEvent) =>
    GamepadManager.removeGamepad(e);

  const mouseDownListener = (event: MouseEvent) => {
    const button = ControlsMap.mapMoueButton(event.button);
    console.log("mouse down listener",button)
    if (controls._capturing && controls._capturingMode == "keyboard") {
      controls._capturedData = {
        mouse: {
          mode: "down",
          button: button,
        },
      };
      controls._capturing = false;
      return;
    }

    down: {
      const key = ControlsMap.getMouseId(button, "down");
      const control = user.getControlByType(key);
      control && control.run(key);
      break down;
    }
    hold: {
      const key = ControlsMap.getMouseId(button, "hold");
      const control = user.getControlByType(key);
      if (!control || HoldRegister.hasHold(button)) break hold;
      control.run(key);
      const input = control.data.input;
      HoldRegister.addHold(
        button,
        () => control.run(key),
        input.mouse?.holdDelay ? input.mouse?.holdDelay : 10,
        input.mouse?.initHoldDelay ? input.mouse?.initHoldDelay : 250
      );
    }
  };

  const mouseUp = (event: MouseEvent) => {
    const button = ControlsMap.mapMoueButton(event.button);
    HoldRegister.removeHold(button);
    const key = ControlsMap.getMouseId(button, "up");
    const control = user.getControlByType(key);
    control && control.run(key);
  };

  const keyDownListener = (event: KeyboardEvent) => {
    const keyBoardKey = ControlsMap.mapKey(event.key);

    if (controls._capturing && controls._capturingMode == "keyboard") {
      controls._capturedData = {
        keyboard: {
          key: keyBoardKey,
          mode: "down",
        },
      };
      controls._capturing = false;
      return;
    }

    down: {
      const key = ControlsMap.getKeyBaordId(keyBoardKey, "down");
      const control = user.getControlByType(key);
      if (!control || heldKeys.has(keyBoardKey)) break down;
      control.run(key);
    }
    hold: {
      const key = ControlsMap.getKeyBaordId(keyBoardKey, "hold");
      const control = user.getControlByType(key);
      if (!control || HoldRegister.hasHold(keyBoardKey)) break hold;
      control.run(key);
      const input = control.data.input;
      HoldRegister.addHold(
        keyBoardKey,
        () => control.run(key),
        input.keyboard?.holdDelay ? input.keyboard?.holdDelay : 10,
        input.keyboard?.initHoldDelay ? input.keyboard?.initHoldDelay : 250
      );
    }
    heldKeys.add(keyBoardKey);
  };

  const keyUpListener = (event: KeyboardEvent) => {
    const keyBoardKey = ControlsMap.mapKey(event.key);
    heldKeys.delete(keyBoardKey);
    HoldRegister.removeHold(keyBoardKey);
    up: {
      const key = ControlsMap.getKeyBaordId(keyBoardKey, "up");
      const control = user.getControlByType(key);
      control && control.run(key);
    }
    down: {
      const key = ControlsMap.getKeyBaordId(keyBoardKey, "down");
      const control = user.getControlByType(key);
      const event = control?.getEvent(key);
      if (event instanceof DCKeyDownEvent) {
        event.observers.onRelease.notify();
      }
    }
  };

  const wheelListener = (event: WheelEvent) => {
    if (event.deltaY < 0) {
      if (controls._capturing && controls._capturingMode == "keyboard") {
        controls._capturedData = {
          scroll: {
            mode: "up",
          },
        };
        controls._capturing = false;
        return;
      }
      const key = ControlsMap.getScrollId("up");
      const control = user.getControlByType(key);
      control && control.run(key);
    } else {
      if (controls._capturing && controls._capturingMode == "keyboard") {
        controls._capturedData = {
          scroll: {
            mode: "down",
          },
        };
        controls._capturing = false;
        return;
      }
      const key = ControlsMap.getScrollId("down");
      const control = user.getControlByType(key);
      control && control.run(key);
    }
  };

  const addListeners = () => {
    window.addEventListener("gamepadconnected", gamePadConnectionListener);
    window.addEventListener("gamepaddisconnected", gamePaddisconnectListener);
    window.addEventListener("mousedown", mouseDownListener);
    window.addEventListener("mouseup", mouseUp);
    window.addEventListener("wheel", wheelListener);
    window.addEventListener("keydown", keyDownListener);
    window.addEventListener("keyup", keyUpListener);
  };
  const removeListeners = () => {
    window.removeEventListener("gamepadconnected", gamePadConnectionListener);
    window.removeEventListener(
      "gamepaddisconnected",
      gamePaddisconnectListener
    );
    window.removeEventListener("mousedown", mouseDownListener);
    window.removeEventListener("mouseup", mouseUp);
    window.removeEventListener("wheel", wheelListener);
    window.removeEventListener("keydown", keyDownListener);
    window.removeEventListener("keyup", keyUpListener);
  };

  addListeners();

  return {
    addListeners,
    removeListeners,
  };
}
