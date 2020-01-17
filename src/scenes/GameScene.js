import Bullet from './core/Bullet'
import Enemy from './core/Enemy'
import Player from './core/Player'
import Boss from './core/Boss'
import Item from './core/item';
import ObjectProperties from './core/ObjectProperties';
import EnemyWave from '../utils/enemyWave';
import EnemyWaveContainer from '../utils/enemyWaveContainer';

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

let itemKey = 'items';
let itemGroup
let item;

let bg;

let health_frame;
let healthBar;
let backgroundBar;
let boss1Health = 100;
let boss1MaxHealth = 100;
class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene'
        })
    }

    preload() {
        this.load.image('bg','src/images/BG.png')
        this.load.spritesheet(itemKey, 'src/images/Healthdrop.png', { frameWidth: 100, frameHeight: 100 })
        this.load.image(playerKey, 'src/images/Gokuตัดเองจ้า.png')
        this.load.image(bulletKey, 'src/images/BulletPlayer.png', { frameWidth: 25, frameHeight: 72 })
        this.load.image('heart', 'src/images/Heart.png')
        this.load.spritesheet(enemyKey, 'src/images/enemy.png', { frameWidth: 150, frameHeight: 150 })
        this.load.image(boss1Key, 'src/images/Boss1.png', { frameWidth: 150, frameHeight: 173 })
        this.load.image('health_frame', 'src/images/Health-Frame.png');
        this.load.image('black-bar', 'src/images/health-black.png');
        this.load.image('red-bar', 'src/images/health-red.png');
    }

    create() {
        bg = this.add.tileSprite(0,0,600,900,'bg').setOrigin(0,0)
        ////////////////////////////////////////////////////////////////////////////////////////// spawn item
        item = new Item(this, 0, -1000, itemKey)
        // itemGroup = item.spawnItemWave(itemKey)
        itemGroup = item.spawnItemWaveInf(itemKey)
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
        player.setWorldBound(true)
        player.setSize(0.15)
        player.setHitBox(384, 216)
        player.setoffset(300, 200)

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
                waveCompleteOn: function(){
                    return this.enemyKillCount === 20;
                },
                waveSteps: function(){
                    console.log('Wave '+waves[0].waveState.waveNo+' '+waves[0].waveState.waveName+' start!');
                    waveEnemy = new Enemy(waves[0].waveState.waveScene, 0, -1000, enemyKey);
                    waveEnemyGroup = waveEnemy.spawnEnemyWave(enemyKey, player);
                    const {waveScene} = this.waveState;
                    this.updateWaveState({
                        enemyKillCount: 0
                    });
                    function touchingWaveEnemy(player, waveEnemyGroup) {
                        this.updateWaveState({
                            enemyKillCount: this.waveState.enemyKillCount+1
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
                    waveScene.physics.add.overlap(player, waveEnemyGroup, touchingWaveEnemy.bind(waves[0]), null, this);
                    function HitWaveEnemy(bulletGroup, waveEnemyGroup) {
                        this.updateWaveState({
                            enemyKillCount: this.waveState.enemyKillCount+1
                        });
                        waveEnemyGroup.disableBody(true, true);
                        waveEnemyGroup.destroy();
                        bulletGroup.disableBody(true, true);
                        bulletGroup.destroy();
                    }
                    waveScene.physics.add.overlap(bulletGroup, waveEnemyGroup, HitWaveEnemy.bind(waves[0]), null, this)
                },
                waveCompleted: function(){
                    console.log('Wave '+waves[0].waveState.waveNo+' '+waves[0].waveState.waveName+' completed!');
                },
                waveEnded: function(){
                    console.log('Wave '+waves[0].waveState.waveNo+' '+waves[0].waveState.waveName+' ended!');
                    waveEnemy.removeSpawnEnemyWave();
                },
                nextWave: function(nextWave){
                    nextWave.start();
                }
            }, wave1: {
                waveName: 'The Majin Buu.',
                waveNo: ++waveNo,
                waveScene: this,
                waveDelay: 5000,
                waveCompleteOn: function(){
                    return this.majinBuuKilled;
                },
                waveSteps: function(){
                    console.log('Wave '+waves[1].waveState.waveNo+' '+waves[1].waveState.waveName+' start!');
                    waveEnemy = new Enemy(waves[1].waveState.waveScene, 0, -1000, enemyKey);
                    waveEnemyGroup = waveEnemy.spawnEnemyWaveInf(enemyKey, player);
                    const {waveScene} = this.waveState;
                    this.updateWaveState({
                        enemyKillCount: 0
                    });
                    function touchingWaveEnemy(player, waveEnemyGroup) {
                        this.updateWaveState({
                            enemyKillCount: this.waveState.enemyKillCount+1
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
                    waveScene.physics.add.overlap(player, waveEnemyGroup, touchingWaveEnemy.bind(waves[1]), null, this);
                    function HitWaveEnemy(bulletGroup, waveEnemyGroup) {
                        this.updateWaveState({
                            enemyKillCount: this.waveState.enemyKillCount+1
                        });
                        waveEnemyGroup.disableBody(true, true);
                        waveEnemyGroup.destroy();
                        bulletGroup.disableBody(true, true);
                        bulletGroup.destroy();
                    }
                    waveScene.physics.add.overlap(bulletGroup, waveEnemyGroup, HitWaveEnemy.bind(waves[1]), null, this)
                    let boss1 = new Boss(waves[1].waveState.waveScene, 300, 500, boss1Key);
                    boss1.health = 100;
                    boss1.maxHealth = 100;
                    boss1.moveUp(200);
                    boss1.setWorldBound(true);
                    function HitBoss1(boss1, bulletGroup) {
                        boss1.health -= 3;
                        healthBar.setScale(boss1.health / boss1.maxHealth, 1);
                        bulletGroup.destroy();
                        if(boss1.health <= 0){
                            this.updateWaveState({
                                majinBuuKilled: true,
                            });
                            boss1.destroy();
                        }
                    }
                    waveScene.physics.add.overlap(boss1, bulletGroup, HitBoss1, null, this);
                    backgroundBar.setVisible(true);
                    healthBar.setVisible(true);
                    health_frame.setVisible(true);
                },
                waveCompleted: function(){
                    console.log('Wave '+waves[1].waveState.waveNo+' '+waves[1].waveState.waveName+' completed!');
                },
                waveEnded: function(){
                    console.log('Wave '+waves[1].waveState.waveNo+' '+waves[1].waveState.waveName+' ended!');
                    waveEnemy.removeSpawnEnemyWave();
                    backgroundBar.setVisible(false);
                    healthBar.setVisible(false);
                    health_frame.setVisible(false);
                },
                nextWave: function(nextWave){
                    nextWave.start();
                }
            }, wave2: {
                waveName: 'The Majin Buu revenge.',
                waveNo: ++waveNo,
                waveScene: this,
                waveDelay: 7000,
                waveCompleteOn: function(){
                    return this.majinBuuKilled;
                },
                waveSteps: function(){
                    console.log('Wave '+waves[2].waveState.waveNo+' '+waves[2].waveState.waveName+' start!');
                    waveEnemy = new Enemy(waves[2].waveState.waveScene, 0, -1000, enemyKey);
                    waveEnemyGroup = waveEnemy.spawnEnemyWaveInf(enemyKey, player);
                    const {waveScene} = this.waveState;
                    function touchingWaveEnemy(player, waveEnemyGroup) {
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
                    waveScene.physics.add.overlap(player, waveEnemyGroup, touchingWaveEnemy.bind(waves[2]), null, this);
                    function HitWaveEnemy(bulletGroup, waveEnemyGroup) {
                        waveEnemyGroup.disableBody(true, true);
                        waveEnemyGroup.destroy();
                        bulletGroup.disableBody(true, true);
                        bulletGroup.destroy();
                    }
                    waveScene.physics.add.overlap(bulletGroup, waveEnemyGroup, HitWaveEnemy.bind(waves[2]), null, this)
                    let boss1 = new Boss(waves[2].waveState.waveScene, 300, 500, boss1Key);
                    boss1.health = 300;
                    boss1.maxHealth = 300;
                    healthBar.setScale(boss1.health / boss1.maxHealth, 1);
                    boss1.moveUp(250);
                    boss1.setWorldBound(true);
                    function HitBoss1(boss1, bulletGroup) {
                        boss1.health -= 3;
                        healthBar.setScale(boss1.health / boss1.maxHealth, 1);
                        bulletGroup.destroy();
                        if(boss1.health <= 0){
                            this.updateWaveState({
                                majinBuuKilled: true,
                            });
                            boss1.destroy();
                        }
                    }
                    waveScene.physics.add.overlap(boss1, bulletGroup, HitBoss1, null, this);
                    backgroundBar.setVisible(true);
                    healthBar.setVisible(true);
                    health_frame.setVisible(true);
                },
                waveCompleted: function(){
                    console.log('Wave '+waves[2].waveState.waveNo+' '+waves[2].waveState.waveName+' completed!');
                },
                waveEnded: function(){
                    console.log('Wave '+waves[2].waveState.waveNo+' '+waves[2].waveState.waveName+' ended!');
                    waveEnemy.removeSpawnEnemyWave();
                    backgroundBar.destroy();
                    healthBar.destroy();
                    health_frame.destroy();
                },
                nextWave: function(nextWave){
                    // nextWave.start();
                }
            }
        }
        const wave0 = new EnemyWave(waveConfig.wave0);
        const wave1 = new EnemyWave(waveConfig.wave1);
        const wave2 = new EnemyWave(waveConfig.wave2);
        waves.push(wave0);
        waves.push(wave1);
        waves.push(wave2);
        const enw = new EnemyWaveContainer({containerType: 'array'});
        enw.addEnemyWaves(waves);
        enw.makeSequential();
        enw.run();
        //Possible methods.
        /*enw.addEnemyWave(wave) //Add the eneyWave to the EnemyWaveContainer.,
        //enw.addEnemyWaves(waves) //Add the array of enemyWave to the EnemyWaveContainer.;
        //enw.makeSequential() //Wave will hop to next wave at next index only if it is not the last wave.
        //enw.run() //Wave will start at the first index of EnemyWaveContainer.
        //enw.runAt() //Wave will start at the specify index of EnemyWaveContainer*/
        //////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////// Enemy Create
       
        // enemy = new Enemy(this, 0, -1000, enemyKey);
        // enemyGroup = enemy.spawnEnemyWave(enemyKey, player);

        ////////////////////////////////////////////////////////////////////////////////////////// OverLap Enemy/Player
        function touchingEnemy(player, enemyGroup) {
            enemyGroup.disableBody(true, true);
            enemyGroup.destroy();
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
        this.physics.add.overlap(player, enemyGroup, touchingEnemy, null, this)
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
        ////////////////////////////////////////////////////////////////////////////////////////// OverLap Enemy/Bullet
        // function HitEnemy(bulletGroup, enemyGroup) {
        //     enemyGroup.disableBody(true, true);
        //     enemyGroup.destroy();
        //     bulletGroup.disableBody(true, true);
        //     bulletGroup.destroy();
        // }
        // this.physics.add.overlap(bulletGroup, enemyGroup, HitEnemy, null, this)
        this.physics.add.overlap(bulletGroup, itemGroup, HitItem)
        //////////////////////////////////////////////////////////////////////////////////////////
        backgroundBar = this.add.image(240, 25, 'black-bar').setOrigin(0, 0);
        backgroundBar.setVisible(false);
        backgroundBar.fixedToCamera = true;
        healthBar = this.add.image(240, 25, 'red-bar').setOrigin(0, 0);
        healthBar.setVisible(false);
        healthBar.fixedToCamera = true;
        health_frame = this.add.image(171, 20, 'health_frame').setOrigin(0,0);
        health_frame.setVisible(false);
        ////////////////////////////////////////////////////////////////////////////////////////// Create Event Boss 1
    //     let eventBoss1 = this.time.addEvent({
    //         delay: 10000,
    //         callback: function () {
    //             boss1 = new Boss(this, 300, 500, boss1Key)
    //             boss1.health = boss1.health - 10;
    //             boss1.moveUp(200);
    //             boss1.setWorldBound(true);
    //             function HitBoss1(boss1, bulletGroup) {
    //                 boss1Health -= 3;
    //                 bulletGroup.destroy();
    //             }
    //             this.physics.add.overlap(boss1, bulletGroup, HitBoss1, null, this)
    //             backgroundBar.setVisible(true);
    //             healthBar.setVisible(true);
    //             health_frame.setVisible(true);
    //         },
    //         callbackScope: this,
    //         loop: false,
    //         pause: false,
    //         timeScale: 1,
    //         repeat: 0
    //     })
    }
    //
    // clearBoss() {
    //     // boss1.BossMoving(true,500,200,-200);
    //     boss1.destroy();
    //     let event = this.time.addEvent({
    //         delay: 2000,
    //         callback: function () {
    //             backgroundBar.destroy();
    //             healthBar.destroy();
    //             health_frame.destroy();
    //         },
    //         callbackScope: this,
    //         loop: false,
    //         pause: false,
    //         timeScale: 1,
    //         repeat: 0
    //     })
    // }

    update(delta, time) {
        bg.tilePositionY -= 3
        // if (boss1Health <= 0) {
        //     this.clearBoss();
        // }
        //healthBar.setScale(boss1Health / boss1MaxHealth, 1);
        ////////////////////////////////////////////////////////////////////////////////////////// Check Health 0
        if (healthPlayer < 1) {
            healthPlayer = 0;
            this.scene.start('MainMenu');
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