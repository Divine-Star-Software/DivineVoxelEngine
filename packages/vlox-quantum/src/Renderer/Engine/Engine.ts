export class Engine {
  device: GPUDevice;
  adapter: GPUAdapter;
  context: GPUCanvasContext;
  presentationFormat: GPUTextureFormat;
  constructor(public canvas: HTMLCanvasElement) {}

  async init() {
    const adapter = await navigator.gpu?.requestAdapter();
    const device = (await adapter?.requestDevice({
      requiredFeatures: ["shader-f16"],
      requiredLimits: {
        maxBufferSize: 1073741824, //2000000256,
        maxStorageBufferBindingSize: 1073741824,

        //  2000000256
      },
    })) as any;
    if (!adapter || !device || !navigator.gpu) {
      throw new Error("need a browser that supports WebGPU");
    }

    const context = this.canvas.getContext("webgpu");
    if (!context) {
      throw new Error("error could not create context");
    }

    const observer = new ResizeObserver((entries) => {
      window.requestAnimationFrame(() => {
        for (const entry of entries) {
          const canvas = entry.target as HTMLCanvasElement;
          const width = entry.contentBoxSize[0].inlineSize;
          const height = entry.contentBoxSize[0].blockSize;
          canvas.width = Math.max(
            1,
            Math.min(width, device.limits.maxTextureDimension2D)
          );
          canvas.height = Math.max(
            1,
            Math.min(height, device.limits.maxTextureDimension2D)
          );
          // re-render
          //  render();
        }
      });
    });
    observer.observe(this.canvas);

    this.presentationFormat = navigator.gpu.getPreferredCanvasFormat();
    context.configure({
      device,
      format: this.presentationFormat,
    });

    this.context = context;
    this.device = device;
    this.adapter = adapter as any;

    /*   
   const module = device.createShaderModule({
      label: "our hardcoded red triangle shaders",
      code:  `
      @vertex fn vs(
        @builtin(vertex_index) vertexIndex : u32
      ) -> @builtin(position) vec4f {
        let pos = array(
          vec2f( 0.0,  0.5),  // top center
          vec2f(-0.5, -0.5),  // bottom left
          vec2f( 0.5, -0.5)   // bottom right
        );

        return vec4f(pos[vertexIndex], 0.0, 1.0);
      }

      @fragment fn fs() -> @location(0) vec4f {
        return vec4f(1, 0, 0, 1);
      }
    `,
  });

  const pipeline = device.createRenderPipeline({
    label: "our hardcoded red triangle pipeline",
    layout: "auto",
    vertex: {
      module,
    },
    fragment: {
      module,
      targets: [{ format: this.presentationFormat }],
    },
  });

    const renderPassDescriptor = {
      label: "our basic canvas renderPass",
      colorAttachments: [
        {
          // view: <- to be filled out when we render
          clearValue: [0.3, 0.3, 0.3, 1],
          loadOp: "clear",
          storeOp: "store",
        },
      ],
    };
function render() {
      // Get the current texture from the canvas context and
      // set it as the texture to render to.
      //@ts-ignore
      renderPassDescriptor.colorAttachments[0].view = context!
        .getCurrentTexture()
        .createView();

      // make a command encoder to start encoding commands
      const encoder = device.createCommandEncoder({ label: "our encoder" });

      // make a render pass encoder to encode render specific commands
      const pass = encoder.beginRenderPass(renderPassDescriptor);
      pass.setPipeline(pipeline);
      pass.draw(3); // call our vertex shader 3 times.
      pass.end();

      const commandBuffer = encoder.finish();
      device.queue.submit([commandBuffer]);
    }

    render(); */
  }

  runRenderLoop(run: Function) {
    const anim = () => {
      run();
      requestAnimationFrame(anim);
    };
    requestAnimationFrame(anim);
  }
}
