import 'Phaser';
export default class ObjectProperties extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);

    }

    moveLeft(Value) {
        this.body.setVelocityX(-Value);
    }
    moveRight(Value) {
        this.body.setVelocityX(Value);
    }
    notMoveAtX() {
        this.body.setVelocityX(0);
    }
    moveUp(Value) {
        this.body.setVelocityY(-Value);
    }
    moveDown(Value) {
        this.body.setVelocityY(Value);
    }
    notMoveAtY() {
        this.body.setVelocityY(0);
    }

    setWorldBound(Value) {
        this.body.setCollideWorldBounds(Value);
    }

    setSize(size) {
        this.setScale(size);
    }

    setHitBox(valueX, valueY) {
        this.body.setSize(valueX, valueY);
    }

    setoffset(valueX, valueY) {
        this.body.setOffset(valueX, valueY);
    }
}
