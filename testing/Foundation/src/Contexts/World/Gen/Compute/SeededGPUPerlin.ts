class LCG {
  m = 4294967296;
  a = 1664525;
  c = 1013904223;
  z = 0;

  seed: number;

  setSeed(val: number) {
    this.z = this.seed = (val == null ? Math.random() * this.m : val) >>> 0;
  }
  getSeed() {
    return this.seed;
  }
  rand() {
    this.z = (this.a * this.z + this.c) % this.m;
    return this.z / this.m;
  }
}

export class SeededGPUPerlin {
  static RandomPoolSize = 4095;
  PERLIN_YWRAPB = 4;
  PERLIN_YWRAP = 1 << this.PERLIN_YWRAPB;
  PERLIN_ZWRAPB = 8;
  PERLIN_ZWRAP = 1 << this.PERLIN_ZWRAPB;
  PERLIN_SIZE = 4095;
  SINCOS_PRECISION = 0.5;
  SINCOS_LENGTH = Math.floor(360 / this.SINCOS_PRECISION);
  DEG_TO_RAD = Math.PI / 180.0;
  perlin_octaves = 4; // default to medium smooth
  perlin_amp_falloff = 0.5; // 50% reduction/octave
  perlin: null | any[] = null;
  perlin_PI = this.SINCOS_LENGTH;

  get poolName() {
    return "perlinPool";
  }
  CODE = {
    Binding: (group: number, binding: number) => {
      const poolName = "perlinPool";
      return /* rust  */ `
@group(${group}) @binding(${binding}) var<uniform> ${poolName}: array<vec4f,${
        SeededGPUPerlin.RandomPoolSize + 1
      }>;\n`;
    },
    Function: () => {
      const poolName = "perlinPool";
      return /* rust  */ `


 fn index_cos(index : f32) -> f32 {
  return cos( index * ${this.DEG_TO_RAD} * ${this.SINCOS_PRECISION});
 }
 fn noise_fsc(i: f32) -> f32 {
    // using cosine lookup table
    return (
      0.5 *
      (1.0 -
        index_cos(
        floor(i * ${this.perlin_PI}) % ${this.SINCOS_LENGTH})
    )
    );
}

fn index_perlin_pool(index: u32) -> f32 {
  return ${poolName}[index].x;
}

fn perlin_noise_3d(position: vec3f ) -> f32 {
    var x = position.x;
    var y = position.y;
    var z = position.z;

    if (x < 0) {
      x = -x;
    }
    if (y < 0) {
      y = -y;
    }
    if (z < 0) {
      z = -z;
    }

    var xi = u32(floor(x));
    var yi = u32(floor(y));
    var zi = u32(floor(z));
    var nxf: f32 = x - f32(xi);
    var yf: f32 = y - f32(yi);
    var zf: f32 = z - f32(zi);
    var rxf: f32 = 0;
    var ryf: f32 = 0;

    var r: f32 = 0;
    var ampl: f32 = 0.5;

    var n1: f32 = 0; 
    var n2: f32 = 0; 
    var n3: f32 = 0;

    let PERLIN_SIZE: u32 = ${this.PERLIN_SIZE};
    let PERLIN_YWRAP: u32 = ${this.PERLIN_YWRAP};
    let PERLIN_YWRAPB: u32 = ${this.PERLIN_YWRAPB};
    let PERLIN_ZWRAP: u32 = ${this.PERLIN_ZWRAP};
    let PERLIN_ZWRAPB: u32 = ${this.PERLIN_ZWRAPB};
    for (var o = 0; o < ${this.perlin_octaves}; o++) {
      var xf = f32(u32(xi) + (u32(yi) << u32(PERLIN_YWRAPB)) + (u32(zi) << u32(PERLIN_ZWRAPB)));

      rxf = noise_fsc(nxf);
      ryf = noise_fsc(yf);

      n1 = index_perlin_pool(
          u32(xf) & PERLIN_SIZE
      );
      n1 += rxf * 
      (index_perlin_pool(
        (u32(xf + 1)) & PERLIN_SIZE) - n1
      );
      n2 = index_perlin_pool(
        (u32(xf) + PERLIN_YWRAP) & PERLIN_SIZE
      );
      n2 +=
        rxf *
        (index_perlin_pool(
          (u32(xf) + PERLIN_YWRAP + 1) & PERLIN_SIZE) - n2
        );
      n1 += ryf * (n2 - n1);

      xf += f32(PERLIN_ZWRAP);
      n2 = index_perlin_pool(
        u32(xf) & PERLIN_SIZE
      );
      n2 += rxf * (index_perlin_pool(
        (u32(xf + 1)) & PERLIN_SIZE) - n2
      );
      n3 = index_perlin_pool(
        (u32(xf) + PERLIN_YWRAP) & PERLIN_SIZE
      );
      n3 +=
        rxf *
        (index_perlin_pool(
          (u32(xf) + PERLIN_YWRAP + 1) & PERLIN_SIZE) - n3
      );
      n2 += ryf * (n3 - n2);

      n1 += noise_fsc(zf) * (n2 - n1);

      r += n1 * ampl;
      ampl *= ${this.perlin_amp_falloff};
      xi <<= 1;
      nxf *= 2;
      yi <<= 1;
      yf *= 2;
      zi <<= 1;
      zf *= 2;

      if (nxf >= 1.0) {
        xi++;
        nxf -= 1;
      }
      if (yf >= 1.0) {
        yi++;
        yf -= 1;
      }
      if (zf >= 1.0) {
        zi++;
        zf -= 1;
      }
    }
    return r;
}


 `;
    },
  };
  lcg = new LCG();
  randomPoolBuffer = new ArrayBuffer(
    (SeededGPUPerlin.RandomPoolSize + 1) * 4 * 4
  );
  randomPool = new Float32Array(this.randomPoolBuffer);


  constructor(){
    this.perlin_PI >>= 1;
  }
  setSeed(seed: number) {
    this.lcg.setSeed(seed);
    for (let i = 0; i < this.randomPool.length / 4; i++) {
      this.randomPool[i * 4] = this.lcg.rand();
    }
  }
}
