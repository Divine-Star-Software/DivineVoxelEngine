//objects
import { CreateInterComm } from "../../../Comms/InterComm.js";
export const GetNewConstructorComm = (count, port) => {
    const newComm = CreateInterComm(`server-constructor-${count}`, { ready: false });
    newComm.setPort(port);
    return newComm;
};
