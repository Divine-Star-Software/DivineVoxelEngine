import { CreateInterComm } from "../../../Comms/InterComm.js";
export const GetNewWorldGenComm = (count, port) => {
    const newComm = CreateInterComm("render-world-gen-base", { ready: false });
    newComm.name = `worldgen-${count}`;
    newComm.messageFunctions = {};
    newComm.setPort(port);
    return newComm;
};
