import Phaser from "phaser"

import Bullet from './core/Bullet'
import Boss from './core/Boss'
import Enemy from './core/Enemy'
import Player from './core/Player'
import Item from './core/item';
import { preloadScene } from '../utils/preloadScene';
import {startScene} from '../utils/goTo'
import { default as spawnBoss } from '../utils/randomBosses';

let enemyKey = 'enemy'
let enemy;
let enemyGroup

let playerKey = 'player';
let player;

let bulletKey = 'bullet';
let bulletGroup;

var healthPlayer = 3;
let heart1
let heart2
let heart3

let itemKey = 'items';
let itemGroup
let item;
let HitItem

let bgGameArcade;
let scoreBG

let game_song

let score = {
    text: '',
    total: 0
}
let boss1Key = 'boss1';
let bulletBossKey = 'bossBullet';
let boss2Key = 'boss2';
let bulletBoss2Key = 'bossBullet2';

let userData = {}

class MiniGame extends Phaser.Scene {
    constructor() {
        super({
            key: 'MiniGame'
        })
        this.healthPlayer = 3;
        this.bossCount = 0;
        this.canRoll = true;
    }

    init(data){
        if (!data) {
            window.location.href = `https://12-gamepr.freezer.wip.camp`
        } else {
            userData = data
        }
    }

