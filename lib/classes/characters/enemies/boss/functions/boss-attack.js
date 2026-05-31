/**
 * Tries to start an attack.
 *
 * @param {Object} boss - The boss instance.
 * @param {Object} sharky - The Sharky object.
 * @param {number} camera_x - The camera position.
 * @returns {void}
 */
export function tryAttack(boss, sharky, camera_x) {
    if (!boss.canTryAttack(sharky)) return;
    if (!boss.isSharkyInAttackRange(sharky, camera_x)) return;

    boss.startAttack();
}


/**
 * Checks whether boss can try an attack.
 *
 * @param {Object} boss - The boss instance.
 * @param {Object} sharky - The Sharky object.
 * @returns {boolean} Whether boss can try attack.
 */
export function canTryAttack(boss, sharky) {
    if (!sharky) return false;
    if (boss.isHurt) return false;

    return Date.now() - boss.lastAttack >= boss.attackCooldown;
}


/**
 * Checks whether Sharky is in attack range.
 *
 * @param {Object} boss - The boss instance.
 * @param {Object} sharky - The Sharky object.
 * @param {number} camera_x - The camera position.
 * @returns {boolean} Whether Sharky is in range.
 */
export function isSharkyInAttackRange(boss, sharky, camera_x) {
    const distance = boss.getSharkyDistance(sharky, camera_x);

    return distance.x < 650 && distance.y < 350;
}


/**
 * Returns the distance to Sharky.
 *
 * @param {Object} boss - The boss instance.
 * @param {Object} sharky - The Sharky object.
 * @param {number} camera_x - The camera position.
 * @returns {Object} The distance values.
 */
export function getSharkyDistance(boss, sharky, camera_x) {
    const sharkyWorldX = sharky.x + camera_x;

    return {
        x: Math.abs((boss.x + boss.w / 2) - (sharkyWorldX + sharky.w / 2)),
        y: Math.abs((boss.y + boss.h / 2) - (sharky.y + sharky.h / 2))
    };
}


/**
 * Starts an attack.
 *
 * @param {Object} boss - The boss instance.
 * @returns {void}
 */
export function startAttack(boss) {
    boss.isAttacking = true;
    boss.attackStartedAt = Date.now();
    boss.lastAttack = Date.now();
    boss.resetAnimation();
}


/**
 * Checks whether attack damage can be applied.
 *
 * @param {Object} boss - The boss instance.
 * @returns {boolean} Whether attack hit can apply.
 */
export function canApplyAttackHit(boss) {
    if (!boss.isAttacking) return false;

    const attackTime = Date.now() - boss.attackStartedAt;

    return attackTime >= 450 && attackTime <= 750;
}