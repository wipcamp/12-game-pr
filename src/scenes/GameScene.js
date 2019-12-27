import Enemy from './core/Enemy'
import Player from './core/Player'
let enemyKey = 'enemy'
let enemyGroup
let enemyEvent1
let player;
let playerKey = 'player';
let bulletKey = 'bullet';
let heart
let zone;

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
        this.load.image(enemyKey,'src/images/flyMan_stand.png', { frameWidth: 122, frameHeight: 139 })
    }

    create() {
        
        heart = this.add.image(585, 20,'heart').setScale(0.5)
        heart = this.add.image(549, 20,'heart').setScale(0.5)
        heart = this.add.image(513, 20,'heart').setScale(0.5)
        
        player = new Player(
            this,
            300, 750, playerKey
        )
        console.log(player);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        player.areShooting(bulletKey, player)

        player.setWorldBound()

        player.setSize(0.15)

        player.setHitBox()
        player.setoffset()
        // player.stopShooting()

    enemyGroup = this.physics.add.group();
    
    
    
   
   
     event = this.time.addEvent({
            delay : 2000,
            callback : function (){
            //  let enemy = new Enemy(this,500,200,enemyKey)
            enemyGroup = this.physics.add.image(Phaser.Math.Between(0,600),20,enemyKey).setScale(0.1)
            enemyGroup.setVelocityY(500)
            this.physics.moveToObject(enemyGroup,player,300)
            },
            callbackScope :this,
            loop : true,
            pause : false,
            timeScale:1,
            // repeat : 9
        })
   
    
    }
           



    update(delta, time) {
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