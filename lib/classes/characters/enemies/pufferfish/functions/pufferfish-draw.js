/**
 * Draws and updates the pufferfish.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {Object} sharky - The Sharky object.
 * @param {number} camera_x - The camera position.
 * @returns {void}
 */
export function draw(pufferfish, ctx, sharky, camera_x) {
    if (pufferfish.drawDeathIfNeeded(ctx)) return;

    pufferfish.move();
    pufferfish.updateInflateState(sharky, camera_x);
    pufferfish.drawInflateState(ctx);
}


/**
 * Draws death state if needed.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {boolean} Whether death was drawn.
 */
export function drawDeathIfNeeded(pufferfish, ctx) {
    if (!pufferfish.isDead) return false;

    pufferfish.animateDeath(pufferfish.config.dead);
    pufferfish.drawImg(ctx);
    return true;
}


/**
 * Draws the current inflate state.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {void}
 */
export function drawInflateState(pufferfish, ctx) {
    if (pufferfish.drawInflating(ctx)) return;
    if (pufferfish.drawDeflating(ctx)) return;
    if (pufferfish.drawInflated(ctx)) return;

    pufferfish.drawNormal(ctx);
}


/**
 * Draws inflating state.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {boolean} Whether state was drawn.
 */
export function drawInflating(pufferfish, ctx) {
    if (pufferfish.inflateState !== 'inflating') return false;

    pufferfish.damage = 25;
    pufferfish.animateOnce(pufferfish.inflateAnimation, 'inflateDone');
    pufferfish.finishInflatingIfNeeded();
    pufferfish.drawImg(ctx);
    return true;
}


/**
 * Draws deflating state.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {boolean} Whether state was drawn.
 */
export function drawDeflating(pufferfish, ctx) {
    if (pufferfish.inflateState !== 'deflating') return false;

    pufferfish.damage = 25;
    pufferfish.animateOnce(pufferfish.deflateAnimation, 'deflateDone');
    pufferfish.finishDeflatingIfNeeded();
    pufferfish.drawImg(ctx);
    return true;
}


/**
 * Draws inflated state.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {boolean} Whether state was drawn.
 */
export function drawInflated(pufferfish, ctx) {
    if (pufferfish.inflateState !== 'inflated') return false;

    pufferfish.damage = 35;
    pufferfish.animateCharacters(pufferfish.config.bubbleSwimming);
    pufferfish.drawImg(ctx);
    return true;
}


/**
 * Draws normal swimming state.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {void}
 */
export function drawNormal(pufferfish, ctx) {
    pufferfish.damage = 25;
    pufferfish.animateCharacters(pufferfish.config.swimming);
    pufferfish.drawImg(ctx);
}