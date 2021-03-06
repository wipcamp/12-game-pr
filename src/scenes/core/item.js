import Phaser from "phaser"
import ObjectProperties from './ObjectProperties';
let event;
let itemGroup;

export default class Item extends ObjectProperties {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);
        this.key = key;
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);

        this.setData("speed", 200);
    }
    spawnItemWave(itemKey) {
        itemGroup = this.scene.physics.add.group();
        event = this.scene.time.addEvent({
            delay: 15000,
            callback: function () {
                if (!this.scene.anims.get('itemAni')) {
                    this.scene.anims.create({
                        key: 'itemAni',
                        frames: this.scene.anims.generateFrameNumbers(itemKey, {
                            start: 0,
                            end: 5

                        }),
                        framerate: 1,
                        repeat: -1
                    })
                }
                let items = this.scene.physics.add.sprite(Phaser.Math.Between(0, 600), 20, itemKey)
                items.anims.play('itemAni', true)
                items.setScale(1)
                itemGroup.add(items)
                itemGroup.setVelocityY(500)
            },
            callbackScope: this,
            loop: false,
            pause: false,
            timeScale: 1,
            repeat: 2
        })
        return itemGroup;
    }

    spawnItemWaveInf(itemKey) {
        itemGroup = this.scene.physics.add.group();
        event = this.scene.time.addEvent({
            delay: 15000,
            callback: function () {
                if (!this.scene.anims.get('itemAni')) {
                    this.scene.anims.create({
                        key: 'itemAni',
                        frames: this.scene.anims.generateFrameNumbers(itemKey, {
                            start: 0,
                            end: 5

                        }),
                        framerate: 1,
                        repeat: -1
                    })
                }
                let items = this.scene.physics.add.sprite(Phaser.Math.Between(0, 600), 20, itemKey)
                items.anims.play('itemAni', true)
                items.setScale(1)
                itemGroup.add(items)
                itemGroup.setVelocityY(500)
            },
            callbackScope: this,
            loop: true,
            pause: false,
            timeScale: 1
        })
        return itemGroup;
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    spawnItemArcade(itemKey) {
        itemGroup = this.scene.physics.add.group();
        event = this.scene.time.addEvent({
            delay: 15000,
            callback: function () {
                if (!this.scene.anims.get('itemAni')) {
                    this.scene.anims.create({
                        key: 'itemAni',
                        frames: this.scene.anims.generateFrameNumbers(itemKey, {
                            start: 0,
                            end: 5

                        }),
                        framerate: 1,
                        repeat: -1
                    })
                }
                let items = this.scene.physics.add.sprite(Phaser.Math.Between(0, 600), 20, itemKey)
                items.anims.play('itemAni', true)
                items.setScale(1)
                itemGroup.add(items)
                itemGroup.setVelocityY(500)
            },
            callbackScope: this,
            loop: true,
            pause: false,
            timeScale: 1
        })
        return itemGroup;
    }

    removeSpawnItemWave() {
        event.remove();
    }

    pauseSpawnItemWave() {
        event.paused = true;
    }

    continueSpawnItemWave() {
        event.paused = false;
    }
}