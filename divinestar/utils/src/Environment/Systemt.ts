export type OSNames = "windows" | "mac" | "linux" | "android" | "ios";

export class System {
  static os: OSNames;
  static get isWindows() {
    return this.os === "windows";
  }
  static get isMac() {
    return this.os === "mac";
  }
  static get isLinux() {
    return this.os === "linux";
  }
  static get isAndroid() {
    return this.os === "android";
  }
  static get isIOS() {
    return this.os == "ios";
  }
}

if (navigator.userAgent.indexOf("Win") != -1) System.os = "windows";
if (navigator.userAgent.indexOf("Mac") != -1) System.os = "mac";
if (navigator.userAgent.indexOf("Linux") != -1) System.os = "linux";
if (navigator.userAgent.indexOf("Android") != -1) System.os = "android";
if (navigator.userAgent.indexOf("like Mac") != -1) System.os = "ios";
