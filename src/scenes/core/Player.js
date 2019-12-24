import 'phaser';
import PlayerBullet from './PlayerBullet'
let bullets;
let bulletEvent1;
let bulletEvent2;
let bulletEvent3;
export default class Player extends PlayerBullet{
    constructor(scene, x, y, key) {
      super(scene, x, y, key);
      this.scene = scene;
      this.scene.add.existing(this);
      this.scene.physics.world.enableBody(this, 0);
      
      this.setData("speed", 200);

    }

    moveLeft() {
        this.body.velocity.x = -this.getData("speed");
      }
      moveRight() {
        this.body.velocity.x = this.getData("speed");
      }

    setWorldBound(){
        this.body.setCollideWorldBounds(true)
    }

    setSize(size){
        this.setScale(size)
    }

    setHitBox(){
        this.body.setSize(384, 216)
    }

    setoffset(){
        this.body.setOffset(300, 200)
    }
}
