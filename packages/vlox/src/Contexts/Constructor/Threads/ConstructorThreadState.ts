import { Environment } from "@amodx/core/Environment/Environment.js";
import { ConstructorThreadManager } from "./ConstrcutorTheads";
import { ThreadState } from "../../../Interfaces/Classes/ThreadState";

export class ConstructorThreadState extends ThreadState {
  environment = Environment.nodeJS.isNode ? "node" : "brwoser";

  isReady() {

    if (this.environment == "node") {
      return (
        ConstructorThreadManager.instnace.world.isPortSet() &&
        this.settingsSynced
      );
    } else {
      return (
        ConstructorThreadManager.instnace.world.isPortSet() &&
        this.settingsSynced
      );
    }
  }
}
