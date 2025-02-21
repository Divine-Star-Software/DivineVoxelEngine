/** # Tick Interval
 * Creates a predictable tick interval.
 */
export class TickInterval {
  private _active = false;
  private interval = 1;
  private currentTimeout: number | undefined;
  private __timeoutFunc: () => void;

  constructor(
    run?: () => void | Promise<void>,
    interval?: number,
    public stopOnError = true
  ) {
    if (run) this.setOnRun(run);
    if (interval !== undefined) this.setInterval(interval);
  }

  setOnRun(run: () => void | Promise<void>) {
    this.__timeoutFunc = () => {
      if (!this._active) return;
      run();
      this.runInterval();
    };
    return this;
  }

  setInterval(interval: number) {
    this.interval = interval;
    return this;
  }

  private runInterval() {
    if (!this._active) return;
    this.currentTimeout = <any>setTimeout(this.__timeoutFunc, this.interval);
  }

  start() {
    if (!this._active) {
      this._active = true;
      this.runInterval();
    }
    return this;
  }

  stop() {
    this._active = false;
    if (this.currentTimeout !== undefined) clearTimeout(this.currentTimeout);
    this.currentTimeout = undefined;
    return this;
  }
}
