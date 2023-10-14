type EaseFunction = (
  time: number,
  start: number,
  change: number,
  duration: number
) => number;
export class ValueEaseAndTween {
  //https://spicyyoghurt.com/tools/easing-functions
  static EaseInQuad: EaseFunction = (time, start, change, duration) =>
    change * (time /= duration) * time + start;

  static EaseLinear: EaseFunction = (time, start, change, duration) =>
    (change * time) / duration + start;

  static EaseOutQuad: EaseFunction = (time, start, change, duration) =>
    -change * (time /= duration) * (time - 2) + start;

  static EaseInOutQuad: EaseFunction = (time, start, change, duration) =>
    (time /= duration / 2) < 1
      ? (change / 2) * time * time + start
      : (-change / 2) * (--time * (time - 2) - 1) + start;

  static EaseInSine: EaseFunction = (time, start, change, duration) =>
    -change * Math.cos((time / duration) * (Math.PI / 2)) + change + start;

  static EaseOutSine: EaseFunction = (time, start, change, duration) =>
    change * Math.sin((time / duration) * (Math.PI / 2)) + start;

  static EaseInOutSine: EaseFunction = (time, start, change, duration) =>
    (-change / 2) * (Math.cos((Math.PI * time) / duration) - 1) + start;

  static EaseInExpo: EaseFunction = (time, start, change, duration) =>
    time == 0
      ? start
      : change * Math.pow(2, 10 * (time / duration - 1)) + start;

  static EaseOutExpo: EaseFunction = (time, start, change, duration) =>
    time == duration
      ? start + change
      : change * (-Math.pow(2, (-10 * time) / duration) + 1) + start;

  static EaseInOutExpo: EaseFunction = (time, start, change, duration) => {
    if (time == 0) return start;
    if (time == duration) return start + change;
    if ((time /= duration / 2) < 1)
      return (change / 2) * Math.pow(2, 10 * (time - 1)) + start;
    return (change / 2) * (-Math.pow(2, -10 * --time) + 2) + start;
  };
  static EaseInCirc: EaseFunction = (time, start, change, duration) =>
    -change * (Math.sqrt(1 - (time /= duration) * time) - 1) + start;

  static EaseOutCirc: EaseFunction = (time, start, change, duration) =>
    change * Math.sqrt(1 - (time = time / duration - 1) * time) + start;

  static EaseInOutCirc: EaseFunction = (time, start, change, duration) =>
    (time /= duration / 2) < 1
      ? (-change / 2) * (Math.sqrt(1 - time * time) - 1) + start
      : (change / 2) * (Math.sqrt(1 - (time -= 2) * time) + 1) + start;

  static EaseInCubic: EaseFunction = (time, start, change, duration) =>
    change * (time /= duration) * time * time + start;

  static EaseOutCubic: EaseFunction = (time, start, change, duration) =>
    change * ((time = time / duration - 1) * time * time + 1) + start;

  static EaseInOutCubic: EaseFunction = (time, start, change, duration) =>
    (time /= duration / 2) < 1
      ? (change / 2) * time * time * time + start
      : (change / 2) * ((time -= 2) * time * time + 2) + start;

  static EaseInQuart: EaseFunction = (time, start, change, duration) =>
    change * (time /= duration) * time * time * time + start;

  static EaseOutQuart: EaseFunction = (time, start, change, duration) =>
    -change * ((time = time / duration - 1) * time * time * time - 1) + start;

  static EaseInOutQuart: EaseFunction = (time, start, change, duration) =>
    (time /= duration / 2) < 1
      ? (change / 2) * time * time * time * time + start
      : (-change / 2) * ((time -= 2) * time * time * time - 2) + start;

  static EaseInQuint: EaseFunction = (time, start, change, duration) =>
    change * (time /= duration) * time * time * time * time + start;

  static EaseOutQuint: EaseFunction = (time, start, change, duration) =>
    change * ((time = time / duration - 1) * time * time * time * time + 1) +
    start;

  static EaseInOutQuint: EaseFunction = (time, start, change, duration) =>
    (time /= duration / 2) < 1
      ? (change / 2) * time * time * time * time * time + start
      : (change / 2) * ((time -= 2) * time * time * time * time + 2) + start;

