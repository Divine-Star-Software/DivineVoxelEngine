/** # SafeInterval
 * Creates a predictable sync interval.
 */
export class SafeInterval {
    _active = false;
    _run = () => { };
    inteval = 100;
    lastTime = 0;
    currentTimeout = 0;
    setOnRun(run) {
        this._run = run;
        return this;
    }
    setInterval(interval) {
        this.inteval = interval;
        return this;
    }
    async run() {
        if (!this._active)
            return;
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
