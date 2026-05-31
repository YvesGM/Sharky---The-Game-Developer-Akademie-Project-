import { ENEMIES } from "../../../lib/configs/characters/enemy.configs.js";
import { AUDIO_MANAGER } from "../../../lib/configs/audio/audio.configs.js";
import { gameState } from "./world-state.js";

let bossIntroSoundPlayed = false;

/**
 * Plays the boss intro sound once when the boss intro starts.
 *
 * @returns {void}
 */
export function checkBossIntroSound() {
    const boss = ENEMIES.find(enemy => enemy.health !== undefined);

    if (!boss) return;
    if (bossIntroSoundPlayed) return;

    if (isBossIntroActive(boss)) {
        AUDIO_MANAGER.play("bossIntro");
        bossIntroSoundPlayed = true;
    }
}

/**
 * Checks whether the boss intro is currently active.
 *
 * @param {Object} boss - The boss enemy object.
 * @returns {boolean} Whether the boss intro is active.
 */
function isBossIntroActive(boss) {
    return boss.bossState === 'intro' ||
        boss.bossState === 'appearing' ||
        boss.bossState === 'fighting';
}

/**
 * Checks the current win or lose status.
 *
 * @returns {void}
 */
export function checkGameStatus() {
    const sharky = gameState.getSharky();
    const boss = ENEMIES.find(enemy => enemy.health !== undefined);

    if (handleSharkyDeath(sharky)) return;
    if (handleBossDeath(boss)) return;

    setRunningStatus();
}


/**
 * Handles Sharky's death state.
 *
 * @param {Object} sharky - The active Sharky object.
 * @returns {boolean} Whether Sharky is dead.
 */
function handleSharkyDeath(sharky) {
    if (!sharky.isDead) return false;

    setFinishedStatus('gameOver', 'Game Over - Press R to Restart');

    AUDIO_MANAGER.stopAllMusic();
    AUDIO_MANAGER.play("gameOver");

    gameState.finishGame('sharkyGameOver');
    return true;
}


/**
 * Handles the boss death state.
 *
 * @param {Object} boss - The boss enemy object.
 * @returns {boolean} Whether the boss is dead.
 */
function handleBossDeath(boss) {
    if (!boss || !boss.isDead) return false;

    setFinishedStatus('won', 'You Won - Boss Defeated');

    AUDIO_MANAGER.stopAllMusic();
    AUDIO_MANAGER.play("win");

    gameState.finishGame('sharkyGameWon');
    return true;
}


/**
 * Sets a finished game status.
 *
 * @param {string} status - The new game status.
 * @param {string} message - The status message.
 * @returns {void}
 */
function setFinishedStatus(status, message) {
    gameState.status = status;
    gameState.message = message;
}


/**
 * Sets the game status to running.
 *
 * @returns {void}
 */
function setRunningStatus() {
    gameState.status = 'running';
    gameState.message = '';
}