// public createEmitterInternal() {

  //   setTimeout(() => {

  //     this.emitter = this.particle.createEmitter({

  //       alpha: { start: 1, end: 0 },
  //       scale: { start: 0.5, end: 2.5 },
  //       tint: { start: 0x20FF40, end: 0x20FF40 },
  //       speed: 30,
  //       accelerationY: -800,
  //       angle: { min: 0, max: 180 },
  //       rotate: { min: -180, max: 180 },
  //       lifespan: { min: 1000, max: 1000 },
  //       blendMode: 'ADD',
  //       frequency: 110,
  //       maxParticles: -1,
  //       x: 400,
  //       y: 300

  //     });

  //     this.playing = true;

  //     let teste = this.particle.emitters.getAt(0);

  //     setTimeout(() => { this.emitter.stop(); this.playing = false; }, 3000);

  //   }, 1)

  // }

  // private playOrReplay() {

  //   if (this.playing) {
  //     this.playing = false;
  //     this.emitter.stop()
  //   }
  //   else {
  //     this.playing = true;
  //     this.emitter.start()
  //   }

  // } 

  export {}