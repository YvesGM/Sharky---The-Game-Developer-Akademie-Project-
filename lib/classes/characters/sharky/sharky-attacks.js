import {
    SHARKY_FIN_SLAP,
    SHARKY_BUBBLE_ATTACK,
    SHARKY_POISON_BUBBLE_ATTACK
} from "../../../storage/characters/sharky.storage.js";


/**
 * Checks whether Sharky can attack.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {boolean} Whether Sharky can attack.
 */
export function canAttack(sharky) {
    return Date.now() - sharky.lastAttack > 650 && !sharky.isDead;
}


/**
 * Starts an attack.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {string} type - The attack type.
 * @returns {void}
 */
export function startAttack(sharky, type) {
    sharky.setAttackStartValues(type);

    if (type === 'bubble') sharky.initBubbleAttack();
    if (type === 'fin') sharky.initFinAttack();
}


/**
 * Sets general attack start values.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {string} type - The attack type.
 * @returns {void}
 */
export function setAttackStartValues(sharky, type) {
    sharky.attackType = type;
    sharky.attackStartedAt = Date.now();
    sharky.lastAttack = Date.now();
    sharky.currentAttackId = (sharky.currentAttackId || 0) + 1;
    sharky.bubbleSpawned = false;
}


/**
 * Initializes bubble attack.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {void}
 */
export function initBubbleAttack(sharky) {
    sharky.isPoisonBubbleAttack = sharky.poison >= 5;
    sharky.attackDuration = 750;
    sharky.setBubbleAnimation();
}


/**
 * Sets bubble attack animation.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {void}
 */
export function setBubbleAnimation(sharky) {
    if (sharky.isPoisonBubbleAttack) {
        sharky.setAnimation('poisonBubbleAttack');
        return;
    }

    sharky.setAnimation('bubbleAttack');
}


/**
 * Initializes fin attack.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {void}
 */
export function initFinAttack(sharky) {
    sharky.isPoisonBubbleAttack = false;
    sharky.attackDuration = 900;
    sharky.setAnimation('finSlap');
}


/**
 * Checks whether Sharky is attacking.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {boolean} Whether Sharky is attacking.
 */
export function isAttacking(sharky) {
    return sharky.attackType &&
        Date.now() - sharky.attackStartedAt < sharky.attackDuration;
}


/**
 * Draws attack animation.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {void}
 */
export function attack(sharky, ctx) {
    sharky.animateAttack();
    sharky.drawImg(ctx);
    sharky.clearFinishedAttack();
}


/**
 * Animates current attack.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {void}
 */
export function animateAttack(sharky) {
    if (sharky.attackType === 'bubble') {
        sharky.animateBubbleAttack();
        return;
    }

    sharky.animateFinAttack();
}


/**
 * Animates bubble attack.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {void}
 */
export function animateBubbleAttack(sharky) {
    if (sharky.isPoisonBubbleAttack) {
        sharky.animatePoisonBubbleAttack();
        return;
    }

    sharky.animateNormalBubbleAttack();
}


/**
 * Animates poison bubble attack.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {void}
 */
export function animatePoisonBubbleAttack(sharky) {
    sharky.setAnimation('poisonBubbleAttack');
    sharky.animateCharacters(SHARKY_POISON_BUBBLE_ATTACK);
}


/**
 * Animates normal bubble attack.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {void}
 */
export function animateNormalBubbleAttack(sharky) {
    sharky.setAnimation('bubbleAttack');
    sharky.animateCharacters(SHARKY_BUBBLE_ATTACK);
}


/**
 * Animates fin attack.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {void}
 */
export function animateFinAttack(sharky) {
    if (sharky.attackType !== 'fin') return;

    sharky.setAnimation('finSlap');
    sharky.animateCharacters(SHARKY_FIN_SLAP);
}


/**
 * Clears attack if finished.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {void}
 */
export function clearFinishedAttack(sharky) {
    if (sharky.isAttacking()) return;

    sharky.attackType = null;
    sharky.isPoisonBubbleAttack = false;
}


/**
 * Checks whether fin hit can apply.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {boolean} Whether fin hit can apply.
 */
export function canApplyFinHit(sharky) {
    if (sharky.attackType !== 'fin') return false;

    const attackTime = Date.now() - sharky.attackStartedAt;

    return attackTime >= 450 && attackTime <= 820;
}


/**
 * Checks whether a bubble can spawn.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {boolean} Whether a bubble can spawn.
 */
export function canSpawnBubble(sharky) {
    if (sharky.attackType !== 'bubble') return false;

    const attackTime = Date.now() - sharky.attackStartedAt;

    return attackTime >= 600;
}