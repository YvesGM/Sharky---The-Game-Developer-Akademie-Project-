/**
 * Sets the object position and size.
 *
 * @param {Object} movableObject - The movable object instance.
 * @param {number} x - The x position.
 * @param {number} y - The y position.
 * @param {number} w - The object width.
 * @param {number} h - The object height.
 * @returns {void}
 */
export function setPosition(movableObject, x, y, w, h) {
    movableObject.x = x;
    movableObject.y = y;
    movableObject.w = w;
    movableObject.h = h;
}


/**
 * Sets the movement values.
 *
 * @param {Object} movableObject - The movable object instance.
 * @param {number} speed - The movement speed.
 * @returns {void}
 */
export function setMovement(movableObject, speed) {
    movableObject.speed = speed;
    movableObject.otherDirection = false;
}


/**
 * Sets the object image.
 *
 * @param {Object} movableObject - The movable object instance.
 * @param {string} imgPath - The image path.
 * @returns {void}
 */
export function setImage(movableObject, imgPath) {
    movableObject.img = new Image();
    movableObject.img.src = imgPath;
}


/**
 * Sets the animation values.
 *
 * @param {Object} movableObject - The movable object instance.
 * @returns {void}
 */
export function setAnimationValues(movableObject) {
    movableObject.imageCache = {};
    movableObject.currentImg = 0;
    movableObject.lastFrameTime = null;
}


/**
 * Sets the death animation values.
 *
 * @param {Object} movableObject - The movable object instance.
 * @returns {void}
 */
export function setDeathValues(movableObject) {
    movableObject.isDead = false;
    movableObject.markedForDeletion = false;
    movableObject.deathFrame = 0;
    movableObject.lastDeathFrameTime = 0;
}


/**
 * Sets the default hitbox offset.
 *
 * @param {Object} movableObject - The movable object instance.
 * @returns {void}
 */
export function setDefaultOffset(movableObject) {
    movableObject.offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };
}