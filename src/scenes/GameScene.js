import Enemy from './core/Enemy'

let enemyGroup
let enemyKey = 'enemy'
let enemy
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
        //  enemy = new Enemy(this, 500, 200,enemyKey);
        // enemy.setObjectWorldBounds();
        // enemy.setSize(0.2)
        enemyGroup = this.physics.add.group();
        enemy.setEnemyGroup()


    }

    update(delta, time){
         
    }

}
export default GameScene