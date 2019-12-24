import 'phaser';
import PlayerBullet from './PlayerBullet'
let bullets;
let bulletEvent1;
let bulletEvent2;
let bulletEvent3;
export default class Player extends PlayerBullet{
    constructor(scene, x, y, key) {
      super(scene, x, y, key);
      this.scene = scene;
      this.scene.add.existing(this);
      this.scene.physics.world.enableBody(this, 0);

    }
}
