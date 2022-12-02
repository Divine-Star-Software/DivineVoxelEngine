const context = new AudioContext();
const masterChannel = context.createGain();
masterChannel.gain.value = 1;
masterChannel.connect(context.destination);
export const APIManager = {
    context: context,
    master: masterChannel,
    pannerNodeDefaults: {
        panningModel: "HRTF",
        distanceModel: "exponential",
    },
    $INIT() {
        if (!APIManager.context) {
            throw new Error("AudioContext is not found. This browser is not suppourted.");
        }
    },
    connectToMaster(node) {
        node.connect(this.master);
    },
    createAudioBufferSource(buffer) {
        const source = context.createBufferSource();
        source.buffer = buffer;
        return source;
    },
    createDynamicCompressor(data) {
        const comp = this.context.createDynamicsCompressor();
        if (data.threshold != undefined) {
            comp.threshold.value = data.threshold;
        }
        if (data.knee != undefined) {
            comp.knee.value = data.knee;
        }
        if (data.ratio != undefined) {
            comp.ratio.value = data.ratio;
        }
        if (data.attack != undefined) {
            comp.attack.value = data.attack;
        }
        if (data.release != undefined) {
            comp.release.value = data.release;
        }
    },
    /*
    https://developer.mozilla.org/en-US/docs/Web/API/WaveShaperNode
    */
    createWaveShapeNode(curve, oversample) {
        const node = this.context.createWaveShaper();
        node.curve = curve;
        if (oversample) {
            node.oversample = oversample;
        }
    },
    createGain(value = 1) {
        const gain = this.context.createGain();
        gain.gain.value = value;
        return gain;
    },
    createDelayNode(delayTime) {
        const delay = this.context.createDelay();
        delay.delayTime.value = delayTime;
        return delay;
    },
    createBiQuadFilterNode(data) {
        const filter = this.context.createBiquadFilter();
        filter.type = data.type;
        filter.frequency.value = data.frequency;
        if (data.Q != undefined) {
            filter.Q.value = data.Q;
        }
        if (data.detune != undefined) {
            filter.detune.value = data.detune;
        }
        return filter;
    },
    createConvolver(buffer) {
        const convolver = this.context.createConvolver();
        convolver.buffer = buffer;
        return convolver;
    },
    createPannerNode(nodeData) {
        const context = this.context;
        if (!nodeData.distanceModel) {
            nodeData.distanceModel = this.pannerNodeDefaults.distanceModel;
        }
        if (!nodeData.panningModel) {
            nodeData.panningModel = this.pannerNodeDefaults.panningModel;
        }
        return new PannerNode(context, nodeData);
    },
    async getAudioBuffer(path) {
        const response = await fetch(path);
        const buffer = await response.arrayBuffer();
        const source = await APIManager.context.decodeAudioData(buffer);
        return source;
    },
    async createAudioElementNode(path) {
        const audio = new Audio(path);
        const audioNode = APIManager.context.createMediaElementSource(audio);
        const masterGainNode = APIManager.context.createGain();
        masterGainNode.connect(masterChannel);
        audioNode.connect(masterGainNode);
        return {
            master: masterGainNode,
            audio: audioNode,
            effects: {},
        };
    },
};
