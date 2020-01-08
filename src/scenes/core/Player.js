import 'Phaser';
import PlayerBullet from './PlayerBullet';
let bullets;
let bulletEvent1;
let bulletEvent2;
let bulletEvent3;
export default class Player extends PlayerBullet {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);

  }
  moveUp(Value) {
    this.body.setVelocityY(Value);
  }

  moveDown(Value) {
    this.body.setVelocityY(Value);
  }

  moveLeft(Value) {
    this.body.setVelocityX(-Value);
  }
  moveRight(Value) {
    this.body.setVelocityX(Value);
  }
  notMove(Value) {
    this.body.setVelocityX(Value);
  }

  notMoveY(Value){
    this.body.setVelocityY(Value);
  }

  setWorldBound() {
    this.body.setCollideWorldBounds(true)
  }

  setSize(size) {
    this.setScale(size)
  }

  setHitBox() {
    this.body.setSize(384, 216)
  }

  setoffset() {
    this.body.setOffset(300, 200)
  }
}
