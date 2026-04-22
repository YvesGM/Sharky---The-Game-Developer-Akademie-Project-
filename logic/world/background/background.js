import { BACKGROUND } from "../../../lib/configs/background/background.configs.js"

export default function Background(ctx) {
    drawBackground(ctx);
}

function drawBackground(ctx) {
    BACKGROUND.forEach(obj => {
        obj.draw(ctx);
    });
};