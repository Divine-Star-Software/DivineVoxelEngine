import { CompiledTexture } from "./CompiledTexture";

export class TextureAnimationTexture {
  _buffer: Uint16Array;
  _size = 0;
  shaderTexture: any;
  constructor(public _texture: CompiledTexture) {}

  build() {
    const totalTexture = this._texture.images.length;
    const size = Math.pow(
      2,
      Math.ceil(Math.log2(Math.ceil(Math.sqrt(totalTexture))))
    );
    this._size = size;
    this._buffer = new Uint16Array(size * size);
    for (let i = 0; i < this._texture.animations.length; i++) {
      const anim = this._texture.animations[i];
      anim._animatedTextureIndex = CompiledTexture.GetAtlasIndex(
        ...CompiledTexture.GetAtlasPosition(anim.textureIndex, this._size),
        this._size
      );
    }
    return this._buffer;
  }

  tick(delta: number) {
    let update = false;
    for (let i = 0; i < this._texture.animations.length; i++) {
      const anim = this._texture.animations[i];
      if (anim.tick(delta)) {
        update = true;
        this._buffer[anim._animatedTextureIndex] = anim.getIndex();
      }
    }
    return update;
  }
}
