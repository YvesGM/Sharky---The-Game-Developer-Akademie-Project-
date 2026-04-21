import { SHARKY } from "../../../lib/configs/characters/sharky.configs.js"

export default function Sharky(ctx) {
    drawSharky(ctx);
}

function drawSharky(ctx) {
    SHARKY.forEach(char => {
        char.draw(ctx);
    });
};