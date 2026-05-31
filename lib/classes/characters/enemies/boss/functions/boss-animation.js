import {
    BOSS_FLOATING,
    BOSS_HURT,
    BOSS_DEAD,
    BOSS_INTRO,
    BOSS_ATTACK
} from "../../../../../storage/characters/enemies/boss.storage.js";

/**
 * Animates the boss.
 *
 * @param {Object} boss - The boss instance.
 * @returns {void}
 */
export function animateBoss(boss) {
    if (boss.animateDeadState()) return;
    if (boss.animateIntroState()) return;
    if (boss.animateHurtState()) return;
    if (boss.animateAttackState()) return;

    boss.animateCharacters(BOSS_FLOATING);
}


/**
 * Animates dead state.
 *
 * @param {Object} boss - The boss instance.
 * @returns {boolean} Whether this state was animated.
 */
export function animateDeadState(boss) {
    if (boss.bossState !== 'dead') return false;

    boss.animateDeath(BOSS_DEAD);
    return true;
}


/**
 * Animates intro state.
 *
 * @param {Object} boss - The boss instance.
 * @returns {boolean} Whether this state was animated.
 */
export function animateIntroState(boss) {
    if (boss.bossState !== 'intro') return false;

    boss.animateOnce(BOSS_INTRO, 'introFinished');
    return true;
}


/**
 * Animates hurt state.
 *
 * @param {Object} boss - The boss instance.
 * @returns {boolean} Whether this state was animated.
 */
export function animateHurtState(boss) {
    if (!boss.isHurt || !boss.isHurtActive()) return false;

    boss.animateCharacters(BOSS_HURT);
    return true;
}


/**
 * Checks whether hurt state is active.
 *
 * @param {Object} boss - The boss instance.
 * @returns {boolean} Whether hurt state is active.
 */
export function isHurtActive(boss) {
    return Date.now() - boss.hurtStartedAt < boss.hurtDuration;
}


/**
 * Animates attack state.
 *
 * @param {Object} boss - The boss instance.
 * @returns {boolean} Whether this state was animated.
 */
export function animateAttackState(boss) {
    boss.isHurt = false;

    if (!boss.isAttacking) return false;

    boss.animateCharacters(BOSS_ATTACK);
    boss.finishAttackIfNeeded();
    return true;
}


/**
 * Finishes attack when duration is over.
 *
 * @param {Object} boss - The boss instance.
 * @returns {void}
 */
export function finishAttackIfNeeded(boss) {
    if (Date.now() - boss.attackStartedAt <= boss.attackDuration) return;

    boss.isAttacking = false;
    boss.resetAnimation();
}


/**
 * Resets animation values.
 *
 * @param {Object} boss - The boss instance.
 * @returns {void}
 */
export function resetAnimation(boss) {
    boss.currentImg = 0;
    boss.lastFrameTime = null;
}