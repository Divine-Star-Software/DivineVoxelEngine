import { NodeWorker } from "./NodeWorker.interface";
export type InterCommPortTypes = Worker | NodeWorker | MessagePort;
export type InterCommInterface = {
 environment: "node" | "browser";
 name: string;
 port: InterCommPortTypes | null;
 __onSetPortRun: Function;
 onSetPort: (set: (port: InterCommPortTypes) => void) => void;
 setPort: (port: InterCommPortTypes) => void;
 messageFunctions: Record<
  string | number,
  (data: any, event?: MessageEvent) => void
 >;
 sendMessage: (message: string | number, data: any[], transfers?: any[]) => void;
 listenForMessage: (
  message: string | number,
  run: (data: any[], event?: MessageEvent) => void
 ) => void;
 onMessage: (event: any) => void;
};
