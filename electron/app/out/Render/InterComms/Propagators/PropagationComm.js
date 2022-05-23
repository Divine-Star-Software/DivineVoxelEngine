import { CreateInterComm } from "../../../Comms/InterComm.js";
export const GetNewPropagationComm = (count, port) => {
    const newComm = CreateInterComm(`propagation-${count}`, { ready: false });
    newComm.messageFunctions = {};
    newComm.setPort(port);
    return newComm;
};
