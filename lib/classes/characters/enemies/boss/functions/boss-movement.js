/**
 * Moves the boss randomly.
 *
 * @param {Object} boss - The boss instance.
 * @returns {void}
 */
export function moveRandom(boss) {
    boss.updateRandomTarget();
    boss.moveToTarget();
    boss.otherDirection = boss.targetX > boss.x;
}


/**
 * Updates the random target.
 *
 * @param {Object} boss - The boss instance.
 * @returns {void}
 */
export function updateRandomTarget(boss) {
    const now = Date.now();

    if (now <= boss.nextTargetAt) return;

    boss.targetX = boss.randomBetween(boss.minX, boss.maxX);
    boss.targetY = boss.randomBetween(boss.minY, boss.maxY);
    boss.nextTargetAt = now + boss.randomBetween(900, 1800);
}


/**
 * Moves towards the target.
 *
 * @param {Object} boss - The boss instance.
 * @returns {void}
 */
export function moveToTarget(boss) {
    boss.x += (boss.targetX - boss.x) * 0.015;
    boss.y += (boss.targetY - boss.y) * 0.015;
}