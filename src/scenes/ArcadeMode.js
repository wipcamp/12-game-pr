import Bullet from './core/Bullet'
import Enemy from './core/Enemy'
import Player from './core/Player'
import Item from './core/item';
import ObjectProperties from './core/ObjectProperties';
import EnemyWave from '../utils/enemyWave';
import EnemyWaveContainer from '../utils/enemyWaveContainer';
import { preloadScene } from '../utils/preloadScene';
import { goToScene } from '../utils/goTo'

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


let bg;

let game_song


class ArcadeMode extends Phaser.Scene {
    constructor() {
        super({
            key: 'ArcadeMode'
        })
    }
    preload(){

        this.load.image('bg', 'src/images/BG.png')  
        this.load.spritesheet(itemKey, 'src/images/Healthdrop.png', { frameWidth: 100, frameHeight: 100 })
        this.load.image(playerKey, 'src/images/Gokuตัดเองจ้า.png')
        this.load.image(bulletKey, 'src/images/BulletPlayer.png', { frameWidth: 25, frameHeight: 72 })
        this.load.image('heart', 'src/images/Heart.png')
        this.load.spritesheet(enemyKey, 'src/images/enemy.png', { frameWidth: 150, frameHeight: 150 })
        this.load.image('health_frame', 'src/images/Health-Frame.png');
        this.load.image('black-bar', 'src/images/health-black.png');
        this.load.image('red-bar', 'src/images/health-red.png');
        this.load.audio('game_song','src/songs/08. Operation.mp3');
        //////////////////////////////////////////////////////////////////////////////////////////
        preloadScene({
            scene: this,
            key: 'default'
        })
    }
    create(){
        bg = this.add.tileSprite(0, 0, 600, 900, 'bg').setOrigin(0, 0)
        /////////////////////////////////////////////////////////////////////
        game_song = this.sound.add('game_song',{volume: 0.15});
        game_song.play();
        ////////////////////////////////////////////////////////////////////
        player = new Player(this, 300, 750, playerKey)
        player.setWorldBound(true)
        player.setSize(0.15)
        player.setHitBox(384, 216)
        player.setoffset(300, 200)

        bulletGroup = player.playerAreShooting(bulletKey, player);
        //////////////////////////////////////////////////////////////////
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


    }
    update(){
        bg.tilePositionY -= 3
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
}export default ArcadeMode