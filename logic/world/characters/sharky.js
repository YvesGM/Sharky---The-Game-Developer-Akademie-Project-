import { SHARKY } from "../../../lib/configs/characters/sharky.configs.js"

export default function Sharky(ctx, camera_x) {
    return drawSharky(ctx, camera_x);
}

function drawSharky(ctx, camera_x) {
    SHARKY.forEach(char => {
        camera_x = char.draw(ctx, camera_x);
    });
    return camera_x;
};