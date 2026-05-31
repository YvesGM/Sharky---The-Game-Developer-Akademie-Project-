/**
 * Handles all game audio playback, music playback and audio stopping.
 */
export default class AudioManagerClass {

    /**
     * Creates all audio instances and configures loop and volume settings.
     */
    constructor() {
        /**
         * Stores all game sounds and music by name.
         *
         * @type {Object.<string, HTMLAudioElement>}
         */
        this.sounds = {
            background: new Audio("./assets/audio/music/background.mp3"),

            bubble: new Audio("./assets/audio/sfx/bubble.mp3"),
            poisonBubble: new Audio("./assets/audio/sfx/bubble.mp3"),
            coin: new Audio("./assets/audio/sfx/coin.mp3"),
            bottle: new Audio("./assets/audio/sfx/bottle.mp3"),
            hurt: new Audio("./assets/audio/sfx/hurt.mp3"),
            shock: new Audio("./assets/audio/sfx/shock.mp3"),
            enemyDead: new Audio("./assets/audio/sfx/enemy_dead.mp3"),
            bossHit: new Audio("./assets/audio/sfx/boss_hit.mp3"),
            bossIntro: new Audio("./assets/audio/sfx/boss_intro.mp3"),
            gameOver: new Audio("./assets/audio/sfx/game_over.mp3"),
            win: new Audio("./assets/audio/sfx/win.mp3"),
            buttonClick: new Audio("./assets/audio/sfx/button_click.mp3")
        };

        this.sounds.background.loop = true;

        this.sounds.background.volume = 0.25;
        this.sounds.bubble.volume = 0.45;
        this.sounds.poisonBubble.volume = 0.45;
        this.sounds.coin.volume = 0.45;
        this.sounds.bottle.volume = 0.5;
        this.sounds.hurt.volume = 0.55;
        this.sounds.shock.volume = 0.45;
        this.sounds.enemyDead.volume = 0.45;
        this.sounds.bossHit.volume = 0.55;
        this.sounds.bossIntro.volume = 0.65;
        this.sounds.gameOver.volume = 0.5;
        this.sounds.win.volume = 0.5;
        this.sounds.buttonClick.volume = 0.35;
    }


    /**
     * Plays a single sound effect from the beginning.
     *
     * @param {string} soundName - The name of the sound to play.
     * @returns {void}
     */
    play(soundName) {
        const sound = this.sounds[soundName];

        if (!sound) return;

        sound.currentTime = 0;
        sound.play().catch(() => { });
    }


    /**
     * Plays a music track if it is currently paused.
     *
     * @param {string} soundName - The name of the music track to play.
     * @returns {void}
     */
    playMusic(soundName) {
        const sound = this.sounds[soundName];

        if (!sound) return;
        if (!sound.paused) return;

        sound.play().catch(() => { });
    }


    /**
     * Stops a sound or music track and resets it to the beginning.
     *
     * @param {string} soundName - The name of the sound to stop.
     * @returns {void}
     */
    stop(soundName) {
        const sound = this.sounds[soundName];

        if (!sound) return;

        sound.pause();
        sound.currentTime = 0;
    }


    /**
     * Stops all active music tracks.
     *
     * @returns {void}
     */
    stopAllMusic() {
        this.stop("background");
        this.stop("intro");
    }
}