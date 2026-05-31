import { ENEMIES } from "../../../lib/configs/characters/enemy.configs.js";

/**
 * Draws the boss HUD when the boss is fighting.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {void}
 */
export function drawBossHud(ctx) {
    const boss = ENEMIES.find(enemy => enemy.health !== undefined);

    if (!canDrawBossHud(boss)) return;

    drawBossBar(ctx, 1240, 38, 620, 34, boss.health, boss.maxHealth, 'Boss');
}


/**
 * Checks whether the boss HUD can be drawn.
 *
 * @param {Object} boss - The boss enemy object.
 * @returns {boolean} Whether the boss HUD can be drawn.
 */
function canDrawBossHud(boss) {
    if (!boss) return false;
    if (boss.isDead) return false;

    return boss.bossState === 'fighting';
}


/**
 * Draws the complete boss health bar.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {number} x - The x position.
 * @param {number} y - The y position.
 * @param {number} w - The bar width.
 * @param {number} h - The bar height.
 * @param {number} value - The current value.
 * @param {number} maxValue - The maximum value.
 * @param {string} label - The bar label.
 * @returns {void}
 */
function drawBossBar(ctx, x, y, w, h, value, maxValue, label) {
    const percent = Math.max(0, Math.min(value / maxValue, 1));

    ctx.save();
    drawBossBarBackground(ctx, x, y, w, h);
    drawBossBarValue(ctx, x, y, w, h, percent);
    drawBossBarBorder(ctx, x, y, w, h);
    drawBossBarLabel(ctx, x, y, value, label);
    ctx.restore();
}


/**
 * Draws the boss bar background.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {number} x - The x position.
 * @param {number} y - The y position.
 * @param {number} w - The bar width.
 * @param {number} h - The bar height.
 * @returns {void}
 */
function drawBossBarBackground(ctx, x, y, w, h) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    ctx.fillRect(x, y, w, h);
}


/**
 * Draws the boss bar value.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {number} x - The x position.
 * @param {number} y - The y position.
 * @param {number} w - The bar width.
 * @param {number} h - The bar height.
 * @param {number} percent - The current percentage.
 * @returns {void}
 */
function drawBossBarValue(ctx, x, y, w, h, percent) {
    ctx.fillStyle = 'rgba(160, 0, 0, 0.95)';
    ctx.fillRect(x, y, w * percent, h);
}


/**
 * Draws the boss bar border.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {number} x - The x position.
 * @param {number} y - The y position.
 * @param {number} w - The bar width.
 * @param {number} h - The bar height.
 * @returns {void}
 */
function drawBossBarBorder(ctx, x, y, w, h) {
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, w, h);
}


/**
 * Draws the boss bar label.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {number} x - The x position.
 * @param {number} y - The y position.
 * @param {number} value - The current boss health.
 * @param {string} label - The label text.
 * @returns {void}
 */
function drawBossBarLabel(ctx, x, y, value, label) {
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px "Luckiest Guy"';
    ctx.fillText(`${label}: ${value}`, x, y - 10);
}