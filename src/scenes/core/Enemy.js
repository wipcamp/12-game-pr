import 'Phaser';
let event
let enemyGroup

export default class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, key) {
      super(scene, x, y, key);
      this.key = key;
      this.scene = scene;
      this.scene.add.existing(this);
      this.scene.physics.world.enableBody(this, 0);

      this.setData("speed", 200);
    }

    setObjectWorldBounds(){
        this.body.setCollideWorldBounds(true);
    }
     
    setSize(size){
        this.setScale(size)
    }
    spawnEnemyWave(enemyKey,player){
        enemyGroup = this.scene.physics.add.group();

        event = this.scene.time.addEvent({
            delay: 2000,
            callback: function () {
                let enemy = this.scene.physics.add.image(Phaser.Math.Between(0, 600), 20, enemyKey)
                enemy.setScale(0.1)
                enemyGroup.add(enemy)
                enemyGroup.setVelocityY(500)
                for (let i = 0; i < enemyGroup.getLength(); i++)
                    this.scene.physics.moveToObject(enemyGroup.getChildren()[i], player, 300, this)
            },
            callbackScope: this,
            loop: false,
            pause: false,
            timeScale: 1,
            repeat : 9
        })
        return enemyGroup;
    }

}