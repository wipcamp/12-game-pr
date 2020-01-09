import PlayerBullet from './core/PlayerBullet'
import Enemy from './core/Enemy'
import Player from './core/Player'
import Item from './core/item';

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
let itemKey = 'items';
let itemGroup
let item;

class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene'
        })
    }

    preload() {
        this.load.image(playerKey, 'src/images/Gokuตัดเองจ้า.png')
        this.load.spritesheet(bulletKey, 'src/image/character.png')
        this.load.image('heart', 'src/images/Heart.png')
        this.load.image(enemyKey, 'src/images/flyMan_stand.png', { frameWidth: 122, frameHeight: 139 })
        this.load.image(itemKey, 'src/images/Heart.png')

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
        player.setWorldBound()
        player.setSize(0.15)
        player.setHitBox()
        player.setoffset()
        ////////////////////////////////////////////////////////////////////////////////////////// Add Keyboard 
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        ////////////////////////////////////////////////////////////////////////////////////////// Enemy Create
        enemy = new Enemy(this, 0, -1000, enemyKey)
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
            bulletGroup = player.areShooting(bulletKey, player);
            function HitEnemy(bulletGroup, enemyGroup, ) {
                enemyGroup.disableBody(true, true);
                enemyGroup.destroy();
                bulletGroup.disableBody(true, true);
                bulletGroup.destroy();

            }
            this.physics.add.overlap(bulletGroup, enemyGroup, HitEnemy, null, this)
            this.physics.add.overlap(bulletGroup, itemGroup, HitItem)
    }

    
    update(delta, time) {
        ////////////////////////////////////////////////////////////////////////////////////////// Check Health 0
        if (healthPlayer < 1) {
            healthPlayer = 0;
            this.scene.start('MainMenu');
        }
        ////////////////////////////////////////////////////////////////////////////////////////// Control Player

        if (this.keyA.isDown) {
            player.moveLeft(250);
        }
        else if (this.keyD.isDown) {
            player.moveRight(250);
        } else {
            player.notMove(0);
        }

        if (this.keyW.isDown) {
            player.moveUp(-250);
        }
        else if (this.keyS.isDown) {
            player.moveDown(250);
        } else {
            player.notMoveY(0)
        }
    }



}
export default GameScene