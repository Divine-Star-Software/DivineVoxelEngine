"use strict";
/* import { DVEN } from "../../../out/Nexus/DivineVoxelEngineNexus.js";
import {DVEPH} from "../../../out/Physics/DivineVoxelEnginePhysics.js";

export const Player = {

    collideWithLevel : true,
    //current position
    x : 0,
    y : 0,
    z : 0,
    //previous position
    px : 0,
    py : 0,
    pz : 0,
    //dimensions
    hx : .8,
    hy : 2,
    hz : .8,

    onGround : false,

    setPosition(x:number,y:number,z:number) {
        this.x = x;
        this.y = y;
        this.z = z;
    },
    syncPosition(position : Float32Array ) {
        position[0] = this.x;
        position[1] = this.y;
        position[2] = this.z;
    },
    cachePosition() {
        this.px = this.x;
        this.py = this.y;
        this.pz = this.z;
    },


    levelCollision() {
        if (!this.collideWithLevel) return;
        this.onGround = false;
        //Notice there is a cycle. We may have to run the algorithm several times until the collision is resolved
        while(true) {
            
            // First we calculate the movement vector for this frame
            // This is the entity's current position minus its last position.
            // The last position is set at the beggining of each frame.
            var dx = this.x - this.px;
            var dy = this.y - this.py;
            var dz = this.z - this.pz;
            
            // These are the bounds of the AABB that may collide with the entity.
            var minXi = Math.floor(Math.min(this.x,this.px)-this.hx/2), maxXi = Math.floor(Math.max(this.x,this.px)+this.hx/2);
            var minYi = Math.floor(Math.min(this.y,this.py)-this.hy/2), maxYi = Math.floor(Math.max(this.y,this.py)+this.hy/2);
            var minZi = Math.floor(Math.min(this.z,this.pz)-this.hz/2), maxZi = Math.floor(Math.max(this.z,this.pz)+this.hz/2);
            
            var r = {h:1, nx:0, ny:0, nz:0};
    
            // For each voxel that may collide with the entity, find the first that colides with it
            for(var yi = minYi; yi <= maxYi; yi++) {
            for(var zi = minZi; zi <= maxZi; zi++) {
            for(var xi = minXi; xi <= maxXi; xi++) {
                // Discard non-solid voxels
                const voxel = DVEN.worldMatrix.getVoxel(xi,yi,zi);
                if(!voxel) continue;
                if(voxel[0] == "dve:air") continue;

    
                // Check swept collision
                var c = DVEPH.collisions.sweepAABB(
                    this.px - this.hx/2,this.py - this.hy/2, this.pz - this.hz/2,
                    this.hx,this.hy, this.hz,
                    xi,yi,zi,
                    1,1,1,
                    dx,dy,dz
                );
                if(c.ny == 1) {
                    this.onGround = true;
                }
       
                //Check if this collision is closer than the closest so far.
                if (c.h < r.h) {
                    
                    r = c;
                 
                
                    

                }
                
            }}}
            
            
            // Update the entity's position
            // We move the entity slightly away from the block in order to miss seams.
            var ep = 0.001;
            this.x = this.px + r.h*dx + ep*r.nx;
            this.y = this.py + r.h*dy + ep*r.ny;
            this.z = this.pz + r.h*dz + ep*r.nz;

       
            
    
            // If there was no collision, end the algorithm.
            if (r.h == 1) break;
    
            // Wall Sliding
            // c = a - (a.b)/(b.b) b
            // c - slide vector (rejection of a over b)
            // b - normal to the block
            // a - remaining speed (= (1-h)*speed)
            var BdotB = r.nx*r.nx + r.ny*r.ny + r.nz*r.nz;
            if (BdotB != 0) {
    
                // Store the current position for the next iteration
                this.px = this.x;
                this.py = this.y;
                this.pz = this.z;
    
                // Apply Slide
                var AdotB = (1-r.h)*(dx*r.nx + dy*r.ny + dz*r.nz);
                this.x += (1-r.h)*dx - (AdotB/BdotB)*r.nx;
                this.y += (1-r.h)*dy - (AdotB/BdotB)*r.ny;
                this.z += (1-r.h)*dz - (AdotB/BdotB)*r.nz;
       
            }
        }
    }

} */ 
