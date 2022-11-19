//https://docs.godotengine.org/en/3.0/tutorials/3d/vertex_displacement_with_shaders.html
export const skyboxShaders = {
    fragMain: `
          vec3 c = vFogColor.rgb;
          c.r -= .2;
          c.g -= .2;
          c.b -= .2;

          vec4 skyboxColor = vec4(c.rgb,1);
          vec3 finalColor = doFog(skyboxColor);
           
          gl_FragColor = vec4(finalColor.rgb,1);
     
          `,
};
