/**
 * Applies damage to the boss.
 *
 * @param {Object} boss - The boss instance.
 * @param {number} damage - The damage value.
 * @returns {void}
 */
export function hit(boss, damage = 10) {
    if (!boss.canReceiveDamage()) return;

    boss.health -= damage;
    boss.startHurtState();
    boss.checkDeathAfterHit();
}


/**
 * Checks whether boss can receive damage.
 *
 * @param {Object} boss - The boss instance.
 * @returns {boolean} Whether boss can receive damage.
 */
export function canReceiveDamage(boss) {
    if (boss.isDead) return false;

    return boss.bossState !== 'sleeping' && boss.bossState !== 'intro';
}


/**
 * Starts hurt state.
 *
 * @param {Object} boss - The boss instance.
 * @returns {void}
 */
export function startHurtState(boss) {
    boss.isHurt = true;
    boss.hurtStartedAt = Date.now();
    boss.isAttacking = false;
    boss.resetAnimation();
}


/**
 * Checks death after hit.
 *
 * @param {Object} boss - The boss instance.
 * @returns {void}
 */
export function checkDeathAfterHit(boss) {
    if (boss.health > 0) return;

    boss.health = 0;
    boss.isDead = true;
    boss.bossState = 'dead';
    boss.resetDeathState();
}


/**
 * Resets death state values.
 *
 * @param {Object} boss - The boss instance.
 * @returns {void}
 */
export function resetDeathState(boss) {
    boss.resetAnimation();
    boss.deathFrame = 0;
    boss.lastDeathFrameTime = 0;
}