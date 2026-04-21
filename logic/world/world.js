export default function loadCanvas() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    loadWorld(canvas, ctx);
}

function loadWorld(canvas, ctx) {
}