class BlackAndWhitePluginMaterial extends BABYLON.MaterialPluginBase {
    constructor(material : BABYLON.StandardMaterial) {
      // the second parameter is the name of this plugin.
      // the third one is a priority, which lets you define the order multiple plugins are run. Lower numbers run first.
      // the fourth one is a list of defines used in the shader code.
      super(material, "BlackAndWhite", 200, { BLACKANDWHITE: false });
  
      // let's enable it by default
      this._enable(true);
    }
  
    // Also, you should always associate a define with your plugin because the list of defines (and their values)
    // is what triggers a recompilation of the shader: a shader is recompiled only if a value of a define changes.
    prepareDefines(defines : any, scene : any, mesh : any) {
      defines["BLACKANDWHITE"] = true;
    }
  
    getClassName() {
      return "BlackAndWhitePluginMaterial";
    }
  
    getCustomCode(shaderType : any) {
      if (shaderType === "fragment") {
        // we're adding this specific code at the end of the main() function
        return {
          CUSTOM_FRAGMENT_MAIN_END: `
                      float luma = gl_FragColor.r*0.299 + gl_FragColor.g*0.587 + gl_FragColor.b*0.114;
                      gl_FragColor = vec4(luma, luma, luma, 1.0);
                  `,
          
        };
      }
      // for other shader types we're not doing anything, return null
      return null;
    }
  }