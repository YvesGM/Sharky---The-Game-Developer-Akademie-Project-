import { initBossStats, initBossStates, initAttackValues, initIntroValues, initBossMovement, initBossRange, initBossOffset, loadImgStorage, randomBetween } from "./boss-setup.js";

import { draw, updateFightState, updateState, setDeadState, checkIntroStart, checkIntroFinished, startIntro, setFirstIntroImage } from "./boss-state.js";

import { moveRandom, updateRandomTarget, moveToTarget } from "./boss-movement.js";

import { tryAttack, canTryAttack, isSharkyInAttackRange, getSharkyDistance, startAttack, canApplyAttackHit } from "./boss-attack.js";

import { hit, canReceiveDamage, startHurtState, checkDeathAfterHit, resetDeathState } from "./boss-damage.js";

import { animateBoss, animateDeadState, animateIntroState, animateHurtState, isHurtActive, animateAttackState, finishAttackIfNeeded, resetAnimation } from "./boss-animation.js";

/**
 * Wraps a helper function as a boss instance method.
 *
 * @param {Function} helperFunction - The helper function.
 * @returns {Function} The wrapped instance method.
 */
function createBossMethod(helperFunction) {
    return function (...args) {
        return helperFunction(this, ...args);
    };
}


/**
 * Adds all boss methods to the boss class prototype.
 *
 * @param {Function} BossClass - The boss class constructor.
 * @returns {void}
 */
export function applyBossMethods(BossClass) {
    Object.assign(BossClass.prototype, getBossMethods());
}


/**
 * Returns all boss prototype methods.
 *
 * @returns {Object} The boss methods.
 */
function getBossMethods() {
    return {
        initBossStats: createBossMethod(initBossStats),
        initBossStates: createBossMethod(initBossStates),
        initAttackValues: createBossMethod(initAttackValues),
        initIntroValues: createBossMethod(initIntroValues),
        initBossMovement: createBossMethod(initBossMovement),
        initBossRange: createBossMethod(initBossRange),
        initBossOffset: createBossMethod(initBossOffset),
        loadImgStorage: createBossMethod(loadImgStorage),
        randomBetween: createBossMethod(randomBetween),

        draw: createBossMethod(draw),
        updateFightState: createBossMethod(updateFightState),
        updateState: createBossMethod(updateState),
        setDeadState: createBossMethod(setDeadState),
        checkIntroStart: createBossMethod(checkIntroStart),
        checkIntroFinished: createBossMethod(checkIntroFinished),
        startIntro: createBossMethod(startIntro),
        setFirstIntroImage: createBossMethod(setFirstIntroImage),

        moveRandom: createBossMethod(moveRandom),
        updateRandomTarget: createBossMethod(updateRandomTarget),
        moveToTarget: createBossMethod(moveToTarget),

        tryAttack: createBossMethod(tryAttack),
        canTryAttack: createBossMethod(canTryAttack),
        isSharkyInAttackRange: createBossMethod(isSharkyInAttackRange),
        getSharkyDistance: createBossMethod(getSharkyDistance),
        startAttack: createBossMethod(startAttack),
        canApplyAttackHit: createBossMethod(canApplyAttackHit),

        hit: createBossMethod(hit),
        canReceiveDamage: createBossMethod(canReceiveDamage),
        startHurtState: createBossMethod(startHurtState),
        checkDeathAfterHit: createBossMethod(checkDeathAfterHit),
        resetDeathState: createBossMethod(resetDeathState),

        animateBoss: createBossMethod(animateBoss),
        animateDeadState: createBossMethod(animateDeadState),
        animateIntroState: createBossMethod(animateIntroState),
        animateHurtState: createBossMethod(animateHurtState),
        isHurtActive: createBossMethod(isHurtActive),
        animateAttackState: createBossMethod(animateAttackState),
        finishAttackIfNeeded: createBossMethod(finishAttackIfNeeded),
        resetAnimation: createBossMethod(resetAnimation)
    };
}