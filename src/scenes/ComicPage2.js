import {goToScene} from '../utils/goTo'
import {preloadScene} from '../utils/preloadScene'

let comic2_song
let comicPg2
let nextbtn

class ComicPage2 extends Phaser.Scene{

    constructor(){
        super({
            key: 'ComicPage2'
        })
    }

    preload(){
        this.load.image('comicPg2','src/images/comicP1.jpg')
        this.load.image('nextbtn','src/images/nextButton.png')
        this.load.audio('comic2_song','src/songs/BG.mp3')
        //////////////////////////////////////////////////////////////////////////////////////////////
        preloadScene({
            scene:this,
            key:'default'
        })
    }
    
    create(){
        comicPg2 = this.add.image(0, 0,'comicPg2').setOrigin(0,0)
        nextbtn = this.add.image(500, 760, 'nextbtn').setInteractive()
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