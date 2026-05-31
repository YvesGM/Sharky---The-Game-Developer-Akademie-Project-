/**
 * Finishes inflating if animation is done.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @returns {void}
 */
export function finishInflatingIfNeeded(pufferfish) {
    if (!pufferfish.inflateDone) return;

    pufferfish.inflateState = 'inflated';
    pufferfish.inflateDone = false;
    pufferfish.resetAnimation();
}


/**
 * Finishes deflating if animation is done.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @returns {void}
 */
export function finishDeflatingIfNeeded(pufferfish) {
    if (!pufferfish.deflateDone) return;

    pufferfish.inflateState = 'normal';
    pufferfish.deflateDone = false;
    pufferfish.resetAnimation();
}


/**
 * Updates inflate state based on Sharky distance.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @param {Object} sharky - The Sharky object.
 * @param {number} camera_x - The camera position.
 * @returns {void}
 */
export function updateInflateState(pufferfish, sharky, camera_x) {
    if (!sharky) return;

    const sharkyIsNear = pufferfish.isSharkyNear(sharky, camera_x);

    pufferfish.changeInflateState(sharkyIsNear);
}


/**
 * Checks whether Sharky is near.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @param {Object} sharky - The Sharky object.
 * @param {number} camera_x - The camera position.
 * @returns {boolean} Whether Sharky is near.
 */
export function isSharkyNear(pufferfish, sharky, camera_x) {
    return pufferfish.getDistanceToSharky(sharky, camera_x) <= pufferfish.inflateRange;
}


/**
 * Returns distance to Sharky.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @param {Object} sharky - The Sharky object.
 * @param {number} camera_x - The camera position.
 * @returns {number} The distance.
 */
export function getDistanceToSharky(pufferfish, sharky, camera_x) {
    const fishCenter = pufferfish.getCenter(pufferfish);
    const sharkyCenter = pufferfish.getSharkyCenter(sharky, camera_x);

    return pufferfish.getDistance(fishCenter, sharkyCenter);
}


/**
 * Returns Sharky's center position.
 *
 * @param {Object} sharky - The Sharky object.
 * @param {number} camera_x - The camera position.
 * @returns {Object} Sharky's center.
 */
export function getSharkyCenter(sharky, camera_x) {
    return {
        x: sharky.x + camera_x + sharky.w / 2,
        y: sharky.y + sharky.h / 2
    };
}


/**
 * Changes inflate state.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @param {boolean} sharkyIsNear - Whether Sharky is near.
 * @returns {void}
 */
export function changeInflateState(pufferfish, sharkyIsNear) {
    if (sharkyIsNear && pufferfish.inflateState === 'normal') pufferfish.startInflating();
    if (!sharkyIsNear && pufferfish.inflateState === 'inflated') pufferfish.startDeflating();
}


/**
 * Starts inflating.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @returns {void}
 */
export function startInflating(pufferfish) {
    pufferfish.inflateState = 'inflating';
    pufferfish.resetInflateAnimation();
}


/**
 * Starts deflating.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @returns {void}
 */
export function startDeflating(pufferfish) {
    pufferfish.inflateState = 'deflating';
    pufferfish.resetInflateAnimation();
}


/**
 * Resets inflate animation.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @returns {void}
 */
export function resetInflateAnimation(pufferfish) {
    pufferfish.inflateDone = false;
    pufferfish.deflateDone = false;
    pufferfish.resetAnimation();
}