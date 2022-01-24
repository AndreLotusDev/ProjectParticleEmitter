import Phaser from 'phaser';
import config from './config';
import {gameScene} from './scenes/Game';

new Phaser.Game(
  Object.assign(config, {
    scene: gameScene
  })
);
