import { checkGameCollisions } from "./world-collisions.js";
import { checkGameCollectibles } from "./world-collectibles.js";
import { checkGameAttacks } from "./world-attacks.js";
import { checkGameStatus } from "./world-status.js";
import { spawnGameBubble, updateGameBubbles } from "./world-bubbles.js";
import { finishCurrentGame } from "./world-score.js";
import { getCurrentScore, formatGameTime } from "./world-score.js";
import { SHARKY } from "../../../lib/configs/characters/sharky.configs.js";
import { ENTITIES } from "../../../lib/configs/entities/entity.configs.js";

export const gameState = {
    status: 'running',
    message: '',
    endEventDispatched: false,
    startedAt: Date.now(),
    endedAt: null,

    /**
     * Returns the current Sharky instance.
     *
     * @returns {Object} The active Sharky object.
     */
    getSharky() {
        return SHARKY[0];
    },

    /**
     * Checks whether Sharky is blocked by an entity.
     *
     * @param {Object} sharky - The active Sharky object.
     * @param {number} camera - The current camera position.
     * @returns {boolean} Whether Sharky is blocked.
     */
    isBlocked(sharky, camera) {
        return ENTITIES.some(entity => sharky.isColliding(entity, camera));
    },

    /**
     * Checks all enemy collisions.
     *
     * @returns {void}
     */
    checkCollisions() {
        checkGameCollisions();
    },

    /**
     * Checks all collectible collisions.
     *
     * @returns {void}
     */
    checkCollectibles() {
        checkGameCollectibles();
    },

    /**
     * Checks all active attacks.
     *
     * @returns {void}
     */
    checkAttacks() {
        checkGameAttacks();
    },

    /**
     * Checks the current game status.
     *
     * @returns {void}
     */
    checkStatus() {
        checkGameStatus();
    },

    /**
     * Spawns a bubble attack.
     *
     * @returns {void}
     */
    spawnBubble() {
        spawnGameBubble();
    },

    /**
     * Updates all active bubbles.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas context.
     * @returns {void}
     */
    updateBubbles(ctx) {
        updateGameBubbles(ctx);
    },

    /**
     * Finishes the game and dispatches the final event.
     *
     * @param {string} eventName - The event name to dispatch.
     * @returns {void}
     */
    finishGame(eventName) {
        finishCurrentGame(eventName);
    },

    /**
     * Returns the final game score.
     *
     * @returns {Object} The score values.
     */
    getScore() {
        return getCurrentScore();
    },

    /**
     * Formats seconds into a minute string.
     *
     * @param {number} seconds - The time in seconds.
     * @returns {string} The formatted time.
     */
    formatTime(seconds) {
        return formatGameTime(seconds);
    },

    /**
     * Restarts the game.
     *
     * @returns {void}
     */
    restart() {
        sessionStorage.setItem("sharkyAutoStartAfterRestart", "true");
        window.location.reload();
    }
};