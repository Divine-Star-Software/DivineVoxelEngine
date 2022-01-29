export class Player {
    DVE;
    absPositionArray;
    chunkPositionArray;
    playerDirectionArray;
    playerPickPosition;
    particleSystem;
    playerStatesArray;
    normalFog = new BABYLON.Color3(99 / 255, 157 / 255, 216 / 255);
    fluidFog = new BABYLON.Color3(150 / 255, 0 / 255, 150 / 255);
    scene;
    cachedVelocity = new BABYLON.Vector3();
    active = true;
    breaking = false;
    placing = true;
    forward = new BABYLON.Vector3(0, 0, 1);
    camera;
    ready = false;
    hitbox;
    jumped = false;
    jumping = false;
    jumpTime = 16;
    speed = 0.1;
    moveForward = false;
    moveBackward = false;
    moveLeft = false;
    moveRight = false;
    jumpCount = this.jumpTime;
    velocity = BABYLON.Vector3.Zero(); // global
    lookingAtBlock = false;
    blockLookingAtPosition = { x: 0, y: 0, z: 0 };
    playerCube;
    checkDownCollision = false;
    bottomRay;
    camRay;
    constructor(DVE) {
        this.DVE = DVE;
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
        this.DVE.world.getWorker().postMessage(["connect-player", ...arrays]);
    }
    calculateGameZone(positionX, positionZ) {
        const chunkpositionX = (positionX >> 4) << 4;
        const chunkpositionZ = (positionZ >> 4) << 4;
        return [chunkpositionX, chunkpositionZ];
    }
    /**# Directions
     * ---
     * 0 -> north
     * 1 -> north west
     * 2 -> north east
     * 3 -> east
     * 4 -> west;
     * 5 -> south
     * 6 -> south east
     * 7 -> south east
     *
     * @param direction
     */
    _getDirection(direction) {
        //  console.log(direction.x, direction.y, direction.z);
        if (direction.x > -0.4 && direction.x < 0.4 && direction.z > 0) {
            //   console.log("north");
            this.playerDirectionArray[0] = 0;
        }
        if (direction.x < -0.4 && direction.x > -0.7 && direction.z > 0) {
            //   console.log("north west");
            this.playerDirectionArray[0] = 1;
        }
        if (direction.x > 0.4 && direction.x < 0.7 && direction.z > 0) {
            //   console.log("north east");
            this.playerDirectionArray[0] = 2;
        }
        if (direction.x > 0.7 &&
            direction.x < 1 &&
            direction.z > -0.6 &&
            direction.z < 0.6) {
            //   console.log("east");
            this.playerDirectionArray[0] = 3;
        }
        if (direction.x < 0.7 &&
            direction.x > 1 &&
            direction.z < -0.6 &&
            direction.z > 0.6) {
            //     console.log("west");
            this.playerDirectionArray[0] = 4;
        }
        if (direction.x > -0.7 && direction.x < -0.05 && direction.z < 0) {
            //   console.log("south west");
            this.playerDirectionArray[0] = 6;
        }
        if (direction.x > -0.2 && direction.x < 0.9 && direction.z < 0) {
            //console.log("south east");
            this.playerDirectionArray[0] = 7;
        }
        if (direction.x > -0.4 && direction.x < 0.4 && direction.z < 0) {
            //    console.log("south");
            this.playerDirectionArray[0] = 5;
        }
        /*     if (direction.z > -0.6 && direction.z < 0.6 && direction.x < 0) {
            console.log("west");
            this.playerDirectionArray[0] = 3;
          } */
    }
    async update() {
        if (!this.ready || !this.active)
            return;
        if (this.DVE.meshManager.runningUpdate)
            return;
        if (this.playerStatesArray[1]) {
            this.scene.fogDensity = 0.6;
            this.scene.fogColor = this.fluidFog;
            if (!this.particleSystem.isStarted()) {
                this.particleSystem.start();
                this.particleSystem.renderingGroupId = 2;
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
        // this._getDirection(direction);
        this.playerCube.position.x = this.playerPickPosition[0] + 0.5;
        this.playerCube.position.y = this.playerPickPosition[1] + 0.5;
        this.playerCube.position.z = this.playerPickPosition[2] + 0.5;
        // console.log(this.camera.getDirection(this.forward));
        const x = Math.round(this.hitbox.position.x);
        //  const y = Math.floor(this.hitbox.position.y);
        const z = Math.round(this.hitbox.position.z);
        this.absPositionArray[0] = this.hitbox.position.x;
        this.absPositionArray[1] = this.hitbox.position.y + 0.5;
        this.absPositionArray[2] = this.hitbox.position.z;
        const chunk = this.calculateGameZone(x, z);
        this.chunkPositionArray[0] = chunk[0];
        this.chunkPositionArray[1] = chunk[1];
        if (this.jumping) {
            if (this.jumpCount == 0) {
                this.jumpCount = this.jumpTime;
                this.jumping = false;
            }
            else {
                this.velocity.y += 0.08;
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
    _doAction(action) {
        const position = new BABYLON.Vector3(this.hitbox.position.x, this.hitbox.position.y + 0.5, this.hitbox.position.z);
        const camRay = this.camera.getForwardRay(6, undefined, position);
        this.camRay = camRay;
        const camPick = this.hitbox.getScene().pickWithRay(this.camRay);
        if (camPick) {
            if (camPick.hit) {
                if (camPick.pickedMesh && camPick.faceId !== undefined) {
                    const x = Math.floor(this.playerCube.position.x);
                    const y = Math.floor(this.playerCube.position.y);
                    const z = Math.floor(this.playerCube.position.z);
                    if (action == "break") {
                        this.blockLookingAtPosition.x = x;
                        this.blockLookingAtPosition.y = y;
                        this.blockLookingAtPosition.z = z;
                        return;
                    }
                    if (action == "place") {
                        console.log(x, y, z);
                        let normal = BABYLON.Vector3.Zero();
                        normal = camPick.pickedMesh.getFacetNormal(camPick.faceId);
                        //  console.log(normal);
                        if (normal.x == 1) {
                            this.blockLookingAtPosition.x = x + 1;
                            this.blockLookingAtPosition.y = y;
                            this.blockLookingAtPosition.z = z;
                            return;
                        }
                        if (normal.x == -1) {
                            this.blockLookingAtPosition.x = x - 1;
                            this.blockLookingAtPosition.y = y;
                            this.blockLookingAtPosition.z = z;
                            return;
                        }
                        if (normal.z == 1) {
                            this.blockLookingAtPosition.x = x;
                            this.blockLookingAtPosition.y = y;
                            this.blockLookingAtPosition.z = z + 1;
                            return;
                        }
                        if (normal.z == -1) {
                            this.blockLookingAtPosition.x = x;
                            this.blockLookingAtPosition.y = y;
                            this.blockLookingAtPosition.z = z - 1;
                            return;
                        }
                        if (normal.y == 1) {
                            this.blockLookingAtPosition.x = x;
                            this.blockLookingAtPosition.y = y + 1;
                            this.blockLookingAtPosition.z = z;
                            return;
                        }
                        if (normal.y == -1) {
                            this.blockLookingAtPosition.x = x;
                            this.blockLookingAtPosition.y = y - 1;
                            this.blockLookingAtPosition.z = z;
                            return;
                        }
                    }
                    //    console.log(this.blockLookingAtPosition);
                }
            }
        }
    }
    _setUpPlayerCube() {
        const cubeMaterial = new BABYLON.StandardMaterial("block", this.hitbox.getScene());
        cubeMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        cubeMaterial.alpha = 0.3;
        const cube = BABYLON.MeshBuilder.CreateBox("playerblockdisplay", { size: 1.1 }, this.hitbox.getScene());
        cube.isPickable = true;
        cube.material = cubeMaterial;
        cube.enableEdgesRendering();
        cube.edgesWidth = 0.3;
        cube.edgesColor = new BABYLON.Color4(0, 0, 0, 0.8);
        cube.convertToFlatShadedMesh();
        cube.updateFacetData();
        const positions = cube.getVerticesData(BABYLON.VertexBuffer.PositionKind);
        const indicies = cube.getIndices();
        const calculatedNormals = [];
        BABYLON.VertexData.ComputeNormals(positions, indicies, calculatedNormals);
        cube.setVerticesData(BABYLON.VertexBuffer.NormalKind, calculatedNormals);
        this.playerCube = cube;
    }
    _setUpPlayerCamera() {
        const cameraCrossHairMaterial = new BABYLON.StandardMaterial("box-material", this.hitbox.getScene());
        cameraCrossHairMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
        //cameraCrossHairMaterial.disableLighting = true;
        const crossHairVertical = BABYLON.MeshBuilder.CreatePlane("plane", { width: 0.01, height: 0.25 }, this.hitbox.getScene());
        const crossHairHorizontal = BABYLON.MeshBuilder.CreatePlane("plane", { width: 0.25, height: 0.01 }, this.hitbox.getScene());
        crossHairVertical.isPickable = false;
        crossHairHorizontal.isPickable = false;
        crossHairVertical.parent = this.camera;
        crossHairHorizontal.parent = this.camera;
        crossHairVertical.position.z = 5;
        crossHairHorizontal.position.z = 5;
        crossHairVertical.material = cameraCrossHairMaterial;
        crossHairHorizontal.material = cameraCrossHairMaterial;
        crossHairVertical.renderingGroupId = 2;
        crossHairHorizontal.renderingGroupId = 2;
    }
    async _createParticleSystem(scene) {
        const particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
        this.particleSystem = particleSystem;
        const buffer = await this.DVE.renderManager.textureCreator.getTextureBuffer("assets/particlesystems/1.png", 8, 8);
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
        this.hitbox = BABYLON.MeshBuilder.CreateBox("player-hitbox", { width: 0.7, height: 2, depth: 0.7 }, scene);
        this._createParticleSystem(scene);
        this.camera = camera;
        // this.camera.position.y = 1;
        this.hitbox.checkCollisions = true;
        this.hitbox.ellipsoid = new BABYLON.Vector3(0.45, 0.9, 0.45);
        this.hitbox.isPickable = false;
        //this.hitbox.showBoundingBox = true;
        this.hitbox.isVisible = false;
        this.hitbox.position.x = 0;
        this.hitbox.position.z = 0;
        this.hitbox.position.y = 200;
        this.bottomRay = new BABYLON.Ray(new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, -1, 0), 1);
        const bottomRayHelper = new BABYLON.RayHelper(this.bottomRay);
        bottomRayHelper.attachToMesh(this.hitbox, new BABYLON.Vector3(0, -1, 0), new BABYLON.Vector3(0, -0.5, 0));
        const camNode = new BABYLON.TransformNode("camnode", scene);
        camera.parent = camNode;
        camNode.position.y = 0.5;
        camNode.parent = this.hitbox;
        this._setUpPlayerCube();
        this._setUpPlayerCamera();
        document.addEventListener("click", (event) => {
            if (event.button == 2) {
                this._doAction("place");
                this.DVE.world.requestWorldUpdate("voxel-add", this.blockLookingAtPosition);
            }
            if (event.button == 0) {
                this._doAction("break");
                this.DVE.world.requestWorldUpdate("voxel-remove", this.blockLookingAtPosition);
            }
        });
        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "1":
                    this.placing = true;
                    this.breaking = false;
                    break;
                case "2":
                    this.placing = false;
                    this.breaking = true;
                    break;
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
                    if (this.playerStatesArray[0] && !this.jumping) {
                        this.jumped = true;
                        this.jumping = true;
                        this.velocity.y += 0.08;
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
