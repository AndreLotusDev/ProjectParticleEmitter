import { BaseTypeFirework } from "./base-type-firework";
import { Position } from "./position-class";
import { gameScene } from "./scenes/Game";
import { Velocity } from "./velocity-class";

class Rocket extends BaseTypeFirework {

    private checkSeconds: number = 0;

    private changeIfIsTimeToExplode: number = 0;
    private _setOneTimeFirstPart = false;
    private _setOneTimeSecondPart = false;

    validate() {

        if(this._velocity == undefined || this._velocity == null) {
            this._invalidVelocity();

            return;
        }

        if(this._velocity.velocityX == 0 && this._velocity.velocityY == 0) {
            this._invalidVelocity();
        }       
        
    };

    private _invalidVelocity() :void {

        this._listOfErrors.push('The velocity should not be in x and y in at same time 0!');
        this.listOfWarnings.push('The velocity will be in y the default value');

    }

    async run(): Promise<boolean> {

        let config: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig = {

            alpha: { start: 1, end: 0 },
            scale: { start: 0.5, end: 2.5 },
            tint: { start: this.color, end: this.color  },
            speed: {min: 100, max: 1000},
            accelerationY: 0,
            angle: { min: 0, max: 360 },
            lifespan: 100,
            blendMode: 'ADD',
            x: gameScene.calculateX(this._positions.positionX),
            y: gameScene.calculateY(this._positions.positionY)

        };

        gameScene.setEmitter(config);

        let eachPieceOfSecondItsPercent = (100 / this._duration)

        await gameScene.playEmitterWithMovimentantion(this._begin ,this._duration, 
            (delta:number) => {


            let quantityOfASecond = (delta / 1000) * 5;

            let velocityTemp = new Velocity(this._velocity.velocityX * quantityOfASecond, this._velocity.velocityY * quantityOfASecond)
            gameScene.setParticlePosition(velocityTemp);
            
            this.checkSeconds += delta;
            if(this.checkSeconds >= 1000) {
                this.checkSeconds = 0;
            }

            },

            (delta: number) => {

                this.changeIfIsTimeToExplode += delta;

                let passedEightpercentOfTime =  eachPieceOfSecondItsPercent * this.changeIfIsTimeToExplode;

                if(passedEightpercentOfTime >= 30 && passedEightpercentOfTime < 60)
                {
                    config.angle = { min: 0, max: 360 };
                    config.scale = { start: 0.3, end: 3 };
                    config.speed = { min: 500, max: 750 };
                    
                    if(!this._setOneTimeFirstPart)
                    {
                        this._setOneTimeFirstPart = true;
                        gameScene.setConfig(config);
                    }
                    return;
                }

                if(passedEightpercentOfTime >= 60)
                {
                    config.speed = { min: 1000, max: 1000 };
                    config.angle = { min: 0, max: 360 };
                    config.scale = { start: 0.3, end: 10 };

                    if(!this._setOneTimeSecondPart)
                    {
                        this._setOneTimeSecondPart = true;
                        gameScene.setConfig(config);
                    }
                    return;
                }


            }
        );

        return new Promise(res => res(true));

    };

    private _velocity: Velocity = new Velocity(0,0);

    constructor(begin: number, colour: string, duration: number, position: Position | null, velocity: Velocity | null) {

        super(begin, colour, duration, position);

        if(velocity != null)
            this._velocity = velocity;

        this.validate();

    }

}

export {Rocket}