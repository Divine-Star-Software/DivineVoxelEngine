export class Constants {
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

export class ComputeVoxelWorld {
  static Shaders = {
    WorldData: /* rust  */ `
    //math

    const directions = array<vec3<f32>, 6>(
        vec3<f32>(1,0,0)
        ,vec3<f32>(-1,0,0)
        ,vec3<f32>(0,0,1)
        ,vec3<f32>(0,0,-1)
        ,vec3<f32>(0,1,0)
        ,vec3<f32>(0,-1,0)
    );
  
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
      if(position.x < 0 || position.x > ${
        Constants.PROCESSING_X
      }){ return false;}
      if(position.y < 0 || position.y > ${
        Constants.PROCESSING_Y
      }){ return false;}
      if(position.z < 0 || position.z > ${
        Constants.PROCESSING_Z
      }){ return false;}
      return true;
    }
    //light 
    struct Light {
      sun: u32,
      red: u32,
      green: u32,
      blue: u32,
    }
    const light_mask: u32 = 0xf;
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
    const segment_mask: u32 = 0xffff;
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
      let voxel_segments = get_voxel_segments(WORLD_DATA[i32(
        get_voxel_index_from_position(position)
      )]);
     return decode_voxel_segments(voxel_segments);
    } 
    
    fn set_voxel(position: vec3<f32>, voxel: Voxel) {
      let voxel_index = get_voxel_index_from_position(position);
      WORLD_DATA[i32(voxel_index)] = voxel_to_raw_data(voxel);
    }
    `,
  };
}
