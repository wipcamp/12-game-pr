import 'Phaser';
import ObjectProperties from './ObjectProperties';
let event
let enemyGroup

export default class Enemy extends ObjectProperties{
    constructor(scene, x, y, key) {
      super(scene, x, y, key);
      this.key = key;
      this.scene = scene;
      this.scene.add.existing(this);
      this.scene.physics.world.enableBody(this, 0);
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
                this.scene.anims.create({
                    key: 'enemyAni',
                    frames: this.scene.anims.generateFrameNumbers(enemyKey, {
                        start: 0,
                        end: 5
        
                    }),
                    framerate: 1,
                    repeat: -1
                })
                let enemy = this.scene.physics.add.sprite(Phaser.Math.Between(0, 600), 20, enemyKey)
                enemy.anims.play('enemyAni', true)
                // enemy.setScale(0.1)
                enemyGroup.add(enemy)
                enemyGroup.setVelocityY(500)
                for (let i = 0; i < enemyGroup.getLength(); i++)
                    this.scene.physics.moveToObject(enemyGroup.getChildren()[i], player, 300, this)
            },
            callbackScope: this,
            loop: false,
            pause: false,
            timeScale: 1,
            repeat : 4
        })
        return enemyGroup;
    }

    spawnEnemyWaveInf(enemyKey,player){
        enemyGroup = this.scene.physics.add.group();

        event = this.scene.time.addEvent({
            delay: 2000,
            callback: function () {
                this.scene.anims.create({
                    key: 'enemyAni',
                    frames: this.scene.anims.generateFrameNumbers(enemyKey, {
                        start: 0,
                        end: 5
        
                    }),
                    framerate: 1,
                    repeat: -1
                })
                let enemy = this.scene.physics.add.sprite(Phaser.Math.Between(0, 600), 20, enemyKey)
                enemy.anims.play('enemyAni', true)
                // enemy.setScale(0.1)
                enemyGroup.add(enemy)
                enemyGroup.setVelocityY(500)
                for (let i = 0; i < enemyGroup.getLength(); i++)
                    this.scene.physics.moveToObject(enemyGroup.getChildren()[i], player, 300, this)
            },
            callbackScope: this,
            loop: true,
            pause: false,
            timeScale: 1
        })
        return enemyGroup;
    }

    removeSpawnEnemyWave(){
        event.remove();
    }

    pauseSpawnEnemyWave(){
        event.paused = true;
    }

    continueSpawnEnemyWave(){
        event.paused = false;
    }
}