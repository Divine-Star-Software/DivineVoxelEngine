import { DivineVoxelEngineWorld } from "@divinevoxel/core/World";
import { WorldGen } from "./WorldGen";
import { VoxelPaletteReader } from "@divinevoxel/core/Data/Voxel/VoxelPalette";
import { WorldLock } from "@divinevoxel/core/World/Lock/WorldLock";
import { Vec3Array, Flat3DIndex } from "@divinevoxel/core/Math";
import { NoiseShaders, PaerlinNoise } from "./NoiseShader";
class Constants {
  static VOXEL_32F_SEGMENTS = 2;
  static VOXEL_16ui_SEGMENTS = 4;
  static PROCESSING_X = 256;
  static PROCESSING_Y = 128;
  static PROCESSING_Z = 256;
  static get PROCESSING_SIZE() {
    return this.PROCESSING_X * this.PROCESSING_Y * this.PROCESSING_Z;
  }
}
//https://gist.github.com/munrocket/236ed5ba7e409b8bdf1ff6eca5dcdc39
const ShaderVoxelWorld = /* rust  */ `
${PaerlinNoise}
//math
fn get_position_from_index(index: f32, bounds: vec3<f32>) -> vec3<f32> {
  return vec3<f32>(
    floor(index % bounds.y),
    floor((index / bounds.y) % bounds.x),
    floor(index / (bounds.x * bounds.z))
  );
}

fn get_index_from_position(position: vec3<f32>, bounds: vec3<f32>) -> f32 {
  return position.z + position.x * bounds.z + position.y * bounds.z * bounds.x;
}
//https://stackoverflow.com/questions/12964279/whats-the-origin-of-this-glsl-rand-one-liner
fn rand(co : vec2<f32>) -> f32 {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}
//world
struct VoxelWorld {
  process_size: vec3<f32>,
  region_size: vec3<f32>,
  column_size: vec3<f32>,
  chunk_size: vec3<f32>
}

const voxel_world = VoxelWorld(
  vec3<f32>(${Constants.PROCESSING_X},${Constants.PROCESSING_Y},${
  Constants.PROCESSING_Z
}),
  vec3<f32>(256,128,256),
  vec3<f32>(16,128,16),
  vec3<f32>(16,16,16)
);

fn get_voxel_position_from_index(index: f32) -> vec3<f32> {
  return get_position_from_index(index,voxel_world.process_size);
}

fn get_voxel_index_from_position(position: vec3<f32>) -> f32 {
  return get_index_from_position(position,  voxel_world.process_size);
}

fn is_in_bounds(position: vec3<f32>) -> bool {
  if(position.x < 0 || position.x > ${Constants.PROCESSING_X}){ return false;}
  if(position.y < 0 || position.y > ${Constants.PROCESSING_Y}){ return false;}
  if(position.z < 0 || position.z > ${Constants.PROCESSING_Z}){ return false;}
  return true;
}
//light 
struct Light {
  sun: u32,
  red: u32,
  green: u32,
  blue: u32,
}
const light_mask: u32 = ${0xf};
fn decode_light(data: u32) -> Light {
 return Light(
  light_mask & data,
  ((light_mask << 4) & data) >> 4,
  ((light_mask << 8) & data) >> 8,
  ((light_mask << 12) & data) >> 12
  );
}
fn encode_light(light: Light) -> u32 {
 var data: u32 = 0;
 data = (data & ~light_mask) | light.sun;
 data = (data & ~(light_mask << 4)) | (light.red << 4);
 data = (data & ~(light_mask << 8)) | (light.green << 8);
 data = (data & ~(light_mask << 12)) | (light.blue << 12);
 return data;
}

//state
const level_mask: u32 = ${0b00_1111};
const level_state_mask: u32 = ${0b11_0000};
const shape_state_mask: u32 = ${0b1111_1111_11_00_0000};
struct State {
  level: u32,
  level_state: u32,
  shape: u32,
}
fn decode_state(data: u32) -> State {
 return State(
  data & level_mask,
  (data & level_state_mask) >> 4,
  (data & shape_state_mask) >> 6
  );
}
fn encode_state(state: State) -> u32 {
  var data: u32 = 0;
  data = (data & ~level_mask) | state.level;
  data =  (data & ~level_state_mask) | (state.level_state << 4);
  return (data & ~shape_state_mask) | (state.shape << 6);
}
//voxels
struct Voxel {
  id: u32,
  secondary_id: u32,
  light: Light,
  state: State
}

struct VoxelSegments {
  id: u32,
  light: u32,
  state: u32,
  secondary_id: u32,
}
const segment_mask: u32 = ${0xffff};
fn get_voxel_segments(data: vec2u) -> VoxelSegments {
  let raw_seg1 = data.x;
  let raw_seg2 = data.y;
  return VoxelSegments(
  data.x & segment_mask,
  (data.x & (segment_mask << 16)) >> 16,
  data.y & segment_mask,
  (data.y & (segment_mask << 16)) >> 16,
  );
}

fn encode_voxel_segments(segments: VoxelSegments) -> vec2u {
  var raw = vec2u(0,0);
  raw.x = segments.id;
  raw.x = (raw.x & ~(segment_mask << 16)) | (segments.light  << 16);
  raw.y = segments.state ;
  raw.y = (raw.y & ~(segment_mask << 16)) | (segments.secondary_id  << 16);
  return raw;
}

fn voxel_to_segments(voxel: Voxel) -> VoxelSegments {
  return VoxelSegments(
    voxel.id,
    encode_light(voxel.light),
    encode_state(voxel.state),
    voxel.secondary_id
  );
}

fn voxel_to_raw_data(voxel: Voxel) -> vec2u {
  return encode_voxel_segments(
    voxel_to_segments(voxel)
  );
}

fn decode_voxel_segments(voxel_segments: VoxelSegments) -> Voxel {
  //state
  let state: u32 = 0;
  //level
  let level: u32 = 0;
  let level_state: u32 = 0;

  return Voxel(
    voxel_segments.id,
    voxel_segments.secondary_id,
    decode_light(voxel_segments.light),
    decode_state(voxel_segments.state)
  );
}

fn get_voxel(position: vec3<f32>) -> Voxel {
  let voxel_segments = get_voxel_segments(worldData[i32(
    get_voxel_index_from_position(position)
  )]);
 return decode_voxel_segments(voxel_segments);
}

fn set_voxel(position: vec3<f32>, voxel: Voxel) {
  let voxel_index = get_voxel_index_from_position(position);
  worldData[i32(voxel_index)] = voxel_to_raw_data(voxel);
}
`;

