import { ENTITIES } from "../../../lib/configs/entities/entity.configs.js";
import { ENEMIES } from "../../../lib/configs/characters/enemy.configs.js";
import { COINS, POISONS } from "../../../lib/configs/entities/collectibles.configs.js";
import { gameState } from "./world-state.js";

/**
 * Draws all world debug hitboxes.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {void}
 */
export function drawWorldHitboxes(ctx) {
    drawEntityHitboxes(ctx);
    drawEnemyHitboxes(ctx);
    drawCoinHitboxes(ctx);
    drawPoisonHitboxes(ctx);
}


/**
 * Draws entity hitboxes.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {void}
 */
function drawEntityHitboxes(ctx) {
    ENTITIES.forEach(entity => {
        drawDebugBox(ctx, entity, '#ff0000', 'Entity');
    });
}


/**
 * Draws enemy hitboxes.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {void}
 */
function drawEnemyHitboxes(ctx) {
    ENEMIES.forEach(enemy => {
        drawSingleEnemyHitbox(ctx, enemy);
    });
}


/**
 * Draws one enemy hitbox.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {Object} enemy - The enemy object.
 * @returns {void}
 */
function drawSingleEnemyHitbox(ctx, enemy) {
    if (enemy.isDead) return;

    if (typeof enemy.getHitbox === 'function') {
        drawDebugBox(ctx, enemy.getHitbox(), '#ff00ff', 'Enemy');
        return;
    }

    drawDebugBox(ctx, enemy, '#ff00ff', 'Enemy');
}


/**
 * Draws all coin hitboxes.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {void}
 */
function drawCoinHitboxes(ctx) {
    COINS.forEach(coin => {
        if (!coin.isCollected) {
            drawDebugBox(ctx, coin, '#ffff00', 'Coin');
        }
    });
}


/**
 * Draws all poison hitboxes.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {void}
 */
function drawPoisonHitboxes(ctx) {
    POISONS.forEach(poison => {
        if (!poison.isCollected) {
            drawDebugBox(ctx, poison, '#00ff00', 'Poison');
        }
    });
}


/**
 * Draws Sharky's debug hitbox.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {void}
 */
export function drawSharkyHitbox(ctx) {
    const sharky = gameState.getSharky();

    if (typeof sharky.getHitbox === 'function') {
        drawDebugBox(ctx, sharky.getHitbox(0), '#00ffff', 'Sharky');
        return;
    }

    drawDebugBox(ctx, sharky, '#00ffff', 'Sharky');
}


/**
 * Draws one debug box.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {Object} debugBox - The debug box object.
 * @param {string} color - The debug color.
 * @param {string} label - The debug label.
 * @returns {void}
 */
function drawDebugBox(ctx, debugBox, color, label = '') {
    if (!debugBox) return;

    const box = getDebugBoxValues(debugBox);

    if (!isValidDebugBox(box)) return;

    drawDebugBoxShape(ctx, box, color);
    drawDebugBoxLabel(ctx, box, color, label);
}


/**
 * Returns normalized debug box values.
 *
 * @param {Object} debugBox - The debug box object.
 * @returns {Object} The normalized debug box.
 */
function getDebugBoxValues(debugBox) {
    return {
        x: debugBox.x,
        y: debugBox.y,
        w: debugBox.w ?? debugBox.width,
        h: debugBox.h ?? debugBox.height
    };
}


/**
 * Checks whether a debug box has valid values.
 *
 * @param {Object} box - The debug box values.
 * @returns {boolean} Whether the debug box is valid.
 */
function isValidDebugBox(box) {
    return box.x !== undefined &&
        box.y !== undefined &&
        box.w !== undefined &&
        box.h !== undefined;
}


/**
 * Draws the debug box shape.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {Object} box - The debug box values.
 * @param {string} color - The debug color.
 * @returns {void}
 */
function drawDebugBoxShape(ctx, box, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.strokeRect(box.x, box.y, box.w, box.h);
    ctx.restore();
}


/**
 * Draws the debug box label.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {Object} box - The debug box values.
 * @param {string} color - The debug color.
 * @param {string} label - The debug label.
 * @returns {void}
 */
function drawDebugBoxLabel(ctx, box, color, label) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.font = '18px "Luckiest Guy"';
    ctx.fillText(label, box.x, box.y - 6);
    ctx.restore();
}