import {
    SHARKY_WAITING,
    SHARKY_LONG_WAITING,
    SHARKY_SWIMMING,
    SHARKY_ELECTRIC_SHOCK,
    SHARKY_FIN_SLAP,
    SHARKY_BUBBLE_ATTACK,
    SHARKY_POISON_BUBBLE_ATTACK,
    SHARKY_HURT_POISONED,
    SHARKY_DEAD_POISONED
} from "../../../storage/characters/sharky.storage.js";


/**
 * Initializes Sharky's stats.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {void}
 */
export function initStats(sharky) {
    sharky.health = 100;
    sharky.healthStage = 5;
    sharky.coins = 0;
    sharky.poison = 0;
    sharky.totalPoisonCollected = 0;
}


/**
 * Initializes timer values.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {void}
 */
export function initTimers(sharky) {
    sharky.lastHit = 0;
    sharky.lastAttack = 0;
    sharky.lastAction = Date.now();
    sharky.currentAnimation = null;
    sharky.longWaitingDelay = 10000;
}


/**
 * Initializes electric shock values.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {void}
 */
export function initShockValues(sharky) {
    sharky.electricShockStartedAt = 0;
    sharky.electricShockDuration = 1600;
    sharky.pendingShockDamage = null;
    sharky.pendingShockEnemy = null;
    sharky.pendingShockAt = 0;
    sharky.invulnerableUntil = 0;
    sharky.jellyfishGraceDuration = 1200;
}


/**
 * Initializes attack values.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {void}
 */
export function initAttackValues(sharky) {
    sharky.attackType = null;
    sharky.attackStartedAt = 0;
    sharky.attackDuration = 0;
    sharky.currentAttackId = 0;
    sharky.bubbleSpawned = false;
    sharky.isPoisonBubbleAttack = false;
}


/**
 * Initializes hitbox offset.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {void}
 */
export function initOffset(sharky) {
    sharky.offset = {
        top: 190,
        right: 80,
        bottom: 100,
        left: 80
    };
}


/**
 * Loads all Sharky image storages.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {void}
 */
export function loadImgStorage(sharky) {
    sharky.drawFrames(SHARKY_WAITING);
    sharky.drawFrames(SHARKY_LONG_WAITING);
    sharky.drawFrames(SHARKY_SWIMMING);
    sharky.drawFrames(SHARKY_ELECTRIC_SHOCK);
    sharky.drawFrames(SHARKY_FIN_SLAP);
    sharky.drawFrames(SHARKY_BUBBLE_ATTACK);
    sharky.drawFrames(SHARKY_POISON_BUBBLE_ATTACK);
    sharky.drawFrames(SHARKY_HURT_POISONED);
    sharky.drawFrames(SHARKY_DEAD_POISONED);
}


/**
 * Sets animation if it changed.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {string} animationName - The animation name.
 * @returns {void}
 */
export function setAnimation(sharky, animationName) {
    if (sharky.currentAnimation === animationName) return;

    sharky.currentAnimation = animationName;
    sharky.currentImg = 0;
    sharky.lastFrameTime = null;
}