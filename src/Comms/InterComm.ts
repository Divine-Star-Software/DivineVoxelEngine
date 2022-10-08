import type { InterCommPortTypes, NodeWorker } from "./InterComm.types";

class InterCommBase {
 environment: "node" | "browser" = "browser";
 name = "";
 port: InterCommPortTypes | null = null;
 messageFunctions: Record<
  string | number,
  (data: any, event?: MessageEvent) => void
 > = {};
 __onSetPortRun: (port: InterCommPortTypes) => void = (port) => {};
 onSetPort(set: (port: InterCommPortTypes) => void) {
  this.__onSetPortRun = set;
 }
 setPort(port: InterCommPortTypes) {
  if (!port) {
   throw new Error(`DVE InterComm: ${this.name} port is not set.`);
  }
  this.port = port;
  this.__onSetPortRun(port);
  if (this.environment == "browser") {
   (port as MessagePort).onmessage = (event: MessageEvent) => {
    const message = event.data[0];
    if (this.messageFunctions[message]) {
     this.messageFunctions[message](event.data, event);
    }
    this.onMessage(event);
   };
   (port as MessagePort).onmessageerror = (event: MessageEvent) => {};
  }
  if (this.environment == "node") {
   (port as NodeWorker).on("message", (data: any[]) => {
    const message = data[0];
    if (this.messageFunctions[message]) {
     this.messageFunctions[message](data, data as any);
    }
    this.onMessage(data);
   });
  }
 }
 _errorMessage(message: string) {
  throw new Error(`[DVE InterComm : ${this.name}] ${message}`);
 }
 sendMessage(message: string | number, data: any[] = [], transfers?: any[]) {
  if (!this.port) {
   return this._errorMessage("Port is not set.");
  }
  if (this.environment == "browser" && transfers) {
   this.port.postMessage([message, ...data], transfers);
   return;
  }
  this.port.postMessage([message, ...data]);
 }
 listenForMessage(
  message: string | number,
  run: (data: any[], event?: MessageEvent) => void
 ) {
  this.messageFunctions[message] = run;
 }
 onMessage(event: any) {}
}

export function CreateInterComm<T>(
 name: string,
 mergeObject: T
): InterCommBase & T {
 const newCom = Object.assign<InterCommBase, typeof mergeObject>(
  new InterCommBase(),
  mergeObject
 );
 newCom.name = name;

 //@ts-ignore
 if (typeof process !== "undefined" && typeof Worker === "undefined") {
  newCom.environment = "node";
 }
 return newCom;
}
