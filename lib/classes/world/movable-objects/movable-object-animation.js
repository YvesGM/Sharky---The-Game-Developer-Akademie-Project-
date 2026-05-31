/**
 * Animates the object with the given image storage.
 *
 * @param {Object} movableObject - The movable object instance.
 * @param {string[]} currentStorage - The current animation storage.
 * @returns {void}
 */
export function animateCharacters(movableObject, currentStorage) {
    const now = Date.now();

    if (!movableObject.lastFrameTime) movableObject.lastFrameTime = now;
    if (!canAnimate(now, movableObject.lastFrameTime, 100)) return;

    setNextAnimationImage(movableObject, currentStorage);
    movableObject.lastFrameTime = now;
}


/**
 * Checks whether an animation frame can change.
 *
 * @param {number} now - The current timestamp.
 * @param {number} lastFrameTime - The last frame timestamp.
 * @param {number} delay - The animation delay.
 * @returns {boolean} Whether the frame can change.
 */
export function canAnimate(now, lastFrameTime, delay) {
    return now - lastFrameTime > delay;
}


/**
 * Sets the next looping animation image.
 *
 * @param {Object} movableObject - The movable object instance.
 * @param {string[]} currentStorage - The current animation storage.
 * @returns {void}
 */
export function setNextAnimationImage(movableObject, currentStorage) {
    const imgIndex = movableObject.currentImg % currentStorage.length;
    const currentImgPath = currentStorage[imgIndex];

    movableObject.img = movableObject.imageCache[currentImgPath];
    movableObject.currentImg++;
}


/**
 * Animates one sequence once.
 *
 * @param {Object} movableObject - The movable object instance.
 * @param {string[]} currentStorage - The current animation storage.
 * @param {string} finishedKey - The finished state key.
 * @returns {void}
 */
export function animateOnce(movableObject, currentStorage, finishedKey) {
    const now = Date.now();

    initFinishedKey(movableObject, finishedKey);
    if (handleFinishedAnimation(movableObject, currentStorage, finishedKey)) return;

    updateOnceAnimation(movableObject, currentStorage, finishedKey, now);
}


/**
 * Initializes a finished key if needed.
 *
 * @param {Object} movableObject - The movable object instance.
 * @param {string} finishedKey - The finished state key.
 * @returns {void}
 */
export function initFinishedKey(movableObject, finishedKey) {
    if (movableObject[finishedKey] === undefined) {
        movableObject[finishedKey] = false;
    }
}


/**
 * Handles an already finished animation.
 *
 * @param {Object} movableObject - The movable object instance.
 * @param {string[]} currentStorage - The current animation storage.
 * @param {string} finishedKey - The finished state key.
 * @returns {boolean} Whether the animation is finished.
 */
export function handleFinishedAnimation(movableObject, currentStorage, finishedKey) {
    if (!movableObject[finishedKey]) return false;

    setLastAnimationImage(movableObject, currentStorage);
    return true;
}


/**
 * Sets the last image of an animation.
 *
 * @param {Object} movableObject - The movable object instance.
 * @param {string[]} currentStorage - The current animation storage.
 * @returns {void}
 */
export function setLastAnimationImage(movableObject, currentStorage) {
    const lastImgPath = currentStorage[currentStorage.length - 1];

    movableObject.img = movableObject.imageCache[lastImgPath];
}


/**
 * Updates an animation that should run once.
 *
 * @param {Object} movableObject - The movable object instance.
 * @param {string[]} currentStorage - The current animation storage.
 * @param {string} finishedKey - The finished state key.
 * @param {number} now - The current timestamp.
 * @returns {void}
 */
export function updateOnceAnimation(movableObject, currentStorage, finishedKey, now) {
    if (!movableObject.lastFrameTime) movableObject.lastFrameTime = now;
    if (!canAnimate(now, movableObject.lastFrameTime, 100)) return;

    setNextOnceImage(movableObject, currentStorage, finishedKey);
    movableObject.lastFrameTime = now;
}


/**
 * Sets the next image of a one-time animation.
 *
 * @param {Object} movableObject - The movable object instance.
 * @param {string[]} currentStorage - The current animation storage.
 * @param {string} finishedKey - The finished state key.
 * @returns {void}
 */
export function setNextOnceImage(movableObject, currentStorage, finishedKey) {
    if (movableObject.currentImg >= currentStorage.length) {
        finishOnceAnimation(movableObject, finishedKey);
        return;
    }

    setCurrentOnceImage(movableObject, currentStorage);
}


/**
 * Finishes a one-time animation.
 *
 * @param {Object} movableObject - The movable object instance.
 * @param {string} finishedKey - The finished state key.
 * @returns {void}
 */
export function finishOnceAnimation(movableObject, finishedKey) {
    movableObject[finishedKey] = true;
    movableObject.currentImg = 0;
}


/**
 * Sets the current image of a one-time animation.
 *
 * @param {Object} movableObject - The movable object instance.
 * @param {string[]} currentStorage - The current animation storage.
 * @returns {void}
 */
export function setCurrentOnceImage(movableObject, currentStorage) {
    const currentImgPath = currentStorage[movableObject.currentImg];

    movableObject.img = movableObject.imageCache[currentImgPath];
    movableObject.currentImg++;
}