import GreenPufferfishClass from "../../classes/characters/enemies/pufferfish/green-pufferfish.class.js"
import RedPufferfishClass from "../../classes/characters/enemies/pufferfish/red-pufferfish.class.js"
import RainbowPufferfishClass from "../../classes/characters/enemies/pufferfish/rainbow-pufferfish.class.js"

import LilaJellyfishClass from "../../classes/characters/enemies/jellyfish/lila-jellyfish.class.js"
import YellowJellyfishClass from "../../classes/characters/enemies/jellyfish/yellow-jellyfish.class.js"

export const ENEMIES = [
    new GreenPufferfishClass(1200, 530, 200, 200, 10, "../../../assets/img/2.Enemy/1.Pufferfish/1.Swim/1.swim1.png"),
    new RedPufferfishClass(1800, 230, 200, 200, 10, "../../../assets/img/2.Enemy/1.Pufferfish/1.Swim/2.swim1.png"),
    new RainbowPufferfishClass(2500, 730, 200, 200, 10, "../../../assets/img/2.Enemy/1.Pufferfish/1.Swim/3.swim1.png"),
    
    new LilaJellyfishClass(3000, 230, 400, 400, 10, "../../../assets/img/2.Enemy/2 Jellyfish/Regular damage/Lila 1.png"),
    new YellowJellyfishClass(18500, 630, 400, 400, 10, "../../../assets/img/2.Enemy/2 Jellyfish/Regular damage/Yellow 1.png")
]