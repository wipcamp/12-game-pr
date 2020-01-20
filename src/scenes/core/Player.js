import 'Phaser';
import ObjectProperties from './ObjectProperties';
import Bullet from './Bullet';
export default class Player extends Bullet{
    constructor(scene, x, y, key) {
      super(scene, x, y, key);
      this.scene = scene;
      this.scene.add.existing(this);
      this.scene.physics.world.enableBody(this, 0);

    }
}
