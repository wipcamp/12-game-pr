import Bullet from './core/Bullet'
import Enemy from './core/Enemy'
import Player from './core/Player'
import Boss from './core/Boss'
import Item from './core/item';
import bossBullet from './core/bossBullet';
import EnemyWave from '../utils/enemyWave';
import EnemyWaveContainer from '../utils/enemyWaveContainer';
import { preloadScene } from '../utils/preloadScene'
import { startScene } from '../utils/goTo'

let enemyKey = 'enemy'
let enemy;
let enemyGroup
let playerKey = 'player';
let player;

let bulletKey = 'bullet';
let bulletGroup;

var healthPlayer = 3;
let heart1
let heart2
let heart3

let boss1;
let boss1Key = 'boss1';
let bulletBossKey = 'bossBullet';
let b_bullets;
let bulletBossGroup;

let itemKey = 'items';
let itemGroup
let item;


let bg;

let health_frame;
let healthBar;
let backgroundBar;
let boss1Health = 100;
let boss1MaxHealth = 100;

let game_song


function touchingWaveEnemy (player, waveEnemyGroup) {
    this.updateWaveState({
        enemyKillCount: this.waveState.enemyKillCount + 1
    });
    waveEnemyGroup.disableBody(true, true);
    waveEnemyGroup.destroy();
    healthPlayer = healthPlayer - 1;
    if (healthPlayer === 2) {
        heart3.setVisible(false);
    }
    else if (healthPlayer === 1) {
        heart2.setVisible(false);
    }
    else if (healthPlayer === 0) {
        heart1.setVisible(false);
    }
}

function HitWaveEnemy(bulletGroup, waveEnemyGroup) {
    this.updateWaveState({
        enemyKillCount: this.waveState.enemyKillCount + 1
    });
    waveEnemyGroup.disableBody(true, true);
    waveEnemyGroup.destroy();
    bulletGroup.disableBody(true, true);
    bulletGroup.destroy();
}

