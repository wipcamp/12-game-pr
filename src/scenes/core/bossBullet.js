import Phaser from "phaser"
import ObjectProperties from './ObjectProperties';
let b_bullets;
let b_bulletEvent1;
let b_bulletEvent2;
let b_bulletEvent3;
export default class bossBullet extends ObjectProperties {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);
        this.key = key;
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   bossIsShooting(b_bulletKey, boss) {
        b_bullets = this.scene.physics.add.group();
        b_bulletEvent1 = this.scene.time.addEvent({
            delay: 5000,
            callback: function() {
                let b_bullet = this.scene.physics.add.image(boss.x, boss.y - 50, b_bulletKey)
                b_bullets.add(b_bullet)
                b_bullet.setVelocityY(600).setScale(0.5);
                
                setTimeout(() => {
                    b_bullet.destroy()
                }, 4000)
            },
            loop: true,
            paused: false,
            callbackScope: this,
            startAt: 500,
            
        })

        b_bulletEvent2 = this.scene.time.addEvent({
            delay: 5000,
            callback: function() {
                let b_bullet = this.scene.physics.add.image(boss.x, boss.y - 50, b_bulletKey)
                b_bullets.add(b_bullet)
                b_bullet.setVelocityY(600).setScale(0.5);
                b_bullet.setVelocityX(300)
                setTimeout(() => {
                    b_bullet.destroy()
                }, 4000)
            },
            loop: true,
            paused: false,
            callbackScope: this,
            startAt: 500,
            
        })

        b_bulletEvent3 = this.scene.time.addEvent({
            delay: 5000,
            callback: function() {
                let b_bullet = this.scene.physics.add.image(boss.x, boss.y - 50, b_bulletKey)
                b_bullets.add(b_bullet)
                b_bullet.setVelocityY(600).setScale(0.5);
                b_bullet.setVelocityX(-300)
                setTimeout(() => {
                    b_bullet.destroy()
                }, 4000)
            },
            loop: true,
            paused: false,
            callbackScope: this,
            startAt: 500,
            
        })
        return b_bullets

   }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   bossIsShooting2(b_bulletKey, boss) {
        b_bullets = this.scene.physics.add.group();
        b_bulletEvent1 = this.scene.time.addEvent({
            delay: 2000,
            callback: function() {
                let b_bullet = this.scene.physics.add.image(boss.x, boss.y - 50, b_bulletKey)
                b_bullets.add(b_bullet)
                b_bullet.setVelocityY(600).setScale(0.5);
                
                setTimeout(() => {
                    b_bullet.destroy()
                }, 4000)
            },
            loop: true,
            paused: false,
            callbackScope: this,
            startAt: 500,
            
        })
        return b_bullets

   }

   

   bossStopShooting() {
    b_bulletEvent1.destroy()
    b_bulletEvent2.destroy()
    b_bulletEvent3.destroy()
    //    this.b_bulletEvent1.paused = true;
    //    this.b_bulletEvent2.paused = true;
    //    this.b_bulletEvent3.paused = true;
   }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   bossIsShootingArcade(b_bulletKey, boss) {
    b_bullets = this.scene.physics.add.group();
    b_bulletEvent1 = this.scene.time.addEvent({
        delay: 1000,
        callback: function() {
            let b_bullet = this.scene.physics.add.image(boss.x, boss.y - 50, b_bulletKey)
            b_bullets.add(b_bullet)
            b_bullet.setVelocityY(600).setScale(0.5);
            
            setTimeout(() => {
                b_bullet.destroy()
            }, 4000)
        },
        loop: true,
        paused: false,
        callbackScope: this,
        startAt: 500,
        
    })

    b_bulletEvent2 = this.scene.time.addEvent({
        delay:  1000,
        callback: function() {
            let b_bullet = this.scene.physics.add.image(boss.x, boss.y - 50, b_bulletKey)
            b_bullets.add(b_bullet)
            b_bullet.setVelocityY(600).setScale(0.5);
            b_bullet.setVelocityX(300)
            setTimeout(() => {
                b_bullet.destroy()
            }, 4000)
        },
        loop: true,
        paused: false,
        callbackScope: this,
        startAt: 500,
        
    })

    b_bulletEvent3 = this.scene.time.addEvent({
        delay: 1000,
        callback: function() {
            let b_bullet = this.scene.physics.add.image(boss.x, boss.y - 50, b_bulletKey)
            b_bullets.add(b_bullet)
            b_bullet.setVelocityY(600).setScale(0.5);
            b_bullet.setVelocityX(-300)
            setTimeout(() => {
                b_bullet.destroy()
            }, 4000)
        },
        loop: true,
        paused: false,
        callbackScope: this,
        startAt: 500,
        
    })
    return b_bullets

}

}