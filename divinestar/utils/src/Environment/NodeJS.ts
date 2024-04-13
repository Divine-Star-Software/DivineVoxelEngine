export class NodeJS {
  static get isNode(): boolean {
    return (
      typeof process !== "undefined" &&
      process.versions &&
      !!process.versions.node
    );
  }
}
