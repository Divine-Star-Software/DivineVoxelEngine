export class CompiledTextureAnimation {
  _frames: number[] = [];
  _times: number[] = [];
  _currentTime = 0;
  _frameIndex = 0;
  _current: number = -1;
  _animatedTextureIndex = -1;
  constructor(public textureIndex: number) {}

  tick(delta: number) {
    if(!this._frames.length || !this._times.length) return;
    if(Number.isNaN(this._current)) {
      console.error("ERROR NAN",this._current,this._frameIndex,delta);
      return;
    }
    if (this._current == -1) this._current = this._times[0];
    this._current -= delta;
    if (this._current <= 0) {
      this._frameIndex++;
      this._frameIndex %= this._frames.length;
      this._current = this._times[this._frameIndex];
      return true;
    }
    return false;
  }

  getIndex() {
    return this._frames[this._frameIndex] + this.textureIndex;
  }
}
