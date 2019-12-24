import Player from './core/Player'
let player;
let playerKey = 'player';
let bulletKey = 'bullet';
class GameScene extends Phaser.Scene{
    constructor(){
        super({
            key: 'GameScene'
        })
    }

    preload(){
        this.load.spritesheet(playerKey,'src/images/character.png' ,{frameWidth: 416, frameHeight: 454})
        this.load.spritesheet(bulletKey,'src/images/character.png' ,{frameWidth: 416, frameHeight: 454})
    }
    
    create(){
        player = new Player(this,300,400,playerKey)
        player.areShooting(bulletKey,player)
        // player.stopShooting()
    }

    update(delta, time){
    }

}
export default GameScene