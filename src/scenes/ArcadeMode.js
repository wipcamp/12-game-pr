import Bullet from './core/Bullet'
// import Enemy from './core/Enemy'
import Player from './core/Player'
import Item from './core/item';
import ObjectProperties from './core/ObjectProperties';
// import EnemyWave from '../utils/enemyWave';
// import EnemyWaveContainer from '../utils/enemyWaveContainer';
import { preloadScene } from '../utils/preloadScene';
import { goToScene } from '../utils/goTo'

// let enemyKey = 'enemy'
// let enemy;
// let enemyGroup

let playerKey = 'player';
let player;

let bulletKey = 'bullet';
let bulletGroup;

var healthPlayer = 3;
let heart1
let heart2
let heart3

// let itemKey = 'items';
// let itemGroup
// let item;


let bg;

// let health_frame;
// let healthBar;
// let backgroundBar;
// let boss1Health = 100;
// let boss1MaxHealth = 100;

let game_song


class ArcadeMode extends Phaser.Scene {
    constructor() {
        super({
            key: 'ArcadeMode'
        })
    }
    preload(){

        this.load.image('bg', 'src/images/BG.png')
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
    }
    update(){

    }
}export default ArcadeMode