export const CrossedPanels = {
    id: "#dve_crossed_panels",
    build(mesher) {
        let animationState = 1;
        if (mesher.data.getSubstance() == "#dve_flora") {
            animationState = 1;
        }
        mesher.quad.setDimensions(1, 1);
        mesher.setTemplateIncrement(false).templateData.loadIn("top");
        mesher.quad
            .setDirection("north")
            .addData(1, animationState)
            .updatePosition(0.5, 0.5, 1)
            .setTransform(1, 0, 0, -1)
            .setTransform(4, 0, 0, -1)
            .create()
            .clearTransform();
        mesher.setTemplateIncrement(true).templateData.loadIn("top");
        mesher.quad
            .setDirection("north")
            .addData(1, animationState)
            .updatePosition(0.5, 0.5, 0)
            .setTransform(1, 0, 0, 1)
            .setTransform(4, 0, 0, 1)
            .create()
            .clearTransform();
        mesher.setTemplateIncrement(false).templateData.loadIn("bottom");
        mesher.quad
            .setDirection("south")
            .addData(1, animationState)
            .updatePosition(0.5, 0.5, 0)
            .setTransform(1, 0, 0, 1)
            .setTransform(4, 0, 0, 1)
            .create()
            .clearTransform();
        mesher.setTemplateIncrement(true).templateData.loadIn("bottom");
        mesher.quad
            .setDirection("south")
            .addData(1, animationState)
            .updatePosition(0.5, 0.5, 1)
            .setTransform(1, 0, 0, -1)
            .setTransform(4, 0, 0, -1)
            .create()
            .clearTransform();
    },
};
