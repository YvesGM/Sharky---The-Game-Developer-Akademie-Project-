import Keyboard from "../../keyboard/keyboard.class.js";

import {
    SHARKY_HURT_POISONED,
    SHARKY_DEAD_POISONED
} from "../../../storage/characters/sharky.storage.js";


/**
 * Draws and updates Sharky.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {number} camera_x - The camera position.
 * @param {Object} gameState - The current game state.
 * @returns {number} The updated camera position.
 */
export function draw(sharky, ctx, camera_x, gameState) {
    sharky.handlePendingShockDamage();

    if (sharky.drawDeadState(ctx)) return camera_x;
    if (sharky.drawElectricShockState(ctx)) return camera_x;
    if (sharky.startKeyboardAttack()) return sharky.drawAttackState(ctx, camera_x);
    if (sharky.drawAttackIfActive(ctx)) return camera_x;
    if (sharky.drawHurtState(ctx)) return camera_x;

    return sharky.drawMovementState(ctx, camera_x, gameState);
}


/**
 * Draws dead state if needed.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {boolean} Whether dead state was drawn.
 */
export function drawDeadState(sharky, ctx) {
    if (!sharky.isDead) return false;

    sharky.animateCharacters(SHARKY_DEAD_POISONED);
    sharky.drawImg(ctx);
    return true;
}


/**
 * Draws electric shock state if needed.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {boolean} Whether shock state was drawn.
 */
export function drawElectricShockState(sharky, ctx) {
    if (!sharky.isElectrocuted()) return false;

    sharky.electricShock(ctx);
    return true;
}


/**
 * Starts an attack from keyboard input.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {boolean} Whether an attack was started.
 */
export function startKeyboardAttack(sharky) {
    if (Keyboard.SPACE && sharky.canAttack()) {
        sharky.startBubbleAttack();
        return true;
    }

    return sharky.startFinAttackByKey();
}


/**
 * Starts bubble attack by key.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {void}
 */
export function startBubbleAttack(sharky) {
    sharky.resetWaitingTimer();
    sharky.startAttack('bubble');
}


/**
 * Starts fin attack by key.
 *
 * @param {Object} sharky - The Sharky instance.
 * @returns {boolean} Whether fin attack was started.
 */
export function startFinAttackByKey(sharky) {
    if (!Keyboard.D || !sharky.canAttack()) return false;

    sharky.resetWaitingTimer();
    sharky.startAttack('fin');
    return true;
}


/**
 * Draws attack directly after starting.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {number} camera_x - The camera position.
 * @returns {number} The camera position.
 */
export function drawAttackState(sharky, ctx, camera_x) {
    sharky.attack(ctx);
    return camera_x;
}


/**
 * Draws attack if currently active.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {boolean} Whether attack state was drawn.
 */
export function drawAttackIfActive(sharky, ctx) {
    if (!sharky.isAttacking()) return false;

    sharky.attack(ctx);
    return true;
}


/**
 * Draws hurt state if needed.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {boolean} Whether hurt state was drawn.
 */
export function drawHurtState(sharky, ctx) {
    if (!sharky.isHurt()) return false;

    sharky.animateCharacters(SHARKY_HURT_POISONED);
    sharky.drawImg(ctx);
    return true;
}


/**
 * Draws moving or waiting state.
 *
 * @param {Object} sharky - The Sharky instance.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {number} camera_x - The camera position.
 * @param {Object} gameState - The current game state.
 * @returns {number} The updated camera position.
 */
export function drawMovementState(sharky, ctx, camera_x, gameState) {
    if (sharky.isMoving()) {
        sharky.resetWaitingTimer();
        return sharky.swim(ctx, camera_x, gameState);
    }

    sharky.standStill(ctx);
    return camera_x;
}