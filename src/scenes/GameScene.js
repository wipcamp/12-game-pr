import PlayerBullet from './core/PlayerBullet'
import Enemy from './core/Enemy'
import Player from './core/Player'

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
    }

    create() {
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
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        ////////////////////////////////////////////////////////////////////////////////////////// Enemy Create
        enemy = new Enemy(this, 0, -1000, enemyKey)
        enemyGroup = enemy.spawnEnemyWave(enemyKey,player);
        ////////////////////////////////////////////////////////////////////////////////////////// OverLap Enemy/Player
        function touchingEnemy(player, enemyGroup) {
            enemyGroup.disableBody(true, true);
            enemyGroup.destroy();
            healthPlayer = healthPlayer - 1;
            if (healthPlayer == 2) {
                heart3.destroy();
            }
            else if (healthPlayer == 1) {
                heart2.destroy();
            }
            else if (healthPlayer == 0) {
                heart1.destroy();
            }
        }
        this.physics.add.overlap(player, enemyGroup, touchingEnemy, null, this)
        ////////////////////////////////////////////////////////////////////////////////////////// OverLap Enemy/Bullet
        bulletGroup = player.areShooting(bulletKey, player);
        function HitEnemy(bulletGroup,enemyGroup) {
            enemyGroup.disableBody(true, true);
            enemyGroup.destroy();
            bulletGroup.disableBody(true, true);
            bulletGroup.destroy();
        }
        this.physics.add.overlap(bulletGroup, enemyGroup, HitEnemy, null, this)
    }

    update(delta, time) {
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
            player.notMove(0);
        }
    }



}
export default GameScene