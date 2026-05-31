/**
 * Returns Sharky's attack box.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {number} camera_x - The camera position.
 * @returns {Object} The attack box.
 */
export function getAttackBox(sharky, camera_x = 0) {
    const hitbox = sharky.getHitbox(camera_x);
    const attackData = sharky.getAttackBoxData(hitbox);

    return sharky.createAttackBox(hitbox, attackData);
}


/**
 * Returns attack box data.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {Object} hitbox - Sharky's hitbox.
 * @returns {Object} The attack box data.
 */
export function getAttackBoxData(sharky, hitbox) {
    return {
        range: sharky.attackType === 'bubble' ? sharky.w * 2.15 : 190,
        heightOffset: sharky.attackType === 'bubble' ? 10 : 5,
        height: hitbox.h
    };
}


/**
 * Creates the attack box.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {Object} hitbox - Sharky's hitbox.
 * @param {Object} attackData - The attack box data.
 * @returns {Object} The attack box.
 */
export function createAttackBox(sharky, hitbox, attackData) {
    if (sharky.otherDirection) {
        return sharky.createLeftAttackBox(hitbox, attackData);
    }

    return sharky.createRightAttackBox(hitbox, attackData);
}


/**
 * Creates left attack box.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {Object} hitbox - Sharky's hitbox.
 * @param {Object} attackData - The attack box data.
 * @returns {Object} The attack box.
 */
export function createLeftAttackBox(sharky, hitbox, attackData) {
    return {
        x: hitbox.x - attackData.range,
        y: hitbox.y + attackData.heightOffset,
        w: attackData.range,
        h: attackData.height - attackData.heightOffset * 2
    };
}


/**
 * Creates right attack box.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {Object} hitbox - Sharky's hitbox.
 * @param {Object} attackData - The attack box data.
 * @returns {Object} The attack box.
 */
export function createRightAttackBox(sharky, hitbox, attackData) {
    return {
        x: hitbox.x + hitbox.w,
        y: hitbox.y + attackData.heightOffset,
        w: attackData.range,
        h: attackData.height - attackData.heightOffset * 2
    };
}