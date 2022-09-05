import type { InterCommInterface } from "Meta/Comms/InterComm.types";
export declare function CreateInterComm<T>(name: string, mergeObject: T): InterCommInterface & T;
