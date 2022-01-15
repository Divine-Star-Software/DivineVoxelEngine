

export const ShaderNoiseFunctions = {

    fluid : `
    float hash(vec2 p) {
        return fract(sin(dot(p * 5.5, vec2(14.91, 67.31))) * 4791.9511);
      }

    float noise(vec2 x) {
        vec2 p = floor(x);
        vec2 f = fract(x);
        f = f * f * (3.0 - 2.0 * f);
        vec2 a = vec2(1.0, 0.0);
        return mix(mix(hash(p + a.yy), hash(p + a.xy), f.x),
               mix(hash(p + a.yx), hash(p + a.xx), f.x), f.y);
      }

      float fbm(vec2 x) {
        float height = 0.0;
        float amplitude = 3.0;
        float frequency = 3.0;
        for (int i = 0; i < 1; i++){
          height += noise(x * frequency) * amplitude;
          amplitude *= 3.0;
          frequency *= 2.0;
        }
        return height;
      }
    `


    

}