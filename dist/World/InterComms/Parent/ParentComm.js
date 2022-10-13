import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";
const parentComm = ThreadComm.parent;
parentComm.listenForMessage("start", function () {
    DVEW.__serverIsDone = true;
});
parentComm.listenForMessage("re-start", function () { });
parentComm.listenForMessage("sync-settings", (data, event) => {
    if (!event)
        return;
    const settings = data[1];
    DVEW.syncSettings(settings);
});
/* parentComm.listenForMessage("connect-constructor", (data, event) => {
 if (DVEW.environment == "node") {
  const port = data[1];
  DVEW.ccm.addThread(port);
 } else {
  if (!event) return;
  const port = event.ports[0];
  DVEW.ccm.addThread(port);
 }
}); */
parentComm.listenForMessage("connect-data", (data, event) => {
    if (DVEW.environment == "node") {
        const port = data[1];
        DVEW.dataComm.setPort(port);
    }
    else {
        if (!event)
            return;
        const port = event.ports[0];
        DVEW.dataComm.setPort(port);
    }
});
parentComm.listenForMessage("connect-fx", (data, event) => {
    if (DVEW.environment == "node") {
        const port = data[0];
        DVEW.fxComm.setPort(port);
    }
    else {
        if (!event)
            return;
        const port = event.ports[0];
        DVEW.fxComm.setPort(port);
    }
});
parentComm.listenForMessage("connect-rich-world", (data, event) => {
    if (DVEW.environment == "node") {
        const port = data[0];
        DVEW.richWorldComm.setPort(port);
    }
    else {
        if (!event)
            return;
        const port = event.ports[0];
        DVEW.richWorldComm.setPort(port);
    }
});
export const ParentComm = parentComm;
//parentComm.onMessage = (event) => console.log(event.data,event.ports);
