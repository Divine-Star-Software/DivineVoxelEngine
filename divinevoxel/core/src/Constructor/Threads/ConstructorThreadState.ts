import { Builder } from "../Builder/Builder.js";
import { DataSyncNode } from "../../Data/DataSyncNode.js";
import { Util } from "../../Global/Util.helper.js";
import { WorldComm } from "./ConstrcutorTheads.js";
export const ConstructorThreadState = {
 _settingsSynced: false,
 environment: Util.getEnviorment(),
 isReady() {
  if (this.environment == "node") {
   return WorldComm.isPortSet() && this._settingsSynced;
  } else {

   return (
    WorldComm.isPortSet() &&
    this._settingsSynced
   );
  }
 },
};
