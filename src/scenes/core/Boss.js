import 'Phaser';
import ObjectProperties from './ObjectProperties';
export default class Boss extends ObjectProperties{
    constructor(scene, x, y, key) {
      super(scene, x, y, key);
    this.key = key;
      this.scene = scene;
      this.scene.add.existing(this);
      this.scene.physics.world.enableBody(this, 0);
      this.setData("speed", 200);
      

    }
}