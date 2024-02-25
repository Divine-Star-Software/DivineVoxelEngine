export class Browser {
  static get isChromium() {
    return (window as any).chrome !== undefined;
  }
  static get isFireFox() {
    return navigator.userAgent.indexOf("Firefox");
  }
  static get isSafari() {
    return navigator.userAgent.indexOf("Safari");
  }

  
}
