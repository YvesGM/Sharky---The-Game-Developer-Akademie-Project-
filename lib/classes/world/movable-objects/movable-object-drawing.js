/**
 * Draws the current object image.
 *
 * @param {Object} movableObject - The movable object instance.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {void}
 */
export function drawImg(movableObject, ctx) {
    if (!canDrawImage(movableObject)) return;

    ctx.save();
    drawImageByDirection(movableObject, ctx);
    ctx.restore();
}


/**
 * Checks whether the current image can be drawn.
 *
 * @param {Object} movableObject - The movable object instance.
 * @returns {boolean} Whether the image can be drawn.
 */
export function canDrawImage(movableObject) {
    return movableObject.img &&
        movableObject.img.complete &&
        movableObject.img.naturalWidth !== 0;
}


/**
 * Draws the image based on the current direction.
 *
 * @param {Object} movableObject - The movable object instance.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {void}
 */
export function drawImageByDirection(movableObject, ctx) {
    if (movableObject.otherDirection) {
        drawMirroredImage(movableObject, ctx);
        return;
    }

    ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.w, movableObject.h);
}


/**
 * Draws the image mirrored.
 *
 * @param {Object} movableObject - The movable object instance.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {void}
 */
export function drawMirroredImage(movableObject, ctx) {
    ctx.translate(movableObject.x + movableObject.w, movableObject.y);
    ctx.scale(-1, 1);
    ctx.drawImage(movableObject.img, 0, 0, movableObject.w, movableObject.h);
}


/**
 * Loads all images from one storage.
 *
 * @param {Object} movableObject - The movable object instance.
 * @param {string[]} storage - The image path storage.
 * @returns {void}
 */
export function drawFrames(movableObject, storage) {
    storage.forEach(path => {
        loadFrame(movableObject, path);
    });
}


/**
 * Loads one image frame into the cache.
 *
 * @param {Object} movableObject - The movable object instance.
 * @param {string} path - The image path.
 * @returns {void}
 */
export function loadFrame(movableObject, path) {
    const storageImg = new Image();

    storageImg.src = path;
    movableObject.imageCache[path] = storageImg;
}