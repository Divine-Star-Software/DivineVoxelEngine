import { CreateInterComm } from "../../../Comms/InterComm.js";
import {DVEB} from "../../DivineVoxelEngineBuilder.js";
const renderCommBase = {
    onReady :()=>{},
    onRestart :()=>{},
}
const renderComm = CreateInterComm("builder-render",renderCommBase);
export const RenderComm = renderComm;
renderComm.messageFunctions = {



    "connect-world" : (data,event) => {
        if(!event)return;
        const port = event.ports[0];
       DVEB.worldComm.setPort(port);

    },
    "re-start" : (data,event) => {
        DVEB.reStart();
        renderComm.onRestart();
    },
    "sync-settings" : (data,event)=> {
        const settings = data[1];
        DVEB.syncSettings(settings);
        return;
    }



};


