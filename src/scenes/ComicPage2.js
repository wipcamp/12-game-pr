import {goToScene} from '../utils/goTo'

let comic2_song
class ComicPage2 extends Phaser.Scene{

    constructor(){
        super({
            key: 'ComicPage2'
        })
    }

    preload(){
        this.load.image('comicPg2','src/images/comicP1.png')
        this.load.image('nextbtn','src/images/nextButton.png')
        this.load.audio('comic2_song','src/songs/Heartbeats - Broove (LuviKunG Remix).mp3')
    }
    
    create(){
        comicPg2 = this.add.image(0, 0,'comicPg2').setScale(0.7).setOrigin(0,0)
        nextbtn = this.add.image(550, 750, 'nextbtn').setScale(0.2).setInteractive()
        comic2_song = this.sound.add('comic2_song')
        comic2_song.play()
        nextbtn.on('pointerdown', (pointer) =>{
            this.goMainMenu()
        })
    }
    goMainMenu(){
        goToScene.call(this, 'MainMenu')
    }
    update(delta, time){
         
    }

}
export default ComicPage2