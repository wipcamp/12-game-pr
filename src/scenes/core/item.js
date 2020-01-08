import 'Phaser';
let event;
let itemGroup;

export default class Item extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, key) {
      super(scene, x, y, key);
      this.key = key;
      this.scene = scene;
      this.scene.add.existing(this);
      this.scene.physics.world.enableBody(this, 0);

      this.setData("speed", 200);
    }

    spawnItemWave(){
        itemGroup = this.scene.physics.add.group();

        event = this.scene.time.addEvent({
            delay: 2500,
            callback: function () {
                let items = this.scene.physics.add.image(Phaser.Math.Between(0, 600), 20, itemGroup)
                items.setScale(0.1)
                itemGroup.add(items)
                itemGroup.setVelocityY(500)
            },
            callbackScope: this,
            loop: false,
            pause: false,
            timeScale: 1,
            repeat : 9
        })
        return itemGroup;
    }
}