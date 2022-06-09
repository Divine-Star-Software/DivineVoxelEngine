export class Player {
    DVER;
    absPositionArray;
    chunkPositionArray;
    playerDirectionArray;
    playerPickPosition;
    particleSystem;
    playerStatesArray;
    normalFog = new BABYLON.Color3(1 / 255, 1 / 255, 1 / 255);
    fluidFog = new BABYLON.Color3(150 / 255, 0 / 255, 150 / 255);
    scene;
    forward = new BABYLON.Vector3(0, 0, 1);
    camera;
    ready = false;
    hitbox;
    jumped = false;
    jumping = false;
    jumpTime = 28;
    jumpCount = this.jumpTime;
    speed = 0.15;
    moveForward = false;
    moveBackward = false;
    moveLeft = false;
    moveRight = false;
    velocity = BABYLON.Vector3.Zero(); // global
    constructor(DVER) {
        this.DVER = DVER;
    }
    createPlayerSharedArrays() {
        const absPositionArrayBuffer = new SharedArrayBuffer(12);
        const chunkPositionArrayBuffer = new SharedArrayBuffer(8);
        const playerDirectionArrayBuffer = new SharedArrayBuffer(12);
        const playerPickPositionArrayBuffer = new SharedArrayBuffer(12);
        const playerStatesArrayBuffer = new SharedArrayBuffer(10);
        this.absPositionArray = new Float32Array(absPositionArrayBuffer);
        this.chunkPositionArray = new Float32Array(chunkPositionArrayBuffer);
        this.playerDirectionArray = new Float32Array(playerDirectionArrayBuffer);
        this.playerPickPosition = new Float32Array(playerPickPositionArrayBuffer);
        //@ts-ignore
        this.playerStatesArray = new Uint8Array(playerStatesArrayBuffer);
        const arrays = [
            absPositionArrayBuffer,
            chunkPositionArrayBuffer,
            playerDirectionArrayBuffer,
            playerPickPositionArrayBuffer,
            playerStatesArrayBuffer,
        ];
        this.DVER.worldComm.sendMessage("connect-player", arrays);
    }
    async update() {
        if (!this.ready)
            return;
        if (this.DVER.meshManager.runningUpdate)
            return;
        if (this.playerStatesArray[1]) {
            this.scene.fogDensity = 0.3;
            this.scene.fogColor = this.fluidFog;
            if (!this.particleSystem.isStarted()) {
                this.particleSystem.start();
                this.particleSystem.renderingGroupId = 2;
                setTimeout(() => {
                    this.hitbox.position.x = 8;
                    this.hitbox.position.y = 20;
                    this.hitbox.position.z = -120;
                }, 1000);
            }
        }
        else {
            this.scene.fogDensity = 0.008;
            this.scene.fogColor = this.normalFog;
            this.particleSystem.renderingGroupId = 0;
            if (!this.particleSystem.isStopping()) {
                this.particleSystem.stop();
            }
        }
        // console.log(this.playerPickPosition);
        const direction = this.camera.getDirection(this.forward);
        this.playerDirectionArray[0] = direction.x;
        this.playerDirectionArray[1] = direction.y;
        this.playerDirectionArray[2] = direction.z;
        this.absPositionArray[0] = this.hitbox.position.x;
        this.absPositionArray[1] = this.hitbox.position.y + 0.5;
        this.absPositionArray[2] = this.hitbox.position.z;
        if (this.jumping) {
            if (this.jumpCount == 0) {
                this.jumpCount = this.jumpTime;
                this.jumping = false;
            }
            else {
                //    this.velocity.y += 0.05;
                this.jumpCount--;
            }
        }
        else {
            this.velocity.y = -0.3;
        }
        if (this.playerStatesArray[0]) {
            this.jumped = false;
        }
    }
    async _createParticleSystem(scene) {
        const particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
        this.particleSystem = particleSystem;
        const buffer = await this.DVER.renderManager.textureCreator.getTextureBuffer("assets/particlesystems/1.png", 8, 8);
        //Texture of each particle
        particleSystem.particleTexture = new BABYLON.RawTexture(new Uint8Array(buffer), 8, 8, 1, scene, false, false, BABYLON.Texture.NEAREST_SAMPLINGMODE);
        particleSystem.isLocal = true;
        particleSystem.renderingGroupId = 0;
        // Colors of all particles
        particleSystem.color1 = new BABYLON.Color4(150 / 255, 0 / 255, 150 / 255);
        particleSystem.color2 = new BABYLON.Color4(150 / 255, 0 / 255, 150 / 255);
        particleSystem.colorDead = new BABYLON.Color4(150 / 255, 0 / 255, 150 / 255);
        // Size of each particle (random between...
        particleSystem.minSize = 0.001;
        particleSystem.maxSize = 0.005;
        // Life time of each particle (random between...
        particleSystem.minLifeTime = 0.3;
        particleSystem.maxLifeTime = 1.5;
        // Emission rate
        particleSystem.emitRate = 200;
        // Speed
        particleSystem.minEmitPower = 1;
        particleSystem.maxEmitPower = 3;
        particleSystem.updateSpeed = 0.005;
        particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
        // Set the gravity of all particles
        particleSystem.gravity = new BABYLON.Vector3(-1, 0, 0);
        // Start the particle system
        particleSystem.emitter = this.hitbox;
    }
    createPlayer(scene, camera) {
        this.scene = scene;
        this.hitbox = BABYLON.MeshBuilder.CreateBox("player-hitbox", { width: 0.5, height: 2, depth: 0.5 }, scene);
        this._createParticleSystem(scene);
        this.camera = camera;
        // this.camera.position.y = 1;
        this.hitbox.checkCollisions = true;
        // this.hitbox.ellipsoid = new BABYLON.Vector3(0.5,1, 0.5)
        this.hitbox.isPickable = false;
        //this.hitbox.showBoundingBox = true;
        this.hitbox.isVisible = false;
        this.hitbox.position.x = 8;
        this.hitbox.position.z = -120;
        this.hitbox.position.y = 150;
        const camNode = new BABYLON.TransformNode("camnode", scene);
        camera.parent = camNode;
        camNode.position.y = 0.5;
        camNode.parent = this.hitbox;
        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowUp":
                case "w":
                    this.moveForward = true;
                    break;
                case "ArrowLeft":
                case "a":
                    this.moveLeft = true;
                    break;
                case "ArrowDown":
                case "s":
                    this.moveBackward = true;
                    break;
                case "ArrowRight":
                case "d":
                    this.moveRight = true;
                    break;
                case " ":
                    if (this.playerStatesArray[0] && !this.jumping) { //
                        this.jumped = true;
                        this.jumping = true;
                        this.velocity.y = 0.15;
                    }
                    break;
            }
        }, false);
        document.addEventListener("keyup", (event) => {
            switch (event.key) {
                case "ArrowUp":
                case "w":
                    this.moveForward = false;
                    break;
                case "ArrowLeft":
                case "a":
                    this.moveLeft = false;
                    break;
                case "ArrowDown":
                case "s":
                    this.moveBackward = false;
                    break;
                case "ArrowRight":
                case "d":
                    this.moveRight = false;
                    break;
            }
        }, false);
        scene.registerBeforeRender(() => {
            let forwardSpeed = 0;
            let sideSpeed = 0;
            if (this.moveForward) {
                forwardSpeed = this.speed;
            }
            if (this.moveBackward) {
                forwardSpeed = -this.speed;
            }
            if (this.moveRight) {
                sideSpeed = 0.1;
            }
            if (this.moveLeft) {
                sideSpeed = -0.1;
            }
            /*       const forward = this.camera
                 .getTarget()
                 .subtract(this.camera.position)
                 .normalize(); */
            const forward = this.camera.getDirection(new BABYLON.Vector3(0, 0, 1));
            forward.y = 0;
            const right = BABYLON.Vector3.Cross(forward, this.camera.upVector).normalize();
            right.y = 0;
            const move = forward
                .scale(forwardSpeed)
                .subtract(right.scale(sideSpeed))
                .subtract(this.camera.upVector.scale(0));
            this.velocity.x = move.x;
            this.velocity.z = move.z;
            this.hitbox.moveWithCollisions(this.velocity);
        });
        this.ready = true;
    }
}
