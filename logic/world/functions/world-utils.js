let camera_x = 0;
export let debugHitboxes = false;

export function getCameraX() {
    return camera_x;
}

export function setCameraX(value) {
    camera_x = value;
}

export function isDebugHitboxesEnabled() {
    return debugHitboxes;
}

/**
 * Checks whether an enemy is a boss enemy.
 *
 * @param {Object} enemy - The enemy object.
 * @returns {boolean} Whether the enemy is a boss.
 */
export function isBossEnemy(enemy) {
    return enemy.health !== undefined;
}