export class HoldRegister {
  private static _functions = new Map<
    string,
    {
      time: number;
      delay: number;
      activeDelay: number;
      run: Function;
      activeTime: number;
    }
  >();

  static addHold(id: string, run: Function, delay: number, activeDelay = 0) {
    if (this._functions.has(id)) return;
    this._functions.set(id, {
      time: performance.now(),
      delay,
      run,
      activeDelay,
      activeTime: performance.now(),
    });
  }
  static removeHold(id: string) {
    this._functions.delete(id);
  }

  static hasHold(id: string) {
    return this._functions.has(id);
  }

  static run(frameDelta: number) {
    const time = performance.now();
    for (const [key, node] of this._functions) {
      if (node.delay) {
        const activeDelta = time - node.activeTime + frameDelta;
        if (activeDelta < node.delay) {
          continue;
        }
      }
      if (node.activeDelay) {
        const delta = time - node.time + frameDelta;
        if (delta < node.activeDelay) {
          continue;
        }
      }
      node.run();
      node.activeTime = time;
    }
  }
}
