import { ENEMIES } from "../../../lib/configs/characters/enemy.configs.js";
import { AUDIO_MANAGER } from "../../../lib/configs/audio/audio.configs.js";
import { gameState } from "./world-state.js";
import { getCameraX, isBossEnemy } from "./world-utils.js";

/**
 * Checks all current Sharky attacks.
 *
 * @returns {void}
 */
export function checkGameAttacks() {
    const sharky = gameState.getSharky();

    if (!sharky.isAttacking()) return;

    spawnBubbleAttackIfReady(sharky);
    ENEMIES.forEach(enemy => checkEnemyAttackHit(sharky, enemy));
}


/**
 * Spawns a bubble attack when Sharky is allowed to.
 *
 * @param {Object} sharky - The active Sharky object.
 * @returns {void}
 */
function spawnBubbleAttackIfReady(sharky) {
    if (sharky.attackType === 'bubble' && sharky.canSpawnBubble()) {
        gameState.spawnBubble();
    }
}


/**
 * Checks whether one enemy is hit by Sharky's attack.
 *
 * @param {Object} sharky - The active Sharky object.
 * @param {Object} enemy - The enemy object.
 * @returns {void}
 */
function checkEnemyAttackHit(sharky, enemy) {
    if (enemy.isDead) return;
    if (!isEnemyHitByAttack(sharky, enemy)) return;

    handleEnemyAttackHit(sharky, enemy);
}


/**
 * Checks if Sharky's attack box hits an enemy.
 *
 * @param {Object} sharky - The active Sharky object.
 * @param {Object} enemy - The enemy object.
 * @returns {boolean} Whether the enemy is hit.
 */
function isEnemyHitByAttack(sharky, enemy) {
    const attackBox = sharky.getAttackBox(getCameraX());
    const enemyBox = enemy.getHitbox();

    return isBoxColliding(attackBox, enemyBox);
}


/**
 * Checks collision between two boxes.
 *
 * @param {Object} firstBox - The first hitbox.
 * @param {Object} secondBox - The second hitbox.
 * @returns {boolean} Whether both boxes overlap.
 */
function isBoxColliding(firstBox, secondBox) {
    return firstBox.x + firstBox.w > secondBox.x &&
        firstBox.x < secondBox.x + secondBox.w &&
        firstBox.y + firstBox.h > secondBox.y &&
        firstBox.y < secondBox.y + secondBox.h;
}


/**
 * Handles a successful attack hit on an enemy.
 *
 * @param {Object} sharky - The active Sharky object.
 * @param {Object} enemy - The enemy object.
 * @returns {void}
 */
function handleEnemyAttackHit(sharky, enemy) {
    if (isBossEnemy(enemy)) {
        handleBossAttackHit(sharky, enemy);
        return;
    }

    handleNormalAttackHit(sharky, enemy);
}


/**
 * Handles an attack hit against the boss.
 *
 * @param {Object} sharky - The active Sharky object.
 * @param {Object} enemy - The boss enemy object.
 * @returns {void}
 */
function handleBossAttackHit(sharky, enemy) {
    if (sharky.attackType !== 'fin') return;
    if (!canApplyCurrentFinHit(sharky, enemy)) return;

    enemy.lastHitAttackId = sharky.currentAttackId;
    enemy.hit(12);

    AUDIO_MANAGER.play("bossHit");
}


/**
 * Handles an attack hit against a normal enemy.
 *
 * @param {Object} sharky - The active Sharky object.
 * @param {Object} enemy - The enemy object.
 * @returns {void}
 */
function handleNormalAttackHit(sharky, enemy) {
    if (enemy.enemyType === 'jellyfish') {
        handleJellyfishAttackHit(sharky, enemy);
        return;
    }

    handleFinEnemyKill(sharky, enemy);
}


/**
 * Handles an attack hit against a jellyfish.
 *
 * @param {Object} sharky - The active Sharky object.
 * @param {Object} enemy - The jellyfish enemy object.
 * @returns {void}
 */
function handleJellyfishAttackHit(sharky, enemy) {
    if (sharky.attackType === 'fin') {
        handleJellyfishFinHit(sharky, enemy);
        return;
    }

    if (sharky.attackType === 'bubble') return;
}


/**
 * Handles a fin hit against a jellyfish.
 *
 * @param {Object} sharky - The active Sharky object.
 * @param {Object} enemy - The jellyfish enemy object.
 * @returns {void}
 */
function handleJellyfishFinHit(sharky, enemy) {
    if (!canApplyCurrentFinHit(sharky, enemy)) return;

    enemy.lastHitAttackId = sharky.currentAttackId;
    enemy.startSuperDangerous();

    AUDIO_MANAGER.play("shock");

    sharky.scheduleShockDamage(enemy.damage || 15, enemy, 350);
}


/**
 * Handles killing a normal enemy with a fin attack.
 *
 * @param {Object} sharky - The active Sharky object.
 * @param {Object} enemy - The enemy object.
 * @returns {void}
 */
function handleFinEnemyKill(sharky, enemy) {
    if (sharky.attackType !== 'fin') return;
    if (!canApplyCurrentFinHit(sharky, enemy)) return;

    enemy.lastHitAttackId = sharky.currentAttackId;
    enemy.die();

    AUDIO_MANAGER.play("enemyDead");
}


/**
 * Checks whether the current fin attack can hit an enemy.
 *
 * @param {Object} sharky - The active Sharky object.
 * @param {Object} enemy - The enemy object.
 * @returns {boolean} Whether the attack can be applied.
 */
function canApplyCurrentFinHit(sharky, enemy) {
    if (!sharky.canApplyFinHit()) return false;

    return enemy.lastHitAttackId !== sharky.currentAttackId;
}