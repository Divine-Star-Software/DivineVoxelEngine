export class SkyShaders {
    static Functions = /* glsl */ `

vec3 getSkyColor(vec3 fogColor) {
    float heightBlend = smoothstep(scene_skyOptions.x, scene_skyOptions.z, worldPOS.y);
    return  mix(fogColor, scene_skyColor, heightBlend);
}

vec4 blendSkyColor(vec3 skyColor, vec4 baseColor) {
    if(vDistance > scene_skyShadeOptions.y) {
        return vec4( skyColor, 1.);
    }
    float blendFactor = smoothstep(scene_skyShadeOptions.x, scene_skyShadeOptions.y, vDistance);
    return vec4( mix(baseColor.rgb, skyColor, blendFactor), baseColor.a);
}


      `;

  }
  