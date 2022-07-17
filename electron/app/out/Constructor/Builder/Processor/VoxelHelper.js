export const VoxelHelper = {
    substanceRules: {
        "solid-solid": false,
        "solid-flora": true,
        "solid-transparent": true,
        "solid-fluid": true,
        "solid-magma": true,
        "transparent-solid": true,
        "transparent-flora": true,
        "transparent-transparent": false,
        "transparent-fluid": true,
        "transparent-magma": true,
        "flora-solid": true,
        "flora-flora": true,
        "flora-transparent": true,
        "flora-fluid": true,
        "flora-magma": true,
        "fluid-solid": false,
        "fluid-flora": true,
        "fluid-transparent": true,
        "fluid-fluid": false,
        "fluid-magma": true,
        "magma-solid": false,
        "magma-flora": true,
        "magma-transparent": true,
        "magma-fluid": true,
        "magma-magma": false,
    },
    substanceRuleCheck(voxel, neightborVoxel) {
        if (this.substanceRules[`${voxel.substance}-${neightborVoxel.substance}`]) {
            return true;
        }
        else {
            return false;
        }
    },
};
