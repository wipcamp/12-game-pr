import 'Phaser';
import bossBullet from './bossBullet';

let event;
export default class Boss extends bossBullet {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.key = key;
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData("speed", 200);


  }
  BossMoving(Time, Pos, Con) {
    event = this.scene.time.addEvent({
      delay: Time,
      pause: false,
      loop: true,
      callback: function () {
          this.body.setVelocityX(Phaser.Math.Between(Con, Pos));
      },
      callbackScope: this,
      timeScale: 1
    })
  }

  removeBossMoving() {
    event.remove(false);
  }

  playAnimateB(boss, bossKey,fame) {
    this.scene.anims.create({
      key: 'bossAni',
      frames: this.scene.anims.generateFrameNumbers(bossKey, {
        start: 0,
        end: fame
      }),
      framerate: 1,
      repeat: -1
    })
    boss.anims.play('bossAni', true);
  }
  playAnimateB2(boss2, boss2Key,fame) {
    this.scene.anims.create({
      key: 'boss2Ani',
      frames: this.scene.anims.generateFrameNumbers(boss2Key, {
        start: 0,
        end: fame
      }),
      framerate: 1,
      repeat: -1
    })
    boss2.anims.play('boss2Ani', true);
  }

  bossCheckIsDead(value) {
    return value;
  }
}