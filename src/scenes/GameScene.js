import Enemy from './core/Enemy'
import Player from './core/Player'
let enemyKey = 'enemy'
let enemyGroup
let enemyEvent1
let player;
let playerKey = 'player';
let bulletKey = 'bullet';
class GameScene extends Phaser.Scene{
    constructor(){
        super({
            key: 'GameScene'
        })
    }

    preload(){
        this.load.image(playerKey,'src/images/Gokuตัดเองจ้า.png')
        this.load.spritesheet(bulletKey,'src/image/character.png')
        this.load.image(enemyKey,'src/images/flyMan_stand.png', { frameWidth: 122, frameHeight: 139 })
    }
    
    create(){
        player = new Player(
            this,
            300, 750,playerKey
        )
        console.log(player);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
        player.areShooting(bulletKey,player)
    // enemy = new Enemy(this, 500, 200,enemyKey);
    // enemy.setObjectWorldBounds();
    // enemy.setSize(0.2)

        player.setWorldBound()
        
        player.setSize(0.1)

        player.setHitBox()
        player.setoffset()
        // player.stopShooting()

    enemyGroup = this.physics.add.group();
     event = this.time.addEvent({
            delay : 2000,
            callback : function (){
            // let enemy = new Enemy(this,500,200,enemyKey)
            enemyGroup = this.physics.add.image(Phaser.Math.Between(0,600),20,enemyKey).setScale(0.1)
            enemyGroup.setVelocityY(200)
            },
            callbackScope :this,
            loop : false,
            pause : false,
            timeScale:1,
            repeat : 9
        })
    }
           


    update(delta, time){
        if (this.keyA.isDown) {
            player.moveLeft();
        }
        else if (this.keyD.isDown) {
            player.moveRight();
        } else {
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
        }
    }

}
export default GameScene