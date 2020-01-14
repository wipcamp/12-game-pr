import 'Phaser';
import ObjectProperties from './ObjectProperties';
export default class Boss extends ObjectProperties{
    constructor(scene, x, y, key) {
      super(scene, x, y, key);
    this.key = key;
      this.scene = scene;
      this.scene.add.existing(this);
      this.scene.physics.world.enableBody(this, 0);
      this.setData("speed", 200);
      

    }
    BossMoving(value,Time,Pos,Con){
      let event = this.scene.time.addEvent({
       delay: Time,
       callback: function () {
         this.body.setVelocityX(Phaser.Math.Between(Con, Pos));
       },
       callbackScope: this,
       loop: true,
       timeScale: 1,
       pause: value
      //  repeat: 10
     })
     }
     
     bossCheckIsDead(value){
        return value;
     }
}