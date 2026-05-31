import { initStats, initTimers, initShockValues, initAttackValues, initOffset, loadImgStorage, setAnimation } from "./sharky-setup.js";

import { draw, drawDeadState, drawElectricShockState, startKeyboardAttack, startBubbleAttack, startFinAttackByKey, drawAttackState, drawAttackIfActive, drawHurtState, drawMovementState } from "./sharky-draw.js";

import { standStill, drawWaiting, drawLongWaiting, swim, isMoving, resetWaitingTimer, isLongWaiting } from "./sharky-movement.js";

import { hit, canReceiveHit, applyHealthDamage, applyHitEffect, applyJellyfishHit, applyJellyfishKnockback, updateHealthAfterHit, dieByDamage, startElectricShock, isElectrocuted, electricShock, scheduleShockDamage, handlePendingShockDamage, applyPendingShockDamage, clearPendingShockDamage, isHurt } from "./sharky-damage.js";

import { collectCoin, limitCoins, collectPoison, limitPoison } from "./sharky-collectibles.js";

import { canAttack, startAttack, setAttackStartValues, initBubbleAttack, setBubbleAnimation, initFinAttack, isAttacking, attack, animateAttack, animateBubbleAttack, animatePoisonBubbleAttack, animateNormalBubbleAttack, animateFinAttack, clearFinishedAttack, canApplyFinHit, canSpawnBubble } from "./sharky-attacks.js";

import { getAttackBox, getAttackBoxData, createAttackBox, createLeftAttackBox, createRightAttackBox } from "./sharky-attack-box.js";

/**
 * Wraps a helper function as a Sharky instance method.
 *
 * @param {Function} helperFunction - The helper function.
 * @returns {Function} The wrapped instance method.
 */
function createSharkyMethod(helperFunction) {
    return function (...args) {
        return helperFunction(this, ...args);
    };
}


/**
 * Adds all Sharky methods to the Sharky class prototype.
 *
 * @param {Function} SharkyClass - The Sharky class constructor.
 * @returns {void}
 */
export function applySharkyMethods(SharkyClass) {
    Object.assign(SharkyClass.prototype, getSharkyMethods());
}


/**
 * Returns all Sharky prototype methods.
 *
 * @returns {Object} The Sharky methods.
 */
function getSharkyMethods() {
    return {
        initStats: createSharkyMethod(initStats),
        initTimers: createSharkyMethod(initTimers),
        initShockValues: createSharkyMethod(initShockValues),
        initAttackValues: createSharkyMethod(initAttackValues),
        initOffset: createSharkyMethod(initOffset),
        loadImgStorage: createSharkyMethod(loadImgStorage),
        setAnimation: createSharkyMethod(setAnimation),

        draw: createSharkyMethod(draw),
        drawDeadState: createSharkyMethod(drawDeadState),
        drawElectricShockState: createSharkyMethod(drawElectricShockState),
        startKeyboardAttack: createSharkyMethod(startKeyboardAttack),
        startBubbleAttack: createSharkyMethod(startBubbleAttack),
        startFinAttackByKey: createSharkyMethod(startFinAttackByKey),
        drawAttackState: createSharkyMethod(drawAttackState),
        drawAttackIfActive: createSharkyMethod(drawAttackIfActive),
        drawHurtState: createSharkyMethod(drawHurtState),
        drawMovementState: createSharkyMethod(drawMovementState),

        standStill: createSharkyMethod(standStill),
        drawWaiting: createSharkyMethod(drawWaiting),
        drawLongWaiting: createSharkyMethod(drawLongWaiting),
        swim: createSharkyMethod(swim),
        isMoving,
        resetWaitingTimer: createSharkyMethod(resetWaitingTimer),
        isLongWaiting: createSharkyMethod(isLongWaiting),

        hit: createSharkyMethod(hit),
        canReceiveHit: createSharkyMethod(canReceiveHit),
        applyHealthDamage: createSharkyMethod(applyHealthDamage),
        applyHitEffect: createSharkyMethod(applyHitEffect),
        applyJellyfishHit: createSharkyMethod(applyJellyfishHit),
        applyJellyfishKnockback: createSharkyMethod(applyJellyfishKnockback),
        updateHealthAfterHit: createSharkyMethod(updateHealthAfterHit),
        dieByDamage: createSharkyMethod(dieByDamage),
        startElectricShock: createSharkyMethod(startElectricShock),
        isElectrocuted: createSharkyMethod(isElectrocuted),
        electricShock: createSharkyMethod(electricShock),
        scheduleShockDamage: createSharkyMethod(scheduleShockDamage),
        handlePendingShockDamage: createSharkyMethod(handlePendingShockDamage),
        applyPendingShockDamage: createSharkyMethod(applyPendingShockDamage),
        clearPendingShockDamage: createSharkyMethod(clearPendingShockDamage),
        isHurt: createSharkyMethod(isHurt),

        collectCoin: createSharkyMethod(collectCoin),
        limitCoins: createSharkyMethod(limitCoins),
        collectPoison: createSharkyMethod(collectPoison),
        limitPoison: createSharkyMethod(limitPoison),

        canAttack: createSharkyMethod(canAttack),
        startAttack: createSharkyMethod(startAttack),
        setAttackStartValues: createSharkyMethod(setAttackStartValues),
        initBubbleAttack: createSharkyMethod(initBubbleAttack),
        setBubbleAnimation: createSharkyMethod(setBubbleAnimation),
        initFinAttack: createSharkyMethod(initFinAttack),
        isAttacking: createSharkyMethod(isAttacking),
        attack: createSharkyMethod(attack),
        animateAttack: createSharkyMethod(animateAttack),
        animateBubbleAttack: createSharkyMethod(animateBubbleAttack),
        animatePoisonBubbleAttack: createSharkyMethod(animatePoisonBubbleAttack),
        animateNormalBubbleAttack: createSharkyMethod(animateNormalBubbleAttack),
        animateFinAttack: createSharkyMethod(animateFinAttack),
        clearFinishedAttack: createSharkyMethod(clearFinishedAttack),
        canApplyFinHit: createSharkyMethod(canApplyFinHit),
        canSpawnBubble: createSharkyMethod(canSpawnBubble),

        getAttackBox: createSharkyMethod(getAttackBox),
        getAttackBoxData: createSharkyMethod(getAttackBoxData),
        createAttackBox: createSharkyMethod(createAttackBox),
        createLeftAttackBox: createSharkyMethod(createLeftAttackBox),
        createRightAttackBox: createSharkyMethod(createRightAttackBox)
    };
}