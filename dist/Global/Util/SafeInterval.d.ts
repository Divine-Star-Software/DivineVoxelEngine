/** # SafeInterval
 * Creates a predictable sync interval.
 */
export declare class SafeInterval {
    private _active;
    private _run;
    private inteval;
    private lastTime;
    private currentTimeout;
    setOnRun(run: (delta: number) => void): this;
    setInterval(interval: number): this;
    private run;
    start(): this;
    stop(): this;
}
