/**
 * Initializes movement values.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @param {number} x - The start x position.
 * @param {number} y - The start y position.
 * @param {number} speed - The base speed.
 * @returns {void}
 */
export function initMovementValues(pufferfish, x, y, speed) {
    pufferfish.startX = x;
    pufferfish.startY = y;
    pufferfish.speed = pufferfish.randomBetween(speed * pufferfish.config.speedMin, speed * pufferfish.config.speedMax);
    pufferfish.rangeX = pufferfish.randomBetween(260, 500);
    pufferfish.rangeY = pufferfish.randomBetween(80, 180);
    pufferfish.minY = 40;
    pufferfish.maxY = 980;
    pufferfish.initDirectionValues();
}


/**
 * Initializes direction values.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @returns {void}
 */
export function initDirectionValues(pufferfish) {
    pufferfish.verticalSpeedFactor = pufferfish.randomBetween(
        pufferfish.config.verticalSpeedMin,
        pufferfish.config.verticalSpeedMax
    );

    pufferfish.directionX = Math.random() < 0.5 ? -1 : 1;
    pufferfish.directionY = Math.random() < 0.5 ? -1 : 1;
    pufferfish.damage = 25;
    pufferfish.otherDirection = pufferfish.directionX > 0;
}


/**
 * Initializes inflate values.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @returns {void}
 */
export function initInflateValues(pufferfish) {
    pufferfish.inflateRange = 7500;
    pufferfish.inflateState = 'normal';
    pufferfish.inflateAnimation = pufferfish.config.transition;
    pufferfish.deflateAnimation = [...pufferfish.config.transition].reverse();
}


/**
 * Initializes hitbox offset.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @returns {void}
 */
export function initOffset(pufferfish) {
    pufferfish.offset = {
        top: 15,
        right: 0,
        bottom: 45,
        left: 10
    };
}


/**
 * Loads all image storages.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @returns {void}
 */
export function loadImgStorage(pufferfish) {
    pufferfish.drawFrames(pufferfish.config.swimming);
    pufferfish.drawFrames(pufferfish.config.dead);
    pufferfish.drawFrames(pufferfish.config.transition);
    pufferfish.drawFrames(pufferfish.config.bubbleSwimming);
    pufferfish.drawFrames(pufferfish.deflateAnimation);
}


/**
 * Returns a random value between min and max.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} The random value.
 */
export function randomBetween(pufferfish, min, max) {
    return Math.random() * (max - min) + min;
}


/**
 * Resets animation values.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @returns {void}
 */
export function resetAnimation(pufferfish) {
    pufferfish.currentImg = 0;
    pufferfish.lastFrameTime = null;
}