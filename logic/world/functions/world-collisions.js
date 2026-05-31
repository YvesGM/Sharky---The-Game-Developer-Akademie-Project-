import { ENEMIES } from "../../../lib/configs/characters/enemy.configs.js";
import { AUDIO_MANAGER } from "../../../lib/configs/audio/audio.configs.js";
import { gameState } from "./world-state.js";
import { getCameraX } from "./world-utils.js";
import { isBossEnemy } from "./world-utils.js";

/**
 * Checks one enemy collision with Sharky.
 *
 * @param {Object} sharky - The active Sharky object.
 * @param {Object} enemy - The enemy object.
 * @returns {void}
 */
function checkSingleEnemyCollision(sharky, enemy) {
    if (enemy.isDead) return;
    if (!sharky.isColliding(enemy, getCameraX())) return;

    handleEnemyCollision(sharky, enemy);
}

/**
 * Handles one active enemy collision.
 *
 * @param {Object} sharky - The active Sharky object.
 * @param {Object} enemy - The enemy object.
 * @returns {void}
 */
function handleEnemyCollision(sharky, enemy) {
    if (isBossEnemy(enemy)) {
        handleBossCollision(sharky, enemy);
        return;
    }

    handleNormalEnemyCollision(sharky, enemy);
}


/**
 * Handles a collision with the boss enemy.
 *
 * @param {Object} sharky - The active Sharky object.
 * @param {Object} enemy - The boss enemy object.
 * @returns {void}
 */
function handleBossCollision(sharky, enemy) {
    if (enemy.bossState !== 'fighting') return;

    if (enemy.canApplyAttackHit && enemy.canApplyAttackHit()) {
        sharky.hit(enemy.damage || 25, enemy);
        AUDIO_MANAGER.play("hurt");
    }
}


/**
 * Handles a collision with a normal enemy.
 *
 * @param {Object} sharky - The active Sharky object.
 * @param {Object} enemy - The enemy object.
 * @returns {void}
 */
function handleNormalEnemyCollision(sharky, enemy) {
    if (canSkipJellyfishFinCollision(sharky, enemy)) return;

    const now = Date.now();

    if (!sharky.canReceiveHit(now)) return;

    if (enemy.enemyType === 'jellyfish') {
        AUDIO_MANAGER.play("shock");
        enemy.startSuperDangerous();
        sharky.hit(enemy.damage || 15, enemy);
        return;
    }

    AUDIO_MANAGER.play("hurt");
    sharky.hit(enemy.damage || 15, enemy);
}

/**
 * Plays the matching enemy collision sound.
 *
 * @param {Object} enemy - The enemy object.
 * @returns {void}
 */
function playEnemyCollisionSound(enemy) {
    if (enemy.enemyType === 'jellyfish') {
        AUDIO_MANAGER.play("shock");
        return;
    }

    AUDIO_MANAGER.play("hurt");
}


/**
 * Checks whether a jellyfish fin collision should be skipped.
 *
 * @param {Object} sharky - The active Sharky object.
 * @param {Object} enemy - The enemy object.
 * @returns {boolean} Whether the collision should be skipped.
 */
function canSkipJellyfishFinCollision(sharky, enemy) {
    return enemy.enemyType === 'jellyfish' &&
        sharky.attackType === 'fin' &&
        sharky.isAttacking();
}


/**
 * Starts the dangerous jellyfish state when needed.
 *
 * @param {Object} enemy - The enemy object.
 * @returns {void}
 */
function startJellyfishDanger(enemy) {
    if (enemy.enemyType === 'jellyfish') {
        enemy.startSuperDangerous();
    }
}

/**
 * Checks all collisions between Sharky and enemies.
 *
 * @returns {void}
 */
export function checkGameCollisions() {
    const sharky = gameState.getSharky();

    ENEMIES.forEach(enemy => {
        checkSingleEnemyCollision(sharky, enemy);
    });
}