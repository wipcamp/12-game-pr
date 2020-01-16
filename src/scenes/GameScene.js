import Bullet from './core/Bullet'
import Enemy from './core/Enemy'
import Player from './core/Player'
import Boss from './core/Boss'
import Item from './core/item';
import ObjectProperties from './core/ObjectProperties';
import EnemyWave from '../utils/enemyWave';

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
        itemGroup = item.spawnItemWave(itemKey)
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
        //////////////////////////////////////////////////////////////////////////////////////////
        let waves = [];
        let waveNo = 0;
        const wave0 = new EnemyWave({
            waveName: 'Wave 1: I\'m so hungry!',
            waveNo: ++waveNo,
            waveScene: this,
            waveCompleteOn: function(){
                return this.enemyKillCount === 10;
            },
            waveSteps: function(){
                console.log('wave '+waves[0].waveState.waveNo
                +waves[0].waveState.waveName+' start');
                // let enemyx = new Enemy(waves[0].waveState.waveScene, 0, -1000, enemyKey);
                // let enemyGroupx = enemyx.spawnEnemyWave(enemyKey, player);
                // waves[0].emit('waveComplete');
            },
            waveCompleted: function(nextWave){
                console.log('wave '+waves[0].waveNo+' completed');
                // waves[0].emit('waveEnd');
                // waves[0].emit('nextWave', waves[1]);
                // nextWave.start();
            },
            nextWave: function(nextWave){
                // console.log('nextWave!');
                nextWave.start();
            }
        });
        const wave1 = new EnemyWave({
            waveName: 'Wave 2: I\'m so hungry! V2',
            waveNo: ++waveNo,
            waveCompleteOn: function(){
                return true;
            },
            waveSteps: function(){
                console.log('wave '+waves[1].waveState.waveNo+waves[1].waveState.waveName+' start');
                // waves[1].emit('waveComplete');
            },
            waveCompleted: function(){
                console.log('wave '+waves[1].waveNo+' completed');
                // waves[0].emit('waveEnd');
            },
            nextWave: function(nextWave){
                console.log('2nextWave!');
                //nextWave.start();
            }
        });
        waves.push(wave0);
        waves.push(wave1);
        //console.dir(waves[0]);
        waves[0].updateWaveState({waveNext: waves[1]});
        waves[0].start();
        //////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////// Enemy Create
       
        enemy = new Enemy(this, 0, -1000, enemyKey);
        enemyGroup = enemy.spawnEnemyWave(enemyKey, player);

        ////////////////////////////////////////////////////////////////////////////////////////// OverLap Enemy/Player
        function touchingEnemy(player, enemyGroup) {
            enemyGroup.disableBody(true, true);
            enemyGroup.destroy();
            healthPlayer = healthPlayer - 1;
            if (healthPlayer == 2) {
                heart3.setVisible(false);
            }
            else if (healthPlayer == 1) {
                heart2.setVisible(false);
            }
            else if (healthPlayer == 0) {
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
        function HitEnemy(bulletGroup, enemyGroup) {
            enemyGroup.disableBody(true, true);
            enemyGroup.destroy();
            bulletGroup.disableBody(true, true);
            bulletGroup.destroy();
        }
        this.physics.add.overlap(bulletGroup, enemyGroup, HitEnemy, null, this)
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
        let eventBoss1 = this.time.addEvent({
            delay: 10000,
            callback: function () {
                boss1 = new Boss(this, 300, 500, boss1Key)
                boss1.health = boss1.health - 10;
                boss1.moveUp(200);
                boss1.setWorldBound(true);
                function HitBoss1(boss1, bulletGroup) {
                    boss1Health -= 3;
                    bulletGroup.destroy();
                }
                this.physics.add.overlap(boss1, bulletGroup, HitBoss1, null, this)
                backgroundBar.setVisible(true);
                healthBar.setVisible(true);
                health_frame.setVisible(true);
            },
            callbackScope: this,
            loop: false,
            pause: false,
            timeScale: 1,
            repeat: 0
        })
    }

    clearBoss() {
        // boss1.BossMoving(true,500,200,-200);
        boss1.destroy();
        let event = this.time.addEvent({
            delay: 2000,
            callback: function () {
                backgroundBar.destroy();
                healthBar.destroy();
                health_frame.destroy();
            },
            callbackScope: this,
            loop: false,
            pause: false,
            timeScale: 1,
            repeat: 0
        })
    }

    update(delta, time) {
        bg.tilePositionY -= 3
        if (boss1Health <= 0) {
            this.clearBoss();
        }
        healthBar.setScale(boss1Health / boss1MaxHealth, 1);
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