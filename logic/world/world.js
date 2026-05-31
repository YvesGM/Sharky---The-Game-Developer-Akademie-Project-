import Background from "./background/background.js";
import Entities from "./entities/entities.js";
import Collectibles from "./entities/collectibles.js";
import Enemies from "./characters/enemies.js";
import Sharky from "./characters/sharky.js";
import Keyboard from "../../lib/classes/keyboard/keyboard.class.js";
import HUD from "./hud/hud.js";

import { getCameraX, setCameraX, debugHitboxes } from "./functions/world-utils.js";
import { gameState } from "./functions/world-state.js";
import { checkBossIntroSound } from "./functions/world-status.js";
import { drawBossHud } from "./functions/world-boss-hud.js";
import { drawWorldHitboxes, drawSharkyHitbox } from "./functions/world-debug.js";

/**
 * Initializes the canvas and starts the game loop.
 *
 * @returns {void}
 */
export default function loadCanvas() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    setCanvasResolution(canvas, ctx);
    loadWorld(ctx, canvas);
}


/**
 * Sets the canvas resolution based on the device pixel ratio.
 *
 * @param {HTMLCanvasElement} canvas - The game canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {void}
 */
function setCanvasResolution(canvas, ctx) {
    const ctxResolution = window.devicePixelRatio;

    canvas.width = 1920 * ctxResolution;
    canvas.height = 1080 * ctxResolution;
    ctx.scale(ctxResolution, ctxResolution);
}


/**
 * Runs one frame of the game loop.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {HTMLCanvasElement} canvas - The game canvas.
 * @returns {void}
 */
function loadWorld(ctx, canvas) {
    clearCanvas(ctx, canvas);

    if (handleRestartKey()) return;

    updateRunningGame();
    drawGameWorld(ctx);
    updateGameCamera(ctx);
    drawGameOverlay(ctx);
    requestAnimationFrame(() => loadWorld(ctx, canvas));
}


/**
 * Clears the current canvas frame.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {HTMLCanvasElement} canvas - The game canvas.
 * @returns {void}
 */
function clearCanvas(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


/**
 * Handles restart input from the keyboard.
 *
 * @returns {boolean} Whether the game was restarted.
 */
function handleRestartKey() {
    if (!Keyboard.RESTART) return false;

    gameState.restart();
    return true;
}


/**
 * Updates game logic while the game is running.
 *
 * @returns {void}
 */
function updateRunningGame() {
    if (gameState.status !== 'running') return;

    checkBossIntroSound();

    gameState.checkCollectibles();
    gameState.checkCollisions();
    gameState.checkAttacks();
    gameState.checkStatus();
}




/**
 * Draws all translated world elements.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {void}
 */
function drawGameWorld(ctx) {
    ctx.save();
    ctx.translate(-getCameraX(), 0);
    drawTranslatedWorld(ctx);
    ctx.restore();
}


/**
 * Draws all world objects inside the camera translation.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {void}
 */
function drawTranslatedWorld(ctx) {
    Background(ctx);
    Entities(ctx);
    Collectibles(ctx);
    Enemies(ctx, gameState.getSharky(), getCameraX());
    gameState.updateBubbles(ctx);

    drawDebugWorldIfEnabled(ctx);
}


/**
 * Updates the camera based on Sharky's position.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {void}
 */
function updateGameCamera(ctx) {
    if (gameState.status === 'won') {
        drawFrozenSharky(ctx);
        return;
    }

    const nextCameraX = Sharky(ctx, getCameraX(), gameState);

    setCameraX(nextCameraX);
}

/**
 * Draws Sharky without movement after the game is won.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {void}
 */
function drawFrozenSharky(ctx) {
    gameState.getSharky().drawImg(ctx);
}


/**
 * Draws all fixed overlay elements.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {void}
 */
function drawGameOverlay(ctx) {
    drawDebugSharkyIfEnabled(ctx);
    HUD(ctx);
    drawBossHud(ctx);
}


/**
 * Draws world hitboxes when debug mode is enabled.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {void}
 */
function drawDebugWorldIfEnabled(ctx) {
    if (debugHitboxes) {
        drawWorldHitboxes(ctx);
    }
}


/**
 * Draws Sharky's hitbox when debug mode is enabled.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {void}
 */
function drawDebugSharkyIfEnabled(ctx) {
    if (debugHitboxes) {
        drawSharkyHitbox(ctx);
    }
}


