import { DVEFWorldCore } from "@divinevoxel/foundation/Contexts/World/DVEFWorldCore";
import { WorldLock } from "@divinevoxel/foundation/Contexts/World/Lock/WorldLock";
import { Vec3Array, Flat3DIndex } from "@amodx/math";
//import { NoiseShaders, PaerlinNoise } from "./NoiseShader";
import { SeededGPUPerlin } from "./SeededGPUPerlin";
import { ComputeEngine } from "./ComputeEngine";
import { ComputeVoxelWorld, Constants } from "./ComputerVoxelWorld";

import { BrushTool } from "@divinevoxel/foundation/Default/Tools/Brush/Brush";

class TemplateConstats {
  static get TEMPLATE_VOXEL_BYTE_SIZE() {
    //constants
    const directionsTotal = 6;
    const lightDataByteSize = 2;
    const aoDataByteSize = 0.5;
    const levelDataSize = 0.5;
    const quadDataSize = 4;
    let total = 0;
    //segment 1 [1 u32]
    {
      //2 bytes for id
      total += 2;
      //2 bytes for second id
      total += 2;
    }
    //segment 2 [1 u32]
    {
      //1 byte for exposed caces
      total += 1;
      //level array
      total += levelDataSize * quadDataSize;
    }
    //segment 3 [12 u32 numbers]
    {
      //light array | 4 light data sets for each direction
      total += directionsTotal * lightDataByteSize * quadDataSize;
    }
    //segment 4 [3 u32 numbers]
    {
      //ao array  | 4 ao data sets for each direction
      total += directionsTotal * aoDataByteSize * quadDataSize;
    }
    //add one byte buffer to round it out
    total++;

    console.log("TOTAL TEMPLATE BYTE SIZE", total);
    return total;
  }
  static PROCESSING_X = 64;
  static PROCESSING_Y = 128;
  static PROCESSING_Z = 64;

  static get TEMPLATE_SIZE() {
    return (
      this.TEMPLATE_VOXEL_BYTE_SIZE *
      this.PROCESSING_X *
      this.PROCESSING_Y *
      this.PROCESSING_Z
    );
  }
}

