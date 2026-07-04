export class ProgressBar {
  container = document.createElement("div");
  progress = document.createElement("div");
  progressBar = document.createElement("div");
  progressText = document.createElement("p");

  private _max = 100;
  get max() {
    return this._max;
  }
  set max(max: number) {
    this._max = max;
    this._update();
  }
  private _value = 0;
  get value() {
    return this._value;
  }
  set value(value: number) {
    this._value = value;
    this._update();
  }

  private _update() {
    const pct = Math.min(100, (this._value / this._max) * 100);
    this.progressBar.style.width = `${pct}%`;
  }
  constructor() {
    this.container.className = `ds-loading-progress`;
    this.progressText.className = `ds-loading-text`;
    this.progress.className = "progress-bar";
    this.progressBar.className = "progress-bar-fill";
    this.progressBar.style.width = "0%";
    this.container.style.display = `none`;
    this.progress.append(this.progressBar);
    this.container.append(this.progress);
    this.container.append(this.progressText);
  }

  show(show: boolean) {
    this.container.style.display = show ? "block" : "none";
  }

  text(text: string) {
    this.progressText.innerText = text;
  }

  async updateProgressPercent(value: number, max?: number) {
    if (max) this.max = max;
    return new Promise((resolve) => {
      {
        let newValue = value;
        const inte = setInterval(() => {
          this.value++;
          if (this.value >= newValue || this.value > this.max) {
            clearInterval(inte);
            resolve(true);
          }
        }, 1);
      }
    });
  }
}
