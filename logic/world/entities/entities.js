import { ENTITIES } from "../../../lib/configs/entities/entity.configs.js"

export default function Entities(ctx) {
    drawEntities(ctx);
}

function drawEntities(ctx) {
    ENTITIES.forEach(entity => {
        entity.draw(ctx);
    });
};