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
  BossMoving(value, valueloop, Time, Pos, Con) {
    event = this.scene.time.addEvent({
      delay: Time,
      pause: value,
      loop: valueloop,
      callback: function () {
        if (value == false) {
          this.body.setVelocityX(Phaser.Math.Between(Con, Pos));
        }
      },
      callbackScope: this,
      timeScale: 1,
      //  repeat: 10
    })
    //return value;
  }

  removeBossMoving() {
    event.remove(false);
  }

  playAnimateB(boss, bossKey) {
    this.scene.anims.create({
      key: 'bossAni',
      frames: this.scene.anims.generateFrameNumbers(bossKey, {
        start: 0,
        end: 12
      }),
      framerate: 1,
      repeat: -1
    })
    boss.anims.play('bossAni', true);
  }

  bossCheckIsDead(value) {
    return value;
  }
}