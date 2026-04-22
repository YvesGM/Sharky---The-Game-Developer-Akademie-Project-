import { ENEMIES } from "../../../lib/configs/characters/enemy.configs.js"

export default function Enemies(ctx) {
    drawEnemies(ctx);
}

function drawEnemies(ctx) {
    ENEMIES.forEach(enemy => {
        enemy.draw(ctx);
    });
};