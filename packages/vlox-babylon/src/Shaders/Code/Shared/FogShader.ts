export class FogShaders {
    static Functions = /* glsl */ `
float ExponentialFog() {
    float fogDensity = scene_fogOptions.y;
    float fogCoeff = exp(-scene_fogOptions.w * fogDensity);
    return clamp(fogCoeff, 0.0, 1.0);
}

float VolumetricFog( float fogDensity) {
 
    vec3 fogOrigin = cameraPosition;
    vec3 fogDirection = normalize(worldPOS - fogOrigin);
    float fogDepth = vDistance;
    fogDepth *= mix(1.0, 1.0, clamp((fogDepth - 5000.0) / 5000.0, 0., 1.));
    fogDepth *= fogDepth;
    float heightFactor = scene_fogOptions.z;
    float fogFactor = heightFactor * exp(-fogOrigin.y * fogDensity)
        * (1.0 - exp(-fogDepth * fogDirection.y * fogDensity)) 
        / fogDirection.y;
    fogFactor = clamp(fogFactor, 0., 1.);
    return fogFactor;
}

float AnimatedVolumetricFog( float fogDensity) {
   
    float fogTime = scene_time * 0.01;
    vec3 fogOrigin = cameraPosition;
    vec3 fogDirection = normalize(worldPOS - fogOrigin);
    float fogDepth = vDistance;

    // Simple noise approach (assuming fbm3 is defined elsewhere)
    vec3 noiseSampleCoord = worldPOS * 0.00025 + vec3(0.0, 0.0, fogTime * 0.025);
    float noiseSample = fbm3(noiseSampleCoord + fbm3(noiseSampleCoord)) * 0.5 + 0.5;

    // Modulate fog depth
    fogDepth *= mix(noiseSample, 1.0, clamp((fogDepth - 5000.0) / 5000.0, 0., 1.));
    fogDepth *= fogDepth;

    float heightFactor = scene_fogOptions.z;
    float fogFactor = heightFactor * exp(-fogOrigin.y * fogDensity)
        * (1.0 - exp(-fogDepth * fogDirection.y * fogDensity))
        / fogDirection.y;
    fogFactor = clamp(fogFactor, 0., 1.);
    return fogFactor;
}

vec3 getFogColor() {
    if(scene_fogShadeOptions.x == 1.) return scene_fogColor;

    float fogMulti = smoothstep(scene_skyOptions.y, scene_skyOptions.x, worldPOS.y);
    return scene_fogColor * fogMulti;
}

vec4 blendFog(vec3 sceneFogColor, vec4 base) {
    if(scene_fogOptions.x == 0.){ 
        return base;
    }
    float fogFactor = 0.;
    float finalFogDensity = scene_fogOptions.y;
    switch (int(scene_fogOptions.x)) {
        case 1:
            fogFactor = ExponentialFog();
            break;
        case 2:
            fogFactor = VolumetricFog(finalFogDensity);
            break;
        case 3:
            fogFactor = AnimatedVolumetricFog(finalFogDensity);
            break;
    }

    if(vDistance > scene_fogShadeOptions.z) {
        return vec4(sceneFogColor,1.);
    }
    float blendFactor = smoothstep(scene_fogShadeOptions.y - 50., scene_fogShadeOptions.y, vDistance);
    vec4 fogColor = vec4(mix(base.rgb, sceneFogColor, fogFactor),base.a);
    return mix(base,fogColor,blendFactor);
}

      `;

  }
  