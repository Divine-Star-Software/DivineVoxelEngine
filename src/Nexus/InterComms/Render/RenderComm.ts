/**# Render Comm
 * ---
 * Handles communication with the main/render thread.
 */
export class RenderComm {
 port: Worker = self as any;

 messageFunctions: Record<string, (data: any[], event: MessageEvent) => void> =
  {};

 $INIT() {}

 _onMessage(event: MessageEvent) {
  const message = event.data[0];
  if (this.messageFunctions[message]) {
   this.messageFunctions[message](event.data, event);
  }
 }

 sendMessage(message: string, data: any[], transfers?: any[]) {
  if (transfers) {
   this.port.postMessage([message, ...data], transfers);
  }
  this.port.postMessage([message, ...data]);
 }

 listenForMessage(
  message: string,
  run: (data: any[], event: MessageEvent) => void
 ) {
  this.messageFunctions[message] = run;
 }
}
