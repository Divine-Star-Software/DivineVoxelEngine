/** # SafeInterval
 * Creates a predictable sync interval.
 */
export class SafeInterval {
  private _active = false;
  private _run: () => void | Promise<void> = () => {}; 
  private interval = 100;
  private currentTimeout: number | undefined; 
  private canRun = true;

  constructor(run?: () => void | Promise<void>, interval?: number) {
    if (run) this.setOnRun(run);
    if (interval !== undefined) this.setInterval(interval);
  }

  setOnRun(run: () => void | Promise<void>) {
    this._run = run;
    return this;
  }

  setInterval(interval: number) {
    this.interval = interval;
    return this;
  }

  private _asyncRun() {
    return new Promise((resolve) => {
      if (!this.canRun) return resolve(false);
      this.canRun = false;
      const prom = this._run();
      if (prom instanceof Promise) {
        return prom
          .then(() => resolve(true))
          .catch(() => resolve(false))
          .finally(() => (this.canRun = true));
      }
      this.canRun = true;
      resolve(true);
    });
  }

  private runInterval() {
    if (!this._active) return;
    this._asyncRun().then(() => {
      this.currentTimeout = <any>setTimeout(() => {
        if (!this._active) return;
        this.runInterval();
      }, this.interval);
    });
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
