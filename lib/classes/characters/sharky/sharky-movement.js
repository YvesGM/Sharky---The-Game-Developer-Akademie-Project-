import Keyboard from "../../keyboard/keyboard.class.js";
import { sharkyKbFunctions } from "../../../../logic/world/keyboard/keyboard.js";

import {
    SHARKY_WAITING,
    SHARKY_LONG_WAITING,
    SHARKY_SWIMMING
} from "../../../storage/characters/sharky.storage.js";


/**
 * Draws waiting animation.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {void}
 */
export function standStill(sharky, ctx) {
    if (sharky.isLongWaiting()) {
        sharky.drawLongWaiting(ctx);
        return;
    }

    sharky.drawWaiting(ctx);
}


/**
 * Draws normal waiting animation.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {void}
 */
export function drawWaiting(sharky, ctx) {
    sharky.setAnimation('waiting');
    sharky.animateCharacters(SHARKY_WAITING);
    sharky.drawImg(ctx);
}


/**
 * Draws long waiting animation.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {void}
 */
export function drawLongWaiting(sharky, ctx) {
    sharky.setAnimation('longWaiting');
    sharky.animateCharacters(SHARKY_LONG_WAITING);
    sharky.drawImg(ctx);
}


/**
 * Draws swimming animation and movement.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {number} camera_x - The camera position.
 * @param {Object} gameState - The current game state.
 * @returns {number} The updated camera position.
 */
export function swim(sharky, ctx, camera_x, gameState) {
    sharky.setAnimation('swimming');
    sharky.animateCharacters(SHARKY_SWIMMING);
    camera_x = sharkyKbFunctions(sharky, camera_x, gameState);
    sharky.drawImg(ctx);
    return camera_x;
}


/**
 * Checks whether Sharky is moving.
 *
 * @returns {boolean} Whether Sharky is moving.
 */
export function isMoving() {
    return Keyboard.UP || Keyboard.DOWN || Keyboard.RIGHT || Keyboard.LEFT;
}


/**
 * Resets waiting timer.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {void}
 */
export function resetWaitingTimer(sharky) {
    sharky.lastAction = Date.now();
}


/**
 * Checks whether long waiting is active.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {boolean} Whether long waiting is active.
 */
export function isLongWaiting(sharky) {
    return Date.now() - sharky.lastAction > sharky.longWaitingDelay;
}