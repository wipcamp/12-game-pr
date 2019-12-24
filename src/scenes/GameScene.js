import Enemy from './core/Enemy'

let enemyKey = 'enemy'
let enemyGroup
let enemyEvent1
class GameScene extends Phaser.Scene{

    constructor(){
        super({
            key: 'GameScene'
        })
    }

    preload(){
        this.load.image(enemyKey,'src/images/flyMan_stand.png', { frameWidth: 122, frameHeight: 139 })
    }
    
    create(){
    // enemy = new Enemy(this, 500, 200,enemyKey);
    // enemy.setObjectWorldBounds();
    // enemy.setSize(0.2)
    // enemyGroup = this.physics.add.group();
    // enemy.enemyDropDown()

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
        
    }

}
export default GameScene