function HitBoss1(boss1, bulletGroup) {
    boss1.health -= 3;
    healthBar.setScale(boss1.health / boss1.maxHealth, 1);
    bulletGroup.destroy();
    if (boss1.health <= 0) {
        this.updateWaveState({
            majinBuuKilled: true,
        });
         boss1.bossStopShooting();
        boss1.destroy();
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene'
        })
    }

    preload() {
        this.load.image('bg', 'src/images/BG.png')
        this.load.spritesheet(itemKey, 'src/images/Healthdrop.png', { frameWidth: 100, frameHeight: 100 })
        this.load.spritesheet(playerKey, 'src/images/player.png', { frameWidth: 100, frameHeight: 100 })
        this.load.spritesheet(bulletKey, 'src/images/BulletPlayer.png', { frameWidth: 45, frameHeight: 152 })
        this.load.image('heart', 'src/images/Heart.png')
        this.load.spritesheet(enemyKey, 'src/images/enemy.png', { frameWidth: 70, frameHeight: 121 })
        this.load.spritesheet(boss1Key, 'src/images/Boss.png', { frameWidth: 323, frameHeight: 279 })
        this.load.spritesheet(bulletBossKey, 'src/images/BulletBoss.png', { frameWidth: 75, frameHeight: 150 })
        this.load.image('health_frame', 'src/images/Health-Frame.png');
        this.load.image('black-bar', 'src/images/health-black.png');
        this.load.image('red-bar', 'src/images/health-red.png');
        this.load.audio('game_song','src/songs/08. Operation.mp3');
        //////////////////////////////////////////////////////////////////////////////////////////
        preloadScene({
            scene: this,
            key: 'default'
        })

    }

    create() {
        bg = this.add.tileSprite(0, 0, 600, 900, 'bg').setOrigin(0, 0)
        ////////////////////////////////////////////////////////////////////////////////////////// spawn item
        item = new Item(this, 0, -1000, itemKey)
        //itemGroup = item.spawnItemWave(itemKey)
        itemGroup = item.spawnItemWaveInf(itemKey)
        //////////////////////////////////////////////////////////////////////////////////////////  song theme
        game_song = this.sound.add('game_song',{volume: 0.15});
        game_song.play();
        //////////////////////////////////////////////////////////////////////////////////////////  OverLap Item/Bullet
        function HitItem(bulletGroup, itemGroup, ) {
            itemGroup.disableBody(true, true);
            itemGroup.destroy();
            bulletGroup.disableBody(true, true);
            bulletGroup.destroy();
            increaseHealth(1);
        }
        //////////////////////////////////////////////////////////////////////////////////////////  OverLap Item/Player
        function touchingItem(player, itemGroup) {
            itemGroup.disableBody(true, true);
            itemGroup.destroy();
            increaseHealth(1);
        }
        ////////////////////////////////////////////////////////////////////////////////////////// Player Health
        heart1 = this.add.image(585, 20, 'heart').setScale(0.5)
        heart2 = this.add.image(549, 20, 'heart').setScale(0.5)
        heart3 = this.add.image(513, 20, 'heart').setScale(0.5)
        ////////////////////////////////////////////////////////////////////////////////////////// Player Create
        player = new Player(this, 300, 750, playerKey)
        player.setWorldBound(true);
        bulletGroup = player.playerAreShooting(bulletKey, player);
        ////////////////////////////////////////////////////////////////////////////////////////// Add Keyboard 
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        ////////////////////////////////////////////////////////////////////////////////////////// Simple enemy wave.
        const waves = [];
        let waveNo = 0;
        let waveEnemy;
        let waveEnemyGroup;
        const waveConfig = {
            wave0: {
                waveName: 'The giant cockroach.',
                waveNo: ++waveNo,
                waveScene: this,
                waveCompleteOn: function () {
                    return this.enemyKillCount === 10;
                },
                waveSteps: function () {
                    console.clear();
                    console.log('(¯▽¯；) Wave ' + waves[0].waveState.waveNo + ' ' + waves[0].waveState.waveName + ' start!');
                    waveEnemy = new Enemy(waves[0].waveState.waveScene, 0, -1000, enemyKey);
                    waveEnemyGroup = waveEnemy.spawnEnemyWave(enemyKey, player);
                    item.pauseSpawnItemWave();
                    const { waveScene } = this.waveState;
                    this.updateWaveState({
                        enemyKillCount: 0
                    });
                    //////////////////////////////////////////////////////////////////////////////////////////
                    waveScene.physics.add.overlap(player, waveEnemyGroup,touchingWaveEnemy.bind(waves[0]), null, this);
                    waveScene.physics.add.overlap(bulletGroup, waveEnemyGroup, HitWaveEnemy.bind(waves[0]), null, this);
                },
                waveCompleted: function () {
                    console.clear();
                    console.log('(/≧▽≦)/ Wave ' + waves[0].waveState.waveNo + ' ' + waves[0].waveState.waveName + ' completed!');
                },
                waveEnded: function () {
                    console.clear();
                    console.log('Wave ' + waves[0].waveState.waveNo + ' ' + waves[0].waveState.waveName + ' ended!');
                    waveEnemy.removeSpawnEnemyWave();
                },
                nextWave: function (nextWave) {
                    console.clear();
                    nextWave.start();
                }
            }, wave1: {
                waveName: 'The Majin Buu 1.',
                waveNo: ++waveNo,
                waveScene: this,
                waveDelay: 5000,
                waveCompleteOn: function () {
                    return this.majinBuuKilled;
                },
                waveSteps: function () {
                    console.clear();
                    console.log('Σ( ° △ °|||) Wave ' + waves[1].waveState.waveNo + ' ' + waves[1].waveState.waveName + ' start!');
                    waveEnemy = new Enemy(waves[1].waveState.waveScene, 0, -1000, enemyKey);
                    waveEnemyGroup = waveEnemy.spawnEnemyWaveInf(enemyKey, player);
                    item.continueSpawnItemWave();
                    const { waveScene } = this.waveState;
                    this.updateWaveState({
                        enemyKillCount: 0
                    });
                    //////////////////////////////////////////////////////////////////////////////////////////
                    waveScene.physics.add.overlap(player, waveEnemyGroup, touchingWaveEnemy.bind(waves[1]), null, this);
                    waveScene.physics.add.overlap(bulletGroup, waveEnemyGroup, HitWaveEnemy.bind(waves[1]), null, this);
                    let boss1 = new Boss(waves[1].waveState.waveScene, 300, 500, boss1Key);
                    boss1.health = 100;
                    boss1.maxHealth = 100;
                    boss1.moveUp(200);
                    boss1.setWorldBound(true);
                    // boss1.setoffset()
                    bulletBossGroup = boss1.bossIsShooting(bulletBossKey, boss1);
                    boss1.playAnimateB(boss1,boss1Key);
                    //////////////////////////////////////////////////////////////////////////////////////////
                    waveScene.physics.add.overlap(boss1, bulletGroup, HitBoss1, null, this);
                    waveScene.physics.add.overlap(player, bulletBossGroup, touchingWaveEnemy, null, this);
                    backgroundBar.setVisible(true);
                    healthBar.setVisible(true);
                    health_frame.setVisible(true);
                },
                waveCompleted: function () {
                    console.clear();
                    console.log('(/≧▽≦)/ Wave ' + waves[1].waveState.waveNo + ' ' + waves[1].waveState.waveName + ' completed!');
                    item.pauseSpawnItemWave();
                    waveEnemy.removeSpawnEnemyWave();
                    backgroundBar.setVisible(false);
                    healthBar.setVisible(false);
                    health_frame.setVisible(false);
                },
                waveEnded: function () {
                    console.clear();
                    console.log('Wave ' + waves[1].waveState.waveNo + ' ' + waves[1].waveState.waveName + ' ended!');
                },
                nextWave: function (nextWave) {
                    console.clear();
                    nextWave.start();
                }
            }, wave2: {
                waveName: 'The Majin Buu 2.',
                waveNo: ++waveNo,
                waveScene: this,
                waveDelay: 7000,
                waveCompleteOn: function () {
                    return this.majinBuuKilled;
                },
                waveSteps: function () {
                    console.clear();
                    console.log('Σ(⊙▽⊙") Wave ' + waves[2].waveState.waveNo + ' ' + waves[2].waveState.waveName + ' start!');
                    waveEnemy = new Enemy(waves[2].waveState.waveScene, 0, -1000, enemyKey);
                    waveEnemyGroup = waveEnemy.spawnEnemyWaveInf(enemyKey, player);
                    item.continueSpawnItemWave();
                    const { waveScene } = this.waveState;
                    //////////////////////////////////////////////////////////////////////////////////////////
                    waveScene.physics.add.overlap(player, waveEnemyGroup, touchingWaveEnemy.bind(waves[2]), null, this);
                    waveScene.physics.add.overlap(bulletGroup, waveEnemyGroup, HitWaveEnemy.bind(waves[2]), null, this);
                    let boss1 = new Boss(waves[2].waveState.waveScene, 300, 500, boss1Key);
                    boss1.health = 300;
                    boss1.maxHealth = 300;
                    healthBar.setScale(boss1.health / boss1.maxHealth, 1);
                    boss1.moveUp(250);
                    boss1.setWorldBound(true);
                    bulletBossGroup = boss1.bossIsShooting(bulletBossKey, boss1);
                    boss1.playAnimateB(boss1,boss1Key);
                    //////////////////////////////////////////////////////////////////////////////////////////
                    waveScene.physics.add.overlap(boss1, bulletGroup, HitBoss1, null, this);
                    waveScene.physics.add.overlap(player, bulletBossGroup, touchingWaveEnemy, null, this);
                    backgroundBar.setVisible(true);
                    health_frame.setDepth(1);
                    healthBar.setVisible(true);
                    health_frame.setVisible(true);
                },
                waveCompleted: function () {
                    console.clear();
                    console.log('(/≧▽≦)/ Wave ' + waves[2].waveState.waveNo + ' ' + waves[2].waveState.waveName + ' completed!');
                    item.removeSpawnItemWave();
                    waveEnemy.removeSpawnEnemyWave();
                    backgroundBar.destroy();
                    healthBar.destroy();
                    health_frame.destroy();

                },
                waveEnded: function () {
                    console.clear();
                    console.log('Wave ' + waves[2].waveState.waveNo + ' ' + waves[2].waveState.waveName + ' ended!');

                },
                nextWave: function (nextWave) {
                    console.clear();
                    game_song.stop();
                    startScene.call(this.waveState.waveScene, 'ComicPageEnd');
                }

            }
        }
        const wave0 = new EnemyWave(waveConfig.wave0);
        const wave1 = new EnemyWave(waveConfig.wave1);
        const wave2 = new EnemyWave(waveConfig.wave2);
        waves.push(wave0);
        waves.push(wave1);
        waves.push(wave2);
        const enw = new EnemyWaveContainer({ containerType: 'array' });
        enw.addEnemyWaves(waves);
        enw.makeSequential();
        enw.run();
        
        function touchingEnemy(player, enemyGroup,) {
            enemyGroup.disableBody(true, true);
            // bulletBossKey.disableBody(true,true);
            enemyGroup.destroy();
            // bulletBossKey.destroy();
            healthPlayer = healthPlayer - 1;
            if (healthPlayer === 2) {
                heart3.setVisible(false);
            }
            else if (healthPlayer === 1) {
                heart2.setVisible(false);
            }
            else if (healthPlayer === 0) {
                heart1.setVisible(false);
            }
        }
        
        this.physics.add.overlap(player, enemyGroup, touchingEnemy,null, this)
        this.physics.add.overlap(player, itemGroup, touchingItem)

        function increaseHealth(health) {
            if (healthPlayer < 3 && healthPlayer > 0) {
                healthPlayer += health;
                showHealth();
            }
        }

        function showHealth() {
            if (healthPlayer == 3) {
                heart3.setVisible(true);
            }
            else if (healthPlayer == 2) {
                heart2.setVisible(true);
            }
            else if (healthPlayer == 1) {
                heart1.setVisible(true);
            }
        }
        //////////////////////////////////////////////////////////////////////////////////////////
        this.physics.add.overlap(bulletGroup, itemGroup, HitItem)
        //////////////////////////////////////////////////////////////////////////////////////////
        backgroundBar = this.add.image(240, 25, 'black-bar').setOrigin(0, 0);
        backgroundBar.setVisible(false);
        backgroundBar.fixedToCamera = true;
        healthBar = this.add.image(240, 25, 'red-bar').setOrigin(0, 0);
        healthBar.setVisible(false);
        healthBar.fixedToCamera = true;
        health_frame = this.add.image(171, 20, 'health_frame').setOrigin(0, 0);
        health_frame.setVisible(false);

        let playerAni = this.time.addEvent({
            delay: 1000,
            callback: function () {
                player.playAnimate(player,playerKey);
            },
            loop: true,
            paused: false,
            callbackScope: this,
            startAt: 0
        })
        
    }
   

    update(delta, time) {
        bg.tilePositionY -= 3
        ////////////////////////////////////////////////////////////////////////////////////////// Check Health 0
        if (healthPlayer < 1) {
            game_song.stop();
            console.clear();
            startScene.call(this, 'MainMenu');
            healthPlayer = 3;
        }
        ////////////////////////////////////////////////////////////////////////////////////////// Control Player
        if (this.keyA.isDown) {
            player.moveLeft(200);
        }
        else if (this.keyD.isDown) {
            player.moveRight(200);
        } else {
            player.notMoveAtX(0);
        }

        if (this.keyW.isDown) {
            player.moveUp(150);
        }
        else if (this.keyS.isDown) {
            player.moveDown(100);
        } else {
            player.notMoveAtY(0);
        }
    }

}
export default GameScene