class ComputeEngine {
  adapter: GPUAdapter;
  device: GPUDevice;

  async init() {
    const adapter = await navigator.gpu?.requestAdapter();
    const device = await adapter?.requestDevice();
    if (!adapter || !device) {
      throw new Error(`Could not initalize.`);
    }
    this.adapter = adapter as any;
    this.device = device as any;
  }
}

class GPUWorldGen {
  static Shaders = {
    GET_WORLD_GEN: (genFunction: string) => {
      const ShaderVoxelSunLight = /* rust */ `

const sun_light_proagation_amount: u32 = 2;
const sun_light_start: f32 = ${Constants.PROCESSING_Y};

fn is_less_than_for_sun_add(main_voxel: Voxel,other_voxel: Voxel) -> bool {
 return other_voxel.light.sun + sun_light_proagation_amount < main_voxel.light.sun;
}
fn is_less_than_for_sun_add_down(main_voxel: Voxel,other_voxel: Voxel) -> bool {
 if(main_voxel.light.sun == 15) {
  return other_voxel.light.sun < main_voxel.light.sun;

 }
 return other_voxel.light.sun + sun_light_proagation_amount < main_voxel.light.sun;
}
fn is_less_than_for_sun_add_up(main_voxel: Voxel,other_voxel: Voxel) -> bool {
 if(other_voxel.light.sun == 15) {
  return main_voxel.light.sun < other_voxel.light.sun;
 }
 return main_voxel.light.sun + sun_light_proagation_amount < other_voxel.light.sun;
}
fn get_minus_one_for_sun(main_voxel: Voxel,other_voxel: Voxel) -> u32 {
 var value = main_voxel.light.sun - sun_light_proagation_amount;
 if(value < 0) {
  value = 0;
 }
 if(value < other_voxel.light.sun) {
  value = other_voxel.light.sun;
 }
 return value;
}
fn get_minus_one_for_sun_under_voxel(main_voxel: Voxel,other_voxel: Voxel) -> u32 {
  var s = main_voxel.light.sun;
  var sn = other_voxel.light.sun;
  if (s == 15) {
   sn = s;
  }
  if (s < 15) {
   sn = s - sun_light_proagation_amount;
  }
 return sn;
}
fn can_add_light(voxel:Voxel)-> bool {
  if(voxel.light.red > 0 || voxel.light.green > 0 || voxel.light.blue > 0) {return true;}
  if(voxel.id <= 2) { return true;}
  return false;
}
fn run_sun_light_fill(voxel_position: vec3<f32>) {
  var main_voxel = get_voxel(voxel_position);
  var position : vec3<f32> = vec3(voxel_position.x,voxel_position.y ,voxel_position.z);
  if(voxel_position.y >= sun_light_start) {
    main_voxel.light.sun = 15;
    set_voxel(voxel_position,main_voxel);
    for(var y = voxel_position.y - 1; y > 0; y -= 1.) {
    position = vec3(voxel_position.x,y,voxel_position.z);
    var other_voxel = get_voxel(position);
    if(can_add_light(other_voxel)) {
      other_voxel.light.sun = get_minus_one_for_sun_under_voxel(main_voxel,other_voxel);
      set_voxel(position,other_voxel);
    } else {
      break;
    }
    
  }

  }
}
const directions = array<vec3<f32>, 6>(
  vec3<f32>(1,0,0)
  ,vec3<f32>(-1,0,0)
  ,vec3<f32>(0,0,1)
  ,vec3<f32>(0,0,-1)
  ,vec3<f32>(0,1,0)
  ,vec3<f32>(0,-1,0)
);

const rgb_light_proagation_amount = 1;
fn run_light_flood(voxel_position: vec3<f32>) -> f32 {
  var main_voxel = get_voxel(voxel_position);
  var position : vec3<f32> = vec3(voxel_position.x,voxel_position.y,voxel_position.z);
  
  if(!can_add_light(main_voxel)) {return 0;}
            
  for(var i = 0; i < 6; i++ ){
    
    var direction = directions[i];
    position = vec3(
      voxel_position.x + direction.x,
      voxel_position.y + direction.y,
      voxel_position.z + direction.z
    );
    if(is_in_bounds(position)) {
      var other_voxel = get_voxel(position);

      if(main_voxel.light.sun + sun_light_proagation_amount < other_voxel.light.sun) {
        var value = other_voxel.light.sun - sun_light_proagation_amount;
        if(value < 0) {
          value = 0;
        }
        if(value < main_voxel.light.sun) {
          value = main_voxel.light.sun;
        }
        main_voxel.light.sun = value;
      }
      
      if(main_voxel.light.red + 2 <= other_voxel.light.red) {
        var value = other_voxel.light.red - rgb_light_proagation_amount;
        if(value < 0) {
          value = 0;
        }
        if(value < main_voxel.light.red) {
          value = main_voxel.light.red;
        }
        main_voxel.light.red = value;
      }
      
      if(main_voxel.light.green + 2 <= other_voxel.light.green) {
        var value = other_voxel.light.green - rgb_light_proagation_amount;
        if(value < 0) {
          value = 0;
        }
        if(value < main_voxel.light.green) {
          value = main_voxel.light.green;
        }
        main_voxel.light.green = value;
      }
      
      if(main_voxel.light.blue + 2 <= other_voxel.light.blue) {
        var value = other_voxel.light.blue - rgb_light_proagation_amount;
        if(value < 0) {
          value = 0;
        }
        if(value < main_voxel.light.blue) {
          value = main_voxel.light.blue;
        }
        main_voxel.light.blue = value;
      }
  
    }

  }
    


  set_voxel(voxel_position,main_voxel);
  
  return 1;
}

fn light_flood(column_position: vec3<f32>) -> f32 {

    for (var x = column_position.x; x < column_position.x + voxel_world.column_size.x; x += 1.) {
      for (var z = column_position.z; z < column_position.z + voxel_world.column_size.z; z += 1.) {
        for (var y = 0.; y < voxel_world.column_size.y; y += 1.) {
          run_light_flood(vec3<f32>(x,y,z));
        }
      }
    }
  
  return 1;
}
`;
      return /* rust  */ `
  // NOTE!: vec3u is padded to by 4 bytes
  @group(0) @binding(0) var<storage, read_write> worldData: array<vec2u>;
  @group(0) @binding(1) var<uniform> processingOptions: vec3<f32>;


  fn generate_column(column_position: vec3<f32>) {
    ${genFunction}
  }

  ${ShaderVoxelWorld}

  ${ShaderVoxelSunLight}

  @compute @workgroup_size(1) 
   fn computeSomething(
      @builtin(workgroup_id) workgroup_id : vec3<u32>,
      @builtin(local_invocation_id) local_invocation_id : vec3<u32>,
      @builtin(global_invocation_id) global_invocation_id : vec3<u32>,
      @builtin(local_invocation_index) local_invocation_index: u32,
      @builtin(num_workgroups) num_workgroups: vec3<u32>
  ) {

    if(processingOptions.x == 0){
    let column_position = vec3<f32>(
        f32(workgroup_id.x) * voxel_world.column_size.x,
        f32(processingOptions.y),
        f32(workgroup_id.y) * voxel_world.column_size.z,
    );
     generate_column(column_position);
    }
    if(processingOptions.x == 1){
      let voxel_position = vec3<f32>(
        f32(workgroup_id.x),
        f32(processingOptions.y),
        f32(workgroup_id.y)
    );
      run_sun_light_fill(voxel_position);
    }
    if(processingOptions.x == 2){
      let voxel_position = vec3<f32>(
        f32(workgroup_id.x),
        f32(processingOptions.y),
        f32(workgroup_id.y)
    );
    for(var i = 0; i < ${Constants.PROCESSING_Y}; i++) {
      run_light_flood(vec3<f32>(
      f32(workgroup_id.x),
      f32(i),
      f32(workgroup_id.y)  
      ));
    }
 
    // run_sun_rgb_flood(voxel_position);
    } 
  }
  `;
    },
  };
  engine = new ComputeEngine();
  async init() {
    await this.engine.init();
  }