export class GPUWorldGen {
  static Shaders = {
    GET_WORLD_GEN: (genFunction: string, gen: GPUWorldGen) => {
      const VoxelLightProgatation = /* rust */ `
  
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
  `;

      const ChunkTemplate = /* rust */ `

  struct CheckSetQuad {
    p1: array<f32,9>,
    p2: array<f32,9>,
    p3: array<f32,9>,
    p4: array<f32,9>,
  }

  struct GradientCheckSets { 
    up: CheckSetQuad,
    down: CheckSetQuad,
    west: CheckSetQuad,
    east: CheckSetQuad,
    north: CheckSetQuad,
    south: CheckSetQuad
  }


  const GradientCheckSet = 
  GradientCheckSets(
    //up
    CheckSetQuad(
      array<f32,9>(-1, 1, 0, 0, 1, -1, -1, 1, -1),
      array<f32,9>(-1, 1, 0, 0, 1, 1, -1, 1, 1),
      array<f32,9>(1, 1, 0, 0, 1, 1, 1, 1, 1),
      array<f32,9>(1, 1, 0, 0, 1, -1, 1, 1, -1)
    ),
    //down
    CheckSetQuad(
      array<f32,9>(0, -1, -1, -1, -1, 0, -1, -1, -1),
      array<f32,9>(0, -1, -1, 1, -1, 0, 1, -1, -1),
      array<f32,9>(0, -1, 1, 1, -1, 0, 1, -1, 1),
      array<f32,9>(0, -1, 1, -1, -1, 0, -1, -1, 1)
    ),
    //west
    CheckSetQuad(
      array<f32,9>(-1, 0, 1, -1, 1, 0, -1, 1, 1),
      array<f32,9>(-1, 0, -1, -1, 1, 0, -1, 1, -1),
      array<f32,9>(-1, 0, -1, -1, -1, 0, -1, -1, -1),
      array<f32,9>(-1, 0, 1, -1, -1, 0, -1, -1, 1)
    ),
    //east
    CheckSetQuad(
      array<f32,9>(1, 0, -1, 1, 1, 0, 1, 1, -1),
      array<f32,9>(1, 0, 1, 1, 1, 0, 1, 1, 1),
      array<f32,9>(1, 0, 1, 1, -1, 0, 1, -1, 1),
      array<f32,9>(1, 0, -1, 1, -1, 0, 1, -1, -1)
    ),
    //north
    CheckSetQuad(
      array<f32,9>(1, 0, 1, 0, 1, 1, 1, 1, 1),
      array<f32,9>(-1, 0, 1, 0, 1, 1, -1, 1, 1),
      array<f32,9>(-1, 0, 1, 0, -1, 1, -1, -1, 1),
      array<f32,9>(1, 0, 1, 0, -1, 1, 1, -1, 1)
    ),
    //south
    CheckSetQuad(
      array<f32,9>(-1, 0, -1, 0, 1, -1, -1, 1, -1),
      array<f32,9>(1, 0, -1, 0, 1, -1, 1, 1, -1),
      array<f32,9>(1, 0, -1, 0, -1, -1, 1, -1, -1),
      array<f32,9>(-1, 0, -1, 0, -1, -1, -1, -1, -1)
    )
  );

  const TEMPLATE_BUFFER_BOUNDS = vec3<f32>(
        ${TemplateConstats.PROCESSING_X},
        ${TemplateConstats.PROCESSING_Y},
        ${TemplateConstats.PROCESSING_Z}
  );
  fn get_voxel_template_index_from_position(position: vec3<f32>) -> f32 {
      return get_index_from_position(
        vec3(
          position.x - processingOptions.y,
          position.y,
          position.z - processingOptions.z
        ),  
        TEMPLATE_BUFFER_BOUNDS
      );
  }


  fn get_voxel_raw_template(position: vec3<f32>) -> TEMPLATE_DATA_STRUCT {
    return TEMPLATE_DATA[
      u32(get_voxel_template_index_from_position(position))
    ];
  } 

  fn set_voxel_raw_template(position: vec3<f32>, voxel: TEMPLATE_DATA_STRUCT) {
    let voxel_index = get_voxel_template_index_from_position(position);
    TEMPLATE_DATA[u32(voxel_index)] = voxel;
  }

  const two_byte_mask: u32 = 0xffff;
  const byte_mask: u32 = 0xff;
  const nibble_mask: u32 = 0xf;
  fn update_voxel_raw_template(position: vec3<f32>,voxel_template: VoxelTemplate) {
    var raw_template = get_voxel_raw_template(position);
    raw_template.segment_1 = voxel_template.id;
    raw_template.segment_1 = 
    (raw_template.segment_1 & ~(two_byte_mask << 16)) | (voxel_template.secondary_id  << 16);

    var face_byte: u32 = 0;
    if(voxel_template.faces.up) {
      face_byte |= 1 << 0;
    }
    if(voxel_template.faces.down) {
      face_byte |= 1 << 1;
    }
    if(voxel_template.faces.west) {
      face_byte |= 1 << 2;
    }
    if(voxel_template.faces.east) {
      face_byte |= 1 << 3;
    }
    if(voxel_template.faces.north) {
      face_byte |= 1 << 4;
    }
    if(voxel_template.faces.south) {
      face_byte |= 1 << 5;
    }
    raw_template.segment_2 = 
    (raw_template.segment_2 & ~(byte_mask << 0)) | (face_byte  << 0);

    //encode light
    //up
    { 
      raw_template.segment_3[0] = encode_light(voxel_template.light.up.p1);
      raw_template.segment_3[0] = 
      (raw_template.segment_3[0] & ~(two_byte_mask << 16)) 
      | (encode_light(voxel_template.light.up.p2)  << 16);
    }
    {    
      raw_template.segment_3[1] = encode_light(voxel_template.light.up.p3);
      raw_template.segment_3[1] = 
      (raw_template.segment_3[1] & ~(two_byte_mask << 16)) 
      | (encode_light(voxel_template.light.up.p4)  << 16);
    }

    //down
    { 
      raw_template.segment_3[2] = encode_light(voxel_template.light.down.p1);
      raw_template.segment_3[2] = 
      (raw_template.segment_3[2] & ~(two_byte_mask << 16)) 
      | (encode_light(voxel_template.light.down.p2)  << 16);
    }
    {    
      raw_template.segment_3[3] = encode_light(voxel_template.light.down.p3);
      raw_template.segment_3[3] = 
      (raw_template.segment_3[3] & ~(two_byte_mask << 16)) 
      | (encode_light(voxel_template.light.down.p4)  << 16);
    }

    //west
    { 
      raw_template.segment_3[4] = encode_light(voxel_template.light.west.p1);
      raw_template.segment_3[4] = 
      (raw_template.segment_3[4] & ~(two_byte_mask << 16)) 
      | (encode_light(voxel_template.light.west.p2)  << 16);
    }
    {    
      raw_template.segment_3[5] = encode_light(voxel_template.light.west.p3);
      raw_template.segment_3[5] = 
      (raw_template.segment_3[5] & ~(two_byte_mask << 16)) 
      | (encode_light(voxel_template.light.west.p4)  << 16);
    }
    
    //east
    { 
      raw_template.segment_3[6] = encode_light(voxel_template.light.east.p1);
      raw_template.segment_3[6] = 
      (raw_template.segment_3[6] & ~(two_byte_mask << 16)) 
      | (encode_light(voxel_template.light.east.p2)  << 16);
    }
    {    
      raw_template.segment_3[7] = encode_light(voxel_template.light.east.p3);
      raw_template.segment_3[7] = 
      (raw_template.segment_3[7] & ~(two_byte_mask << 16)) 
      | (encode_light(voxel_template.light.east.p4)  << 16);
    }

    //north
    { 
      raw_template.segment_3[8] = encode_light(voxel_template.light.north.p1);
      raw_template.segment_3[8] = 
      (raw_template.segment_3[8] & ~(two_byte_mask << 16)) 
      | (encode_light(voxel_template.light.north.p2)  << 16);
    }
    {    
      raw_template.segment_3[9] = encode_light(voxel_template.light.north.p3);
      raw_template.segment_3[9] = 
      (raw_template.segment_3[9] & ~(two_byte_mask << 16)) 
      | (encode_light(voxel_template.light.north.p4)  << 16);
    }

    //south
    { 
      raw_template.segment_3[10] = encode_light(voxel_template.light.south.p1);
      raw_template.segment_3[10] = 
      (raw_template.segment_3[10] & ~(two_byte_mask << 16)) 
      | (encode_light(voxel_template.light.south.p2)  << 16);
    }
    {    
      raw_template.segment_3[11] = encode_light(voxel_template.light.south.p3);
      raw_template.segment_3[11] = 
      (raw_template.segment_3[11] & ~(two_byte_mask << 16)) 
      | (encode_light(voxel_template.light.south.p4)  << 16);
    }

    //encode AO
    { 
      raw_template.segment_4[0] = encode_ao(voxel_template.ao.up);
      raw_template.segment_4[0] = 
      (raw_template.segment_4[0] & ~(two_byte_mask << 16)) 
      | (encode_ao(voxel_template.ao.down) << 16);
    }
    { 
      raw_template.segment_4[1] = encode_ao(voxel_template.ao.west);
      raw_template.segment_4[1] = 
      (raw_template.segment_4[1] & ~(two_byte_mask << 16)) 
      | (encode_ao(voxel_template.ao.east) << 16);
    }
    { 
      raw_template.segment_4[2] = encode_ao(voxel_template.ao.north);
      raw_template.segment_4[2] = 
      (raw_template.segment_4[2] & ~(two_byte_mask << 16)) 
      | (encode_ao(voxel_template.ao.south) << 16);
    }

    set_voxel_raw_template(position,raw_template);

  }

  fn encode_ao(quad:AOQuad) -> u32 {
    var data: u32 = 0;
     data = (data & ~nibble_mask) | quad.p1;
     data = (data & ~(nibble_mask << 4)) | (quad.p2 << 4);
     data = (data & ~(nibble_mask << 8)) | (quad.p3 << 8);
     data = (data & ~(nibble_mask << 12)) | (quad.p4 << 12);
     return data;
  }


  fn clear_voxel_raw_template(position: vec3<f32>) {
    var raw_template = get_voxel_raw_template(position);
    raw_template.segment_1 = 0;
    raw_template.segment_2 = 0;

    for(var i = 0; i < 12; i++) {
      raw_template.segment_3[i] = 0;
    }
    
    for(var i = 0; i < 3; i++) {
      raw_template.segment_4[i] = 0;
    }

    set_voxel_raw_template(position,raw_template);
  }

  //light gradient
  struct LightQuad {
    p1: Light,
    p2: Light,
    p3: Light,
    p4: Light
  }

  struct AOQuad {
    p1: u32,
    p2: u32,
    p3: u32,
    p4: u32
  }


  //voxel template
  struct VoxelAOTemplate {
    up: AOQuad,
    down: AOQuad,
    west: AOQuad,
    east: AOQuad,
    north: AOQuad,
    south: AOQuad
  }

  struct VoxelLightTemplate {
    up: LightQuad,
    down: LightQuad,
    west: LightQuad,
    east: LightQuad,
    north: LightQuad,
    south: LightQuad
  }

  struct VoxelExposedFacesTemplate {
    up: bool,
    down: bool,
    west: bool,
    east: bool,
    north: bool,
    south: bool
  }

  struct VoxelTemplate {
    id: u32,
    secondary_id: u32,
    light: VoxelLightTemplate,
    ao: VoxelAOTemplate,
    faces: VoxelExposedFacesTemplate,
  }

  fn get_light_quad() -> LightQuad {
    return LightQuad(
      Light(0,0,0,0),
      Light(0,0,0,0),
      Light(0,0,0,0),
      Light(0,0,0,0)
    );
  }

  fn get_ao_quad() -> AOQuad {
    return AOQuad(
      1,
      1,
      1,
      1,
    );
  }

  fn get_voxel_light_template() -> VoxelLightTemplate {
    return VoxelLightTemplate(
      get_light_quad(),
      get_light_quad(),
      get_light_quad(),
      get_light_quad(),
      get_light_quad(),
      get_light_quad(),
    );
  }

  fn get_voxel_ao_template() -> VoxelAOTemplate {
    return VoxelAOTemplate(
      get_ao_quad(),
      get_ao_quad(),
      get_ao_quad(),
      get_ao_quad(),
      get_ao_quad(),
      get_ao_quad()
    );
  }

  fn get_voxel_exposed_faces() -> VoxelExposedFacesTemplate {
    return VoxelExposedFacesTemplate(
     false,
     false,
     false,
     false,
     false,
     false
    );
  }

  fn get_voxel_template() -> VoxelTemplate {
    return VoxelTemplate(
    0,
    0,
    get_voxel_light_template(),
    get_voxel_ao_template(),
    get_voxel_exposed_faces()
    );
  }

  fn is_voxel_renerable(voxel: Voxel) -> bool {
    if(voxel.id < 2) {return false;}
    return true;
  }


  fn is_voxel_face_exposed(direction: vec3<f32>,position: vec3<f32>) -> bool {
    var check_position = vec3<f32>(
      direction.x + position.x, direction.y + position.y, direction.z + position.z
    );

    if(!is_in_bounds(check_position)){
      return true;
    }

    var other_voxel = get_voxel(check_position);

    if(!is_voxel_renerable(other_voxel)) {
      return true;
    }

    return false;
  }

 struct LightGradientCheckSetProcessResult {
  ao: u32,
  light: Light
 }

  fn process_voxel_light_gradient_checkset(
    position:  vec3<f32>,
    voxel: Voxel, 
    light: Light,
    ao: u32,
    check_set: array<f32,9>
  ) -> LightGradientCheckSetProcessResult {

    var result = LightGradientCheckSetProcessResult(
      ao,Light(voxel.light.sun,voxel.light.red,voxel.light.green,voxel.light.blue)
    );

  
    for (var i = 0; i < 9; i += 3) {
        let check_position = vec3(
          position.x + check_set[i],
          position.y + check_set[i + 1],
          position.z + check_set[i + 2]
        );
        
        if(!is_in_bounds(check_position)){
            continue;
        }

        var check_voxel = get_voxel(check_position);

        if(is_voxel_renerable(check_voxel)){
          result.ao += 1;
        }
        if(check_voxel.light.sun > result.light.sun) {
          result.light.sun += 1;
        }
        if(check_voxel.light.red > result.light.red) {
          result.light.red += 1;
        }
        if(check_voxel.light.green > result.light.green) {
          result.light.green += 1;
        }
        if(check_voxel.light.blue > result.light.blue) {
          result.light.blue += 1;
        }
   }

   return result;
  }

  struct LightGradientProcessResult {
    light: LightQuad, 
    ao: AOQuad, 
 }

  fn process_voxel_light_gradient(
    position:  vec3<f32>,
    direction: vec3<f32>,
    voxel: Voxel, 
    check_set_quad: CheckSetQuad,
  ) -> LightGradientProcessResult {

    var ao_quad = get_ao_quad();
    var light_quad = get_light_quad();
    var light_voxel = get_voxel(
      vec3(
        position.x + direction.x, 
        position.y + direction.y, 
        position.z + direction.z
      )
    );
    if(light_voxel.light.red < voxel.light.red ) {
      light_voxel.light.red = voxel.light.red;
    }
    if(light_voxel.light.green < voxel.light.green ) {
      light_voxel.light.green = voxel.light.green;
    }
    if(light_voxel.light.blue < voxel.light.blue ) {
      light_voxel.light.blue = voxel.light.blue;
    }
    var p1_result = process_voxel_light_gradient_checkset(
      position,light_voxel,light_quad.p1,ao_quad.p1,check_set_quad.p1
    );
    light_quad.p1 = p1_result.light;
    ao_quad.p1 = p1_result.ao;

    var p2_result = process_voxel_light_gradient_checkset(
      position,light_voxel,light_quad.p2,ao_quad.p2,check_set_quad.p2
    );
    light_quad.p2 = p2_result.light;
    ao_quad.p2 = p2_result.ao;

    var p3_result = process_voxel_light_gradient_checkset(
      position,light_voxel,light_quad.p3,ao_quad.p3,check_set_quad.p3
    );
    light_quad.p3 = p3_result.light;
    ao_quad.p3 = p3_result.ao;

    var p4_result = process_voxel_light_gradient_checkset(
      position,light_voxel,light_quad.p4,ao_quad.p4,check_set_quad.p4
    );
    light_quad.p4 = p4_result.light;
    ao_quad.p4 = p4_result.ao;

    return LightGradientProcessResult(
      light_quad,ao_quad
    );
  }

  fn process_voxel(position: vec3<f32>) -> f32 {

    var voxel = get_voxel(position);

    if(!is_voxel_renerable(voxel)) {
      clear_voxel_raw_template(position);
      return 0;
    }

    var voxel_template = get_voxel_template();

    voxel_template.id = voxel.id;
    voxel_template.secondary_id = voxel.secondary_id;

    //up
    if(
      is_voxel_face_exposed(vec3(0,1,0),position)
    ) {
      voxel_template.faces.up = true;
      let results = process_voxel_light_gradient(
        position,
        vec3(0,1,0),
        voxel,
        GradientCheckSet.up
      );
      voxel_template.light.up = results.light;
      voxel_template.ao.up = results.ao;
    }
    //down
    if(
      is_voxel_face_exposed(vec3(0,-1,0),position)
    ) {
      voxel_template.faces.down = true;
      let results = process_voxel_light_gradient(
        position,
        vec3(0,-1,0),
        voxel,
        GradientCheckSet.down
      );
      voxel_template.light.down = results.light;
      voxel_template.ao.down = results.ao;
    }
    //west
    if(
      is_voxel_face_exposed(vec3(-1,0,0),position)
    ) {
      voxel_template.faces.west = true;
      let results = process_voxel_light_gradient(
        position,
        vec3(-1,0,0),
        voxel,
        GradientCheckSet.west
      );
      voxel_template.light.west = results.light;
      voxel_template.ao.west = results.ao;
    }
   //east
   if(
      is_voxel_face_exposed(vec3(1,0,0),position)
    ) {
      voxel_template.faces.east = true;
      let results = process_voxel_light_gradient(
        position,
        vec3(1,0,0),
        voxel,
        GradientCheckSet.east
      );
      voxel_template.light.east = results.light;
      voxel_template.ao.east = results.ao;
    }
   //north
   if(
      is_voxel_face_exposed(vec3(0,0,1),position)
    ) {
      voxel_template.faces.north = true;
      let results = process_voxel_light_gradient(
        position,
        vec3(0,0,1),
        voxel,
        GradientCheckSet.north
      );
      voxel_template.light.north = results.light;
      voxel_template.ao.north = results.ao;
    }
   //south
   if(
      is_voxel_face_exposed(vec3(0,0,-1),position)
    ) {
      voxel_template.faces.south = true;
      let results = process_voxel_light_gradient(
        position,
        vec3(0,0,-1),
        voxel,
        GradientCheckSet.south
      );
      voxel_template.light.south = results.light;
      voxel_template.ao.south = results.ao;
    }

  
    update_voxel_raw_template(position,voxel_template);
    return 1; 
  }
  
`;

      return /* wgsl */ `
    @group(0) @binding(0) var<storage, read_write> WORLD_DATA: array<vec2u>;
    
    struct TEMPLATE_DATA_STRUCT {
      segment_1: u32,
      segment_2: u32,
      segment_3: array<u32,12>,
      segment_4: array<u32,3>
    }
    @group(0) @binding(1) var<storage, read_write> TEMPLATE_DATA: array<TEMPLATE_DATA_STRUCT>;
    @group(0) @binding(2) var<uniform> processingOptions: vec3<f32>;
    ${gen.perlinNoise3d.CODE.Binding(0, 3)}
  
    fn generate_column(column_position: vec3<f32>) {
      ${genFunction}
    }
  
    ${gen.perlinNoise3d.CODE.Function()};
  
    ${ComputeVoxelWorld.Shaders.WorldData}
  
    ${VoxelLightProgatation}
    ${ChunkTemplate}
  
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
      } 
      if(processingOptions.x == 3){
        process_voxel(vec3<f32>(
          f32(workgroup_id.x) + processingOptions.y,
          f32(workgroup_id.z),
          f32(workgroup_id.y) + processingOptions.z  
        ));
      }
    }
    `;
    },
  };

