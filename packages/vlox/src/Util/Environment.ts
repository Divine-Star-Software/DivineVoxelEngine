export class Environment {
  static isNode() {
    return (
      typeof process !== "undefined" &&
      process.versions &&
      !!process.versions.node
    );
  }

  static isBrowser() {
    return !this.isNode();
  }
}