  brushTool = DivineVoxelEngineWorld.instance.getBrush();
  async loadIntoWorld(start: Vec3Array, worldData: SharedArrayBuffer) {
    /*

  [
    dimension: string,
    index: Vec3Array,
    start: Vec3Array,
    end: Vec3Array,
    sab: SharedArrayBuffer
  ]
>(
  "load-in-generated-world-segment",
    */
    const segmentSize = 32;
    const sx = start[0];
    const sz = start[2];
    const ex = start[0] + Constants.PROCESSING_X;
    const ez = start[2] + Constants.PROCESSING_Z;
    const sy = 0;
    const ey = Constants.PROCESSING_Y;


    await WorldLock.addLock(["main", [sx, sy, sz], [ex, ey, ez]]);

    const index = new Flat3DIndex();
    index.bounds = {
      x: Constants.PROCESSING_X,
      y: Constants.PROCESSING_Y,
      z: Constants.PROCESSING_Z,
    };
    const mash = 0xff;
    const segments: [
      dimension: string,
      index: Vec3Array,
      start: Vec3Array,
      end: Vec3Array,
      sab: SharedArrayBuffer
    ][] = [];

    let ix = 0,
      iy = 0,
      iz = 0;

    const map = new Map<string, any>();
    for (let x = sx; x < ex; x += segmentSize) {
      iz = 0;
      for (let z = sz; z < ez; z += segmentSize) {
        segments.push([
          "main",
          [ix, 0, iz],
          [sx + ix, 0, sz + iz],
          [sx + ix + segmentSize, Constants.PROCESSING_Y, sz + iz + segmentSize],
          worldData,
        ]);
        iz += segmentSize;
      }
      ix += segmentSize;
    }

    const DVEW = DivineVoxelEngineWorld.instance;
    await Promise.all(
      segments.map((_) =>
        DVEW.ccm.runAsyncTasks("load-in-generated-world-segment", _)
      )
    );

    await WorldLock.removeLock(["main", [sx, sy, sz], [ex, ey, ez]]);
  }
  async generate(run: { start: Vec3Array; code: string }) {
    const DVEW = DivineVoxelEngineWorld.instance;

    const code = GPUWorldGen.Shaders.GET_WORLD_GEN(run.code);

    const module = this.engine.device.createShaderModule({ code }) as any;

    const pipeline = this.engine.device.createComputePipeline({
      label: "compute pipeline",
      layout: "auto",
      compute: {
        module,
        entryPoint: "computeSomething",
      },
    });

    const size = Constants.PROCESSING_SIZE * Constants.VOXEL_32F_SEGMENTS * 4;
    const worldSAB = new SharedArrayBuffer(size);
    const worldSABView = new Uint32Array(worldSAB);
    let usage = GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC;

    const worldDataWriteBuffer = this.engine.device.createBuffer({
      size,
      usage,
    });
    usage = GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST;

    const worldDataReadBuffer = this.engine.device.createBuffer({
      size,
      usage,
    });

    const processingOptionsBuffer = this.engine.device.createBuffer({
      size: 3 * 4,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    const bindGroup = this.engine.device.createBindGroup({
      layout: pipeline.getBindGroupLayout(0) as any,

      entries: [
        { binding: 0, resource: { buffer: worldDataWriteBuffer } },
        { binding: 1, resource: { buffer: processingOptionsBuffer } },
      ] as any,
    });

    // Encode commands to do the computation

    /*   this.engine.device.queue.writeBuffer(
    processingOptionsBuffer,
    0,
    new Float32Array([0, y, 0])
  );
 */
    this.engine.device.queue.writeBuffer(
      processingOptionsBuffer,
      0,
      new Float32Array([0, 0, 0])
    );
    {
      //generate
      const encoder = this.engine.device.createCommandEncoder({
        label: "compute builtin encoder",
      });
      const pass = encoder.beginComputePass({
        label: "compute builtin pass",
      });
      pass.setPipeline(pipeline);
      pass.setBindGroup(0, bindGroup);
      pass.dispatchWorkgroups(16, 16, 1);
      pass.end();

      const commandBuffer = encoder.finish();
      this.engine.device.queue.submit([commandBuffer]);
      await this.engine.device.queue.onSubmittedWorkDone();
    }

    {
      //sun light fill
      this.engine.device.queue.writeBuffer(
        processingOptionsBuffer,
        0,
        new Float32Array([1, 128, 0])
      );
      await this.engine.device.queue.onSubmittedWorkDone();
      const encoder = this.engine.device.createCommandEncoder({
        label: "compute builtin encoder",
      });
      const pass = encoder.beginComputePass({
        label: "compute builtin pass",
      });
      pass.setPipeline(pipeline);
      pass.setBindGroup(0, bindGroup);
      pass.dispatchWorkgroups(256, 256, 1);
      pass.end();

      const commandBuffer = encoder.finish();
      this.engine.device.queue.submit([commandBuffer]);
      await this.engine.device.queue.onSubmittedWorkDone();
    }

    //sun light flood
    await (() => {
      console.log("START SUN PROCESSING");

      return new Promise((resolve) => {
        let y = 1;
        let passNum = 0;

        const run = async () => {
          if (y == 0) {
            passNum++;
            if (passNum > 30) {
              resolve(true);
              console.log("COMPUTE IS ALL DONE");
              return;
            } else {
              y = 1;
              console.log("COMPUTE PASS START", { passNum, y });
            }
          }

          this.engine.device.queue.writeBuffer(
            processingOptionsBuffer,
            0,
            new Float32Array([2, y, 0])
          );
          await this.engine.device.queue.onSubmittedWorkDone();
          const encoder = this.engine.device.createCommandEncoder({
            label: "compute builtin encoder",
          });
          const pass = encoder.beginComputePass({
            label: "compute builtin pass",
          });
          pass.setPipeline(pipeline);
          pass.setBindGroup(0, bindGroup);
          pass.dispatchWorkgroups(256, 256, 1);
          pass.end();

          const commandBuffer = encoder.finish();
          this.engine.device.queue.submit([commandBuffer]);
          await this.engine.device.queue.onSubmittedWorkDone();

          setTimeout(() => {
            y--;
            run();
          }, 0);
        };
        run();
      });
    })();

    const encoder = this.engine.device.createCommandEncoder({
      label: "compute builtin encoder",
    });
    encoder.copyBufferToBuffer(
      worldDataWriteBuffer,
      0,
      worldDataReadBuffer,
      0,
      size
    );
    const commandBuffer = encoder.finish();
    this.engine.device.queue.submit([commandBuffer]);
    await this.engine.device.queue.onSubmittedWorkDone();

    // Finish encoding and submit the commands

    // Read the results
    await Promise.all([worldDataReadBuffer.mapAsync(GPUMapMode.READ)]);

    const finalWorldData = new Uint32Array(
      worldDataReadBuffer.getMappedRange()
    );
    console.log(finalWorldData);

    worldSABView.set(finalWorldData);
    await this.loadIntoWorld(run.start, worldSAB);
  }

  worldSun(finalWorldData: Uint32Array) {}
}

export async function GenerateWorld(canvas: any) {
  const DVEW = DivineVoxelEngineWorld.instance;
  const gpuGen = new GPUWorldGen();
  await gpuGen.init();
  const t1 = performance.now();
  await gpuGen.generate({
    start: [-128, 0, -128],
    code: /* rust */ `
//put code here      
let minY: f32 = 10;

var chunk_type: f32 = 1;
if(column_position.x % 2 == 1 || column_position.z % 2 == 1) {
  chunk_type = 0;
}

for (var x = column_position.x; x < column_position.x + voxel_world.column_size.x; x += 1.) {
  for (var z = column_position.z; z < column_position.z + voxel_world.column_size.z; z += 1.) {
    for (var y = 0.; y < voxel_world.column_size.y; y += 1.) {
         let rx = x - column_position.x;
         let ry = y - column_position.y;
         let rz = z - column_position.z;
          if (y > minY + 1){ 
            break;
          }

          if (y == 0) {
            set_voxel(
              vec3(x,y,z),
              Voxel(
                ${VoxelPaletteReader.id.numberFromString("dve_dream_stone")},
                0,
                Light(0,0,0,0),
                State(0,0,0)
              )
            );
            continue;
          }
          if(chunk_type == 0) {
          if (
            x == column_position.x ||
            z == column_position.z ||
            x == column_position.x + voxel_world.column_size.x - 1 ||
            z == column_position.z + voxel_world.column_size.z - 1
          ) {
            set_voxel(
              vec3(x,y,z),
              Voxel(
                ${VoxelPaletteReader.id.numberFromString("dve_dream_stone")},
                0,
                Light(0,0,0,0),
                State(0,0,0)
              )
            );
            continue;
          }

          if (y >= minY - 10 && y <= minY) {
            set_voxel(
              vec3(x,y,z),
              Voxel(
                ${VoxelPaletteReader.id.numberFromString(
                  "dve_liquid_dream_ether"
                )},
                0,
                Light(0,0,0,0),
                State(15,0,0)
              )
            );
          }
        }
        if(chunk_type == 1) {
          if (rx == 0 || rz == 0 || rx == 15 || rz == 15) {
     
            if (y == minY) {
              set_voxel(
                vec3(x,y,z),
                Voxel(
                ${VoxelPaletteReader.id.numberFromString("dve_dream_lamp")},
                0,
                Light(0,15,0,15),
                State(0,0,0)
                )
              );
              /*
              if (Math.random() > 0.8) {
                set_voxel(
                vec3(x,y + 1,z),
                Voxel(
                ${VoxelPaletteReader.id.numberFromString("dve_dream_stone")},
                0,
                Light(0,0,0,0),
                State(0,0,0)
                )
              );
 
              }
              */
            }
          }
          if (rx == 1 || rz == 1 || rx == 14 || rz == 14) {
            if (y == minY - 1) {
              set_voxel(
                vec3(x,y,z),
                Voxel(
                ${VoxelPaletteReader.id.numberFromString("dve_dream_stone")},
                0,
                Light(0,0,0,0),
                State(0,0,0)
                )
              );
               /*
              if (Math.random() > 0.8) {
                set_voxel(
                vec3(x,y + 1,z),
                Voxel(
                  ${VoxelPaletteReader.id.numberFromString("dve_dream_grass")},
                0,
                Light(0,0,0,0),
                State(0,0,0)
                )
              );
 
              }
              */
            }
        }
          if (rx == 2 || rz == 2 || rx == 13 || rz == 13) {
            if (y == minY - 2) {
              set_voxel(
                vec3(x,y,z),
                Voxel(
                ${VoxelPaletteReader.id.numberFromString("dve_dream_stone")},
                0,
                Light(0,0,0,0),
                State(0,0,0)
                )
              );
               /*
              if (Math.random() > 0.8) {
                set_voxel(
                vec3(x,y + 1,z),
                Voxel(
                  ${VoxelPaletteReader.id.numberFromString("dve_dream_grass")},
                0,
                Light(0,0,0,0),
                State(0,0,0)
                )
              );
 
              }
              */
            }
          }
          if (rx == 3 || rz == 3 || rx == 12 || rz == 12) {
            if (y == minY - 3) {
              set_voxel(
                vec3(x,y,z),
                Voxel(
                ${VoxelPaletteReader.id.numberFromString("dve_dream_stone")},
                0,
                Light(0,0,0,0),
                State(0,0,0)
                )
              );
               /*
              if (Math.random() > 0.8) {
                set_voxel(
                vec3(x,y + 1,z),
                Voxel(
                  ${VoxelPaletteReader.id.numberFromString("dve_dream_grass")},
                0,
                Light(0,0,0,0),
                State(0,0,0)
                )
              );
 
              }
              */
            }
          }
          if (rx == 4 || rz == 4 || rx == 11 || rz == 11) {
            if (y == minY - 4) {
              set_voxel(
                vec3(x,y,z),
                Voxel(
                ${VoxelPaletteReader.id.numberFromString("dve_dream_stone")},
                0,
                Light(0,0,0,0),
                State(0,0,0)
                )
              );
               /*
              if (Math.random() > 0.8) {
                set_voxel(
                vec3(x,y + 1,z),
                Voxel(
                  ${VoxelPaletteReader.id.numberFromString("dve_dream_grass")},
                0,
                Light(0,0,0,0),
                State(0,0,0)
                )
              );
 
              }
              */
            }
          }
          if (rx == 5 || rz == 5 || rx == 10 || rz == 10) {
            if (y == minY - 5) {
              set_voxel(
                vec3(x,y,z),
                Voxel(
                ${VoxelPaletteReader.id.numberFromString("dve_dream_stone")},
                0,
                Light(0,0,0,0),
                State(0,0,0)
                )
              );
               /*
              if (Math.random() > 0.8) {
                set_voxel(
                vec3(x,y + 1,z),
                Voxel(
                  ${VoxelPaletteReader.id.numberFromString("dve_dream_grass")},
                0,
                Light(0,0,0,0),
                State(0,0,0)
                )
              );
 
              }
              */
            }
          }
          if (rx == 6 || rz == 6 || rx == 9 || rz == 9) {
            if (y == minY - 6) {
              set_voxel(
                vec3(x,y,z),
                Voxel(
                ${VoxelPaletteReader.id.numberFromString("dve_dream_stone")},
                0,
                Light(0,0,0,0),
                State(0,0,0)
                )
              );
               /*
              if (Math.random() > 0.8) {
                set_voxel(
                vec3(x,y + 1,z),
                Voxel(
                  ${VoxelPaletteReader.id.numberFromString("dve_dream_grass")},
                0,
                Light(0,0,0,0),
                State(0,0,0)
                )
              );
 
              }
              */
            }
          }

          if (y < minY - 7) {
            set_voxel(
                vec3(x,y,z),
                Voxel(
                ${VoxelPaletteReader.id.numberFromString("dve_dream_stone")},
                0,
                Light(0,0,0,0),
                State(0,0,0)
                )
              );
               /*
              if (Math.random() > 0.8) {
                set_voxel(
                vec3(x,y + 1,z),
                Voxel(
                  ${VoxelPaletteReader.id.numberFromString("dve_dream_grass")},
                0,
                Light(0,0,0,0),
                State(0,0,0)
                )
              );
 
              }
              */
          }
        }
    }
  }
}
`,
  });
  console.log("GEN IS DONE", performance.now() - t1);
  const numChunks = 8;
  let startX = -16 * numChunks;
  let startZ = -16 * numChunks;
  let endX = 16 * numChunks;
  let endZ = 16 * numChunks;

  const builder = DVEW.getBuilder();
  console.log("start build");
  for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
      builder.setXZ(x, z).buildColumn();
    }
  }
  console.log("end  build");
  /* 

  const tasks = DVEW.getTasksTool();
  tasks.setFocalPoint(["main", 0, 0, 0]);
  const t1 = performance.now();
  for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
   //   WorldGen.generateWorldColumn(x, z);
      tasks.worldSun.queued.add(["main", x, 0, z]);
    }
  }

  console.log("gen time", performance.now() - t1);
  const t2 = performance.now();
  //await ComputeTest(canvas);

  await tasks.worldSun.queued.runAndAwait();
  console.log("sun light time ", performance.now() - t2);

  for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
      builder.setXZ(x, z).buildColumn();
    }
  }  */
}