  perlinNoise3d = new SeededGPUPerlin();
  engine = new ComputeEngine();
  async init() {
    await this.engine.init();
  }

  brushTool = new BrushTool();
  async loadIntoWorld(start: Vec3Array, worldData: SharedArrayBuffer) {
    const segmentSize = 16;
    const sx = start[0];
    const sz = start[2];
    const ex = start[0] + Constants.PROCESSING_X;
    const ez = start[2] + Constants.PROCESSING_Z;
    const sy = 0;
    const ey = Constants.PROCESSING_Y;

    await WorldLock.addLock(["main", [sx, sy, sz], [ex, ey, ez]]);

    const index = Flat3DIndex.GetXZYOrder();
    index.setBounds(
      Constants.PROCESSING_X,
      Constants.PROCESSING_Y,
      Constants.PROCESSING_Z,
    )

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

    for (let x = sx; x < ex; x += segmentSize) {
      iz = 0;
      for (let z = sz; z < ez; z += segmentSize) {
        segments.push([
          "main",
          [ix, 0, iz],
          [sx + ix, 0, sz + iz],
          [
            sx + ix + segmentSize,
            Constants.PROCESSING_Y,
            sz + iz + segmentSize,
          ],
          worldData,
        ]);
        iz += segmentSize;
      }
      ix += segmentSize;
    }


    await Promise.all(
      segments.map((_) =>
        DVEFWorldCore.instance.threads.constructors.runAsyncTasks("load-in-generated-world-segment", _)
      )
    );

    await WorldLock.removeLock(["main", [sx, sy, sz], [ex, ey, ez]]);
  }
  async generate(run: { start: Vec3Array; code: string }) {

    this.perlinNoise3d.setSeed(123213 / 2);

    const code = GPUWorldGen.Shaders.GET_WORLD_GEN(run.code, this);
    console.log(code);
    const module = this.engine.device.createShaderModule({ code }) as any;

    const pipeline = this.engine.device.createComputePipeline({
      label: "compute pipeline",
      layout: "auto",
      compute: {
        module,
        entryPoint: "computeSomething",
      },
    });

    //  const templateBufferSize =
    const templateBufferSize = TemplateConstats.TEMPLATE_SIZE;

    let usage = GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC;
    const templateDataWriteBuffer = this.engine.device.createBuffer({
      size: templateBufferSize,
      usage,
    });

    usage = GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST;
    const templateDataReadBuffer = this.engine.device.createBuffer({
      size: templateBufferSize,
      usage,
    });

    const worldBufferSize =
      Constants.PROCESSING_SIZE * Constants.VOXEL_32F_SEGMENTS * 4;
    const worldSAB = new SharedArrayBuffer(worldBufferSize);
    const worldSABView = new Uint32Array(worldSAB);
    usage = GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC;
    const worldDataWriteBuffer = this.engine.device.createBuffer({
      size: worldBufferSize,
      usage,
    });

    usage = GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST;
    const worldDataReadBuffer = this.engine.device.createBuffer({
      size: worldBufferSize,
      usage,
    });

    const processingOptionsBuffer = this.engine.device.createBuffer({
      size: 3 * 4,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    console.log("STUTFF", this.perlinNoise3d);
    const perlinPoolUniformBuffer = this.engine.device.createBuffer({
      size: this.perlinNoise3d.randomPoolBuffer.byteLength,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    const bindGroup = this.engine.device.createBindGroup({
      layout: pipeline.getBindGroupLayout(0) as any,

      entries: [
        { binding: 0, resource: { buffer: worldDataWriteBuffer } },
        { binding: 1, resource: { buffer: templateDataWriteBuffer } },
        { binding: 2, resource: { buffer: processingOptionsBuffer } },
        { binding: 3, resource: { buffer: perlinPoolUniformBuffer } },
      ] as any,
    });

    // Encode commands to do the computation

    /*   this.engine.device.queue.writeBuffer(
      processingOptionsBuffer,
      0,
      new Float32Array([0, y, 0])
    );
   */
    console.log("START GEN");
    const t1 = performance.now();
    this.engine.device.queue.writeBuffer(
      processingOptionsBuffer,
      0,
      new Float32Array([0, 0, 0])
    );
    this.engine.device.queue.writeBuffer(
      perlinPoolUniformBuffer,
      0,
      this.perlinNoise3d.randomPool
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
    {
      //light flood
      for (let passes = 0; passes < 30; passes++) {
        this.engine.device.queue.writeBuffer(
          processingOptionsBuffer,
          0,
          new Float32Array([2, 0, 0])
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
    }

    {
      const encoder = this.engine.device.createCommandEncoder({
        label: "compute builtin encoder",
      });
      encoder.copyBufferToBuffer(
        worldDataWriteBuffer,
        0,
        worldDataReadBuffer,
        0,
        worldBufferSize
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
    {
      console.log("START TEMPLATE BUILD");
      const b1 = performance.now();
      const segments: [
        dimension: string,
        index: Vec3Array,
        start: Vec3Array,
        end: Vec3Array,
        sab: SharedArrayBuffer
      ][] = [];
      for (
        let x = 0;
        x < Constants.PROCESSING_X;
        x += TemplateConstats.PROCESSING_X
      ) {
        for (
          let z = 0;
          z < Constants.PROCESSING_Z;
          z += TemplateConstats.PROCESSING_Z
        ) {
          {
            this.engine.device.queue.writeBuffer(
              processingOptionsBuffer,
              0,
              new Float32Array([3, x, z])
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
            pass.dispatchWorkgroups(64, 64, 128);
            pass.end();

            const commandBuffer = encoder.finish();
            this.engine.device.queue.submit([commandBuffer]);
            await this.engine.device.queue.onSubmittedWorkDone();
          }
          {
            const encoder = this.engine.device.createCommandEncoder({
              label: "compute builtin encoder",
            });
            encoder.copyBufferToBuffer(
              templateDataWriteBuffer,
              0,
              templateDataReadBuffer,
              0,
              templateBufferSize
            );
            const commandBuffer = encoder.finish();
            this.engine.device.queue.submit([commandBuffer]);
            await this.engine.device.queue.onSubmittedWorkDone();

            // Finish encoding and submit the commands

            // Read the results
            await Promise.all([
              templateDataReadBuffer.mapAsync(GPUMapMode.READ),
            ]);

            const templateSAB = new SharedArrayBuffer(templateBufferSize);
            const templateSABView = new Uint32Array(templateSAB);

            const finalTemplateData = new Uint32Array(
              templateDataReadBuffer.getMappedRange()
            );

            templateSABView.set(finalTemplateData);
            segments.push([
              "main",
              [0, 0, 0],
              [x + run.start[0], 0, z + run.start[2]],
              [
                x + TemplateConstats.PROCESSING_X + run.start[0],
                TemplateConstats.PROCESSING_Y,
                z + TemplateConstats.PROCESSING_Z + run.start[2],
              ],
              templateSAB,
            ]);
            templateDataReadBuffer.unmap();
          }
        }
      }


      await Promise.all(
        segments.map((_) => DVEFWorldCore.instance.threads.constructors.runAsyncTasks("build-world-template", _))
      );
      //build-world-template
      console.log("END TEMPLATE BUILD", performance.now() - b1);
    }

    console.log("END GEN", performance.now() - t1);
  }

  worldSun(finalWorldData: Uint32Array) {}
}
