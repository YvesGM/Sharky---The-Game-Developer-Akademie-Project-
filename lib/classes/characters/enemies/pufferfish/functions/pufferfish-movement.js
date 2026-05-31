/**
 * Moves the pufferfish.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @returns {void}
 */
export function move(pufferfish) {
    pufferfish.moveByDirection();
    pufferfish.applyHorizontalBounds();
    pufferfish.applyVerticalBounds();
    pufferfish.applyWorldBounds();
    pufferfish.otherDirection = pufferfish.directionX > 0;
}


/**
 * Moves by current direction.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @returns {void}
 */
export function moveByDirection(pufferfish) {
    pufferfish.x += pufferfish.speed * 0.35 * pufferfish.directionX;
    pufferfish.y += pufferfish.speed * pufferfish.verticalSpeedFactor * pufferfish.directionY;
}


/**
 * Applies horizontal bounds.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @returns {void}
 */
export function applyHorizontalBounds(pufferfish) {
    if (pufferfish.x <= pufferfish.startX - pufferfish.rangeX) pufferfish.setLeftBound();
    if (pufferfish.x >= pufferfish.startX + pufferfish.rangeX) pufferfish.setRightBound();
}


/**
 * Applies vertical bounds.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @returns {void}
 */
export function applyVerticalBounds(pufferfish) {
    if (pufferfish.y <= pufferfish.startY - pufferfish.rangeY) pufferfish.setTopBound();
    if (pufferfish.y >= pufferfish.startY + pufferfish.rangeY) pufferfish.setBottomBound();
}


/**
 * Applies world bounds.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @returns {void}
 */
export function applyWorldBounds(pufferfish) {
    if (pufferfish.y <= pufferfish.minY) pufferfish.setMinY();
    if (pufferfish.y + pufferfish.h >= pufferfish.maxY) pufferfish.setMaxY();
}


/**
 * Sets left bound.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @returns {void}
 */
export function setLeftBound(pufferfish) {
    pufferfish.x = pufferfish.startX - pufferfish.rangeX;
    pufferfish.directionX = 1;
}


/**
 * Sets right bound.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @returns {void}
 */
export function setRightBound(pufferfish) {
    pufferfish.x = pufferfish.startX + pufferfish.rangeX;
    pufferfish.directionX = -1;
}


/**
 * Sets top bound.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @returns {void}
 */
export function setTopBound(pufferfish) {
    pufferfish.y = pufferfish.startY - pufferfish.rangeY;
    pufferfish.directionY = 1;
}


/**
 * Sets bottom bound.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @returns {void}
 */
export function setBottomBound(pufferfish) {
    pufferfish.y = pufferfish.startY + pufferfish.rangeY;
    pufferfish.directionY = -1;
}


/**
 * Sets minimum y position.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @returns {void}
 */
export function setMinY(pufferfish) {
    pufferfish.y = pufferfish.minY;
    pufferfish.directionY = 1;
}


/**
 * Sets maximum y position.
 *
 * @param {Object} pufferfish - The pufferfish instance.
 * @returns {void}
 */
export function setMaxY(pufferfish) {
    pufferfish.y = pufferfish.maxY - pufferfish.h;
    pufferfish.directionY = -1;
}