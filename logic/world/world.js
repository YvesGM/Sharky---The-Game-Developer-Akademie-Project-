import Background from "./background/background.js"
import Sharky from "./characters/sharky.js"

export default function loadCanvas() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const ctxResolution = window.devicePixelRatio;
    canvas.width = 1920 * ctxResolution;
    canvas.height = 1080 * ctxResolution;

    ctx.scale(ctxResolution, ctxResolution);

    loadWorld(ctx, canvas);
}

function loadWorld(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    Background(ctx);
    Sharky(ctx);

    requestAnimationFrame(() => loadWorld(ctx, canvas))
}