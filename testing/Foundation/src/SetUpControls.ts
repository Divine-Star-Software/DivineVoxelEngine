import { DCKeyDownEvent } from "@divinestar/controls";
import { DivineControls } from "@divinestar/controls/DivineControls";
export function SetUpControls() {
  DivineControls.registerControlGroups([
    {
      id: "main",
      name: "main",
    },
  ]);
  DivineControls.registerControls([
    {
      id: "test1",
      groupId: "main",
      name: "test 1",
      input: {
        keyboard: {
          key: "ArrowUp",
          mode: "down",
        },
      },
      action: (event) => {
        console.log("Up pressed", event);
        (event as DCKeyDownEvent).observers.onRelease.subscribe("", () => {
          console.log("up released");
        });
      },
    },
    {
      id: "test2",
      groupId: "main",
      name: "test 2",
      input: {
        keyboard: {
          key: "ArrowLeft",
          mode: "down",
        },
      },
      action: (event) => {
        console.log("Left pressed", event);
        (event as DCKeyDownEvent).observers.onRelease.subscribe("", () => {
          console.log("Left released");
        });
      },
    },
  ]);
  DivineControls.init();
}
