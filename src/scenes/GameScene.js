// let gameScene_song
class GameScene extends Phaser.Scene{

    constructor(){
        super({
            key: 'GameScene'
        })
    }

    preload(){
        // this.load.audio('gameScene_song','src/songs/Heartbeats - Broove (LuviKunG Remix).mp3')
    }
    
    create(){
        // gameScene_song = this.sound.add('gameScene_song')
        // gameScene_song.play()
    }

    update(delta, time){
         
    }

}
export default GameScene