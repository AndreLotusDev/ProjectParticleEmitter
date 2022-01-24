import Phaser from 'phaser';
import { Velocity } from '../velocity-class';

class MyGame extends Phaser.Scene {

  constructor() {
    super('GameScene');
  }

  public _move!: Function | null;
  public _changeCharacteristicsParticle!: Function | null;

  //Particle configuration
  private _particle!: Phaser.GameObjects.Particles.ParticleEmitterManager | undefined | null;
  private _emitter!: Phaser.GameObjects.Particles.ParticleEmitter | undefined | null;
  private _playing: boolean = false;

  private _configChecker!:Phaser.Types.GameObjects.Particles.ParticleEmitterConfig

  //Handling repeat
  private _buttonRepeat!: Phaser.GameObjects.Text;

  preload() {

    this.load.spritesheet('mummy', 'assets/mummy37x45.png', { frameWidth: 37, frameHeight: 45 });

    this.load.image('particle', 'assets/muzzleflash3.png');

    this.load.image('spark1', 'assets/red.png');
  }

  create() {

    this._particle = this.add.particles('particle');

    // this.input.on(Phaser.Input.Events.POINTER_DOWN, () => { this.playOrReplay() }, this)

    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    
  }

  update(timestamp: number, delta: number) {

    if(this._move != null || this._move != undefined) 
    {
      this._move(delta)
    }

    if(this._changeCharacteristicsParticle != null || this._changeCharacteristicsParticle != undefined) 
    {
      this._changeCharacteristicsParticle(delta)
    }

  }


  public setEmitter(config: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig): Promise<boolean> {

    this._emitter = this._particle?.createEmitter(config);
    this._configChecker = config;

    this._playing = false;
    this._emitter?.stop();

    return new Promise(res => res(true));

  }

  public async playEmitter(waitForBegin: number, duration: number): Promise<boolean> {

    await this.sleep(waitForBegin);

    this._playing = true;
    this._emitter?.start();

    await this.sleep(duration);

    this._playing = false;
    this._emitter?.stop();

    this._particle?.emitters.destroy();

    return new Promise(res => res(true));

  }

  public async playEmitterWithMovimentantion(waitForBegin: number, duration: number,
    moveFunction: Function, changeConfigparticlesAlongTime: Function): Promise<boolean> {

    await this.sleep(waitForBegin);

    this._playing = true;
    this._emitter?.start();

    this._move = moveFunction;
    this._changeCharacteristicsParticle = changeConfigparticlesAlongTime;

    await this.sleep(duration);

    this._playing = false;
    this._emitter?.stop();

    this._move = null;
    this._changeCharacteristicsParticle = null;
    this._particle?.emitters.destroy();

    return new Promise(res => res(true));

  }

  public setPlayForever() {

    this._playing = true;
    this._emitter?.start();

  }

  private sleep(ms: number): Promise<boolean> {

    return new Promise(resolve => setTimeout(() => resolve(true), ms))

  }

  public setParticlePosition(velocity: Velocity) {

    let positionInX = this._emitter?.x.propertyValue ?? 0;
    let positionInY = this._emitter?.y.propertyValue ?? 0;

    this._emitter?.setPosition( positionInX+= velocity.velocityX,positionInY+= velocity.velocityY)

  }

  public getParticlePosition(): void {
    let positionInX = this._emitter?.x.propertyValue;
    let positionInY = this._emitter?.y.propertyValue;
  }

  // public endDemoAndAskIfThemWantToRepeat(): void {
  //   this._buttonRepeat.visible = true;
  //   this._buttonRepeat.setActive(false);
  // }

  //In 0 top
  public calculateX(positionX: number): number {
    let positionConsieringOfsetX = 0 + positionX
    return positionConsieringOfsetX;
  }

  //In left 0 position
  public calculateY(positionY: number): number {
    let positionConsieringOfsetY = gameScene.sys.canvas.height + positionY
    return positionConsieringOfsetY;
  }

  public setConfig(config: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig) {

    let configRepass = this._particle?.emitters.getAt(0);

    config.x = configRepass?.x.propertyValue;
    config.y = configRepass?.y.propertyValue;

    this._particle?.emitters.destroy();

    this._emitter = this._particle?.createEmitter(config);
    this._emitter?.start();

  }

}

let gameScene = new MyGame();

export { gameScene, MyGame }
