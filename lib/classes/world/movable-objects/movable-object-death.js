import { canAnimate } from "./movable-object-animation.js";

/**
 * Animates the death sequence.
 *
 * @param {Object} movableObject - The movable object instance.
 * @param {string[]} currentStorage - The death animation storage.
 * @returns {void}
 */
export function animateDeath(movableObject, currentStorage) {
    const now = Date.now();

    if (!movableObject.lastDeathFrameTime) movableObject.lastDeathFrameTime = now;
    updateDeathAnimation(movableObject, currentStorage, now);
    markDeletedAfterDeath(movableObject, currentStorage);
}


/**
 * Updates the death animation frame.
 *
 * @param {Object} movableObject - The movable object instance.
 * @param {string[]} currentStorage - The death animation storage.
 * @param {number} now - The current timestamp.
 * @returns {void}
 */
export function updateDeathAnimation(movableObject, currentStorage, now) {
    if (!canAnimate(now, movableObject.lastDeathFrameTime, 120)) return;

    setDeathImage(movableObject, currentStorage);
    movableObject.deathFrame++;
    movableObject.lastDeathFrameTime = now;
}


/**
 * Sets the current death image.
 *
 * @param {Object} movableObject - The movable object instance.
 * @param {string[]} currentStorage - The death animation storage.
 * @returns {void}
 */
export function setDeathImage(movableObject, currentStorage) {
    const currentImgPath = currentStorage[movableObject.deathFrame];

    movableObject.img = movableObject.imageCache[currentImgPath];
}


/**
 * Marks the object for deletion after death animation.
 *
 * @param {Object} movableObject - The movable object instance.
 * @param {string[]} currentStorage - The death animation storage.
 * @returns {void}
 */
export function markDeletedAfterDeath(movableObject, currentStorage) {
    if (movableObject.deathFrame >= currentStorage.length) {
        movableObject.markedForDeletion = true;
    }
}


/**
 * Starts the death state.
 *
 * @param {Object} movableObject - The movable object instance.
 * @returns {void}
 */
export function die(movableObject) {
    if (movableObject.isDead) return;

    movableObject.isDead = true;
    movableObject.speed = 0;
    movableObject.damage = 0;
    resetDeathAnimation(movableObject);
}


/**
 * Resets the death animation values.
 *
 * @param {Object} movableObject - The movable object instance.
 * @returns {void}
 */
export function resetDeathAnimation(movableObject) {
    movableObject.currentImg = 0;
    movableObject.deathFrame = 0;
    movableObject.lastDeathFrameTime = 0;
}