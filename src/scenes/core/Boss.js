import 'Phaser';

export default class Player extends ObjectWipcamp{
    constructor(scene, x, y, key) {
      super(scene, x, y, key);
    this.key = key;
      this.scene = scene;
      this.scene.add.existing(this);
      this.scene.physics.world.enableBody(this, 0);

      this.setData("speed", 200);
      

    }
}