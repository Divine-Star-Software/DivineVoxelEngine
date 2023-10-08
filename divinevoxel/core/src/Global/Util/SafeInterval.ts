type SafeLoopRunFunction = (delta: number) => void;
/** # SafeInterval
 * Creates a predictable sync interval.
 */
export class SafeInterval {
  private _active = false;
  private _run: SafeLoopRunFunction = () => {};
  private inteval = 100;
  private lastTime = 0;
  private currentTimeout: any = 0;
  setOnRun(run: (delta: number) => void) {
    this._run = run;
    return this;
  }

  setInterval(interval: number) {
    this.inteval = interval;
    return this;
  }

  private async run() {
    if (!this._active) return;
    await this._run(performance.now() - this.lastTime);

    this.currentTimeout = setTimeout(() => {
      this.run();
    }, this.inteval);
    return this;
  }

  start() {
    if (!this._active) {
      this._active = true;
      this.run();
    }
    return this;
  }

  stop() {
    this._active = false;
    clearTimeout(this.currentTimeout);
    return this;
  }
}
