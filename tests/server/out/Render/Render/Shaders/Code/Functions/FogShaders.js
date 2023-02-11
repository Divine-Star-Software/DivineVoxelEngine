export function RegisterFogShaders(builder) {
    builder.functions.create("ExponentialFog", {
        setID: "#dve_fog",
        inputs: [],
        output: "float",
        arguments: {},
        body: {
            GLSL: () => `
   float fogCoeff = 1.0;
   //float fogDensity = fogOptions.y;
   //fogCoeff = 1.0 / pow(E, fFogDistance * fogDensity);
   return clamp(fogCoeff, 0.0, 1.0);`,
        },
    });
    builder.functions.create("VolumetricFog", {
        setID: "#dve_fog",
        inputs: [],
        output: "float",
        arguments: {},
        body: {
            GLSL: () => `
   float fogDensity = fogOptions.y;
   vec3 fogOrigin = cameraPOS;
   vec3 fogDirection = normalize(worldPOS - fogOrigin);
   float fogDepth = vDistance;
   fogDepth *= mix(1.0, 1.0, clamp((fogDepth - 5000.0) / 5000.0,0.,1.));
   fogDepth *= fogDepth;
   float heightFactor = fogOptions.z;
   float fogFactor = heightFactor * exp(-fogOrigin.y * fogDensity) * (
   1.0 - exp(-fogDepth * fogDirection.y * fogDensity)) / fogDirection.y;
   fogFactor = clamp(fogFactor,0.,1.);
   return fogFactor;`,
        },
    });
    builder.functions.create("AnimatedVolumetricFog", {
        setID: "#dve_fog",
        inputs: [],
        output: "float",
        arguments: {},
        body: {
            GLSL: () => `
   float fogDensity = fogOptions.y;
   float fogTime = time * .5;
   vec3 fogOrigin = cameraPOS;
   vec3 fogDirection = normalize(worldPOS - fogOrigin);
   float fogDepth = vDistance;
   vec3 noiseSampleCoord = worldPOS * 0.00025 + vec3(
   0.0, 0.0, fogTime * 0.025);
   float noiseSample = fbm3(noiseSampleCoord + fbm3(noiseSampleCoord)) * 0.5 + 0.5;
   fogDepth *= mix(noiseSample, 1.0, clamp((fogDepth - 5000.0) / 5000.0,0.,1.));
   fogDepth *= fogDepth;
   float heightFactor = fogOptions.z;
   float fogFactor = heightFactor * exp(-fogOrigin.y * fogDensity) * (
   1.0 - exp(-fogDepth * fogDirection.y * fogDensity)) / fogDirection.y;
   fogFactor = clamp(fogFactor,0.,1.);
   return fogFactor;`,
        },
    });
}
