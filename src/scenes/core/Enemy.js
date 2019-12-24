import 'Phaser';
export default class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, key) {
      super(scene, x, y, key);
      this.key = key;
      this.scene = scene;
      this.scene.add.existing(this);
      this.scene.physics.world.enableBody(this, 0);

      this.setData("speed", 200);
    }

    setEnemyGroup(){
        
        event = this.time.addEvent({
            delay : 2000,
            callback : function (){
            enemy = this.physics.add.sprite(Phaser.Math.Between(0,600),20,'enemyKey').setScale(0.1)
            enemyGroup.add(enemy)
            enemy.setVelocityY(200)
            
            },
            callbackScope :this,
            loop : true,
            pause : false,
            timeScale:1,
        })
    }

    setObjectWorldBounds(){
        this.body.setCollideWorldBounds(true);
    }
     
    setSize(size){
        this.setScale(size)
    }

}