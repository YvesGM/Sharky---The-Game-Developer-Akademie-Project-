import { BOSS_INTRO } from "../../../../../storage/characters/enemies/boss.storage.js";

/**
 * Draws and updates the boss.
 *
 * @param {Object} boss - The boss instance.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {Object} sharky - The Sharky object.
 * @param {number} camera_x - The camera position.
 * @returns {void}
 */
export function draw(boss, ctx, sharky, camera_x) {
    boss.updateState(sharky, camera_x);

    if (boss.bossState === 'sleeping') return;

    boss.updateFightState(sharky, camera_x);
    boss.animateBoss();
    boss.drawImg(ctx);
}


/**
 * Updates fighting logic.
 *
 * @param {Object} boss - The boss instance.
 * @param {Object} sharky - The Sharky object.
 * @param {number} camera_x - The camera position.
 * @returns {void}
 */
export function updateFightState(boss, sharky, camera_x) {
    if (boss.bossState !== 'fighting') return;

    boss.moveRandom();
    boss.tryAttack(sharky, camera_x);
}


/**
 * Updates boss state.
 *
 * @param {Object} boss - The boss instance.
 * @param {Object} sharky - The Sharky object.
 * @param {number} camera_x - The camera position.
 * @returns {void}
 */
export function updateState(boss, sharky, camera_x) {
    if (boss.setDeadState()) return;
    if (!sharky) return;

    boss.checkIntroStart(sharky, camera_x);
    boss.checkIntroFinished();
}


/**
 * Sets dead state if boss is dead.
 *
 * @param {Object} boss - The boss instance.
 * @returns {boolean} Whether boss is dead.
 */
export function setDeadState(boss) {
    if (!boss.isDead) return false;

    boss.bossState = 'dead';
    return true;
}


/**
 * Checks whether the intro should start.
 *
 * @param {Object} boss - The boss instance.
 * @param {Object} sharky - The Sharky object.
 * @param {number} camera_x - The camera position.
 * @returns {void}
 */
export function checkIntroStart(boss, sharky, camera_x) {
    const sharkyWorldX = sharky.x + camera_x;

    if (boss.bossState === 'sleeping' && sharkyWorldX >= boss.fightStartX) {
        boss.startIntro();
    }
}


/**
 * Checks whether the intro is finished.
 *
 * @param {Object} boss - The boss instance.
 * @returns {void}
 */
export function checkIntroFinished(boss) {
    if (boss.bossState !== 'intro' || !boss.introFinished) return;

    boss.bossState = 'fighting';
    boss.resetAnimation();
}


/**
 * Starts the boss intro.
 *
 * @param {Object} boss - The boss instance.
 * @returns {void}
 */
export function startIntro(boss) {
    boss.bossState = 'intro';
    boss.introFinished = false;
    boss.resetAnimation();
    boss.setFirstIntroImage();
}


/**
 * Sets the first intro image.
 *
 * @param {Object} boss - The boss instance.
 * @returns {void}
 */
export function setFirstIntroImage(boss) {
    const firstIntroImg = boss.imageCache[BOSS_INTRO[0]];

    if (firstIntroImg) {
        boss.img = firstIntroImg;
    }
}