    preload(){

        this.load.image('bgGame', './images/Bg.png')  
        this.load.spritesheet(boss1Key, './images/Boss.png', { frameWidth: 161.5, frameHeight: 140 })
        this.load.spritesheet(boss2Key, './images/Boss2.png', { frameWidth: 300, frameHeight: 300 })
        this.load.spritesheet(bulletBossKey, './images/BulletBoss.png', { frameWidth: 75, frameHeight: 150 })
        this.load.spritesheet(bulletBoss2Key, './images/BulletBoss2.png', { frameWidth: 27, frameHeight: 149 })
        this.load.spritesheet(itemKey, './images/Healthdrop.png', { frameWidth: 100, frameHeight: 100 })
        this.load.spritesheet(playerKey, './images/Player.png', { frameWidth: 100, frameHeight: 100 })
        this.load.spritesheet(bulletKey, './images/BulletPlayer.png', { frameWidth: 45, frameHeight: 152 })
        this.load.image('heart', './images/Heart.png')
        this.load.spritesheet(enemyKey, './images/enemy.png', { frameWidth: 70, frameHeight: 121 })
        this.load.image('health_frame', './images/Health-Frame.png');
        this.load.image('black-bar', './images/health-black.png');
        this.load.image('red-bar', './images/health-red.png');
        this.load.audio('game_song','./songs/08. Operation.mp3');
        this.load.image('scoreBG','./images/Box_Score.png');
        //////////////////////////////////////////////////////////////////////////////////////////
        preloadScene({
            scene: this,
            key: 'default'
        })
    }
    create(){
        // sessionStorage.clear()
        bgGameArcade = this.add.tileSprite(0, 0, 600, 900, 'bgGame').setOrigin(0, 0)
        scoreBG = this.add.image(60,40,'scoreBG')
        /////////////////////////////////////////////////////////////////////
        game_song = this.sound.add('game_song',{volume: 0.15});
        game_song.play();
        ////////////////////////////////////////////////////////////////////
        player = new Player(this, 300, 750, playerKey)
        player.setWorldBound(true)
        // player.setSize(0.15)
        // player.setHitBox(384, 216)
        // player.setoffset(300, 200)
        player.setInteractive()
        this.input.setDraggable(player)
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;

        });
        //////////////////////////////////////////////////////////////////
        let playerAni = this.time.addEvent({
            delay: 1000,
            callback: function () {
                player.playAnimate(player,playerKey);
            },
            loop: true,
            paused: false,
            callbackScope: this,
            startAt: 0
        })
        //////////////////////////////////////////////////////////////////
        // scoreText = this.add.text(23, 40,  score, { fontSize: '20px', fill: '#ffffff' });
        //////////////////////////////////////////////////////////////////
        let bossEvent = timeMillis => {
            if(this.bossCount===0) {
                this.canRoll = false;
                let boss = this.time.addEvent({
                    delay: timeMillis,
                    callback: function () {
                        spawnBoss({
                            scene: this,
                            score,
                            player,
                        });
                    },
                    callbackScope: this
                });
                setTimeout(() => {boss.remove(false)}, timeMillis + 100);
            }
        };
        bulletGroup = player.playerAreShooting(bulletKey, player);
        //////////////////////////////////////////////////////////////////
        let registerBossEvent = this.time.addEvent({
            delay: 60000,
            callback: function () {
                if(this.canRoll) {
                    const time = Math.floor(Math.random() * 3000)+ 6000;
                    bossEvent(time);
                }
            },
            callbackScope: this,
            loop: true
        });
        //////////////////////////////////////////////////////////////////
        score.text = this.add.text(23, 40,  score.total, { fontSize: '20px', fill: '#ffffff' });
        //////////////////////////////////////////////////////////////////
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
         ////////////////////////////////////////////////////////////////////////////////////////// Player Health
         heart1 = this.add.image(585, 20, 'heart').setScale(0.5)
         heart2 = this.add.image(549, 20, 'heart').setScale(0.5)
         heart3 = this.add.image(513, 20, 'heart').setScale(0.5)
        //////////////////////////////////////////////////////////////////
            enemy = new Enemy( this,0, -1000, enemyKey);
            enemyGroup = enemy.spawnEnemyArcede(enemyKey, player);
        ////////////////////////////////////////////////////////////////////
        function touchingEnemy(player, enemyGroup,) {
            enemyGroup.disableBody(true, true);
            // bulletBossKey.disableBody(true,true);
            enemyGroup.destroy();
            // bulletBossKey.destroy();
            this.healthPlayer = this.healthPlayer - 1;
            if (this.healthPlayer === 2) {
                this.heart3.setVisible(false);
            }
            else if (this.healthPlayer === 1) {
                this.heart2.setVisible(false);
            }
            else if (this.healthPlayer === 0) {
                this.eart1.setVisible(false);
            }
        }

        function HitEnemy(bulletGroup, enemyGroup, ) {
            score.total = score.total + 10;
            enemyGroup.disableBody(true, true);
            enemyGroup.destroy();
            bulletGroup.disableBody(true, true);
            bulletGroup.destroy();
            // console.log("Hit")

        }

        
        this.physics.add.overlap(player, enemyGroup, touchingEnemy,null, this)
        this.physics.add.overlap(this.bulletGroup, enemyGroup, HitEnemy)

        ////////////////////////////////////////////////////////////////////
        item = new Item(this, 0, -1000, itemKey)
        itemGroup = item.spawnItemArcade(itemKey)
        ////////////////////////////////////////////////////////////////////
        HitItem = (bulletGroup, itemGroup, ) => {
            itemGroup.disableBody(true, true);
            itemGroup.destroy();
            bulletGroup.disableBody(true, true);
            bulletGroup.destroy();
            increaseHealth.call(this,1);
            // console.log("Ya")

        }
        /////////////////////////////////////////////////////////////////////
        function touchingItem(player, itemGroup) {
            itemGroup.disableBody(true, true);
            itemGroup.destroy();
             increaseHealth(1);

        }
        
        this.physics.add.overlap(this.bulletGroup, itemGroup, HitItem)
        this.physics.add.overlap(player, itemGroup,touchingItem)
        ///////////////////////////////////////////////////////////////////////
        function increaseHealth(health) {
            if (this.healthPlayer < 3 && this.healthPlayer > 0) {
                this.healthPlayer += health;
                showHealth.call(this);
            }
        }

        function showHealth() {
            if (this.healthPlayer == 3) {
                this.heart3.setVisible(true);
            }
            else if (this.healthPlayer == 2) {
                this.heart2.setVisible(true);
            }
            else if (this.healthPlayer == 1) {
                this.heart1.setVisible(true);
            }
        }
        
    

    }
    update(){
        if (this.healthPlayer < 1) {
            this.scene.start('GameOverMiniGame',{userData:userData,score:score.total})
        }
        if(this.bossCount!=0){
            enemy.resetDelayEnemyAtBossWave()
        }else{
            enemy.resetDelayEnemyAtNormalWave()
        }
        score.text.setText(" " + score.total);
        bgGameArcade.tilePositionY -= 3
        ////////////////////////////////////////////////////////////////////////////////////////// Control Player
        if (this.keyA.isDown) {
            player.moveLeft(200);
        }
        else if (this.keyD.isDown) {
            player.moveRight(200);
        } else {
            player.notMoveAtX(0);
        }

        if (this.keyW.isDown) {
            player.moveUp(150);
        }
        else if (this.keyS.isDown) {
            player.moveDown(100);
        } else {
            player.notMoveAtY(0);
        }

    }

    
}export default MiniGame