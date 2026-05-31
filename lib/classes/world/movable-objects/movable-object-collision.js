/**
 * Returns the object hitbox.
 *
 * @param {Object} movableObject - The movable object instance.
 * @param {number} camera_x - The current camera position.
 * @returns {Object} The object hitbox.
 */
export function getHitbox(movableObject, camera_x = 0) {
    return {
        x: movableObject.x + camera_x + movableObject.offset.left,
        y: movableObject.y + movableObject.offset.top,
        w: movableObject.w - movableObject.offset.left - movableObject.offset.right,
        h: movableObject.h - movableObject.offset.top - movableObject.offset.bottom
    };
}


/**
 * Checks whether this object collides with another object.
 *
 * @param {Object} movableObject - The movable object instance.
 * @param {Object} obj - The other object.
 * @param {number} camera_x - The current camera position.
 * @returns {boolean} Whether both objects collide.
 */
export function isColliding(movableObject, obj, camera_x = 0) {
    const firstBox = getHitbox(movableObject, camera_x);
    const secondBox = obj.getHitbox ? obj.getHitbox() : obj;

    return isBoxColliding(firstBox, secondBox);
}


/**
 * Checks whether two hitboxes overlap.
 *
 * @param {Object} firstBox - The first hitbox.
 * @param {Object} secondBox - The second hitbox.
 * @returns {boolean} Whether both hitboxes overlap.
 */
export function isBoxColliding(firstBox, secondBox) {
    return firstBox.x + firstBox.w > secondBox.x &&
        firstBox.x < secondBox.x + secondBox.w &&
        firstBox.y + firstBox.h > secondBox.y &&
        firstBox.y < secondBox.y + secondBox.h;
}