export const SubstanceRules = {
    rules: new Map(),
    parents: new Map(),
    registerSubstance(id, substanceCulls, parentId) {
        const map = new Map();
        this.rules.set(id, map);
        if (substanceCulls) {
            for (const culls of substanceCulls) {
                map.set(culls, true);
            }
        }
        if (parentId) {
            this.parents.set(id, parentId);
            return;
        }
        this.parents.set(id, id);
    },
    $INIT() {
        SubstanceRules.registerSubstance("#dve_solid", ["#dve_solid"]);
        SubstanceRules.registerSubstance("#dve_flora");
        SubstanceRules.registerSubstance("#dve_transparent", ["#dve_transparent"], "#dve_solid");
        SubstanceRules.registerSubstance("#dve_liquid", [
            "#dve_solid",
            "#dve_liquid",
        ]);
        SubstanceRules.registerSubstance("#dve_magma", ["#dve_solid", "#dve_magma"]);
    },
    exposedCheck(subject, neightborVoxel) {
        const rules = this.rules.get(subject);
        if (!rules)
            return true;
        if (rules.has(neightborVoxel))
            return false;
        return true;
    },
    getSubstanceParent(id) {
        return this.parents.get(id);
    },
};
