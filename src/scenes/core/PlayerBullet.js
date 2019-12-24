import 'Phaser'
let bullets;
let bulletEvent1;
let bulletEvent2;
let bulletEvent3;
export default class PlayerBullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);
        this.key = key;
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
    }

    areShooting(bulletKey,player){
               bullets = this.scene.physics.add.group();
        
              bulletEvent1 = this.scene.time.addEvent({
                  delay: 1000,
                  callback: function () {
                              let bullet = this.scene.physics.add.image(player.x,player.y-50,bulletKey)                     
                
                               bullet.setVelocityY(-800)
                  },
                  loop: true,
                  paused: false,
                  callbackScope: this,
                  startAt:500
              })
        
              bulletEvent2 = this.scene.time.addEvent({
                delay: 1000,
                callback: function () {
                            let bullet = this.scene.physics.add.image(player.x,player.y-50,bulletKey)
                            bullets.add(bullet)
                             bullet.setVelocityY(-800)
                },
                loop: true,
                paused: false,
                callbackScope: this,
                startAt:600
            })
        
            bulletEvent3 = this.scene.time.addEvent({
              delay: 1000,
              callback: function () {
                          let bullet = this.scene.physics.add.image(player.x,player.y-50,bulletKey)
                          bullets.add(bullet)
                           bullet.setVelocityY(-800)
              },
              loop: true,
              paused: false,
              callbackScope: this,
              startAt:700
          })
        }

    stopShooting(){
        bulletEvent1.paused =true
        bulletEvent2.paused =true
        bulletEvent3.paused =true
    }

}