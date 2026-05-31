/**
 * Checks whether this object is near another object.
 *
 * @param {Object} movableObject - The movable object instance.
 * @param {Object} obj - The other object.
 * @param {number} range - The maximum distance.
 * @returns {boolean} Whether the object is near.
 */
export function isNear(movableObject, obj, range = 500) {
    const ownCenter = getCenter(movableObject);
    const objCenter = getCenter(obj);
    const distance = getDistance(ownCenter, objCenter);

    return distance <= range;
}


/**
 * Returns the center point of an object.
 *
 * @param {Object} obj - The object.
 * @returns {Object} The center point.
 */
export function getCenter(obj) {
    return {
        x: obj.x + obj.w / 2,
        y: obj.y + obj.h / 2
    };
}


/**
 * Returns the distance between two points.
 *
 * @param {Object} firstPoint - The first point.
 * @param {Object} secondPoint - The second point.
 * @returns {number} The distance.
 */
export function getDistance(firstPoint, secondPoint) {
    const distanceX = firstPoint.x - secondPoint.x;
    const distanceY = firstPoint.y - secondPoint.y;

    return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
}