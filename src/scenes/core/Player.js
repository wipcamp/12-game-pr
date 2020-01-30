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
playAnimate(player,playerKey){
  this.scene.anims.create({
    key: 'playerAni',
    frames: this.scene.anims.generateFrameNumbers(playerKey, {
        start: 0,
        end: 3
    }),
    framerate: 1,
    repeat: 0
})
player.anims.play('playerAni', true);
}
}
