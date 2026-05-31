import {
    BOSS_FLOATING,
    BOSS_HURT,
    BOSS_DEAD,
    BOSS_INTRO,
    BOSS_ATTACK
} from "../../../../../storage/characters/enemies/boss.storage.js";

/**
 * Initializes boss health and damage.
 *
 * @param {Object} boss - The boss instance.
 * @returns {void}
 */
export function initBossStats(boss) {
    boss.health = 100;
    boss.maxHealth = 100;
    boss.damage = 25;
}


/**
 * Initializes boss state values.
 *
 * @param {Object} boss - The boss instance.
 * @returns {void}
 */
export function initBossStates(boss) {
    boss.bossState = 'sleeping';
    boss.isHurt = false;
    boss.hurtStartedAt = 0;
    boss.hurtDuration = 450;
    boss.isAttacking = false;
    boss.initAttackValues();
    boss.initIntroValues();
}


/**
 * Initializes boss attack values.
 *
 * @param {Object} boss - The boss instance.
 * @returns {void}
 */
export function initAttackValues(boss) {
    boss.attackStartedAt = 0;
    boss.attackDuration = 900;
    boss.lastAttack = 0;
    boss.attackCooldown = 2200;
}


/**
 * Initializes intro values.
 *
 * @param {Object} boss - The boss instance.
 * @returns {void}
 */
export function initIntroValues(boss) {
    boss.introDone = false;
    boss.introFinished = false;
}


/**
 * Initializes boss movement values.
 *
 * @param {Object} boss - The boss instance.
 * @param {number} x - The spawn x position.
 * @param {number} y - The spawn y position.
 * @returns {void}
 */
export function initBossMovement(boss, x, y) {
    boss.spawnX = x;
    boss.spawnY = y;
    boss.initBossRange(x, y);
    boss.targetX = x;
    boss.targetY = y;
    boss.nextTargetAt = 0;
    boss.fightStartX = x - 1100;
}


/**
 * Initializes boss movement range.
 *
 * @param {Object} boss - The boss instance.
 * @param {number} x - The spawn x position.
 * @param {number} y - The spawn y position.
 * @returns {void}
 */
export function initBossRange(boss, x, y) {
    boss.minX = x - 260;
    boss.maxX = x + 260;
    boss.minY = y - 120;
    boss.maxY = y + 120;
}


/**
 * Initializes boss offset.
 *
 * @param {Object} boss - The boss instance.
 * @returns {void}
 */
export function initBossOffset(boss) {
    boss.offset = {
        top: 220,
        right: 70,
        bottom: 110,
        left: 40
    };
}


/**
 * Loads all image storages.
 *
 * @param {Object} boss - The boss instance.
 * @returns {void}
 */
export function loadImgStorage(boss) {
    boss.drawFrames(BOSS_FLOATING);
    boss.drawFrames(BOSS_HURT);
    boss.drawFrames(BOSS_DEAD);
    boss.drawFrames(BOSS_INTRO);
    boss.drawFrames(BOSS_ATTACK);
}


/**
 * Returns a random value between min and max.
 *
 * @param {Object} boss - The boss instance.
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} The random value.
 */
export function randomBetween(boss, min, max) {
    return Math.random() * (max - min) + min;
}