  static EaseInElastic: EaseFunction = (time, start, change, duration) => {
    let s = 1.70158;
    let p = 0;
    let a = change;
    if (time == 0) return start;
    if ((time /= duration) == 1) return start + change;
    if (!p) p = duration * 0.3;
    if (a < Math.abs(change)) {
      a = change;
      s = p / 4;
    } else s = (p / (2 * Math.PI)) * Math.asin(change / a);
    return (
      -(
        a *
        Math.pow(2, 10 * (time -= 1)) *
        Math.sin(((time * duration - s) * (2 * Math.PI)) / p)
      ) + start
    );
  };
  static EaseOutElastic: EaseFunction = (time, start, change, duration) => {
    let s = 1.70158;
    let p = 0;
    let a = change;
    if (time == 0) return start;
    if ((time /= duration) == 1) return start + change;
    if (!p) p = duration * 0.3;
    if (a < Math.abs(change)) {
      a = change;
      s = p / 4;
    } else s = (p / (2 * Math.PI)) * Math.asin(change / a);
    return (
      a *
        Math.pow(2, -10 * time) *
        Math.sin(((time * duration - s) * (2 * Math.PI)) / p) +
      change +
      start
    );
  };
  static EaseInOutElastic: EaseFunction = (time, start, change, duration) => {
    let s = 1.70158;
    let p = 0;
    let a = change;
    if (time == 0) return start;
    if ((time /= duration / 2) == 2) return start + change;
    if (!p) p = duration * (0.3 * 1.5);
    if (a < Math.abs(change)) {
      a = change;
      s = p / 4;
    } else s = (p / (2 * Math.PI)) * Math.asin(change / a);
    if (time < 1)
      return (
        -0.5 *
          (a *
            Math.pow(2, 10 * (time -= 1)) *
            Math.sin(((time * duration - s) * (2 * Math.PI)) / p)) +
        start
      );
    return (
      a *
        Math.pow(2, -10 * (time -= 1)) *
        Math.sin(((time * duration - s) * (2 * Math.PI)) / p) *
        0.5 +
      change +
      start
    );
  };
  static s = 1.70158;
  static EaseInBack: EaseFunction = (time, start, change, duration) =>
    change *
      (time /= duration) *
      time *
      ((ValueEaseAndTween.s + 1) * time - ValueEaseAndTween.s) +
    start;

  static EaseOutBack: EaseFunction = (time, start, change, duration) =>
    change *
      ((time = time / duration - 1) *
        time *
        ((ValueEaseAndTween.s + 1) * time + ValueEaseAndTween.s) +
        1) +
    start;

  static EaseInOutBack: EaseFunction = (time, start, change, duration) =>
    (time /= duration / 2) < 1
      ? (change / 2) *
          (time *
            time *
            (((ValueEaseAndTween.s *= 1.525) + 1) * time -
              ValueEaseAndTween.s)) +
        start
      : (change / 2) *
          ((time -= 2) *
            time *
            (((ValueEaseAndTween.s *= 1.525) + 1) * time +
              ValueEaseAndTween.s) +
            2) +
        start;

  _count = 0;
  _alive = true;
  _start = 0;
  _change = 0;
  _func: EaseFunction;

  constructor(
    public data: {
      max: number;
      function: EaseFunction;
      start: number;
      end: number;
      onUpdate: (percent: number) => void;
      onDone: () => void;
    }
  ) {
    this._start = data.start;
    this._change = data.end - data.start;
    this._func = this.data.function;
    console.log(this._func)
  }
  update() {
    if (!this._alive) return;
    if (this._count >= this.data.max) {
      this._count = 0;
      this.data.onDone();
      return;
    }
    this._count++;

    this.data.onUpdate(
      this._func(this._count, this._start, this._change, this.data.max)
    );
  }
  setAlive(value: boolean) {
    this._alive = value;
    this._count = 0;
  }
  isAlive() {
    return this._alive;
  }
  getInterval(n: number) {
    return n / this.data.max;
  }
}
