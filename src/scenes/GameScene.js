import Bullet from './core/Bullet'
import Enemy from './core/Enemy'
import Player from './core/Player'
import Boss from './core/Boss'
import Item from './core/item';
import ObjectProperties from './core/ObjectProperties';

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
        this.load.image(itemKey, 'src/images/Heart.png')
        this.load.image(playerKey, 'src/images/Gokuตัดเองจ้า.png')
        this.load.image(bulletKey, 'src/images/BulletPlayer.png', { frameWidth: 25, frameHeight: 72 })
        this.load.image('heart', 'src/images/Heart.png')
        this.load.image(enemyKey, 'src/images/flyMan_stand.png', { frameWidth: 122, frameHeight: 139 })
        this.load.image(boss1Key, 'src/images/Boss1.png', { frameWidth: 150, frameHeight: 173 })
        this.load.image('health_frame', 'src/images/Health-Frame.png');
        this.load.image('black-bar', 'src/images/health-black.png');
        this.load.image('red-bar', 'src/images/health-red.png');
    }

    create() {
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
        ////////////////////////////////////////////////////////////////////////////////////////// Enemy Create
        enemy = new Enemy(this, 0, -1000, enemyKey)
        enemyGroup = enemy.spawnEnemyWave(enemyKey, player);
        //////////////////////////////////////////////////////////////////////////////////////////
        boss1 = new Boss(this, 300, 500, boss1Key)
        boss1.moveUp(100);
        boss1.setWorldBound(true)

        backgroundBar = this.add.image(240, 25, 'black-bar').setOrigin(0, 0);
        backgroundBar.fixedToCamera = true;
        healthBar = this.add.image(240, 25, 'red-bar').setOrigin(0, 0);
        healthBar.fixedToCamera = true;
        health_frame = this.add.image(171, 20, 'health_frame').setOrigin(0, 0);
        boss1.health = boss1.health - 10;
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
        ////////////////////////////////////////////////////////////////////////////////////////// OverLap Boss1/Bullet
        function HitBoss1(boss1, bulletGroup) {
            boss1Health -= 5;
            bulletGroup.destroy();
        }
        this.physics.add.overlap(boss1, bulletGroup, HitBoss1, null, this)
    }

    clearBoss() {
        boss1.destroy();
        let TF = false;
        let event = this.time.addEvent({
            delay: 2000,
            callback: function () {
                backgroundBar.destroy();
                healthBar.destroy();
                health_frame.destroy();
            },
            callbackScope: this,
            loop: false,
            pause: TF,
            timeScale: 1,
            repeat: 0
        })
        TF = false;
    }

    update(delta, time) {
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
            player.moveRight(250);
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