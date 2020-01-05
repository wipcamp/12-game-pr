import Enemy from './core/Enemy'
let enemyKey = 'enemy'
import Player from './core/Player'
let enemyGroup
let enemyEvent1
let player;
let playerKey = 'player';
let bulletKey = 'bullet';
let healthPlayer = 3;
let heart1
let heart2
let heart3
let zone;

class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene'
        })
    }

    preload(){
        this.load.image(playerKey,'src/images/Gokuตัดเองจ้า.png')
        this.load.spritesheet(bulletKey,'src/image/character.png')
        this.load.image('heart', 'src/images/Heart.png')
        this.load.image(enemyKey,'src/images/flyMan_stand.png', { frameWidth: 122, frameHeight: 139 })
    }
    
    create(){

        heart1 = this.add.image(585, 20,'heart').setScale(0.5)
        heart2 = this.add.image(549, 20,'heart').setScale(0.5)
        heart3 = this.add.image(513, 20,'heart').setScale(0.5)
        
        player = new Player(
            this,
            300, 750, playerKey
        )
        // console.log(player);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
        player.areShooting(bulletKey,player)

        // player.areShooting(bulletKey, player)

        player.setWorldBound()

        player.setSize(0.15)

        player.setHitBox()
        player.setoffset()
        // player.stopShooting()
    
        ///////////////////// By Leng Overlap & Health 3 live
        this.physics.add.overlap(player, monster, hitMonster, null, this);
        function hitMonster(player, monster) {
            healthPlayer = healthPlayer -1 ;
            if(healthPlayer==2){
                heart3.destroy();
            }
            else if(healthPlayer==1){
                heart2.destroy();
            }
                
            else if(healthPlayer==0){
                heart1.destroy();
            }
        }
        /////////////////////
        

    enemyGroup = this.physics.add.group();
    
     event = this.time.addEvent({
            delay : 2000,
            callback : function (){
            //  let enemy = new Enemy(this,500,200,enemyKey)
            //enemyGroup = this.physics.add.image(Phaser.Math.Between(0,600),20,enemyKey).setScale(0.1)
            let enemy = this.physics.add.image(Phaser.Math.Between(0,600),20,enemyKey)
            enemy.setScale(0.1)
            enemyGroup.add(enemy)
            enemyGroup.setVelocityY(500)
            for(let i = 0 ;i < enemyGroup.getLength();i++)
            this.physics.moveToObject(enemyGroup.getChildren()[i],player,300, this)
            },
            callbackScope :this,
            loop : true,
            pause : false,
            timeScale:1,
            // repeat : 9
        })
   
        //Collision check
        function touchingEnemy(player, enemyGroup) {
            enemyGroup.disableBody(true, true);
            enemyGroup.destroy();
                if(healthPlayer==2){
            healthPlayer = healthPlayer -1 ;
                    heart3.destroy();
                }
                else if(healthPlayer==1){
                    heart2.destroy();
                }
                else if(healthPlayer==0){
                    heart1.destroy();
        }
                }

        this.physics.add.overlap(player, enemyGroup, touchingEnemy, null, this)
        this.physics.add.overlap(enemyGroup,player, ()=> { 
             enemyGroup.destroy();
             console.log("hit")
            
        }, this)

    }

    update(delta, time) {
        /////////////////////// Check Health Leave to MainMenu
        if(healthPlayer<=0){
            this.scene.start('MainMenu');
        }
        ///////////////////////
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