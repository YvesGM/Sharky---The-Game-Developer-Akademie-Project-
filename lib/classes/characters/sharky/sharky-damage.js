import { SHARKY_ELECTRIC_SHOCK } from "../../../storage/characters/sharky.storage.js";


/**
 * Applies damage to Sharky.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {number} damage - The damage value.
 * @param {Object|null} enemy - The enemy object.
 * @returns {void}
 */
export function hit(sharky, damage, enemy = null) {
    const now = Date.now();

    if (!sharky.canReceiveHit(now)) return;

    sharky.applyHealthDamage();
    sharky.lastHit = Date.now();
    sharky.applyHitEffect(enemy);
    sharky.updateHealthAfterHit();
}


/**
 * Checks whether Sharky can receive damage.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {number} now - The current timestamp.
 * @returns {boolean} Whether damage can be received.
 */
export function canReceiveHit(sharky, now) {
    if (sharky.isDead) return false;
    if (now < sharky.invulnerableUntil) return false;
    if (sharky.isElectrocuted()) return false;

    return now - sharky.lastHit >= 900;
}


/**
 * Applies health stage damage.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {void}
 */
export function applyHealthDamage(sharky) {
    sharky.healthStage--;
}


/**
 * Applies hit effect based on enemy.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {Object|null} enemy - The enemy object.
 * @returns {void}
 */
export function applyHitEffect(sharky, enemy) {
    if (enemy && enemy.enemyType === 'jellyfish') {
        sharky.applyJellyfishHit(enemy);
        return;
    }

    sharky.invulnerableUntil = Date.now() + 900;
}


/**
 * Applies jellyfish hit effect.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {Object} enemy - The jellyfish enemy.
 * @returns {void}
 */
export function applyJellyfishHit(sharky, enemy) {
    sharky.startElectricShock();
    sharky.invulnerableUntil = Date.now() +
        sharky.electricShockDuration +
        sharky.jellyfishGraceDuration;

    sharky.applyJellyfishKnockback(enemy);
}


/**
 * Applies jellyfish knockback.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {Object} enemy - The jellyfish enemy.
 * @returns {void}
 */
export function applyJellyfishKnockback(sharky, enemy) {
    if (enemy.x < sharky.x) {
        sharky.x += 40;
        return;
    }

    sharky.x -= 40;
}


/**
 * Updates health values after hit.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {void}
 */
export function updateHealthAfterHit(sharky) {
    if (sharky.healthStage <= 0) {
        sharky.dieByDamage();
        return;
    }

    sharky.health = sharky.healthStage * 25;
}


/**
 * Sets Sharky dead by damage.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {void}
 */
export function dieByDamage(sharky) {
    sharky.healthStage = 0;
    sharky.health = 0;
    sharky.isDead = true;
    sharky.currentImg = 0;
}


/**
 * Starts electric shock.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {void}
 */
export function startElectricShock(sharky) {
    sharky.electricShockStartedAt = Date.now();
    sharky.setAnimation('electricShock');
}


/**
 * Checks whether Sharky is electrocuted.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {boolean} Whether Sharky is electrocuted.
 */
export function isElectrocuted(sharky) {
    return Date.now() - sharky.electricShockStartedAt <
        sharky.electricShockDuration;
}


/**
 * Draws electric shock animation.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {void}
 */
export function electricShock(sharky, ctx) {
    sharky.animateCharacters(SHARKY_ELECTRIC_SHOCK);
    sharky.drawImg(ctx);
}


/**
 * Schedules shock damage.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {number} damage - The damage value.
 * @param {Object} enemy - The enemy object.
 * @param {number} delay - The damage delay.
 * @returns {void}
 */
export function scheduleShockDamage(sharky, damage, enemy, delay = 350) {
    if (sharky.isDead) return;

    sharky.pendingShockDamage = damage;
    sharky.pendingShockEnemy = enemy;
    sharky.pendingShockAt = Date.now() + delay;
}


/**
 * Handles pending shock damage.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {void}
 */
export function handlePendingShockDamage(sharky) {
    if (!sharky.pendingShockDamage) return;
    if (Date.now() < sharky.pendingShockAt) return;

    sharky.applyPendingShockDamage();
}


/**
 * Applies pending shock damage.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {void}
 */
export function applyPendingShockDamage(sharky) {
    const damage = sharky.pendingShockDamage;
    const enemy = sharky.pendingShockEnemy;

    sharky.clearPendingShockDamage();
    sharky.hit(damage, enemy);
}


/**
 * Clears pending shock values.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {void}
 */
export function clearPendingShockDamage(sharky) {
    sharky.pendingShockDamage = null;
    sharky.pendingShockEnemy = null;
    sharky.pendingShockAt = 0;
}


/**
 * Checks whether Sharky is hurt.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {boolean} Whether Sharky is hurt.
 */
export function isHurt(sharky) {
    return Date.now() - sharky.lastHit < 450;
}