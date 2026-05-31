import { COINS, POISONS } from "../../../lib/configs/entities/collectibles.configs.js";
import { AUDIO_MANAGER } from "../../../lib/configs/audio/audio.configs.js";
import { gameState } from "./world-state.js";
import { getCameraX } from "./world-utils.js";

/**
 * Checks all collectible collisions.
 *
 * @returns {void}
 */
export function checkGameCollectibles() {
    const sharky = gameState.getSharky();

    COINS.forEach(coin => collectItem(sharky, coin, 'collectCoin'));
    POISONS.forEach(poison => collectItem(sharky, poison, 'collectPoison'));
}


/**
 * Collects one collectible item.
 *
 * @param {Object} sharky - The active Sharky object.
 * @param {Object} item - The collectible item.
 * @param {string} collectMethod - The Sharky collect method.
 * @returns {void}
 */
function collectItem(sharky, item, collectMethod) {
    if (item.isCollected) return;
    if (!sharky.isColliding(item, getCameraX())) return;

    item.isCollected = true;
    sharky[collectMethod](item.value);

    playCollectSound(collectMethod);
}

/**
 * Plays the matching collectible sound.
 *
 * @param {string} collectMethod - The Sharky collect method.
 * @returns {void}
 */
function playCollectSound(collectMethod) {
    if (collectMethod === 'collectCoin') {
        AUDIO_MANAGER.play("coin");
        return;
    }

    if (collectMethod === 'collectPoison') {
        AUDIO_MANAGER.play("bottle");
    }
}