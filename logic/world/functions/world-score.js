import { gameState } from "./world-state.js";

/**
 * Finishes the current game once.
 *
 * @param {string} eventName - The event name to dispatch.
 * @returns {void}
 */
export function finishCurrentGame(eventName) {
    if (gameState.endEventDispatched) return;

    gameState.endedAt = Date.now();
    gameState.endEventDispatched = true;
    dispatchGameEndEvent(eventName);
}


/**
 * Dispatches the game end event.
 *
 * @param {string} eventName - The event name to dispatch.
 * @returns {void}
 */
function dispatchGameEndEvent(eventName) {
    window.dispatchEvent(new CustomEvent(eventName, {
        detail: gameState.getScore()
    }));
}


/**
 * Returns the current score values.
 *
 * @returns {Object} The score values.
 */
export function getCurrentScore() {
    const sharky = gameState.getSharky();
    const duration = getGameDuration();

    return {
        coins: sharky.coins,
        poison: sharky.totalPoisonCollected || 0,
        time: gameState.formatTime(duration)
    };
}


/**
 * Returns the current game duration in seconds.
 *
 * @returns {number} The duration in seconds.
 */
function getGameDuration() {
    const endTime = gameState.endedAt || Date.now();

    return Math.floor((endTime - gameState.startedAt) / 1000);
}


/**
 * Formats seconds as minutes and seconds.
 *
 * @param {number} seconds - The time in seconds.
 * @returns {string} The formatted time.
 */
export function formatGameTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const restSeconds = seconds % 60;

    return `${minutes}:${restSeconds.toString().padStart(2, '0')}`;
}