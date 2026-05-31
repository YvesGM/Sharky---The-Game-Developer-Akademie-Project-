import Bubble from "../../../lib/classes/entities/bubble.class.js";
import { ENEMIES } from "../../../lib/configs/characters/enemy.configs.js";
import { BUBBLES, BUBBLE_IMAGES, POISON_BUBBLE_IMAGES } from "../../../lib/configs/entities/bubble.configs.js";
import { AUDIO_MANAGER } from "../../../lib/configs/audio/audio.configs.js";
import { gameState } from "./world-state.js";
import { getCameraX, isBossEnemy } from "./world-utils.js";

/**
 * Spawns a new bubble object.
 *
 * @returns {void}
 */
export function spawnGameBubble() {
    const sharky = gameState.getSharky();

    if (sharky.bubbleSpawned) return;

    createBubbleFromSharky(sharky);
    playBubbleSound(sharky);

    sharky.bubbleSpawned = true;
}

/**
 * Plays the matching bubble attack sound.
 *
 * @param {Object} sharky - The active Sharky object.
 * @returns {void}
 */
function playBubbleSound(sharky) {
    if (sharky.isPoisonBubbleAttack) {
        AUDIO_MANAGER.play("poisonBubble");
        return;
    }

    AUDIO_MANAGER.play("bubble");
}


/**
 * Creates one bubble based on Sharky's position.
 *
 * @param {Object} sharky - The active Sharky object.
 * @returns {void}
 */
function createBubbleFromSharky(sharky) {
    const bubbleSize = getBubbleSize();
    const bubbleData = getBubbleData(sharky);
    const bubblePosition = getBubblePosition(sharky, bubbleSize, bubbleData.direction);

    pushBubbleToStorage(bubblePosition, bubbleSize, bubbleData);
}


/**
 * Returns the default bubble size.
 *
 * @returns {Object} The bubble size.
 */
function getBubbleSize() {
    return {
        w: 120,
        h: 120
    };
}


/**
 * Returns all bubble data based on Sharky's attack.
 *
 * @param {Object} sharky - The active Sharky object.
 * @returns {Object} The bubble data.
 */
function getBubbleData(sharky) {
    const isPoisonBubble = sharky.isPoisonBubbleAttack;

    return {
        direction: sharky.otherDirection ? -1 : 1,
        images: isPoisonBubble ? POISON_BUBBLE_IMAGES : BUBBLE_IMAGES,
        damage: isPoisonBubble ? 35 : 10,
        type: isPoisonBubble ? 'poison' : 'normal'
    };
}


/**
 * Returns the bubble start position.
 *
 * @param {Object} sharky - The active Sharky object.
 * @param {Object} size - The bubble size.
 * @param {number} direction - The bubble direction.
 * @returns {Object} The bubble position.
 */
function getBubblePosition(sharky, size, direction) {
    const sharkyBox = sharky.getHitbox(getCameraX());

    return {
        x: getBubbleX(sharkyBox, size, direction),
        y: sharkyBox.y + sharkyBox.h / 2 - size.h / 2
    };
}


/**
 * Returns the bubble x position.
 *
 * @param {Object} sharkyBox - Sharky's hitbox.
 * @param {Object} size - The bubble size.
 * @param {number} direction - The bubble direction.
 * @returns {number} The bubble x position.
 */
function getBubbleX(sharkyBox, size, direction) {
    return direction > 0
        ? sharkyBox.x + sharkyBox.w
        : sharkyBox.x - size.w;
}


/**
 * Adds a new bubble to the bubble storage.
 *
 * @param {Object} position - The bubble position.
 * @param {Object} size - The bubble size.
 * @param {Object} bubbleData - The bubble data.
 * @returns {void}
 */
function pushBubbleToStorage(position, size, bubbleData) {
    BUBBLES.push(
        new Bubble(
            position.x,
            position.y,
            size.w,
            size.h,
            12,
            bubbleData.direction,
            bubbleData.images,
            bubbleData.damage,
            bubbleData.type
        )
    );
}


/**
 * Updates and removes all bubbles.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @returns {void}
 */
 export function updateGameBubbles(ctx) {
    BUBBLES.forEach(bubble => updateSingleBubble(ctx, bubble));
    removeDeletedBubbles();
}


/**
 * Updates one bubble.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {Object} bubble - The bubble object.
 * @returns {void}
 */
function updateSingleBubble(ctx, bubble) {
    if (bubble.markedForDeletion) return;

    bubble.draw(ctx);
    ENEMIES.forEach(enemy => checkBubbleEnemyHit(bubble, enemy));
}


/**
 * Checks whether one bubble hits one enemy.
 *
 * @param {Object} bubble - The bubble object.
 * @param {Object} enemy - The enemy object.
 * @returns {void}
 */
function checkBubbleEnemyHit(bubble, enemy) {
    if (bubble.markedForDeletion) return;
    if (enemy.isDead) return;
    if (!bubble.isColliding(enemy)) return;

    handleBubbleEnemyHit(bubble, enemy);
}


/**
 * Handles a successful bubble hit.
 *
 * @param {Object} bubble - The bubble object.
 * @param {Object} enemy - The enemy object.
 * @returns {void}
 */
function handleBubbleEnemyHit(bubble, enemy) {
    if (isBossEnemy(enemy)) {
        hitBossWithBubble(bubble, enemy);
        return;
    }

    hitNormalEnemyWithBubble(bubble, enemy);
}


/**
 * Applies bubble damage to the boss.
 *
 * @param {Object} bubble - The bubble object.
 * @param {Object} enemy - The boss enemy object.
 * @returns {void}
 */
function hitBossWithBubble(bubble, enemy) {
    enemy.hit(bubble.damage || 10);
    AUDIO_MANAGER.play("bossHit");

    bubble.markedForDeletion = true;
}


/**
 * Applies a bubble hit to a normal enemy.
 *
 * @param {Object} bubble - The bubble object.
 * @param {Object} enemy - The enemy object.
 * @returns {void}
 */
function hitNormalEnemyWithBubble(bubble, enemy) {
    if (enemy.enemyType === 'jellyfish') {
        enemy.die();
        AUDIO_MANAGER.play("enemyDead");
    }

    bubble.markedForDeletion = true;
}


/**
 * Removes all bubbles marked for deletion.
 *
 * @returns {void}
 */
function removeDeletedBubbles() {
    for (let i = BUBBLES.length - 1; i >= 0; i--) {
        removeBubbleIfDeleted(i);
    }
}


/**
 * Removes one bubble if it is marked for deletion.
 *
 * @param {number} index - The bubble index.
 * @returns {void}
 */
function removeBubbleIfDeleted(index) {
    if (BUBBLES[index].markedForDeletion) {
        BUBBLES.splice(index, 1);
    }
}