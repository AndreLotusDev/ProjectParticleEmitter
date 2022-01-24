import { BaseTypeFirework } from "./base-type-firework";
import { Position } from "./position-class";
import {gameScene, MyGame} from "./scenes/Game";

import Phaser from 'phaser';
import { getTime } from "./scenes/helpers";

class Fountain extends BaseTypeFirework {

    validate(): void {
        
    };

    async run(): Promise<boolean> {

        console.log('fountain time')

        let config: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig = {

            alpha: { start: 1, end: 0 },
            scale: { start: 0.5, end: 2.5 },
            tint: { start: this.color, end: this.color  },
            speed: 30,
            accelerationY: -800,
            angle: { min: 0, max: 180 },
            rotate: { min: -180, max: 180 },
            lifespan: { min: 1000, max: 1000 },
            blendMode: 'ADD',
            frequency: 110,
            maxParticles: -1,
            x: gameScene.calculateX(this._positions.positionX),
            y: gameScene.calculateY(this._positions.positionY)

        };

        gameScene.setEmitter(config);

        await gameScene.playEmitter(this._begin ,this._duration);

        return new Promise(res => res(true));

    };

    constructor(begin: number, colour: string, duration: number, position: Position | null) {

        super(begin, colour, duration, position);

        this.validate();

    }

}

export {Fountain}