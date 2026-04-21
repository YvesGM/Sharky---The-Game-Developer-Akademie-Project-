import Sharky from "./characters/sharky.js"

export default function loadCanvas() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const ctxResolution = window.devicePixelRatio;
    canvas.width = 960 * ctxResolution;
    canvas.height = 540 * ctxResolution;

    ctx.scale(ctxResolution, ctxResolution);

    loadWorld(ctx, canvas);
}

function loadWorld(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    Sharky(ctx);
    requestAnimationFrame(() => loadWorld(ctx, canvas))
}