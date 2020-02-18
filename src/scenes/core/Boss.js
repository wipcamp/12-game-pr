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

  playAnimateB(boss, bossKey, fame) {
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
  playAnimateB2(boss2, boss2Key, fame) {
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

  spawnBoss = {
    0: function () {
      spawnBoss1()
    },
    1: function () {
      spawnBoss2()
    }
  }
  timeSpawnBoss() {
    event = this.time.addEvent({
      delay: 10000,
      callback: function () {
        bossId = math.random(0, 1)
        spawnBoss[bossId]()
      },
      callbackScope: this,
      loop: true,
      paused: false,
      timeScale: 1
    })
  }

  spawnBoss1() {
    let boss1 = new Boss(this, 300, 500, boss1Key);
    boss1.health = 100;
    boss1.maxHealth = 100;
    boss1.setScale(0.8);
    boss1.moveUp(200);
    boss1.setWorldBound(true);
    boss1.BossMoving(1000, 200, -200);
    bulletBossGroup = boss1.bossIsShooting(bulletBossKey, boss1);
    boss1.playAnimateB(boss1, boss1Key, 12);
    this.physics.add.overlap(boss1, bulletGroup, HitBoss1, null, this);
    this.physics.add.overlap(player, bulletBossGroup, touchingWaveEnemy, null, this);
    backgroundBar.setVisible(true);
    health_frame.setDepth(1);
    backgroundBar.setDepth(1);
    healthBar.setDepth(1);
    healthBar.setVisible(true);
    health_frame.setVisible(true);

    waveScene.physics.add.overlap(player, waveEnemyGroup, touchingWaveEnemy, null, this);
    waveScene.physics.add.overlap(bulletGroup, waveEnemyGroup, HitWaveEnemy, null, this);
  }

  spawnBoss2() {
    waveScene.physics.add.overlap(player, waveEnemyGroup, touchingWaveEnemy, null, this);
    waveScene.physics.add.overlap(bulletGroup, waveEnemyGroup, HitWaveEnemy, null, this);

    let boss1 = new Boss(this, 300, 500, boss2Key);
    boss1.health = 200;
    boss1.maxHealth = 200;
    healthBar.setScale(boss1.health / boss1.maxHealth, 1);
    boss1.moveUp(250);
    boss1.setWorldBound(true);
    boss1.setSize(0.5);
    bulletBoss2Group = boss1.bossIsShooting2(bulletBoss2Key, boss1);
    boss1.playAnimateB2(boss1, boss2Key, 11);
    boss1.BossMoving(500, 400, -400);
    waveScene.physics.add.overlap(boss1, bulletGroup, HitBoss1, null, this);
    waveScene.physics.add.overlap(player, bulletBoss2Group, touchingWaveEnemy, null, this);
    backgroundBar.setVisible(true);
    health_frame.setDepth(1);
    backgroundBar.setDepth(1);
    healthBar.setDepth(1);
    healthBar.setVisible(true);
    health_frame.setVisible(true);
  }
}